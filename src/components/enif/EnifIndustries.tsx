"use client";

import React from "react";
import { motion } from "framer-motion";

const INDUSTRIES = [
  "Technology",
  "Sport",
  "Education",
  "Hospitality",
  "Luxury Retail",
  "Artificial Intelligence",
  "Media",
  "Consumer Platforms"
];

export default function EnifIndustries() {
  return (
    <section className="py-16 bg-[#04070D] border-b border-[#38BDF8]/10 overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop mb-8">
        <h3 className="text-[#94A3B8] font-mono-ui text-sm uppercase tracking-widest">
          Industries We Are Building
        </h3>
      </div>
      
      <div className="relative w-full flex overflow-x-hidden">
        {/* Left/Right Fades */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#04070D] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#04070D] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((industry, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] text-[#F8FAFC]/80 text-sm md:text-base whitespace-nowrap"
            >
              {industry}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
