"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ActiveLicenseDashboard from "./ActiveLicenseDashboard";
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle,
  Crown,
  Download,
  FileCode,
  Check
} from "lucide-react";

export default function Hero() {
  const { 
    user, 
    setIsAuthModalOpen, 
    setIsSubscribeModalOpen 
  } = useAuth();

  const handleClaimOffer = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setIsSubscribeModalOpen(true);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background CAD Grids & Glows */}
      <div className="absolute inset-0 cad-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* IF USER IS ALREADY SUBSCRIBED: SHOW ATTRACTIVE, FORMAL ACTIVE LICENSE DASHBOARD */}
        {user?.isSubscribed ? (
          <div className="animate-in fade-in duration-300">
            <ActiveLicenseDashboard />
          </div>
        ) : (
          /* IF USER IS NOT YET SUBSCRIBED: SHOW HIGH-CONVERTING LANDING PAGE HERO */
          <>
            {/* TOP BADGE: Pro Monthly License */}
            <div className="flex flex-col items-center text-center mb-8">
              <Link 
                href="/checkout"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/60 border border-red-500/50 hover:border-red-400 text-xs text-red-200 cursor-pointer shadow-xl shadow-red-950/50 transition hover:scale-105 mb-6 group"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-bold text-red-400 uppercase tracking-wider">
                  ⚡ AUTOCAD AI SUITE:
                </span>
                <span>
                  Official Pro License Available at <strong className="text-white font-extrabold text-sm">₹3,000/month</strong>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition" />
              </Link>

              {/* MAIN HEADLINE (Directly matching the banner images) */}
              <div className="relative inline-block mb-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                  AutoCAD,{" "}
                  <span className="relative inline-block px-4 py-1 mt-2 sm:mt-0 text-white">
                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 rounded-2xl -rotate-1 shadow-2xl shadow-red-600/60"></span>
                    <span className="relative z-10 italic">now with AI</span>
                  </span>
                </h1>
              </div>

              {/* SUBTITLE */}
              <p className="max-w-2xl text-lg sm:text-xl text-gray-300 font-normal mt-3 mb-8 leading-relaxed">
                Turn simple prompts into detailed CAD drawings. Generate professional 2D floor plans, architectural layouts, and export editable <strong className="text-white">.DXF & .DWG</strong> files in seconds.
              </p>

              {/* 3 CORE PILLARS (Matching uploaded banner: Text to CAD, Faster Drafting, Accurate & Editable) */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 text-xs sm:text-sm font-semibold text-gray-200">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span>Text to CAD</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>Faster Drafting</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Target className="w-4 h-4 text-red-500" />
                  <span>Accurate & Editable</span>
                </div>
              </div>

              {/* PRIMARY CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/checkout"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-2xl shadow-red-600/50 flex items-center justify-center gap-3 transition active:scale-95 text-base cursor-pointer border border-red-400/40"
                >
                  <Zap className="w-5 h-5 fill-white text-white" />
                  <span>Get Pro License (₹3,000/mo)</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#pricing"
                  className="w-full sm:w-auto px-7 py-4 bg-[#141b29] hover:bg-[#1a2336] text-white font-bold rounded-2xl border border-gray-700 hover:border-gray-500 flex items-center justify-center gap-2.5 transition active:scale-95 text-base cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>View Software Inclusions & Pricing</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Instant License Key
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Direct .DXF Download
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Cancel Anytime
                </span>
              </div>
            </div>

            {/* VISUAL SOFTWARE SHOWCASE CARD (Replacing interactive canvas with high-res product preview!) */}
            <div id="preview" className="mt-12 relative max-w-5xl mx-auto">
              <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#1b2334] to-[#0c1017] border-2 border-red-500/40 shadow-2xl shadow-red-950/70 overflow-hidden">
                
                {/* Tablet Top Header with AutoCAD Red "A" */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold text-white shadow-md text-sm">
                      A
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-gray-400 font-medium">
                      <span className="text-white font-semibold">Home</span>
                      <span>Insert</span>
                      <span>Annotate</span>
                      <span>View</span>
                      <span>Manage</span>
                      <span>Output</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] text-gray-300 font-mono">AUTOCAD AI ENGINE: READY</span>
                  </div>
                </div>

                {/* Main Product Graphic Banner */}
                <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-[#07090e] shadow-inner group">
                  <div className="relative w-full h-[320px] sm:h-[440px] md:h-[500px]">
                    <Image
                      src="/images/cadgpt-hero-square.jpg"
                      alt="CAD FAST - AutoCAD Now With AI Software"
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-contain sm:object-cover group-hover:scale-[1.01] transition duration-500"
                      priority
                    />
                  </div>

                  {/* Gradient Overlay for Sleek Look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/20 pointer-events-none"></div>

                  {/* Bottom Quick Callout Bar */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0f1422]/95 backdrop-blur-md border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Unlock Full CAD FAST Software Access
                        </div>
                        <div className="text-[11px] text-gray-400">
                          Get your official license key and standalone software for ₹3,000/month.
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/checkout"
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 transition active:scale-95 cursor-pointer shrink-0"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>Activate License (₹3,000)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* METRICS & PROOF BAR */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#101522] border border-gray-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                  &lt; 5s
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                  Prompt-to-CAD Speed
                </div>
              </div>
              <div className="bg-[#101522] border border-gray-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-500 font-mono">
                  100%
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                  AutoCAD DXF Compatible
                </div>
              </div>
              <div className="bg-[#101522] border border-gray-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                  ₹3,000
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                  Monthly Pro License Fee
                </div>
              </div>
              <div className="bg-[#101522] border border-gray-800/80 rounded-2xl p-5 text-center">
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  50K+
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                  Drafting Hours Saved
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
