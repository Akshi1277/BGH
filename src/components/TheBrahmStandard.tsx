"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const PRINCIPLES = [
  {
    title: "Vision",
    description: "Seeing opportunities others overlook and designing ventures with generational scale in mind.",
    icon: "compass" as const,
  },
  {
    title: "Discipline",
    description: "Executing with consistency, precision, accountability, and commercial rigour.",
    icon: "shield" as const,
  },
  {
    title: "Excellence",
    description: "Uncompromising standards across leadership, engineering, operations, and customer experience.",
    icon: "cube" as const,
  },
  {
    title: "Long-term Thinking",
    description: "Decisions made for the next century, prioritizing enduring value over short-term market cycles.",
    icon: "layers" as const,
  },
];

export default function TheBrahmStandard() {
  return (
    <section id="standard" className="section-y bg-paper text-paper-ink border-b border-paper-line relative overflow-hidden">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 text-eyebrow font-mono-ui text-accent tracking-[0.2em] uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>THE BRAHM STANDARD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-paper-ink leading-tight mb-6"
          >
            One philosophy. <span className="italic font-normal text-accent">Every venture.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="text-lede text-paper-muted font-light leading-relaxed"
          >
            Every company within <span className="text-paper-ink font-medium">BRAHM Global Holdings</span> is created according to the same principles: <strong className="text-accent font-medium">Vision. Discipline. Excellence. Long-term Thinking.</strong> These values shape every decision we make—from the earliest stages of venture creation through to international expansion.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-paper-line bg-paper-high flex flex-col justify-between hover:border-accent/40 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={p.icon} size={20} />
                </div>
                <h3 className="font-display text-2xl text-paper-ink mb-3">{p.title}</h3>
                <p className="text-sm text-paper-muted font-light leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-8 pt-4 border-t border-paper-line flex items-center justify-between text-mono-ui text-[11px] text-accent font-mono-ui tracking-widest uppercase">
                <span>0{i + 1}</span>
                <span>Standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
