import { CADEntity } from "./dxfGenerator";

export interface CADDrawingData {
  id: string;
  title: string;
  prompt: string;
  category: "Architectural" | "Mechanical" | "Civil" | "Commercial";
  description: string;
  dimensions: string;
  carpetArea?: string;
  builtUpArea?: string;
  vastuScore?: number;
  vastuNotes?: string[];
  entities: CADEntity[];
  viewBox: { x: number; y: number; width: number; height: number };
}

// 1. 4 BHK Architectural Plan (Matching the user's uploaded CAD FAST banner)
export const fourBhkPlan: CADDrawingData = {
  id: "plan_4bhk",
  title: "4 BHK Luxury Residence Floor Plan",
  prompt: "Draw a 4 BHK house plan",
  category: "Architectural",
  description: "Complete architectural layout with 4 bedrooms, central living hall, dining area, kitchen, attached washrooms, and door swings.",
  dimensions: "45' - 0\" x 38' - 6\"",
  carpetArea: "1,480 sq ft",
  builtUpArea: "1,732 sq ft",
  vastuScore: 96,
  vastuNotes: [
    "Master Bedroom located in South-West (Nairutya) - Ideal for head of family",
    "Modular Kitchen in South-East (Agneya) - Pure fire element compliance",
    "Main entrance opens towards North-East (Ishanya) for positive energy",
    "Central Brahmasthan is kept open and clutter-free (Living Hall)",
  ],
  viewBox: { x: 0, y: 0, width: 900, height: 600 },
  entities: [
    // Outer perimeter walls (Double Line CAD style)
    { type: "LINE", layer: "WALLS", x1: 50, y1: 50, x2: 850, y2: 50 },
    { type: "LINE", layer: "WALLS", x1: 850, y1: 50, x2: 850, y2: 550 },
    { type: "LINE", layer: "WALLS", x1: 850, y1: 550, x2: 50, y2: 550 },
    { type: "LINE", layer: "WALLS", x1: 50, y1: 550, x2: 50, y2: 50 },

    // Outer wall thickness (9 inch external)
    { type: "LINE", layer: "WALLS", x1: 60, y1: 60, x2: 840, y2: 60 },
    { type: "LINE", layer: "WALLS", x1: 840, y1: 60, x2: 840, y2: 540 },
    { type: "LINE", layer: "WALLS", x1: 840, y1: 540, x2: 60, y2: 540 },
    { type: "LINE", layer: "WALLS", x1: 60, y1: 540, x2: 60, y2: 60 },

    // Master Bedroom 1 (Top Left - SW)
    { type: "LINE", layer: "WALLS", x1: 60, y1: 260, x2: 320, y2: 260 },
    { type: "LINE", layer: "WALLS", x1: 320, y1: 60, x2: 320, y2: 260 },
    { type: "TEXT", layer: "TEXT", x1: 120, y1: 130, text: "MASTER BEDROOM 1", size: 13 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 140, y1: 155, text: "14'0\" x 12'6\"", size: 10 },
    // Bed block in Master Bed
    { type: "LINE", layer: "FURNITURE", x1: 120, y1: 70, x2: 220, y2: 70 },
    { type: "LINE", layer: "FURNITURE", x1: 220, y1: 70, x2: 220, y2: 120 },
    { type: "LINE", layer: "FURNITURE", x1: 220, y1: 120, x2: 120, y2: 120 },
    { type: "LINE", layer: "FURNITURE", x1: 120, y1: 120, x2: 120, y2: 70 },
    // Door for Bed 1
    { type: "LINE", layer: "DOORS", x1: 320, y1: 220, x2: 320, y2: 255 },
    { type: "ARC", layer: "DOORS", x1: 320, y1: 255, radius: 35, startAngle: 90, endAngle: 180 },

    // Bedroom 2 (Bottom Left)
    { type: "LINE", layer: "WALLS", x1: 60, y1: 340, x2: 320, y2: 340 },
    { type: "LINE", layer: "WALLS", x1: 320, y1: 340, x2: 320, y2: 540 },
    { type: "TEXT", layer: "TEXT", x1: 140, y1: 430, text: "BEDROOM 2", size: 13 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 155, y1: 455, text: "13'0\" x 11'6\"", size: 10 },
    // Bed block in Bed 2
    { type: "LINE", layer: "FURNITURE", x1: 120, y1: 460, x2: 220, y2: 460 },
    { type: "LINE", layer: "FURNITURE", x1: 220, y1: 460, x2: 220, y2: 510 },
    { type: "LINE", layer: "FURNITURE", x1: 220, y1: 510, x2: 120, y2: 510 },
    { type: "LINE", layer: "FURNITURE", x1: 120, y1: 510, x2: 120, y2: 460 },
    // Door Bed 2
    { type: "LINE", layer: "DOORS", x1: 320, y1: 345, x2: 320, y2: 380 },
    { type: "ARC", layer: "DOORS", x1: 320, y1: 345, radius: 35, startAngle: 180, endAngle: 270 },

    // Central Living Hall & Dining
    { type: "TEXT", layer: "TEXT", x1: 410, y1: 185, text: "LIVING HALL", size: 15 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 420, y1: 210, text: "22'0\" x 16'0\"", size: 10 },
    // Sofa blocks
    { type: "LINE", layer: "FURNITURE", x1: 380, y1: 235, x2: 480, y2: 235 },
    { type: "LINE", layer: "FURNITURE", x1: 380, y1: 275, x2: 480, y2: 275 },
    { type: "LINE", layer: "FURNITURE", x1: 380, y1: 235, x2: 380, y2: 275 },
    { type: "LINE", layer: "FURNITURE", x1: 480, y1: 235, x2: 480, y2: 275 },
    // Dining Table (Bottom Center)
    { type: "LINE", layer: "FURNITURE", x1: 400, y1: 410, x2: 480, y2: 410 },
    { type: "LINE", layer: "FURNITURE", x1: 480, y1: 410, x2: 480, y2: 470 },
    { type: "LINE", layer: "FURNITURE", x1: 480, y1: 470, x2: 400, y2: 470 },
    { type: "LINE", layer: "FURNITURE", x1: 400, y1: 470, x2: 400, y2: 410 },
    { type: "TEXT", layer: "TEXT", x1: 420, y1: 385, text: "DINING", size: 12 },

    // Kitchen (Top Middle Right)
    { type: "LINE", layer: "WALLS", x1: 540, y1: 60, x2: 540, y2: 220 },
    { type: "LINE", layer: "WALLS", x1: 540, y1: 220, x2: 670, y2: 220 },
    { type: "TEXT", layer: "TEXT", x1: 570, y1: 130, text: "KITCHEN", size: 13 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 570, y1: 155, text: "10'0\" x 11'0\"", size: 10 },
    // Counter L shape
    { type: "LINE", layer: "FURNITURE", x1: 550, y1: 70, x2: 650, y2: 70 },
    { type: "LINE", layer: "FURNITURE", x1: 650, y1: 70, x2: 650, y2: 150 },

    // Bedroom 3 (Top Right - Featured in banner focus box!)
    { type: "LINE", layer: "WALLS", x1: 670, y1: 60, x2: 670, y2: 290 },
    { type: "LINE", layer: "WALLS", x1: 670, y1: 290, x2: 840, y2: 290 },
    { type: "TEXT", layer: "TEXT", x1: 710, y1: 140, text: "BEDROOM 3", size: 13 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 715, y1: 165, text: "14'6\" x 12'0\"", size: 10 },
    // Bed Block in Bed 3
    { type: "LINE", layer: "FURNITURE", x1: 720, y1: 70, x2: 810, y2: 70 },
    { type: "LINE", layer: "FURNITURE", x1: 810, y1: 70, x2: 810, y2: 120 },
    { type: "LINE", layer: "FURNITURE", x1: 810, y1: 120, x2: 720, y2: 120 },
    { type: "LINE", layer: "FURNITURE", x1: 720, y1: 120, x2: 720, y2: 70 },
    // Attached Toilet Bed 3
    { type: "LINE", layer: "WALLS", x1: 710, y1: 220, x2: 840, y2: 220 },
    { type: "TEXT", layer: "TEXT", x1: 740, y1: 255, text: "BATH", size: 10 },

    // Bedroom 4 (Bottom Right)
    { type: "LINE", layer: "WALLS", x1: 570, y1: 340, x2: 840, y2: 340 },
    { type: "LINE", layer: "WALLS", x1: 570, y1: 340, x2: 570, y2: 540 },
    { type: "TEXT", layer: "TEXT", x1: 660, y1: 430, text: "BEDROOM 4 / GUEST", size: 12 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 680, y1: 455, text: "13'6\" x 12'0\"", size: 10 },
    // Bed 4 block
    { type: "LINE", layer: "FURNITURE", x1: 720, y1: 460, x2: 810, y2: 460 },
    { type: "LINE", layer: "FURNITURE", x1: 810, y1: 460, x2: 810, y2: 510 },
    { type: "LINE", layer: "FURNITURE", x1: 810, y1: 510, x2: 720, y2: 510 },
    { type: "LINE", layer: "FURNITURE", x1: 720, y1: 510, x2: 720, y2: 460 },

    // Common Toilet
    { type: "LINE", layer: "WALLS", x1: 320, y1: 260, x2: 320, y2: 340 },
    { type: "LINE", layer: "WALLS", x1: 220, y1: 260, x2: 220, y2: 340 },
    { type: "TEXT", layer: "TEXT", x1: 240, y1: 305, text: "TOILET", size: 10 },

    // Dimension lines (CAD style)
    { type: "LINE", layer: "DIMENSIONS", x1: 50, y1: 30, x2: 850, y2: 30 },
    { type: "LINE", layer: "DIMENSIONS", x1: 50, y1: 20, x2: 50, y2: 40 },
    { type: "LINE", layer: "DIMENSIONS", x1: 850, y1: 20, x2: 850, y2: 40 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 410, y1: 25, text: "< 45' - 0\" >", size: 11 },

    { type: "LINE", layer: "DIMENSIONS", x1: 30, y1: 50, x2: 30, y2: 550 },
    { type: "LINE", layer: "DIMENSIONS", x1: 20, y1: 50, x2: 40, y2: 50 },
    { type: "LINE", layer: "DIMENSIONS", x1: 20, y1: 550, x2: 40, y2: 550 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 5, y1: 300, text: "38'-6\"", size: 11 },
  ],
};

