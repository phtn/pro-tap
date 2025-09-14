import { ClassName } from "@/app/types";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

interface ControlItem {
  id: string;
  icon: IconName;
  title: string;
  status: string;
  enabled: boolean;
  className?: ClassName;
  href: string;
}

export const StatusBar: React.FC = () => {
  const [controls, setControls] = useState<ControlItem[]>([
    {
      id: "protap-user",
      icon: "shield-keyhole",
      title: "Protap",
      status: "Activate now",
      className: "text-teal-600 dark:text-teal-400",
      href: "/pricing",
      enabled: true,
    },
    {
      id: "profile",
      icon: "user-profile",
      title: "Personalization",
      status: "Get Started",
      className: "dark:text-sky-300",
      href: "#",
      enabled: true,
    },
    {
      id: "next",
      icon: "chevron-right",
      title: "Next Steps",
      status: "Enable Chat",
      className: "dark:text-orange-200",
      href: "#",
      enabled: false,
    },
    // {
    //   id: "affiliate",
    //   icon: "checkmark-circle",
    //   title: "Affiliate Account",
    //   status: "Get Started",
    //   enabled: false,
    // },
    // {
    //   id: "merchant",
    //   icon: "search",
    //   title: "Merchant Account",
    //   status: "Get Started",
    //   enabled: false,
    // },
  ]);

  return (
    <div
      className={cn(
        "flex items-center justify-evenly w-5xl h-28 overflow-hidden px-2 rounded-4xl",
        "bg-gradient-to-b from-white/95 to-white/95 dark:from-zinc-600/95 dark:to-zinc-700/95 backdrop-blur-sm",
        " border-[0.33px] border-zinc-300 dark:border-zinc-800/60",
        " shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20",
        "font-figtree font-semibold",
      )}
      // className="w-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center"
    >
      <div className="flex items-center justify-around w-full">
        <div className="flex items-center justify-center w-full">
          {controls.map((control) => (
            <div
              key={control.id}
              className="flex items-center justify-center px-3 w-fit border-r-[0.33px] dark:border-zinc-600 last:border-r-0 flex-1 min-w-0"
            >
              <Link
                href={control.href}
                className="hover:bg-zinc-400/15 py-3 flex items-center justify-center rounded-3xl gap-3 min-w-0 w-full"
              >
                <div className="flex items-start justify-center text-zinc-500 dark:text-zinc-400 size-12 aspect-square flex-shrink-0">
                  <Icon name={control.icon} className="size-8" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm md:text-xl truncate font-bold font-sans tracking-tight">
                    {control.title}
                  </h3>
                  <div
                    className={cn(
                      "leading-none font-semibold flex items-center text-orange-500 space-x-2 dark:text-teal-200 w-fit text-xs md:text-sm py-px rounded-full truncate",
                      control.className,
                    )}
                  >
                    <p className="">{control.status}</p>
                    <Icon name="arrow-right" className="size-4" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
