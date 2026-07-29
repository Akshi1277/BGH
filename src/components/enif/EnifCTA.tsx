"use client";

import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifCTA() {
  return (
    <section id="contact" className="relative section-y bg-[#04070D] text-[#F8FAFC] overflow-hidden">
      {/* Background Dot Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      
      {/* Cyan Ambient Wash */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-25%",
          left: "25%",
          width: "50%",
          height: "90%",
          background:
            "radial-gradient(ellipse, rgba(14, 165, 233, 0.18), transparent 70%)",
          filter: "blur(90px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-eyebrow font-mono-ui text-[#38BDF8] block mb-6 uppercase tracking-[0.2em]"
          >
            Let&rsquo;s Build
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display text-[#F8FAFC] max-w-3xl"
          >
            Let&rsquo;s build something{" "}
            <span className="italic text-[#38BDF8]">remarkable</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lede text-[#94A3B8] max-w-xl mt-8"
          >
            Whether you&rsquo;re launching a new venture, transforming an
            existing business or exploring the potential of artificial
            intelligence, ENIF Technologies provides the expertise to take
            ambitious ideas from concept to reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <MagneticButton
              href="mailto:hello@brahmglobalholdings.com?subject=Discovery Consultation"
              className="inline-flex items-center gap-3 bg-[#0EA5E9] text-[#020617] px-10 py-5 rounded-full text-label font-mono-ui uppercase tracking-[0.12em] font-bold hover:bg-[#38BDF8] transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.4)] group"
            >
              Schedule a Discovery Consultation
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
