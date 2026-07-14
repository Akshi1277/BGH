"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const PILLARS = [
  {
    index: "01",
    title: "We Own the Full Stack",
    description:
      "Strategy, design, and engineering sit under one roof inside ENIF, our technology wing. We build everything in-house with zero outsourcing.",
  },
  {
    index: "02",
    title: "Senior Builders, Direct Access",
    description:
      "You work with the people actually building the product — not a layer of account managers relaying your feedback.",
  },
  {
    index: "03",
    title: "Built to Global Standards",
    description:
      "UK-based engineering discipline, shipped for a global user base — from compliance to performance to accessibility.",
  },
  {
    index: "04",
    title: "Partners, Not Vendors",
    description:
      "We hold equity in the outcomes we build. Our ventures are products we intend to stand behind for years, not projects we invoice and leave.",
  },
];

const list: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  return (
    <section
      id="difference"
      className="section-y bg-paper text-paper-ink border-y border-paper-line"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lg:col-span-5 relative aspect-[4/5] bg-paper-high border border-paper-line overflow-hidden flex items-center justify-center p-10 lg:sticky lg:top-32"
        >
          <div className="absolute inset-0 opacity-[0.25]">
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="480px"
              className="object-cover scale-150"
            />
          </div>
          <span className="absolute top-8 left-8 text-eyebrow font-mono-ui text-paper-muted">
            Our Philosophy
          </span>
          <p className="font-display italic text-3xl md:text-4xl text-paper-ink leading-tight text-center relative z-10">
            &ldquo;We don&rsquo;t outsource ambition.&rdquo;
          </p>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-xl mb-14"
          >
            <span className="text-eyebrow font-mono-ui text-gold-deep block mb-5">
              Why We&rsquo;re Different
            </span>
            <h2 className="font-display text-display text-paper-ink mb-6">
              Builders first. Holding company second.
            </h2>
            <p className="text-lede text-paper-muted">
              Most holding companies allocate capital. We do that too — but
              our real advantage is that we can design, engineer, and ship
              the product ourselves, end to end, under one standard of
              craft.
            </p>
          </motion.div>

          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.index}
                variants={row}
                className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-t border-paper-line first:border-t-0 group"
              >
                <span className="font-mono-ui text-label text-gold-deep pt-1">
                  {p.index}
                </span>
                <div>
                  <h3 className="font-display text-xl text-paper-ink mb-2">
                    {p.title}
                  </h3>
                  <p className="text-paper-muted leading-relaxed max-w-lg">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
