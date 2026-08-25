import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Investment Mechanics & Capital Mandate — BRAHM Global Holdings";
const description =
  "Understand the capital allocation model, venture building mechanics, and partnership criteria of BRAHM Global Holdings.";

export const metadata: Metadata = {
  title: "Investment & Capital Mandate",
  description,
  alternates: {
    canonical: `${siteUrl}/invest`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/invest`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "BRAHM Investment Mandate" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

export default function InvestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/invest`,
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
              CAPITAL MANDATE & MECHANICS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Patient Capital. <span className="italic text-accent">Compounding Value.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              We operate as a permanent-capital venture builder and holding company. We do not manage a closed-end fund with artificial exit clocks; we deploy balance-sheet capital into enterprises built for enduring profitability.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              1. The Venture Builder & Holding Company Model
            </h2>
            <p className="text-ink-muted text-base font-light leading-relaxed">
              Traditional venture capital relies on power-law returns where 90% of portfolio companies fail, forcing aggressive dilution and premature liquidity events. BRAHM Global Holdings operates on an institutional holding company model similar to Berkshire Hathaway and modern venture studios:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-xl border border-surface-line bg-surface">
                <h3 className="font-mono-ui text-xs uppercase tracking-wider text-accent font-bold mb-2">Traditional VC / PE</h3>
                <p className="text-xs text-ink-muted leading-relaxed">Fixed 7–10 year fund lifecycle, forced secondary sales, management fees, passive board oversight without internal engineering capability.</p>
              </div>
              <div className="p-6 rounded-xl border border-accent/40 bg-accent/5">
                <h3 className="font-mono-ui text-xs uppercase tracking-wider text-accent font-bold mb-2">BRAHM Global Holdings</h3>
                <p className="text-xs text-ink font-medium leading-relaxed">Indefinite holding horizon, full internal engineering (ENIF) & brand power (7AURIGA), cash-flow reinvestment, zero forced exit pressure.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              2. Investment Criteria & How We Partner
            </h2>
            <p className="text-ink-muted text-base font-light leading-relaxed">
              When evaluating new ventures, acquisitions, or strategic co-investments, we apply strict operational filters:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-ink-muted font-light">
              <li><strong className="text-ink font-medium">Defensible Unit Economics:</strong> Clear path to organic cash flow rather than continuous external equity dependency.</li>
              <li><strong className="text-ink font-medium">Operational Synergy:</strong> Ventures where ENIF&apos;s software/AI engineering or 7AURIGA&apos;s brand authority creates an immediate 10x competitive advantage.</li>
              <li><strong className="text-ink font-medium">High-Integrity Leadership:</strong> Founders and management teams committed to building enduring institutions.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              3. Engagement Channels for Founders & Partners
            </h2>
            <p className="text-ink-muted text-base font-light leading-relaxed">
              We welcome direct discussions with founders, institutional partners, and co-investors across our six focus sectors.
            </p>
            <div className="p-6 rounded-xl border border-surface-line bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg text-ink font-semibold">Submit a Proposal or Partnership Inquiry</p>
                <p className="text-xs font-mono-ui text-ink-muted mt-1">Direct to Investment & Venture Committee</p>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-ink text-surface font-mono-ui text-xs uppercase tracking-wider font-semibold hover:bg-accent transition-colors shrink-0"
              >
                Start Conversation
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
