"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;
const AUTO_MS = 3800;

/* ─── Data ──────────────────────────────────────────────────────── */
const VENTURES = [
  {
    number: "01",
    tag: "Sports Tech",
    badge: "BGH Venture",
    name: "TALENT PRO LEAGUE",
    url: "talentproleague.co.uk",
    imageSrc: "/tpl-preview.png",
    imageAlt: "Talent Pro League dashboard",
    logo: "/image copy 4.png",
    description:
      "TPL — the UK's football league management platform, built to run competitions, teams, and player development at scale.",
    cta: "Explore Solution",
    href: "#",
  },
  {
    number: "02",
    tag: "EdTech",
    badge: "BGH Venture",
    name: "LONDON SCHOOL OF ACADEMICS & ARTS",
    url: "lsaa.co.uk",
    imageSrc: "/lsa-preview.png",
    imageAlt: "LSA school dashboard",
    logo: "/image copy 3.png",
    description:
      "A school and homeschooling management platform — dual School Portal and Home Schooling Portal — providing one AI-powered home for learning.",
    cta: "View Platform",
    href: "#",
  },
  {
    number: "03",
    tag: "Luxury Goods",
    badge: "BGH Venture",
    name: "Luxure De Eden",
    url: "luxuredeeden.com",
    imageSrc: "/luxure-preview-v2.png",
    imageAlt: "Luxure De Eden website",
    logo: "/luxure-logo.png",
    description:
      "A fragrance house built on heritage craftsmanship and modern brand experience — from concept to commerce.",
    cta: "Discover Fragrances",
    href: "#",
  },
  {
    number: "04",
    tag: "Hospitality Tech",
    badge: "ENIF Project",
    name: "Alayn",
    url: "alayn.io",
    imageSrc: "/image copy 5.png",
    imageAlt: "Alayn dashboard",
    logo: "/alaynlogo.jpeg",
    description:
      "A modern operating system for cafés and restaurants — orders, inventory, and guest experience unified. Developed by ENIF.",
    cta: "Learn More",
    href: "#",
  },
] as const;

/* ─── Helpers ───────────────────────────────────────────────────── */
function getOffset(index: number, active: number): number {
  const n = VENTURES.length;
  const raw = ((index - active) % n + n) % n;
  return raw > n / 2 ? raw - n : raw;
}

