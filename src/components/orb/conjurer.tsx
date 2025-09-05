"use client";

import { useCallback, useEffect, useState } from "react";
import { Settings } from "lucide-react";

// import { Button } from "@/components/button"

import { Palantir } from "./palantir";
import { GlassFilter } from "../experimental/glass";
import { cn } from "@/lib/utils";

const ConjurSight: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("50px");
  const [animationDuration, setAnimationDuration] = useState(10);
  const [showSettings, setShowSettings] = useState(false);

  const sizeOptions = [
    { value: "64px", label: "XS" },
    { value: "128px", label: "SM" },
    { value: "192px", label: "MD" },
    { value: "256px", label: "LG" },
    { value: "320px", label: "XL" },
  ];

  const getOpacity = useCallback((value: string) => {
    const opacity = parseFloat(value) / 100;
    return opacity;
  }, []);

  const [sine, setSine] = useState(50);
  const [cosine, setCosine] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now() / 1000;
      setSine(Math.min(Math.sin(now) * 100 * 2.5, 100));
      setCosine(Math.abs(Math.cos(now) * 100) * 1.5);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex rounded-full flex-col items-center transition-all transform-gpu duration-1000 ease-in-out",
        ` bg-radial-[at_${cosine.toFixed(0)}%_${sine.toFixed(0)}%] from-sky-200 via-blue-300 to-indigo-400 to-90% backdrop-blur-md`,
      )}
    >
      <Palantir
        darkness={0.002}
        size={selectedSize}
        animationDuration={animationDuration}
        colors={{
          bg: "var(--color-primary)",
        }}
        className="drop-shadow-xl"
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: oklch(0.646 0.03 352.53);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: oklch(0.2 0.2 352.53);
          cursor: pointer;
          border: none;
        }
      `}</style>
      <GlassFilter />
      <div className="flex space-x-3 text-pink-200">
        {sine.toFixed(0)} | {cosine.toFixed(0)}
      </div>
    </div>
  );
};

export default ConjurSight;
