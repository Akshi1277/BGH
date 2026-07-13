"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Icon, { IconName } from "./Icon";

const CATEGORIES: { icon: IconName; label: string; pos: string }[] = [
  { icon: "cube", label: "Products", pos: "top-[2%] left-1/2 -translate-x-1/2" },
  { icon: "cloud", label: "Platforms", pos: "right-0 top-1/2 -translate-y-1/2" },
  { icon: "cpu", label: "AI Solutions", pos: "bottom-[2%] left-1/2 -translate-x-1/2" },
  { icon: "globe", label: "Ecosystems", pos: "left-0 top-1/2 -translate-y-1/2" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink pt-28 pb-20 md:pt-32">
      <div className="absolute inset-0 glow-gold pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-cream) 1px, transparent 1px), linear-gradient(to bottom, var(--color-cream) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-eyebrow font-mono-ui text-gold block">
            Brahm Global Holdings <span className="inline-block md:inline">&mdash;</span> <span className="block md:inline text-gold/80">United Kingdom</span>
          </span>
          <h1 className="font-display text-hero text-cream max-w-2xl">
            We build the products behind{" "}
            <span className="italic font-normal text-gold">tomorrow&rsquo;s</span>{" "}
            industries.
          </h1>
          <p className="text-lede text-cream-muted max-w-xl">
            A UK-based technology company designing and building software
            products, SaaS platforms, and AI-powered ecosystems for
            businesses that refuse to stand still.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-gold-soft transition-colors group"
            >
              Explore Our Portfolio
              <Icon
                name="arrow-right"
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#build"
              className="inline-flex items-center gap-2 border border-ink-line px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] text-cream hover:border-gold hover:text-gold transition-colors"
            >
              What We Build
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative aspect-square w-full max-w-[440px] mx-auto hidden lg:block"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
        >
          {/* connectors */}
          <div className="absolute left-1/2 top-[10%] w-px h-[26%] bg-gradient-to-b from-gold/50 to-gold/10 -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-[10%] w-px h-[26%] bg-gradient-to-t from-gold/50 to-gold/10 -translate-x-1/2" />
          <div className="absolute top-1/2 left-[10%] h-px w-[26%] bg-gradient-to-r from-gold/50 to-gold/10 -translate-y-1/2" />
          <div className="absolute top-1/2 right-[10%] h-px w-[26%] bg-gradient-to-l from-gold/50 to-gold/10 -translate-y-1/2" />

          {/* rotating outer ring */}
          <motion.div
            className="absolute inset-[26%] rounded-full border border-dashed border-gold/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* center medallion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-gold/40 bg-ink-soft flex items-center justify-center shadow-[0_0_60px_-10px_rgba(216,182,121,0.35)]">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/image copy.png"
                alt="Brahm Global Holdings"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>

          {/* capability badges — evergreen categories, not named ventures */}
          {CATEGORIES.map((c) => (
            <div
              key={c.label}
              className={`absolute ${c.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-line bg-ink-soft/90 backdrop-blur text-[10px] font-mono-ui uppercase tracking-widest text-cream-muted whitespace-nowrap hover:border-gold/50 hover:text-gold transition-colors`}
            >
              <Icon name={c.icon} size={12} />
              {c.label}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-cream-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-eyebrow font-mono-ui">Scroll</span>
        <motion.span
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
