"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Zap, ExternalLink, Info } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setError(null);
      await loginWithGoogle();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Login failed. Please check popup permissions.";
      setError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#101520] border border-gray-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-red-950/40 text-white overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2.5 rounded-2xl overflow-hidden ring-2 ring-red-500/50 shadow-xl shadow-red-500/30">
            <Image
              src="/images/cadgptlogo.png"
              alt="CAD FAST Logo"
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AutoCAD, now with AI
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Welcome to CAD FAST
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Turn natural language prompts into professional CAD floor plans & DXF drawings.
          </p>
        </div>

        {/* Plan Callout */}
        <div className="mb-5 bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-red-400">
              Professional Software Licensing
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">
              Full Pro License for <span className="text-red-400 text-sm sm:text-base font-bold">₹3,000</span>{" "}
              <span className="text-gray-400 text-xs font-normal">/ month</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-xs tracking-wider">
            PRO
          </span>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-5 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Generate 2D/3D floor plans with natural language prompts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Native .DXF export directly compatible with Autodesk AutoCAD</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cloud sync of all your drafts and architectural projects</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-2xl shadow-xl transition active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mb-2.5"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-gray-900" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
              <ArrowRight className="w-4 h-4 text-gray-500 ml-auto" />
            </>
          )}
        </button>

        {/* 1-Click Instant Access fallback */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-3 bg-[#161f30] hover:bg-[#1d2940] border border-gray-700/80 hover:border-gray-600 text-gray-300 font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Instant Login (Bypass Popup)</span>
        </button>

        {error && (
          <div className="mt-3 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300 text-center">
            {error}
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Firebase Auth & Firestore DB Live</span>
        </div>
      </div>
    </div>
  );
}
