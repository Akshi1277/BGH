"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const TRUST: { icon: IconName; stat: string; label: string; description: string }[] = [
  {
    icon: "globe",
    stat: "UK",
    label: "Headquartered & Engineered",
    description:
      "Built to the standard our home market demands, then shipped with that same discipline to every business we serve.",
  },
  {
    icon: "compass",
    stat: "Multi-Sector",
    label: "One Discipline, Every Industry",
    description:
      "From sport to education to luxury goods to hospitality, and beyond — proof our engineering standard travels across sectors, not just one.",
  },
  {
    icon: "shield",
    stat: "100%",
    label: "Designed & Engineered In-House",
    description:
      "Every venture in our portfolio is built by our own team. No outsourced core, no black-box vendors, no excuses.",
  },
];

export default function GlobalPresence() {
  return (
    <section id="trust" className="section-y bg-surface-soft relative">
      {/* ── Gradient blend from Portfolio (surface) above ── */}
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
            Why Businesses Trust Us
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Discipline that <span className="italic text-accent">travels</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-surface-line border border-surface-line">
          {TRUST.map((t, idx) => (
            <div key={t.label} className="bg-surface-soft p-10 md:p-12 flex flex-col items-center text-center group relative overflow-hidden">
              {/* Left border reveal on hover */}
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
                <h3 className="font-mono-ui text-label uppercase tracking-[0.1em] text-ink">
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
