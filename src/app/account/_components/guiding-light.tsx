import { Prism } from "@/components/react-bits/prism";
export const GuidingLight = () => {
  return (
    <div className="absolute pointer-events-none opacity-20 bottom-0 size-full overflow-hidden">
      <Prism
        animationType="3drotate"
        timeScale={0.005}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0.3}
        colorFrequency={0.88}
        noise={0.05}
        glow={1}
      />

      <div className="top-0 left-0 size-full absolute bg-background/40 backdrop-blur-3xl"></div>
    </div>
  );
};