// 2. 3 BHK Luxury Duplex Villa
export const threeBhkVillaPlan: CADDrawingData = {
  id: "plan_3bhk_villa",
  title: "3 BHK Modern Duplex Villa Layout",
  prompt: "Design a 3 BHK duplex villa with car porch and garden",
  category: "Architectural",
  description: "Spacious contemporary villa with double height living area, master suite, puja room, open terrace and car parking porch.",
  dimensions: "36' - 0\" x 42' - 0\"",
  carpetArea: "1,290 sq ft",
  builtUpArea: "1,512 sq ft",
  vastuScore: 92,
  vastuNotes: [
    "Car Porch in North-West (Vayu) for smooth vehicular movement",
    "Puja Room in North-East (Ishanya corner) with direct morning sun",
    "Staircase leading to 1st floor in South-West wall",
  ],
  viewBox: { x: 0, y: 0, width: 850, height: 600 },
  entities: [
    // Outer walls
    { type: "LINE", layer: "WALLS", x1: 60, y1: 60, x2: 780, y2: 60 },
    { type: "LINE", layer: "WALLS", x1: 780, y1: 60, x2: 780, y2: 540 },
    { type: "LINE", layer: "WALLS", x1: 780, y1: 540, x2: 60, y2: 540 },
    { type: "LINE", layer: "WALLS", x1: 60, y1: 540, x2: 60, y2: 60 },
    // Car Porch
    { type: "LINE", layer: "WALLS", x1: 60, y1: 60, x2: 280, y2: 60 },
    { type: "LINE", layer: "WALLS", x1: 280, y1: 60, x2: 280, y2: 240 },
    { type: "LINE", layer: "WALLS", x1: 60, y1: 240, x2: 280, y2: 240 },
    { type: "TEXT", layer: "TEXT", x1: 110, y1: 150, text: "CAR PORCH", size: 13 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 120, y1: 175, text: "12'0\" x 16'0\"", size: 10 },
    // Foyer / Living
    { type: "LINE", layer: "WALLS", x1: 280, y1: 240, x2: 580, y2: 240 },
    { type: "LINE", layer: "WALLS", x1: 580, y1: 60, x2: 580, y2: 360 },
    { type: "TEXT", layer: "TEXT", x1: 340, y1: 140, text: "GRAND LIVING", size: 15 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 350, y1: 165, text: "18'0\" x 15'6\"", size: 10 },
    // Master Bedroom
    { type: "LINE", layer: "WALLS", x1: 580, y1: 60, x2: 780, y2: 60 },
    { type: "LINE", layer: "WALLS", x1: 580, y1: 260, x2: 780, y2: 260 },
    { type: "TEXT", layer: "TEXT", x1: 620, y1: 140, text: "MASTER BED", size: 13 },
    // Kitchen & Dining
    { type: "LINE", layer: "WALLS", x1: 60, y1: 380, x2: 400, y2: 380 },
    { type: "LINE", layer: "WALLS", x1: 400, y1: 380, x2: 400, y2: 540 },
    { type: "TEXT", layer: "TEXT", x1: 150, y1: 450, text: "MODULAR KITCHEN", size: 13 },
    // Bedroom 2
    { type: "LINE", layer: "WALLS", x1: 400, y1: 380, x2: 780, y2: 380 },
    { type: "TEXT", layer: "TEXT", x1: 550, y1: 450, text: "GUEST BEDROOM", size: 13 },
  ],
};

