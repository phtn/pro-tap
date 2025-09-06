"use client";

import { NeumorphButton as Button } from "@/components/ui/neumorph";
import TextAnimate from "../ui/text-animate";
import { Navbar } from "@/app/(landing)/_components/navbar";
import { VisualContent } from "@/app/(landing)/_components/visual-content";
import { FeatureCards } from "@/app/(landing)/_components/feature-cards";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-background to-background text-foreground">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="h-[50lvh] grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="h-full space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-protap-blue dark:text-foreground font-bold leading-6">
                <TextAnimate
                  text={`Protap`}
                  type="popIn"
                  className="tracking-normal text-left text-5xl lg:text-6xl"
                />
                <span className="capitalize font-space text-xl lg:text-2xl font-medium tracking-wide opacity-80">
                  Digital Insurance
                </span>
              </h2>
              <p className="hidden md:flex text-lg text-muted-foreground tracking-wide leading-snug max-w-lg text-balance">
                Experience the future of insurance with Protap's secure, and
                personalized insurance services.
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
