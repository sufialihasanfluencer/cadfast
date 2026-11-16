"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  Check, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Crown,
  HelpCircle,
  Building2,
  Layers
} from "lucide-react";

export default function PricingSection() {
  const { user } = useAuth();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#07090e] border-t border-gray-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4 fill-red-500 text-red-500" />
            Transparent Software Licensing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Draft Smarter. Direct Licensing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              ₹3,000 / month Full License
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            One flat subscription for architects and engineers. Standalone desktop software, AutoCAD AI plugins, and unlimited DXF blueprint generation.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: Standalone Software Inclusions & Specs */}
          <div className="bg-[#0f1422] border border-gray-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Software Inclusions
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">Included</span>
                <span className="text-xs text-gray-400">/ with license</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 mb-6">
                Official CAD FAST standalone AI software and AutoCAD plugin suite specifications.
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-gray-800/80 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Windows 10/11 & macOS Desktop Suite</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AutoCAD 2018 - 2026 Direct Plugin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard DXF & DWG R12/2018 Engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Layer Management (Walls, Doors, Dims)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Commercial Sanction & Client Rights</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3.5 rounded-2xl bg-[#141b29] border border-gray-700/60 text-center">
              <div className="text-xs font-bold text-white mb-0.5">Standalone Software Delivery</div>
              <div className="text-[11px] text-gray-400">License key is generated instantly upon ₹3,000 payment</div>
            </div>
          </div>

          {/* Card 2: PRO FIXED MONTHLY LICENSE (FEATURED HERO CARD) */}
          <div className="relative bg-gradient-to-b from-[#182136] via-[#121929] to-[#0c101a] border-2 border-red-500 rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-2xl shadow-red-950/70 lg:scale-105 z-20">
            {/* Top Ribbon */}
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 ${
              user?.isSubscribed
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-600/50"
                : "bg-gradient-to-r from-red-600 to-rose-600 shadow-red-600/50"
            }`}>
              {user?.isSubscribed ? <Crown className="w-3.5 h-3.5 text-amber-300" /> : <Zap className="w-3.5 h-3.5 fill-white" />}
              <span>{user?.isSubscribed ? "Active Pro Membership" : "Monthly Pro License"}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${user?.isSubscribed ? "text-emerald-400" : "text-red-400"}`}>
                  {user?.isSubscribed ? "Subscribed & Verified" : "CAD FAST Pro Suite"}
                </span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  user?.isSubscribed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {user?.isSubscribed ? "PRO ACTIVE" : "FULL ACCESS"}
                </span>
              </div>

              <div className="flex items-baseline gap-2 text-white">
                <span className="text-5xl font-black tracking-tight">₹3,000</span>
                <span className="text-xs text-gray-300 font-medium">/ month</span>
              </div>

              <p className="text-xs text-gray-300 mt-2 mb-6">
                Full unlimited access to CAD FAST standalone software and AutoCAD AI plugin suite. Generate blueprints and download native .DXF files.
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
                  <span>Standalone Software Suite (Windows & macOS)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>AutoCAD 2018 - 2026 AI Plugin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Firebase Cloud Storage & Account Sync</span>
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
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transition active:scale-95 text-sm cursor-pointer"
                  >
                    <Crown className="w-5 h-5 text-amber-300" />
                    <span>✓ Pro Plan Active — View Certificate</span>
                  </Link>
                  <div className="mt-2.5 text-center text-[11px] text-emerald-400 font-semibold">
                    Payment Verified • License Key Active & Ready
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-red-900/60 flex items-center justify-center gap-2 transition active:scale-95 text-sm cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Subscribe Now — ₹3,000/mo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="mt-2.5 text-center text-[11px] text-gray-400">
                    Instant UPI, Cards & Netbanking • 256-Bit SSL
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Card 3: Annual / Studio Pass */}
          <div className="bg-[#0f1422] border border-gray-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Annual Studio Pass
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">₹30,000</span>
                <span className="text-xs text-gray-400">/ year</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-1 mb-6">
                Save ₹6,000 (Get 2 Months Free)
              </p>

              <div className="space-y-3 text-xs text-gray-300 border-t border-gray-800/80 pt-5">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Monthly Pro License</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-Seat Team Floating License</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority Architecture Support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Building Bye-law Presets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Early Access to 3D Neural Models</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/checkout"
                className="block w-full py-3.5 px-4 rounded-2xl border text-xs font-semibold transition active:scale-95 cursor-pointer text-center bg-[#182133] hover:bg-[#202c45] text-white border-gray-700"
              >
                Get Annual Pass
              </Link>
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