interface CardProps {
  x: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

function getCardProps(
  offset: number,
  cardW: number,
  sideOffset: number
): CardProps {
  const cx = -(cardW / 2); // shift to truly center each card
  if (offset === 0)
    return { x: cx, rotateY: 0, scale: 1, opacity: 1, zIndex: 10 };
  if (offset === -1)
    return {
      x: cx - sideOffset,
      rotateY: 44,
      scale: 0.8,
      opacity: 0.55,
      zIndex: 5,
    };
  if (offset === 1)
    return {
      x: cx + sideOffset,
      rotateY: -44,
      scale: 0.8,
      opacity: 0.55,
      zIndex: 5,
    };
  // hidden — tuck behind center
  return { x: cx, rotateY: 0, scale: 0.65, opacity: 0, zIndex: 0 };
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Responsive card dimensions
  const [dims, setDims] = useState({ cardW: 400, sideOffset: 300 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setDims({ cardW: 260, sideOffset: 170 });
      else if (w < 1024) setDims({ cardW: 320, sideOffset: 230 });
      else setDims({ cardW: 400, sideOffset: 310 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % VENTURES.length),
      AUTO_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  const { cardW, sideOffset } = dims;
  // Card height: chrome 32px + aspect(16/10) + label 52px
  const carouselH = Math.round(cardW * 0.625 + 32 + 52);
  const v = VENTURES[active];

  return (
    <section
      id="portfolio"
      className="section-y bg-ink overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <span className="text-eyebrow font-mono-ui text-gold block mb-5">
            Our Portfolio
          </span>
          <h2 className="font-display text-display text-cream">
            Four ventures.
            <br />
            <span className="italic text-gold">One</span> standard.
          </h2>
        </motion.div>

        {/* ── 3-D Carousel ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
        >
          {/* perspective wrapper */}
          <div
            className="relative w-full"
            style={{ height: carouselH, perspective: 1300 }}
          >
            {VENTURES.map((venture, i) => {
              const offset = getOffset(i, active);
              const props = getCardProps(offset, cardW, sideOffset);
              const isCenter = offset === 0;
              const isSide = Math.abs(offset) === 1;

              return (
                <motion.div
                  key={venture.number}
                  className="absolute top-0"
                  style={{ left: "50%", width: cardW }}
                  animate={{
                    x: props.x,
                    rotateY: props.rotateY,
                    scale: props.scale,
                    opacity: props.opacity,
                    zIndex: props.zIndex,
                  }}
                  transition={{ duration: 0.75, ease }}
                  onClick={() => isSide && setActive(i)}
                >
                  <div
                    className={[
                      "w-full rounded-xl overflow-hidden border bg-ink transition-colors duration-500",
                      isCenter
                        ? "border-gold/30 shadow-[0_24px_72px_-20px_rgba(0,0,0,0.8)]"
                        : "border-ink-line cursor-pointer",
                    ].join(" ")}
                  >
                    {/* Browser chrome */}
                    <div className="h-8 bg-ink-high flex items-center gap-3 px-3 border-b border-ink-line">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${isCenter ? "bg-[#FF5F57]" : "bg-cream-faint/20"}`}
                        />
                        <span
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${isCenter ? "bg-[#FEBC2E]" : "bg-cream-faint/20"}`}
                        />
                        <span
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${isCenter ? "bg-[#28C840]" : "bg-cream-faint/20"}`}
                        />
                      </div>
                      <div className="flex-1 h-5 rounded bg-ink/70 border border-ink-line/40 flex items-center px-2 gap-1.5 overflow-hidden">
                        <span className="w-1 h-1 rounded-full bg-gold/50 shrink-0" />
                        <span className="text-[8px] font-mono-ui text-cream-faint/50 truncate tracking-wide">
                          {venture.url}
                        </span>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "16/10" }}
                    >
                    <Image
  src={venture.imageSrc}
  alt={venture.imageAlt}
  fill
  sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 400px"
  className="object-contain object-top"
  loading="eager"
/>
                      {/* Dim overlay for non-active */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-ink/50" />
                      )}
                      {/* Bottom fade */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Label strip */}
                    <div className="px-3 py-3 flex items-center gap-2.5 border-t border-ink-line">
                <img
  src={venture.logo}
  alt=""
  className="h-5 w-auto object-contain shrink-0 rounded-sm opacity-80"
  loading="eager"
/>
                      <span className="text-xs font-display text-cream truncate">
                        {venture.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Active venture info ──────────────────────────── */}
          <div className="mt-12 flex flex-col items-center text-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease }}
                className="flex flex-col items-center gap-3"
              >
                {/* Tag */}
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/70 shrink-0" />
                  <span className="text-[11px] font-mono-ui uppercase tracking-[0.2em] text-cream-faint">
                    {v.tag} — {v.badge}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl md:text-3xl text-cream">
                  {v.name}
                </h3>

                {/* Divider */}
                <div className="h-px w-8 bg-gold/40" />

                {/* Description */}
                <p className="text-sm text-cream-muted max-w-md leading-relaxed">
                  {v.description}
                </p>

                {/* CTA */}
                <Link
                  href={v.href}
                  className="relative inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-[0.15em] text-gold mt-1 group/cta w-fit"
                >
                  {v.cta}
                  <Icon
                    name="arrow-up-right"
                    size={14}
                    className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                  <span className="absolute bottom-0 left-0 h-px w-full bg-gold scale-x-0 origin-left group-hover/cta:scale-x-100 transition-transform duration-300" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation pills */}
            <div className="flex items-center gap-2 mt-4">
              {VENTURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={[
                    "rounded-full transition-all duration-400",
                    i === active
                      ? "w-6 h-1.5 bg-gold"
                      : "w-1.5 h-1.5 bg-cream-faint/25 hover:bg-cream-faint/50",
                  ].join(" ")}
                  aria-label={`Go to ${VENTURES[i].name}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}