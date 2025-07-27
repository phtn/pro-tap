"use client";

import { motion } from "motion/react";
import { useDetailNavigation } from "../hooks/useNavigation";
import { OverviewScreen } from "./detail-screens/OverviewScreen";
import { FeaturesScreen } from "./detail-screens/FeaturesScreen";
import { TimelineScreen } from "./detail-screens/TimelineScreen";
import { BudgetScreen } from "./detail-screens/BudgetScreen";
import { TeamScreen } from "./detail-screens/TeamScreen";

export const DesktopDetails = () => {
  const { currentScreen, nextScreen, prevScreen } = useDetailNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case "overview":
        return <OverviewScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "features":
        return <FeaturesScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "timeline":
        return <TimelineScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "budget":
        return <BudgetScreen onNext={nextScreen} onPrev={prevScreen} />;
      case "team":
        return <TeamScreen onNext={nextScreen} onPrev={prevScreen} />;
      default:
        return <OverviewScreen onNext={nextScreen} onPrev={prevScreen} />;
    }
  };

  return (
    <div className="bg-white border-2 border-slate-400 hidden lg:flex p-8 flex-1 size-full min-w-4xl rounded-3xl h-[600px] overflow-scroll">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-5xl"
      >
        {renderScreen()}
      </motion.div>
    </div>
  );
};

export const ProfileWeb = () => (
  <div className="flex flex-col">
    <p className="text-base tracking-tight text-foreground">View Profile</p>
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary-foreground font-space text-sm hover:underline"
    >
      bigticket.ph
    </a>
  </div>
);
