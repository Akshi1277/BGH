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
    <section className="section-y bg-[#04070D] text-[#F8FAFC] relative overflow-hidden border-b border-cyan-500/20">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="text-eyebrow font-mono-ui text-[#38BDF8] block mb-4 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            Engagement Models
          </motion.span>
          <motion.h2
            className="font-display text-display text-[#F8FAFC]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Choose the way <span className="italic text-[#38BDF8]">you work</span> with us.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODELS.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease }}
              className="bg-[#0A101F]/80 border border-cyan-500/20 rounded-2xl p-8 flex flex-col items-center text-center group relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-[#38BDF8] mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon name={m.icon} size={22} />
              </div>
              <h3 className="font-display text-lg text-[#F8FAFC] mb-3">{m.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
