import { Button } from "@/components/ui/button";
import { DetailHeaderProps } from "./types";
import { Icon } from "@/lib/icons";

export const DetailHeader = ({ onNext, onPrev, label }: DetailHeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <Button
      size="icon"
      variant="ghost"
      onClick={onPrev}
      className="rounded-full hover:bg-slate-200"
    >
      <Icon name="px-chevron-right" className="size-6 rotate-180" />
    </Button>
    <h2 className="text-2xl tracking-tight font-space font-semibold">
      {label}
    </h2>
    <Button
      size="icon"
      variant="ghost"
      onClick={onNext}
      className="rounded-full hover:bg-slate-200"
    >
      <Icon name="px-chevron-right" className="size-6" />
    </Button>
  </div>
);
