"use client";

import React from "react";
import { motion } from "framer-motion";

const INDUSTRIES = [
  "Technology",
  "Education",
  "Sport",
  "Hospitality",
  "Luxury",
  "Artificial Intelligence",
  "Commerce",
  "Future Ventures",
];

export default function Marquee() {
  return (
    <section className="py-12 bg-surface-soft border-y border-surface-line overflow-hidden relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop mb-6 text-center">
        <span className="font-mono-ui text-xs text-accent uppercase tracking-[0.25em]">
          INDUSTRIES WE BUILD & SHAPE
        </span>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradient fades on edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-surface-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-surface-soft to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-6 md:gap-8 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-surface-line bg-surface text-ink font-display text-lg md:text-xl tracking-wide hover:border-accent hover:text-accent transition-colors shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {ind}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
