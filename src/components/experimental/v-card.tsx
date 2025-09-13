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

interface Props {
  children?: ReactNode;
  toolbar?: ReactNode;
  toggle?: VoidFunction;
  className?: ClassName;
  footer?: ReactNode;
}

export function VCard({ children, className, toolbar, toggle, footer }: Props) {
  return (
    <div className={cn("flex items-center justify-center")}>
      <div className="bg-zinc-800/60 px-0.5 pb-0.5 backdrop-blur-2xl h-full">
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
        <TextureCardStyled>
          <TextureCardContent className="min-w-sm p-1">
            {children}
          </TextureCardContent>
          <TextureCardFooter className={cn({ hidden: !footer })}>
            {footer}
          </TextureCardFooter>
        </TextureCardStyled>
      </div>
    </div>
  );
}

export interface FooterProps<T> {
  meta: T;
}
