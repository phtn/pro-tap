import { getNextTheme } from "@/components/animate-ui/components/buttons/theme-toggler";
import { ThemeSelection } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { NeumorphButton as Button } from "@/components/ui/neumorph";
import { useNavbarCtx } from "@/ctx/navbar";
import { Icon } from "@/lib/icons";
import Link from "next/link";
import { useCallback } from "react";

export const NavChild = () => {
  const { isMobile, theme, setTheme } = useNavbarCtx();

  const handleThemeChange = useCallback(() => {
    setTheme(getNextTheme(theme as ThemeSelection, ["light", "dark"]));
  }, [theme]);

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <Link href="/sign">
        <Button
          size={isMobile ? "sm" : "lg"}
          intent="outline"
          className="rounded-full md:border-2 border-1"
        >
          Sign up
        </Button>
      </Link>
      <Button
        onClick={handleThemeChange}
        size="sq"
        intent="ghost"
        className="rounded-full"
      >
        <Icon name="dark-theme" className="portrait:size-6" />
      </Button>
    </div>
  );
};
