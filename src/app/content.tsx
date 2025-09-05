"use client";

import { DesktopDetails } from "./_components/details";
import { AppViewer } from "./_components/app-viewer";
import { Header } from "./_components/header";
import { Nav } from "./_components/nav";

export const Content = () => {
  return (
    <div className="flex lg:items-start items-center justify-center min-h-screen lg:p-4  bg-zinc-800">
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
