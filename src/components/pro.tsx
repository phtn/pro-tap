import { cn } from "@/lib/utils";

export const Pro = () => (
  <div
    className={cn(
      "bg-yellow-400 leading-none px-2.5 py-1",
      "flex items-center justify-center overflow-hidden",
      "rounded-full",
    )}
  >
    <span
      className={cn(
        "font-space text-2xl px-1 mb-1 tracking-tighter leading-none",
        "text-transparent bg-clip-text",
        "bg-gradient-to-r from-indigo-800 via-sky-800 to-cyan-600 ",
        "",
      )}
    >
      pro
    </span>
  </div>
);
