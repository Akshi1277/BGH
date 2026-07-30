"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

const ease = [0.25, 1, 0.5, 1] as const;
const AUTO_MS = 5000;

interface Venture {
  number: string;
  tag: string;
  badge: string;
  name: string;
  tagline: string;
  url: string;
  imageSrc?: string;
  imageAlt: string;
  logo?: string;
  aspectRatio: string;
  description: string;
  cta: string;
  href: string;
  variant?: "gradient";
}

const VENTURES: Venture[] = [
  {
    number: "01",
    tag: "ENGINEERING & ARTIFICIAL INTELLIGENCE",
    badge: "Group Company",
    name: "ENIF",
    tagline: "Engineering the Intelligence Behind Modern Business.",
    url: "brahmglobalholdings.com/enif",
    imageAlt: "ENIF Technologies",
    aspectRatio: "1892/952",
    description:
      "ENIF is the engineering company of BRAHM Global Holdings, designing intelligent software, enterprise platforms and artificial intelligence that power both our own businesses and organisations worldwide. From ambitious start-ups to established enterprises, ENIF transforms complex ideas into secure, scalable and commercially successful digital products.",
    cta: "Explore ENIF →",
    href: "/enif",
    variant: "gradient",
  },
  {
    number: "02",
    tag: "SPORTS TECHNOLOGY",
    badge: "Group Company",
    name: "Talent Pro League",
    tagline: "Reimagining the Future of Football.",
    url: "talentproleague.co.uk",
    imageSrc: "/tpl-preview.png",
    imageAlt: "Talent Pro League dashboard",
    logo: "/image copy 4.png",
    aspectRatio: "1892/952",
    description:
      "Talent Pro League is a next-generation football ecosystem connecting players, clubs, coaches, leagues and commercial partners through intelligent technology designed to modernise competition management, talent development and grassroots participation. Built to strengthen the future of football through innovation, accessibility and community.",
    cta: "Explore Talent Pro League →",
    href: "/#contact",
  },
  {
    number: "03",
    tag: "EDUCATION",
    badge: "Group Company",
    name: "London School of Academics & Arts",
    tagline: "British Education Without Borders.",
    url: "lsaa.co.uk",
    imageSrc: "/lsa-preview.png",
    imageAlt: "LSA school dashboard",
    logo: "/image copy 3.png",
    aspectRatio: "1913/953",
    description:
      "London School of Academics & Arts delivers internationally accessible education through British educators, intelligent technology and personalised learning experiences. Combining academic excellence with AI-powered learning, LSAA prepares learners around the world for the opportunities of tomorrow.",
    cta: "Explore LSAA →",
    href: "/#contact",
  },
  {
    number: "04",
    tag: "HOSPITALITY TECHNOLOGY",
    badge: "Group Company",
    name: "Alayn",
    tagline: "Redefining Hospitality Through Intelligence.",
    url: "alayn.io",
    imageSrc: "/image copy 5.png",
    imageAlt: "Alayn dashboard",
    logo: "/alaynlogo.jpeg",
    aspectRatio: "1896/952",
    description:
      "Alayn is an intelligent hospitality platform combining artificial intelligence, operational excellence and modern customer experience to help cafés, restaurants and hospitality groups operate more efficiently, grow sustainably and build stronger customer relationships. Designed to become the operating system behind the next generation of hospitality businesses.",
    cta: "Explore Alayn →",
    href: "/#contact",
  },
  {
    number: "05",
    tag: "LUXURY CONSUMER BRANDS",
    badge: "Group Company",
    name: "Luxure De Eden",
    tagline: "Modern Luxury. Enduring Elegance.",
    url: "luxuredeeden.com",
    imageSrc: "/luxure-preview-v2.png",
    imageAlt: "Luxure De Eden website",
    logo: "/luxure-logo.png",
    aspectRatio: "1892/952",
    description:
      "Luxure De Eden is a contemporary luxury fragrance house creating refined perfumes inspired by craftsmanship, artistic expression and timeless sophistication. Every collection is designed to deliver an immersive sensory experience while celebrating modern luxury with enduring character.",
    cta: "Explore Luxure De Eden →",
    href: "/#contact",
  },
];

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
  const cx = -(cardW / 2);
  const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
  const sideRotate = isSmall ? 24 : 44;
  const sideOpacity = isSmall ? 0.35 : 0.55;
  if (offset === 0)
    return { x: cx, rotateY: 0, scale: 1, opacity: 1, zIndex: 10 };
  if (offset === -1)
    return {
      x: cx - sideOffset,
      rotateY: sideRotate,
      scale: 0.8,
      opacity: sideOpacity,
      zIndex: 5,
    };
  if (offset === 1)
    return {
      x: cx + sideOffset,
      rotateY: -sideRotate,
      scale: 0.8,
      opacity: sideOpacity,
      zIndex: 5,
    };
  return { x: cx, rotateY: 0, scale: 0.65, opacity: 0, zIndex: 0 };
}

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const [dims, setDims] = useState({ cardW: 400, sideOffset: 300 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setDims({ cardW: Math.max(240, Math.min(w - 48, 280)), sideOffset: Math.max(100, Math.min((w - 48) * 0.48, 140)) });
      else if (w < 640) setDims({ cardW: 300, sideOffset: 180 });
      else if (w < 1024) setDims({ cardW: 340, sideOffset: 240 });
      else setDims({ cardW: 400, sideOffset: 310 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % VENTURES.length),
      AUTO_MS
    );
    return () => clearInterval(t);
  }, [paused, active]);

  const { cardW, sideOffset } = dims;
  const carouselH = Math.round(cardW * (952 / 1892) + 32 + 52);
  const v = VENTURES[active];

  return (
    <section
      id="companies"
      className="section-y bg-surface overflow-hidden border-t border-surface-line"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
            THE BRAHM GROUP
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
            Building Institutions <span className="italic font-normal text-accent">That Endure.</span>
          </h2>
          <p className="text-base md:text-lg text-ink-muted font-light leading-relaxed">
            Every company within BRAHM Global Holdings is established with a distinct purpose, independent identity and long-term ambition. Together they represent our commitment to creating enduring enterprises capable of shaping industries, advancing technology and creating lasting value for generations.
          </p>
        </motion.div>

        {/* ── 3-D Carousel ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
        >
          <div
            className="relative w-full"
            style={{ height: carouselH, perspective: 1300 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
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
                      "w-full rounded-xl overflow-hidden border bg-surface transition-colors duration-500",
                      isCenter
                        ? "border-accent/40 shadow-[0_24px_72px_-20px_rgba(0,0,0,0.2)]"
                        : "border-surface-line cursor-pointer",
                    ].join(" ")}
                  >
                    {/* Browser chrome */}
                    <div className="h-8 bg-surface-high flex items-center gap-3 px-3 border-b border-surface-line">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`w-2 h-2 rounded-full ${isCenter ? "bg-[#FF5F57]" : "bg-ink-faint/20"}`} />
                        <span className={`w-2 h-2 rounded-full ${isCenter ? "bg-[#FEBC2E]" : "bg-ink-faint/20"}`} />
                        <span className={`w-2 h-2 rounded-full ${isCenter ? "bg-[#28C840]" : "bg-ink-faint/20"}`} />
                      </div>
                      <div className="flex-1 h-5 rounded bg-surface/70 border border-surface-line/40 flex items-center px-2 gap-1.5 overflow-hidden">
                        <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                        <span className="text-[8px] font-mono-ui text-ink-faint/60 truncate tracking-wide">
                          {venture.url}
                        </span>
                      </div>
                    </div>

                    {/* Screenshot / gradient panel */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: venture.aspectRatio }}
                    >
                      {venture.variant === "gradient" ? (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                          style={{
                            background:
                              "linear-gradient(160deg, #04070D 0%, #071520 55%, #1F5C43 130%)",
                          }}
                        >
                          <span className="font-display italic text-2xl md:text-3xl tracking-[0.08em] text-[#38BDF8] mb-1">
                            ENIF
                          </span>
                          <span className="font-mono-ui text-[9px] uppercase tracking-[0.2em] text-white/70">
                            Engineering & AI Division
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={venture.imageSrc!}
                          alt={venture.imageAlt}
                          fill
                          sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 400px"
                          className="object-cover object-top"
                          loading="eager"
                        />
                      )}
                      {!isCenter && <div className="absolute inset-0 bg-ink/15" />}
                    </div>

                    {/* Label strip */}
                    <div className="px-3 py-3 flex items-center gap-2.5 border-t border-surface-line">
                      {venture.logo ? (
                        <img
                          src={venture.logo}
                          alt=""
                          className="h-5 w-auto object-contain shrink-0 rounded-sm opacity-90"
                          loading="eager"
                        />
                      ) : (
                        <span className="h-5 w-5 shrink-0 rounded-sm bg-accent flex items-center justify-center font-mono-ui text-[9px] text-surface font-bold">
                          E
                        </span>
                      )}
                      <span className="text-xs font-display text-ink truncate font-medium">
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
                className="flex flex-col items-center gap-3 max-w-xl"
              >
                {/* Sector Tag */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-[11px] font-mono-ui uppercase tracking-[0.2em] text-accent font-semibold">
                    {v.tag}
                  </span>
                </div>

                {/* Name & Tagline */}
                <h3 className="font-display text-2xl md:text-4xl text-ink">
                  {v.name}
                </h3>
                <p className="font-display italic text-lg text-accent font-light">
                  &ldquo;{v.tagline}&rdquo;
                </p>

                <div className="h-px w-10 bg-accent/30 my-1" />

                {/* Description */}
                <p className="text-sm text-ink-muted leading-relaxed font-light">
                  {v.description}
                </p>

                {/* CTA */}
                <Link
                  href={v.href}
                  className="relative inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-[0.15em] text-accent font-bold mt-2 group/cta w-fit"
                >
                  {v.cta}
                  <Icon
                    name="arrow-up-right"
                    size={14}
                    className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                  <span className="absolute bottom-0 left-0 h-px w-full bg-accent scale-x-0 origin-left group-hover/cta:scale-x-100 transition-transform duration-300" />
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
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "w-8 h-2 bg-accent shadow-sm"
                      : "w-2.5 h-2.5 bg-ink-muted/30 hover:bg-accent/60",
                  ].join(" ")}
                  aria-label={`Go to ${VENTURES[i].name}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Closing Statement Banner ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-20 p-8 md:p-10 rounded-2xl border border-accent/20 bg-accent/5 text-center max-w-4xl mx-auto"
        >
          <span className="font-mono-ui text-xs text-accent uppercase tracking-[0.2em] block mb-3 font-semibold">
            Group Governance & Ownership
          </span>
          <h4 className="font-display text-2xl md:text-3xl text-ink mb-4">
            One Group. Five Companies. <span className="italic font-normal text-accent">One Enduring Standard.</span>
          </h4>
          <p className="text-sm md:text-base text-ink-muted font-light leading-relaxed max-w-2xl mx-auto">
            Although each company serves a different industry, every enterprise within BRAHM Global Holdings is created with the same ambition—to build organisations defined by exceptional quality, disciplined execution and enduring value.
          </p>
        </motion.div>

      </div>
    </section>
  );
}