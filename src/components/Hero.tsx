"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MeshGradient } from "@paper-design/shaders-react";
import Icon, { IconName } from "./Icon";
import { Spotlight } from "./ui/spotlight";

const ease = [0.25, 1, 0.5, 1] as const;

/* ─── Category badges ───────────────────────────────────────────── */
const CATEGORIES: { icon: IconName; label: string; pos: string; delay: number }[] = [
  { icon: "cpu",         label: "Technology",              pos: "top-[2%] left-1/2 -translate-x-1/2",  delay: 0    },
  { icon: "globe",       label: "Education",               pos: "top-[15%] right-[5%]", delay: 0.1  },
  { icon: "trending-up", label: "Sport",                   pos: "-right-16 top-1/2 -translate-y-1/2",  delay: 0.2  },
  { icon: "cup",         label: "Hospitality",             pos: "bottom-[15%] right-[5%]", delay: 0.3  },
  { icon: "droplet",     label: "Luxury",                  pos: "bottom-[2%] left-1/2 -translate-x-1/2", delay: 0.4  },
  { icon: "cloud",       label: "Artificial Intelligence", pos: "bottom-[15%] left-[5%]", delay: 0.5  },
  { icon: "layers",      label: "Commerce",                pos: "-left-16 top-1/2 -translate-y-1/2", delay: 0.6  },
  { icon: "compass",     label: "Future Ventures",         pos: "top-[15%] left-[5%]", delay: 0.7  },
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

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
      className="relative md:min-h-[100svh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0A0D0B] text-[#F4F4F0] pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 border-b border-white/10"
    >
      {/* ── Background layer ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Dark mesh shader background, tuned to the BGH green palette */}
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
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center md:my-auto">

        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 text-eyebrow font-mono-ui text-[#34D399] tracking-[0.2em] sm:tracking-[0.25em] uppercase flex-wrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shrink-0" />
            <span>BRAHM GLOBAL HOLDINGS • LONDON</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-hero text-[#F4F4F0] max-w-2xl leading-[1.1] min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Building Businesses That{" "}
            <motion.span
              className="italic font-normal relative inline-block pb-2 -mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #34D399 0%, #34D399 35%, #FFFFFF 50%, #34D399 65%, #34D399 100%)",
                backgroundSize: "250% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 3.2,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
            >
              Endure.
            </motion.span>
          </motion.h1>

          {/* Subhead & Paragraph */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#34D399] font-display font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
          >
            Creating companies with the ambition to shape industries and create lasting value.
          </motion.p>

          <motion.p
            className="text-lede text-[#A0AAA4] max-w-xl font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
          >
            <span className="text-[#F4F4F0] font-medium">BRAHM Global Holdings</span> is an international venture builder and holding company creating exceptional businesses across technology, education, sport, hospitality and premium consumer brands.
          </motion.p>

          {/* Quote line */}
          <motion.p
            className="text-xs sm:text-sm text-white/50 italic border-l border-[#34D399]/40 pl-4 py-1 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            "We build businesses with the ambition to remain relevant long after their founders."
          </motion.p>

          {/* Explore CTA Button */}
          <motion.div
            className="flex gap-4 mt-2 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
          >
            <Link
              href="/#group"
              className="inline-flex items-center gap-2 bg-[#1F5C43] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.12em] font-bold hover:bg-[#2A7A5A] transition-colors duration-300 shadow-[0_0_20px_rgba(31,92,67,0.4)] group min-h-[44px]"
            >
              Explore the Group
              <Icon
                name="arrow-right"
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>

          {/* Mobile Category Badges Grid (< lg screens) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="lg:hidden mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2"
          >
            <span className="w-full text-[10px] font-mono-ui text-[#34D399] uppercase tracking-widest mb-1 font-semibold">
              SECTORS & VENTURES
            </span>
            {CATEGORIES.map((c) => (
              <div
                key={c.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#121815]/90 text-[10px] font-mono-ui uppercase tracking-wider text-white/80"
              >
                <Icon name={c.icon} size={12} className="text-[#34D399]" />
                <span>{c.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — diagram with mouse 3-D tilt */}
        <motion.div
          className="relative aspect-square w-full max-w-[min(420px,55vh)] mx-auto hidden lg:block"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          {/* Connector lines */}
          <motion.div
            className="absolute left-1/2 top-[10%] w-px h-[26%] bg-gradient-to-b from-[#34D399]/60 to-[#34D399]/10 -translate-x-1/2"
            style={{ originY: 0 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-1/2 bottom-[10%] w-px h-[26%] bg-gradient-to-t from-[#34D399]/60 to-[#34D399]/10 -translate-x-1/2"
            style={{ originY: 1 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 -left-12 h-px w-[calc(26%+3rem)] bg-gradient-to-r from-[#34D399]/60 to-[#34D399]/10 -translate-y-1/2"
            style={{ originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 -right-12 h-px w-[calc(26%+3rem)] bg-gradient-to-l from-[#34D399]/60 to-[#34D399]/10 -translate-y-1/2"
            style={{ originX: 1 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          />

          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-[26%] rounded-full border border-dashed border-white/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting dot */}
          <motion.div
            className="absolute inset-[26%]"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#34D399]"
              style={{ boxShadow: "0 0 10px 3px rgba(52,211,153,0.7)" }}
            />
          </motion.div>

          {/* Center medallion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 bg-[#121815] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(52,211,153,0.18) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/image copy 2.png"
                alt="Brahm Global Holdings"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Category badges */}
          {CATEGORIES.map((c) => (
            <motion.div
              key={c.label}
              className={`absolute ${c.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#121815]/90 backdrop-blur text-[10px] font-mono-ui uppercase tracking-widest text-white/70 whitespace-nowrap hover:border-[#34D399]/50 hover:text-[#34D399] transition-colors duration-300`}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 + c.delay },
                scale: {
                  duration: 0.55,
                  delay: 0.5 + c.delay,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              }}
            >
              <Icon name={c.icon} size={12} />
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Hero Footer Pillars & Tagline ─────────────────────────── */}
      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop w-full pt-12 border-t border-white/10 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left mb-6">
          {HERO_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-2 justify-center md:justify-start"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              <span className="font-mono-ui text-xs text-white/70 uppercase tracking-wider">
                {pillar}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center font-mono-ui text-[11px] uppercase tracking-[0.2em] text-[#34D399]/80 pt-4">
          Headquartered in London • Built for International Markets
        </div>
      </div>
    </section>
  );
}