import { useAuthCtx } from "@/ctx/auth";
import { NavbarCtxProvider } from "@/ctx/navbar";
import { cn } from "@/lib/utils";
import { User } from "firebase/auth";
import Link from "next/link";
import { memo, PropsWithChildren, ReactNode } from "react";
import { ProAvatar } from "./pro-avatar";
import TextAnimate from "./text-animate";
import { Button } from "./button";
import { Icon } from "@/lib/icons";
import { ProfileDropdown } from "../kokonutui/profile-dropdown";

interface NavProps {
  children?: ReactNode;
}
const Nav = ({ children }: NavProps) => {
  const { user } = useAuthCtx();

  return (
    user && (
      <nav
        className={cn(
          "h-[7lvh] md:h-[12lvh] border-b border-zinc-800/0 flex items-center justify-between w-full md:max-w-5xl mx-auto px-4",
        )}
      >
        <Link href={"/account"} className="flex items-center gap-8 lg:px-0">
          <TextAnimate
            text={`Hello ${user.displayName}`}
            type="whipInUp"
            className="tracking-tighter font-figtree font-medium"
          />
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          {children}
          <Button variant="secondary" size="icon" onClick={() => {}}>
            <Icon name="chat" className="size-6" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => {}}>
            <Icon name="bell" className="size-6" />
          </Button>
          <ProfileDropdown>
            <ProAvatar
              photoURL={user.photoURL}
              className=" hover:border-primary border-[1.5px]"
            />
          </ProfileDropdown>
        </div>
      </nav>
    )
  );
};

export const UserNavbar = memo(({ children }: NavProps) => (
  <NavbarCtxProvider>
    <Nav>{children}</Nav>
  </NavbarCtxProvider>
));
