"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Icon, { IconName } from "../Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const SERVICES: { index: string; icon: IconName; title: string; description: string; items: string[] }[] = [
  {
    index: "01",
    icon: "cube",
    title: "Software Engineering",
    description: "Custom software built around your business — not the other way around.",
    items: ["Enterprise Software", "Business Systems", "Web Applications", "Mobile Applications", "Internal Platforms"],
  },
  {
    index: "02",
    icon: "cpu",
    title: "Artificial Intelligence",
    description: "Intelligent systems that automate operations, improve decision-making and create measurable commercial value.",
    items: ["AI Automation", "Large Language Models", "Business Intelligence", "AI Assistants", "Predictive Analytics"],
  },
  {
    index: "03",
    icon: "cloud",
    title: "SaaS Platforms",
    description: "Scalable subscription platforms designed for global users.",
    items: ["Multi-tenant Architecture", "Secure Cloud Infrastructure", "Payment Integration", "User Management", "Analytics"],
  },
  {
    index: "04",
    icon: "compass",
    title: "Digital Transformation",
    description: "Helping organisations modernise outdated processes through intelligent technology.",
    items: ["Process Automation", "Workflow Optimisation", "Digital Strategy", "Legacy System Modernisation"],
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export default function EnifServices() {
  return (
    <section className="section-y bg-[#060A12] text-[#F8FAFC] relative overflow-hidden border-b border-cyan-500/20">
      {/* Subtle Dot Grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-2xl mb-16">
          <motion.span
            className="text-eyebrow font-mono-ui text-[#38BDF8] block mb-4 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="font-display text-display text-[#F8FAFC]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            End-to-end{" "}
            <span className="italic text-[#38BDF8]">digital engineering</span>.
          </motion.h2>
          <motion.p
            className="text-[#94A3B8] mt-4 max-w-lg text-lede"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            We combine business strategy, product design and modern software
            engineering into one integrated delivery model. Every solution is
            designed for growth from day one.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.index}
              variants={item}
              className="bg-[#0A101F]/80 border border-cyan-500/20 rounded-2xl p-8 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md transition-all duration-400 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1"
            >
              {/* Top Cyan Accent Glow */}
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

              {/* Watermark Numeral */}
              <span
                aria-hidden
                className="absolute -top-3 -right-2 font-display text-[6.5rem] leading-none select-none pointer-events-none text-cyan-400/[0.04]"
              >
                {s.index}
              </span>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-ui text-xs tracking-widest text-[#38BDF8]">
                    {s.index}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform duration-300">
                    <Icon name={s.icon} size={20} />
                  </div>
                </div>

                <h3 className="font-display text-xl text-[#F8FAFC] mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 pt-4 border-t border-cyan-500/10">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="text-xs font-mono-ui text-[#94A3B8] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/80 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
