"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

interface SectorItem {
  index: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  focusAreas: string[];
}

const SECTORS: SectorItem[] = [
  {
    index: "01",
    title: "Technology",
    summary: "Intelligent software and digital infrastructure.",
    description:
      "Developing foundational software systems, cloud architectures, and enterprise technologies designed for long-term scalability and operational reliability.",
    image: "/images/sectors/tech.png",
    focusAreas: ["Enterprise Software", "Cloud Infrastructure", "Digital Security"],
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    summary: "Data architectures and predictive models.",
    description:
      "Deploying intelligent data systems and machine learning models that optimize operational decision-making and automate complex workflows.",
    image: "/images/sectors/ai.png",
    focusAreas: ["Machine Learning", "Predictive Analytics", "Data Engineering"],
  },
  {
    index: "03",
    title: "Digital Commerce",
    summary: "Commercial infrastructure for global scale.",
    description:
      "Building transaction systems, merchant networks, and digital marketplace infrastructure that enable brands to expand internationally.",
    image: "/images/sectors/commerce.png",
    focusAreas: ["Global Marketplaces", "Transaction Platforms", "Fulfillment Tech"],
  },
  {
    index: "04",
    title: "Sports & Media",
    summary: "Digital competition, talent, and entertainment.",
    description:
      "Investing in modern sports platforms, broadcast media rights, digital tournament formats, and talent platforms engaging global audiences.",
    image: "/images/sectors/sports.png",
    focusAreas: ["Digital Broadcasting", "Tournament Platforms", "Media Production"],
  },
  {
    index: "05",
    title: "Education",
    summary: "Global learning platforms.",
    description:
      "Building accessible learning environments and institutional platforms that provide specialized skills and professional accreditation.",
    image: "/images/sectors/education.png",
    focusAreas: ["EdTech Infrastructure", "Skill Accreditation", "Lifelong Learning"],
  },
  {
    index: "06",
    title: "Hospitality",
    summary: "Concepts combining design, service, and experience.",
    description:
      "Creating curated hospitality destinations and dining concepts where architectural craft meets exceptional service and digital convenience.",
    image: "/images/sectors/hospitality.png",
    focusAreas: ["Boutique Destinations", "Culinary Concepts", "Guest Experience"],
  },
  {
    index: "07",
    title: "Luxury Brands",
    summary: "Refined fragrance and artisanal craft.",
    description:
      "Developing luxury houses focused on fine perfumery, bespoke craftsmanship, and lifestyle goods built on timeless aesthetic standards.",
    image: "/images/sectors/luxury.png",
    focusAreas: ["Haute Perfumery", "Artisanal Craft", "Bespoke Design"],
  },
  {
    index: "08",
    title: "Future Ventures",
    summary: "Incubating ambitious ideas and markets.",
    description:
      "Allocating capital and strategic resources to high-impact technologies, clean energy solutions, and emerging sectors reshaping the global economy.",
    image: "/images/sectors/future.png",
    focusAreas: ["Frontier Science", "Clean Technologies", "Strategic Capital"],
  },
];

export default function GroupSectors() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeSector = SECTORS[activeIndex];

  return (
    <section
      id="sectors"
      className="section-y bg-surface text-ink border-y border-surface-line/50 relative overflow-hidden"
    >
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Header - Refined Typography */}
        <div className="max-w-2xl mb-12">
          <motion.span
            className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
          >
            THE BRAHM GROUP
          </motion.span>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-4 tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
          >
            Group <span className="italic font-normal text-accent">Sectors</span>.
          </motion.h2>
          <motion.p
            className="text-ink-muted font-light leading-relaxed text-sm sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            Our companies operate independently while benefiting from the strategic direction, governance, technology capabilities and operational expertise of the Group.
          </motion.p>
        </div>

        {/* Desktop Fixed-Height Tabbed Gallery (lg and up) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch h-[540px]">
          
          {/* Left Column: Tab List */}
          <div className="col-span-4 flex flex-col border-t border-surface-line/70">
            {SECTORS.map((sector, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={sector.index}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 flex items-center gap-6 px-6 border-b border-surface-line/70 text-left transition-all duration-300 relative ${
                    isActive ? "bg-paper shadow-sm" : "hover:bg-surface-soft"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSectorIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  
                  <span
                    className={`font-mono-ui text-xs tracking-wider transition-colors duration-300 ${
                      isActive ? "text-accent font-medium" : "text-ink-faint"
                    }`}
                  >
                    {sector.index}
                  </span>
                  <span
                    className={`font-display text-lg tracking-wide transition-colors duration-300 ${
                      isActive ? "text-ink font-normal" : "text-ink-muted"
                    }`}
                  >
                    {sector.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dedicated Stage */}
          <div className="col-span-8 relative rounded-xl border border-surface-line/70 overflow-hidden bg-paper shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 flex"
              >
                {/* Content Half */}
                <div className="w-1/2 p-10 flex flex-col justify-center border-r border-surface-line/50 relative z-10 bg-paper">
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono-ui text-xs text-accent tracking-widest uppercase mb-3 block">
                        Sector {activeSector.index}
                      </span>
                      <h3 className="font-display text-2xl text-ink leading-tight">
                        {activeSector.summary}
                      </h3>
                    </div>
                    
                    <div className="h-px w-8 bg-surface-line" />
                    
                    <p className="text-sm text-ink-muted font-light leading-relaxed">
                      {activeSector.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] font-mono-ui uppercase tracking-widest text-ink-muted block mb-3 font-medium">
                        Core Capabilities
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeSector.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1.5 rounded-full border border-surface-line text-[11px] font-mono-ui text-ink bg-surface shadow-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Half */}
                <div className="w-1/2 relative bg-surface">
                  <Image
                    src={activeSector.image}
                    alt={activeSector.title}
                    fill
                    priority
                    className="object-cover object-center filter brightness-[0.9] contrast-[1.05]"
                  />
                  {/* Subtle vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/5" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Snap Scroll (<1024px) */}
        <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-margin-mobile px-margin-mobile hide-scrollbar">
          {SECTORS.map((sector) => (
            <div
              key={sector.index}
              className="w-[85vw] sm:w-[50vw] shrink-0 snap-center relative rounded-xl border border-surface-line overflow-hidden bg-paper shadow-sm flex flex-col"
            >
              <div className="relative h-48 w-full border-b border-surface-line/50">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover filter brightness-[0.9]"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono-ui text-[10px] text-accent tracking-widest">
                    {sector.index}
                  </span>
                  <h3 className="font-display text-xl text-ink">
                    {sector.title}
                  </h3>
                </div>
                <p className="text-sm text-ink-muted font-light line-clamp-3">
                  {sector.description}
                </p>
                <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                  {sector.focusAreas.slice(0, 2).map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-full border border-surface-line text-[10px] font-mono-ui text-ink bg-surface shadow-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
