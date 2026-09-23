import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createPayment,
  getPaymentByOrderId,
  getSessionById,
  uid,
  updateSession,
  verifyPayment,
} from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const action = body?.action;

    if (action === "create-checkout") {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
      const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!razorpayKeyId || !razorpayKeySecret) {
        return NextResponse.json(
          { error: "Payments are not configured." },
          { status: 503 },
        );
      }

      const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
      if (!sessionId) {
        return NextResponse.json({ error: "sessionId is required." }, { status: 400 });
      }

      const booking = await getSessionById(sessionId);
      if (!booking) {
        return NextResponse.json({ error: "Session not found." }, { status: 404 });
      }
      if (booking.student_id !== session.user.id) {
        return NextResponse.json({ error: "You cannot pay for this session." }, { status: 403 });
      }
      if (booking.payment_status === "paid") {
        return NextResponse.json({ error: "This session is already paid." }, { status: 409 });
      }

      const amountInr = Number(booking.amount_inr);
      if (!Number.isFinite(amountInr) || amountInr <= 0) {
        return NextResponse.json(
          { error: "This booking does not have a valid payable amount." },
          { status: 400 },
        );
      }

      const currency = "INR";
      const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(razorpayKeyId + ":" + razorpayKeySecret).toString("base64"),
        },
        body: JSON.stringify({
          amount: Math.round(amountInr * 100),
          currency,
          receipt: "bt_" + sessionId.slice(0, 24),
          notes: { session_id: sessionId, user_id: session.user.id },
        }),
        cache: "no-store",
      });

      if (!orderResponse.ok) {
        return NextResponse.json(
          { error: "Unable to create a payment order." },
          { status: 502 },
        );
      }

      const order = await orderResponse.json();
      await createPayment({
        id: uid(),
        user_id: session.user.id,
        session_id: sessionId,
        order_id: order.id,
        amount_inr: amountInr,
        currency,
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: Math.round(amountInr * 100),
        currency,
        key_id: razorpayKeyId,
      });
    }

    if (action === "verify-payment") {
      const orderId = typeof body.orderId === "string" ? body.orderId : "";
      const paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
      const signature = typeof body.signature === "string" ? body.signature : "";

      if (!orderId || !paymentId || !signature) {
        return NextResponse.json(
          { error: "orderId, paymentId and signature are required." },
          { status: 400 },
        );
      }

      const payment = await getPaymentByOrderId(orderId);
      if (!payment) {
        return NextResponse.json({ error: "Payment order not found." }, { status: 404 });
      }
      if (payment.user_id !== session.user.id) {
        return NextResponse.json({ error: "Payment does not belong to this account." }, { status: 403 });
      }
      if (payment.status !== "created") {
        return NextResponse.json({ error: "Payment is already finalized." }, { status: 409 });
      }

      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
      }

      const expected = createHmac("sha256", secret)
        .update(orderId + "|" + paymentId)
        .digest("hex");

      const providedBuffer = Buffer.from(signature, "utf8");
      const expectedBuffer = Buffer.from(expected, "utf8");
      if (
        providedBuffer.length !== expectedBuffer.length ||
        !timingSafeEqual(providedBuffer, expectedBuffer)
      ) {
        return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
      }

      await verifyPayment(orderId, paymentId, signature);

      if (payment.session_id) {
        await updateSession(payment.session_id, {
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        });
      }

      return NextResponse.json({ success: true, verified: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    console.error("Payment route error:", error);
    return NextResponse.json({ error: "Payment request failed." }, { status: 500 });
  }
}
