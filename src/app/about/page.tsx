import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const siteUrl = "https://brahmglobalholdings.com";
const title = "About BRAHM Global Holdings — Mandate, Strategy & Governance";
const description =
  "Learn about BRAHM Global Holdings, a British venture builder and holding company creating and scaling enduring businesses across technology, education, sports, hospitality, and luxury brands.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/about`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Brahm Global Holdings About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

const PILLARS = [
  {
    number: "01",
    title: "Strategic Architecture",
    desc: "We define clear, defensible corporate strategies and business models before writing code or deploying capital. Every venture is engineered from first principles for long-term unit economics.",
  },
  {
    number: "02",
    title: "Proprietary Engineering",
    desc: "Through our dedicated technology division, ENIF Technologies, we build mission-critical enterprise software, autonomous AI platforms, and high-throughput infrastructure without relying on fragile external agency models.",
  },
  {
    number: "03",
    title: "Identity & Cultural Authority",
    desc: "Through 7AURIGA, we architect enduring corporate identities, narrative positioning, and digital experiences that establish lasting trust with customers, partners, and institutions.",
  },
  {
    number: "04",
    title: "Indefinite Holding Horizon",
    desc: "We do not build for the next quarterly exit or speculative funding round. We build resilient, cash-flow generative companies designed to compound value over decades.",
  },
];

const COMPANIES = [
  {
    name: "ENIF Technologies",
    tag: "Technology & AI",
    desc: "Designing and engineering mission-critical software, enterprise platforms, and autonomous artificial intelligence.",
    href: "/enif",
  },
  {
    name: "7AURIGA",
    tag: "Brand Intelligence & Media",
    desc: "Strategic communications, corporate identity systems, and narrative architecture for market-leading institutions.",
    href: "/7auriga",
  },
  {
    name: "Talent Pro League",
    tag: "Sports Technology",
    desc: "Digital football ecosystem modernizing league management, talent identification, and grassroots competitions.",
    href: "https://talentproleague.football",
  },
  {
    name: "London School of Academics & Arts",
    tag: "Education",
    desc: "International digital learning platform delivering British educational excellence with adaptive AI tutoring.",
    href: "/contact",
  },
  {
    name: "Alayn",
    tag: "Hospitality Technology",
    desc: "Intelligent operating system and customer relationship AI for restaurants, cafes, and hospitality groups.",
    href: "https://alaynai.com",
  },
  {
    name: "Luxure De Eden",
    tag: "Luxury Goods",
    desc: "Haute perfumery and contemporary luxury fragrance house celebrating artisanal craftsmanship.",
    href: "/contact",
  },
  {
    name: "Fantasize",
    tag: "Wellness & Personal Care",
    desc: "Accredited personal care, herbal remedies, and skin rejuvenating formulations for modern lifestyle needs.",
    href: "https://fantasizeshop.com",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": "BRAHM Global Holdings",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB",
        "addressRegion": "Greater London"
      }
    }
  };

  return (
    <main className="min-h-screen bg-surface text-ink pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="section-y border-b border-surface-line relative overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
              ABOUT THE GROUP
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Building Tomorrow&apos;s <span className="italic text-accent">Enduring Institutions.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              BRAHM Global Holdings is an independent, privately held British venture builder and holding company. We create, acquire, develop, and scale enduring enterprises across technology, education, sport, hospitality, luxury consumer brands, and emerging industries.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Mandate & Origin */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              OUR MANDATE
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              A Long-Term Approach in a Short-Term World.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-ink-muted text-base sm:text-lg font-light leading-relaxed">
            <p>
              The prevailing corporate landscape often rewards fleeting momentum over durable fundamentals. BRAHM Global Holdings was established on a different conviction: that the greatest businesses are built with structural patience, obsessive craft, and integrated operational ownership.
            </p>
            <p>
              Headquartered in London, we operate with a dual focus: creating proprietary ventures within high-conviction market sectors, and acquiring or partnering with ambitious enterprises where our technical and brand capabilities unlock asymmetric growth.
            </p>
            <p className="text-ink font-normal italic">
              &ldquo;We do not build for the next valuation cycle. We build businesses engineered to remain relevant, resilient, and profitable for decades to come.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Operating Pillars */}
      <section className="section-y border-b border-surface-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl mb-16">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              OUR OPERATING MODEL
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
              Four Pillars of Venture Excellence.
            </h2>
            <p className="text-ink-muted text-base font-light">
              How we conceive, engineer, scale, and steward enterprises across international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-8 rounded-2xl border border-surface-line bg-paper/50 hover:bg-paper hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-ui text-xs text-accent tracking-widest block mb-4 font-bold">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-xl text-ink font-semibold mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Portfolio Overview */}
      <section id="portfolio" className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl mb-16">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              THE PORTFOLIO
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
              Seven Companies. One Standard.
            </h2>
            <p className="text-ink-muted text-base font-light">
              Each company within BRAHM Global Holdings operates with independent leadership while leveraging group-wide resources, technology, and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANIES.map((company) => (
              <div
                key={company.name}
                className="p-6 rounded-xl border border-surface-line bg-surface/60 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-semibold block mb-2">
                    {company.tag}
                  </span>
                  <h3 className="font-display text-lg text-ink font-semibold mb-2">
                    {company.name}
                  </h3>
                  <p className="text-xs text-ink-muted font-light leading-relaxed mb-6">
                    {company.desc}
                  </p>
                </div>
                <Link
                  href={company.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono-ui uppercase tracking-wider text-accent font-semibold hover:underline"
                >
                  <span>Explore Venture</span>
                  <Icon name="arrow-up-right" size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Location */}
      <section className="section-y border-b border-surface-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-eyebrow font-mono-ui text-accent block uppercase tracking-[0.2em]">
              GOVERNANCE & STANDARDS
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Rooted in London. Engineered for Global Impact.
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              BRAHM Global Holdings Ltd is registered and headquartered in London, United Kingdom. We maintain rigorous compliance with UK corporate law, GDPR privacy frameworks, and international enterprise governance standards.
            </p>
            <div className="pt-4 flex items-center gap-6 text-xs font-mono-ui uppercase tracking-wider text-ink">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>London Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>UK GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Private Group</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 p-8 rounded-2xl border border-surface-line bg-paper">
            <h3 className="font-display text-xl text-ink font-semibold mb-4">
              Connect with Leadership
            </h3>
            <p className="text-sm text-ink-muted font-light leading-relaxed mb-6">
              Whether exploring a strategic enterprise partnership, technology engagement with ENIF, brand architecture with 7AURIGA, or joint venture opportunities, our leadership team welcomes direct conversations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-surface font-mono-ui text-xs uppercase tracking-wider font-semibold hover:bg-accent transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
