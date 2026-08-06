'use client';

import React, { useEffect, useRef } from 'react';

interface Practice {
  number: string;
  name: string;
  tagline: string;
  description: string;
  colSpan: string;
  rowSpan?: string;
  featured?: boolean;
}

const practices: Practice[] = [
  {
    number: '01',
    name: 'Identity',
    tagline: 'Everything begins with clarity.',
    description:
      'We create strategic positioning, brand architecture, naming, identity systems and visual languages that establish enduring distinction and provide the foundations upon which organisations grow.',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-2',
    featured: true,
  },
  {
    number: '02',
    name: 'Narrative',
    tagline: 'Organisations become influential when their purpose is understood.',
    description:
      'Through executive communications, editorial strategy, campaigns, film and original content, we articulate ideas that build confidence, inspire belief and create lasting relevance.',
    colSpan: 'lg:col-span-2',
  },
  {
    number: '03',
    name: 'Presence',
    tagline: 'Consistency creates recognition.',
    description:
      'Across digital experiences, environments, visual systems, social platforms and emerging media, we design coherent expressions that strengthen reputation through every interaction.',
    colSpan: 'lg:col-span-1',
  },
  {
    number: '04',
    name: 'Influence',
    tagline: 'Enduring influence is earned, never purchased.',
    description:
      'Through strategic communications, partnerships, audience development and commercial strategy, we help organisations expand their reach while preserving the integrity of their identity.',
    colSpan: 'lg:col-span-1',
  },
];

export default function PracticesSection() {
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
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative bg-[#1A1614] text-[#FAF7F5] section-divider py-24 md:py-32 overflow-hidden"
    >
      {/* Background label */}
      <div className="absolute top-12 right-6 md:right-12 z-0 opacity-[0.04] font-sans font-extrabold text-[6rem] md:text-[9rem] leading-none text-[#FAF7F5] pointer-events-none select-none tracking-tighter">
        03
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">

        {/* Header */}
        <div
          className="animate-on-scroll opacity-100 mb-16"
          style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-6 bg-[#9B1C2E]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
              03 — IDENTITY INTELLIGENCE™ Our Practices
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h2 className="text-section-title text-[#FAF7F5]">
              Four capabilities.<br />One enduring standard.
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* 01 Identity - Tall Left Card */}
          <div
            className={`col-span-1 ${practices[0].rowSpan} ${practices[0].colSpan} animate-on-scroll opacity-100 practice-card-hover relative overflow-hidden bg-[#161212] border border-[#2E2424] rounded-2xl p-8 flex flex-col justify-between min-h-[360px] lg:min-h-0`}
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-[#9B1C2E] blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F]">
                  {practices[0].number}
                </span>
                <div className="constellation-dot animate-star-pulse" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#FAF7F5] mb-3 tracking-tight">
                {practices[0].name}
              </h3>
              <p className="text-sm font-semibold text-[#C8374F] mb-4 italic font-serif">
                {practices[0].tagline}
              </p>
            </div>
            <p className="text-sm text-[#9C8F8F] leading-relaxed">
              {practices[0].description}
            </p>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-[#9B1C2E]/60 to-transparent" />
          </div>

          {/* 02 Narrative - Wide Top Right Card */}
          <div
            className={`col-span-1 ${practices[1].colSpan} animate-on-scroll opacity-100 practice-card-hover relative overflow-hidden bg-[#161212] border border-[#2E2424] rounded-2xl p-8 flex flex-col justify-between min-h-[200px]`}
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
          >
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F]">
                    {practices[1].number}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#FAF7F5] mb-3 tracking-tight">
                  {practices[1].name}
                </h3>
                <p className="text-sm font-semibold text-[#C8374F] mb-3 italic font-serif">
                  {practices[1].tagline}
                </p>
              </div>
              <p className="text-sm text-[#9C8F8F] leading-relaxed max-w-[50ch]">
                {practices[1].description}
              </p>
            </div>
          </div>

          {/* 03 Presence - Bottom Middle Card */}
          <div
            className={`col-span-1 ${practices[2].colSpan} animate-on-scroll opacity-100 practice-card-hover relative overflow-hidden bg-[#161212] border border-[#2E2424] rounded-2xl p-8 flex flex-col justify-between min-h-[200px]`}
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}
          >
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F]">
                    {practices[2].number}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#FAF7F5] mb-3 tracking-tight">
                  {practices[2].name}
                </h3>
                <p className="text-sm font-semibold text-[#C8374F] mb-3 italic font-serif">
                  {practices[2].tagline}
                </p>
              </div>
              <p className="text-sm text-[#9C8F8F] leading-relaxed">
                {practices[2].description}
              </p>
            </div>
          </div>

          {/* 04 Influence - Bottom Right Card */}
          <div
            className={`col-span-1 ${practices[3].colSpan} animate-on-scroll opacity-100 practice-card-hover relative overflow-hidden bg-[#161212] border border-[#2E2424] rounded-2xl p-8 flex flex-col justify-between min-h-[200px]`}
            style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both' }}
          >
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F]">
                    {practices[3].number}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#FAF7F5] mb-3 tracking-tight">
                  {practices[3].name}
                </h3>
                <p className="text-sm font-semibold text-[#C8374F] mb-3 italic font-serif">
                  {practices[3].tagline}
                </p>
              </div>
              <p className="text-sm text-[#9C8F8F] leading-relaxed">
                {practices[3].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
