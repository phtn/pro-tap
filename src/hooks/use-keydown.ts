import { MouseEvent, useCallback } from "react";
import { useToggle } from "./use-toggle";

type Keys = "j" | "k" | "i" | "'" | ".";

export const useKeyDown = () => {
  const { toggle } = useToggle();

  const onKeyDown = useCallback(
    <T, R extends void>(k?: Keys, action?: (p?: T) => R) =>
      keyListener(keyDown(k, toggle, action)),
    [],
  );

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return { onKeyDown, stopPropagation };
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
