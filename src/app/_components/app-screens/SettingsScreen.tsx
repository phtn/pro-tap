import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { LinkItem } from "@/app/types";

interface SettingsScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const SettingsScreen = ({ onNext, onPrev }: SettingsScreenProps) => {
  const settings = [
    { label: "Notifications", icon: "bell", enabled: true },
    { label: "Dark Mode", icon: "dark-theme", enabled: true },
    { label: "Location", icon: "pin-location", enabled: true },
    { label: "Hide Lastname", icon: "lock", enabled: true },
    { label: "chat", icon: "chat", enabled: true },
    { label: "privacy", icon: "privacy", enabled: true },
  ] as LinkItem[];

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={onPrev}
          className="rounded-full bg-white/20 text-white hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon
            name="chevron-right"
            className="size-6 aspect-square rotate-180"
          />
        </Button>
        <div className="text-white/60 text-sm">Settings</div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onNext}
          className="rounded-full bg-white/20 text-white/80 hover:bg-primary/20 hover:text-yellow-50"
        >
          <Icon name="chevron-right" className="size-6 aspect-square" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-black text-white p-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold font-space tracking-tight mb-6">
            Settings
          </h2>

          <div className="rounded-lg overflow-hidden border-0 border-slate-500/30">
            {settings.map((setting, index) => (
              <motion.div
                key={setting.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-[4.5rem] flex border-b last:border-b-0 border-slate-500/30 items-center justify-between p-4"
              >
                <div className="flex items-center space-x-3 capitalize">
                  <Icon name={setting.icon} className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{setting.label}</span>
                </div>
                <div
                  className={`w-12 h-7 flex items-center rounded-full transition-colors ${
                    setting.enabled ? "bg-teal-500" : "bg-slate-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform drop-shadow-sm ${
                      setting.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-4 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-600 rounded-lg"
          >
            <h3 className="text-xl font-semibold font-space tracking-tight mb-2">
              Account
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              Manage your account settings and preferences
            </p>
            <Button
              size="xl"
              variant="secondary"
              className="w-full bg-foreground font-space hover:text-orange-300 border-gray-600 text-white hover:bg-black"
            >
              Sign Out
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
