"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Icon, { IconName } from "./Icon";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full rounded-md overflow-hidden border border-ink-line bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] group-hover:-translate-y-1 group-hover:border-gold/30 transition-all duration-500">
      <div className="h-7 bg-ink-high flex items-center gap-1.5 px-3 border-b border-ink-line">
        <span className="w-2 h-2 rounded-full bg-cream-faint/40" />
        <span className="w-2 h-2 rounded-full bg-cream-faint/40" />
        <span className="w-2 h-2 rounded-full bg-cream-faint/40" />
      </div>
      <div className="relative w-full aspect-[2/1]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function CraftedPanel({
  icon,
  wordmark,
}: {
  icon: IconName;
  wordmark: string;
}) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden border border-ink-line bg-gradient-to-br from-ink-high to-ink flex flex-col items-center justify-center gap-4 group-hover:-translate-y-1 group-hover:border-gold/30 transition-all duration-500">
      <div className="absolute inset-0 glow-gold opacity-60" />
      <Icon name={icon} size={28} className="text-gold relative z-10" />
      <span className="font-display italic text-2xl text-cream relative z-10">
        {wordmark}
      </span>
    </div>
  );
}

const VENTURES = [
  {
    tag: "Sports Tech",
    name: "TPL",
    span: "lg:col-span-4",
    description:
      "Talent Pro League — the UK's football league management platform, built to run competitions, teams, and player development at scale.",
    cta: "Explore Solution",
    visual: <BrowserFrame src="/tpl-preview.png" alt="Talent Pro League dashboard" />,
  },
  {
    tag: "EdTech",
    name: "LSA",
    span: "lg:col-span-2",
    description:
      "A school and homeschooling management platform giving educators, parents, and administrators one AI-powered home for learning.",
    cta: "View Platform",
    visual: <BrowserFrame src="/lsa-preview.png" alt="LSA school dashboard" />,
  },
  {
    tag: "Luxury Goods",
    name: "Luxure De Eden",
    span: "lg:col-span-2",
    description:
      "A fragrance house built on heritage craftsmanship and modern brand experience — from concept to commerce.",
    cta: "Discover Fragrances",
    visual: <CraftedPanel icon="droplet" wordmark="Luxure De Eden" />,
  },
  {
    tag: "Hospitality Tech",
    name: "Alayn",
    span: "lg:col-span-4",
    description:
      "A modern operating system for cafés and restaurants — orders, inventory, and guest experience, unified into one platform.",
    cta: "Learn More",
    visual: <CraftedPanel icon="cup" wordmark="Alayn" />,
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-y bg-ink">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <span className="text-eyebrow font-mono-ui text-gold block mb-5">
            Our Portfolio
          </span>
          <h2 className="font-display text-display text-cream">
            Four ventures. <span className="italic text-gold">One</span>{" "}
            standard.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-6 gap-6"
        >
          {VENTURES.map((v) => (
            <motion.div
              key={v.name}
              variants={item}
              className={`${v.span} group flex flex-col gap-6`}
            >
              {v.visual}
              <div className="flex flex-col gap-3 px-1">
                <span className="text-[11px] font-mono-ui uppercase tracking-[0.2em] text-cream-faint">
                  {v.tag}
                </span>
                <h3 className="font-display text-2xl text-cream">
                  {v.name}
                </h3>
                <p className="text-sm text-cream-muted leading-relaxed max-w-md">
                  {v.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-[0.15em] text-gold mt-2 group-hover:gap-3 transition-all"
                >
                  {v.cta}
                  <Icon name="arrow-up-right" size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
