import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Contact BRAHM Global Holdings — Departmental Routing & Inquiries";
const description =
  "Connect with BRAHM Global Holdings. Contact channels for general corporate inquiries, venture proposals, strategic partnerships, ENIF Technology engagements, and 7AURIGA brand inquiries.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/contact`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Brahm Global Holdings Contact",
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

const CONTACT_CHANNELS = [
  {
    title: "General & Corporate Inquiries",
    desc: "For general questions regarding the group, corporate structure, governance, or speaking engagements.",
    email: "hello@brahmglobalholdings.com",
    subject: "Corporate Inquiry",
    badge: "Corporate",
    sla: "24-48 Hours",
  },
  {
    title: "Strategic Partnerships & JVs",
    desc: "For institutional co-investments, commercial collaborations, and cross-border strategic joint ventures.",
    email: "hello@brahmglobalholdings.com",
    subject: "Strategic Partnership Inquiry",
    badge: "Partnerships",
    sla: "24 Hours",
  },
  {
    title: "Build with BRAHM",
    desc: "For entrepreneurs, technical leaders, and founders seeking to incubate or scale ventures within our ecosystem.",
    email: "hello@brahmglobalholdings.com",
    subject: "Build With BRAHM Venture Proposal",
    badge: "Venture Building",
    sla: "48 Hours",
  },
  {
    title: "ENIF Technologies (Software & AI)",
    desc: "To engage our engineering division for mission-critical enterprise software, AI agents, or edge architecture.",
    email: "hello@brahmglobalholdings.com",
    subject: "Work With ENIF — Project Engagement",
    badge: "Technology",
    sla: "24 Hours",
    link: "/enif",
    linkText: "Visit ENIF Portal",
  },
  {
    title: "7AURIGA (Identity & Media)",
    desc: "For strategic branding, corporate narrative positioning, executive reputation, and visual identity design.",
    email: "hello@brahmglobalholdings.com",
    subject: "7AURIGA Brand Intelligence Inquiry",
    badge: "Creative & Media",
    sla: "24 Hours",
    link: "/7auriga",
    linkText: "Visit 7AURIGA Portal",
  },
  {
    title: "Press & Media Relations",
    desc: "For journalistic inquiries, media requests, brand assets, and official corporate statements.",
    email: "hello@brahmglobalholdings.com",
    subject: "Media & Press Inquiry",
    badge: "Press",
    sla: "Same Day",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": "BRAHM Global Holdings",
      "url": siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB",
        "addressRegion": "Greater London"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "general inquiries",
          "email": "hello@brahmglobalholdings.com",
          "availableLanguage": ["English"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "partnerships",
          "email": "hello@brahmglobalholdings.com",
          "availableLanguage": ["English"]
        }
      ]
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
              CONTACT & ENGAGEMENT
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Start a <span className="italic text-accent">Conversation.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              We welcome conversations with ambitious organisations, institutional partners, and visionary founders. Direct your inquiry to the appropriate division below for dedicated attention.
            </p>
          </div>
        </div>
      </section>

      {/* Departmental Channels Grid */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACT_CHANNELS.map((channel) => (
              <div
                key={channel.title}
                className="p-8 rounded-2xl border border-surface-line bg-surface/70 hover:bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-ui text-[10px] uppercase tracking-wider text-accent font-semibold px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                      {channel.badge}
                    </span>
                    <span className="text-[10px] font-mono-ui uppercase tracking-wider text-ink-muted">
                      SLA: {channel.sla}
                    </span>
                  </div>

                  <h2 className="font-display text-xl text-ink font-semibold mb-3">
                    {channel.title}
                  </h2>

                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-6">
                    {channel.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-surface-line/60">
                  <a
                    href={`mailto:${channel.email}?subject=${encodeURIComponent(channel.subject)}`}
                    className="inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-wider text-ink font-bold hover:text-accent transition-colors"
                  >
                    <span>{channel.email}</span>
                    <Icon name="arrow-right" size={12} />
                  </a>

                  {channel.link && (
                    <div>
                      <Link
                        href={channel.link}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono-ui uppercase tracking-wider text-accent hover:underline"
                      >
                        <span>{channel.linkText}</span>
                        <Icon name="arrow-up-right" size={11} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headquarters Information */}
      <section className="section-y border-b border-surface-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-eyebrow font-mono-ui text-accent block uppercase tracking-[0.2em]">
              GLOBAL PRESENCE
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Headquartered in London.
            </h2>
            <p className="text-ink-muted text-base font-light leading-relaxed">
              BRAHM Global Holdings Ltd is registered in London, United Kingdom. From the heart of London&apos;s financial and technological district, we manage international assets, build scalable software, and direct brand operations worldwide.
            </p>
            <div className="space-y-2 text-sm font-mono-ui text-ink">
              <p className="text-ink-muted uppercase text-xs tracking-wider">Registered Location</p>
              <p className="font-medium">London, Greater London, United Kingdom</p>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl border border-surface-line bg-paper">
            <h3 className="font-display text-xl text-ink font-semibold mb-3">
              Direct Communication Protocol
            </h3>
            <p className="text-sm text-ink-muted font-light leading-relaxed mb-6">
              All communications are routed through secure, encrypted mail gateways with strict data privacy protocols. For urgent partnership matters, please prefix your email subject with <code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-surface-line font-mono-ui text-accent">[PRIORITY]</code>.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@brahmglobalholdings.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-surface font-mono-ui text-xs uppercase tracking-wider font-semibold hover:bg-accent transition-colors"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