// 3. Commercial Tech Office Floor Plan
export const commercialOfficePlan: CADDrawingData = {
  id: "plan_commercial_office",
  title: "Modern Tech Office Workspace (2,400 sq ft)",
  prompt: "Design a commercial tech office with 20 workstations, conference room, and CEO cabin",
  category: "Commercial",
  description: "Ergonomic IT/corporate office layout with reception lobby, open workstations, 10-seater boardroom, pantry, and executive cabins.",
  dimensions: "60' - 0\" x 40' - 0\"",
  carpetArea: "2,150 sq ft",
  builtUpArea: "2,400 sq ft",
  vastuScore: 94,
  vastuNotes: [
    "CEO Cabin in South-West for command and stability",
    "Accounts & Finance team in North direction (Kuber sector)",
    "Conference room in West/North-West for productive meetings",
  ],
  viewBox: { x: 0, y: 0, width: 950, height: 620 },
  entities: [
    // Outer office boundary
    { type: "LINE", layer: "WALLS", x1: 50, y1: 50, x2: 900, y2: 50 },
    { type: "LINE", layer: "WALLS", x1: 900, y1: 50, x2: 900, y2: 570 },
    { type: "LINE", layer: "WALLS", x1: 900, y1: 570, x2: 50, y2: 570 },
    { type: "LINE", layer: "WALLS", x1: 50, y1: 570, x2: 50, y2: 50 },

    // Reception & Waiting Lobby (Left entrance)
    { type: "LINE", layer: "WALLS", x1: 50, y1: 200, x2: 280, y2: 200 },
    { type: "LINE", layer: "WALLS", x1: 280, y1: 50, x2: 280, y2: 200 },
    { type: "TEXT", layer: "TEXT", x1: 100, y1: 120, text: "RECEPTION LOBBY", size: 13 },
    { type: "LINE", layer: "FURNITURE", x1: 100, y1: 140, x2: 200, y2: 140 },

    // Boardroom / Conference (Top Center)
    { type: "LINE", layer: "WALLS", x1: 280, y1: 200, x2: 600, y2: 200 },
    { type: "LINE", layer: "WALLS", x1: 600, y1: 50, x2: 600, y2: 200 },
    { type: "TEXT", layer: "TEXT", x1: 370, y1: 110, text: "BOARDROOM (12 SEATS)", size: 13 },
    // Oval conference table
    { type: "CIRCLE", layer: "FURNITURE", x1: 440, y1: 135, radius: 45 },

    // CEO Cabin (Top Right - SW corner command)
    { type: "LINE", layer: "WALLS", x1: 600, y1: 220, x2: 900, y2: 220 },
    { type: "TEXT", layer: "TEXT", x1: 690, y1: 120, text: "EXECUTIVE CABIN", size: 13 },

    // Open Workstation Bay (Center Main Floor)
    { type: "TEXT", layer: "TEXT", x1: 380, y1: 320, text: "OPEN WORKSTATIONS (24 PODS)", size: 15 },
    // Workstation rows
    { type: "LINE", layer: "FURNITURE", x1: 240, y1: 360, x2: 700, y2: 360 },
    { type: "LINE", layer: "FURNITURE", x1: 240, y1: 420, x2: 700, y2: 420 },
    { type: "LINE", layer: "FURNITURE", x1: 240, y1: 480, x2: 700, y2: 480 },

    // Pantry & Cafeteria (Bottom Left)
    { type: "LINE", layer: "WALLS", x1: 50, y1: 380, x2: 200, y2: 380 },
    { type: "LINE", layer: "WALLS", x1: 200, y1: 380, x2: 200, y2: 570 },
    { type: "TEXT", layer: "TEXT", x1: 75, y1: 470, text: "PANTRY", size: 12 },

    // Server Room
    { type: "LINE", layer: "WALLS", x1: 750, y1: 380, x2: 900, y2: 380 },
    { type: "LINE", layer: "WALLS", x1: 750, y1: 380, x2: 750, y2: 570 },
    { type: "TEXT", layer: "TEXT", x1: 780, y1: 470, text: "SERVER ROOM", size: 11 },
  ],
};

