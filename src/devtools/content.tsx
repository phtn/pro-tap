"use client";
import { VCard } from "@/components/experimental/v-card";
import { useDevtools } from "@/hooks/use-devtools";
import { Icon } from "@/lib/icons";
import { DialogWindow } from "@/components/ui/window";

export const Content = () => {
  const { ip, port } = useDevtools();
  return (
    <DialogWindow keyCode={"i"}>
      <VCard serverInfo={{ ip, port }}>
        <div className="h-12 px-4 flex items-center justify-between">
          <div className="text-xs text-indigo-300 flex items-center space-x-1.5 font-semibold font-figtree px-2 py-0.5 rounded-md bg-zinc-800 dark:bg-zinc-900">
            <span className="size-1.5 rounded-full aspect-square shrink-0 bg-indigo-400" />
            <span>Devtools</span>
          </div>
          <button>
            <Icon name="close" className="size-4 text-zinc-200" />
          </button>
        </div>
      </VCard>
    </DialogWindow>
  );
};
