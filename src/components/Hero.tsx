"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import Icon, { IconName } from "./Icon";
import { Spotlight } from "./ui/spotlight";

const ease = [0.25, 1, 0.5, 1] as const;

/* ─── Category badges ───────────────────────────────────────────── */
const CATEGORIES: { icon: IconName; label: string; pos: string; delay: number; angle: number }[] = [
  { icon: "cpu",            label: "Technology",              pos: "top-[-2%] left-1/2 -translate-x-1/2",  delay: 0,   angle: 0   },
  { icon: "graduation-cap", label: "Education",               pos: "top-[12%] right-[-2%]", delay: 0.1, angle: 45  },
  { icon: "trophy",         label: "Sport",                   pos: "-right-16 top-1/2 -translate-y-1/2",  delay: 0.2, angle: 90  },
  { icon: "utensils",       label: "Hospitality",             pos: "bottom-[12%] right-[-2%]", delay: 0.3, angle: 135 },
  { icon: "diamond",        label: "Luxury",                  pos: "bottom-[-2%] left-1/2 -translate-x-1/2", delay: 0.4, angle: 180 },
  { icon: "brain",          label: "Artificial Intelligence", pos: "bottom-[12%] -left-16", delay: 0.5, angle: 225 },
  { icon: "shopping-bag",   label: "Commerce",                pos: "-left-16 top-1/2 -translate-y-1/2", delay: 0.6, angle: 270 },
  { icon: "rocket",         label: "Future Ventures",         pos: "top-[12%] -left-12", delay: 0.7, angle: 315 },
];

