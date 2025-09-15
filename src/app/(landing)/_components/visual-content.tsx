import { Hex } from "@/components/experimental/hex";
import { ProtapCard } from "@/components/experimental/protap-card";
import { useToggle } from "@/hooks/use-toggle";
import { cn } from "@/lib/utils";

export const VisualContent = () => {
  const { on, toggle } = useToggle();
  return (
    <div className="relative h-full flex flex-col justify-center overflow-visible ">
      <div className="aspect-square max-w-xl mx-auto relative">
        {/* Main character illustration placeholder */}
        <div className="relative h-full w-full rotate-90 flex items-center justify-center">
          <Hex
            size={320}
            className={cn(
              "absolute blur-sm -bottom-4 dark:skew-x-[45deg] -skew-x-[50deg] right-2 dark:fill-sky-100/70 fill-foreground",
              "transition-all duration-700 delay-0",
              { "-skew-x-[35deg] -translate-y-6": on },
            )}
          />
          <Hex
            size={240}
            className="fill-primary-hover rounded-full blur-2xl skew-x-6"
          />
        </div>
      </div>
      <div
        onClick={toggle}
        className="absolute top-0 size-full flex items-center justify-center"
      >
        <ProtapCard />
      </div>
    </div>
  );
};
