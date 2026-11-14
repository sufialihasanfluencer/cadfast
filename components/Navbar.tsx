"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { 
  Sparkles, 
  Flame, 
  LogIn, 
  LogOut, 
  ChevronRight, 
  Crown,
  LayoutGrid,
  ShieldCheck,
  Menu,
  X,
  Layers,
  HelpCircle,
  Zap,
  ArrowRight,
  User as UserIcon
} from "lucide-react";

export default function Navbar() {
  const { 
    user, 
    setIsAuthModalOpen, 
    setIsSubscribeModalOpen, 
    setIsStudioOpen, 
    logout 
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#070a10]/95 backdrop-blur-md border-b border-gray-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* BRAND / LOGO */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden ring-2 ring-red-500/50 shadow-lg shadow-red-600/20 group-hover:scale-105 transition shrink-0">
                <Image
                  src="/images/cadgptlogo.png"
                  alt="CAD FAST Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-base sm:text-xl font-black tracking-tight text-white">
                    CAD <span className="text-red-500">FAST</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[8px] sm:text-[10px] font-bold bg-red-600/20 border border-red-500/40 text-red-400">
                    AI
                  </span>
                </div>
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-mono tracking-wider -mt-0.5 hidden xs:inline sm:inline">
                  AUTOCAD INTELLIGENCE
                </span>
              </div>
            </a>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300">
            <a href="#demo" className="hover:text-red-400 transition">
              Live Demo
            </a>
            <a href="#how-it-works" className="hover:text-red-400 transition">
              How It Works
            </a>
            <a href="#features" className="hover:text-red-400 transition">
              Features
            </a>
            {user?.isSubscribed ? (
              <button
                onClick={() => setIsStudioOpen(true)}
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition cursor-pointer"
              >
                <Crown className="w-4 h-4 text-emerald-400" />
                <span>Studio (Pro Active)</span>
              </button>
            ) : (
              <a 
                href="#pricing" 
                className="flex items-center gap-1.5 text-red-400 font-semibold hover:text-red-300 transition"
              >
                <Flame className="w-4 h-4 fill-red-500 text-red-500" />
                <span>₹99 Early Offer</span>
              </a>
            )}
          </nav>

          {/* HEADER RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              /* LOGGED IN USER ACTIONS */
              <div className="flex items-center gap-2 sm:gap-3">
                {user.isSubscribed ? (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Pro Active</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSubscribeModalOpen(true)}
                    className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600/20 border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-600/30 transition cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Activate ₹99</span>
                  </button>
                )}

                {/* Studio CTA Button */}
                <button
                  onClick={() => setIsStudioOpen(true)}
                  className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs shadow-md shadow-red-900/40 transition active:scale-95 cursor-pointer"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Launch Studio</span>
                  <span className="sm:hidden">Studio</span>
                </button>

                {/* Account Badge (No photo) */}
                <div className="flex items-center gap-1.5 pl-1 border-l border-gray-800">
                  <div 
                    title={user.email || "User Account"}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center text-xs font-bold"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                  <button
                    onClick={() => logout()}
                    title="Sign Out"
                    className="p-1 sm:p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* LOGGED OUT USER ACTIONS */
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141b29] hover:bg-[#1a2336] border border-gray-700 hover:border-gray-600 text-white text-xs font-semibold transition cursor-pointer shadow-md"
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
                  <span>Google Login</span>
                </button>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-red-900/50 transition active:scale-95 cursor-pointer shrink-0"
                >
                  <Flame className="w-3.5 h-3.5 fill-white text-white" />
                  <span className="hidden xs:inline sm:inline">Get Early Access (₹99)</span>
                  <span className="xs:hidden">₹99 Deal</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#141a26] border border-gray-800 text-gray-300 hover:text-white transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0e17]/98 backdrop-blur-xl border-b border-gray-800 shadow-2xl px-4 py-5 animate-in slide-in-from-top-3 duration-200">
            
            {user ? (
              <div className="bg-[#121826] border border-gray-700/70 rounded-2xl p-3.5 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white truncate max-w-[170px]">
                      {user.displayName || "Architect"}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate max-w-[170px]">
                      {user.email}
                    </div>
                    {user.isSubscribed ? (
                      <span className="inline-block mt-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                        PRO ACTIVE (₹99 Plan)
                      </span>
                    ) : (
                      <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.2 rounded">
                        Free Trial
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-950/40 rounded-lg border border-red-500/30 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white text-gray-900 font-bold rounded-xl text-xs shadow-md transition"
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
                  <span>Sign In with Google</span>
                </button>

                <button
                  onClick={() => {
                    setIsSubscribeModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl text-xs shadow-md shadow-red-900/40"
                >
                  <Flame className="w-4 h-4 fill-white" />
                  <span>Claim 1st Month for ₹99 (Reg. ₹2,000)</span>
                </button>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="space-y-1 text-sm font-medium text-gray-200">
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition"
              >
                <span>Interactive CAD Demo</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition"
              >
                <span>How Prompt-to-CAD Works</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </a>

              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition"
              >
                <span>AutoCAD DXF & Layers</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </a>

              {user?.isSubscribed ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsStudioOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 font-bold transition text-left"
                >
                  <span className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-emerald-400" />
                    <span>CAD FAST Pro Active</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black">
                    UNLIMITED
                  </span>
                </button>
              ) : (
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-400 font-bold transition"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-red-500 text-red-500" />
                    <span>Early Bird Offer — ₹99/mo</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black">
                    95% OFF
                  </span>
                </a>
              )}
            </div>

            {/* Launch Studio Button */}
            <div className="pt-3 mt-3 border-t border-gray-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsStudioOpen(true);
                }}
                className="w-full py-3 bg-[#182133] hover:bg-[#202c45] border border-gray-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <LayoutGrid className="w-4 h-4 text-red-500" />
                <span>Open Full CAD Studio Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
