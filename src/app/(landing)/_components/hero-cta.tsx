import { SexyButton } from "@/components/experimental/sexy-button-variants";
import { NeumorphButton as Button } from "@/components/ui/neumorph";
import TextAnimate from "@/components/ui/text-animate";
import { Icon } from "@/lib/icons";

export const HeroCTA = () => {
  return (
    <div className="h-full space-y-14 px-6 md:px-0 flex flex-col justify-center">
      <div className="space-y-12">
        <div className="font-bold leading-4">
          <div className="flex items-center justify-start w-64 h-16">
            <Icon name="protap" className="h-48 w-auto" />
          </div>
          <TextAnimate
            text={`Digital Insurance`}
            type="whipInUp"
            className="font-doto text-xl lg:text-2xl font-extrabold tracking-normal text-primary"
          />
        </div>
        <p className="hidden md:flex font-figtree text-lg text-foreground/70 tracking-wide leading-snug max-w-lg text-balance">
          Experience the future of personalized, and feature rich business
          platform.
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
    <SexyButton size="lg" variant="primary" className="rounded-full">
      Get The Card
    </SexyButton>
  );
};

export const ViewButton = () => {
  return (
    <SexyButton
      size="lg"
      variant="default"
      leftIcon="play"
      className="rounded-full"
    >
      Video Intro
    </SexyButton>
  );
};
