"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const SECTORS = [
  {
    index: "01",
    title: "Technology & Artificial Intelligence",
    description: "Building intelligent software and digital infrastructure.",
    image: "/images/sectors/tech.png",
  },
  {
    index: "02",
    title: "Sports & Media",
    description: "Digital competition, talent and entertainment.",
    image: "/images/sectors/sports.png",
  },
  {
    index: "03",
    title: "Education",
    description: "Global learning platforms for the next generation.",
    image: "/images/sectors/education.png",
  },
  {
    index: "04",
    title: "Hospitality",
    description: "Premium concepts combining design, service and experience.",
    image: "/images/sectors/hospitality.png",
  },
  {
    index: "05",
    title: "Luxury Consumer Brands",
    description: "Refined fragrance and lifestyle collections.",
    image: "/images/sectors/luxury.png",
  },
  {
    index: "06",
    title: "Digital Commerce",
    description: "Commercial infrastructure for global scale.",
    image: "/images/sectors/commerce.png",
  },
];

export default function GroupSectors() {
  return (
    <section id="sectors" className="section-y bg-surface relative border-y border-surface-line/40">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Clean Stacked Header (Headline + max-65ch body for optimal typography readability) */}
        <div className="max-w-[65ch] mb-12 md:mb-16">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            THE BRAHM GROUP
          </motion.span>
          
          <motion.h2
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
          >
            Group <span className="italic font-normal text-accent">Sectors</span>.
          </motion.h2>

          <motion.p
            className="text-lede text-ink-muted font-light leading-relaxed"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            Our companies operate independently while benefiting from the strategic direction, governance, technology capabilities and operational expertise of the Group.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SECTORS.map((sector) => (
            <motion.div
              key={sector.index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="bg-surface rounded-2xl border border-surface-line/80 hover:border-accent/50 p-8 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[280px] group relative overflow-hidden transition-all duration-500 hover:shadow-xl shadow-sm cursor-pointer"
            >
              {/* Hover Background Image Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none z-0">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                {/* Dark Vignette Overlay for maximum text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/40" />
              </div>

              {/* Accent Left Border Indicator */}
              <span className="absolute left-0 top-0 h-full w-[3px] bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-20" />

              {/* Content Layer (elevated above hover image) */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono-ui text-[11px] uppercase tracking-widest text-accent group-hover:text-emerald-400 transition-colors duration-300 font-semibold">
                    {sector.index}
                  </span>
                  <span className="text-white/0 group-hover:text-white/80 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl text-ink group-hover:text-white transition-colors duration-300 mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-ink-muted group-hover:text-zinc-200 transition-colors duration-300 leading-relaxed font-light">
                    {sector.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

