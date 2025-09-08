import { NeumorphButton as Button } from "@/components/ui/neumorph";
import { Icon } from "@/lib/icons";
import { useNavbarCtx } from "@/ctx/navbar";

export const NavChild = () => {
  const { isMobile, toggleTheme } = useNavbarCtx();
  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <Button
        size={isMobile ? "sm" : "lg"}
        intent="outline"
        className="rounded-full md:border-2 border-1"
      >
        Sign up
      </Button>
      <Button
        onClick={toggleTheme}
        size="sq"
        intent="ghost"
        className="rounded-full"
      >
        <Icon name="dark-theme" className="portrait:size-6" />
      </Button>
    </div>
  );
};
