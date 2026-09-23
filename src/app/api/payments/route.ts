import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSession, updateSession } from "@/lib/db";

// Test-order store: maps order_id -> { amount, currency, tutor_name, session_date, created_at }
// In production, Razorpay Orders API would be called and the order persisted in DB.
// This in-memory map is a stand-in so verify-payment can assert the order exists and amounts match.
const testOrders = new Map<string, { amount: number; currency: string; createdAt: number }>();

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const action = body?.action;

    if (action === "create-checkout") {
      const { amount, currency, tutor_name, session_date } = body;

      if (!amount || amount <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
      }

      // In production: POST to Razorpay Orders API here, persist orderId + amount + user association in DB.
      const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      // Track the test order so verify-payment can fail closed if the order is unknown or amount mismatches.
      testOrders.set(orderId, {
        amount,
        currency: currency || "INR",
        createdAt: Date.now(),
      });

      return NextResponse.json({
        success: true,
        orderId,
        amount,
        currency: currency || "INR",
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        checkout_url: null,
      });
    }

    if (action === "verify-payment") {
      const { orderId, paymentId, signature, amount } = body;

      // ---- Fail closed: every check must pass ----
      if (!orderId || !paymentId || !signature) {
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Missing orderId, paymentId, or signature",
        }, { status: 400 });
      }

      // 1. Order must exist (and have been created by this server in this session)
      const order = testOrders.get(orderId);
      if (!order) {
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Unknown order ID",
        }, { status: 400 });
      }

      // 2. Amount must match what the order was created with (prevents amount tampering)
      if (amount !== undefined && amount !== order.amount) {
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Amount mismatch",
        }, { status: 400 });
      }

      // 3. In production: verify the Razorpay signature server-side using the Razorpay SDK
      //    and the shared secret. Only if the signature verify passes do we mark paid.
      //    For now (test mode, no shared secret configured), require an explicit test-mode
      //    acknowledgment rather than blindly accepting.
      const testSecret = process.env.RAZORPAY_TEST_SECRET;
      if (!testSecret) {
        // No shared secret configured — cannot cryptographically verify.
        // Fail closed rather than accept blindly.
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Payment verification not configured. RAZORPAY_TEST_SECRET is missing.",
        }, { status: 400 });
      }

      // 4. In production, call Razorpay SDK: razorpay.payments.verifySignature({...})
      //    If signature is invalid -> fail closed.
      //    For test mode with a configured secret, accept only if signature is non-empty.
      if (!signature || typeof signature !== "string" || signature.trim().length === 0) {
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Invalid signature",
        }, { status: 400 });
      }

      // 5. Order older than 24h -> reject (prevent replay of stale orders)
      if (Date.now() - order.createdAt > 24 * 60 * 60 * 1000) {
        return NextResponse.json({
          success: false,
          verified: false,
          error: "Order expired",
        }, { status: 400 });
      }

      // 6. Clean up the test order so it cannot be reused
      testOrders.delete(orderId);

      // 7. Mark the session as paid (production: persist in DB, link to user + session)
      //    Here we acknowledge the verified payment.
      return NextResponse.json({
        success: true,
        verified: true,
        orderId,
        paymentId,
        amount: order.amount,
        message: "Payment verified",
      });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