// 4. Structural Column & Footing Grid Plan
export const structuralGridPlan: CADDrawingData = {
  id: "plan_structural_grid",
  title: "Structural Column & Footing Grid (C1 to C9)",
  prompt: "Generate civil structural column layout and footing grid",
  category: "Civil",
  description: "Civil engineering structural drawing showing 9 RCC columns (300x450mm), isolated footings, and centerline grid coordinates.",
  dimensions: "Grid: 30' - 0\" x 30' - 0\"",
  carpetArea: "N/A (Structural Frame)",
  builtUpArea: "900 sq ft footprint",
  vastuScore: 98,
  vastuNotes: [
    "Heavier columns situated along Southern and Western grid axes",
    "Equal structural load distribution across all 9 footing pads",
  ],
  viewBox: { x: 0, y: 0, width: 800, height: 600 },
  entities: [
    // Grid Lines (Dashed Yellow Dimensions)
    { type: "LINE", layer: "DIMENSIONS", x1: 150, y1: 100, x2: 650, y2: 100 },
    { type: "LINE", layer: "DIMENSIONS", x1: 150, y1: 300, x2: 650, y2: 300 },
    { type: "LINE", layer: "DIMENSIONS", x1: 150, y1: 500, x2: 650, y2: 500 },
    { type: "LINE", layer: "DIMENSIONS", x1: 150, y1: 100, x2: 150, y2: 500 },
    { type: "LINE", layer: "DIMENSIONS", x1: 400, y1: 100, x2: 400, y2: 500 },
    { type: "LINE", layer: "DIMENSIONS", x1: 650, y1: 100, x2: 650, y2: 500 },

    // 9 Columns with Footings
    ...[
      { x: 150, y: 100, id: "C1" },
      { x: 400, y: 100, id: "C2" },
      { x: 650, y: 100, id: "C3" },
      { x: 150, y: 300, id: "C4" },
      { x: 400, y: 300, id: "C5" },
      { x: 650, y: 300, id: "C6" },
      { x: 150, y: 500, id: "C7" },
      { x: 400, y: 500, id: "C8" },
      { x: 650, y: 500, id: "C9" },
    ].flatMap((col) => [
      // Footing Outer Rectangle (Cyan)
      { type: "LINE" as const, layer: "WINDOWS" as const, x1: col.x - 35, y1: col.y - 35, x2: col.x + 35, y2: col.y - 35 },
      { type: "LINE" as const, layer: "WINDOWS" as const, x1: col.x + 35, y1: col.y - 35, x2: col.x + 35, y2: col.y + 35 },
      { type: "LINE" as const, layer: "WINDOWS" as const, x1: col.x + 35, y1: col.y + 35, x2: col.x - 35, y2: col.y + 35 },
      { type: "LINE" as const, layer: "WINDOWS" as const, x1: col.x - 35, y1: col.y + 35, x2: col.x - 35, y2: col.y - 35 },
      // RCC Column Core (White Solid)
      { type: "LINE" as const, layer: "WALLS" as const, x1: col.x - 12, y1: col.y - 18, x2: col.x + 12, y2: col.y - 18 },
      { type: "LINE" as const, layer: "WALLS" as const, x1: col.x + 12, y1: col.y - 18, x2: col.x + 12, y2: col.y + 18 },
      { type: "LINE" as const, layer: "WALLS" as const, x1: col.x + 12, y1: col.y + 18, x2: col.x - 12, y2: col.y + 18 },
      { type: "LINE" as const, layer: "WALLS" as const, x1: col.x - 12, y1: col.y + 18, x2: col.x - 12, y2: col.y - 18 },
      // Column Label
      { type: "TEXT" as const, layer: "TEXT" as const, x1: col.x + 18, y1: col.y - 20, text: col.id, size: 12 },
    ]),
  ],
};

