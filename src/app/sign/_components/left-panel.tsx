import { LogoPro } from "@/components/logo";
import { Prism } from "@/components/react-bits/prism";
import { TextTrain } from "@/components/ui/text-train";
import { useMobile } from "@/hooks/use-mobile";

export const LeftPanel = () => {
  const isMobile = useMobile();
  return (
    <div className="relative lg:w-1/2 overflow-hidden bg-gradient-to-br from-orange-200/0 via-amber-50/0 to-cyan-100/0 flex flex-col justify-between">
      <div className="absolute size-full animate-in md:opacity-100 opacity-30">
        <Prism
          animationType="3drotate"
          timeScale={0.2}
          height={isMobile ? 4.8 : 4.8}
          baseWidth={5.0}
          scale={3.6}
          hueShift={0.1}
          colorFrequency={1}
          noise={0.1}
          glow={1}
        />
      </div>
      <div className="p-12 relative z-50">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 text-white">
          <LogoPro className="h-4 md:invert md:opacity-30 opacity-50" />
          {/*<span className="text-xl font-semibold text-black">Protap</span>*/}
        </div>

        {/* Main Content */}
        <div className="flex flex-col space-y-6">
          <div className="pt-12 md:pt-20 space-y-1 md:space-y-3 flex flex-col justify-center items-center">
            <div className="block">
              <TextTrain
                words={[
                  "Level up",
                  "Grow your",
                  "Break thru your",
                  "Start building",
                  "Make the world",
                  "Become famous",
                  "It's your turn",
                ]}
                className="text-sky-950 md:dark:text-sky-950 dark:text-sky-50 font-semibold md:font-extrabold text-3xl tracking-tighter md:text-6xl whitespace-nowrap md:tracking-normal"
              />
            </div>
            <div>
              <TextTrain
                delay={50}
                words={[
                  "your Web Presence.",
                  "Professional Network.",
                  "current Revenue limits.",
                  "your brand the right way.",
                  "listen to your Masterpiece.",
                  "Become an Inspiration.",
                  "for Status Upgrade.",
                ]}
                className="text-sky-950 md:dark:text-sky-950 dark:text-sky-50/80 text-xl md:text-4xl font-space font-medium max-w-[20ch] tracking-tighter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
