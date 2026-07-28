"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon, { IconName } from "../Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const MODELS: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "layers",
    title: "Project Delivery",
    description: "A complete team delivering a defined project from discovery to launch.",
  },
  {
    icon: "users",
    title: "Dedicated Development Teams",
    description: "An extension of your business, providing long-term engineering capacity.",
  },
  {
    icon: "compass",
    title: "Technology Consulting",
    description: "Strategic guidance for organisations undertaking digital transformation or launching new products.",
  },
  {
    icon: "link",
    title: "Product Partnerships",
    description: "We work alongside founders to design, build and scale innovative digital ventures.",
  },
];

export default function EnifEngagement() {
  return (
    <section className="section-y bg-surface-soft relative">
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--color-surface), transparent)" }}
      />
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            className="text-eyebrow font-mono-ui text-cobalt block mb-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            Engagement Models
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Choose the way <span className="italic text-cobalt">you work</span> with us.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-line border border-surface-line">
          {MODELS.map((m, idx) => (
            <div key={m.title} className="bg-surface-soft p-8 md:p-10 flex flex-col items-center text-center group relative overflow-hidden">
              <span className="absolute left-0 top-0 h-full w-[2px] bg-cobalt origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease }}
                className="flex flex-col items-center text-center gap-4"
              >
                <Icon name={m.icon} size={22} className="text-cobalt" />
                <h3 className="font-display text-lg text-ink">{m.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{m.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
