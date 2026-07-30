"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export type ScrollCardItem = {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: string;
  visual: React.ReactNode;
};

const ScrollCard = ({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: ScrollCardItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const step = 1 / total;
  const cardStart = index * step;
  const slideStart = Math.max(0, cardStart - 0.1);
  const cardEnd = Math.min(1, (index + 1) * step);

  // Y Translation: Card 0 is fixed at 0. Subsequent cards slide up from 120px down to 0
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, slideStart, cardStart, 1],
    index === 0
      ? [0, 0]
      : [120, 120, 0, 0]
  );

  // Scale: Shrinks slightly as cards above it stack on top
  const targetScale = 1 - (total - index - 1) * 0.03;
  const scale = useTransform(
    scrollYProgress,
    cardStart === cardEnd
      ? [0, 1]
      : [cardStart, cardEnd, 1],
    cardStart === cardEnd
      ? [1, 1]
      : [1, targetScale, targetScale]
  );

  // Opacity: Card 0 is 1. Subsequent cards fade in smoothly as they slide up
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [0, slideStart, cardStart, 1],
    index === 0
      ? [1, 1]
      : [0, 0, 1, 1]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="absolute w-full h-full"
    >
      <div
        className={cn(
          "w-full h-full p-6 sm:p-8 md:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(56,189,248,0.18),0_0_40px_rgba(0,0,0,0.95)]",
          "border-[#38BDF8]/40 bg-[#060E1A]/98 backdrop-blur-2xl hover:border-[#38BDF8]/70"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Info */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-[#38BDF8] px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                {card.id} // {card.tag}
              </span>
              <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
                Scroll down for next card ➔
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display text-white mb-3 leading-tight">
              {card.title}
            </h3>
            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed font-light">
              {card.description}
            </p>
          </div>

          {/* Right Visual */}
          <div className="md:col-span-5">
            {card.visual}
          </div>
        </div>

        {/* Card Index Progress Indicator */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs text-white/40">
          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === index
                    ? "w-8 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                    : "w-2 bg-white/20"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-[#38BDF8] font-mono font-semibold">
            PILLAR {index + 1} / {total}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const ScrollCardStack = ({ items }: { items: ScrollCardItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      {/* Sticky Viewport Frame */}
      <div className="sticky top-24 w-full h-[75vh] min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl h-[420px] sm:h-[380px] md:h-[360px] mx-auto flex items-center justify-center">
          {items.map((card, i) => (
            <ScrollCard
              key={card.id}
              card={card}
              index={i}
              total={items.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
