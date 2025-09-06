"use client";

import { NeumorphButton as Button } from "@/components/ui/neumorph";
import TextAnimate from "../ui/text-animate";
import { Navbar } from "@/app/(landing)/_components/navbar";
import { VisualContent } from "@/app/(landing)/_components/visual-content";
import { FeatureCards } from "@/app/(landing)/_components/feature-cards";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto">
        <div className="h-[50lvh] grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="h-full space-y-8 px-6 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="font-bold leading-6">
                <TextAnimate
                  text={`Protap`}
                  type="popIn"
                  className="font-space tracking-normal text-left text-5xl lg:text-6xl"
                />
                <span className="capitalize font-doto text-xl lg:text-2xl font-bold tracking-normal text-primary">
                  Digital Insurance
                </span>
              </div>
              <p className="hidden md:flex font-figtree text-lg text-foreground/60 tracking-wide leading-snug max-w-lg text-balance">
                Experience the future of secured, personalized, and feature rich
                insurance services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" intent="primary" className="rounded-full">
                Get the card
              </Button>
              <Button
                size="lg"
                intent="secondary"
                icon="chevron-right"
                className="rounded-full"
              >
                Video intro
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Character Placeholder */}
          <VisualContent />
        </div>
        {/* Feature Cards */}
        <FeatureCards />
      </main>
    </div>
  );
};
