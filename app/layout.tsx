import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import SubscriptionModal from "@/components/SubscriptionModal";

export const metadata: Metadata = {
  title: "CAD FAST | AutoCAD, Now With AI — Turn Simple Prompts Into Detailed CAD Drawings",
  description: "Generate professional AutoCAD 2D/3D architectural floor plans, civil layouts, and mechanical engineering drafts from natural language prompts. Download native .DXF files. Pro License ₹3,000/mo.",
  icons: {
    icon: "/images/cadgptlogo.png",
    apple: "/images/cadgptlogo.png",
  },
  keywords: [
    "CAD FAST",
    "AutoCAD AI",
    "Text to CAD",
    "AI floor plan generator",
    "AutoCAD DXF export",
    "Architecture AI",
    "Civil Engineering AI",
    "CAD FAST Pro subscription",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#07090e] text-gray-100 flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          {/* Global Interactive Modals */}
          <AuthModal />
          <SubscriptionModal />
        </AuthProvider>
      </body>
    </html>
  );
}
