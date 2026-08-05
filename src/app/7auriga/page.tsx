import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import PracticesSection from './components/PracticesSection';
import StandardSection from './components/StandardSection';
import OrganisationsSection from './components/OrganisationsSection';

export const metadata: Metadata = {
  title: '7AURIGA — We Build Identities That Endure',
  description:
    '7AURIGA is the Identity Intelligence Practice of BRAHM Global Holdings. We build enduring organisational identities through strategic thinking, creative excellence and disciplined execution.',
  alternates: {
    canonical: '/7auriga',
  },
};

export default function AurigaHomePage() {
  return (
    <div className="bg-[#0D0B0B] text-[#FAF7F5] min-h-screen relative selection:bg-[#9B1C2E] selection:text-white">
      {/* Fixed vertical grid lines — architectural depth */}
      <div className="grid-lines-overlay" aria-hidden="true">
        <div className="grid-line-v" />
        <div className="grid-line-v hidden md:block" />
        <div className="grid-line-v hidden md:block" />
        <div className="grid-line-v" />
      </div>

      {/* Schema: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '7AURIGA',
            description:
              'The Identity Intelligence Practice of BRAHM Global Holdings. Strategic Communications and Creative Company.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            logo: '/7auregalogo.png',
            parentOrganization: {
              '@type': 'Organization',
              name: 'BRAHM Global Holdings',
            },
          }),
        }}
      />

      {/* Schema: WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '7AURIGA — We Build Identities That Endure',
            description:
              '7AURIGA builds enduring identities for organisations through strategic communications, creative excellence and disciplined execution.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          }),
        }}
      />

      <Header />

      <main className="bg-[#0D0B0B] text-[#FAF7F5] min-h-screen relative z-10">
        <HeroSection />
        <PhilosophySection />
        <PracticesSection />
        <StandardSection />
        <OrganisationsSection />
      </main>

      <Footer theme="dark" />
    </div>
  );
}
