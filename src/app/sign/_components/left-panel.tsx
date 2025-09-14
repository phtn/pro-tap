import { Prism } from "@/components/react-bits/prism";
import { TextTrain } from "@/components/ui/text-train";
import { Icon } from "@/lib/icons";

export const LeftPanel = () => {
  return (
    <div className="relative lg:w-1/2 overflow-hidden bg-gradient-to-br from-orange-200/0 via-amber-50/0 to-cyan-100/0 flex flex-col justify-between">
      <div className="absolute size-full animate-in">
        <Prism
          animationType="rotate"
          timeScale={0.2}
          height={4.8}
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
          <Icon name="zap" className="h-6 text-black" />
          <span className="text-xl font-semibold text-black">Protap</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col space-y-4">
          <p className="text-lg opacity-90">You can easily</p>
          <div className="pt-20 space-y-3 flex flex-col justify-center">
            <div className="block w-full">
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
                className="text-sky-950 font-extrabold text-6xl whitespace-nowrap"
              />
            </div>
            <div>
              <TextTrain
                delay={50}
                words={[
                  "your Web Presence.",
                  "Professional Network.",
                  "current Revenue limits.",
                  "your Brand the right way.",
                  "listen to your Masterpiece.",
                  "Become an Inspiration.",
                  "for Status Upgrade.",
                ]}
                className="text-sky-950 text-4xl font-medium max-w-[20ch] tracking-tighter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
