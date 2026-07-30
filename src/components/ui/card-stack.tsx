"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  tag: string;
  title: string;
  description: string;
  icon: string;
  visual: React.ReactNode;
};

export const CardStack = ({
  items,
  offset = 14,
  scaleFactor = 0.04,
}: {
  items: CardStackItem[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [cards, setCards] = useState<CardStackItem[]>(items);

  // Auto flip every 6 seconds if not manually clicked
  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards: CardStackItem[]) => {
        const newArray = [...prevCards];
        const first = newArray.shift();
        if (first) newArray.push(first);
        return newArray;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const flipCard = () => {
    setCards((prevCards: CardStackItem[]) => {
      const newArray = [...prevCards];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  const selectCardIndex = (targetId: string | number) => {
    setCards((prevCards: CardStackItem[]) => {
      const targetIndex = prevCards.findIndex((c) => c.id === targetId);
      if (targetIndex <= 0) return prevCards;
      const newArray = [...prevCards];
      const itemsToMove = newArray.splice(0, targetIndex);
      return [...newArray, ...itemsToMove];
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Stack Container */}
      <div className="relative w-full max-w-4xl h-[440px] sm:h-[400px] md:h-[380px] mx-auto flex items-center justify-center">
        {cards.map((card, index) => {
          // Display top 3 cards in the 3D stack
          if (index > 3) return null;

          const isFront = index === 0;

          return (
            <motion.div
              key={card.id}
              className="absolute w-full h-full cursor-pointer select-none"
              style={{
                transformOrigin: "top center",
              }}
              animate={{
                top: index * -offset,
                scale: 1 - index * scaleFactor,
                zIndex: cards.length - index,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={isFront ? flipCard : () => selectCardIndex(card.id)}
            >
              <div
                className={cn(
                  "w-full h-full p-6 sm:p-8 md:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden",
                  isFront
                    ? "border-[#38BDF8]/40 bg-[#060E1A]/98 backdrop-blur-2xl shadow-[0_20px_60px_rgba(56,189,248,0.18),0_0_40px_rgba(0,0,0,0.9)] hover:border-[#38BDF8]/70"
                    : "border-white/10 bg-[#040812]/90 backdrop-blur-md opacity-75 shadow-lg"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Title & Info */}
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-[#38BDF8] px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30">
                        {card.id} // {card.tag}
                      </span>
                      {isFront && (
                        <span className="text-[10px] font-mono text-white/40 animate-pulse hidden sm:inline">
                          Click card to swap ➔
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display text-white mb-3 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>

                  {/* Right Column: Embedded Visual */}
                  <div className="md:col-span-5">
                    {card.visual}
                  </div>
                </div>

                {/* Bottom Interactive Navigation Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs text-white/40">
                  <div className="flex items-center gap-2">
                    {items.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectCardIndex(item.id);
                        }}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          cards[0].id === item.id
                            ? "w-8 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        )}
                        aria-label={`Go to card ${item.title}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      flipCard();
                    }}
                    className="hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 text-xs text-[#38BDF8] font-semibold"
                  >
                    <span>CYCLE STACK</span>
                    <span className="text-base">➔</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
