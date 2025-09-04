import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

interface AboutScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const AboutScreen = ({ onNext, onPrev }: AboutScreenProps) => {
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
        <div className="text-white/60 text-sm">About</div>
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
      <div className="flex-1 bg-black text-white p-6 pt-20 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Icon name="zap" className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">ProTap</h2>
            <p className="text-gray-400">Professional Contact Management</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <div className="text-sm text-gray-400">
              <p>Version 1.0.0</p>
              <p>© 2025 ProTap Inc.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-3 w-full max-w-xs"
          >
            <Button
              size="lg"
              variant="secondary"
              className="w-full font-space hover:text-white hover:bg-gray-400/40"
            >
              Privacy Policy
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full font-space hover:text-white hover:bg-gray-400/40"
            >
              Terms of Service
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full font-space hover:text-white hover:bg-gray-400/40"
            >
              Support
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full bg-teal-300 font-space hover:text-white hover:bg-gray-400/40"
            >
              <a
                download
                href="https://app.box.com/s/eww01hpay8absnpx2qxk58knv02a4whr"
                className="font-sans text-sm tracking-tight"
              >
                Download Proposal
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
