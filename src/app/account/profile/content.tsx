"use client";

import { ProAvatar } from "@/components/ui/pro-avatar";
import Image from "next/image";
import { useAuthCtx } from "@/ctx/auth";
import { SexyButton } from "@/components/experimental/sexy-button";

export const Content = () => {
  const { user } = useAuthCtx();
  return (
    <div className="relative">
      <div className="h-36 mx-4 md:mx-0 md:h-64 lg:h-72 rounded-4xl overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dx0heqhhe/image/upload/v1757754913/personalization_pluy38.webp"
          alt="Logo"
          width={0}
          height={0}
          className="h-full w-auto aspect-auto select-none"
          priority
          unoptimized
        />
      </div>
      <div>
        {user && (
          <div className="absolute border-2 bg-white border-white aspect-square size-20 md:size-28 flex items-center justify-center left-20 -bottom-12 rounded-full shadow-2xl">
            <ProAvatar
              photoURL={user.photoURL}
              className="size-full shrink-0"
            />
          </div>
        )}
      </div>
    </div>
  );
};
