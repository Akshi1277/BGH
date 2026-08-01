"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const DIFFERENTIATORS: { icon: IconName; stat: string; label: string; description: string }[] = [
  {
    icon: "layers",
    stat: "Build",
    label: "We build, not just fund",
    description:
      "Unlike traditional venture capital that deploys capital and waits, we establish, engineer and operate businesses directly.",
  },
  {
    icon: "compass",
    stat: "Endure",
    label: "Decades, not exit cycles",
    description:
      "Unlike private equity firms optimised for 5-year exits, we build institutions designed to remain relevant for the next century.",
  },
  {
    icon: "shield",
    stat: "In-House",
    label: "Engineered by us",
    description:
      "Every company in our Group is powered by our own engineering division, ENIF. No black-box vendors, no outsourced core.",
  },
];

export default function WhyBRAHM() {
  return (
    <section id="why-brahm" className="section-y bg-surface-soft relative">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--color-surface), transparent)" }}
      />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            THE BRAHM DIFFERENCE
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Built <span className="italic text-accent">differently</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-line border border-surface-line">
          {DIFFERENTIATORS.map((t, idx) => (
            <div key={t.label} className="bg-surface-soft p-10 md:p-12 flex flex-col items-center text-center group relative overflow-hidden">
              <span className="absolute left-0 top-0 h-full w-[2px] bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease }}
                className="flex flex-col items-center text-center gap-5"
              >
                <Icon name={t.icon} size={24} className="text-accent" />
                <motion.span
                  className="font-display text-3xl text-ink"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.stat}
                </motion.span>
                <h3 className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-ink font-bold">
                  {t.label}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
                  {t.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
