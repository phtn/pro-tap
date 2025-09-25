"use client";

import { DesktopDetails } from "./_components/details";
import { AppViewer } from "./_components/app-viewer";
import { Nav } from "./_components/nav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Content = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/alpha");
  }, [router]);

  return (
    <div className="flex lg:items-start items-center justify-center min-h-screen lg:p-4">
      <div className="space-y-4">
        <Nav />
        {/*<Header />*/}
        <div className="flex lg:space-x-8">
          {/* This div simulates the phone screen for presentation */}
          <AppViewer />
          {/* This div shows the details presentation */}
          <DesktopDetails />
        </div>
      </div>
    </div>
  );
};
