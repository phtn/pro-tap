import { Hex } from "@/components/experimental/hex";
import { ProtapCard } from "@/components/experimental/protap-card";

export const VisualContent = () => {
  return (
    <div className="relative h-full flex flex-col justify-center">
      <div className="aspect-square max-w-lg mx-auto relative">
        {/* Main character illustration placeholder */}
        <div className="relative h-full w-full rotate-90 flex items-center justify-center">
          <Hex
            size={320}
            className="absolute blur-sm -bottom-4 skew-x-[30deg] right-2 fill-sky-100/70"
          />
          <Hex size={320} className="fill-cyan-700/70 blur-2xl skew-x-6" />
        </div>
      </div>
      <div className="absolute top-0 size-full flex items-center justify-center">
        <ProtapCard />
      </div>
    </div>
  );
};
