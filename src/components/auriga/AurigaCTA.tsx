"use client";

import React, { useState } from "react";
import { AURIGA_DATA } from "@/data/auriga";
import Icon from "../Icon";

export default function AurigaCTA() {
  const { title, headline, content, button } = AURIGA_DATA.cta;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#04070D] text-[#F8FAFC] relative overflow-hidden">
      
      {/* Red Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-[#E0115F]/10 blur-[150px] pointer-events-none rounded-t-[100%]" />

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
        
        <span className="font-sans font-semibold text-[#E0115F] text-xs tracking-widest uppercase mb-6 block">
          {title}
        </span>
        
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-medium leading-[1.1] mb-8">
          {headline}
        </h2>
        
        <p className="max-w-[65ch] text-xl text-white/60 font-sans mb-16 mx-auto leading-relaxed">
          {content}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans font-semibold text-xs text-white/50 tracking-widest uppercase ml-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#E0115F] focus:outline-none transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans font-semibold text-xs text-white/50 tracking-widest uppercase ml-1 block">Organisation</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#E0115F] focus:outline-none transition-colors"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-sans font-semibold text-xs text-white/50 tracking-widest uppercase ml-1 block">Corporate Email</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/30 focus:border-[#E0115F] focus:outline-none transition-colors"
                placeholder="jane@company.com"
              />
            </div>
            
            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center px-8 py-5 mt-4 bg-[#E0115F] text-white font-sans text-sm tracking-widest font-semibold uppercase hover:bg-[#B80E4D] transition-all duration-300 shadow-[0_0_30px_rgba(255,45,85,0.3)] hover:shadow-[0_0_50px_rgba(255,45,85,0.5)]"
            >
              <span>{button}</span>
              <span className="ml-3 group-hover:translate-x-1 transition-transform">
                <Icon name="arrow-right" size={16} />
              </span>
            </button>
          </form>
        ) : (
          <div className="max-w-xl mx-auto bg-white/5 border border-[#E0115F]/30 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#E0115F]/10 flex items-center justify-center text-[#E0115F] mb-6 shadow-[0_0_30px_rgba(255,45,85,0.2)]">
              <Icon name="diamond" size={32} />
            </div>
            <h3 className="text-2xl font-display font-medium text-white mb-2">Request Received</h3>
            <p className="text-white/60">
              A managing director from 7AURIGA will contact you shortly to arrange a private consultation.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
