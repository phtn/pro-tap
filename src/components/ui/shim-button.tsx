import { cn } from "@/lib/utils";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import { Icon, type IconName } from "@/lib/icons";
import { HTMLAttributes } from "react";
import { motion } from "motion/react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  icon?: IconName;
}

export const ShimmerButton = ({
  className,
  children,
  icon,
  onClick,
}: Props) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1.6,
        type: "spring",
        visualDuration: 0.45,
        bounce: 0.45,
      }}
      className={cn(
        "h-9 flex items-center justify-center space-x-0.5 bg-zinc-900",
        "border border-zinc-500/80 dark:border-zinc-900",
        "hover:transition-transform hover:duration-300 active:scale-95",
        "ps-3.5 pe-1 rounded-full",
        className,
      )}
    >
      <ShimmerText
        className="ps-0 text-base px-0"
        // text="Activate Protap"
        // playOnHover
        surface="dark"
        variant="chatgpt"
      >
        {children}
      </ShimmerText>
      <Icon name={icon ?? "chevron-right"} className="size-5 text-orange-200" />
    </motion.button>
  );
};
