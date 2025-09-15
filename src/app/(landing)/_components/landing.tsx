"use client";

import { HeroCTA, ViewButton } from "@/app/(landing)/_components/hero-cta";
import { VisualContent } from "@/app/(landing)/_components/visual-content";
import { useMobile } from "@/hooks/use-mobile";

export const Landing = () => {
  const isMobile = useMobile();
  return (
    <main className="">
      <div className="h-[40lvh] md:h-[60lvh] grid lg:grid-cols-2 gap-12 w-full items-center">
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
      {/*{isMobile ? <FeatureCards /> : <FeatureCards />}*/}
    </main>
  );
};
