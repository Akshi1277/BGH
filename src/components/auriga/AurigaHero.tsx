"use client";

import React from "react";
import { motion } from "framer-motion";
import { AURIGA_DATA } from "@/data/auriga";
import Icon from "../Icon";
import { ConstellationCanvas } from "./ConstellationCanvas";

export default function AurigaHero() {
  const { tagline, headline, miniTag, subHeadline, description } = AURIGA_DATA.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#04070D] text-[#F8FAFC] overflow-hidden pt-20 border-b border-white/5">
      <ConstellationCanvas />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full flex flex-col items-center justify-center py-20 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#E0115F]/30 bg-[#E0115F]/5 mb-10 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0115F] shadow-[0_0_8px_#E0115F] animate-pulse" />
          <span className="font-sans font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#E0115F]">
            {tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[clamp(3rem,8vw,7rem)] font-display font-medium tracking-tight leading-[0.9] mb-8"
        >
          {headline.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {word === "Endure." ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                  {word}
                </span>
              ) : (
                word
              )}
              {i < headline.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans font-semibold text-sm tracking-[0.3em] uppercase text-white/50 mb-12 flex items-center gap-4 justify-center"
        >
          <span className="h-[1px] w-8 bg-white/20" />
          {subHeadline}
          <span className="h-[1px] w-8 bg-white/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-[65ch] mx-auto space-y-6 text-lg md:text-xl text-white/60 font-sans leading-relaxed"
        >
          {description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 justify-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#E0115F] text-white font-sans text-sm tracking-widest font-semibold uppercase hover:bg-[#B80E4D] transition-all duration-300 shadow-[0_0_30px_rgba(255,45,85,0.3)] hover:shadow-[0_0_50px_rgba(255,45,85,0.5)]"
          >
            <span>Start A Conversation</span>
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              <Icon name="arrow-right" size={16} />
            </span>
          </a>
          <span className="font-sans font-semibold text-xs tracking-[0.2em] text-[#E0115F] uppercase">
            {miniTag}
          </span>
        </motion.div>

      </div>
    </section>
  );
}
