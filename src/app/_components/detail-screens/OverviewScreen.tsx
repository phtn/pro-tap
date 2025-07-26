import { motion, useAnimation } from "motion/react";
import { Icon } from "@/lib/icons";
import { DetailHeader } from "./sub-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GenericList } from "./types";
import { HyperList } from "@/components/list";

interface OverviewScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const OverviewScreen = (props: OverviewScreenProps) => {
  const [downloading, setDownloading] = useState(false);
  const controls = useAnimation();
  const progress = 65; // The progress percentage

  useEffect(() => {
    // Animate the width of the progress bar to the target percentage
    controls.start(
      { width: `${progress}%` },
      { duration: 1.5, ease: "easeOut" },
    );
  }, [controls, progress]);

  const objectives = useMemo(
    () =>
      [
        {
          id: 0,
          label: "account personalization",
        },
        {
          id: 1,
          label: "seamless contact sharing",
        },
        {
          id: 2,
          label: "secure chat messaging",
        },
        ,
        {
          id: 3,
          label: "merchant account & voucher registry",
        },
      ] as GenericList[],
    [],
  );

  const handleDownload = useCallback(() => setDownloading(true), []);

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <DetailHeader label="Project Overview" {...props} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 space-y-6"
      >
        <div className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-600 rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-sans font-semibold mb-3 text-slate-100">
              ProTap Web App for Desktop & Mobile
            </h3>
            <div
              onClick={handleDownload}
              className="flex cursor-pointer px-2 h-7 items-center rounded-sm bg-teal-200 space-x-2"
            >
              <a
                download
                href="https://app.box.com/s/eww01hpay8absnpx2qxk58knv02a4whr"
                className="font-sans text-sm tracking-tight"
              >
                Proposal PDF
              </a>
              <Icon
                name={downloading ? "spinners-ring" : "px-download"}
                className="size-4"
              />
            </div>
          </div>
          <p className="text-slate-300 my-4">
            A professional contact management application designed to seamlessly
            connect and build relationship for business professionals with the
            use of RFID enabled cards and QR code scanning.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg font-sans -tracking-widest">
              <div className="text-2xl font-bold text-orange-400">6</div>
              <div className="text-gray-600 tracking-tight">Core Features</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg font-sans -tracking-widest">
              <div className="text-2xl font-semibold text-teal-500">
                2 Months
              </div>
              <div className="text-gray-600 tracking-tight">Delivery</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg font-sans -tracking-widest">
              <div className="text-2xl font-bold text-indigo-500">
                <span className="font-space font-normal">₱</span>100,000
              </div>
              <div className="text-gray-600 tracking-tight">Budget</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-700 via-slate-500 to-slate-600 rounded-xl p-6">
          <h3 className="text-xl text-white tracking-tighter font-space font-semibold mb-2">
            Project Status
          </h3>
          <p className="text-green-50 mb-3">Currently in development phase</p>
          <div className="my-3">
            <div className="relative w-full h-10 rounded-full bg-gray-700">
              {/* Glow layer - positioned behind the main bar */}
              <motion.div
                className="absolute w-full top-0 left-0 h-10 rounded-full bg-gradient-to-r from-green-300 to-progress-end z-0"
                style={{ filter: "blur(10px)" }} // Apply blur directly for the glow effect
                initial={{ width: 0 }}
                animate={controls}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              {/* Actual progress bar - on top of the glow */}
              <motion.div
                className="absolute w-full top-0 left-0 h-10 rounded-[18px] bg-gradient-to-r from-green-300 to-progress-end z-10"
                initial={{ width: 0 }}
                animate={controls}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl tracking-tighter font-semibold text-white z-20">
                {progress}%
              </span>
            </div>
          </div>
        </div>
        <div className="bg-slate-300 rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-xl text-foreground tracking-tighter font-space font-semibold">
            Key Objectives
          </h3>
          <HyperList
            data={objectives}
            component={ObjectiveItem}
            container="space-y-2"
          />
        </div>
      </motion.div>
    </div>
  );
};

const ObjectiveItem = ({ label }: GenericList) => (
  <div className="flex items-center capitalize text-gray-700 font-space">
    <Icon name="px-check" className="h-5 text-slate-500 mr-1" />
    {label}
  </div>
);
