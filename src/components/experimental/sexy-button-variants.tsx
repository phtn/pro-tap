import { cn } from "@/lib/utils";
import { type ClassName } from "@/app/types";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon, type IconName } from "@/lib/icons";

type SexyButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "ghost"
  | "invert";
type SexyButtonSize = "sm" | "md" | "lg";

interface SexyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: ClassName;
  variant?: SexyButtonVariant;
  size?: SexyButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  badge?: IconName | ReactNode;
}

const base =
  "relative inline-flex items-center justify-center font-figtree font-semibold tracking-tight rounded-[11.5px] border-[0.5px] overflow-visible whitespace-nowrap cursor-pointer " +
  "ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-300 " +
  "backdrop-blur-xs shadow-sm hover:shadow-sm transition-all duration-300 active:scale-96 active:shadow-xs " +
  "inset-shadow-[0_1px_rgb(237_237_237)] dark:inset-shadow-[0_1px_rgb(100_100_100)]" +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 group";

const variantClasses: Record<SexyButtonVariant, string> = {
  default: cn(
    "bg-gradient-to-r from-white/50 via-white/70 to-white",
    "hover:from-slate-200/90 hover:via-slate-300 hover:to-slate-300",
    "dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-800",
    "dark:hover:from-zinc-800/20 dark:hover:via-zinc-700/50 dark:hover:to-zinc-700",
    "border-zinc-400 dark:border-zinc-800/80 hover:border-zinc-500 dark:hover:border-zinc-800/90",
    "text-secondary-foreground/80 hover:text-foreground md:dark:hover:text-zinc-100",
    "dark:inset-shadow-[0_1px_rgb(237_237_237)]/20",
  ),
  invert: cn(
    "bg-gradient-to-r from-foreground via-foreground/90 to-foreground/90",
    "dark:from-teal-500/90 dark:via-teal-500/90 dark:to-teal-500",
    "dark:hover:from-teal-400/90 dark:hover:via-teal-400/90 dark:hover:to-teal-400",
    "border-[0.33px] border-foreground/20 hover:border-foreground/70",
    "dark:border-teal-700 dark:hover:border-teal-600",
    "text-background hover:text-background md:dark:hover:text-white",
    "dark:text-white/90 dark:hover:text-white",
    "inset-shadow-[0_1px_rgb(237_237_237)]/30",
    "dark:inset-shadow-[0_1px_rgb(237_237_237)]/50",
  ),
  primary: cn(
    "bg-gradient-to-r from-primary-hover via-primary-hover to-primary-hover",
    "text-white hover:text-white",
    "border-primary hover:border-sky-200/80",
    "dark:from-primary-hover dark:via-primary-hover dark:to-primary-hover",
    "dark:border-primary/60 dark:hover:border-primary-hover/40",
    "inset-shadow-[0_1px_rgb(237_237_237)]/20",
    "dark:inset-shadow-[0_1px_rgb(237_237_237)]/50",
  ),
  secondary: cn(
    "bg-gradient-to-r from-zinc-200 via-zinc-100 to-white",
    "dark:from-zinc-300/90 dark:via-zinc-400 dark:to-zinc-400",
    "text-foreground/80 hover:text-foreground",
    "dark:text-zinc-700 dark:hover:text-zinc-700",
    "border-zinc-300/70 hover:border-zinc-400/80",
    "dark:border-zinc-600/40 dark:hover:border-zinc-500/80",
  ),
  ghost: cn(
    "bg-transparent",
    "text-foreground/80 hover:text-foreground",
    "border-transparent hover:border-zinc-600/60",
    "hover:bg-zinc-100/50 dark:hover:bg-zinc-600/50",
    "inset-shadow-[0_1px_rgb(237_237_237)]/50",
    "dark:inset-shadow-[0_1px_rgb(100_100_100)]/40",
  ),
};

const sizeClasses: Record<SexyButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-[10px] [&_svg]:size-4 gap-1.5",
  md: "h-10 md:h-12 px-4 text-base [&_svg]:size-4 gap-2",
  lg: "h-12 md:h-14 px-6 text-lg [&_svg]:size-5 gap-2.5",
};

export const SexyButton = forwardRef<HTMLButtonElement, SexyButtonProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      badge,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
        className={cn(
          base,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className,
        )}
      >
        {/* Overlay shimmer layer */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full rounded-[10px] opacity-0 transition duration-400",
            "bg-gradient-to-r from-white/70 via-white/50 to-white/30",
            "dark:from-zinc-800/50 dark:via-zinc-800/70 dark:to-zinc-800/90",
            "hover:opacity-100",
          )}
        />

        {/* Badge */}
        {badge && (
          <div className="absolute -right-2 -top-2 z-50 flex size-5 items-center justify-center rounded-full bg-primary-hover dark:bg-primary text-xs font-medium">
            {(badge as IconName) ? (
              <Icon
                name={badge as IconName}
                className="scale-85 text-white drop-shadow-xs"
                strokeWidth={2}
              />
            ) : (
              badge
            )}
          </div>
        )}

        {/* Content */}
        <span className="relative z-50 inline-flex items-center dark:drop-shadow-xs">
          {isLoading ? (
            <>
              <Spinner />
              <span className="sr-only">Loading</span>
            </>
          ) : (
            <>
              {leftIcon ? (
                <Icon name={leftIcon} className="mr-1.5 -ml-0.5" />
              ) : null}
              <span>{children}</span>
              {rightIcon ? (
                <Icon name={rightIcon} className="ml-1.5 -mr-0.5" />
              ) : null}
            </>
          )}
        </span>
      </button>
    );
  },
);

SexyButton.displayName = "SexyButton";

function Spinner() {
  return (
    <svg
      className="mr-2 h-4 w-4 animate-spin text-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export type { SexyButtonProps, SexyButtonVariant, SexyButtonSize };
