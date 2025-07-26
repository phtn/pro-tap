import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface ProfileDetailScreenProps {
  onNext: VoidFunction;
  onPrev: VoidFunction;
  onBack: VoidFunction;
  onSendMessage: VoidFunction;
}

export const ProfileDetailScreen = ({
  onNext,
  onBack,
  onSendMessage,
}: ProfileDetailScreenProps) => {
  const profile = {
    name: "Sam",
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "London, UK",
    imageUrl: "/images/sega.png",
    bio: "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
    stats: {
      projects: 47,
      connections: 1240,
      endorsements: 89,
    },
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "Rust", level: 90 },
      { name: "Go", level: 88 },
      { name: "Zig", level: 85 },
      { name: "Elixir", level: 78 },
      { name: "C", level: 75 },
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Solutions",
        period: "2022 - Present",
        description: "Leading frontend development for enterprise applications",
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Full-stack development using React and Node.js",
      },
    ],
  };

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-black backdrop-blur-lg">
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="rounded-full bg-white/20 text-white hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon
            name="px-chevron-right"
            className="size-6 aspect-square rotate-180"
          />
        </Button>
        <div className="text-white/80 text-sm font-medium">Profile Details</div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onNext}
          className="rounded-full bg-white/20 text-white/80 hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon name="px-chevron-right" className="size-6 aspect-square" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-black text-white overflow-y-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative pt-20 pb-6 px-6 bg-gradient-to-b from-gray-900 to-black"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Image
                src={profile.imageUrl}
                alt={profile.name}
                width={80}
                height={80}
                className="rounded-full aspect-square object-cover border-2 border-white/20"
              />
              <div className="absolute -bottom-1 right-2 size-6 aspect-square bg-teal-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-slate-300 text-sm">{profile.title}</p>
              <p className="text-slate-400 text-xs">{profile.company}</p>
              <div className="flex items-center mt-1">
                <Icon name="px-pin" className="w-3 h-3 mr-1 text-slate-400" />
                <span className="text-slate-400 text-xs">
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 font-space">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-100">
                {profile.stats.projects}
              </div>
              <div className="text-xs text-slate-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-100">
                {profile.stats.connections}
              </div>
              <div className="text-xs text-slate-400">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-100">
                {profile.stats.endorsements}
              </div>
              <div className="text-xs text-slate-400">Endorsements</div>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 border-y border-slate-500/30"
        >
          <h2 className="font-semibold text-slate-200 mb-4 font-space tracking-tight">
            About
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {profile.bio}
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 border-b border-slate-500/30"
        >
          <h2 className="font-semibold text-slate-200 mb-4 font-space tracking-tight">
            Skills
          </h2>
          <div className="space-y-3">
            {profile.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs font-space">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-slate-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 rounded-full h-1.5 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-emerald-400 to-progress-end z-0"
                    style={{ filter: "blur(8px)" }} // Apply blur directly for the glow effect
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className={cn(
                      "h-1.5 rounded-full bg-gradient-to-r",
                      skill.level >= 90
                        ? "from-emerald-400 to-progress-end"
                        : skill.level >= 80
                          ? "from-sky-300 to-sky-100"
                          : "from-orange-300 to-orange-100",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 border-0 border-slate-500/50"
        >
          <h2 className="font-semibold text-slate-200 mb-4 font-space tracking-tight">
            Experience
          </h2>
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div key={index} className="relative">
                {index < profile.experience.length - 1 && (
                  <div className="absolute left-1 top-[1.35rem] w-1 h-16 rounded-full bg-gradient-to-br from-slate-600/60 via-slate-500/50 to-slate-400/60"></div>
                )}
                <div className="flex items-start space-x-3">
                  <div className="size-3 aspect-square bg-teal-300 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-teal-50">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-gray-300">{exp.company}</p>
                    <p className="text-xs text-gray-400 mb-1">{exp.period}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="px-6 pb-8 pt-6 space-y-3 font-space"
        >
          <Button
            size="xl"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
          >
            Connect
          </Button>
          <Button
            size="xl"
            onClick={onSendMessage}
            variant="outline"
            className="w-full border-gray-700 text-slate-700 hover:text-teal-300 hover:bg-gray-700"
          >
            Send Message
          </Button>
        </motion.div>
      </div>
    </>
  );
};
