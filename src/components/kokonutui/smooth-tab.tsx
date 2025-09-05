"use client";

/**
 * @author: @dorian_baffier
 * @description: Smooth Tab
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TabItem {
    id: string;
    title: string;
    icon?: LucideIcon;
    content?: React.ReactNode;
    cardContent?: React.ReactNode;
    color: string;
}

const WaveformPath = () => (
    <motion.path
        d="M0 50 
           C 20 40, 40 30, 60 50
           C 80 70, 100 60, 120 50
           C 140 40, 160 30, 180 50
           C 200 70, 220 60, 240 50
           C 260 40, 280 30, 300 50
           C 320 70, 340 60, 360 50
           C 380 40, 400 30, 420 50
           L 420 100 L 0 100 Z"
        initial={false}
        animate={{
            x: [0, 10, 0],
            transition: {
                duration: 5,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
            },
        }}
    />
);

const DEFAULT_TABS: TabItem[] = [
    {
        id: "Models",
        title: "Models",
        color: "bg-blue-500 hover:bg-blue-600",
        cardContent: (
            <div className="relative h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 w-full h-32"
                        viewBox="0 0 420 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        role="presentation"
                    >
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ duration: 0.5 }}
                            className="fill-blue-500 stroke-blue-500"
                            style={{ strokeWidth: 1 }}
                        >
                            <WaveformPath />
                        </motion.g>
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="fill-blue-500 stroke-blue-500"
                            style={{
                                strokeWidth: 1,
                                transform: "translateY(10px)",
                            }}
                        >
                            <WaveformPath />
                        </motion.g>
                    </svg>
                </div>
                <div className="p-6 h-full relative flex flex-col">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                            Models
                        </h3>
                        <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]">
                            Choose the model you want to use
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "MCPs",
        title: "MCPs",
        color: "bg-purple-500 hover:bg-purple-600",
        cardContent: (
            <div className="relative h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 w-full h-32"
                        viewBox="0 0 420 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        role="presentation"
                    >
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ duration: 0.5 }}
                            className="fill-purple-500 stroke-purple-500"
                            style={{ strokeWidth: 1 }}
                        >
                            <WaveformPath />
                        </motion.g>
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="fill-purple-500 stroke-purple-500"
                            style={{
                                strokeWidth: 1,
                                transform: "translateY(10px)",
                            }}
                        >
                            <WaveformPath />
                        </motion.g>
                    </svg>
                </div>
                <div className="p-6 h-full relative flex flex-col">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                            MCPs
                        </h3>
                        <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]">
                            Choose the MCP you want to use
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "Agents",
        title: "Agents",
        color: "bg-emerald-500 hover:bg-emerald-600",
        cardContent: (
            <div className="relative h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 w-full h-32"
                        viewBox="0 0 420 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        role="presentation"
                    >
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ duration: 0.5 }}
                            className="fill-emerald-500 stroke-emerald-500"
                            style={{ strokeWidth: 1 }}
                        >
                            <WaveformPath />
                        </motion.g>
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="fill-emerald-500 stroke-emerald-500"
                            style={{
                                strokeWidth: 1,
                                transform: "translateY(10px)",
                            }}
                        >
                            <WaveformPath />
                        </motion.g>
                    </svg>
                </div>
                <div className="p-6 h-full relative flex flex-col">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                            Agents
                        </h3>
                        <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]">
                            Choose the agent you want to use
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: "Users",
        title: "Users",
        color: "bg-amber-500 hover:bg-amber-600",
        cardContent: (
            <div className="relative h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <svg
                        className="absolute bottom-0 w-full h-32"
                        viewBox="0 0 420 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        role="presentation"
                    >
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ duration: 0.5 }}
                            className="fill-amber-500 stroke-amber-500"
                            style={{ strokeWidth: 1 }}
                        >
                            <WaveformPath />
                        </motion.g>
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 0.5 }}
                            className="fill-amber-500 stroke-amber-500"
                            style={{
                                strokeWidth: 1,
                                transform: "translateY(10px)",
                            }}
                        >
                            <WaveformPath />
                        </motion.g>
                    </svg>
                </div>
                <div className="p-6 h-full relative flex flex-col">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 [text-shadow:_0_1px_1px_rgb(0_0_0_/_10%)]">
                            Users
                        </h3>
                        <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed max-w-[90%]">
                            Choose the user you want to use
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
];

interface SmoothTabProps {
    items?: TabItem[];
    defaultTabId?: string;
    className?: string;
    activeColor?: string;
    onChange?: (tabId: string) => void;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.95,
        position: "absolute" as const,
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        position: "absolute" as const,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.95,
        position: "absolute" as const,
    }),
};

const transition = {
    duration: 0.4,
    ease: [0.32, 0.72, 0, 1],
};

export default function SmoothTab({
    items = DEFAULT_TABS,
    defaultTabId = DEFAULT_TABS[0].id,
    className,
    activeColor = "bg-[#1F9CFE]",
    onChange,
}: SmoothTabProps) {
    const [selected, setSelected] = React.useState<string>(defaultTabId);
    const [direction, setDirection] = React.useState(0);
    const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

    // Reference for the selected button
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Update dimensions whenever selected tab changes or on mount
    React.useLayoutEffect(() => {
        const updateDimensions = () => {
            const selectedButton = buttonRefs.current.get(selected);
            const container = containerRef.current;

            if (selectedButton && container) {
                const rect = selectedButton.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                setDimensions({
                    width: rect.width,
                    left: rect.left - containerRect.left,
                });
            }
        };

        // Initial update
        requestAnimationFrame(() => {
            updateDimensions();
        });

        // Update on resize
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [selected]);

    const handleTabClick = (tabId: string) => {
        const currentIndex = items.findIndex((item) => item.id === selected);
        const newIndex = items.findIndex((item) => item.id === tabId);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setSelected(tabId);
        onChange?.(tabId);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        tabId: string
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTabClick(tabId);
        }
    };

    const selectedItem = items.find((item) => item.id === selected);

    return (
        <div className="flex flex-col h-full">
            {/* Card Content Area */}
            <div className="flex-1 mb-4 relative">
                <div className="bg-card border rounded-lg h-[200px] w-full relative">
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <AnimatePresence
                            initial={false}
                            mode="popLayout"
                            custom={direction}
                        >
                            <motion.div
                                key={`card-${selected}`}
                                custom={direction}
                                variants={slideVariants as any}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={transition as any}
                                className="absolute inset-0 w-full h-full will-change-transform bg-card"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                }}
                            >
                                {selectedItem?.cardContent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Toolbar */}
            <div
                ref={containerRef}
                role="tablist"
                aria-label="Smooth tabs"
                className={cn(
                    "flex items-center justify-between gap-1 py-1 mt-auto relative",
                    "bg-background w-[400px] mx-auto",
                    "border rounded-xl",
                    "transition-all duration-200",
                    className
                )}
            >
                {/* Sliding Background */}
                <motion.div
                    className={cn(
                        "absolute rounded-lg z-[1]",
                        selectedItem?.color || activeColor
                    )}
                    initial={false}
                    animate={{
                        width: dimensions.width - 8,
                        x: dimensions.left + 4,
                        opacity: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                    }}
                    style={{ height: "calc(100% - 8px)", top: "4px" }}
                />

                <div className="grid grid-cols-4 w-full gap-1 relative z-[2]">
                    {items.map((item) => {
                        const isSelected = selected === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                ref={(el) => {
                                    if (el) buttonRefs.current.set(item.id, el);
                                    else buttonRefs.current.delete(item.id);
                                }}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls={`panel-${item.id}`}
                                id={`tab-${item.id}`}
                                tabIndex={isSelected ? 0 : -1}
                                onClick={() => handleTabClick(item.id)}
                                onKeyDown={(e) => handleKeyDown(e, item.id)}
                                className={cn(
                                    "relative flex items-center justify-center gap-0.5 rounded-lg px-2 py-1.5",
                                    "text-sm font-medium transition-all duration-300",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    "truncate",
                                    isSelected
                                        ? "text-white"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <span className="truncate">{item.title}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
