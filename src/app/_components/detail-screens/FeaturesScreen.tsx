import { motion } from "motion/react";
import { Icon } from "@/lib/icons";
import { type FeatureItem } from "./types";
import { DetailHeader } from "./sub-components";

interface FeaturesScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const FeaturesScreen = (props: FeaturesScreenProps) => {
  const features = [
    {
      title: "Digital Business Cards",
      description: "Create and share professional digital business cards",
      status: "completed",
      icon: "px-paperclip",
    },
    {
      title: "Contact Management",
      description: "Organize and manage professional contacts efficiently",
      status: "in-progress",
      icon: "px-chevrons-vertical",
    },
    {
      title: "QR Code Sharing",
      description: "Quick contact sharing via QR codes",
      status: "completed",
      icon: "px-checkbox",
    },
    {
      title: "Analytics Dashboard",
      description: "Track engagement and networking metrics",
      status: "pending",
      icon: "px-zap",
    },
    {
      title: "Team Collaboration",
      description: "Share contacts within team organizations",
      status: "in-progress",
      icon: "px-chevron-right",
    },
    {
      title: "Integration Suite",
      description: "Connect with CRM and productivity tools",
      status: "pending",
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
      <DetailHeader label="Features" {...props} />

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
              className="bg-white rounded-lg p-4 shadow-xs border hover:shadow-m transition-shadow"
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
          className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Feature Completion</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Completed: 2/6</span>
              <span>33%</span>
            </div>
            <div className="w-full bg-purple-400 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: "33%" }}
              ></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
