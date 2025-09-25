"use client";

/**
 * @author: @dorian_baffier
 * @description: Shimmer Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from "@/lib/utils";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { useEffect, useState } from "react";

interface ShimmerTextProps {
  text?: string;
  className?: string;
  auto?: boolean;
  playOnHover?: boolean;
  playOnClick?: boolean;
  loading?: boolean;
  active?: boolean;
  duration?: number;
  loop?: boolean;
  ease?: Transition["ease"];
  surface?: "auto" | "light" | "dark";
  variant?: "default" | "chatgpt";
  children?: React.ReactNode;
}

export default function ShimmerText({
  text,
  className,
  playOnHover = false,
  playOnClick = false,
  loading = false,
  auto = playOnHover ? false : true,
  active,
  duration,
  loop = true,
  ease,
  surface = "auto",
  variant = "default",
  children,
}: ShimmerTextProps) {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const shouldPlay: boolean =
    typeof active === "boolean"
      ? active
      : loading ||
        auto ||
        (playOnHover && isHovered) ||
        (playOnClick && isClicked);

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.stop();
      controls.set({
        backgroundPosition: variant === "chatgpt" ? "0% center" : "200% center",
      });
      return;
    }
    if (shouldPlay) {
      controls.start({
        backgroundPosition:
          variant === "chatgpt"
            ? ["100% center", "-200% center"]
            : ["200% center", "-200% center"],
        transition: {
          duration: duration ?? (variant === "chatgpt" ? 1.65 : 2.5),
          ease: (ease ??
            (variant === "chatgpt"
              ? [0.4, 0.0, 0.2, 1.4]
              : "linear")) as Transition["ease"],
          repeat: loop ? Number.POSITIVE_INFINITY : 0,
          repeatDelay: 6,
          delay: 3,
        },
      });
    } else {
      controls.stop();
      controls.set({
        backgroundPosition:
          variant === "chatgpt" ? "200% center" : "200% center",
      });
    }
  }, [
    shouldPlay,
    duration,
    loop,
    ease,
    variant,
    prefersReducedMotion,
    controls,
  ]);

  const isInteractive = playOnClick || playOnHover;

  const lightDefault = "from-neutral-950 via-neutral-400 to-neutral-950";
  const darkDefault = "from-white via-neutral-600 to-white";
  const lightChatgpt = "from-zinc-500 via-zinc-300 to-zinc-500";
  const darkChatgpt = "from-zinc-200 via-zinc-400 to-zinc-200";

  const gradientClass =
    surface === "auto"
      ? `bg-gradient-to-r ${variant === "chatgpt" ? lightChatgpt : lightDefault} dark:${variant === "chatgpt" ? darkChatgpt : darkDefault}`
      : surface === "light"
        ? `bg-gradient-to-r ${variant === "chatgpt" ? lightChatgpt : lightDefault}`
        : `bg-gradient-to-r ${variant === "chatgpt" ? darkChatgpt : darkDefault}`;

  const bgLengthClass =
    variant === "chatgpt" ? "bg-[length:300%_100%]" : "bg-[length:200%_100%]";

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative py-2 overflow-hidden"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25 }}
      >
        <motion.h1
          className={cn(
            "text-3xl font-semibold tracking-tight bg-clip-text text-transparent",
            gradientClass,
            bgLengthClass,
            className,
          )}
          initial={{
            backgroundPosition:
              variant === "chatgpt" ? "300% center" : "100% center",
          }}
          animate={controls}
          onHoverStart={playOnHover ? () => setIsHovered(true) : undefined}
          onHoverEnd={playOnHover ? () => setIsHovered(false) : undefined}
          onClick={playOnClick ? () => setIsClicked((p) => !p) : undefined}
          onKeyDown={
            playOnClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsClicked((p) => !p);
                  }
                }
              : undefined
          }
          role={isInteractive ? "button" : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          aria-pressed={playOnClick ? isClicked : undefined}
          aria-busy={loading || undefined}
          aria-live={loading ? "polite" : undefined}
        >
          {text}
          {children}
        </motion.h1>
      </motion.div>
    </div>
  );
}
