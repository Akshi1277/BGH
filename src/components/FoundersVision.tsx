"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const QUALITATIVE_STATS = [
  { value: "London", label: "Global Headquarters" },
  { value: "Multi-sector", label: "Business Group" },
  { value: "Founder-led", label: "Long-term Ownership" },
  { value: "Engineering-led", label: "Innovation" },
];

export default function FoundersVision() {
  return (
    <section className="py-24 md:py-32 bg-paper text-paper-ink border-t border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Qualitative Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24 divide-y md:divide-y-0 md:divide-x divide-paper-line border-b border-paper-line pb-16">
          {QUALITATIVE_STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-6 first:pl-0 text-center md:text-left"
            >
              <span className="font-display text-2xl md:text-3xl text-accent font-medium mb-1">
                {s.value}
              </span>
              <span className="font-mono-ui text-xs uppercase tracking-[0.18em] text-paper-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Defining Institutional Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        >
          <span className="font-mono-ui text-xs text-accent uppercase tracking-[0.25em] block">
            THE INSTITUTIONAL VISION
          </span>

          <blockquote className="font-display italic text-2xl md:text-4xl lg:text-5xl text-paper-ink leading-tight">
            &ldquo;We are not building businesses for the next quarter. We are building institutions for the next century.&rdquo;
          </blockquote>

          <div className="h-px w-20 bg-accent/40 my-2" />

          <p className="font-mono-ui text-xs uppercase tracking-[0.2em] text-paper-muted">
            BRAHM Global Holdings • London Headquarters
          </p>
        </motion.div>
      </div>
    </section>
  );
}
