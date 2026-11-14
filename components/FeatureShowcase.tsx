"use client";

import React from "react";
import Image from "next/image";
import { 
  FileCode, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Maximize, 
  FolderSync,
  Compass,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FeatureShowcase() {
  const { setIsAuthModalOpen, user, setIsSubscribeModalOpen } = useAuth();

  const features = [
    {
      icon: Zap,
      title: "Text to CAD Intelligence",
      description: "Describe any residential villa, commercial floor plan, or mechanical part in plain Hindi or English. The AI builds precise vector geometry.",
      highlight: "Midjourney for Architects",
      color: "text-amber-400",
    },
    {
      icon: FileCode,
      title: "Native .DXF & .DWG Export",
      description: "Generates industry-standard AutoCAD ASCII DXF files. Open them natively in Autodesk AutoCAD, Civil 3D, SolidWorks, and LibreCAD without conversion.",
      highlight: "AutoCAD R12/2026 Ready",
      color: "text-red-400",
    },
    {
      icon: Layers,
      title: "Automated Layer Segregation",
      description: "Entities are neatly distributed across WALLS, DOORS, WINDOWS, DIMENSIONS, and FURNITURE layers with color coding (White, Red, Cyan, Yellow, Green).",
      highlight: "Zero Manual Layering",
      color: "text-cyan-400",
    },
    {
      icon: Compass,
      title: "Standard Architectural Scales",
      description: "Every floor plan is drawn to scale (1:50, 1:100) with precise wall thicknesses (9-inch outer, 4.5-inch partition) and standard door clearances.",
      highlight: "NBC & Municipal Standard",
      color: "text-emerald-400",
    },
    {
      icon: FolderSync,
      title: "Firebase Cloud Project Sync",
      description: "Sign in with Google and automatically sync your prompts, generated floor plans, and subscription entitlements across all your devices.",
      highlight: "Firebase & Firestore DB",
      color: "text-blue-400",
    },
    {
      icon: ShieldCheck,
      title: "Full Commercial License",
      description: "All generated plans and DXF downloads belong 100% to you. Use them for client presentations, construction blueprints, and municipal submissions.",
      highlight: "100% Royalty Free",
      color: "text-purple-400",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#090d16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Engineers & Architects
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
              Automate CAD Drafting
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Stop drawing walls line by line. Let CAD FAST turn your client requirements into ready-to-edit AutoCAD files in seconds.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-[#101624] border border-gray-800 hover:border-red-500/50 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#172033] border border-gray-700/60 flex items-center justify-center group-hover:scale-110 transition shadow-md">
                    <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono font-medium text-gray-300">
                    {feat.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-red-300 transition">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center text-xs font-semibold text-red-400 group-hover:text-red-300 transition gap-1">
                <span>Explore capability</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Visual Banner Preview using uploaded banner image */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-red-500/30 shadow-2xl relative bg-black">
          <div className="relative w-full h-56 sm:h-80 md:h-96">
            <Image
              src="/images/cadfastbanner.png"
              alt="AutoCAD Now With AI - CAD FAST Banner"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover opacity-90 hover:scale-[1.01] transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
