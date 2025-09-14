"use client";

import { Prism } from "@/components/react-bits/prism";
import { StatusBar } from "./_components/statusbar";

export const Content = () => {
  return (
    <div className="h-[86lvh]  w-full flex flex-col items-center">
      <GuidingLight />
      <StatusBar />
    </div>
  );
};

const GuidingLight = () => {
  return (
    <div className="absolute opacity-20 bottom-0 size-full overflow-hidden pointer-events-none">
      <Prism
        animationType="3drotate"
        timeScale={0.005}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0.3}
        colorFrequency={0.88}
        noise={0.05}
        glow={1}
      />
    </div>
  );
};
