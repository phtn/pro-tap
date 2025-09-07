import { MouseEvent, useCallback, useMemo } from "react";
import { useToggle } from "./use-toggle";

const keys = {
  /** dev */
  k: "dev",
  /**
   *
   * theme
   */
  i: "i",
  ".": ".",
  "/": "/",
} as const;

export type Keys = keyof typeof keys;

export const useWindow = (_open = false, setOpen: VoidFunction) => {
  const { on, toggle } = useToggle(_open);
  const onKeyDown = useCallback(
    <T, R extends void>(k?: Keys, action?: (p?: T) => R) =>
      keyListener(keyDown(k, toggle, action)),
    [],
  );

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const open = useMemo(() => _open || on, [_open, on]);

  return { onKeyDown, stopPropagation, keyListener, open };
};

const keyDown =
  <T, R extends void>(
    k: Keys | undefined,
    toggle: VoidFunction,
    action?: (p?: T) => R,
  ) =>
  (e: KeyboardEvent) => {
    if (k && e.key === k && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      toggle();
      if (typeof action !== "undefined") {
        action();
      }
    }
  };

const keyListener = (keydownFn: (e: KeyboardEvent) => void) => {
  return {
    add: () => document.addEventListener("keydown", keydownFn),
    remove: () => document.removeEventListener("keydown", keydownFn),
  };
};
