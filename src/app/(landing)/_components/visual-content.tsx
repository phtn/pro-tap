import { Hex } from "@/components/experimental/hex";
import { ProtapCard } from "@/components/experimental/protap-card";

export const VisualContent = () => {
  return (
    <div className="relative h-full flex flex-col justify-center">
      <div className="aspect-square max-w-lg mx-auto relative">
        {/* Main character illustration placeholder */}
        <div className="relative h-full w-full rotate-90 flex items-center justify-center">
          <Hex
            size={400}
            className="absolute blur-sm -bottom-4 skew-x-12 right-2 fill-sky-100 opacity-100"
          />
          <Hex size={320} className="fill-cyan-700 blur-2xl" />
        </div>
      </div>
      <div className="absolute top-0 size-full flex items-center justify-center">
        <ProtapCard />
      </div>
    </div>
  );
};
