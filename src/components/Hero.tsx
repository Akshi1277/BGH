"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Icon, { IconName } from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;

/* ─── Particle data (deterministic, SSR-safe) ───────────────────── */
const PARTICLE_DATA = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37.3) % 100,        // % of canvas width
  y: (i * 53.7) % 100,        // % of canvas height
  size: 1 + (i % 3) * 0.7,
  duration: 8 + (i % 5) * 3,  // seconds per cycle
  phase: (i * 0.38 * Math.PI * 2) % (Math.PI * 2), // start phase
  opacity: 0.12 + (i % 4) * 0.07,
  driftX: i % 2 === 0 ? 7 : -7,
}));

/* ─── Canvas particle layer ─────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let rafId: number;

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of PARTICLE_DATA) {
        const s = t / 1000 / p.duration; // normalised time (0→1 per cycle)
        const angle = s * Math.PI * 2 + p.phase;
        const dy = Math.sin(angle) * 11;
        const dx = Math.sin(angle) * p.driftX * 0.5;
        const alpha = p.opacity * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(angle)));

        ctx.beginPath();
        ctx.arc(
          (p.x / 100) * w + dx,
          (p.y / 100) * h + dy,
          p.size / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(31,92,67,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── Category badges ───────────────────────────────────────────── */
const CATEGORIES: { icon: IconName; label: string; pos: string; delay: number }[] = [
  { icon: "cube",  label: "Products",    pos: "top-[2%] left-1/2 -translate-x-1/2",  delay: 0    },
  { icon: "cloud", label: "Platforms",   pos: "-right-12 top-1/2 -translate-y-1/2",  delay: 0.12 },
  { icon: "cpu",   label: "AI Solutions",pos: "bottom-[2%] left-1/2 -translate-x-1/2", delay: 0.24 },
  { icon: "globe", label: "Ecosystems",  pos: "-left-12 top-1/2 -translate-y-1/2",   delay: 0.36 },
];

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Stiffer spring = snappier, less ongoing work for the engine
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      // RAF-throttle: at most one update per frame
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
      className="relative min-h-screen flex items-center overflow-hidden bg-surface pt-24 pb-16 md:pt-28 md:pb-24"
    >
      {/* ── Background layer ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Single canvas — replaces 28 motion.divs */}
        <ParticleCanvas />

        {/* Soft radial glow behind diagram */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none"
          style={{
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, rgba(31,92,67,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left column */}
        <div className="flex flex-col gap-6">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mt-1"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Brahm Global Holdings
          </motion.span>

          <motion.h1
            className="font-display text-hero text-ink max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            We build the products behind
            <br />
            <span className="italic font-normal text-accent relative inline-block overflow-hidden">
              tomorrow&rsquo;s
              <motion.span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.28) 50%, transparent 75%)",
                  backgroundSize: "250% 100%",
                }}
                animate={{ backgroundPosition: ["-200% 0%", "300% 0%"] }}
                transition={{
                  duration: 2.8,
                  delay: 1.6,
                  repeat: Infinity,
                  repeatDelay: 3.2,
                  ease: "easeInOut",
                }}
              />
            </span>{" "}
            industries.
          </motion.h1>

          <motion.p
            className="text-lede text-ink-muted max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            A UK-based holding company. Through{" "}
            <span className="text-accent font-medium">ENIF</span>, our dedicated
            technology wing, and our portfolio of ventures, we design and build
            the software products, SaaS platforms, and AI-powered ecosystems of
            tomorrow.
          </motion.p>

          <motion.div
            className="flex gap-4 mt-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-accent text-surface px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-accent-soft transition-colors duration-300 group"
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
              className="inline-flex items-center gap-2 border border-surface-line px-6 py-3.5 md:px-8 md:py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] text-ink-muted hover:border-accent hover:text-accent transition-colors duration-300"
            >
              What We Build
            </Link>
          </motion.div>
        </div>

        {/* Right column — diagram with mouse 3-D tilt */}
        <motion.div
          className="relative aspect-square w-full max-w-[min(420px,60vh)] mx-auto hidden lg:block"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          {/* Connector lines (draw-in) */}
          <motion.div
            className="absolute left-1/2 top-[10%] w-px h-[26%] bg-gradient-to-b from-accent/60 to-accent/10 -translate-x-1/2"
            style={{ originY: 0 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
          />
          <motion.div
            className="absolute left-1/2 bottom-[10%] w-px h-[26%] bg-gradient-to-t from-accent/60 to-accent/10 -translate-x-1/2"
            style={{ originY: 1 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 -left-12 h-px w-[calc(26%+3rem)] bg-gradient-to-r from-accent/60 to-accent/10 -translate-y-1/2"
            style={{ originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-1/2 -right-12 h-px w-[calc(26%+3rem)] bg-gradient-to-l from-accent/60 to-accent/10 -translate-y-1/2"
            style={{ originX: 1 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          />

          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-[26%] rounded-full border border-dashed border-accent/25"
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
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"
              style={{ boxShadow: "0 0 8px 3px rgba(31,92,67,0.55)" }}
            />
          </motion.div>

          {/* Center medallion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-accent/35 bg-surface-soft flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(31,92,67,0.12) 0%, transparent 70%)",
              }}
            />
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

          {/* Capability badges — entry only, no infinite y-loop */}
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.label}
              className={`absolute ${c.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-line bg-surface-soft/90 backdrop-blur text-[10px] font-mono-ui uppercase tracking-widest text-ink-muted whitespace-nowrap hover:border-accent/40 hover:text-accent transition-colors duration-300`}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-ink-faint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-eyebrow font-mono-ui">Scroll</span>
        <motion.span
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}