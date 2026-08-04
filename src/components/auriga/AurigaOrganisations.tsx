"use client";

import React from "react";
import { AURIGA_DATA } from "@/data/auriga";
import Icon from "../Icon";

export default function AurigaOrganisations() {
  const { title, subtitle, content, list, footer } = AURIGA_DATA.organisations;

  return (
    <section id="organisations" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] border-b border-white/5 relative">
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row gap-16 lg:gap-32">
        
        {/* Title Area */}
        <div className="md:w-1/3">
          <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-6 block">
            {title}
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium leading-tight text-white mb-6">
            {subtitle}
          </h2>
          <p className="max-w-[65ch] text-xl text-white/60 font-sans leading-relaxed mb-16">
            {content}
          </p>
        </div>

        {/* List Area */}
        <div className="md:w-2/3 flex flex-col justify-between">
          
          <ul className="space-y-6 mb-16">
            {list.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 pb-6 border-b border-white/10 last:border-b-0">
                <span className="mt-1">
                  <Icon name="diamond" size={20} className="text-[#E0115F]" />
                </span>
                <span className="text-xl md:text-2xl font-display font-medium text-white/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="font-sans font-semibold text-sm tracking-widest uppercase text-white/50 bg-white/[0.02] p-6 border border-white/5 inline-block">
            {footer.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== footer.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
