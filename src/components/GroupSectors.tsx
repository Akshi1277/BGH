"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const SECTORS = [
  {
    index: "01",
    shortName: "Technology",
    title: "Technology",
    description: "Building intelligent software and digital infrastructure.",
    image: "/images/sectors/tech.png",
  },
  {
    index: "02",
    shortName: "Artificial Intelligence",
    title: "Artificial Intelligence",
    description: "Data architectures and predictive models designed to unlock insights.",
    image: "/images/sectors/ai.png",
  },
  {
    index: "03",
    shortName: "Digital Commerce",
    title: "Digital Commerce",
    description: "Commercial infrastructure for global scale.",
    image: "/images/sectors/commerce.png",
  },
  {
    index: "04",
    shortName: "Sports & Media",
    title: "Sports & Media",
    description: "Digital competition, talent and entertainment.",
    image: "/images/sectors/sports.png",
  },
  {
    index: "05",
    shortName: "Education",
    title: "Education",
    description: "Global learning platforms for the next generation.",
    image: "/images/sectors/education.png",
  },
  {
    index: "06",
    shortName: "Hospitality",
    title: "Hospitality",
    description: "Premium concepts combining design, service and experience.",
    image: "/images/sectors/hospitality.png",
  },
  {
    index: "07",
    shortName: "Luxury Brands",
    title: "Luxury Brands",
    description: "Refined fragrance and lifestyle collections.",
    image: "/images/sectors/luxury.png",
  },
  {
    index: "08",
    shortName: "Future Ventures",
    title: "Future Ventures",
    description: "Incubating tomorrow's most ambitious ideas and markets.",
    image: "/images/sectors/future.png",
  },
];

export default function GroupSectors() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll mobile carousel to active sector when pill tab is tapped
  const handleSelectSector = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current && window.innerWidth < 768) {
      const cardElement = carouselRef.current.children[index] as HTMLElement;
      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section id="sectors" className="section-y bg-surface relative border-y border-surface-line/40">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="max-w-[65ch] mb-10 md:mb-16">
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

        {/* Mobile Quick Selector Pill Bar (Visible on < md screens) */}
        <div className="md:hidden mb-6 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 min-w-max">
            {SECTORS.map((sector, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={sector.index}
                  onClick={() => handleSelectSector(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono-ui font-medium transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "bg-accent text-white border-accent shadow-sm"
                      : "bg-paper text-ink-muted border-surface-line hover:border-accent/40"
                  }`}
                >
                  <span className={isActive ? "text-emerald-300" : "text-accent font-semibold"}>
                    {sector.index}
                  </span>
                  <span>{sector.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Container: Horizontal Snap Carousel on Mobile (<768px), Grid on Desktop (>=768px) */}
        <motion.div
          ref={carouselRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-5 md:gap-6 pb-6 md:pb-0 scrollbar-none md:grid-cols-2 lg:grid-cols-4"
        >
          {SECTORS.map((sector, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={sector.index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`snap-center min-w-[85vw] sm:min-w-[340px] md:min-w-0 flex-1 bg-transparent border-t border-b border-surface-line p-8 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[280px] group relative overflow-hidden transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "border-ink bg-surface-soft"
                    : "hover:border-ink/50 hover:bg-surface-soft"
                }`}
              >
                {/* Purely typographic card, no images or vignettes */}

                {/* Accent Left Border Indicator */}
                {/* <span
                  className={`absolute left-0 top-0 h-full w-[3px] bg-accent origin-bottom transition-transform duration-500 ease-out z-20 ${
                    isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                  }`}
                /> */}

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full gap-8">
                  {/* Top Row: Index + Clean Animated Arrow */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono-ui text-[11px] uppercase tracking-widest font-semibold transition-colors duration-300 ${
                        isActive ? "text-emerald-400" : "text-accent group-hover:text-emerald-400"
                      }`}
                    >
                      {sector.index}
                    </span>
                    <span
                      className={`transition-all duration-500 transform ${
                        isActive
                          ? "text-white/80 translate-x-0"
                          : "text-ink-muted/0 group-hover:text-white/80 translate-x-2 group-hover:translate-x-0"
                      }`}
                    >
                      {/* <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg> */}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <div>
                    <h3
                      className={`font-display text-2xl mb-3 transition-colors duration-300 text-ink`}
                    >
                      {sector.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed font-light transition-colors duration-300 text-ink-muted`}
                    >
                      {sector.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Page Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
          {SECTORS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSector(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-surface-line"
              }`}
              aria-label={`Go to sector ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
