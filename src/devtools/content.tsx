"use client";
import { VCard } from "@/components/experimental/v-card";
import { useDevtools } from "@/hooks/use-devtools";
import { Icon } from "@/lib/icons";
import { DialogWindow } from "@/components/ui/window";
import { useState } from "react";
import { useToggle } from "@/hooks/use-toggle";

export const Content = () => {
  const { ip, port } = useDevtools();
  // const [open, setOpen] = useState(false);
  const { on, toggle } = useToggle();
  return (
    <DialogWindow keyCode="k" open={on} setOpen={toggle}>
      <VCard
        serverInfo={{ ip, port }}
        toggle={toggle}
        toolbar={
          <>
            <div className="text-xs text-indigo-300 flex items-center space-x-1.5 font-semibold font-figtree px-2 py-0.5 rounded-md bg-zinc-800 dark:bg-zinc-900">
              <span className="size-1.5 rounded-full aspect-square shrink-0 bg-indigo-400" />
              <span>Devtools</span>
            </div>
          </>
        }
      ></VCard>
    </DialogWindow>
  );
};
