import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys not configured on server" },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const body = await req.json().catch(() => ({}));
    const amountInRupees = body.amount || 99; // Default ₹99
    const amountInPaise = Math.round(amountInRupees * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_cadfast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      notes: {
        plan: "CAD FAST Early Adopter Pass - 1st Month ₹99",
        regular_price: "₹2,000/mo",
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: keyId,
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Could not create Razorpay order", details: message },
      { status: 500 }
    );
  }
}
