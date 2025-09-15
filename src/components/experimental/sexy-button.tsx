import { type ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface SexyButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: ClassName;
}

export const SexyButton = ({
  children,
  className,
  ...props
}: SexyButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "relative h-12 w-32 px-4 inline-flex items-center justify-center",
        // "bg-gradient-to-r from-white via-white to-slate-100/60 dark:from-zinc-700 dark:via-zinc-700 dark:to-zinc-700 ",
        "bg-gradient-to-r",
        // "from-[#e3e3e3] via-[#e5e5e5] to-[#e7e7e7]",
        "from-white/50 via-white/70 to-white",
        "dark:from-zinc-700 dark:via-zinc-700 dark:to-zinc-700",
        "rounded-[11.5px] border-[0.5px] py-4 border-[#bbbbbb] dark:border-zinc-500/5 dark:hover:border-zinc-600/80  hover:border-[#cccccc]",
        "hover:text-foreground md:dark:hover:text-zinc-100",
        "text-base text-secondary-foreground/80 font-figtree font-semibold tracking-tight",
        "backdrop-blur-xs shadow-sm hover:shadow-sm overflow-hidden",
        "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap cursor-pointer",
        "ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2  dark:focus-visible:ring-zinc-300",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "active:scale-96 active:shadow-xs transition-all duration-300",
        "",
        "inset-shadow-[0_1px_rgb(237_237_237)]",
        "dark:inset-shadow-[0_1px_rgb(120_120_120)] dark:hover:dark:inset-shadow-[0_1px_rgb(120_120_120)]",
        // "#ededed",
        "scale-100",
        className,
      )}
    >
      <div className="pointer-events-none relative z-50 ">{children}</div>
      <div
        className={cn(
          "absolute h-full w-full bg-gradient-to-r",
          "opacity-0 inset-0 rounded-[10px] ",
          "from-white/70 via-white/50 to-white/30",
          "dark:from-zinc-800/50 dark:via-zinc-800/70 dark:to-zinc-800/90",
          "hover:opacity-100 transition duration-400",
        )}
      />
    </button>
  );
};

const GradientTransitions = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Original Design
      </h2>
      <button className="bg-size-200 bg-pos-0 hover:bg-pos-100 m-2 rounded-xl bg-gradient-to-t from-red-500 via-black to-white p-10 text-white transition-all duration-500 font-semibold">
        Hover me
      </button>

      <button className="relative bg-gradient-to-b from-gray-200 to-gray-500 w-40 h-20 rounded-xl">
        <div className="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-b from-gray-400 to-gray-900"></div>
      </button>

      {/*Variations using the custom utilities */}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Variations</h2>

        {/*Horizontal gradient */}
        <button className="bg-size-200 bg-pos-0 hover:bg-pos-100 m-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white transition-all duration-700 font-semibold">
          Horizontal Slide
        </button>

        {/*Slower transition */}
        <button className="bg-size-300 bg-pos-0 hover:bg-pos-100 m-2 rounded-xl bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 p-6 text-white transition-all duration-1000 font-semibold">
          Slow & Wide
        </button>

        {/*Different starting position */}
        <button className="bg-size-200 bg-pos-50 hover:bg-pos-0 m-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white transition-all duration-500 font-semibold">
          Reverse Direction
        </button>
      </div>
    </div>
  );
};
