"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Icon, { IconName } from "./Icon";

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
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Capabilities() {
  return (
    <section id="build" className="section-y bg-ink">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <span className="text-eyebrow font-mono-ui text-gold block mb-5">
            What We Build
          </span>
          <h2 className="font-display text-display text-cream">
            Four disciplines.<br />
            One standard of <span className="italic text-gold">craft</span>.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-line border border-ink-line"
        >
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.index}
              className="bg-ink p-8 md:p-10 flex flex-col gap-6 group hover:bg-ink-soft transition-colors duration-500"
            >
              <motion.div
                variants={item}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-ui text-label text-gold">
                    {cap.index}
                  </span>
                  <Icon
                    name={cap.icon}
                    size={22}
                    className="text-cream-faint group-hover:text-gold transition-colors duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl text-cream mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-cream-muted leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
