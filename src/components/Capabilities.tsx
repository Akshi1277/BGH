"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const SECTORS: { index: string; icon: IconName; title: string; description: string }[] = [
  {
    index: "01",
    icon: "cpu",
    title: "Technology & Artificial Intelligence",
    description:
      "Building AI, software and digital infrastructure — the engineering capability behind the Group.",
  },
  {
    index: "02",
    icon: "trending-up",
    title: "Sports & Media",
    description:
      "Connecting athletes, communities and commercial partners through digital competition and entertainment.",
  },
  {
    index: "03",
    icon: "globe",
    title: "Education",
    description:
      "Developing digital learning platforms and global education services for the next generation of learners.",
  },
  {
    index: "04",
    icon: "cup",
    title: "Hospitality",
    description:
      "Creating premium hospitality concepts where design, service and experience combine.",
  },
  {
    index: "05",
    icon: "droplet",
    title: "Luxury Consumer Brands",
    description:
      "Crafting refined fragrance and lifestyle collections built on heritage and modern craftsmanship.",
  },
  {
    index: "06",
    icon: "cloud",
    title: "Digital Commerce",
    description:
      "Building the commercial infrastructure that lets every Group company sell and scale online.",
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

export default function TheGroup() {
  return (
    <section id="group" className="section-y bg-surface relative">
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
            The Group
          </motion.span>
          <motion.h2
            className="font-display text-display text-ink"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            One Group.<br />
            Multiple <span className="italic text-accent">industries</span>.
          </motion.h2>
          <motion.p
            className="text-ink-muted mt-4 max-w-lg"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our companies operate independently while benefiting from the
            strategic direction, governance, technology capabilities and
            operational expertise of the Group.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-line border border-surface-line"
        >
          {SECTORS.map((sector) => (
            <motion.div
              key={sector.index}
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
                {sector.index}
              </span>

              <div className="flex items-center justify-between">
                <span className="font-mono-ui text-label text-accent">
                  {sector.index}
                </span>
                <motion.div
                  className="text-ink-faint group-hover:text-accent transition-colors duration-400"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={sector.icon} size={22} />
                </motion.div>
              </div>
              <div>
                <h3 className="font-display text-xl text-ink mb-3">
                  {sector.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
