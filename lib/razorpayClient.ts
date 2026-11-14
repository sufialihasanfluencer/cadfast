/**
 * Razorpay Payment Client Helper
 * Handles dynamic script loading, order creation, checkout popup, and signature verification
 */

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayPaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  signature?: string;
  error?: string;
}

export async function initiateRazorpayPayment(options: {
  amount?: number;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userId?: string;
}): Promise<RazorpayPaymentResult> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error("Could not load Razorpay SDK. Please check your internet connection.");
  }

  // 1. Create Order via our Next.js API route
  const orderRes = await fetch("/api/razorpay/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: options.amount || 99 }),
  });

  const orderData = await orderRes.json();
  if (!orderRes.ok || !orderData.success) {
    throw new Error(orderData.error || "Order creation failed on server");
  }

  // 2. Open Razorpay Checkout Modal
  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: orderData.key,
      amount: orderData.amount, // in paise
      currency: orderData.currency || "INR",
      name: "CAD FAST",
      description: "Early Access Pass — 1st Month Access (Save 95%)",
      image: "/images/cadgptlogo.png",
      order_id: orderData.orderId,
      prefill: {
        name: options.userName || "Architect User",
        email: options.userEmail || "architect@cadfast.ai",
        contact: options.userPhone || "9999999999",
      },
      theme: {
        color: "#ff2a3a",
        backdrop_color: "rgba(10, 14, 22, 0.9)",
      },
      modal: {
        ondismiss: function () {
          resolve({ success: false, error: "Payment was cancelled by user." });
        },
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          // 3. Verify Payment Signature and record in DB via Next.js API route
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              uid: options.userId,
              userEmail: options.userEmail,
              userName: options.userName,
              amount: options.amount || 99,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
          } else {
            resolve({
              success: false,
              error: verifyData.error || "Signature verification failed",
            });
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Verification request failed";
          resolve({ success: false, error: msg });
        }
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.on("payment.failed", function (resp: any) {
      resolve({
        success: false,
        error: resp.error?.description || "Payment failed",
      });
    });
    rzp.open();
  });
}
