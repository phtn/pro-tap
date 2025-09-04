"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

// import { Button } from "@/components/button"

import { Palantir } from "./palantir";

const SiriOrbDemo: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>("250px");
  const [animationDuration, setAnimationDuration] = useState(90);
  const [showSettings, setShowSettings] = useState(false);

  const sizeOptions = [
    { value: "64px", label: "XS" },
    { value: "128px", label: "SM" },
    { value: "192px", label: "MD" },
    { value: "256px", label: "LG" },
    { value: "320px", label: "XL" },
  ];

  return (
    <div className="flex rounded-full bg-radial-[at_50%_75%] from-sky-200/30 via-blue-400 to-indigo-900 to-90% backdrop-blur-xl flex-col items-center">
      <Palantir
        darkness={0.002}
        size={selectedSize}
        animationDuration={animationDuration}
        colors={{
          bg: "var(--color-primary)",
        }}
        className="drop-shadow-2xl"
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: oklch(0.2 0.2 352.53);
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
    </div>
  );
};

export default SiriOrbDemo;
