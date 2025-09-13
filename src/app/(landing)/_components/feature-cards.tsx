import { Expansive } from "@/components/experimental/expansive";
import { BentoCard } from "@/components/kokonutui/bento-grid";
import { Card } from "@/components/ui/card";

import {
  AnimatedCard,
  CardBody,
  CardDescription,
  CardTitle,
  CardVisual,
} from "@/components/ui/animated-card";
import { Visual2 } from "@/components/ui/visual-2";

import { TextureButton } from "@/components/ui/texture-button";
import {
  TextureCardStyled as TextureCard,
  TextureCardContent,
  TextureCardHeader,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { metadata } from "motion/react-client";
import { Visual1 } from "@/components/ui/visual-1";

export const FeatureCards = () => {
  return (
    <div className="relative z-100 lg:h-[38lvh] py-20 lg:py-0 h-fit space-y-10 lg:space-y-0 gap-x-8 flex-grow overflow-auto flex-col lg:flex-row flex items-center justify-evenly md:justify-between w-full">
      {/*<BasicCard title="Account Personalization" />*/}
      <AnimatedFeatureCard title="Account Personalization">
        <Visual2 mainColor="#ff6900" secondaryColor="#f54900" />
      </AnimatedFeatureCard>
      <AnimatedFeatureCard title="Account Personalization">
        <Visual1 mainColor="#ff6900" secondaryColor="#f54900" />
      </AnimatedFeatureCard>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <TextureCard radius={28}>
      <TextureCardHeader className="flex items-center justify-between px-6 ">
        <div />
        <TextureButton variant="icon" className="aspect-square">
          <Icon name="arrow-up" className="rotate-45" />
        </TextureButton>
      </TextureCardHeader>

      <TextureCardContent className="p-6 w-1/3">
        <span className="w-full">{description}</span>
      </TextureCardContent>
      <TextureSeparator />

      <div>
        <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
          <div className="flex flex-col items-center justify-center">
            <div className="py-2 px-4">
              <p className="font-light dark:text-white text-black">
                Personalized{" "}
                <span className="font-medium tracking-wide">Page</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </TextureCard>
  );
};

export function AnimatedFeatureCard({
  title,
  description,
  children,
}: FeatureCardProps) {
  return (
    <AnimatedCard>
      <CardVisual>{children}</CardVisual>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          This card will tell everything you want
        </CardDescription>
      </CardBody>
    </AnimatedCard>
  );
}
const BasicCard = ({ title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6 bg-foreground text-background border-border">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-primary rounded-sm"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};
