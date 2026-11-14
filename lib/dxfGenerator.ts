/**
 * DXF (Drawing Exchange Format) Generator for CAD FAST
 * Generates valid AutoCAD-compliant R12 ASCII DXF files
 * Directly openable in AutoCAD, Revit, SolidWorks, and LibreCAD
 */

export interface CADEntity {
  type: "LINE" | "CIRCLE" | "ARC" | "TEXT" | "RECTANGLE";
  layer: "WALLS" | "DOORS" | "WINDOWS" | "DIMENSIONS" | "FURNITURE" | "TEXT";
  x1: number;
  y1: number;
  x2?: number;
  y2?: number;
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  text?: string;
  size?: number;
  color?: number; // AutoCAD ACI Color index: 1=Red, 2=Yellow, 3=Green, 4=Cyan, 7=White
}

export function generateDXF(entities: CADEntity[], projectName = "CADFAST_Drawing"): string {
  let dxf = "";

  // 1. HEADER SECTION
  dxf += "0\nSECTION\n2\nHEADER\n";
  dxf += "9\n$ACADVER\n1\nAC1009\n"; // AutoCAD R12 compatibility
  dxf += "9\n$INSUNITS\n70\n4\n"; // Millimeters
  dxf += "0\nENDSEC\n";

  // 2. TABLES SECTION (Layers)
  dxf += "0\nSECTION\n2\nTABLES\n";
  dxf += "0\nTABLE\n2\nLAYER\n70\n6\n";

  const layers = [
    { name: "WALLS", color: 7 }, // White
    { name: "DOORS", color: 1 }, // Red
    { name: "WINDOWS", color: 4 }, // Cyan
    { name: "DIMENSIONS", color: 2 }, // Yellow
    { name: "FURNITURE", color: 3 }, // Green
    { name: "TEXT", color: 7 }, // White
  ];

  for (const l of layers) {
    dxf += "0\nLAYER\n";
    dxf += `2\n${l.name}\n`;
    dxf += "70\n0\n";
    dxf += `62\n${l.color}\n`;
    dxf += "6\nCONTINUOUS\n";
  }

  dxf += "0\nENDTAB\n";
  dxf += "0\nENDSEC\n";

  // 3. ENTITIES SECTION
  dxf += "0\nSECTION\n2\nENTITIES\n";

  for (const ent of entities) {
    if (ent.type === "LINE") {
      dxf += "0\nLINE\n";
      dxf += `8\n${ent.layer}\n`;
      dxf += `10\n${ent.x1.toFixed(3)}\n`;
      dxf += `20\n${ent.y1.toFixed(3)}\n`;
      dxf += "30\n0.0\n";
      dxf += `11\n${(ent.x2 ?? ent.x1).toFixed(3)}\n`;
      dxf += `21\n${(ent.y2 ?? ent.y1).toFixed(3)}\n`;
      dxf += "31\n0.0\n";
    } else if (ent.type === "CIRCLE" && ent.radius) {
      dxf += "0\nCIRCLE\n";
      dxf += `8\n${ent.layer}\n`;
      dxf += `10\n${ent.x1.toFixed(3)}\n`;
      dxf += `20\n${ent.y1.toFixed(3)}\n`;
      dxf += "30\n0.0\n";
      dxf += `40\n${ent.radius.toFixed(3)}\n`;
    } else if (ent.type === "ARC" && ent.radius) {
      dxf += "0\nARC\n";
      dxf += `8\n${ent.layer}\n`;
      dxf += `10\n${ent.x1.toFixed(3)}\n`;
      dxf += `20\n${ent.y1.toFixed(3)}\n`;
      dxf += "30\n0.0\n";
      dxf += `40\n${ent.radius.toFixed(3)}\n`;
      dxf += `50\n${(ent.startAngle ?? 0).toFixed(1)}\n`;
      dxf += `51\n${(ent.endAngle ?? 90).toFixed(1)}\n`;
    } else if (ent.type === "TEXT" && ent.text) {
      dxf += "0\nTEXT\n";
      dxf += `8\n${ent.layer}\n`;
      dxf += `10\n${ent.x1.toFixed(3)}\n`;
      dxf += `20\n${ent.y1.toFixed(3)}\n`;
      dxf += "30\n0.0\n";
      dxf += `40\n${(ent.size || 12).toFixed(1)}\n`;
      dxf += `1\n${ent.text}\n`;
    }
  }

  dxf += "0\nENDSEC\n";
  dxf += "0\nEOF\n";

  return dxf;
}

/**
 * Trigger file download in browser
 */
export function downloadFile(content: string, filename: string, mimeType = "application/dxf") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
