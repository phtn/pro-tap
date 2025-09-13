import { NeumorphButton as Button } from "@/components/ui/neumorph";
import TextAnimate from "@/components/ui/text-animate";
import { Icon } from "@/lib/icons";

export const HeroCTA = () => {
  return (
    <div className="h-full space-y-8 px-6 flex flex-col justify-center">
      <div className="space-y-12">
        <div className="font-bold leading-6">
          <TextAnimate
            text={`Protap`}
            type="popIn"
            className="font-space tracking-normal text-left text-5xl lg:text-6xl"
          />
          <span className="capitalize font-doto text-xl lg:text-2xl font-bold tracking-normal text-primary">
            Digital Insurance
          </span>
        </div>
        <p className="hidden md:flex font-figtree text-lg text-foreground/60 tracking-wide leading-snug max-w-lg text-balance">
          Experience the future of secured, personalized, and feature rich
          insurance services.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <GetButton />
        <ViewButton />
      </div>
    </div>
  );
};

export const GetButton = () => {
  return (
    <Button size="lg" intent="primary" className="rounded-full">
      Get the card
    </Button>
  );
};

export const ViewButton = () => {
  return (
    <Button size="lg" intent="secondary" icon="play" className="rounded-full">
      Video intro
    </Button>
  );
};
