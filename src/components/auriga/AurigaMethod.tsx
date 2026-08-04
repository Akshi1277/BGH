"use client";

import React from "react";
import { AURIGA_DATA } from "@/data/auriga";

export default function AurigaMethod() {
  const { howWeWork, philosophy } = AURIGA_DATA;

  return (
    <section id="how-we-work" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] border-b border-white/5 relative">
      
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* How We Work Block */}
          <div>
            <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-6 block">
              {howWeWork.title}
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium leading-tight mb-8">
              {howWeWork.subtitle}
            </h2>
            <div className="max-w-[65ch] space-y-6 text-lg text-white/60 font-sans leading-relaxed">
              {howWeWork.content.split("\n\n").map((para, idx) => (
                <p key={idx} className={idx === 1 ? "pl-6 border-l-2 border-[#E0115F] text-white" : ""}>
                  {para.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== para.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Philosophy Block */}
          <div>
            <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-6 block">
              {philosophy.title}
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium leading-tight mb-8">
              {philosophy.subtitle}
            </h2>
            <div className="max-w-[65ch] space-y-6 text-lg text-white/60 font-sans leading-relaxed">
              {philosophy.content.split("\n\n").map((para, idx) => (
                <p key={idx}>
                  {para.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== para.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
