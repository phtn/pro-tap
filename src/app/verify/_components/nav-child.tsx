import { NeumorphButton as Button } from "@/components/ui/neumorph";
import { useNavbarCtx } from "@/ctx/navbar";
import { AnimatePresence, motion } from "motion/react";

export const NavChild = () => {
  const { isMobile, toggleTheme } = useNavbarCtx();
  return (
    <div className="flex items-center space-x-4">
      <NtagCode />
      <Button
        onClick={toggleTheme}
        size="sq"
        intent="ghost"
        className="rounded-full"
        icon="dark-theme"
      ></Button>
    </div>
  );
};

const NtagCode = () => {
  return (
    <div className="w-96 flex items-center justify-end overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key="expanded"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="capitalize font-doto text-xl lg:text-2xl font-bold tracking-widest whitespace-nowrap"
        >
          {Date.now().toString(36).toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
