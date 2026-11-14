"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import InteractiveCADViewer from "./InteractiveCADViewer";
import { 
  fourBhkPlan, 
  threeBhkVillaPlan, 
  mechanicalFlangePlan, 
  generatePlanFromPrompt, 
  CADDrawingData 
} from "@/lib/cadModels";
import { 
  Sparkles, 
  Flame, 
  Send, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle,
  FileCheck2,
  Crown,
  Users
} from "lucide-react";

export default function Hero() {
  const { 
    user, 
    setIsAuthModalOpen, 
    setIsSubscribeModalOpen, 
    setIsStudioOpen, 
    requireAuthAndSubscription 
  } = useAuth();

  const [promptInput, setPromptInput] = useState("Draw a 4 BHK house plan");
  const [currentPlan, setCurrentPlan] = useState<CADDrawingData>(fourBhkPlan);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTestPrompt = (newPrompt?: string) => {
    const text = newPrompt || promptInput;
    if (!text.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = generatePlanFromPrompt(text);
      setCurrentPlan(generated);
      setIsGenerating(false);
    }, 1100);
  };

  const handleClaimOffer = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else if (!user.isSubscribed) {
      setIsSubscribeModalOpen(true);
    } else {
      setIsStudioOpen(true);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background CAD Grids & Glows */}
      <div className="absolute inset-0 cad-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP BADGE */}
        <div className="flex flex-col items-center text-center mb-8">
          <div 
            onClick={handleClaimOffer}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs cursor-pointer shadow-xl transition hover:scale-105 mb-6 group ${
              user?.isSubscribed
                ? "bg-emerald-950/60 border-emerald-500/50 hover:border-emerald-400 text-emerald-200 shadow-emerald-950/50"
                : "bg-red-950/60 border-red-500/50 hover:border-red-400 text-red-200 shadow-red-950/50"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${user?.isSubscribed ? "bg-emerald-400" : "bg-red-500 animate-ping"}`}></span>
            <span className={`font-bold uppercase tracking-wider ${user?.isSubscribed ? "text-emerald-400" : "text-red-400"}`}>
              {user?.isSubscribed ? "👑 PRO ACTIVE:" : "🔥 EARLY ACCESS LAUNCH OFFER:"}
            </span>
            <span>
              {user?.isSubscribed ? (
                <strong className="text-white font-extrabold text-sm">Unlimited CAD Generation Active (₹99 Pass)</strong>
              ) : (
                <>Get 1st Month for <strong className="text-white font-extrabold text-sm">₹99</strong> (Regular ₹2,000/mo)</>
              )}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition" />
          </div>

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
            {user?.isSubscribed ? (
              <button
                onClick={() => setIsStudioOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-2xl shadow-emerald-950/60 flex items-center justify-center gap-3 transition active:scale-95 text-base cursor-pointer border border-emerald-400/40"
              >
                <Crown className="w-5 h-5 text-amber-300" />
                <span>Open CAD Studio (Pro Active)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleClaimOffer}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl shadow-2xl shadow-red-600/50 flex items-center justify-center gap-3 transition active:scale-95 text-base cursor-pointer border border-red-400/40"
              >
                <Flame className="w-5 h-5 fill-white text-white" />
                <span>Register for Early Access (₹99)</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setIsStudioOpen(true)}
              className="w-full sm:w-auto px-7 py-4 bg-[#141b29] hover:bg-[#1a2336] text-white font-bold rounded-2xl border border-gray-700 hover:border-gray-500 flex items-center justify-center gap-2.5 transition active:scale-95 text-base cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Try Live CAD Studio</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Login with Google
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

        {/* INTERACTIVE CAD WORKSPACE PREVIEW (Replicating the tablet screen from image) */}
        <div id="demo" className="mt-12 relative max-w-5xl mx-auto">
          {/* Glowing Red Tablet Frame */}
          <div className="relative rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#1b2334] to-[#0c1017] border-2 border-red-500/40 shadow-2xl shadow-red-950/70">
            
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
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-[11px] text-gray-300 font-mono">AUTOCAD AI ENGINE: ACTIVE</span>
              </div>
            </div>

            {/* Prompt input card inside tablet (Directly matching the uploaded image!) */}
            <div className="mb-4 bg-[#141b28]/95 border border-red-500/40 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-wider shrink-0">
                  <Sparkles className="w-4 h-4" />
                  <span>Ask CAD Fast:</span>
                </div>
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTestPrompt()}
                  placeholder="Draw a 4 BHK house plan..."
                  className="flex-1 bg-transparent border-0 text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleTestPrompt()}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-red-900/40 transition active:scale-95 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate</span>
                </button>
              </div>
            </div>

            {/* Preset prompt pills */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto text-[11px] text-gray-400">
              <span className="shrink-0 font-mono text-gray-500">Try Prompts:</span>
              <button
                onClick={() => {
                  setPromptInput("Draw a 4 BHK house plan");
                  handleTestPrompt("Draw a 4 BHK house plan");
                }}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-red-950/40 border border-gray-800 hover:border-red-500/40 text-gray-300 transition shrink-0"
              >
                🏠 Draw a 4 BHK house plan
              </button>
              <button
                onClick={() => {
                  setPromptInput("Design a 3 BHK duplex villa with car porch");
                  handleTestPrompt("Design a 3 BHK duplex villa with car porch");
                }}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-red-950/40 border border-gray-800 hover:border-red-500/40 text-gray-300 transition shrink-0"
              >
                🏡 3 BHK Duplex Villa
              </button>
              <button
                onClick={() => {
                  setPromptInput("Generate mechanical flange with 8 bolt holes");
                  handleTestPrompt("Generate mechanical flange with 8 bolt holes");
                }}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-red-950/40 border border-gray-800 hover:border-red-500/40 text-gray-300 transition shrink-0"
              >
                ⚙️ Mechanical Flange Coupling
              </button>
            </div>

            {/* The CAD Canvas Container */}
            <div className="h-[460px] sm:h-[540px]">
              <InteractiveCADViewer
                data={currentPlan}
                isGenerating={isGenerating}
                highlightBox={currentPlan.id === "plan_4bhk"}
              />
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
              ₹99
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">
              Early Bird 1st Month (95% Off)
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
      </div>
    </section>
  );
}
