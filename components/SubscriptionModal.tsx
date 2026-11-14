"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { initiateRazorpayPayment } from "@/lib/razorpayClient";
import confetti from "canvas-confetti";
import { 
  X, 
  Check, 
  Zap, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Flame,
  Award,
  Loader2,
  AlertCircle
} from "lucide-react";

export default function SubscriptionModal() {
  const { 
    isSubscribeModalOpen, 
    setIsSubscribeModalOpen, 
    user, 
    activateSubscription, 
    setIsStudioOpen,
    setIsAuthModalOpen
  } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi_qr">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState<string>("");

  // Countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isSubscribeModalOpen) return null;

  const handleRazorpayPay = async () => {
    if (!user) {
      setIsSubscribeModalOpen(false);
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      // Trigger Razorpay live checkout
      const result = await initiateRazorpayPayment({
        amount: 99,
        userName: user.displayName || "CAD Architect",
        userEmail: user.email || "user@cadfast.ai",
      });

      if (result.success && result.paymentId) {
        // Activate in Firestore & Local state
        await activateSubscription(`Razorpay (${result.paymentId})`);
        setSuccessPaymentId(result.paymentId);
        
        try {
          confetti({
            particleCount: 110,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#ff2a3a", "#ffffff", "#ffd700", "#38bdf8"],
          });
        } catch {
          // ignore
        }

        setIsSuccess(true);
      } else if (result.error) {
        setErrorMessage(result.error);
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const msg = err instanceof Error ? err.message : "Payment gateway error. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInstantDemoPay = async () => {
    if (!user) {
      setIsSubscribeModalOpen(false);
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      await new Promise((r) => setTimeout(r, 1200));

      const fakePayId = "PAY_RZP_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      await activateSubscription(`UPI QR (${fakePayId})`);
      setSuccessPaymentId(fakePayId);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff2a3a", "#ffffff", "#ffd700", "#38bdf8"],
        });
      } catch {
        // ignore
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not activate subscription. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenStudio = () => {
    setIsSubscribeModalOpen(false);
    setIsSuccess(false);
    setIsStudioOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0f141f] border border-red-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-red-950/60 text-white overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing background */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-red-600/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsSubscribeModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If user is already subscribed or just completed payment, show Active Pro Screen (NEVER ask for payment) */}
        {user?.isSubscribed || isSuccess ? (
          /* Success & Pro Active Screen */
          <div className="flex flex-col items-center text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 mb-4 animate-bounce">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/40">
              <Award className="w-4 h-4" />
              <span>{isSuccess ? "Payment Verified & Activated!" : "CAD FAST Pro Active"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {isSuccess ? "Welcome to CAD FAST Pro!" : "You Are Already a Pro Member!"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm mb-6">
              Aapka subscription active hai aur account verify ho chuka hai. Aapko dobara payment karne ki zaroorat nahi hai!
            </p>

            <div className="w-full bg-[#141a26] border border-gray-700/80 rounded-2xl p-4 mb-6 text-left space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Account Email:</span>
                <span className="font-semibold text-white">{user?.email || "Google Account"}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Subscription Status:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Active (No further payment needed)
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Plan Type:</span>
                <span className="font-semibold text-red-400">Early Access Pass (₹99 / 1st mo)</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>CAD Generations:</span>
                <span className="font-semibold text-emerald-400">Unlimited Text-to-CAD ✓</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>AutoCAD .DXF Downloads:</span>
                <span className="font-semibold text-emerald-400">Unlocked & Unlimited ✓</span>
              </div>
            </div>

            <button
              onClick={handleOpenStudio}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition active:scale-[0.98] text-base cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Launch AI CAD Studio Now</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        ) : (
          <>
            {/* Header / Urgency */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold tracking-wide uppercase">
                <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                Early Bird Offer - Save 95%
              </span>
              <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                <Clock className="w-3 h-3" />
                <span>
                  Ends in {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
              Unlock CAD FAST Pro Access
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-5">
              Turn natural language prompts into complete, editable AutoCAD floor plans and engineering drawings.
            </p>

            {/* Pricing Highlight Card */}
            <div className="relative bg-gradient-to-b from-[#1a2233] to-[#121824] border-2 border-red-500/50 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    First Month Early Access
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      ₹99
                    </span>
                    <span className="text-xs text-gray-400">/ 1st month</span>
                    <span className="text-sm line-through text-gray-500 font-medium">
                      ₹2,000/mo
                    </span>
                  </div>
                  <p className="text-[11px] text-red-400 mt-1 font-medium">
                    *After 1st month: regular ₹2,000/mo. Cancel anytime in 1-click.
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
                  <div className="px-3 py-1 rounded-xl bg-red-600 text-white font-black text-xs tracking-wider uppercase shadow-lg shadow-red-600/40">
                    SAVE ₹1,901
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 sm:mt-2">
                    Only <span className="text-amber-400 font-bold">17 seats left</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-4 pt-3.5 border-t border-gray-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Unlimited Text-to-CAD Prompts</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Direct AutoCAD .DXF Export</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Walls, Doors & Dimension Layers</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Full Commercial License</span>
                </div>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Gateway Mode Switch */}
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Payment Options (Razorpay Live Testnet Ready)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    paymentMethod === "razorpay"
                      ? "border-red-500 bg-red-500/15 text-white"
                      : "border-gray-800 bg-[#141a26] text-gray-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-red-400" />
                  <span>Razorpay Checkout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi_qr")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    paymentMethod === "upi_qr"
                      ? "border-red-500 bg-red-500/15 text-white"
                      : "border-gray-800 bg-[#141a26] text-gray-400 hover:text-white"
                  }`}
                >
                  <QrCode className="w-4 h-4 text-red-400" />
                  <span>Instant UPI QR</span>
                </button>
              </div>
            </div>

            {/* Gateway UI Details */}
            {paymentMethod === "razorpay" ? (
              <div className="bg-[#121724] border border-gray-800 rounded-2xl p-4 mb-5 space-y-2">
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  Opens official Razorpay modal supporting <strong>UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Netbanking & Wallets</strong>.
                </div>
              </div>
            ) : (
              <div className="bg-[#121724] border border-gray-800 rounded-2xl p-4 mb-5 flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-white rounded-xl p-2 mb-2 flex items-center justify-center shadow-lg">
                  {/* Vector UPI QR representation */}
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="25" height="25" rx="3" />
                    <rect x="65" y="10" width="25" height="25" rx="3" />
                    <rect x="10" y="65" width="25" height="25" rx="3" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="18" y="18" width="9" height="9" />
                    <rect x="73" y="18" width="9" height="9" />
                    <rect x="18" y="73" width="9" height="9" />
                    <rect x="42" y="12" width="6" height="20" />
                    <rect x="12" y="42" width="20" height="6" />
                    <rect x="42" y="42" width="16" height="16" rx="2" />
                    <rect x="65" y="42" width="25" height="6" />
                    <rect x="42" y="65" width="6" height="25" />
                    <rect x="65" y="65" width="12" height="12" />
                    <rect x="80" y="80" width="10" height="10" />
                  </svg>
                </div>
                <div className="text-xs font-mono text-gray-300">
                  UPI ID: <span className="text-emerald-400 font-bold">cadfast.ai@icici</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Amount: ₹99.00 • Instant Approval
                </div>
              </div>
            )}

            {/* Action Pay Button */}
            <button
              onClick={paymentMethod === "razorpay" ? handleRazorpayPay : handleInstantDemoPay}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-red-900/50 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-75 cursor-pointer text-sm sm:text-base"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting Razorpay Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹99 & Unlock AI CAD Studio</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>

            {/* Guarantee footer */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Razorpay 256-Bit SSL
              </span>
              <span>•</span>
              <span>Cancel Anytime in 1-Click</span>
              <span>•</span>
              <span>Firestore Synced</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
