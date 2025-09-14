"use client";

import { useRef } from "react";
import { Landing } from "../_components/landing";
import { Navbar } from "@/components/ui/navbar";
import { NavChild } from "../_components/nav-child";
// import { GoogleOneTap } from "@/lib/one-tap";

export const Content = () => {
  const authRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground">
      {/* Navigation */}
      <Navbar>
        <NavChild />
      </Navbar>
      <Landing />
      {/*<GoogleOneTap />*/}
    </div>
  );
};
