import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createPaymentOrder, getPaymentOrderBySessionId, getSessionById, getUserById, markPaymentOrderPaid, queryOne, updateSession, uid } from "@/lib/db";
import { canReadSession } from "@/lib/authorization";
import { calculateSessionAmount, canTransitionPayment } from "@/lib/session-policy";

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const actor = { id: session.user.id, email: session.user.email, role: session.user.role } as const;
    const body = await request.json();

    if (body?.action === "create-checkout") {
      const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
      if (!sessionId) return NextResponse.json({ error: "Session ID required" }, { status: 400 });
      const booking = await getSessionById(sessionId);
      if (!booking || !canReadSession(actor, booking)) return NextResponse.json({ error: "Session not found" }, { status: 404 });
      if (actor.role !== "student" || booking.student_id !== actor.id) return NextResponse.json({ error: "Only the student can start payment" }, { status: 403 });
      if (booking.status !== "scheduled") return NextResponse.json({ error: "Only scheduled sessions can be paid" }, { status: 409 });
      if (booking.payment_status === "paid" || booking.payment_status === "free") return NextResponse.json({ error: "Session is already settled" }, { status: 409 });
      const tutor = await getUserById(booking.tutor_id);
      const amount = calculateSessionAmount(tutor?.hourly_rate, booking.duration_minutes);
      if (amount <= 0) return NextResponse.json({ error: "Tutor pricing is not configured" }, { status: 409 });
      const existingOrder = await getPaymentOrderBySessionId(sessionId);
      if (existingOrder?.status === "pending") return NextResponse.json({ success: true, orderId: existingOrder.provider_order_id, amount: existingOrder.amount, currency: existingOrder.currency, key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder", testMode: true });
      const providerOrderId = `order_test_${crypto.randomUUID()}`;
      await createPaymentOrder({ id: uid(), session_id: sessionId, user_id: actor.id, provider_order_id: providerOrderId, amount, currency: "INR" });
      return NextResponse.json({ success: true, orderId: providerOrderId, amount, currency: "INR", key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder", testMode: true });
    }

    if (body?.action === "verify-payment") {
      const orderId = typeof body.orderId === "string" ? body.orderId : "";
      const paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
      const signature = typeof body.signature === "string" ? body.signature : "";
      if (!orderId || !paymentId || !signature) return NextResponse.json({ success: false, verified: false, error: "Missing payment fields" }, { status: 400 });
      const order = await queryOne<any>("SELECT * FROM payment_orders WHERE provider_order_id = ?", [orderId]);
      if (!order) return NextResponse.json({ success: false, verified: false, error: "Unknown order ID" }, { status: 400 });
      if (order.status !== "pending") return NextResponse.json({ success: false, verified: false, error: "Order is no longer payable" }, { status: 409 });
      if (order.user_id !== actor.id) return NextResponse.json({ success: false, verified: false, error: "Forbidden" }, { status: 403 });
      const secret = process.env.RAZORPAY_TEST_SECRET;
      if (!secret) return NextResponse.json({ success: false, verified: false, error: "Payment verification is not configured" }, { status: 503 });
      const expectedSignature = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
      if (!safeEqual(signature, expectedSignature)) return NextResponse.json({ success: false, verified: false, error: "Invalid payment signature" }, { status: 400 });
      const booking = await getSessionById(order.session_id);
      if (!booking || booking.student_id !== actor.id) return NextResponse.json({ success: false, verified: false, error: "Session not found" }, { status: 404 });
      if (!canTransitionPayment(booking.payment_status, "paid")) return NextResponse.json({ success: false, verified: false, error: "Invalid payment state" }, { status: 409 });
      if (!await markPaymentOrderPaid(orderId, paymentId)) return NextResponse.json({ success: false, verified: false, error: "Payment was already processed" }, { status: 409 });
      await updateSession(booking.id, { payment_status: "paid", paid_at: new Date().toISOString() });
      return NextResponse.json({ success: true, verified: true, orderId, paymentId, amount: order.amount, currency: order.currency });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occurred" }, { status: 400 });
  }
}
