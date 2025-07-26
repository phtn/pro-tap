import { motion } from "motion/react";
import { Icon } from "@/lib/icons";
import { DetailHeader } from "./sub-components";

interface TimelineScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const TimelineScreen = (props: TimelineScreenProps) => {
  const milestones = [
    {
      phase: "Discovery & Planning",
      duration: "Week 1-2",
      status: "completed",
      tasks: ["Requirements gathering", "User research", "Technical planning"],
    },
    {
      phase: "Design & Prototyping",
      duration: "Week 3-4",
      status: "completed",
      tasks: ["UI/UX design", "Interactive prototypes", "Design system"],
    },
    {
      phase: "Core Development",
      duration: "Week 5-6",
      status: "in-progress",
      tasks: [
        "Authentication system",
        "Contact management",
        "Profile creation",
      ],
    },
    {
      phase: "Feature Implementation",
      duration: "Week 7-8",
      status: "pending",
      tasks: ["QR code sharing", "Analytics dashboard", "Team features"],
    },
    {
      phase: "Testing & Refinement",
      duration: "Week 9",
      status: "pending",
      tasks: ["Quality assurance", "Performance optimization", "Bug fixes"],
    },
    {
      phase: "Deployment & Launch",
      duration: "Week 10",
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
        return "px-checkbox";
      case "in-progress":
        return "px-zap";
      case "pending":
        return "px-chevron-right";
      default:
        return "px-chevron-right";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
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
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
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

                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border">
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
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
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
          className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-2">Project Timeline</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Current Week: 5 of 10</span>
              <span>50% Complete</span>
            </div>
            <div className="w-full bg-green-400 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="text-green-100 text-sm">
              Expected completion: 5 weeks remaining
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
