"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

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
    <section id="trust" className="section-y bg-ink-soft border-t border-ink-line">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-eyebrow font-mono-ui text-gold block mb-5">
            Why Businesses Trust Us
          </span>
          <h2 className="font-display text-display text-cream">
            Discipline that <span className="italic text-gold">travels</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-line border border-ink-line">
          {TRUST.map((t, idx) => (
            <div key={t.label} className="bg-ink-soft p-10 md:p-12 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center gap-5"
              >
                <Icon name={t.icon} size={24} className="text-gold" />
                <span className="font-display text-3xl text-cream">
                  {t.stat}
                </span>
                <h3 className="font-mono-ui text-label uppercase tracking-[0.1em] text-cream">
                  {t.label}
                </h3>
                <p className="text-sm text-cream-muted leading-relaxed max-w-xs">
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
