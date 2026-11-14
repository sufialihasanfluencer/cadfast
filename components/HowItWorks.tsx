"use client";

import React from "react";
import { MessageSquareText, Cpu, Eye, Download, Sparkles, ArrowRight, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HowItWorks() {
  const { setIsAuthModalOpen, user, setIsSubscribeModalOpen, setIsStudioOpen } = useAuth();

  const steps = [
    {
      step: "01",
      icon: MessageSquareText,
      title: "Give Natural Language Prompt",
      subtitle: "Just like generating AI images with Midjourney",
      desc: "Simply type your requirement: 'Draw a 4 BHK house plan', 'Modern 3 BHK duplex with car porch', or 'Flange with 8 bolt holes'. No CAD coordinates needed.",
      accent: "from-blue-600 to-cyan-500",
    },
    {
      step: "02",
      icon: Cpu,
      title: "AI Computes Structural Geometry",
      subtitle: "Trained on millions of architectural drawings",
      desc: "Our neural CAD engine calculates load-bearing wall thicknesses, standard doorway clearances, room zoning, and creates proper CAD entity tables.",
      accent: "from-red-600 to-rose-500",
    },
    {
      step: "03",
      icon: Eye,
      title: "Interactive CAD Canvas & Layers",
      subtitle: "Full AutoCAD-style layer management",
      desc: "Preview your blueprint inside our dark-theme CAD workspace. Toggle individual layers (WALLS, DOORS, FURNITURE, DIMENSIONS) with millimetric precision.",
      accent: "from-amber-500 to-orange-500",
    },
    {
      step: "04",
      icon: Download,
      title: "1-Click DXF & DWG Export",
      subtitle: "Directly open in Autodesk AutoCAD",
      desc: "Download standard industry R12/R2018 ASCII DXF files. Open instantly in Autodesk AutoCAD, Civil 3D, Revit, SolidWorks or share directly with contractors.",
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#07090e] border-t border-gray-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Generation Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How CAD FAST Transforms <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              Drafting from Hours to Seconds
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Just like people generate artwork from prompts today, you can now generate complete engineering & architectural blueprints right from our panel.
          </p>
        </div>

        {/* 4 STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div
              key={st.step}
              className="relative bg-[#0e131d] border border-gray-800 hover:border-red-500/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${st.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                    <st.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-gray-800 font-mono group-hover:text-red-500/30 transition">
                    {st.step}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 mb-1">
                  {st.subtitle}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-200 transition">
                  {st.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-300">
                <span>Phase {i + 1} of 4</span>
                <ArrowRight className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA box inside section */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#141b29] to-red-950/30 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${user?.isSubscribed ? "text-emerald-400" : "text-red-400"}`}>
              {user?.isSubscribed ? "Pro Membership Active" : "Early Access Registration"}
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              {user?.isSubscribed ? "Unlimited Text-to-CAD Generations Active" : "Try CAD FAST with Google Sign-in for just ₹99"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {user?.isSubscribed ? "Aapka subscription verified hai. CAD studio me jaakar naye drawings create karein!" : "Regular price is ₹2,000/mo. Lock in 95% discount for your first month now!"}
            </p>
          </div>

          {user?.isSubscribed ? (
            <button
              onClick={() => setIsStudioOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-emerald-950/50 flex items-center gap-2 shrink-0 transition active:scale-95 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Launch Studio (Pro Active)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!user) setIsAuthModalOpen(true);
                else setIsSubscribeModalOpen(true);
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-red-900/50 flex items-center gap-2 shrink-0 transition active:scale-95 cursor-pointer"
            >
              <span>Claim ₹99 Offer Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
