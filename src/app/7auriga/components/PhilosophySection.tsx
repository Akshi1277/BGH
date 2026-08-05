'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function PhilosophySection() {
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
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    const elements = sectionRef?.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer?.observe(el));

    return () => observer?.disconnect();
  }, []);

  const statements = [
    { line: 'Marketing creates visibility.', muted: false },
    { line: 'Influence creates preference.', muted: false },
    { line: 'Reputation creates longevity.', muted: false },
  ];

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative bg-[#0D0B0B] text-[#FAF7F5] section-divider py-24 md:py-32 overflow-hidden">
      
      {/* Section label watermark */}
      <div className="absolute top-12 left-6 md:left-12 z-0 opacity-[0.04] font-sans font-extrabold text-[6rem] md:text-[9rem] leading-none text-[#FAF7F5] pointer-events-none select-none tracking-tighter">
        02
      </div>
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">

        {/* Header row */}
        <div
          className="animate-on-scroll opacity-100"
          style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
          
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-[#9B1C2E]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
              02 — Who We Are
            </span>
          </div>
          <h2 className="text-section-title text-[#FAF7F5] mb-4">
            Beyond Marketing.
          </h2>
        </div>

        {/* Main grid — asymmetric 60/40 */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — statements + copy */}
          <div className="lg:col-span-7 space-y-12">
            {/* Declarative statements */}
            <div
              className="animate-on-scroll opacity-100 space-y-4"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}>
              
              {statements?.map((s, i) => (
                <p
                  key={i}
                  className="text-manifesto text-[#FAF7F5]/85 font-light"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  
                  {s?.line}
                </p>
              ))}
            </div>

            {/* Body copy */}
            <div
              className="animate-on-scroll opacity-100 space-y-6"
              style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}>
              
              <p className="text-base text-[#9C8F8F] leading-relaxed max-w-2xl">
                At 7AURIGA, we believe the world's most admired organisations are built through clarity of purpose, exceptional creativity and disciplined execution. Our role is not merely to communicate brands — but to shape how they are understood, experienced and remembered.
              </p>
              <p className="text-base text-[#9C8F8F] leading-relaxed max-w-2xl">
                As the communications and creative company of BRAHM Global Holdings, we build the identities of our own ventures while partnering selectively with organisations whose ambitions reflect our standards.
              </p>
              <p className="text-sm font-semibold tracking-[0.1em] uppercase text-[#C8374F]">
                Every partnership is earned.
              </p>
            </div>
          </div>

          {/* Right — stat + image card */}
          <div
            className="lg:col-span-5 flex flex-col gap-6 animate-on-scroll opacity-100"
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}>
            
            {/* Big stat */}
            <div className="bg-[#161212] border border-[#2E2424] rounded-2xl p-10 flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F] block mb-2">
                  OUR PHILOSOPHY
                </span>
                <span className="text-4xl md:text-5xl font-extrabold text-[#FAF7F5] tracking-tight block">
                  Identity
                </span>
                <span className="text-xl md:text-2xl font-serif italic text-[#C8374F] block mt-1">
                  is strategy made visible.
                </span>
              </div>
              <div className="mt-8 pt-6 border-t border-[#2E2424] flex items-center justify-between text-xs text-[#9C8F8F] uppercase tracking-widest">
                <span>BRAHM Practice</span>
                <span className="font-mono text-[#C8374F]">02 / 05</span>
              </div>
            </div>

            {/* Image card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2E2424] aspect-[4/3] group">
              <AppImage
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
                alt="Architectural minimalist texture"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0B]/90 via-[#0D0B0B]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-mono uppercase tracking-widest text-[#FAF7F5]/70">
                  Disciplined Execution · Enduring Value
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
