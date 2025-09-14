"use client";

import { GuidingLight } from "./_components/guiding-light";
import { StatusBar } from "./_components/statusbar";

export const Content = () => {
  return (
    <div className="h-[86lvh]  w-full flex flex-col items-center">
      <GuidingLight />
      <StatusBar />
    </div>
  );
};
