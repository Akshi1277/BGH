"use client";

import React from "react";
import { AURIGA_DATA } from "@/data/auriga";

export default function AurigaStandard() {
  const { title, content } = AURIGA_DATA.standard;

  return (
    <section id="standard" className="py-24 md:py-32 bg-[#04070D] text-white relative border-y border-[#E0115F]/10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0115F]/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-center text-center">
        <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-[0.2em] uppercase mb-12 block">
          {title}
        </span>

        <div className="space-y-10 text-[clamp(1.5rem,3vw,2.5rem)] font-display font-light leading-snug text-[#F8FAFC]/90">
          {content.split("\n\n").map((para, i) => (
            <p key={i}>
              {para.split("\n").map((line, j) => (
                <React.Fragment key={j}>
                  {line}
                  {j !== para.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
