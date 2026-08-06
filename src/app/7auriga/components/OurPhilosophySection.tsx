'use client';

import React, { useEffect, useRef } from 'react';

export default function OurPhilosophySection() {
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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative bg-[#0D0B0B] text-[#FAF7F5] section-divider py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div
            className="animate-on-scroll opacity-100 flex flex-col items-center justify-center space-y-6"
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#9B1C2E]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                Our Philosophy
              </span>
              <span className="h-px w-6 bg-[#9B1C2E]" />
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F5]">
              Influence Is Earned.
            </h2>
          </div>

          <div
            className="animate-on-scroll opacity-100 space-y-4"
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
          >
            <p className="text-xl md:text-2xl font-serif italic text-[#FAF7F5]/80 tracking-wide">
              Reputation cannot be manufactured.<br />
              Trust cannot be accelerated.<br />
              Recognition cannot be demanded.
            </p>
          </div>

          <div
            className="animate-on-scroll opacity-100 space-y-6 max-w-2xl mx-auto"
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
          >
            <p className="text-base text-[#9C8F8F] leading-relaxed">
              The organisations that endure earn all three through consistency, clarity and conviction. That is why we measure our work not by what it attracts today, but by what it continues to represent tomorrow.
            </p>
            <p className="text-base font-semibold text-[#FAF7F5] tracking-wide uppercase text-sm mt-8">
              Because enduring influence is never created overnight.<br />
              <span className="text-[#C8374F]">It is built deliberately.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
