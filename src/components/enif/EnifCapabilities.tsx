"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  Terminal, BrainCircuit, Layers, Server,
  Workflow, Wrench, Boxes, Database, LineChart, Cpu,
  LayoutTemplate, Maximize2, Network, Cloud, GitMerge, ShieldCheck
} from "lucide-react";

const springEase = [0.23, 1, 0.32, 1] as const;
const slowEase = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  {
    index: "01",
    tag: "Software",
    title: "Software Engineering",
    shortline: "Custom enterprise applications engineered for absolute reliability.",
    description: "We build bespoke software systems designed to eliminate operational friction and map perfectly to your unique business logic. From process digitisation to core system modernization, our solutions are resilient, highly scalable, and structurally sound.",
    items: [
      { text: "Process Digitisation", icon: Workflow },
      { text: "Operational Tools", icon: Wrench },
      { text: "Core Business Systems", icon: Boxes }
    ],
    glowColor: "bg-[#38BDF8]",
    cardIcon: Terminal
  },
  {
    index: "02",
    tag: "AI & Data",
    title: "Artificial Intelligence",
    shortline: "Data architectures and predictive models at scale.",
    description: "Unlock the latent value in your proprietary data. We architect intelligent systems and deploy predictive models designed to automate complex workflows, uncover deep operational insights, and drive algorithmic decision making.",
    items: [
      { text: "Data Architecture", icon: Database },
      { text: "Predictive Modelling", icon: LineChart },
      { text: "Workflow Automation", icon: Cpu }
    ],
    glowColor: "bg-[#818CF8]",
    cardIcon: BrainCircuit
  },
  {
    index: "03",
    tag: "Platforms",
    title: "Digital Platforms",
    shortline: "Scalable B2B and consumer ecosystem platforms.",
    description: "We engineer scalable platforms built for high-performance and zero downtime under immense load. Designed for both massive consumer reach and intricate B2B ecosystems with complex multi-tenant architectures.",
    items: [
      { text: "Platform Architecture", icon: LayoutTemplate },
      { text: "Scalability", icon: Maximize2 },
      { text: "B2B Ecosystems", icon: Network }
    ],
    glowColor: "bg-[#F472B6]",
    cardIcon: Layers
  },
  {
    index: "04",
    tag: "Infrastructure",
    title: "Cloud & Infrastructure",
    shortline: "Secure, highly available deployment environments.",
    description: "Mission-critical applications require an ironclad foundation. We design secure, highly available environments architected for maximum uptime, horizontal scalability, and zero-trust security compliance.",
    items: [
      { text: "Cloud Architecture", icon: Cloud },
      { text: "DevOps Pipelines", icon: GitMerge },
      { text: "Zero-Trust Security", icon: ShieldCheck }
    ],
    glowColor: "bg-[#34D399]",
    cardIcon: Server
  },
];

export default function EnifCapabilities() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (isHovering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAPABILITIES.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovering]);

  const activeCap = CAPABILITIES[activeIndex];
  const ActiveIcon = activeCap.cardIcon;

  return (
    <section 
      id="capabilities" 
      className="py-24 md:py-32 lg:py-40 bg-[#0F172A] relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0F172A] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#1E293B] to-transparent opacity-50 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-16 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: slowEase }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#38BDF8]/40" />
              <span className="text-[#38BDF8] font-mono text-xs tracking-[0.2em] uppercase font-semibold">Capabilities</span>
            </div>
            <h2 className="font-tech-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-[-0.025em] max-w-2xl">
              Institutional-Grade Engineering
            </h2>
          </div>
          <p className="text-[#94A3B8] text-base md:text-lg max-w-md leading-relaxed font-light">
            We architect, engineer, and scale complex technical systems for global enterprises.
          </p>
        </motion.div>

        {/* Interactive Showcase Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Triggers (Tabs) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 relative z-20">
            <div className="hidden lg:block absolute left-[15px] top-4 bottom-4 w-px bg-white/[0.05]" />
            
            {CAPABILITIES.map((cap, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={cap.index}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative flex flex-col items-start text-left pl-6 lg:pl-12 py-4 transition-all duration-500 outline-none"
                >
                  {/* Active Indicator Line */}
                  <div 
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-500 ${
                      isActive 
                        ? `h-full ${cap.glowColor} opacity-100` 
                        : 'h-0 bg-white/20 opacity-0 group-hover:h-8 group-hover:opacity-50'
                    }`} 
                  />

                  <div className="flex items-center gap-4 mb-2">
                    <span className={`font-mono text-xs tracking-widest font-bold transition-colors duration-500 ${isActive ? 'text-[#38BDF8]' : 'text-white/30 group-hover:text-white/60'}`}>
                      {cap.index}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-500 border ${isActive ? 'bg-white/10 text-white/90 border-white/20' : 'bg-transparent text-white/30 border-white/10 group-hover:border-white/20 group-hover:text-white/60'}`}>
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className={`font-tech-display text-2xl sm:text-3xl lg:text-4xl leading-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                    {cap.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Stage */}
          <div className="w-full lg:w-2/3 relative min-h-[460px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)', position: 'absolute' }}
                transition={{ duration: 0.5, ease: springEase }}
                className="w-full h-full bg-[#0F172A]/80 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] border border-[#334155]/60 p-8 sm:p-12 lg:p-16 relative overflow-hidden group"
              >
                
                {/* Immersive Background Glows */}
                <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full ${activeCap.glowColor} opacity-[0.04] blur-[80px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-[0.08]`} />
                <div className={`absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full ${activeCap.glowColor} opacity-[0.03] blur-[60px] pointer-events-none`} />

                {/* Massive Architectural Icon Watermark */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[20%] text-white/[0.02] transition-transform duration-1000 ease-out group-hover:-translate-x-4 pointer-events-none">
                  <ActiveIcon size={400} strokeWidth={0.5} />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-xl h-full flex flex-col justify-center">
                  <h4 className="font-tech-display text-3xl sm:text-4xl lg:text-5xl text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-6">
                    {activeCap.shortline}
                  </h4>
                  
                  <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed mb-10 font-light">
                    {activeCap.description}
                  </p>

                  <div className="space-y-4">
                    <p className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase font-bold">Key Outcomes & Deliverables</p>
                    <div className="flex flex-wrap gap-3">
                      {activeCap.items.map((item, idx) => {
                        const ItemIcon = item.icon;
                        // Extract hex color from the Tailwind class (e.g., bg-[#38BDF8] -> #38BDF8)
                        const iconColor = activeCap.glowColor.replace('bg-[', '').replace(']', '');
                        
                        return (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 pr-6 py-1"
                          >
                            <ItemIcon size={14} color={iconColor} strokeWidth={2} />
                            <span className="text-[#94A3B8] font-mono text-[10px] sm:text-[11px] tracking-widest uppercase">
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
