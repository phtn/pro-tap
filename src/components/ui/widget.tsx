import { type ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface WidgetProps {
  children?: ReactNode;
  className?: ClassName;
}
export const Widget = ({ className, children }: WidgetProps) => {
  return (
    <div
      className={cn(
        "space-y-8 h-fit p-5 font-figtree font-semibold bg-white dark:bg-zinc-800/95 backdrop-blur-sm border-[0.33px] border-zinc-300 dark:border-zinc-800/60 rounded-3xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface WidgetHeaderProps {
  title: string;
  description: string;
}
export const WidgetHeader = ({ title, description }: WidgetHeaderProps) => {
  return (
    <div>
      <h2 className="font-bold tracking-tight text-lg">{title}</h2>
      <p className="font-normal text-foreground/50">{description}</p>
    </div>
  );
};
