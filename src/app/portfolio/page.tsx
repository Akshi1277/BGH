import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Portfolio Companies & Ventures — BRAHM Global Holdings";
const description =
  "Explore the full portfolio of BRAHM Global Holdings: ENIF Technologies, 7AURIGA, Talent Pro League, London School of Academics & Arts, Alayn, and Luxure De Eden.";

export const metadata: Metadata = {
  title: "Group Portfolio",
  description,
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/portfolio`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "BRAHM Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

const VENTURES = [
  {
    number: "01",
    name: "ENIF Technologies",
    sector: "Engineering & Artificial Intelligence",
    tagline: "Engineering the Intelligence Behind Modern Business.",
    desc: "The technology division of BRAHM Global Holdings, designing intelligent enterprise software, high-throughput cloud architectures, and autonomous AI agents for global organizations.",
    url: "https://brahmglobalholdings.com/enif",
    status: "Active · Core Division",
  },
  {
    number: "02",
    name: "7AURIGA",
    sector: "Brand, Media & Communications",
    tagline: "Building Brands of Enduring Influence.",
    desc: "The identity intelligence and creative communications practice of BRAHM Global Holdings, creating enduring brand architectures and narrative systems for market-leading institutions.",
    url: "https://brahmglobalholdings.com/7auriga",
    status: "Active · Core Practice",
  },
  {
    number: "03",
    name: "Talent Pro League",
    sector: "Sports Technology",
    tagline: "Reimagining the Future of Football.",
    desc: "A digital football ecosystem connecting players, clubs, coaches, and leagues through modern tournament management software, talent scouting, and performance analytics.",
    url: "https://talentproleague.football",
    status: "Active · Venture",
  },
  {
    number: "04",
    name: "London School of Academics & Arts (LSAA)",
    sector: "Education",
    tagline: "British Education Without Borders.",
    desc: "An international hybrid education platform delivering British pedagogy, personalized tutoring, and adaptive AI learning experiences to students worldwide.",
    url: "https://brahmglobalholdings.com/contact",
    status: "Active · Venture",
  },
  {
    number: "05",
    name: "Alayn",
    sector: "Hospitality Technology",
    tagline: "Redefining Hospitality Through Intelligence.",
    desc: "An intelligent restaurant and cafe operating platform utilizing AI automation, guest relationship management, and real-time inventory systems.",
    url: "https://alaynai.com",
    status: "Active · Venture",
  },
  {
    number: "06",
    name: "Luxure De Eden",
    sector: "Luxury Consumer Brands",
    tagline: "Modern Luxury. Enduring Elegance.",
    desc: "A contemporary British luxury fragrance house creating refined artisanal perfumes inspired by master craftsmanship and rare botanical extracts.",
    url: "https://brahmglobalholdings.com/contact",
    status: "Active · Brand",
  },
];

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/portfolio`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": VENTURES.map((v, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Organization",
          "name": v.name,
          "description": v.desc,
          "url": v.url,
        }
      }))
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
              GROUP PORTFOLIO
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Six Ventures. <span className="italic text-accent">One Standard of Excellence.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              Every company in our portfolio operates with dedicated leadership while drawing upon group-wide engineering, brand intelligence, and strategic capital.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VENTURES.map((v) => (
              <div
                key={v.number}
                className="p-8 rounded-2xl border border-surface-line bg-surface/80 hover:bg-surface hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-ui text-xs font-bold text-accent tracking-widest">
                      {v.number}
                    </span>
                    <span className="font-mono-ui text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-medium">
                      {v.status}
                    </span>
                  </div>

                  <span className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted block mb-1">
                    {v.sector}
                  </span>

                  <h2 className="font-display text-2xl text-ink font-semibold mb-2">
                    {v.name}
                  </h2>

                  <p className="font-display italic text-sm text-accent mb-4">
                    &ldquo;{v.tagline}&rdquo;
                  </p>

                  <p className="text-sm text-ink-muted font-light leading-relaxed mb-8">
                    {v.desc}
                  </p>
                </div>

                <Link
                  href={v.url}
                  className="inline-flex items-center gap-2 text-xs font-mono-ui uppercase tracking-wider text-ink font-bold hover:text-accent transition-colors pt-4 border-t border-surface-line/60"
                >
                  <span>Explore Venture</span>
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
