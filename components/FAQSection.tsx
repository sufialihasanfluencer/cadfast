"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does CAD FAST generate AutoCAD drawings from simple text prompts?",
      a: "CAD FAST uses specialized neural architecture trained on millions of architectural floor plans, municipal building codes, and mechanical engineering blueprints. When you type 'Draw a 4 BHK house plan', it computes structural perimeters, partitions, room ergonomics, door swing clearances, and outputs vector entities directly as CAD geometry.",
    },
    {
      q: "How do I receive and access the CAD FAST software after payment?",
      a: "Immediately upon completing your ₹3,000 payment on our checkout page, our system activates your account and generates your official Pro License Key and digital certificate. You can then download and open the CAD FAST standalone software or AutoCAD plugin, enter your registered email or license key, and immediately begin generating unlimited CAD blueprints.",
    },
    {
      q: "Can I open the generated designs directly in Autodesk AutoCAD?",
      a: "Yes, 100%! CAD FAST exports native ASCII AutoCAD DXF files (R12/R2018 format) that open natively in AutoCAD, Revit, Civil 3D, SolidWorks, and LibreCAD. The drawing preserves discrete layers (WALLS, DOORS, WINDOWS, DIMENSIONS, FURNITURE) and accurate scale.",
    },
    {
      q: "What is included with the ₹3,000 monthly subscription?",
      a: "The ₹3,000/month subscription provides full unlimited access to the standalone desktop software (Windows & macOS), the AutoCAD 2018-2026 AI plugin, unlimited prompt-to-CAD blueprint generations, native .DXF/.DWG exports, cloud project history, and full commercial sanction rights.",
    },
    {
      q: "How does Google Login & Firebase work here?",
      a: "We use Google Firebase Authentication for seamless 1-click Google Sign-in. Your user profile, generated drawings, and subscription records are safely stored in Firebase Firestore cloud database so you can access your CAD drafts from any laptop, desktop, or tablet.",
    },
    {
      q: "Can I use the generated blueprints for client projects and sanction submissions?",
      a: "Absolutely. All CAD designs generated through CAD FAST are 100% royalty-free and come with a full commercial license. You are free to edit them, print blueprints, stamp them, and submit them for client sanctions.",
    },
  ];

  return (
    <section className="py-20 bg-[#07090e] border-t border-gray-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0f1422] border border-gray-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-red-400 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180 text-red-400" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
