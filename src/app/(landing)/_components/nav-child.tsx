import { getNextTheme } from "@/components/animate-ui/components/buttons/theme-toggler";
import { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { SexyButton } from "@/components/experimental/sexy-button-variants";
import { ProfileDropdown } from "@/components/kokonutui/profile-dropdown";
import { NeumorphButton as Button } from "@/components/ui/neumorph";
import { ProAvatar } from "@/components/ui/pro-avatar";
import { useAuthCtx } from "@/ctx/auth";
import { useNavbarCtx } from "@/ctx/navbar";
import { Icon } from "@/lib/icons";
import Link from "next/link";
import { useCallback } from "react";

export const NavChild = () => {
  const { isMobile, theme, setTheme } = useNavbarCtx();
  const { user } = useAuthCtx();

  const handleThemeChange = useCallback(() => {
    setTheme(getNextTheme(theme as ThemeSelection, ["light", "dark"]));
  }, [theme]);

  return (
    <div className="flex items-center px-4 md:px-0 space-x-2 md:space-x-4">
      {user ? (
        <span className="font-figtree tracking-tight text-sm opacity-80">
          {user.displayName}
        </span>
      ) : (
        <Link href="/sign">
          <SexyButton variant="default" className="rounded-full" size="md">
            Sign in
          </SexyButton>
        </Link>
      )}
      {user ? (
        <ProfileDropdown>
          <ProAvatar
            tiny
            photoURL={user.photoURL}
            className=" hover:border-primary border-[1.5px]"
          />
        </ProfileDropdown>
      ) : (
        <Button
          onClick={handleThemeChange}
          size="sq"
          intent="ghost"
          className="rounded-full flex items-center justify-center size-12 pt-2.5"
        >
          <Icon name="dark-theme" className="size-6" />
        </Button>
      )}
    </div>
  );
};
