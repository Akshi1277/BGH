"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const CAPABILITIES: { index: string; icon: IconName; title: string; description: string }[] = [
  {
    index: "01",
    icon: "cube",
    title: "Software Products",
    description:
      "End-to-end products designed, engineered, and shipped under our own roof — from first sketch to production release.",
  },
  {
    index: "02",
    icon: "cloud",
    title: "SaaS Platforms",
    description:
      "Multi-tenant platforms built to scale, with the architecture, billing, and security a serious business demands.",
  },
  {
    index: "03",
    icon: "cpu",
    title: "AI-Powered Solutions",
    description:
      "Applied intelligence woven into real workflows — automation and insight that make products smarter, not louder.",
  },
  {
    index: "04",
    icon: "globe",
    title: "Digital Ecosystems",
    description:
      "Connected experiences across web, mobile, and data — engineered as a coherent system, not a pile of features.",
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

export default function Capabilities() {
  return (
    <section id="build" className="section-y bg-surface relative">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Heading — eyebrow and headline staggered individually */}
        <div className="max-w-2xl mb-20">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            What We Build
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Four disciplines.<br />
            One standard of <span className="italic text-accent">craft</span>.
          </motion.h2>
          <motion.p
            className="text-ink-muted mt-4 max-w-lg"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our specialized engineering wing at <span className="text-accent font-medium">ENIF</span> designs and builds products across four core digital disciplines.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-line border border-surface-line"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.index}
              variants={item}
              className="bg-surface p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden transition-colors duration-400 hover:bg-surface-soft"
            >
              {/* Left border reveal on hover */}
              <span className="absolute left-0 top-0 h-full w-[2px] bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              {/* Ghost numeral — same watermark treatment as About pillar cards */}
              <span
                aria-hidden
                className="absolute -top-2 -right-2 font-display text-[7rem] leading-none select-none pointer-events-none text-ink/[0.035]"
              >
                {cap.index}
              </span>

              <div className="flex items-center justify-between">
                <span className="font-mono-ui text-label text-accent">
                  {cap.index}
                </span>
                <motion.div
                  className="text-ink-faint group-hover:text-accent transition-colors duration-400"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={cap.icon} size={22} />
                </motion.div>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


