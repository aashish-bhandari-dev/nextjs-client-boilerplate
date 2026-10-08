import * as React from "react";
import { HeroSection } from "./hero-section";
import { StatsSection } from "./stats-section";
import { FeaturesSection } from "./features-section";
import { ComponentShowcaseSection } from "./component-showcase-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TestimonialsSection } from "./testimonials-section";
import { PricingSection } from "./pricing-section";
import { FaqSection } from "./faq-section";
import { CtaSection } from "./cta-section";

export function HomeView() {
  return (
    <div className="flex flex-col">
      {/* 1. Impactful Hero Section */}
      <HeroSection />

      {/* 2. Key Performance Metrics */}
      <StatsSection />

      {/* 3. Core Features Grid */}
      <FeaturesSection />

      {/* 4. Interactive shadcn UI Kit Showcase */}
      <ComponentShowcaseSection />

      {/* 5. Developer Workflow */}
      <HowItWorksSection />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Predictable Pricing */}
      <PricingSection />

      {/* 8. Frequently Asked Questions */}
      <FaqSection />

      {/* 9. High-Converting Bottom CTA */}
      <CtaSection />
    </div>
  );
}
