"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../Icon";
import { SplineScene } from "../ui/splite";
import { EnifLoader } from "./EnifLoader";

const ease = [0.16, 1, 0.3, 1] as const;

interface EnifHeroProps {
  onSplineLoad?: () => void;
}

export default function EnifHero({ onSplineLoad }: EnifHeroProps = {}) {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    if (onSplineLoad) onSplineLoad();
  };

  return (
    <>
      <EnifLoader isLoading={!splineLoaded} />
      <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 min-h-[100svh] min-h-screen flex flex-col justify-center border-b border-[#38BDF8]/20">
        {/* Interactive 3D Scene — retained as requested */}
        <div className="absolute inset-0 z-0 opacity-70 pointer-events-none mix-blend-screen" style={{ filter: 'contrast(1.2) grayscale(0.2)' }}>
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full object-cover origin-center scale-105 translate-x-[14%] md:translate-x-[19%] lg:translate-x-[22%]"
            onLoad={handleSplineLoad}
          />
        </div>

        {/* Smooth Bottom Blend Transition Layer */}
        <div className="absolute bottom-0 inset-x-0 h-28 md:h-40 bg-gradient-to-b from-transparent via-[#04070D]/80 to-[#04070D] pointer-events-none z-[1]" />
        
        {/* Left-side dark gradient to ensure text readability */}
        <div className="absolute inset-0 w-full md:w-3/4 bg-gradient-to-r from-[#04070D] via-[#04070D]/90 to-transparent pointer-events-none z-[1]" />

        {/* Structural grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 md:my-auto">
          {/* ── Left-Aligned Architectural Hero Content ── */}
          <div className="flex flex-col items-start justify-center text-left w-full md:w-2/3 lg:w-3/5">
            
            {/* Tagline with Inline Accent Line */}
            <motion.div
              className="flex items-center gap-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="w-8 sm:w-10 h-px bg-[#38BDF8]" />
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">
                ENIF Technologies — BRAHM Global Holdings
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-[-0.035em] text-[#F8FAFC] mb-5 sm:mb-8 drop-shadow-2xl max-w-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              Engineer Your{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#64748B]">Enterprise.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-[58ch] mb-8 sm:mb-10 font-light tracking-[0.01em] leading-relaxed drop-shadow-sm border-l border-[#38BDF8]/20 pl-4 sm:pl-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
            >
              We build and operate the mission-critical digital platforms, AI systems, and enterprise software that power our own group and ambitious organisations worldwide.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.46 }}
              className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4"
            >
              <a href="#contact" className="w-full sm:w-auto px-6 py-3 bg-[#F8FAFC] text-[#04070D] hover:bg-[#E2E8F0] text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 group uppercase tracking-widest font-mono">
                <span>Engage ENIF</span>
              </a>
              <a
                href="#capabilities"
                className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-[#38BDF8]/50 text-[#F8FAFC] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 group bg-transparent uppercase tracking-widest font-mono"
              >
                <span>Capabilities</span>
                <Icon
                  name="arrow-down"
                  size={14}
                  className="text-[#38BDF8] group-hover:translate-y-1 transition-transform duration-200"
                />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}