"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { initiateRazorpayPayment } from "@/lib/razorpayClient";
import confetti from "canvas-confetti";
import ActiveLicenseDashboard from "@/components/ActiveLicenseDashboard";
import { 
  ArrowLeft, 
  Check, 
  QrCode, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Loader2,
  AlertCircle,
  Cpu,
  Layers,
  FileCode,
  Zap,
  CheckCircle2,
  User as UserIcon,
  HelpCircle
} from "lucide-react";

export default function CheckoutPage() {
  const { user, activateSubscription, setIsAuthModalOpen, loginWithGoogle } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi_qr">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentRefId, setPaymentRefId] = useState<string>("");

  const handleRazorpayCheckout = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      const result = await initiateRazorpayPayment({
        amount: 3000,
        userId: user.uid,
        userName: user.displayName || "CAD Architect",
        userEmail: user.email || "user@cadfast.ai",
      });

      if (result.success && result.paymentId) {
        await activateSubscription(`Razorpay (${result.paymentId})`, {
          paymentId: result.paymentId,
          orderId: result.orderId,
          amount: 3000,
        });
        setPaymentRefId(result.paymentId);

        try {
          confetti({
            particleCount: 120,
            spread: 85,
            origin: { y: 0.6 },
            colors: ["#ff2a3a", "#ffffff", "#10b981", "#38bdf8"],
          });
        } catch {
          // ignore
        }

        setIsSuccess(true);
      } else if (result.error) {
        setErrorMessage(result.error);
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Razorpay payment failed. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDemoInstantPay = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      await new Promise((r) => setTimeout(r, 1200));

      const fakeId = "RZP_PAY_" + Math.random().toString(36).substring(2, 9).toUpperCase();
      await activateSubscription(`UPI Instant (${fakeId})`, {
        paymentId: fakeId,
        orderId: "ORDER_3000_" + Date.now(),
        amount: 3000,
      });
      setPaymentRefId(fakeId);

      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#ff2a3a", "#ffffff", "#10b981", "#38bdf8"],
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

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#07090e] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official CAD FAST Payment Gateway</span>
          </div>
        </div>

        {/* If user is already subscribed or completed payment: Render Full License Certificate Dashboard */}
        {user?.isSubscribed || isSuccess ? (
          <div className="animate-in fade-in duration-300">
            <ActiveLicenseDashboard />
          </div>
        ) : (
          /* Dedicated 2-Column Checkout Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Plan & Inclusions (7 cols) */}
            <div className="lg:col-span-7 bg-[#0f1422] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-red-500/50 shadow-lg shadow-red-500/20 shrink-0">
                    <Image
                      src="/images/cadgptlogo.png"
                      alt="CAD FAST Logo"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-white">
                      CAD FAST Pro License
                    </h1>
                    <p className="text-xs text-gray-400">
                      AutoCAD AI Intelligence • Standalone Desktop Software & Plugin
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase font-semibold">Subscription</div>
                  <div className="text-sm font-bold text-emerald-400">Fixed Monthly</div>
                </div>
              </div>

              {/* Price Details */}
              <div className="my-6 p-5 rounded-2xl bg-[#141b2a] border border-gray-700/70">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-gray-300">Monthly License Fee:</span>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-white">₹3,000</span>
                    <span className="text-xs text-gray-400 ml-1">/ month</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-gray-800">
                  <span>Taxes & Processing Fee:</span>
                  <span className="text-emerald-400 font-semibold">Included (₹0.00 extra)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-white mt-1">
                  <span>Total Amount Due:</span>
                  <span className="text-red-400 text-base">₹3,000 INR</span>
                </div>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3.5 text-xs text-gray-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  What&apos;s Included With Your License:
                </h3>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Official Software License Key:</strong>
                    <span className="text-gray-400">Instant key generation delivered upon payment confirmation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Standalone CAD FAST Desktop Software:</strong>
                    <span className="text-gray-400">Dedicated high-performance application for Windows 10/11 and macOS.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">AutoCAD 2018 - 2026 Direct Plugin:</strong>
                    <span className="text-gray-400">Generate architectural layouts and mechanical drafts natively inside AutoCAD.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Unlimited Prompt-to-CAD Generations:</strong>
                    <span className="text-gray-400">No token limits or daily quotas. Generate 4 BHK house plans, duplex villas, and parts anytime.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Commercial Sanction Rights:</strong>
                    <span className="text-gray-400">100% royalty-free ownership for client projects, construction blueprints, and municipal approval.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: User Account & Payment Gateways (5 cols) */}
            <div className="lg:col-span-5 bg-[#0f1422] border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/50">
              
              <h2 className="text-lg font-bold text-white mb-1">
                Complete Payment & Activation
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Pay ₹3,000 securely to activate your account and generate your license key.
              </p>

              {/* User Account Verification */}
              <div className="mb-6 p-4 rounded-2xl bg-[#141b2a] border border-gray-700/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Subscriber Account
                </div>
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center font-bold text-xs">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {user.displayName || "Architect"}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Signed In
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-amber-300 mb-3">
                      Please sign in with Google so your license key can be linked to your account.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white text-gray-900 font-bold rounded-xl text-xs hover:bg-gray-100 transition cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Sign In with Google to Continue</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="mb-6">
                <div className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                  Select Payment Option
                </div>
                <div className="grid grid-cols-2 gap-2.5 mb-3">
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
                    <span>Razorpay Gateway</span>
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

                {paymentMethod === "razorpay" ? (
                  <div className="bg-[#121724] border border-gray-800 rounded-xl p-3.5 text-xs text-gray-400">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-white">Razorpay Secure Checkout:</span>
                      <span className="font-mono text-emerald-400 text-[11px]">All Payment Methods</span>
                    </div>
                    <span>Supports UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, and Netbanking.</span>
                  </div>
                ) : (
                  <div className="bg-[#121724] border border-gray-800 rounded-xl p-3.5 flex flex-col items-center text-center">
                    <div className="w-28 h-28 bg-white rounded-lg p-2 mb-2 flex items-center justify-center">
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
                    <div className="text-xs font-mono text-emerald-400 font-semibold">
                      UPI ID: cadfast.ai@icici (₹3,000.00)
                    </div>
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={paymentMethod === "razorpay" ? handleRazorpayCheckout : handleDemoInstantPay}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-red-900/60 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-75 cursor-pointer text-sm sm:text-base"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹3,000 & Activate Pro License</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>Instant License Key Delivery</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}