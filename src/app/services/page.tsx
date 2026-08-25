import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Services & Group Capabilities — BRAHM Global Holdings";
const description =
  "Explore the integrated capabilities of BRAHM Global Holdings: Venture Building, Enterprise Software & AI Engineering (ENIF), and Brand Identity Intelligence (7AURIGA).";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description,
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/services`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "BRAHM Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

const SERVICES = [
  {
    number: "01",
    category: "VENTURE CREATION & SCALING",
    title: "Venture Building & Enterprise Architecture",
    desc: "We co-found, fund, and scale enterprises from first principles. Combining long-term capital with operational leadership, we help ambitious founders build defensible, cash-flow generative companies.",
    deliverables: ["Business Model Architecture", "Capital Allocation Strategy", "Operational Governance", "International Market Expansion"],
    cta: "Build with BRAHM",
    href: "/contact",
  },
  {
    number: "02",
    category: "TECHNOLOGY & ARTIFICIAL INTELLIGENCE",
    title: "ENIF Technologies — Engineering & AI Division",
    desc: "Our dedicated engineering division designs, builds, and maintains mission-critical enterprise software, autonomous AI platforms, and high-throughput systems with 99.999% SLA availability.",
    deliverables: ["Custom LLM Agents & Fine-Tuned RAG", "Enterprise Cloud Microservices", "Sub-10ms Edge Latency Architecture", "Native iOS & Android Mobile Platforms"],
    cta: "Explore ENIF",
    href: "/enif",
  },
  {
    number: "03",
    category: "BRAND & MEDIA INTELLIGENCE",
    title: "7AURIGA — Identity Intelligence Practice",
    desc: "Strategic communications, visual identity architecture, and narrative design for market-leading institutions, visionary leaders, and global enterprises.",
    deliverables: ["Corporate Identity Systems", "Narrative & Positioning Architecture", "Digital Experience Design", "Executive Reputation Management"],
    cta: "Explore 7AURIGA",
    href: "/7auriga",
  },
  {
    number: "04",
    category: "STRATEGIC COLLABORATION",
    title: "Joint Ventures & Co-Investments",
    desc: "We form long-term joint ventures and commercial partnerships with established enterprises looking to launch new technology divisions or enter international markets.",
    deliverables: ["Cross-Border Co-Ventures", "Shared Engineering Infrastructure", "Commercial Partnership Structuring", "Strategic IP Development"],
    cta: "Partner With Us",
    href: "/contact",
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/services`,
    "mainEntity": {
      "@type": "Organization",
      "name": "BRAHM Global Holdings",
      "url": siteUrl,
      "knowsAbout": ["Venture Building", "Software Engineering", "Artificial Intelligence", "Brand Strategy", "Joint Ventures"]
    }
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
              SERVICES & CAPABILITIES
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Engineering, Identity & <span className="italic text-accent">Venture Building.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              We bring world-class technical engineering, brand intelligence, and operational execution to internal group companies and select external enterprise partners.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((svc) => (
              <div
                key={svc.number}
                className="p-8 rounded-2xl border border-surface-line bg-surface/70 hover:bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-ui text-xs font-bold text-accent tracking-widest">
                      {svc.number}
                    </span>
                    <span className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted px-2.5 py-1 rounded bg-surface border border-surface-line">
                      {svc.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl text-ink font-semibold mb-3">
                    {svc.title}
                  </h2>

                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  <div className="space-y-2 mb-8">
                    <span className="font-mono-ui text-[11px] uppercase tracking-wider text-ink font-semibold block mb-2">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-ink-muted font-light">
                      {svc.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={svc.href}
                  className="inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-wider text-ink font-bold hover:text-accent transition-colors pt-4 border-t border-surface-line/60"
                >
                  <span>{svc.cta}</span>
                  <Icon name="arrow-up-right" size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
