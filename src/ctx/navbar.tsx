"use client";

import { useMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { createContext, useMemo, useContext, type ReactNode } from "react";

interface NavbarProviderProps {
  children: ReactNode;
}

interface NavbarCtxValues {
  isMobile: boolean;
  toggleTheme: VoidFunction;
}

const NavbarCtx = createContext<NavbarCtxValues | null>(null);

const NavbarCtxProvider = ({ children }: NavbarProviderProps) => {
  const isMobile = useMobile();
  const { setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const value = useMemo(
    () => ({
      isMobile,
      toggleTheme,
    }),
    [isMobile, toggleTheme],
  );
  return <NavbarCtx value={value}>{children}</NavbarCtx>;
};

const useNavbarCtx = () => {
  const ctx = useContext(NavbarCtx);
  if (!ctx) throw new Error("NavbarCtxProvider is missing");
  return ctx;
};

export { NavbarCtx, NavbarCtxProvider, useNavbarCtx };
