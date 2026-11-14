"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import InteractiveCADViewer from "./InteractiveCADViewer";
import { 
  fourBhkPlan, 
  threeBhkVillaPlan, 
  commercialOfficePlan,
  structuralGridPlan,
  mechanicalFlangePlan, 
  generatePlanFromPrompt,
  CADDrawingData 
} from "@/lib/cadModels";
import { 
  X, 
  Send, 
  Sparkles, 
  Download, 
  RotateCcw, 
  MousePointer, 
  Hand, 
  Minus, 
  Square, 
  Circle, 
  Layers, 
  Terminal,
  Compass,
  CheckCircle2,
  ChevronDown,
  FileCode
} from "lucide-react";

export default function CADStudioModal() {
  const { isStudioOpen, setIsStudioOpen, user, setIsSubscribeModalOpen } = useAuth();
  
  const [prompt, setPrompt] = useState("Draw a 4 BHK house plan");
  const [activePlan, setActivePlan] = useState<CADDrawingData>(fourBhkPlan);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"Home" | "Insert" | "Annotate" | "View" | "Manage" | "Output">("Home");
  const [activeTool, setActiveTool] = useState("select");
  const [showVastuInfo, setShowVastuInfo] = useState(false);
  const [commandLog, setCommandLog] = useState<string[]>([
    "AutoCAD Engine v2026 initialized with Firebase cloud sync.",
    "CAD FAST Neural Core: READY.",
    "Type prompt or command below to generate blueprints.",
  ]);

  if (!isStudioOpen) return null;

  const handleGenerate = async (customPrompt?: string) => {
    const promptToUse = customPrompt || prompt;
    if (!promptToUse.trim()) return;

    if (user && !user.isSubscribed) {
      setIsSubscribeModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setCommandLog((prev) => [
      ...prev,
      `Command: _CADFAST_PROMPT "${promptToUse}"`,
      "Calculating architectural partitions & perimeter...",
      "Drafting double-line walls and door arcs...",
    ]);

    setTimeout(() => {
      const result = generatePlanFromPrompt(promptToUse);
      setActivePlan(result);
      setIsGenerating(false);
      setCommandLog((prev) => [
        ...prev,
        `Generated: ${result.title}`,
        `Entities: ${result.entities.length} CAD elements | Scale: 1:100 Metric`,
        "DXF Export: Ready for download.",
      ]);
    }, 1100);
  };

  const handlePreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
    handleGenerate(presetPrompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-7xl h-[96vh] sm:h-[94vh] bg-[#0c1017] border border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP TITLEBAR */}
        <div className="bg-[#111622] border-b border-gray-800 px-3 sm:px-4 py-2 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold text-white shadow-md text-xs shrink-0">
              A
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="font-bold text-white tracking-wide">CAD FAST</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300 truncate max-w-[150px] sm:max-w-xs">{activePlan.title}</span>
            </div>
            {user?.isSubscribed && (
              <span className="hidden md:inline px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-semibold">
                PRO ACTIVE (₹99 Plan)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activePlan.vastuScore && (
              <button
                onClick={() => setShowVastuInfo(!showVastuInfo)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-lg text-[11px] font-semibold hover:bg-amber-500/25 transition cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Vastu: {activePlan.vastuScore}%</span>
              </button>
            )}

            {!user?.isSubscribed && (
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-lg text-xs shadow-md shadow-red-900/50 transition cursor-pointer shrink-0"
              >
                ⚡ Get Pass (₹99)
              </button>
            )}
            <button
              onClick={() => setIsStudioOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTOCAD RIBBON TABS & PRESETS */}
        <div className="bg-[#151b28] border-b border-gray-800 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 select-none">
          {/* Tabs */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto">
            {(["Home", "Insert", "Annotate", "View", "Manage", "Output"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 sm:px-3 py-1 rounded-md font-medium transition shrink-0 ${
                  activeTab === tab
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Preset Prompts */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] w-full sm:w-auto pt-1 sm:pt-0">
            <span className="text-gray-400 font-mono hidden md:inline">Presets:</span>
            <button
              onClick={() => handlePreset("Draw a 4 BHK house plan")}
              className="px-2 py-0.5 sm:py-1 rounded-lg bg-[#1c2436] hover:bg-red-900/40 border border-gray-700 hover:border-red-500/50 text-gray-200 transition shrink-0 text-[11px]"
            >
              4 BHK Plan
            </button>
            <button
              onClick={() => handlePreset("Design a 3 BHK duplex villa with car porch")}
              className="px-2 py-0.5 sm:py-1 rounded-lg bg-[#1c2436] hover:bg-red-900/40 border border-gray-700 hover:border-red-500/50 text-gray-200 transition shrink-0 text-[11px]"
            >
              3 BHK Duplex
            </button>
            <button
              onClick={() => handlePreset("Design a commercial tech office with conference room")}
              className="px-2 py-0.5 sm:py-1 rounded-lg bg-[#1c2436] hover:bg-red-900/40 border border-gray-700 hover:border-red-500/50 text-gray-200 transition shrink-0 text-[11px]"
            >
              Tech Office
            </button>
            <button
              onClick={() => handlePreset("Generate civil structural column layout and footing grid")}
              className="px-2 py-0.5 sm:py-1 rounded-lg bg-[#1c2436] hover:bg-red-900/40 border border-gray-700 hover:border-red-500/50 text-gray-200 transition shrink-0 text-[11px]"
            >
              Column Grid
            </button>
          </div>
        </div>

        {/* VASTU ANALYSIS FLYOUT DROPDOWN */}
        {showVastuInfo && activePlan.vastuNotes && (
          <div className="bg-[#141b2b] border-b border-amber-500/40 px-4 py-2.5 text-xs text-amber-200 animate-in slide-in-from-top-1 duration-150">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold flex items-center gap-1.5 text-amber-400">
                <Compass className="w-4 h-4" />
                Vastu Compliance Analysis (Score: {activePlan.vastuScore}/100)
              </span>
              <button
                onClick={() => setShowVastuInfo(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-gray-300">
              {activePlan.vastuNotes.map((note, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKSPACE & CANVAS */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
          
          {/* TOOL PALETTE (Left on desktop, top bar on mobile) */}
          <div className="w-full md:w-12 bg-[#101522] border-b md:border-b-0 md:border-r border-gray-800 flex md:flex-col items-center py-1.5 md:py-2.5 px-2 md:px-0 gap-2 shrink-0 justify-around md:justify-start">
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
                className={`p-1.5 sm:p-2 rounded-xl transition ${
                  activeTool === tool.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <tool.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* MAIN CAD VIEWPORT */}
          <div className="flex-1 flex flex-col min-h-0 relative p-2 sm:p-3 bg-[#090c12]">
            
            {/* FLOATING "ASK CAD FAST" PROMPT BAR */}
            <div className="relative mb-2 max-w-xl mx-auto w-full z-20">
              <div className="bg-[#141b29]/95 backdrop-blur-md border-2 border-red-500/60 rounded-2xl p-1.5 sm:p-2 shadow-2xl shadow-red-950/70 flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 pl-1.5 sm:pl-2 text-red-500 font-bold text-xs uppercase tracking-wider shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                  <span className="hidden sm:inline">Ask CAD Fast:</span>
                </div>

                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="Draw a 4 BHK house plan..."
                  className="flex-1 bg-transparent border-0 px-1 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none font-medium min-w-0"
                />

                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/60 transition active:scale-95 disabled:opacity-60 cursor-pointer"
                  title="Generate CAD Drawing"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Interactive CAD Canvas */}
            <div className="w-full h-full flex-1 min-h-[320px] sm:min-h-[420px]">
              <InteractiveCADViewer
                data={activePlan}
                isGenerating={isGenerating}
                highlightBox={activePlan.id === "plan_4bhk"}
              />
            </div>

            {/* AUTOCAD CLI COMMAND LINE AT BOTTOM */}
            <div className="h-16 sm:h-20 bg-[#0d121c] border-t border-gray-800/90 p-2 flex flex-col justify-between text-xs font-mono select-none mt-1 rounded-xl">
              <div className="overflow-y-auto space-y-0.5 text-gray-400 text-[10px] sm:text-[11px] max-h-8 sm:max-h-11">
                {commandLog.slice(-2).map((log, i) => (
                  <div key={i} className="flex items-center gap-1.5 truncate">
                    <span className="text-gray-600">&gt;</span>
                    <span className={log.startsWith("Command:") ? "text-red-400 font-semibold" : "text-gray-300"}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pt-1 border-t border-gray-800 text-[10px] sm:text-[11px]">
                <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 shrink-0" />
                <span className="text-red-400 font-bold shrink-0">Command:</span>
                <input
                  type="text"
                  placeholder="Type an AutoCAD command or prompt..."
                  className="flex-1 bg-transparent border-0 text-white placeholder-gray-600 focus:outline-none min-w-0"
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
    </div>
  );
}
