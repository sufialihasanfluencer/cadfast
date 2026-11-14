"use client";

import React, { useState, useRef, useEffect } from "react";
import { CADDrawingData } from "@/lib/cadModels";
import { generateDXF, downloadFile } from "@/lib/dxfGenerator";
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Eye, 
  EyeOff, 
  Sparkles,
  FileCode,
  Ruler,
  Printer
} from "lucide-react";

interface InteractiveCADViewerProps {
  data: CADDrawingData;
  isGenerating?: boolean;
  highlightBox?: boolean;
  readOnly?: boolean;
}

export default function InteractiveCADViewer({
  data,
  isGenerating = false,
  highlightBox = true,
  readOnly = false,
}: InteractiveCADViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 420.5, y: 260.8 });
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<{ x: number; y: number }[]>([]);

  // Layer visibility state
  const [layers, setLayers] = useState({
    WALLS: true,
    DOORS: true,
    WINDOWS: true,
    DIMENSIONS: true,
    FURNITURE: true,
    TEXT: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layerName: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMeasuring) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left - pan.x) / zoom;
        const relY = (e.clientY - rect.top - pan.y) / zoom;
        if (measurePoints.length >= 2) {
          setMeasurePoints([{ x: relX, y: relY }]);
        } else {
          setMeasurePoints((prev) => [...prev, { x: relX, y: relY }]);
        }
      }
      return;
    }

    if (e.button === 0 || e.button === 1) { // Left or middle click to pan
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left - pan.x) / zoom;
      const relativeY = (e.clientY - rect.top - pan.y) / zoom;
      setMouseCoords({
        x: Math.round(relativeX * 10) / 10,
        y: Math.round(relativeY * 10) / 10,
      });
    }

    if (isPanning && !isMeasuring) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.88;
    setZoom((prev) => Math.min(Math.max(prev * factor, 0.4), 4.0));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setMeasurePoints([]);
    setIsMeasuring(false);
  };

  const exportAsDXF = () => {
    const dxfContent = generateDXF(data.entities, data.title);
    downloadFile(dxfContent, `${data.id || "drawing"}.dxf`, "application/dxf");
  };

  const exportAsSVG = () => {
    const svgEl = document.getElementById(`cad-svg-${data.id}`);
    if (svgEl) {
      const svgContent = new XMLSerializer().serializeToString(svgEl);
      downloadFile(svgContent, `${data.id || "cadfast-drawing"}.svg`, "image/svg+xml");
    }
  };

  const printBlueprint = () => {
    window.print();
  };

  // Calculate measurement distance
  const measuredDistance =
    measurePoints.length === 2
      ? Math.sqrt(
          Math.pow(measurePoints[1].x - measurePoints[0].x, 2) +
          Math.pow(measurePoints[1].y - measurePoints[0].y, 2)
        )
      : null;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full min-h-[400px] bg-[#0c1017] rounded-2xl border border-gray-800 overflow-hidden select-none shadow-2xl flex flex-col ${
        isMeasuring ? "cursor-cell" : "cad-viewport"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* CAD Top Toolbar / HUD */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-20 flex items-center justify-between pointer-events-none gap-2">
        {/* Project Title & Scale Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto bg-[#141a24]/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-gray-700/60 shadow-lg text-[11px] sm:text-xs truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
          <span className="font-semibold text-white tracking-wide truncate">{data.title}</span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-gray-300 font-mono text-[10px] sm:text-[11px] hidden sm:inline">{data.dimensions}</span>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1 pointer-events-auto bg-[#141a24]/90 backdrop-blur-md p-1 rounded-xl border border-gray-700/60 shadow-lg shrink-0">
          <button
            onClick={() => setZoom((z) => Math.min(z * 1.2, 4))}
            title="Zoom In"
            className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z * 0.8, 0.4))}
            title="Zoom Out"
            className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          
          {/* Measure Tool */}
          <button
            onClick={() => {
              setIsMeasuring(!isMeasuring);
              setMeasurePoints([]);
            }}
            title={isMeasuring ? "Exit Measure Tool" : "Measure Distance"}
            className={`p-1 sm:p-1.5 rounded-lg transition ${
              isMeasuring
                ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/50"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={resetView}
            title="Reset View"
            className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          
          <div className="w-[1px] h-4 bg-gray-700 mx-0.5"></div>

          {/* Layer Controls Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              title="Layers"
              className={`p-1 sm:p-1.5 rounded-lg transition flex items-center gap-1 text-xs ${
                showLayerMenu ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] hidden md:inline">Layers</span>
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 top-9 w-48 bg-[#161c28] border border-gray-700 rounded-xl p-2.5 shadow-2xl z-50 text-xs">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  CAD Layer Visibility
                </div>
                {(Object.keys(layers) as Array<keyof typeof layers>).map((layerKey) => (
                  <button
                    key={layerKey}
                    onClick={() => toggleLayer(layerKey)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/5 transition text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            layerKey === "WALLS" ? "#ffffff" :
                            layerKey === "DOORS" ? "#ff3344" :
                            layerKey === "WINDOWS" ? "#38bdf8" :
                            layerKey === "DIMENSIONS" ? "#facc15" :
                            layerKey === "FURNITURE" ? "#4ade80" : "#94a3b8"
                        }}
                      />
                      <span className="text-gray-200 font-mono text-[11px]">{layerKey}</span>
                    </span>
                    {layers[layerKey] ? (
                      <Eye className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-[1px] h-4 bg-gray-700 mx-0.5"></div>

          {/* DXF & SVG Export Buttons */}
          <button
            onClick={exportAsDXF}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-medium transition shadow-md shadow-red-900/40 cursor-pointer"
            title="Download AutoCAD DXF file"
          >
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="font-mono text-[10px] sm:text-[11px]">.DXF</span>
          </button>
          
          <button
            onClick={printBlueprint}
            className="p-1 sm:p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Print Blueprint"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Measurement HUD banner */}
      {isMeasuring && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-amber-500/90 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
          <Ruler className="w-4 h-4" />
          <span>
            {measurePoints.length === 0 && "Click first point on blueprint to start measuring"}
            {measurePoints.length === 1 && "Click second point to measure distance"}
            {measuredDistance !== null && (
              <>
                Distance: {measuredDistance.toFixed(1)} px / {(measuredDistance * 0.05).toFixed(2)} meters
              </>
            )}
          </span>
        </div>
      )}

      {/* Generation Overlay */}
      {isGenerating && (
        <div className="absolute inset-0 z-30 bg-[#0c1017]/85 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none p-4 text-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center shadow-2xl shadow-red-500/50 animate-pulse">
              <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute -inset-2 rounded-2xl border border-red-500/40 animate-ping"></div>
          </div>
          <div className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide">
            CAD FAST AI Engine Computing...
          </div>
          <p className="text-xs text-gray-400 font-mono mb-4">
            Generating double-line walls, load calculations & room vectors...
          </p>
          <div className="w-48 sm:w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div className="h-full bg-gradient-to-r from-red-600 to-amber-500 w-3/4 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* SVG Canvas Viewport */}
      <div className="w-full h-full flex-1 flex items-center justify-center overflow-hidden cad-grid-pattern relative">
        <svg
          id={`cad-svg-${data.id}`}
          viewBox={`${data.viewBox.x} ${data.viewBox.y} ${data.viewBox.width} ${data.viewBox.height}`}
          className="w-full h-full transition-transform duration-75 origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Subtle Grid Coordinates */}
          <defs>
            <pattern id="cadGridSmall" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <pattern id="cadGridMajor" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#cadGridSmall)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#cadGridMajor)" />

          {/* Render CAD Entities */}
          {data.entities.map((entity, idx) => {
            if (!layers[entity.layer]) return null;

            if (entity.type === "LINE") {
              const color =
                entity.layer === "WALLS" ? "#ffffff" :
                entity.layer === "DOORS" ? "#ff3344" :
                entity.layer === "DIMENSIONS" ? "#facc15" :
                entity.layer === "FURNITURE" ? "#4ade80" : "#60a5fa";

              const strokeWidth =
                entity.layer === "WALLS" ? 2.5 :
                entity.layer === "DIMENSIONS" ? 1 : 1.5;

              return (
                <line
                  key={idx}
                  x1={entity.x1}
                  y1={entity.y1}
                  x2={entity.x2}
                  y2={entity.y2}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
              );
            }

            if (entity.type === "CIRCLE" && entity.radius) {
              const color = entity.layer === "WALLS" ? "#ffffff" : entity.layer === "DIMENSIONS" ? "#facc15" : "#38bdf8";
              return (
                <circle
                  key={idx}
                  cx={entity.x1}
                  cy={entity.y1}
                  r={entity.radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={entity.layer === "WALLS" ? 2.2 : 1.2}
                  strokeDasharray={entity.layer === "DIMENSIONS" ? "4 4" : "none"}
                />
              );
            }

            if (entity.type === "ARC" && entity.radius) {
              const r = entity.radius;
              const d = `M ${entity.x1} ${entity.y1} A ${r} ${r} 0 0 1 ${entity.x1 + r} ${entity.y1 + r}`;
              return (
                <path
                  key={idx}
                  d={d}
                  fill="none"
                  stroke="#ff3344"
                  strokeWidth={1.2}
                  strokeDasharray="2 2"
                />
              );
            }

            if (entity.type === "TEXT" && entity.text) {
              const color = entity.layer === "DIMENSIONS" ? "#facc15" : "#ffffff";
              return (
                <text
                  key={idx}
                  x={entity.x1}
                  y={entity.y1}
                  fill={color}
                  fontSize={entity.size || 12}
                  fontFamily="'Consolas', 'Courier New', monospace"
                  fontWeight="600"
                  textAnchor="start"
                >
                  {entity.text}
                </text>
              );
            }

            return null;
          })}

          {/* User interactive measurement line */}
          {measurePoints.length >= 2 && (
            <g className="pointer-events-none">
              <line
                x1={measurePoints[0].x}
                y1={measurePoints[0].y}
                x2={measurePoints[1].x}
                y2={measurePoints[1].y}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle cx={measurePoints[0].x} cy={measurePoints[0].y} r="5" fill="#f59e0b" />
              <circle cx={measurePoints[1].x} cy={measurePoints[1].y} r="5" fill="#f59e0b" />
              <text
                x={(measurePoints[0].x + measurePoints[1].x) / 2}
                y={(measurePoints[0].y + measurePoints[1].y) / 2 - 8}
                fill="#f59e0b"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
              >
                {measuredDistance ? `${measuredDistance.toFixed(1)} px` : ""}
              </text>
            </g>
          )}

          {/* Red Glowing Focus Box matching uploaded banner on Bedroom 3 */}
          {highlightBox && data.id === "plan_4bhk" && (
            <g className="pointer-events-none">
              <rect
                x="660"
                y="55"
                width="190"
                height="245"
                fill="rgba(255, 42, 58, 0.12)"
                stroke="#ff2a3a"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <rect x="656" y="51" width="8" height="8" fill="#ff2a3a" />
              <rect x="846" y="51" width="8" height="8" fill="#ff2a3a" />
              <rect x="656" y="296" width="8" height="8" fill="#ff2a3a" />
              <rect x="846" y="296" width="8" height="8" fill="#ff2a3a" />
            </g>
          )}
        </svg>

        {/* Live Status Tag matching user's image banner */}
        {highlightBox && (
          <div className="absolute bottom-3 right-3 bg-[#141a24]/95 backdrop-blur-md border border-red-500/40 px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin" />
              <span className="text-[11px] font-semibold text-white tracking-wide">
                Generating in CAD FAST...
              </span>
            </div>
            <div className="w-16 sm:w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-4/5 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom AutoCAD-style Status Bar */}
      <div className="bg-[#0b0f15] border-t border-gray-800/80 px-3 py-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-gray-400 z-10">
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <span className="flex items-center gap-1">
            <span className="text-gray-500">X:</span>
            <span className="text-gray-200">{mouseCoords.x.toFixed(1)}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-gray-500">Y:</span>
            <span className="text-gray-200">{mouseCoords.y.toFixed(1)}</span>
          </span>
          <span className="hidden sm:inline-block text-gray-600">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ORTHO
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-gray-400">{Math.round(zoom * 100)}%</span>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <span className="text-red-400 font-semibold tracking-wider text-[10px] sm:text-[11px]">AUTOCAD R12 DXF</span>
        </div>
      </div>
    </div>
  );
}
