import { ClassName } from "@/app/types";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable";
import { QuickActions } from "@/components/ui/quick-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import TextAnimate from "@/components/ui/text-animate";
import { memo, ReactNode, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import Link from "next/link";
import { useMeta } from "@/hooks/use-meta";

const COLLAPSED_SIZE = Object.freeze({ width: 320, height: 0 });
const EXPANDED_SIZE = Object.freeze({ width: 540, height: 100 });

interface ExpansiveProps {
  title?: string;
  children?: ReactNode;
}

export const Expansive = memo(function ExpandableComponent({
  title,
  children,
}: ExpansiveProps) {
  const [loading] = useState(false);
  const handleExpandStart = useCallback(() => {
    console.log("Expanding meeting card...");
  }, []);
  const handleExpandEnd = useCallback(() => {
    console.log("Meeting card expanded!");
  }, []);

  const { scrollAreaRef } = useMeta("/api/meta", {});

  return (
    <Expandable
      expandDirection="both"
      expandBehavior="push"
      initialDelay={0.2}
      onExpandStart={handleExpandStart}
      onExpandEnd={handleExpandEnd}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="relative"
            collapsedSize={COLLAPSED_SIZE}
            expandedSize={EXPANDED_SIZE}
            hoverToExpand={false}
            expandDelay={50}
            collapseDelay={300}
          >
            <ExpandableCardHeader>
              <div
                className={cn(
                  "flex justify-between items-start w-full text-foreground",
                  "mx-auto max-w-[220px] transition-transform duration-300",
                  { " max-w-[540px]": isExpanded },
                )}
              >
                <HeaderTitle title={title} />
                <div className="flex items-center md:space-x-8 space-x-4">
                  <StatMini
                    label={loading ? "loading" : "Count"}
                    value={
                      loading ? (
                        <Icon
                          name="spinners-ring"
                          className="size-5 m-1 shrink-0 text-indigo-400"
                        />
                      ) : (
                        <TextAnimate text="100" />
                      )
                    }
                    className={cn("text-teal-600 hidden", {
                      flex: isExpanded,
                      "text-indigo-400": loading,
                    })}
                  />
                  <StatMini
                    label={loading ? "loading" : "Status"}
                    value={
                      loading ? (
                        <Icon
                          name="spinners-ring"
                          className="size-5 m-1 shrink-0 text-neutral-700"
                        />
                      ) : (
                        <TextAnimate text="OK" />
                      )
                    }
                  />
                </div>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex flex-col items-start justify-between">
                <div
                  className={cn(
                    "flex max-w-[218px] overflow-auto mx-auto items-center text-sm text-foreground",
                    {
                      hidden: isExpanded,
                    },
                  )}
                >
                  <Carousel plugins={[Autoplay({ delay: 2500 })]} className="">
                    <CarouselContent className="w-[235px] flex justify-start">
                      {[1, 2].map((icon) => (
                        <CarouselItem
                          key={icon}
                          className="md:basis-1/5 flex items-center justify-center"
                          title={String(icon)}
                        >
                          <div
                            key={icon}
                            className={cn(
                              "size-8 text-foreground/60 rounded-sm shadow-xs flex items-center justify-center hover:bg-foreground/10",
                            )}
                            title={String(icon)}
                          >
                            <span>{icon}</span>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <ExpandableContent preset="blur-md">
                  <ScrollArea
                    ref={scrollAreaRef}
                    className={cn("w-full max-h-0 overflow-auto font-space", {
                      "h-[80px] max-h-[80px]": isExpanded,
                    })}
                  >
                    <ExpandableTrigger>
                      <div className="grid grid-cols-8 gap-3">
                        {[1, 2].map((icon) => (
                          <div
                            key={icon}
                            className={cn(
                              "size-12 flex items-center justify-center",
                            )}
                          >
                            <QuickActions
                              title={"Quick Actions " + icon}
                              actions={[]}
                              struct={{ name: "example" }}
                            >
                              <span>{icon}</span>
                            </QuickActions>
                          </div>
                        ))}
                        {[1, 2].length === 0 && (
                          <div className="text-xs text-neutral-500 col-span-8">
                            No items loaded.
                          </div>
                        )}
                      </div>
                    </ExpandableTrigger>
                  </ScrollArea>
                </ExpandableContent>
              </div>
            </ExpandableCardContent>
            <ExpandableContent preset="slide-down" className="mb-2">
              <ExpandableCardFooter>
                <div className="flex items-start justify-between w-full text-sm text-gray-500">
                  <div className="flex items-center font-jet w-full">items</div>
                  <div className="space-x-2 flex itens-center">4</div>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
});

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

const HeaderTitle = ({ title, children, loading }: HeaderProps) => {
  return (
    <div className="w-[20ch]">
      <div
        className={cn(
          "font-semibold w-fit flex items-center space-x-2 font-space text-xl leading-none tracking-tighter",
        )}
      >
        {loading ? (
          <Icon name="spinners-dots" className="text-neutral-400 h-5" />
        ) : (
          <div>{title ?? "Expansive"}</div>
        )}
      </div>

      {children}
    </div>
  );
};

interface IAuthor {
  author: string;
  href?: string;
  version?: string;
  date?: string;
}

const Author = ({ author, href, version, date }: IAuthor) => (
  <ExpandableTrigger>
    <Link
      href={`${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline underline-offset-2 decoration-dashed decoration-[0.33px]"
    >
      <h4 className="select-none w-fit text-xs px-0.5 space-x-1 text-mac-blue font-jet tracking-normal">
        <span className="font-satisfy font-normal text-neutral-700 tracking-tighter">
          by
        </span>
        <span className="font-medium">Link</span>
        <span className="select-none text-neutral-600 leading-none text-[0.75em] font-mono font-light">
          {date}&middot;{version}
        </span>
      </h4>
    </Link>
  </ExpandableTrigger>
);

interface StatMiniProps {
  value: ReactNode;
  label: string;
  className?: ClassName;
}
const StatMini = ({ value, label, className }: StatMiniProps) => (
  <div
    className={cn(
      "h-6 select-none -space-y-2 flex flex-col items-center",
      "text-neutral-700 font-bold font-space tracking-wide",
      className,
    )}
  >
    <span className="py-0.5 px-1.5 text-lg">{value}</span>
    <span className="text-[0.3em] font-space -tracking-widest font-normal">
      {label}
    </span>
  </div>
);
