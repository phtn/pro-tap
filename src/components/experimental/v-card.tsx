"use client";

import { ClassName } from "@/app/types";
import { TextureButton } from "@/components/ui/texture-button";
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ServerInfo {
  ip: string | null;
  port: string | null;
}

interface Props {
  children?: ReactNode;
  serverInfo?: ServerInfo;
  toolbar?: ReactNode;
  toggle?: VoidFunction;
  className?: ClassName;
  footer?: ReactNode;
}

export function VCard({ children, className, toolbar, toggle, footer }: Props) {
  return (
    <div className={cn("flex items-center justify-center")}>
      <div className="bg-zinc-800/60 px-1 pb-1 backdrop-blur-2xl h-full rounded-md">
        <div
          className={cn(
            "h-12 px-4 flex items-center justify-between",
            className,
          )}
        >
          {toolbar}
          {toggle && (
            <button className="" onClick={toggle}>
              <Icon name="close" className="size-4 text-zinc-200" />
            </button>
          )}
        </div>
        <div className=" items-start justify-center gap-6 rounded-xl grid grid-cols-1 ">
          <div className="col-span-1 grid items-start gap-4 lg:col-span-1">
            <TextureCardStyled>
              <TextureCardContent className="min-w-sm p-2">
                {children}
              </TextureCardContent>
              <TextureCardFooter className={cn({ hidden: !footer })}>
                {footer}
              </TextureCardFooter>
            </TextureCardStyled>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FooterProps {
  serverInfo: { ip: string; port: string };
}

const Footer = ({ serverInfo }: FooterProps) => {
  return (
    <div className="dark:bg-neutral-800 bg-stone-800 pt-px rounded-b-[24px] overflow-hidden">
      <TextureSeparator className="border-t-neutral-600 border-b-neutral-900/5" />
      <div className="flex flex-col items-center justify-center ">
        <div className="py-2 px-5 w-full">
          <div className="w-full flex items-center justify-between text-xs tracking-wide font-light font-mono text-teal-400">
            <div className="flex items-center space-x-1.5">
              <Icon name="reactjs" className="size-4 text-[#58c4dc]" />
              <Icon name="typescript" className="size-4 text-[#3078c6]" />
              <Icon name="nextjs" className="size-4" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="dark:bg-background/40 px-2 py-1 rounded-lg">
                {serverInfo?.ip}:{serverInfo?.port}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
