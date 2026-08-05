'use client';

import React, { useEffect, useRef } from 'react';
import ConstellationCanvas from '@/components/auriga/ConstellationCanvas';

const icpItems = [
  {
    index: '01',
    label: 'Founders',
    description: 'Building category-defining businesses.',
  },
  {
    index: '02',
    label: 'Established Organisations',
    description: 'Entering new markets with precision.',
  },
  {
    index: '03',
    label: 'Family Enterprises',
    description: 'Preparing for future generations.',
  },
  {
    index: '04',
    label: 'Institutions',
    description: 'Redefining their public identity.',
  },
  {
    index: '05',
    label: 'Luxury & Technology Brands',
    description: 'Pursuing international expansion.',
  },
];

export default function OrganisationsSection() {
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
      id="work-with-us"
      ref={sectionRef}
      className="relative bg-[#1A1614] text-[#FAF7F5] section-divider py-24 md:py-32 overflow-hidden"
    >
      {/* Background label */}
      <div className="absolute top-12 right-6 md:right-12 z-0 opacity-[0.04] font-sans font-extrabold text-[6rem] md:text-[9rem] leading-none text-[#FAF7F5] pointer-events-none select-none tracking-tighter">
        05
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
              Organisations We Work With
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h2 className="text-section-title text-[#FAF7F5] max-w-xl">
              Long-Term Ambition<br />
              <span className="text-[#FAF7F5]/40 font-serif italic font-light">Recognises</span> Long-Term Thinking.
            </h2>
            <p className="text-sm text-[#9C8F8F] max-w-sm leading-relaxed">
              We partner with organisations at defining moments in their development. Every partnership is selected with care. Shared standards matter as much as shared ambition.
            </p>
          </div>
        </div>

        {/* ICP list */}
        <div className="flex flex-col gap-3 mb-20">
          {icpItems?.map((item, i) => (
            <div
              key={item?.index}
              className="animate-on-scroll opacity-100 group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-5 md:p-6 bg-[#161212] border border-[#2E2424] rounded-2xl hover:border-[#9B1C2E]/40 hover:bg-[#0D0B0B] transition-all duration-400"
              style={{ animation: `animationIn 0.9s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s both` }}
            >
              <div className="md:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8374F]">
                  {item?.index}
                </span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg md:text-xl font-bold text-[#FAF7F5] tracking-tight group-hover:text-[#C8374F] transition-colors duration-300">
                  {item?.label}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm text-[#9C8F8F]">
                  {item?.description}
                </p>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <div className="w-8 h-8 rounded-full border border-[#2E2424] flex items-center justify-center text-[#9C8F8F] group-hover:border-[#9B1C2E] group-hover:text-[#C8374F] transition-all duration-300">
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block — constellation dark */}
        <div
          id="contact"
          className="animate-on-scroll opacity-100 relative overflow-hidden rounded-3xl bg-[#0D0B0B] border border-[#2E2424] ruby-glow p-12 md:p-20"
          style={{ animation: 'animationIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both' }}
        >
          {/* Constellation canvas in CTA */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <ConstellationCanvas />
          </div>

          {/* Atmospheric orbs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#9B1C2E] opacity-10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#C8374F] opacity-8 blur-[60px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#9B1C2E]" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8374F]">
                  Let's Begin
                </span>
              </div>
              <h2 className="text-section-title text-[#FAF7F5]">
                Build What Will<br />Be Remembered.
              </h2>
              <p className="text-sm text-[#9C8F8F] leading-relaxed max-w-md">
                Whether establishing a new venture, evolving an existing organisation or preparing for international expansion — 7AURIGA provides the strategic, creative and communications expertise required to build identities that stand the test of time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="glass-card-dark rounded-xl p-5 flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C2E] mt-2 shrink-0 animate-star-pulse" />
                  <div>
                    <p className="text-sm font-semibold text-[#FAF7F5] mb-1">Selective Partnerships</p>
                    <p className="text-xs text-[#9C8F8F]">We work with a limited number of organisations. Every engagement is considered.</p>
                  </div>
                </div>
                <div className="glass-card-dark rounded-xl p-5 flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B1C2E] mt-2 shrink-0 animate-star-pulse" style={{ animationDelay: '0.5s' }} />
                  <div>
                    <p className="text-sm font-semibold text-[#FAF7F5] mb-1">Long-Term Thinking</p>
                    <p className="text-xs text-[#9C8F8F]">We build for the future, not the quarter. Our work is designed to remain relevant for years.</p>
                  </div>
                </div>
              </div>

              <a
                href="mailto:hello@7auriga.com"
                className="btn-primary w-full justify-center text-center"
              >
                Start a Conversation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <p className="text-[10px] text-[#9C8F8F] uppercase tracking-[0.15em] text-center">
                BRAHM Global Holdings · Identity Intelligence™
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
