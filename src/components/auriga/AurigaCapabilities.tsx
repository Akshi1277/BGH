"use client";

import React from "react";
import { AURIGA_DATA } from "@/data/auriga";
import Icon from "../Icon";

export default function AurigaCapabilities() {
  const { title, subtitle, pillars } = AURIGA_DATA.capabilities;

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] border-b border-white/5 relative">
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-4 block">
            {title}
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-medium leading-[1.1] max-w-2xl">
            {subtitle}
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="group flex flex-col items-start border-t border-white/10 pt-8 hover:border-[#E0115F]/50 transition-colors duration-300">
              
              <div className="flex items-center gap-4 mb-6">
                <span className="font-sans font-semibold text-sm tracking-widest text-[#E0115F]">
                  {pillar.number}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-medium">
                  {pillar.title}
                </h3>
              </div>

              <div className="max-w-[65ch] space-y-4 text-white/60 font-sans">
                <p className="text-lg text-white font-medium">
                  {pillar.tagline}
                </p>
                <p className="leading-relaxed">
                  {pillar.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
