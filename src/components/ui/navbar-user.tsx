import { useAuthCtx } from "@/ctx/auth";
import { NavbarCtxProvider } from "@/ctx/navbar";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, type ReactNode, useCallback, useId, useMemo } from "react";
import { ProfileDropdown } from "../kokonutui/profile-dropdown";
import { Button } from "./button";
import { ProAvatar } from "./pro-avatar";
import TextAnimate from "./text-animate";
import { ShimmerButton } from "./shim-button";

interface NavProps {
  children?: ReactNode;
  extra?: ReactNode;
}
interface EssentialButton {
  href: string;
  icon: IconName;
  onClick?: () => void;
}
const Nav = ({ children, extra }: NavProps) => {
  const { user } = useAuthCtx();

  const essentialButtons = useMemo(
    () =>
      [
        {
          href: "/account",
          icon: "hexagon",
          onClick: () => {},
        },
        {
          href: "/chat",
          icon: "chat",
          onClick: () => {},
        },
        {
          href: "/notifications",
          icon: "bell",
          onClick: () => {},
        },
      ] as EssentialButton[],
    [],
  );

  const EssentialButtons = useCallback(
    () =>
      essentialButtons.map((button) => {
        const id = useId();
        return (
          <Link key={id} href={button.href}>
            <Button
              id={id}
              variant="secondary"
              size="icon"
              onClick={button.onClick}
            >
              <Icon name={button.icon} className="size-6" />
            </Button>
          </Link>
        );
      }),
    [],
  );

  return user ? (
    <nav
      className={cn(
        "h-[8lvh] md:h-[12lvh] border-b border-zinc-800/0 flex items-center justify-between w-full md:max-w-6xl mx-auto px-4",
      )}
    >
      <div className="flex items-center space-x-5">
        <Link href={"/account"} className="flex items-center gap-8 lg:px-0">
          <TextAnimate
            text={`${user.displayName}`}
            type="whipInUp"
            className="tracking-tighter font-figtree font-medium text-xl md:text-3xl"
          />
        </Link>
        {children}
      </div>
      <div className="h-12 flex items-center space-x-2 md:space-x-4">
        {extra}
        <EssentialButtons />
        <ProfileDropdown>
          <ProAvatar
            photoURL={user.photoURL}
            className=" hover:border-primary border-[1.5px]"
            tiny
          />
        </ProfileDropdown>
      </div>
    </nav>
  ) : (
    <div className={cn("h-[7lvh] md:h-[12lvh] md:max-w-5xl mx-auto px-4")} />
  );
};

export const UserNavbar = memo(({ children }: NavProps) => (
  <NavbarCtxProvider>
    <Nav>{children}</Nav>
  </NavbarCtxProvider>
));
