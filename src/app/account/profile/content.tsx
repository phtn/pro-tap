"use client";

import { ProAvatar } from "@/components/ui/pro-avatar";
import Image from "next/image";
import { useAuthCtx } from "@/ctx/auth";
import { SexyButton } from "@/components/experimental/sexy-button-variants";
import TextAnimate from "@/components/ui/text-animate";
import { Icon } from "@/lib/icons";
import { Widget, WidgetHeader } from "@/components/ui/widget";
import { Visual1 } from "@/components/ui/visual-1";
import Link from "next/link";

export const Content = () => {
  const { user } = useAuthCtx();
  return (
    <div className="relative block">
      <div className="relative">
        <div className="h-36 mx-4 md:mx-0 md:h-64 lg:h-72 rounded-4xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dx0heqhhe/image/upload/v1757754913/personalization_pluy38.webp"
            alt="Logo"
            width={0}
            height={0}
            className="aspect-auto w-full select-none"
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
      <div className="h-30" />
      <div className="h-20 px-4">
        <TextAnimate
          type="whipInUp"
          text="Overview"
          className="tracking-tighter text-xl font-bold font-space"
          delay={500}
        />
      </div>
      <div className="grid grid-cols-12 gap-6 h-64">
        <Widget className="col-span-8 h-full overflow-hidden">
          <WidgetHeader
            title="Engagements"
            description="Real-time network connection stats"
          />
          <Visual1 />
        </Widget>
        <div className="col-span-4 h-full place-content-between flex flex-col">
          <Link href="/account/profile/view">
            <SexyButton
              variant="primary"
              className="w-full"
              size="lg"
              leftIcon="eye"
            >
              View Profile
            </SexyButton>
          </Link>
          <Widget className="align-bottom">
            <WidgetHeader
              title="Social Media"
              description="Add social media links to your profile."
            />
            <div className="flex justify-between">
              <SexyButton variant="ghost" badge="add">
                <Icon name="instagram" className="scale-150" />
              </SexyButton>
              <SexyButton variant="ghost" badge="add">
                <Icon name="facebook" className="scale-150" />
              </SexyButton>
              <SexyButton variant="ghost" badge="add">
                <Icon name="x-twitter" className="scale-150" />
              </SexyButton>
              <SexyButton variant="ghost">
                <Icon name="add" className="scale-150" />
              </SexyButton>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

const SampleChart = () => (
  <div className="absolute top-0 left-[-1px] h-full w-[356px]">
    <svg
      className="h-full w-[356px]"
      viewBox="0 0 356 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_25_384)">
        <path
          d="M1 131.5L33.5 125.5L64 102.5L93.5 118.5L124.5 90L154 100.5L183.5 76L207.5 92L244.5 51L274.5 60.5L307.5 46L334.5 28.5L356.5 1"
          // stroke={color}
        />
        <path
          d="M33.5 125.5L1 131.5V197H356.5V1L335 28.5L306.5 46L274.5 60.5L244.5 51L207.5 92L183.5 76L154 100.5L124.5 90L93.5 118.5L64 102.5L33.5 125.5Z"
          // fill={color}
          fillOpacity="0.3"
        />
      </g>
      <defs>
        <clipPath id="clip0_25_384">
          <rect width="356" height="180" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[3] transform bg-gradient-to-r from-transparent from-0% to-white to-15% transition-transform duration-500 group-hover/animated-card:translate-x-full dark:to-black"></div>
  </div>
);
