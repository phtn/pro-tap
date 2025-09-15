"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  ValueAnimationTransition,
} from "motion/react";

import { cn } from "@/lib/utils";

interface NumberTickerProps {
  from: number; // Starting value of the animation
  target: number; // End value of the animation
  transition?: ValueAnimationTransition; // Animation configuration, refer to motion docs for more details
  className?: string; // additionl CSS classes for styling
  onStart?: () => void; // Callback function when animation starts
  onComplete?: () => void; // Callback function when animation completes
  autoStart?: boolean; // Whether to start the animation automatically
}

// Ref interface to allow external control of the animation
export interface NumberTickerRef {
  startAnimation: () => void;
}

const NumberTicker = forwardRef<NumberTickerRef, NumberTickerProps>(
  (
    {
      from = 0,
      target = 0,
      transition = {
        duration: 3,
        type: "tween",
        ease: "easeInOut",
      },
      className,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref,
  ) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [controls, setControls] = useState<AnimationPlaybackControls | null>(
      null,
    );

    // Local display state that mirrors the motion value for React text rendering
    const [display, setDisplay] = useState<number>(from);

    // Keep display in sync with the rounded motion value
    useMotionValueEvent(rounded, "change", (latest: number) => {
      setDisplay(Math.round(latest));
    });

    // Reset displayed value when "from" changes and before a new animation starts
    useEffect(() => {
      setDisplay(Math.round(from));
    }, [from]);

    // Function to start the animation
    const startAnimation = useCallback(() => {
      // Stop any ongoing animation before starting a new one
      if (controls) controls.stop();

      onStart?.();

      // Reset to the latest "from" then animate to the latest "target"
      count.set(from);

      const newControls = animate(count, target, {
        ...transition,
        onComplete: () => {
          onComplete?.();
        },
      });
      setControls(newControls);
    }, [controls, count, from, target, transition, onStart, onComplete]);

    // Expose the startAnimation function via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
    }));

    useEffect(() => {
      if (autoStart) {
        startAnimation();
      }
      return () => controls?.stop();
    }, [autoStart, startAnimation]);

    return (
      <motion.span className={cn(className)} {...props}>
        {display}
      </motion.span>
    );
  },
);

NumberTicker.displayName = "NumberTicker";

export default NumberTicker;

// Usage example:
// To start the animation from outside the component:
// 1. Create a ref:
//    const tickerRef = useRef<NumberTickerRef>(null);
// 2. Pass the ref to the NumberTicker component:
//    <NumberTicker ref={tickerRef} from={0} target={100} autoStart={false} />
// 3. Call the startAnimation function:
//    tickerRef.current?.startAnimation();
