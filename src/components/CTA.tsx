"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Icon, { IconName } from "./Icon";

/* ─── Cycling words in the headline ──────────────────────────────── */
const WORDS = ["build.", "scale.", "disrupt.", "launch."];

/* ─── The three conversation pathways ────────────────────────────── */
const PATHWAYS: { icon: IconName; label: string; description: string; href: string; accent: string }[] = [
  {
    icon: "layers",
    label: "Start a project",
    description:
      "A new product, platform, or venture — from first principles to launch.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Start a Project",
    accent: "var(--color-accent)",         /* forest/pine */
  },
  {
    icon: "trending-up",
    label: "Explore investment",
    description:
      "We back ambitious founders operating in our core growth sectors.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Investment Inquiry",
    accent: "var(--color-cobalt)",
  },
  {
    icon: "users",
    label: "Partner with us",
    description:
      "Strategic alliances, joint ventures, or distribution partnerships.",
    href: "mailto:hello@brahmglobalholdings.com?subject=Partnership",
    accent: "var(--color-persimmon)",
  },
];

/* ─── Magnetic button — floats toward cursor within 140px ─────────── */
function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = 140;
      if (dist < pull) {
        const f = ((pull - dist) / pull) * 0.42;
        x.set(dx * f);
        y.set(dy * f);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <motion.a
      ref={ref}
      href="mailto:hello@brahmglobalholdings.com"
      style={{ x: sx, y: sy }}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center gap-3 bg-accent text-surface px-10 py-5 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-accent-soft transition-colors duration-300 group"
    >
      Start a Conversation
      <motion.span
        className="inline-flex"
        variants={{ rest: { x: 0 }, hover: { x: 5 } }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.2 }}
      >
        <Icon name="arrow-right" size={18} />
      </motion.span>
    </motion.a>
  );
}

/* ─── Pathway card ────────────────────────────────────────────────── */
function PathwayCard({
  pathway,
  delay,
}: {
  pathway: (typeof PATHWAYS)[0];
  delay: number;
}) {
  return (
    <motion.a
      href={pathway.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      whileHover="hover"
      className="group relative bg-paper border border-surface-line rounded-2xl p-8 flex flex-col gap-5 overflow-hidden cursor-pointer"
    >
      {/* Coloured top accent line — slides in from left on hover */}
      <motion.div
        className="absolute top-0 left-0 h-[2.5px] w-full origin-left"
        style={{ background: pathway.accent }}
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        initial="rest"
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Icon ring */}
      <motion.div
        className="w-11 h-11 rounded-xl border border-surface-line flex items-center justify-center"
        style={{ color: pathway.accent }}
        variants={{
          rest: { borderColor: "var(--color-surface-line)" },
          hover: { borderColor: pathway.accent, scale: 1.08 },
        }}
        transition={{ duration: 0.25 }}
      >
        <Icon name={pathway.icon} size={18} />
      </motion.div>

      {/* Text */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono-ui text-label text-ink uppercase tracking-[0.08em]">
            {pathway.label}
          </span>
          <motion.span
            className="text-ink-muted"
            variants={{ rest: { x: 0, opacity: 0 }, hover: { x: 4, opacity: 1 } }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="arrow-right" size={13} />
          </motion.span>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">
          {pathway.description}
        </p>
      </div>

      {/* Subtle background tint on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, color-mix(in srgb, ${pathway.accent} 6%, transparent), transparent 70%)`,
        }}
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  );
}

/* ─── Main component ──────────────────────────────────────────────── */
export default function CTA() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % WORDS.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      className="relative section-y bg-surface overflow-hidden"
    >
      {/* ── Subtle dot grid ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-surface-line) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.6,
        }}
      />

      {/* ── Colour washes ────────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "-30%",
          left: "-20%",
          width: "60%",
          height: "100%",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)",
          filter: "blur(70px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "-15%",
          width: "55%",
          height: "90%",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--color-cobalt) 10%, transparent), transparent 70%)",
          filter: "blur(90px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">

        {/* ── Hero text block — centred ─────────────────────────────── */}
        <div className="text-center flex flex-col items-center mb-20">

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-eyebrow font-mono-ui text-accent block mb-6"
          >
            Let&rsquo;s Build
          </motion.span>

          {/* Headline with cycling word */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-display text-ink max-w-3xl"
          >
            Tell us what you want&nbsp;to{" "}
            {/* clip container — hides the sliding word during transition */}
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ verticalAlign: "bottom" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={wordIdx}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-105%" }}
                  transition={{
                    duration: 0.42,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="italic text-accent inline-block"
                >
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lede text-ink-muted max-w-xl mt-8"
          >
            Whether it&rsquo;s a new product, a platform to scale, or an
            ecosystem to connect — we start every conversation the same way:
            by understanding the problem worth solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <MagneticCTA />
          </motion.div>
        </div>

        {/* ── Three pathway cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PATHWAYS.map((p, i) => (
            <PathwayCard key={p.label} pathway={p} delay={0.45 + i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}