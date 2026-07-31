"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";
import { SplineScene } from "../ui/splite";
import { Spotlight } from "../ui/spotlight";
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
      <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 min-h-[100svh] min-h-screen flex flex-col justify-center items-center border-b border-[#38BDF8]/20">
        {/* Interactive 3D Scene — the hero's background */}
        <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            onLoad={handleSplineLoad}
          />
        </div>

      {/* Cursor-reactive glow */}
      <Spotlight className="from-[#38BDF8] via-[#38BDF8]/60 to-transparent" size={520} />

      {/* Smooth Bottom Blend Transition Layer */}
      <div className="absolute bottom-0 inset-x-0 h-28 md:h-40 bg-gradient-to-b from-transparent via-[#051329]/80 to-[#04070D] pointer-events-none z-[1]" />

      {/* Structural grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10 md:my-auto">

        {/* ── Centered Hero Content ── */}
        <div className="flex flex-col items-center justify-center text-center">

         

          {/* Headline */}
          <motion.h1
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.12] tracking-[-0.01em] text-[#F8FAFC] mb-3 sm:mb-6 drop-shadow-2xl max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <motion.span
              className="inline-block pr-2 -mr-2 italic font-normal bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #38BDF8 0%, #7DD3FC 40%, #FFFFFF 54%, #7DD3FC 68%, #38BDF8 100%)",
                backgroundSize: "260% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 4.5,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              Future
            </motion.span>{" "}
            of Digital Enterprise.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#38BDF8]/60 mb-4 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            — Beyond the Stars
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-xs sm:text-base md:text-lg text-[#94A3B8] max-w-xl mb-5 sm:mb-8 font-light tracking-wide leading-relaxed drop-shadow-sm px-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            We design, engineer, and operate mission-critical digital products — from enterprise software platforms to autonomous AI pipelines.
          </motion.p>

          {/* Ethos pull-quote - hidden on small mobile to fit 100svh cleanly */}
          <motion.blockquote
            className="hidden sm:block text-sm md:text-lg font-display text-[#64748B] italic mb-8 border-l-2 border-[#38BDF8]/30 pl-4 tracking-wide leading-relaxed max-w-lg mx-auto text-left"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
          >
            "Technology can be outsourced. Responsibility cannot."
          </motion.blockquote>

          {/* CTAs - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.46 }}
            className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto"
          >
            <StarButton href="#contact" icon={<Icon name="arrow-right" size={16} />} className="w-full sm:w-auto justify-center">
              Start a Conversation
            </StarButton>
            <a
              href="#capabilities"
              className="w-full sm:w-auto px-6 py-3 rounded-3xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#38BDF8]/35 text-[#F8FAFC] text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.97] backdrop-blur-sm flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>Explore Capabilities</span>
              <Icon
                name="arrow-right"
                size={14}
                className="text-[#38BDF8] group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
    </>
  );
}