import { Card } from "@/components/ui/card";
import {
  TextureCardStyled as TextureCard,
  TextureCardContent,
  TextureCardHeader,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { Icon } from "@/lib/icons";

export const FeatureCards = () => {
  return (
    <div className="mt-20">
      <FeatureCard
        title="Personalized Page"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum eos
                quia incidunt perspiciatis, ut, deleniti fugit a aliquam sequi,
                voluptatum pariatur quaerat. Temporibus sed facere at, voluptas
                dolorem officiis incidunt!"
      />
      <BasicCard
        title="Personalized Page"
        description="Drag-n-drop the prebuilt templates into your design and finish it in minutes"
      />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description?: string;
}
const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <TextureCard>
      <TextureCardHeader className="flex flex-col gap-4 justify-center items-center  ">
        <div className="p-3 bg-neutral-950 rounded-full">
          <Icon name="user-profile" className="h-4 w-4 stroke-neutral-200" />
        </div>
        {title}
      </TextureCardHeader>

      <TextureCardContent className=" w-48 ">
        <p>{description}</p>
      </TextureCardContent>
      <TextureSeparator />

      <div>
        <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
          <div className="flex flex-col items-center justify-center">
            <div className="py-2 px-2">
              <p className="font-light dark:text-white text-black">
                Texture <span className="font-medium tracking-wide">card</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </TextureCard>
  );
};

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
