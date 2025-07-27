import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Pro } from "@/components/pro";
import { LinkItem } from "../../types";

interface ProfileScreenProps {
  onNext: () => void;
  onPrev: () => void;
  onViewProfile: () => void;
}

export const ProfileScreen = ({
  onNext,
  onPrev,
  onViewProfile,
}: ProfileScreenProps) => {
  const profile = {
    name: "Sam",
    title: "Software Engineer",
    location: "London",
    imageUrl: "/images/sega.png",
    links: [
      {
        type: "phone",
        icon: "fb-f",
        href: "tel:+1234567890",
        style: "bg-[#0866ff]",
      },
      {
        type: "linkedin",
        icon: "linkedin",
        href: "mailto:hq@bigticket.ph",
        style: "bg-[#0b66c2]",
      },
      {
        type: "instagram",
        icon: "instagram",
        href: "https://instagram.com",
        style: "bg-gradient-to-br from-purple-500 via-red-500 to-yellow-500",
      },
      {
        type: "x.com",
        icon: "x-twitter",
        href: "https://x.com",
        style: "bg-black border border-slate-400 text-white",
      },
    ] as LinkItem[],
  };

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={onPrev}
          className="rounded-full bg-white/20 text-white hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon
            name="px-chevron-right"
            className="size-6 aspect-square rotate-180"
          />
        </Button>
        <div className="text-white/60 text-sm">Sam</div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onNext}
          className="rounded-full bg-white/20 text-white/80 hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon name="px-chevron-right" className="size-6 aspect-square" />
        </Button>
      </div>

      {/* Profile Image Section */}
      <div className="relative flex-shrink-0 bg-gray-200 flex items-center justify-center w-full overflow-hidden h-[68%]">
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
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-white text-2xl font-bold font-sans tracking-tighter mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {profile.name}
            </motion.h1>
            <motion.div
              className="bg-yellow-400 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Pro />
            </motion.div>
          </div>
          <motion.p
            className="text-muted/80 tracking-tight mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {profile.title}
          </motion.p>
          <motion.div
            className="flex items-center text-muted/60 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Icon name="px-pin" className="h-4 w-4 mr-1" />
            <span>{profile.location}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Details Section */}
      <div className="flex-grow bg-black overflow-hidden text-white p-6 flex flex-col justify-between pt-6">
        <motion.div
          className="grid grid-cols-4 gap-4 mb-8 rounded-t-[2rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {profile.links.map((link, index) => (
            <motion.a
              key={link.type + index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-xl text-white",
                link.style,
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name={link.icon} className="h-7 w-7" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="space-y-2 pt-2 pb-10 md:py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Button
            size="xl"
            variant="secondary"
            onClick={onViewProfile}
            className="flex bg-white group w-full border-0 border-border/40 py-2 px-3 pb-2"
          >
            <div className="flex items-center justify-center w-full space-x-8">
              <span className="font-sans group-hover:text-cyan-800 tracking-tighter text-lg text-cyan-600">
                View Profile
              </span>
              <Icon
                name="px-arrow-up"
                className="size-6 rotate-45 text-cyan-600 group-hover:text-cyan-700"
              />
            </div>
          </Button>
        </motion.div>
      </div>
    </>
  );
};
