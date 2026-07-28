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
    <section className="section-y bg-surface relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mb-20">
          <motion.span
            className="text-eyebrow font-mono-ui text-cobalt block mb-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            End-to-end{" "}
            <span className="italic text-cobalt">digital engineering</span>.
          </motion.h2>
          <motion.p
            className="text-ink-muted mt-4 max-w-lg"
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-line border border-surface-line"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.index}
              variants={item}
              className="bg-surface p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden transition-colors duration-400 hover:bg-surface-soft"
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-cobalt origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              <span
                aria-hidden
                className="absolute -top-2 -right-2 font-display text-[7rem] leading-none select-none pointer-events-none text-ink/[0.035]"
              >
                {s.index}
              </span>

              <div className="flex items-center justify-between">
                <span className="font-mono-ui text-label text-cobalt">
                  {s.index}
                </span>
                <motion.div
                  className="text-ink-faint group-hover:text-cobalt transition-colors duration-400"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={s.icon} size={22} />
                </motion.div>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">
                  {s.description}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="text-xs font-mono-ui text-ink-faint flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-cobalt/60 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
