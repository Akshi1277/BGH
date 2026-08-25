import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Our Sectors & Focus Industries — BRAHM Global Holdings";
const description =
  "Discover the six core sectors where BRAHM Global Holdings operates: Technology & AI, Brand & Media, Sports Tech, Education, Hospitality, and Luxury Goods.";

export const metadata: Metadata = {
  title: "Industry Sectors",
  description,
  alternates: {
    canonical: `${siteUrl}/sectors`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/sectors`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "BRAHM Sectors" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

const SECTORS = [
  {
    number: "01",
    name: "Technology & Artificial Intelligence",
    leadVenture: "ENIF Technologies",
    href: "/enif",
    desc: "Building foundational enterprise platforms, autonomous AI workflows, sub-10ms edge microservices, and resilient cloud architectures.",
  },
  {
    number: "02",
    name: "Brand, Media & Communications",
    leadVenture: "7AURIGA",
    href: "/7auriga",
    desc: "Architecting corporate identities, strategic communications, executive positioning, and digital sensory environments.",
  },
  {
    number: "03",
    name: "Sports Technology",
    leadVenture: "Talent Pro League",
    href: "https://talentproleague.football",
    desc: "Digital tournament management, grassroots football scout networks, competition analytics, and fan engagement ecosystems.",
  },
  {
    number: "04",
    name: "International Education",
    leadVenture: "London School of Academics & Arts (LSAA)",
    href: "/contact",
    desc: "Hybrid digital education pairing British academic rigor with personalized AI tutoring for students across global borders.",
  },
  {
    number: "05",
    name: "Hospitality Technology",
    leadVenture: "Alayn",
    href: "https://alaynai.com",
    desc: "Intelligent restaurant operating systems, real-time demand forecasting, kitchen automation, and AI-driven guest retention.",
  },
  {
    number: "06",
    name: "Luxury Consumer Brands",
    leadVenture: "Luxure De Eden",
    href: "/contact",
    desc: "Artisanal British haute perfumery, rare botanical extractions, and bespoke luxury lifestyle products.",
  },
];

export default function SectorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/sectors`,
  };

  return (
    <main className="min-h-screen bg-surface text-ink pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="section-y border-b border-surface-line relative overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
              INDUSTRY FOCUS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Six Strategic <span className="italic text-accent">Market Sectors.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              We concentrate our capital and engineering firepower in industries where digital innovation, brand authority, and operational excellence create compounding competitive advantages.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTORS.map((sec) => (
              <div
                key={sec.number}
                className="p-8 rounded-2xl border border-surface-line bg-surface/80 hover:bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono-ui text-xs font-bold text-accent tracking-widest block mb-4">
                    {sec.number}
                  </span>

                  <h2 className="font-display text-2xl text-ink font-semibold mb-3">
                    {sec.name}
                  </h2>

                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-6">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-line/60 flex items-center justify-between">
                  <span className="font-mono-ui text-[11px] uppercase tracking-wider text-ink-muted">
                    Lead: <strong className="text-ink">{sec.leadVenture}</strong>
                  </span>
                  <Link
                    href={sec.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-ui uppercase tracking-wider text-accent font-bold hover:underline"
                  >
                    <span>View</span>
                    <Icon name="arrow-up-right" size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
