"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  "Discover",
  "Define",
  "Design",
  "Engineer",
  "Validate",
  "Deploy",
  "Scale",
  "Continuously Improve"
];

export default function EnifMethod() {
  return (
    <section id="method" className="py-24 md:py-32 bg-[#02040A] border-b border-[#38BDF8]/10 relative overflow-hidden">
      {/* Dark Theme B Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#0EA5E9]/[0.04] blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-4xl md:text-5xl text-white leading-[1.18] tracking-[-0.01em] mb-6"
          >
            The ENIF Method
          </motion.h2>
        </div>

        <div className="relative">
          <div className="relative">
            {/* Connecting line base */}
            <div className="absolute top-[28px] md:top-1/2 md:-translate-y-1/2 left-[5%] right-[5%] h-[2px] bg-[#38BDF8]/10 hidden md:block" />
            {/* Animated glowing progress line */}
            <motion.div 
              className="absolute top-[28px] md:top-1/2 md:-translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent hidden md:block"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              style={{ width: "25%" }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-4 h-4 rounded-full bg-[#04070D] border-2 border-[#38BDF8]/50 z-10 mb-4 group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                <span className="text-[#38BDF8] font-mono-ui text-xs mb-2 opacity-60">0{i + 1}</span>
                <span className="text-white font-medium text-sm md:text-base">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
