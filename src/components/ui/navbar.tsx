import { NavbarCtxProvider } from "@/ctx/navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, type ReactNode } from "react";
import { LogoPro } from "../logo";

const Nav = ({ children, hideOnMobile }: NavbarProps) => {
  return (
    <nav
      className={cn(
        "h-[8lvh] md:h-[12lvh] flex items-center justify-between py-6 w-full md:max-w-7xl mx-auto",
        { "hidden md:flex": hideOnMobile },
      )}
    >
      <Link href={"/alpha"} className="flex items-center gap-8 lg:px-0 px-6">
        <LogoPro className="h-4 md:h-8 invert opacity-80" />
      </Link>
      <div>{children}</div>
    </nav>
  );
};

interface NavbarProps {
  children?: ReactNode;
  hideOnMobile?: boolean;
}

export const Navbar = memo(
  ({ children, hideOnMobile = false }: NavbarProps) => (
    <NavbarCtxProvider>
      <Nav hideOnMobile={hideOnMobile}>{children}</Nav>
    </NavbarCtxProvider>
  ),
);
