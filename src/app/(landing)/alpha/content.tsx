"use client";

import { useRef } from "react";
import { Landing } from "../_components/landing";
import { Navbar } from "@/components/ui/navbar";
import { NavChild } from "../_components/nav-child";
// import { GoogleOneTap } from "@/lib/one-tap";

export const Content = () => {
  const authRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen md:max-w-6xl mx-auto ">
      <Navbar label="Protap Digital Insurance">
        <NavChild />
      </Navbar>
      <Landing />
    </div>
  );
};
