import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { useToggle } from "./use-toggle";

export type Keys = "j" | "k" | "i" | "'" | ".";

export const useWindow = (
  _open?: boolean,
  setOpen?: Dispatch<SetStateAction<boolean>>,
) => {
  const { on, toggle } = useToggle(_open);
  const toggleWindow = useCallback(() => {
    if (setOpen) setOpen(!_open);
  }, [_open, setOpen]);

  const onKeyDown = useCallback(
    <T, R extends void>(k?: Keys, action?: (p?: T) => R) =>
      keyListener(keyDown(k, setOpen ? toggleWindow : toggle, action)),
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
