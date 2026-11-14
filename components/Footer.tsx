"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Flame, ShieldCheck, Heart, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Footer() {
  const { setIsAuthModalOpen, user, setIsSubscribeModalOpen, setIsStudioOpen } = useAuth();

  return (
    <footer className="bg-[#05070a] border-t border-gray-800 text-gray-400 text-xs">
      {/* Top Banner / CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-gray-800/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-red-500/50 shadow-xl shadow-red-500/20 shrink-0">
              <Image
                src="/images/cadgptlogo.png"
                alt="CAD FAST Logo"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                <span>CAD FAST</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white">
                  EARLY ACCESS
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                AutoCAD, now with AI — Turn simple prompts into detailed CAD drawings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.isSubscribed ? (
              <button
                onClick={() => setIsStudioOpen(true)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition cursor-pointer flex items-center gap-2"
              >
                <Crown className="w-4 h-4 text-amber-300" />
                <span>Pro Active — Launch Studio</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!user) setIsAuthModalOpen(true);
                  else setIsSubscribeModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-900/50 transition cursor-pointer flex items-center gap-2"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Get 1st Month for ₹99 (Reg. ₹2,000)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links (Technology removed as requested) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Product
          </h4>
          <ul className="space-y-2">
            <li><a href="#demo" className="hover:text-red-400 transition">Interactive CAD Canvas</a></li>
            <li><a href="#features" className="hover:text-red-400 transition">Text to CAD Engine</a></li>
            <li><a href="#pricing" className="hover:text-red-400 transition">DXF Vector Export</a></li>
            <li><a href="#how-it-works" className="hover:text-red-400 transition">Layer Management</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Architecture Presets
          </h4>
          <ul className="space-y-2">
            <li><span className="text-gray-300">4 BHK House Floor Plans</span></li>
            <li><span className="text-gray-300">3 BHK Modern Duplex Villas</span></li>
            <li><span className="text-gray-300">Commercial Office Layouts</span></li>
            <li><span className="text-gray-300">Mechanical Flanges & Gears</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            Security & Guarantee
          </h4>
          <p className="text-gray-400 text-xs mb-3 leading-relaxed">
            All designs come with complete commercial licensing. Ready for direct opening in Autodesk AutoCAD and municipal sanction.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit SSL Secured Platform</span>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
        <div>
          © 2026 CAD FAST. All rights reserved. AutoCAD® is a trademark of Autodesk, Inc. CAD FAST is an independent AI CAD productivity platform.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-400">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
