"use client";

import { useWindow, type Keys } from "@/hooks/use-window";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

interface DialogWindowProps {
  keyCode: Keys;
  action?: <T, R>(p: T) => R;
  value?: string;
  title?: ReactNode;
  children?: ReactNode;
  open: boolean;
  setOpen: VoidFunction;
  // action?: <T, R>(p: T) => R;
}
export const DialogWindow = (props: DialogWindowProps) => {
  const { keyCode, action, children, open: _open, setOpen } = props;

  const { open, onKeyDown, stopPropagation } = useWindow(_open, setOpen);

  const { add, remove } = onKeyDown(keyCode, action);

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("fixed z-200 inset-0 flex items-center justify-center")}
        >
          <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.95, opacity: 0, borderRadius: 112 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 28 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            className={cn("z-50 w-fit overflow-hidden shadow-xl", "")}
            onClick={stopPropagation}
          >
            <WindowContent>{children}</WindowContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WindowContent = ({ children }: PropsWithChildren) => (
  <div className={cn("relative overflow-hidden")}>{children}</div>
);
