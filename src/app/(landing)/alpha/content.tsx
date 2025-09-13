"use client";

import { useRef } from "react";
import { Landing } from "../_components/landing";
// import { GoogleOneTap } from "@/lib/one-tap";

export const Content = () => {
  const authRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Landing />
      {/*<GoogleOneTap />*/}
    </>
  );
};