const HERO_PILLARS = [
  "London Headquarters",
  "Global Operations",
  "Engineering Excellence",
  "Long-term Ownership",
];

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px -200px 0px" });
  const [orbitAngle, setOrbitAngle] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  // Track continuous orbit angle for synchronized badge glowing - Paused when out of view
  useEffect(() => {
    let start: number;
    let rafId: number;
    const duration = 14000; // 14 seconds for a 360-degree rotation

    if (!isInView) return;

    const updateAngle = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const currentAngle = ((elapsed % duration) / duration) * 360;
      setOrbitAngle(currentAngle);
      rafId = requestAnimationFrame(updateAngle);
    };

    rafId = requestAnimationFrame(updateAngle);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
        mouseY.set((e.clientY - r.top) / r.height - 0.5);
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative lg:h-screen lg:max-h-[100vh] min-h-[660px] flex flex-col justify-between overflow-hidden bg-[#0A0D0B] text-[#F4F4F0] pt-24 pb-6 sm:pt-24 sm:pb-6 md:pt-20 md:pb-6 border-b border-white/10"
    >
      {/* ── Background layer ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Dark mesh shader background, tuned to the BGH green palette */}
        {isInView && (
          <div className="absolute inset-0 opacity-80">
            <MeshGradient
              className="absolute inset-0 w-full h-full"
              colors={["#04070A", "#0A0D0B", "#0F1F17", "#123A28", "#060907"]}
              speed={0.3}
            />
            <MeshGradient
              className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
              colors={["#081410", "#1F5C43", "#34D399", "#5EEAD4", "#0B2A1F"]}
              speed={0.25}
            />
          </div>
        )}

        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none"
          style={{
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Cursor-reactive glow */}
      <Spotlight className="from-[#34D399] via-[#34D399]/60 to-transparent" size={480} />

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

        {/* Left column — 7 cols (~60%) */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 max-w-2xl">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 text-[11px] font-mono-ui text-[#34D399] tracking-[0.25em] uppercase flex-wrap font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0" />
            <span>BRAHM GLOBAL HOLDINGS • LONDON</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-3xl sm:text-5xl lg:text-5xl xl:text-6xl text-[#F4F4F0] leading-[1.06] min-w-0 tracking-[-0.03em] text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Building Businesses That{" "}
            <motion.span
              className="italic font-normal relative inline-block pb-1 bg-clip-text text-transparent font-serif"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #34D399 0%, #34D399 35%, #FFFFFF 50%, #34D399 65%, #34D399 100%)",
                backgroundSize: "200% 100%",
                fontOpticalSizing: "auto",
              }}
              animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Endure.
            </motion.span>
          </motion.h1>

          {/* Subhead & Paragraph (Enforcing typography-designer 65ch measure rule) */}
          <motion.div
            className="flex flex-col gap-5 text-base sm:text-lg text-[#A0AAA4] font-light leading-[1.65] max-w-[55ch]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
          >
            <p className="text-[#F4F4F0] font-medium text-balance">
              Building enterprises with the ambition to shape industries and drive lasting value.
            </p>
            <p className="text-balance">
              BRAHM Global Holdings is an international venture builder and holding company creating exceptional businesses across technology, education, sport, hospitality and premium consumer brands.
            </p>
          </motion.div>

          {/* Explore CTA Button */}
          <motion.div
            className="flex gap-4 mt-1 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
          >
            <Link
              href="/#group"
              className="inline-flex items-center gap-2 bg-[#1F5C43] text-white px-6 sm:px-7 py-3 rounded-full text-xs font-mono-ui uppercase tracking-[0.14em] font-bold hover:bg-[#2A7A5A] transition-colors duration-300 shadow-[0_0_20px_rgba(31,92,67,0.4)] group min-h-[42px]"
            >
              Explore the Group
              <Icon
                name="arrow-right"
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>

          {/* Mobile Category Badges Grid (< lg screens) — Horizontal Scroll Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="lg:hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono-ui text-[#34D399] uppercase tracking-widest font-semibold">
                SECTORS &amp; VENTURES
              </span>
              <span className="text-[9px] font-mono-ui text-white/40 uppercase tracking-wider">
                SWIPE →
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.label}
                  href="/#sectors"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#121815]/90 text-[10px] font-mono-ui uppercase tracking-wider text-white/80 shrink-0 hover:border-[#34D399]/50 hover:text-[#34D399] transition-colors duration-200"
                >
                  <Icon name={c.icon} size={12} className="text-[#34D399]" />
                  <span>{c.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column — 5 cols (~40%) */}
        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
            className="relative aspect-square w-full max-w-[360px] xl:max-w-[400px] mx-auto origin-center"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
          >
            {/* All 8 Radial Connector Rays */}
            {CATEGORIES.map((c) => {
              const diff = Math.abs((orbitAngle - c.angle + 540) % 360 - 180);
              const isGlowing = diff < 25;
              return (
                <motion.div
                  key={`line-${c.label}`}
                  className="absolute top-1/2 left-1/2 h-px pointer-events-none origin-left transition-opacity duration-300"
                  style={{
                    width: "44%",
                    transform: `rotate(${c.angle - 90}deg)`,
                    background: isGlowing
                      ? "linear-gradient(90deg, rgba(52,211,153,0.9) 0%, rgba(52,211,153,0.15) 100%)"
                      : "linear-gradient(90deg, rgba(52,211,153,0.3) 0%, rgba(255,255,255,0.03) 100%)",
                    opacity: isGlowing ? 1 : 0.45,
                  }}
                />
              );
            })}

            {/* Perfectly Centered Orbiting Dot — Dynamically Locked to orbitAngle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none z-20">
              <div
                className="w-full h-full relative"
                style={{ transform: `rotate(${orbitAngle}deg)` }}
              >
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#34D399]"
                  style={{ boxShadow: "0 0 14px 4px rgba(52,211,153,0.9)" }}
                />
              </div>
            </div>

            {/* Radial Backdrop Depth Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 xl:w-72 xl:h-72 rounded-full bg-gradient-to-r from-[#34D399]/25 via-emerald-500/15 to-transparent blur-3xl pointer-events-none animate-pulse" />

            {/* Center medallion */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 xl:w-36 xl:h-36 rounded-full border border-white/20 bg-[#121815] flex items-center justify-center z-10 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(52,211,153,0.18) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden">
                <Image
                  src="/image copy 2.png"
                  alt="Brahm Global Holdings"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Category badges (Interactive Navigation Links) */}
            {CATEGORIES.map((c) => {
              const diff = Math.abs((orbitAngle - c.angle + 540) % 360 - 180);
              const isGlowing = diff < 25;

              return (
                <Link
                  key={c.label}
                  href="/#sectors"
                  className={`absolute ${c.pos} z-30 cursor-pointer focus:outline-none group/badge`}
                >
                  <motion.div
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur text-[10px] font-mono-ui uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                      isGlowing
                        ? "border-[#34D399] text-[#34D399] bg-[#121815] shadow-[0_0_20px_rgba(52,211,153,0.7)] font-bold ring-1 ring-[#34D399]/60"
                        : "border border-white/10 bg-[#121815]/90 text-white/70 group-hover/badge:border-[#34D399]/80 group-hover/badge:text-[#34D399] group-hover/badge:bg-[#121815] group-hover/badge:scale-105"
                    }`}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.5 + c.delay },
                      scale: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <Icon name={c.icon} size={12} className={isGlowing ? "text-[#34D399]" : "group-hover/badge:text-[#34D399] transition-colors"} />
                    {c.label}
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Hero Footer Pillars & Tagline ─────────────────────────── */}
      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop w-full pt-4 pb-8 sm:pb-4 border-t border-white/10 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center mb-2">
          {HERO_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-2 justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0" />
              <span className="font-mono-ui text-xs text-white/70 uppercase tracking-wider">
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#34D399]/80 pt-1">
          Headquartered in London • Built for International Markets
        </div>
      </div>
    </section>
  );
}
