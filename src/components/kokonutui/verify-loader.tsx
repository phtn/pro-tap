"use client";

/**
 * @author: @dorian_baffier
 * @description: Currency Transfer
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import TextAnimate from "../ui/text-animate";
import { Hex } from "../experimental/hex";

interface CheckmarkProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: { delay: i * 0.2, duration: 0.3 },
    },
  }),
};

export function VerifyLoader({ code }: { code?: string }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const timestamp = new Date().toLocaleString();
  const transactionId =
    code || `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (isCompleted && code) {
  //     router.replace('/verify');
  //   }
  // }, [isCompleted, code, router]);

  return (
    <TooltipProvider>
      <div className="relative size-[240px] flex items-center justify-center">
        <Hex
          size={240}
          className={cn(
            "z-0 absolute fill-primary/5 dark:fill-primary-hover/20",
            "transition-colors duration-500",
            {
              "fill-emerald-400/5 dark:fill-emerald-900/30": isCompleted,
            },
          )}
        />
        <div className="relative z-50 size-[240px] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <motion.div
                  className={cn(
                    "absolute inset-0 blur-2xl bg-primary-hover/10 dark:bg-primary-hover/5 rounded-full",
                    "transition-colors duration-400",
                    { "bg-emerald-500/10 dark:bg-emerald-500/5": isCompleted },
                  )}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <AnimatePresence mode="wait">
                  {!isCompleted ? (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-[102px] h-[102px] flex items-center justify-center"
                    >
                      <div className="relative z-20">
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-transparent"
                          style={{
                            borderLeftColor: "oklch(0.592 0.178 257.29)",
                            borderRightColor: "oklch(0.592 0.178 257.29)",
                            filter: "blur(0.5px)",
                          }}
                          animate={{
                            rotate: 650,
                            scale: [1.01, 1.03, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            },
                            scale: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                        />
                        <div className="relative z-10 bg-white dark:bg-zinc-900 rounded-full p-5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                          <Icon
                            name="hexagon"
                            className={cn("size-10 text-primary", {
                              "animate-caret-blink": !isCompleted,
                            })}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="completed"
                      initial={{
                        opacity: 0,
                        rotate: -180,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="w-[100px] h-[100px] flex items-center justify-center"
                    >
                      <div className="relative z-10 rounded-full p-3 bg-emerald-400/5 backdrop-blur-lg">
                        <Checkmark
                          className="size-14 md:size-20  text-emerald-500 bg-white dark:bg-background rounded-full"
                          strokeWidth={3.5}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col">
            <motion.div
              className="space-y-2 text-center w-full mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.h2
                    key="completed-title"
                    className="relative md:text-lg text-zinc-900 dark:text-zinc-100 tracking-normal font-semibold font-figtree uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="absolute text-white blur-sm scale-[102%]">
                      Successful
                    </span>
                    <span>Successful</span>
                  </motion.h2>
                ) : (
                  <motion.h2
                    key="progress-title"
                    className="md:text-lg text-zinc-900 dark:text-zinc-100 tracking-tighter font-semibold uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    in Progress
                  </motion.h2>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <div className="flex items-center justify-center">
                  {isCompleted ? (
                    <motion.div
                      key="completed-id"
                      className={cn(
                        "text-xs md:text-sm text-primary-hover dark:text-primary-hover font-medium",
                        {
                          "text-emerald-600 dark:text-emerald-400": isCompleted,
                        },
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: 0.8,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Protap Verified
                    </motion.div>
                  ) : (
                    <TextAnimate
                      text={`${code}`}
                      type="calmInUp"
                      className="text-xs md:text-sm uppercase font-doto text-primary font-black tracking-wide"
                      delay={1.3}
                    />
                  )}
                </div>
              </AnimatePresence>
              <div className="flex items-center gap-4 mt-4"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
}: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="48"
        stroke={color}
        variants={draw as any}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.2))",
        }}
      />
      <motion.path
        d="M32 50L45 63L68 35"
        stroke={color}
        variants={draw as any}
        custom={1}
        style={{
          strokeWidth: strokeWidth + 0.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 1px rgba(16, 185, 129, 0.3))",
        }}
      />
    </motion.svg>
  );
}

interface Props {
  isCompleted: boolean;
}
const FromToWidget = ({ isCompleted }: Props) => (
  <motion.div
    className="flex-1 relative"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    <motion.div
      className="flex flex-col items-start relative"
      initial={{ gap: "12px" }}
      animate={{
        gap: isCompleted ? "0px" : "12px",
      }}
      transition={{
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <motion.div
        className={cn(
          "w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-md transition-all duration-300",
          isCompleted
            ? "rounded-b-none border-b-0"
            : "hover:border-emerald-500/30",
        )}
        animate={{
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <div className="space-y-1 w-full">
          <motion.span
            className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon name="arrow-up" className="size-3" />
            From
          </motion.span>
          <div className="flex flex-col gap-1.5">
            <motion.div
              className="flex items-center gap-2.5 group"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 shadow-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                $
              </motion.span>
              <div className="flex flex-col items-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isCompleted ? "completed-amount" : "processing-amount"}
                    className={cn(
                      "font-medium text-zinc-900 dark:text-zinc-100 tracking-tight",
                    )}
                    initial={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    animate={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    exit={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    500.00 USD
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                  initial={{
                    opacity: 1,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Chase Bank ••••4589
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={cn(
          "w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-200 dark:border-zinc-700/50 backdrop-blur-md transition-all duration-300",
          isCompleted
            ? "rounded-t-none border-t-0"
            : "hover:border-emerald-500/30",
        )}
        animate={{
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <div className="space-y-1 w-full">
          <motion.span
            className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon name="arrow-down" className="size-3" />
            To
          </motion.span>
          <div className="flex flex-col gap-1.5">
            <motion.div
              className="flex items-center gap-2.5 group"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 shadow-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                €
              </motion.span>
              <div className="flex flex-col items-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={
                      isCompleted
                        ? "completed-amount-eur"
                        : "processing-amount-eur"
                    }
                    className={cn(
                      "font-medium text-zinc-900 dark:text-zinc-100 tracking-tight",
                    )}
                    initial={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    animate={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    exit={{
                      opacity: isCompleted ? 1 : 0.5,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    460.00 EUR
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="text-xs text-zinc-500 dark:text-zinc-400"
                  initial={{
                    opacity: 1,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Deutsche Bank ••••7823
                </motion.span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);

interface StatusbarProps {
  isCompleted: boolean;
  timestamp: string;
}
const Statusbar = ({ isCompleted, timestamp }: StatusbarProps) => {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <AnimatePresence mode="wait">
        {isCompleted ? (
          <motion.span
            key="completed-rate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Exchange Rate: 1 USD = 0.92 EUR
          </motion.span>
        ) : (
          <motion.span
            key="calculating-rate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Calculating exchange rate...
          </motion.span>
        )}
      </AnimatePresence>
      <Tooltip>
        <TooltipTrigger>
          <Icon
            name="settings"
            className="size-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {isCompleted ? `Rate updated at ${timestamp}` : "Please wait..."}
          </p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
};

interface ResultbarProps {
  isCompleted: boolean;
  transactionId: string;
}

const Resultbar = ({ isCompleted, transactionId }: ResultbarProps) => {
  return (
    <AnimatePresence mode="wait">
      {isCompleted ? (
        <motion.div
          key="completed-id"
          className={cn(
            "text-xs text-primary-hover dark:text-primary-hover font-medium",
            { "text-emerald-600 dark:text-emerald-400": isCompleted },
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Card Serial Number: {transactionId}
        </motion.div>
      ) : (
        <motion.div
          key="progress-status"
          className="text-xs text-emerald-600 dark:text-emerald-400 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Processing Transaction...
        </motion.div>
      )}
    </AnimatePresence>
  );
};
