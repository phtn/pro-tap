"use client";

import { Navbar } from "@/app/(landing)/_components/navbar";
import { VisualContent } from "@/app/(landing)/_components/visual-content";
import { FeatureCards } from "@/app/(landing)/_components/feature-cards";
import { HeroCTA, ViewButton } from "@/app/(landing)/_components/hero-cta";
import { useMobile } from "@/hooks/use-mobile";

export const Landing = () => {
  const isMobile = useMobile();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto">
        <div className="h-[40lvh] md:h-[50lvh] grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          {isMobile ? null : <HeroCTA />}

          {/* Right Content - 3D Character Placeholder */}
          <VisualContent />
        </div>

        {/* CTA */}
        {isMobile ? (
          <div className="w-full flex items-center justify-center relative z-100">
            <ViewButton />
          </div>
        ) : null}

        {/* Feature Cards */}
        {isMobile ? <FeatureCards /> : <FeatureCards />}
      </main>
    </div>
  );
};
