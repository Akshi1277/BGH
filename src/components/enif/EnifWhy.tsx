"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

export default function EnifWhy() {
  return (
    <section className="section-y bg-[#060A12] text-[#F8FAFC] border-b border-cyan-500/20 relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-3xl border border-cyan-500/30 rounded-3xl p-8 md:p-12 bg-[#0A101F]/90 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.1)]">
          {/* Corner brackets */}
          <span className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#38BDF8]" />
          <span className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#38BDF8]" />
          <span className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#38BDF8]" />
          <span className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#38BDF8]" />

          <motion.span
            className="font-mono-ui text-xs uppercase tracking-[0.2em] text-[#38BDF8] block mb-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            Why ENIF
          </motion.span>

          <motion.h2
            className="font-display text-display text-[#F8FAFC] mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            British leadership.
            <br />
            <span className="italic font-normal text-[#38BDF8]">Global</span>{" "}
            engineering capability.
          </motion.h2>

          <motion.p
            className="text-lede text-[#94A3B8] max-w-2xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our strategic leadership operates from the United Kingdom while
            our engineering teams collaborate globally to deliver high-quality
            digital solutions with efficiency and scale. Every project follows
            rigorous standards of architecture, security, usability and performance.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
