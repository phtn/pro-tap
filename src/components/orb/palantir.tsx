"use client";

import type React from "react";

import { cn } from "@/lib/utils";

interface Props {
  size?: string;
  className?: string;
  colors?: {
    bg?: string;
    c1?: string;
    c2?: string;
    c3?: string;
  };
  animationDuration?: number;
  darkness?: number; // 0-1 scale, 0 = no black, 1 = maximum black
}

export const Palantir: React.FC<Props> = ({
  size = "192px",
  className,
  colors,
  animationDuration = 120,
  darkness = 0.001,
}) => {
  const defaultColors = {
    bg: `oklch(1 0 0)`,
    c1: "oklch(32.1 97.7 83.1)", // Pastel lavamder
    c2: "emerald-400", // Bloodlust
    c3: "cyan-200", // Pastel amber
  };

  const finalColors = { ...defaultColors, ...colors };

  // Extract numeric value from size for calculations
  const sizeValue = Number.parseInt(size.replace("px", ""), 10);

  // Responsive calculations based on size
  const blurAmount =
    sizeValue < 50
      ? Math.max(sizeValue * 0.008, 1) // Reduced blur for small sizes
      : Math.max(sizeValue * 0.015, 4);

  const contrastAmount =
    sizeValue < 50
      ? Math.max(sizeValue * 0.004, 1.2) // Reduced contrast for small sizes
      : Math.max(sizeValue * 0.008, 1.5);

  const dotSize =
    sizeValue < 50
      ? Math.max(sizeValue * 0.002, 0.04) // Much larger dots for small sizes (minimum 2px)
      : Math.max(sizeValue * 0.004, 0.02); // Much larger dots for bigger sizes (minimum 8px)

  const shadowSpread =
    sizeValue < 50
      ? Math.max(sizeValue * 0.004, 0.5) // Reduced shadow for small sizes
      : Math.max(sizeValue * 0.008, 0.8);

  // Adjust mask radius based on size to reduce black center in small sizes
  const maskRadius =
    sizeValue < 10
      ? "0%"
      : sizeValue < 50
        ? "5%"
        : sizeValue < 100
          ? "15%"
          : "25%";

  // Use more subtle contrast for very small sizes
  const finalContrast =
    sizeValue < 30
      ? 1.1 // Very subtle contrast for tiny sizes
      : sizeValue < 50
        ? Math.max(contrastAmount * 1.2, 1.3) // Reduced contrast for small sizes
        : contrastAmount;

  const darknessOpacity = Math.max(0.05, darkness * 0.5);

  return (
    <div
      className={cn("palantir", className)}
      style={
        {
          width: size,
          height: size,
          "--bg": finalColors.bg,
          "--c1": finalColors.c1,
          "--c2": finalColors.c2,
          "--c3": finalColors.c3,
          "--animation-duration": `${animationDuration}s`,
          "--blur-amount": `${blurAmount}px`,
          "--contrast-amount": finalContrast / 2,
          "--dot-size": `${dotSize}px`,
          "--shadow-spread": `${shadowSpread}px`,
          "--mask-radius": maskRadius,
          "--darkness-opacity": darknessOpacity,
        } as React.CSSProperties
      }
    >
      <div className="background-layer" />
      <div className="contrail-lines" />
      {/*<div className="animated-lines" />*/}

      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @property --pulse {
          syntax: "<number>";
          inherits: false;
          initial-value: 1;
        }

        @property --line-offset {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 0%;
        }

        .palantir {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transform: scale(1.1);
          /* Added outer glow effect */
          box-shadow:
            0 0 calc(var(--blur-amount) * 3) rgba(147, 51, 234, 0.4),
            0 0 calc(var(--blur-amount) * 5) rgba(59, 130, 246, 0.3),
            0 0 calc(var(--blur-amount) * 9) rgba(236, 72, 153, 0.2),
            0 0 calc(var(--blur-amount) * 12) rgba(34, 197, 94, 0.15);
          animation: glow-pulse calc(var(--animation-duration) * 0.5)
            ease-in-out infinite alternate;
        }

        /* Added animated lines layer with flowing energy lines */
        .animated-lines {
          grid-area: stack;
          width: 10%;
          height: 10%;
          position: absolute;
          border-radius: 50%;
          background:
            linear-gradient(
              calc(var(--angle) * 0.5 + 45deg),
              transparent calc(var(--line-offset) + 0%),
              rgba(147, 51, 234, 0.6) calc(var(--line-offset) + 2%),
              transparent calc(var(--line-offset) + 4%),
              transparent calc(var(--line-offset) + 20%),
              rgba(59, 130, 246, 0.5) calc(var(--line-offset) + 22%),
              transparent calc(var(--line-offset) + 24%),
              transparent calc(var(--line-offset) + 40%),
              rgba(236, 72, 153, 0.4) calc(var(--line-offset) + 42%),
              transparent calc(var(--line-offset) + 44%),
              transparent calc(var(--line-offset) + 60%),
              rgba(34, 197, 94, 0.3) calc(var(--line-offset) + 62%),
              transparent calc(var(--line-offset) + 64%),
              transparent calc(var(--line-offset) + 80%),
              rgba(251, 191, 36, 0.4) calc(var(--line-offset) + 82%),
              transparent calc(var(--line-offset) + 84%)
            ),
            linear-gradient(
              calc(var(--angle) * -0.7 + 135deg),
              transparent calc(var(--line-offset) + 10%),
              rgba(236, 72, 153, 0.5) calc(var(--line-offset) + 12%),
              transparent calc(var(--line-offset) + 14%),
              transparent calc(var(--line-offset) + 35%),
              rgba(34, 197, 94, 0.4) calc(var(--line-offset) + 37%),
              transparent calc(var(--line-offset) + 39%),
              transparent calc(var(--line-offset) + 65%),
              rgba(59, 130, 246, 0.6) calc(var(--line-offset) + 67%),
              transparent calc(var(--line-offset) + 69%)
            );
          filter: blur(calc(var(--blur-amount) * 0.5));
          animation:
            rotate calc(var(--animation-duration) * 0.8) linear infinite,
            line-flow calc(var(--animation-duration) * 0.6) linear infinite;
          mix-blend-mode: screen;
          z-index: 1;
        }

        .background-layer {
          grid-area: stack;
          width: 120%;
          height: 120%;
          position: absolute;
          top: -10%;
          left: -10%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at calc(30% + var(--pulse) * 10%)
                calc(40% + var(--pulse) * 15%),
              rgba(147, 51, 234, 0.4) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at calc(70% - var(--pulse) * 8%)
                calc(60% - var(--pulse) * 12%),
              rgba(59, 130, 246, 0.3) 0%,
              transparent 60%
            ),
            radial-gradient(
              circle at calc(50% + var(--pulse) * 5%)
                calc(20% + var(--pulse) * 8%),
              rgba(255, 206, 178, 0.35) 0%,
              transparent 45%
            ),
            conic-gradient(
              from calc(var(--angle) * -1.5) at 60% 80%,
              rgba(34, 197, 94, 0.2),
              transparent 30% 70%,
              rgba(34, 197, 94, 0.2)
            ),
            conic-gradient(
              from calc(var(--angle) * 0.8) at 20% 30%,
              rgba(251, 191, 36, 0.25),
              transparent 25% 75%,
              rgba(251, 191, 36, 0.25)
            );
          filter: blur(calc(var(--blur-amount) * 1.5)) saturate(1.2);
          animation:
            rotate calc(var(--animation-duration) * 1.3) linear infinite reverse,
            pulse calc(var(--animation-duration) * 0.7) ease-in-out infinite
              alternate;
          z-index: -1;
        }

        /* Added curved contrail lines that follow the sphere's curvature */
        .contrail-lines {
          grid-area: stack;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 50%;
          background:
            /* First contrail line */
            conic-gradient(
              from calc(var(--angle) * 0.2) at 50% 50%,
              transparent 0%,
              transparent 30%,
              rgba(188, 253, 202, 0.8) 12%,
              rgba(59, 130, 246, 0.6) 14%,
              transparent 16%,
              transparent 90%
            ),
            /* Second contrail line, slightly offset */
              conic-gradient(
                from calc(var(--angle) * 0.2 + 25deg) at 50% 50%,
                transparent 0%,
                transparent 45%,
                rgba(212, 212, 212, 0.7) 17%,
                rgba(34, 197, 94, 0.5) 19%,
                transparent 21%,
                transparent 90%
              );
          filter: blur(calc(var(--blur-amount) * 0.5));
          animation: rotate calc(var(--animation-duration) * 2) linear infinite;
          mix-blend-mode: hard-light;
          z-index: 2;
        }

        .palantir::before {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
          background:
            conic-gradient(
              from calc(var(--angle) * 2) at 25% 70%,
              var(--c3),
              transparent 20% 80%,
              var(--c3)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 45% 75%,
              var(--c2),
              transparent 30% 60%,
              var(--c2)
            ),
            conic-gradient(
              from calc(var(--angle) * -3) at 80% 20%,
              var(--c1),
              transparent 40% 60%,
              var(--c1)
            ),
            conic-gradient(
              from calc(var(--angle) * 2) at 15% 5%,
              var(--c2),
              transparent 10% 90%,
              var(--c2)
            ),
            conic-gradient(
              from calc(var(--angle) * 1) at 20% 80%,
              var(--c1),
              transparent 10% 90%,
              var(--c1)
            ),
            conic-gradient(
              from calc(var(--angle) * -2) at 85% 10%,
              var(--c3),
              transparent 20% 80%,
              var(--c3)
            );
          box-shadow: inset rgba(0, 0, 0, var(--darkness-opacity)) 0 0
            var(--shadow-spread) calc(var(--shadow-spread) * 0.2);
          filter: blur(var(--blur-amount)) contrast(var(--contrast-amount));
          animation: rotate var(--animation-duration) linear infinite;
          /* Added inner glow to main orb */
          box-shadow:
            inset rgba(0, 0, 0, var(--darkness-opacity)) 0 0
              var(--shadow-spread) calc(var(--shadow-spread) * 0.2),
            inset 0 0 calc(var(--blur-amount) * 2) rgba(147, 151, 234, 0.3),
            inset 0 0 calc(var(--blur-amount) * 4) rgba(59, 130, 246, 0.2);
        }

        .palantir::after {
          content: "";
          display: block;
          grid-area: stack;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: translateZ(0);
          background-image: radial-gradient(
            circle at center,
            var(--bg) var(--dot-size),
            transparent var(--dot-size)
          );
          background-size: calc(var(--dot-size) * 4) calc(var(--dot-size) * 4);
          backdrop-filter: blur(calc(var(--blur-amount) * 2))
            contrast(calc(var(--contrast-amount) * 2));
          mix-blend-mode: overlay;
          /* Removed mask completely to eliminate cone center effect */
          mask-image: none;
        }

        @keyframes rotate {
          to {
            --angle: 360deg;
          }
        }

        /* Added pulsing animation for background layer */
        @keyframes pulse {
          0% {
            --pulse: 0.8;
            transform: scale(0.95) rotate(0deg);
          }
          50% {
            --pulse: 1.2;
            transform: scale(1.05) rotate(180deg);
          }
          100% {
            --pulse: 0.8;
            transform: scale(0.95) rotate(360deg);
          }
        }

        /* Added glow pulsing animation */
        @keyframes glow-pulse {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.2) saturate(1.3);
          }
        }

        /* Added line flowing animation */
        @keyframes line-flow {
          0% {
            --line-offset: 0%;
          }
          100% {
            --line-offset: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .palantir::before,
          .background-layer,
          .animated-lines,
          .contrail-lines {
            animation: none;
          }
          .palantir {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
