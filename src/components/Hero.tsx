"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

const CATEGORIES: { icon: IconName; label: string; pos: string }[] = [
  { icon: "cube", label: "Products", pos: "top-[2%] left-1/2 -translate-x-1/2" },
  { icon: "cloud", label: "Platforms", pos: "-right-12 top-1/2 -translate-y-1/2" },
  { icon: "cpu", label: "AI Solutions", pos: "bottom-[2%] left-1/2 -translate-x-1/2" },
  { icon: "globe", label: "Ecosystems", pos: "-left-12 top-1/2 -translate-y-1/2" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink pt-24 pb-16 md:pt-28 md:pb-24">
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="light-sweep" />
      </div>

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left column — each element staggered individually */}
        <div className="flex flex-col gap-6">
          <motion.span
            className="text-eyebrow font-mono-ui text-gold block mt-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Brahm Global Holdings
          </motion.span>

          <motion.h1
            className="font-display text-hero text-cream max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            We build the products behind
            <br />
            <span className="italic font-normal text-gold">tomorrow&rsquo;s</span>{" "}
            industries.
          </motion.h1>

          <motion.p
            className="text-lede text-cream-muted max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            A UK-based holding company. Through <span className="text-gold font-medium">ENIF</span>, our dedicated technology wing, and our portfolio of ventures, we design and build the software products, SaaS platforms, and AI-powered ecosystems of tomorrow.
          </motion.p>

          <motion.div
            className="flex gap-4 mt-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-gold-soft transition-colors duration-300 group"
            >
              Explore Our Portfolio
              <Icon
                name="arrow-right"
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              href="#build"
              className="inline-flex items-center gap-2 border border-ink-line px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] text-cream-muted hover:border-gold hover:text-gold transition-colors duration-300"
            >
              What We Build
            </Link>
          </motion.div>
        </div>

        {/* Right column — diagram */}
        <motion.div
          className="relative aspect-square w-full max-w-[min(420px,60vh)] mx-auto hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          {/* connectors */}
          <div className="absolute left-1/2 top-[10%] w-px h-[26%] bg-gradient-to-b from-gold/60 to-gold/10 -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-[10%] w-px h-[26%] bg-gradient-to-t from-gold/60 to-gold/10 -translate-x-1/2" />
          <div className="absolute top-1/2 -left-12 h-px w-[calc(26%+3rem)] bg-gradient-to-r from-gold/60 to-gold/10 -translate-y-1/2" />
          <div className="absolute top-1/2 -right-12 h-px w-[calc(26%+3rem)] bg-gradient-to-l from-gold/60 to-gold/10 -translate-y-1/2" />

          {/* rotating outer ring — very slow, almost invisible */}
          <motion.div
            className="absolute inset-[26%] rounded-full border border-dashed border-gold/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />

          {/* center medallion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold/35 bg-ink-soft flex items-center justify-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="Brahm Global Holdings"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>

          {/* capability badges — staggered appearance */}
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.label}
              className={`absolute ${c.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-line bg-ink-soft/90 backdrop-blur text-[10px] font-mono-ui uppercase tracking-widest text-cream-muted whitespace-nowrap hover:border-gold/40 hover:text-gold transition-colors duration-300`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            >
              <Icon name={c.icon} size={12} />
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — gentle opacity pulse, no scale */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-cream-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-eyebrow font-mono-ui">Scroll</span>
        <motion.span
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

