"use client";

import { Navbar } from "@/components/ui/navbar";
import { NavChild } from "./_components/nav-child";

export const Content = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground">
      <Navbar>
        <NavChild />
      </Navbar>
      <main>
        <p>Verify</p>
      </main>
    </div>
  );
};
