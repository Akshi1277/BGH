"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Icon from "../Icon";
import { StarButton } from "../ui/StarButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function EnifCTA() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="py-24 sm:py-32 md:py-40 bg-[#02040A] relative overflow-hidden border-t border-[#38BDF8]/10">
      {/* Dark Theme Ambient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#050D1A_0%,#02040A_60%,#010206_100%)] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38BDF8]/[0.05] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Side: Enterprise CTA Content */}
          <div className="w-full md:w-7/12 flex flex-col items-start text-left">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-px bg-[#38BDF8]" />
              <span className="font-mono text-[#38BDF8] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
                Engagement
              </span>
            </motion.div>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.12] tracking-[-0.03em] mb-6"
            >
              Engineer the Future of Your Organisation.
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="text-[#94A3B8] text-base md:text-xl font-light leading-relaxed tracking-[0.01em] mb-10 max-w-[60ch]"
            >
              Partner with the engineering team behind BRAHM Global Holdings.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              <StarButton href="mailto:hello@brahmglobalholdings.com?subject=Work With ENIF" icon={<Icon name="arrow-right" size={16} />}>
                Initiate Engagement
              </StarButton>
            </motion.div>
          </div>

          {/* Right Side: Futuristic Logo Reveal */}
          <motion.div
            className="w-full md:w-5/12 h-[320px] sm:h-[400px] md:h-[440px] relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#38BDF8]/30 bg-black/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center backdrop-blur-md"
            initial={reduce ? false : { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            whileInView={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            {/* Subtle glow behind logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#38BDF8]/20 blur-[60px] rounded-full pointer-events-none" />
            
            <img
              src="/eniflogo.png"
              alt="ENIF Logo"
              className="w-48 sm:w-64 object-contain relative z-10 opacity-90 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
