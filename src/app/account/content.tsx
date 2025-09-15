"use client";

import { Prism } from "@/components/react-bits/prism";
import { StatusBar } from "./_components/statusbar";
import { CircleProgress } from "@/components/kokonutui/apple-activity-card";
import { SexyButton } from "@/components/experimental/sexy-button";
import { useCallback, useMemo, useState } from "react";

export const Content = () => {
  const [progress, setProgress] = useState(0.0);

  const protap_status = useMemo(
    () => ({
      label: "Activation",
      value: progress,
      color: "#A3F900",
      size: 44,
      current: 0,
      target: 75,
      unit: "%",
    }),
    [progress],
  );

  const incVal = useCallback(() => {
    setProgress((prev) => prev + 33);
  }, []);

  return (
    <div className="h-[86lvh]  w-full flex flex-col items-center">
      <GuidingLight />
      <StatusBar progressOne={progress} progressTwo={0} />

      <div className="py-4">
        <SexyButton onClick={incVal}>Bang that ass</SexyButton>
      </div>
    </div>
  );
};

const GuidingLight = () => {
  return (
    <div className="absolute opacity-25 bottom-0 size-full overflow-hidden pointer-events-none">
      <Prism
        animationType="3drotate"
        timeScale={0.005}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={0.95}
        noise={0.05}
        glow={1}
      />
    </div>
  );
};
