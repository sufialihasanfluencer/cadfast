"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Ar. Rajesh Verma",
      role: "Principal Architect, Verma & Associates, New Delhi",
      content:
        "Earlier, turning client briefs into an initial 4 BHK AutoCAD drawing used to take our junior drafters at least 8 to 10 hours. With CAD FAST, I just typed the room dimensions and got a clean, layered DXF file in literally 15 seconds. Incredible tool!",
      rating: 5,
      project: "4 BHK Villa & G+2 Sanctions",
    },
    {
      name: "Er. Priya Sundaram",
      role: "Civil Structural Consultant, Bengaluru",
      content:
        "The DXF export is 100% clean. When I opened it in AutoCAD 2026, all layers (WALLS, DOORS, DIMENSIONS) were perfectly mapped. Subscribing to the CAD FAST Pro monthly license was the best decision for our firm.",
      rating: 5,
      project: "Commercial Floor Plans",
    },
    {
      name: "Vikramjit Singh",
      role: "Turnkey Contractor & Builder, Mohali / Chandigarh",
      content:
        "Clients always ask 'Bhaiya, ek bar rough plan bana kar dikhao'. Now on site itself, I open CAD FAST on my tablet, type the prompt in front of them, and show them the complete layout. Deals close in 1 meeting now!",
      rating: 5,
      project: "Duplex Residential Plans",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#090d16] border-t border-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Architect & Drafter Verified
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by 5,000+ CAD Professionals
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            See how architects, interior designers, and civil contractors are drafting 10x faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-[#101625] border border-gray-800 hover:border-red-500/40 rounded-3xl p-7 flex flex-col justify-between shadow-xl transition hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gray-700" />
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800/80">
                <div className="font-bold text-white text-sm">{rev.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{rev.role}</div>
                <div className="inline-block mt-2 px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-[10px] font-mono">
                  {rev.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
