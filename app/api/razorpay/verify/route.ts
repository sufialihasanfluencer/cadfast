import { NextResponse } from "next/server";
import crypto from "crypto";
import { savePaymentToFirestore } from "@/lib/paymentStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      uid,
      userEmail,
      userName,
      amount
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret not configured" },
        { status: 500 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required Razorpay payment verification parameters" },
        { status: 400 }
      );
    }

    // Verify HMAC SHA256 Signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { success: false, error: "Payment verification signature mismatch" },
        { status: 400 }
      );
    }

    // Store verified payment in Firestore Database
    const savedInDB = await savePaymentToFirestore({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      uid: uid || undefined,
      userEmail: userEmail || undefined,
      userName: userName || undefined,
      amount: amount || 3000,
      plan: "pro_3000",
      planTitle: "CAD FAST Pro License (₹3,000/month)",
      paymentMethod: "Razorpay (Online Payment)",
      gateway: "Razorpay",
      status: "SUCCESS",
    });

    return NextResponse.json({
      success: true,
      message: "Payment signature verified and stored in database successfully",
      savedInDB,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error: unknown) {
    console.error("Razorpay verification error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Verification failed", details: message },
      { status: 500 }
    );
  }
}
