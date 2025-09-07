"use client";

import { Navbar } from "@/app/(landing)/_components/navbar";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white dark:from-background dark:via-black via-white to-background text-foreground">
      <Navbar />

      <main className="max-w-7xl mx-auto"></main>
    </div>
  );
};
