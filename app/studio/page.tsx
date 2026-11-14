"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import InteractiveCADViewer from "@/components/InteractiveCADViewer";
import { 
  fourBhkPlan, 
  threeBhkVillaPlan, 
  mechanicalFlangePlan, 
  generatePlanFromPrompt, 
  CADDrawingData 
} from "@/lib/cadModels";
import { 
  Sparkles, 
  Send, 
  MousePointer, 
  Hand, 
  Minus, 
  Square, 
  Circle, 
  Terminal, 
  ArrowLeft,
  Flame,
  Download,
  Layers,
  Crown
} from "lucide-react";

export default function StudioPage() {
  const { user, setIsAuthModalOpen, setIsSubscribeModalOpen } = useAuth();
  const [prompt, setPrompt] = useState("Draw a 4 BHK house plan");
  const [activePlan, setActivePlan] = useState<CADDrawingData>(fourBhkPlan);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"Home" | "Insert" | "Annotate" | "View" | "Manage" | "Output">("Home");
  const [activeTool, setActiveTool] = useState("select");
  const [commandLog, setCommandLog] = useState<string[]>([
    "AutoCAD Cloud Engine v2026 initialized.",
    "CAD FAST Neural Core: READY.",
    "Enter prompt or AutoCAD command to draft blueprint.",
  ]);

  const handleGenerate = (customPrompt?: string) => {
    const text = customPrompt || prompt;
    if (!text.trim()) return;

    if (user && !user.isSubscribed) {
      setIsSubscribeModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setCommandLog((prev) => [
      ...prev,
      `Command: _CADFAST_PROMPT "${text}"`,
      "Calculating architectural partitions & outer walls...",
    ]);

    setTimeout(() => {
      const result = generatePlanFromPrompt(text);
      setActivePlan(result);
      setIsGenerating(false);
      setCommandLog((prev) => [
        ...prev,
        `Success: Generated ${result.title}`,
        `Entities: ${result.entities.length} CAD elements | Scale: 1:100 Metric`,
        "DXF Export: Ready for download.",
      ]);
    }, 1200);
  };

  return (
    <div className="pt-20 min-h-screen bg-[#070a10] flex flex-col">
      {/* Studio Top Control Bar */}
      <div className="bg-[#0f1422] border-b border-gray-800 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center font-bold text-white text-xs">
              A
            </div>
            <span className="font-bold text-white">CAD FAST Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.isSubscribed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold">
              <Crown className="w-3.5 h-3.5" />
              <span>Early Access Active (₹99/mo)</span>
            </div>
          ) : (
            <button
              onClick={() => {
                if (!user) setIsAuthModalOpen(true);
                else setIsSubscribeModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-lg text-xs shadow-md shadow-red-900/50 transition cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Unlock Unlimited DXF (₹99)</span>
            </button>
          )}
        </div>
      </div>

      {/* Ribbon Bar */}
      <div className="bg-[#131928] border-b border-gray-800 px-4 sm:px-6 py-2 flex items-center justify-between gap-4 overflow-x-auto text-xs">
        <div className="flex items-center gap-1">
          {(["Home", "Insert", "Annotate", "View", "Manage", "Output"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === tab
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-gray-500 font-mono">Sample Prompts:</span>
          <button
            onClick={() => {
              setPrompt("Draw a 4 BHK house plan");
              handleGenerate("Draw a 4 BHK house plan");
            }}
            className="px-2.5 py-1 rounded-md bg-[#1d263a] hover:bg-red-950/40 border border-gray-700 text-gray-200 transition"
          >
            4 BHK Plan
          </button>
          <button
            onClick={() => {
              setPrompt("Design a 3 BHK duplex villa with car porch");
              handleGenerate("Design a 3 BHK duplex villa with car porch");
            }}
            className="px-2.5 py-1 rounded-md bg-[#1d263a] hover:bg-red-950/40 border border-gray-700 text-gray-200 transition"
          >
            3 BHK Duplex
          </button>
          <button
            onClick={() => {
              setPrompt("Generate mechanical flange with 8 bolt holes");
              handleGenerate("Generate mechanical flange with 8 bolt holes");
            }}
            className="px-2.5 py-1 rounded-md bg-[#1d263a] hover:bg-red-950/40 border border-gray-700 text-gray-200 transition"
          >
            Mechanical Flange
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        {/* Left Toolbar */}
        <div className="w-12 bg-[#0d121c] border-r border-gray-800 flex md:flex-col items-center py-3 gap-2.5 shrink-0 justify-around md:justify-start">
          {[
            { id: "select", icon: MousePointer, label: "Select (ESC)" },
            { id: "pan", icon: Hand, label: "Pan (P)" },
            { id: "line", icon: Minus, label: "Line (L)" },
            { id: "rect", icon: Square, label: "Rectangle (REC)" },
            { id: "circle", icon: Circle, label: "Circle (C)" },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              title={tool.label}
              className={`p-2 rounded-xl transition ${
                activeTool === tool.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <tool.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Viewport Area */}
        <div className="flex-1 flex flex-col min-h-0 relative p-3 sm:p-5 bg-[#080b12]">
          {/* Top Floating Prompt Input (Identical to image) */}
          <div className="mb-4 max-w-2xl mx-auto w-full">
            <div className="bg-[#121826]/95 backdrop-blur-md border-2 border-red-500/60 rounded-2xl p-2 shadow-2xl flex items-center gap-2">
              <div className="flex items-center gap-1.5 pl-2 text-red-500 font-bold text-xs uppercase tracking-wider shrink-0">
                <Sparkles className="w-4 h-4" />
                <span>Ask CAD Fast:</span>
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. Draw a 4 BHK house plan..."
                className="flex-1 bg-transparent border-0 px-2 py-1 text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
              />
              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/60 transition active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="flex-1 h-[520px]">
            <InteractiveCADViewer
              data={activePlan}
              isGenerating={isGenerating}
              highlightBox={activePlan.id === "plan_4bhk"}
            />
          </div>

          {/* AutoCAD CLI Terminal */}
          <div className="h-20 bg-[#0b0e17] border border-gray-800 rounded-xl p-2.5 flex flex-col justify-between text-xs font-mono select-none mt-3">
            <div className="overflow-y-auto space-y-0.5 text-gray-400 text-[11px] max-h-10">
              {commandLog.slice(-3).map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-gray-600">&gt;</span>
                  <span className={log.startsWith("Command:") ? "text-red-400 font-semibold" : "text-gray-300"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-gray-800/80 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span className="text-red-400 font-bold">Command:</span>
              <input
                type="text"
                placeholder="Type command or prompt (e.g. _GENERATE, _EXPORT)..."
                className="flex-1 bg-transparent border-0 text-white placeholder-gray-600 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) {
                      handleGenerate(val);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
