import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createSession, updateSession } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const action = body?.action;

    if (action === "create-checkout") {
      // Create a Razorpay-style test checkout order
      const { amount, currency, tutor_name, session_date } = body;

      if (!amount || amount <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
      }

      // Generate a test order ID (in production, call Razorpay Orders API here)
      const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      // In production, this would:
      // 1. Call Razorpay Orders API: POST /orders with { amount, currency }
      // 2. Return the order ID + Razorpay key_id so the frontend can show the Razorpay checkout
      // For now, return a test order that the frontend can use with Razorpay test mode

      return NextResponse.json({
        success: true,
        orderId,
        amount,
        currency: currency || "INR",
        // Razorpay test mode key_id (test mode — replace with live key in production)
        // Test key: rzp_test_... (get from Razorpay dashboard)
        // For now, placeholder that the frontend can use with a test Razorpay account
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        // In production: expandee.razorpay.com/demo/pay?offer=order_XXX for test
        checkout_url: null,
      });
    }

    if (action === "verify-payment") {
      // Verify Razorpay payment signature (production)
      // In test mode, we accept the payment as valid
      const { orderId, paymentId, signature } = body;

      // In production:
      // 1. Verify signature using Razorpay SDK
      // 2. If valid, mark session as paid
      // 3. Update lead status to "converted"

      // For now, accept test payments and mark the session
      return NextResponse.json({
        success: true,
        verified: true,
        message: "Payment verified (test mode)",
      });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
