"use client";

import { FullSignIn } from "@/app/sign/_components/full-signin";
import { Navbar } from "@/components/ui/navbar";

export const Content = () => {
  return (
    <div className="h-screen bg-background">
      <Navbar hideOnMobile />
      <main className="max-w-7xl mx-auto h-fit md:pt-10 flex items-start justify-center">
        <FullSignIn />
      </main>
    </div>
  );
};
