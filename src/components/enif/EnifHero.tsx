"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";
import { SplineScene } from "../ui/splite";
import { Spotlight } from "../ui/spotlight";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifHero() {
  return (
    <section className="relative overflow-hidden bg-[#04070D] text-[#F8FAFC] pt-24 pb-0 md:pt-28 min-h-[85vh] flex items-center border-b border-[#38BDF8]/10">

      {/* Cyan Ambient Radial Wash — left */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "90%",
          background: "radial-gradient(ellipse, rgba(56, 189, 248, 0.07), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[85vh]">
        {/* ── Left Column: Text ── */}
        <div className="flex flex-col items-start justify-center py-6 lg:py-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
            <span className="font-mono-ui text-xs uppercase tracking-[0.2em] text-[#38BDF8] font-semibold">
              ENIF Technologies
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.06] tracking-tight text-[#F8FAFC] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Engineering the{" "}
            <motion.span
              className="italic font-normal bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #38BDF8 0%, #0EA5E9 35%, #FFFFFF 50%, #0EA5E9 65%, #38BDF8 100%)",
                backgroundSize: "250% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 4,
                delay: 1,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            >
              Future.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-[#94A3B8] max-w-lg mb-10 font-light leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            Built by entrepreneurs. Engineered for businesses.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <StarButton href="#contact" icon={<Icon name="arrow-right" size={16} />}>
              Start a Conversation
            </StarButton>
          </motion.div>
        </div>

        {/* ── Right Column: Spline 3D Scene ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="relative h-[500px] lg:h-[85vh] w-full overflow-hidden"
        >
          {/* Cyan interactive spotlight that follows cursor */}
          <Spotlight size={400} />

          {/* Spline 3D Robot / Tech Scene */}
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />

          {/* Bottom fade so it blends into the page */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#04070D] to-transparent pointer-events-none z-10" />
          {/* Left fade for seamless join */}
          <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-[#04070D] to-transparent pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
}
