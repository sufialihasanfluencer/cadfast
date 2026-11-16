"use client";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeatureShowcase from "@/components/FeatureShowcase";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Interactive CAD Viewer */}
      <Hero />

      {/* How Prompt to CAD Works */}
      <HowItWorks />

      {/* Feature Showcase & AutoCAD Integration */}
      <FeatureShowcase />

      {/* CAD FAST Pro Subscription Section */}
      <PricingSection />

      {/* Testimonials from Architects & Drafters */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
