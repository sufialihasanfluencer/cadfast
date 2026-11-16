import { NextResponse } from "next/server";
import { sendPaymentSuccessEmail } from "@/lib/emailService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      toEmail, 
      userName, 
      paymentId, 
      orderId, 
      amount, 
      planName,
      licenseKey 
    } = body;

    if (!toEmail) {
      return NextResponse.json(
        { error: "Recipient email is required" },
        { status: 400 }
      );
    }

    const result = await sendPaymentSuccessEmail({
      toEmail,
      userName: userName || "CAD Architect",
      paymentId: paymentId || `PAY_CONFIRM_${Date.now()}`,
      orderId: orderId || `ORDER_${Date.now()}`,
      amount: amount || 3000,
      planName: planName || "CAD FAST Pro License",
      licenseKey,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Payment confirmation email sent successfully",
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to dispatch email" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Payment confirmation route error:", error);
    const msg = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