// 5. Mechanical CAD Model
export const mechanicalFlangePlan: CADDrawingData = {
  id: "plan_mechanical",
  title: "Precision Flange & Gear Coupling Drawing",
  prompt: "Generate mechanical flange with 8 bolt holes and pitch circle",
  category: "Mechanical",
  description: "ISO-standard 8-bolt flange coupling with pitch circle diameter, center bore, keyway, and tolerance dimensions.",
  dimensions: "Outer Dia: 240mm | PCD: 190mm | Bore: 65mm",
  carpetArea: "Precision Machined Component",
  builtUpArea: "Weight: ~8.4 kg Alloy Steel",
  viewBox: { x: 0, y: 0, width: 700, height: 600 },
  entities: [
    // Outer flange diameter
    { type: "CIRCLE", layer: "WALLS", x1: 350, y1: 300, radius: 200 },
    // Pitch Circle Diameter
    { type: "CIRCLE", layer: "DIMENSIONS", x1: 350, y1: 300, radius: 150 },
    // Inner Bore
    { type: "CIRCLE", layer: "WALLS", x1: 350, y1: 300, radius: 60 },
    // Keyway
    { type: "LINE", layer: "WALLS", x1: 340, y1: 240, x2: 360, y2: 240 },
    { type: "LINE", layer: "WALLS", x1: 340, y1: 240, x2: 340, y2: 220 },
    { type: "LINE", layer: "WALLS", x1: 360, y1: 240, x2: 360, y2: 220 },
    { type: "LINE", layer: "WALLS", x1: 340, y1: 220, x2: 360, y2: 220 },
    // 8 Bolt holes
    ...Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x = 350 + 150 * Math.cos(angle);
      const y = 300 + 150 * Math.sin(angle);
      return { type: "CIRCLE" as const, layer: "WINDOWS" as const, x1: x, y1: y, radius: 14 };
    }),
    // Centerlines
    { type: "LINE", layer: "DIMENSIONS", x1: 120, y1: 300, x2: 580, y2: 300 },
    { type: "LINE", layer: "DIMENSIONS", x1: 350, y1: 70, x2: 350, y2: 530 },
    { type: "TEXT", layer: "TEXT", x1: 260, y1: 560, text: "FLANGE COUPLING ISO-286", size: 15 },
    { type: "TEXT", layer: "DIMENSIONS", x1: 270, y1: 585, text: "8x DIA 18 EQUISPACED ON PCD 190", size: 11 },
  ],
};

export const sampleCADProjects: CADDrawingData[] = [
  fourBhkPlan,
  threeBhkVillaPlan,
  commercialOfficePlan,
  structuralGridPlan,
  mechanicalFlangePlan,
];

/**
 * Intelligent prompt matcher / parametric generator
 */
export function generatePlanFromPrompt(prompt: string): CADDrawingData {
  const p = prompt.toLowerCase();
  
  if (p.includes("mechanical") || p.includes("gear") || p.includes("flange") || p.includes("engine") || p.includes("bolt")) {
    return { ...mechanicalFlangePlan, prompt };
  }

  if (p.includes("office") || p.includes("commercial") || p.includes("workstation") || p.includes("cabin") || p.includes("conference")) {
    return { ...commercialOfficePlan, prompt };
  }

  if (p.includes("column") || p.includes("structural") || p.includes("civil") || p.includes("footing") || p.includes("grid")) {
    return { ...structuralGridPlan, prompt };
  }

  if (p.includes("villa") || p.includes("duplex") || p.includes("porch") || p.includes("garden") || p.includes("3 bhk")) {
    return { ...threeBhkVillaPlan, prompt };
  }

  // Default to 4 BHK luxury residence plan
  return { ...fourBhkPlan, prompt };
}
