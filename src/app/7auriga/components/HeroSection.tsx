'use client';

import React, { useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import ConstellationCanvas from '@/components/auriga/ConstellationCanvas';

export default function HeroSection() {
  const shimmerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative w-full min-h-screen bg-[#0D0B0B] text-[#FAF7F5] overflow-hidden flex flex-col justify-end pb-16 md:pb-28"
      aria-label="Hero">
      
      {/* Constellation canvas background */}
      <ConstellationCanvas />

      {/* Background Image — cinematic entrance */}
      <div className="absolute inset-0 z-0 bg-[#0D0B0B]">
        <AppImage
          src="https://images.unsplash.com/photo-1644921100901-d11ab59d81c7"
          alt="Sleek modern boardroom with floor-to-ceiling glass, deep shadow, dark steel walls, low-key institutional lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-cinematic opacity-0" />
        
        {/* Multi-layer gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0B] via-[#0D0B0B]/70 to-[#0D0B0B]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0B]/70 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: 'rgba(13,11,11,0.45)' }} />
      </div>

      {/* Floating status tag */}
      <div
        className="absolute top-28 right-6 md:right-12 z-20 flex flex-col items-end gap-2 animate-slide-up opacity-0"
        style={{ animationDelay: '2.5s' }}>
        
        <div className="px-4 py-2 rounded-lg glass-card-dark flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C2E] animate-star-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-[#FAF7F5]/80">
            Identity Intelligence™
          </span>
        </div>
        <div className="px-4 py-2 rounded-lg glass-card-dark flex items-center gap-2">
          <span className="text-xs font-mono tracking-wider uppercase text-[#9C8F8F]">
            BRAHM Global Holdings
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">

        {/* Left — Massive headline */}
        <div className="md:col-span-7">
          <div
            className="flex items-center gap-3 mb-6 animate-slide-up opacity-0"
            style={{ animationDelay: '1.1s' }}>
            
            <span className="h-px w-8 bg-[#9B1C2E]/70" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#FAF7F5]/70">
              Est. 2024 · Auriga Constellation
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-[#FAF7F5] leading-[0.86] tracking-[-0.03em]">
            <span
              className="block text-hero-display animate-slide-up opacity-0"
              style={{ animationDelay: '1.3s' }}>
              
              BUILD
            </span>
            <div
              className="flex items-baseline gap-4 md:gap-6 animate-slide-up opacity-0"
              style={{ animationDelay: '1.5s' }}>
              
              <span className="text-hero-display font-serif italic font-light text-[#FAF7F5]/50">
                &amp;
              </span>
              <span className="text-hero-display text-gradient-ruby">ENDURE.</span>
            </div>
          </h1>
        </div>

        {/* Right — Glassmorphism credential card */}
        <div
          className="md:col-span-4 md:col-start-9 flex flex-col justify-end pb-2 animate-slide-up opacity-0"
          style={{ animationDelay: '1.7s' }}>
          
          <div className="relative overflow-hidden glass-card-dark p-8 rounded-2xl ruby-glow">
            {/* Shimmer */}
            <div ref={shimmerRef} className="shimmer-overlay animate-shimmer" />

            <div className="relative z-10">
              <p className="text-base md:text-lg text-[#FAF7F5]/85 font-light leading-relaxed mb-8">
                The communications and creative company of BRAHM Global Holdings. We build the identities of organisations that intend to endure.
              </p>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4 border-t border-[#9B1C2E]/30 pt-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9C8F8F] mb-1">
                      Practices
                    </span>
                    <span className="text-2xl font-bold text-[#FAF7F5]">4</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9C8F8F] mb-1">
                      Standard
                    </span>
                    <span className="text-2xl font-bold text-[#FAF7F5]">One</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group flex items-center justify-between w-full pb-2 border-b border-[#FAF7F5]/20 hover:border-[#9B1C2E] transition-colors duration-300">
                  
                  <span className="text-sm font-semibold tracking-wide text-[#FAF7F5]">
                    Start a Conversation
                  </span>
                  <svg
                    className="w-4 h-4 text-[#FAF7F5] group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up opacity-0"
        style={{ animationDelay: '2.2s' }}>
        
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAF7F5]/30">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-[#9B1C2E] to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
