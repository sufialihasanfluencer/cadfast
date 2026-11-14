"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Check, 
  Flame, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Crown,
  HelpCircle
} from "lucide-react";

export default function PricingSection() {
  const { user, setIsAuthModalOpen, setIsSubscribeModalOpen, setIsStudioOpen } = useAuth();

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

  const handleSelectPlan = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else if (!user.isSubscribed) {
      setIsSubscribeModalOpen(true);
    } else {
      setIsStudioOpen(true);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#07090e] border-t border-gray-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Flame className="w-4 h-4 fill-red-500 text-red-500" />
            Limited Early Bird Offer
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Draft Smarter. Pay Less. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              Just ₹99 for First Month
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Grab our early access promotion before the regular price of <strong className="text-white">₹2,000/month</strong> goes live!
          </p>

          {/* Countdown Clock */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#111726] border border-red-500/40 text-xs text-gray-300 font-mono shadow-lg">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Promotion Ends In:</span>
            <span className="text-red-400 font-bold text-sm">
              {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400 font-semibold">17 Early Slots Left</span>
          </div>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: Free Trial / Demo */}
          <div className="bg-[#0f1422] border border-gray-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Starter Preview
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">₹0</span>
                <span className="text-xs text-gray-400">/ forever</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 mb-6">
                Try the interactive CAD canvas with pre-built 4 BHK and villa blueprints.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-gray-800/80 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>3 Preview CAD Generations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Interactive Zoom & Pan Canvas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>SVG Vector Preview</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <span>✕ No DXF AutoCAD export</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <span>✕ Standard queue latency</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsStudioOpen(true)}
              className="mt-8 w-full py-3.5 px-4 bg-[#182133] hover:bg-[#202c45] text-white font-semibold rounded-2xl border border-gray-700 text-xs transition active:scale-95 cursor-pointer text-center"
            >
              Test Free Canvas Demo
            </button>
          </div>

          {/* Card 2: EARLY ACCESS PROMO (FEATURED HERO CARD) */}
          <div className="relative bg-gradient-to-b from-[#182136] via-[#121929] to-[#0c101a] border-2 border-red-500 rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-2xl shadow-red-950/70 lg:scale-105 z-20">
            {/* Top Ribbon */}
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 ${
              user?.isSubscribed
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-600/50"
                : "bg-gradient-to-r from-red-600 to-rose-600 shadow-red-600/50"
            }`}>
              {user?.isSubscribed ? <Crown className="w-3.5 h-3.5 text-amber-300" /> : <Flame className="w-3.5 h-3.5 fill-white" />}
              <span>{user?.isSubscribed ? "Active Pro Membership" : "95% OFF - Early Adopter Pass"}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${user?.isSubscribed ? "text-emerald-400" : "text-red-400"}`}>
                  {user?.isSubscribed ? "Subscribed & Verified" : "Special Launch Offer"}
                </span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  user?.isSubscribed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {user?.isSubscribed ? "PRO ACTIVE" : "SAVE ₹1,901"}
                </span>
              </div>

              <div className="flex items-baseline gap-2 text-white">
                <span className="text-5xl font-black tracking-tight">₹99</span>
                <span className="text-xs text-gray-300 font-medium">/ 1st month</span>
                <span className="text-base line-through text-gray-500 ml-1">₹2,000/mo</span>
              </div>

              <p className="text-xs text-gray-300 mt-2 mb-6">
                Full unlimited access to CAD FAST. Generate any floor plan with AI and download ready-to-use AutoCAD .DXF files.
              </p>

              <div className="space-y-3 text-xs text-gray-200 border-t border-gray-700/80 pt-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-white">Unlimited Text-to-CAD Generations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-semibold text-white">Direct Autodesk .DXF & .DWG Export</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Multi-layer Architecture (Walls, Doors, Dimensions)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>High-speed AI Model (&lt; 5s rendering)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Firebase Cloud Storage & Project History</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Full Commercial Client Presentation Rights</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {user?.isSubscribed ? (
                <>
                  <button
                    onClick={() => setIsStudioOpen(true)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition active:scale-95 text-sm cursor-pointer"
                  >
                    <Crown className="w-5 h-5 text-amber-300" />
                    <span>✓ Pro Plan Active — Launch Studio</span>
                  </button>
                  <div className="mt-2.5 text-center text-[11px] text-emerald-400 font-semibold">
                    Payment Verified • Unlimited CAD Generations Active
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSelectPlan}
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-red-900/60 flex items-center justify-center gap-2 transition active:scale-95 text-sm cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Get 1st Month for ₹99</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="mt-2.5 text-center text-[11px] text-gray-400">
                    Cancel anytime before renewal • Instant UPI/GPay
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Card 3: Post-Launch Regular Price */}
          <div className="bg-[#0f1422] border border-gray-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Standard Membership
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">₹2,000</span>
                <span className="text-xs text-gray-400">/ month</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 mb-6">
                Standard price once the early access promo threshold is reached.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-gray-800/80 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Early Access Plan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited DXF & DWG Downloads</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority Architecture Support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Batch Prompting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Building Bye-law Presets</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  if (user?.isSubscribed) setIsStudioOpen(true);
                  else handleSelectPlan();
                }}
                className={`w-full py-3.5 px-4 rounded-2xl border text-xs font-semibold transition active:scale-95 cursor-pointer text-center ${
                  user?.isSubscribed
                    ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40"
                    : "bg-[#182133] hover:bg-[#202c45] text-white border-gray-700"
                }`}
              >
                {user?.isSubscribed ? "✓ Included in Your Active Pass" : "Lock In ₹99 Before Price Increases"}
              </button>
            </div>
          </div>

        </div>

        {/* Security and Trust Badges */}
        <div className="mt-14 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant UPI & Card Activation</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Firebase Secure Auth & Database</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Lock-in Contract</span>
          </div>
        </div>

      </div>
    </section>
  );
}
