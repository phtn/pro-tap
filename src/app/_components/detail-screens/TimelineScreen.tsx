import { motion, useAnimation } from "motion/react";
import { Icon } from "@/lib/icons";
import { DetailHeader } from "./sub-components";
import { useEffect } from "react";

interface TimelineScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const TimelineScreen = (props: TimelineScreenProps) => {
  const controls = useAnimation();
  const progress = 3; // The progress percentage

  useEffect(() => {
    // Animate the width of the progress bar to the target percentage
    controls.start(
      { width: `${progress}%` },
      { duration: 1.5, ease: "easeOut" },
    );
  }, [controls, progress]);
  const milestones = [
    {
      phase: "Discovery & Planning",
      duration: "Week 1-2",
      status: "completed",
      tasks: ["Requirements gathering", "User research", "Technical planning"],
    },
    {
      phase: "Design & Prototyping",
      duration: "Week 2-3",
      status: "completed",
      tasks: ["UI/UX design", "Interactive prototypes", "Design system"],
    },
    {
      phase: "Core Development",
      duration: "Week 3-4",
      status: "in-progress",
      tasks: [
        "Authentication system",
        "Contact management",
        "Profile creation",
      ],
    },
    {
      phase: "Feature Implementation",
      duration: "Week 4-6",
      status: "pending",
      tasks: ["QR code sharing", "Analytics dashboard", "Team features"],
    },
    {
      phase: "Testing & Refinement",
      duration: "Week 6-8",
      status: "pending",
      tasks: ["Quality assurance", "Performance optimization", "Bug fixes"],
    },
    {
      phase: "Deployment & Launch",
      duration: "Week 7-8",
      status: "pending",
      tasks: [
        "App store submission",
        "Production deployment",
        "Launch preparation",
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "checkmark-circle";
      case "in-progress":
        return "code";
      case "pending":
        return "chevron-right";
      default:
        return "chevron-right";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-teal-700 bg-teal-50";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <DetailHeader label="Timeline" {...props} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto"
      >
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-6 top-16 w-1 rounded-full h-16 bg-gray-200" />
              )}

              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(milestone.status)}`}
                >
                  <Icon
                    name={getStatusIcon(milestone.status)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex-1 bg-gradient-to-r from-slate-300 via-slate-300 to-slate-200 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {milestone.phase}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {milestone.duration}
                    </span>
                  </div>

                  <ul className="space-y-1">
                    {milestone.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-600 rounded-lg p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Project Timeline</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Current Week: 2 of 8</span>
              <span>20% Complete</span>
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
            <p className="text-green-100 text-sm">
              Expected completion: 6 weeks remaining
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
