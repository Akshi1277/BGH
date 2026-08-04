"use client";

import React from "react";
import { AURIGA_DATA } from "@/data/auriga";

export default function AurigaAbout() {
  const { title, headline, content, tag } = AURIGA_DATA.whoWeAre;

  return (
    <section id="who-we-are" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] border-b border-white/5 relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E0115F]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Sticky Header */}
          <div className="lg:col-span-5 flex flex-col items-start relative">
            <div className="sticky top-32">
              <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-6 block">
                {title}
              </span>
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-medium leading-[1.1] mb-6">
                {headline}
              </h2>
              <div className="hidden lg:block w-12 h-[2px] bg-[#E0115F] mt-10"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            <div className="max-w-[65ch] space-y-8 text-lg md:text-xl text-white/60 font-sans leading-relaxed">
              {content.split("\n\n").map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-2xl text-white font-display leading-tight" : ""}>
                  {para.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== para.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#E0115F]"></span>
              <span className="font-sans font-semibold text-sm tracking-widest uppercase text-white/80">
                {tag}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
