import { motion, useAnimation } from "motion/react";
import { Icon } from "@/lib/icons";
import { type FeatureItem } from "./types";
import { DetailHeader } from "./sub-components";
import { useEffect } from "react";

interface FeaturesScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const FeaturesScreen = (props: FeaturesScreenProps) => {
  const controls = useAnimation();
  const progress = 3; // The progress percentage

  useEffect(() => {
    // Animate the width of the progress bar to the target percentage
    controls.start(
      { width: `${progress}%` },
      { duration: 1.5, ease: "easeOut" },
    );
  }, [controls, progress]);
  const features = [
    {
      title: "Add to Contacts on Card Tap",
      description: "Auto contact sharing via RFID card tap",
      status: "not-started",
      icon: "px-paperclip",
    },
    {
      title: "Add to Contacts on QR Scan",
      description: "Quick contact sharing via QR codes",
      status: "in-progress",
      icon: "px-chevrons-vertical",
    },
    {
      title: "QR Code Sharing",
      description: "Quick contact sharing via QR codes",
      status: "in-progress",
      icon: "px-checkbox",
    },
    {
      title: "Chat Messaging",
      description: "Enable Secure Chat Messaging within connections",
      status: "not-started",
      icon: "px-zap",
    },
    {
      title: "Merchant Registry",
      description: "Create Merchant account and product vouchers",
      status: "not-started",
      icon: "px-chevron-right",
    },
    {
      title: "Account Personalization",
      description: "Share contacts within team organizations",
      status: "in-progress",
      icon: "px-arrow-up",
    },
  ] as FeatureItem[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <DetailHeader label="Core Features" {...props} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-r from-slate-300 via-slate-300 to-slate-200 rounded-lg p-4 border"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon
                      name={feature.icon}
                      className="w-5 h-5 text-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-4 py-3 rounded-lg tracking-tight font-space capitalize text-sm font-medium ${getStatusColor(feature.status)}`}
                >
                  {feature.status.replace("-", " ")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-2 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-600 rounded-lg p-4 text-white"
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completed: 0/6</span>
              <span>0%</span>
            </div>
            <div className="relative w-full h-3 rounded-full bg-gray-700">
              {/* Glow layer - positioned behind the main bar */}
              <motion.div
                className="absolute w-full top-0 left-0 h-3 rounded-full bg-gradient-to-r from-green-300 to-progress-end z-0"
                style={{ filter: "blur(10px)" }} // Apply blur directly for the glow effect
                initial={{ width: 0 }}
                animate={controls}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              {/* Actual progress bar - on top of the glow */}
              <motion.div
                className="absolute w-full top-0 left-0 h-3 rounded-[18px] bg-gradient-to-r from-green-300 to-progress-end z-10"
                initial={{ width: 0 }}
                animate={controls}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
