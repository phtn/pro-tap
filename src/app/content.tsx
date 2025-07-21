"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon, IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Pro } from "@/components/pro";

interface LinkItem {
  type: string;
  icon: IconName;
  href: string;
}

export const Content = () => {
  const profile = {
    name: "Sam",
    title: "Software Engineer",
    location: "London",
    imageUrl: "/images/sega.png",
    links: [
      { type: "phone", icon: "px-zap", href: "tel:+1234567890" },
      { type: "email", icon: "px-paperclip", href: "mailto:hq@bigticket.ph" },
      { type: "instagram", icon: "px-checkbox", href: "https://instagram.com" },
      { type: "x.com", icon: "px-chevrons-vertical", href: "https://x.com" },
    ] as LinkItem[],
    website: {
      text: "bigticket.ph",
      href: "https://bigticket.ph",
    },
  };

  const cardVariants = {
    hidden: () => ({ opacity: 0, y: 50 }),
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    }),
  } as Variants;

  const itemVariants = {
    hidden: () => ({ opacity: 0, y: 20 }),
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    }),
  } as Variants;

  const socialIconVariants = {
    hover: () => ({
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    }),
    tap: () => ({ scale: 0.95 }),
  } as Variants;

  return (
    <div className="flex md:items-center justify-center min-h-screen bg-gray-100 md:p-4">
      {/* This div simulates the phone screen for presentation */}
      <div className="relative w-full h-[calc(100vh)] md:h-full max-w-sm aspect-auto md:aspect-[9/16] md:rounded-[3rem] bg-black shadow-xl overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <Icon name="px-arrow-right" className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <Icon name="px-zap" className="h-5 w-5" />
          </Button>
        </div>

        <motion.div
          className="flex flex-col h-full"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {/* Profile Image Section */}
          <div className="relative flex-shrink-0 bg-gray-200 flex items-center justify-center overflow-hidden h-[68%]">
            <Image
              src={profile.imageUrl || "/placeholder.svg"}
              alt={profile.name}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
            <motion.div
              className="absolute md:-bottom-28 -bottom-32 left-0 right-0 bg-black h-1/2 rounded-t-[2rem] flex flex-col justify-start p-6 pb-8 gap-y-0 my-0 pt-6"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.4,
                delay: 0.2,
              }}
            >
              <motion.h1
                className="text-white text-2xl font-bold font-sans tracking-tighter mb-1"
                variants={itemVariants}
              >
                {profile.name}
              </motion.h1>
              <motion.p
                className="text-muted/80 tracking-tight mb-1"
                variants={itemVariants}
              >
                {profile.title}
              </motion.p>
              <motion.div
                className="flex items-center text-muted/60 text-sm"
                variants={itemVariants}
              >
                <Icon name="px-chevron-right" className="h-4 w-4 mr-1" />
                <span className="">{profile.location}</span>
              </motion.div>
            </motion.div>
            {/* Small yellow circle with icon */}
            <motion.div
              className="absolute md:bottom-[calc(33%-40px)] bottom-[calc(33%-64px)] right-8 bg-yellow-400 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Pro />
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="flex-grow bg-black overflow-hidden text-white p-6 flex flex-col justify-between pt-6">
            <motion.div
              className="grid grid-cols-4 gap-4 mb-8 rounded-t-[2rem]"
              variants={itemVariants}
            >
              {profile.links.map((link, index) => (
                <motion.a
                  key={link.type + index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-xl text-white",
                    link.type === "instagram" &&
                      "bg-gradient-to-br from-purple-500 via-red-500 to-yellow-500",
                    link.type === "linkedin" && "bg-[#0A66C2]", // LinkedIn blue
                    (link.type === "phone" || link.type === "email") &&
                      "bg-gray-800",
                  )}
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  style={{ willChange: "transform" }} // Optimize for animation
                >
                  <Icon name={link.icon} className="h-7 w-7" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="space-y-2 pt-2 pb-10 md:py-2"
              variants={itemVariants}
            >
              <Button
                variant="secondary"
                size="xl"
                className="flex bg-teal-50 group border-0 border-border/40 py-2 px-3 items-center w-full justify-between pb-2"
              >
                <span className="font-sans group-hover:text-cyan-800 tracking-tighter text-lg text-cyan-700">
                  View Profile
                </span>
                <Icon
                  name="px-arrow-up"
                  className="size-6 rotate-45 text-cyan-700"
                />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ProfileWeb = () => (
  <div className="flex flex-col">
    <p className="text-base tracking-tight text-foreground">View Profile</p>
    <a
      // href={profile.website.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary-foreground font-space text-sm hover:underline"
    >
      {/* {profile.website.text} */}
    </a>
  </div>
);
