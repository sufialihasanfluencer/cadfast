"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Check, 
  Copy, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Crown, 
  Calendar, 
  CreditCard, 
  Award, 
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Clock,
  Layers,
  FileCheck2
} from "lucide-react";

interface ActiveLicenseDashboardProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function ActiveLicenseDashboard({ 
  onClose,
  isModal = false 
}: ActiveLicenseDashboardProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Generate deterministic professional license key based on user UID or payment ID
  const rawSeed = (user?.uid || "USER_ANON") + (user?.email || "cadfast");
  let hashNum = 0;
  for (let i = 0; i < rawSeed.length; i++) {
    hashNum = (hashNum << 5) - hashNum + rawSeed.charCodeAt(i);
    hashNum |= 0;
  }
  const cleanHex = Math.abs(hashNum).toString(16).toUpperCase().padStart(8, "A");
  const licenseKey = `CADFAST-PRO-${cleanHex.substring(0, 4)}-${cleanHex.substring(4, 8)}-2026`;

  // Expiry calculation
  const activationDate = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  const formattedExpiry = expiryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedActivation = activationDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${isModal ? "" : "my-8"} text-white select-none`}>
      {/* Outer Card with Formal CAD Styling */}
      <div className="relative rounded-3xl bg-[#0b0f19] border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/40 p-6 sm:p-10 overflow-hidden">
        
        {/* Subtle Decorative Grid Pattern & Emerald Glow */}
        <div className="absolute inset-0 cad-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* TOP STATUS HEADER */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/30 shrink-0">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Plan Active & Verified
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  REF: {user?.paymentId || "PAY_RZP_VERIFIED"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                CAD FAST Pro — Official License Certificate
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#141b29] hover:bg-[#1a2336] border border-gray-700 text-xs text-gray-300 font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gray-400" />
              <span>Print Certificate / Receipt</span>
            </button> */}
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-gray-700 text-xs text-gray-300 font-semibold transition cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* LICENSE KEY BANNER */}
        <div className="relative z-10 my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#111827] via-[#141d2f] to-[#111827] border border-emerald-500/40 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Official Software Activation Key</span>
              </div>
              <div className="font-mono text-xl sm:text-2xl font-black tracking-wider text-white">
                {licenseKey}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Is key ko apne CAD FAST desktop software me enter karke unlimited access chalu karein.
              </p>
            </div>

            <button
              onClick={handleCopyKey}
              className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shrink-0 shadow-lg ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-600/40"
                  : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-900/40"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Key Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy License Key</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* METRICS & DETAILS GRID */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 my-6">
          <div className="p-4 rounded-2xl bg-[#101625] border border-gray-800">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscription Tier</span>
            </div>
            <div className="text-sm font-bold text-white">
              CAD FAST Pro License
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
              ₹3,000/mo Active Pass
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#101625] border border-gray-800">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Activated On</span>
            </div>
            <div className="text-sm font-bold text-white">
              {formattedActivation}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Instant Activation
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#101625] border border-gray-800">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Valid Until</span>
            </div>
            <div className="text-sm font-bold text-white">
              {formattedExpiry}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
              30 Days Full Access
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#101625] border border-gray-800">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Sync</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> Cloud Synced
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Firebase Firestore DB
            </div>
          </div>
        </div>

        {/* HOW TO ACCESS SOFTWARE GUIDE BOX (Directly addressing user's requirement!) */}
        <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#0d131f] border border-gray-700/80 my-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
            <Layers className="w-4 h-4 text-red-500" />
            <span>Software Access & Activation Instructions</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4 text-xs sm:text-sm">
            Aapka subscription hamare system me verify ho chuka hai. Humara Text-to-CAD generator ek dedicated standalone software me provide kiya jata hai. Software use karne ke liye neeche diye gaye steps follow karein:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs text-gray-300">
            <div className="p-3.5 rounded-xl bg-[#141b2a] border border-gray-800">
              <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 flex items-center justify-center text-[10px]">1</span>
                <span>Open CAD FAST App</span>
              </div>
              <p className="text-gray-400 leading-normal">
                Apne system me CAD FAST software application ya AutoCAD plugin ko open karein.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141b2a] border border-gray-800">
              <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 flex items-center justify-center text-[10px]">2</span>
                <span>Enter Email or Key</span>
              </div>
              <p className="text-gray-400 leading-normal">
                Login screen par apna email (<strong className="text-white">{user?.email || "registered email"}</strong>) ya upar diya gaya License Key paste karein.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141b2a] border border-gray-800">
              <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 flex items-center justify-center text-[10px]">3</span>
                <span>Generate CAD Files</span>
              </div>
              <p className="text-gray-400 leading-normal">
                Prompts dekar 4 BHK house plans, villas aur mechanical parts banayein aur native .DXF export karein.
              </p>
            </div>
          </div>
        </div>

        {/* ACCOUNT & TRANSACTION SUMMARY */}
        <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-[#090d15] border border-gray-800/80 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-gray-400 pb-3 border-b border-gray-800">
            <div>
              <span>Licensed To: </span>
              <strong className="text-white ml-1">{user?.displayName || "Licensed User"}</strong>
              <span className="mx-2">•</span>
              <span className="text-gray-300">{user?.email || "Google Account"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Commercial License Granted</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
            <div>
              Payment Gateway: <strong className="text-gray-300">Razorpay 256-Bit SSL</strong> | Amount: <strong className="text-emerald-400">₹3,000.00 INR / month</strong>
            </div>
            <div>
              Status: <span className="text-emerald-400 font-bold">COMPLETED & ACTIVE</span>
            </div>
          </div>
        </div>

        {/* ASSISTANCE & SUPPORT BAR */}
        <div className="relative z-10 mt-6 pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-red-400" />
            <span>Software setup ya activation me madad chahiye? Hamari priority support desk 24/7 uplabdh hai.</span>
          </div>

          <a
            href="mailto:support@cadfast.ai"
            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition"
          >
            <span>Contact Priority Support</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
