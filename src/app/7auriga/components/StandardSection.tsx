'use client';

import React, { useEffect, useRef } from 'react';

const standardLines = [
  'Has the organisation become more respected?',
  'More trusted?',
  'More distinctive?',
  'Better positioned for the future?',
];

const howWeWorkItems = [
  { label: 'Understand before advising.', sub: 'Think before creating.' },
  { label: 'Refine before releasing.', sub: 'Quality is never accidental. It is the consequence of discipline, judgement and uncompromising attention to detail.' },
  { label: 'We do not pursue attention.', sub: 'We build recognition.' },
  { label: 'We do not create noise.', sub: 'We establish clarity.' },
  { label: 'We do not chase trends.', sub: 'We create work designed to remain relevant for years to come.' },
];

export default function StandardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -5% 0px' }
    );

    const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="standard"
      ref={sectionRef}
      className="relative bg-[#0D0B0B] text-[#FAF7F5] section-divider py-24 md:py-32 overflow-hidden"
    >
      {/* Giant watermark */}
      <div className="absolute top-12 left-6 md:left-12 z-0 opacity-[0.04] font-sans font-extrabold text-[6rem] md:text-[9rem] leading-none text-[#FAF7F5] pointer-events-none select-none tracking-tighter">
        04
      </div>
      {/* Atmospheric ruby orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#9B1C2E] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          className="animate-on-scroll opacity-100 mb-20"
          style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-[#9B1C2E]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
              The 7AURIGA Standard
            </span>
          </div>
          <h2 className="text-section-title text-[#FAF7F5] max-w-3xl">
            We measure success differently.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — standard questions */}
          <div className="lg:col-span-6 space-y-6">
            <p
              className="text-sm text-[#9C8F8F] leading-relaxed animate-on-scroll opacity-100"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}
            >
              Not by impressions. Not by engagement. Not by awards. Those are outcomes.
              Our standard is simpler.
            </p>

            <div className="space-y-4">
              {standardLines?.map((line, i) => (
                <div
                  key={i}
                  className="animate-on-scroll opacity-100 flex items-start gap-4 p-5 rounded-xl border border-[#2E2424] bg-[#161212] hover:border-[#9B1C2E]/40 transition-colors duration-300"
                  style={{ animation: `animationIn 0.9s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.1}s both` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C2E] mt-2 shrink-0 animate-star-pulse" />
                  <p className="text-base font-light text-[#FAF7F5]/85 italic font-serif leading-relaxed">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="text-sm text-[#9C8F8F] leading-relaxed animate-on-scroll opacity-100 pt-4"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
            >
              If the answer is yes, our work has succeeded. Because our responsibility extends beyond producing exceptional creative work. It is to strengthen the organisation behind it.
            </p>
          </div>

          {/* Right — How We Work */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="animate-on-scroll opacity-100"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F] mb-4">
                How We Work
              </p>
              <h3 className="text-2xl font-bold text-[#FAF7F5] mb-6 tracking-tight">
                Think Clearly. Create Purposefully. Endure.
              </h3>
            </div>

            <div className="space-y-3">
              {howWeWorkItems?.map((item, i) => (
                <div
                  key={i}
                  className="animate-on-scroll opacity-100 group flex flex-col gap-1 p-5 rounded-xl border border-[#2E2424] bg-[#161212] hover:bg-[#1A1614] hover:border-[#9B1C2E]/30 transition-all duration-400"
                  style={{ animation: `animationIn 0.9s cubic-bezier(0.22,1,0.36,1) ${0.3 + i * 0.1}s both` }}
                >
                  <span className="text-sm font-semibold text-[#FAF7F5] group-hover:text-[#C8374F] transition-colors duration-300">
                    {item?.label}
                  </span>
                  <span className="text-xs text-[#9C8F8F]">
                    {item?.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Philosophy quote */}
            <div
              className="animate-on-scroll opacity-100 mt-6 p-6 rounded-xl bg-[#9B1C2E]/10 border border-[#9B1C2E]/30"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.7s both' }}
            >
              <p className="text-base font-serif italic text-[#FAF7F5]/90 leading-relaxed">
                "Enduring influence is never created overnight. It is built deliberately."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-4 bg-[#9B1C2E]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8374F]">
                  7AURIGA Philosophy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
