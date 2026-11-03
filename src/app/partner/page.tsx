import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ORG_ADDRESSES } from "@/lib/org-locations";

const siteUrl = "https://brahmglobalholdings.com";
const pageUrl = `${siteUrl}/partner`;
const email = "brahmglobalholdings@gmail.com";
const ceoName = "Iyaan Tauquir Khan";

const title = "Partner With BRAHM Global Holdings — Grow Your Business With the Group";
const description =
  "Founders and business owners in the UK and India can partner with BRAHM Global Holdings. Join the group and gain technology, brand, operations and a network built for long-term growth. Speak directly with our CEO.";

export const metadata: Metadata = {
  title: "Partner With Us",
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Partner with BRAHM Global Holdings" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

const CAPABILITIES = [
  {
    number: "01",
    title: "Technology & AI",
    desc: "ENIF Technologies, the group's engineering company, builds the software, AI and cloud infrastructure your business needs — as an in-house capability, not an outside agency.",
  },
  {
    number: "02",
    title: "Brand & Communications",
    desc: "7AURIGA, the group's creative company, shapes your positioning, identity and reputation so the business is understood and trusted in its market.",
  },
  {
    number: "03",
    title: "Operations & Governance",
    desc: "Experienced operating support, financial discipline and governance standards that help a growing business run reliably as it scales.",
  },
  {
    number: "04",
    title: "Network Across the UK & India",
    desc: "Access to the group's companies, partners and relationships across both markets — from London to Mumbai — to open new customers and opportunities.",
  },
];

const FIT = [
  "Founder-led or owner-managed businesses with a real product, service or brand",
  "Teams who want to keep building — and want a long-term partner, not a quick exit",
  "Any sector, any stage — from early-stage ventures to established companies",
  "Based in, or growing into, the United Kingdom or India",
];

const STEPS = [
  {
    number: "01",
    title: "Introduction",
    desc: "Write to our CEO with a short note about your business and what you are looking for.",
  },
  {
    number: "02",
    title: "Conversation",
    desc: "A direct, confidential discussion about your goals and where the group can add the most value.",
  },
  {
    number: "03",
    title: "Shaping the partnership",
    desc: "We agree a structure that suits you. Partnerships can involve the group taking a majority or a minority stake.",
  },
  {
    number: "04",
    title: "Building together",
    desc: "Your business joins the group and gains access to its technology, brand, operating and network resources.",
  },
];

export default function PartnerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    about: {
      "@type": "Organization",
      name: "BRAHM Global Holdings",
      url: siteUrl,
      address: ORG_ADDRESSES,
      areaServed: ["GB", "IN"],
      employee: {
        "@type": "Person",
        name: ceoName,
        jobTitle: "Chief Executive Officer",
        email,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email,
        areaServed: ["GB", "IN"],
        availableLanguage: ["English"],
      },
    },
  };

  const mailto = `mailto:${email}?subject=${encodeURIComponent("Partnership enquiry")}`;

  return (
    <main className="min-h-screen bg-surface text-ink pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="section-y border-b border-surface-line relative overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
              PARTNER WITH BRAHM
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Grow Your Business <span className="italic text-accent">Inside the Group.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              BRAHM Global Holdings partners with founders and business owners across the United Kingdom and India. When a business joins the group, it gains the technology, brand, operating support and network of a long-term holding company — built to help it grow for decades, not quarters.
            </p>
          </div>
        </div>
      </section>

      {/* What the group brings */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl mb-16">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              WHAT WE BRING
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
              More Than Capital. A Whole Group Behind You.
            </h2>
            <p className="text-ink-muted text-base font-light">
              Our own companies provide the capabilities most growing businesses have to buy from outside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPABILITIES.map((item) => (
              <div
                key={item.number}
                className="p-8 rounded-2xl border border-surface-line bg-surface/60"
              >
                <span className="font-mono-ui text-xs text-accent tracking-widest block mb-4 font-bold">
                  {item.number}
                </span>
                <h3 className="font-display text-xl text-ink font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-ink-muted font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we partner with */}
      <section className="section-y border-b border-surface-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              WHO WE PARTNER WITH
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Ambitious Businesses With Room to Grow.
            </h2>
          </div>
          <ul className="lg:col-span-7 space-y-4 text-ink-muted text-base sm:text-lg font-light leading-relaxed">
            {FIT.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="mt-3 w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-2xl mb-16">
            <span className="text-eyebrow font-mono-ui text-accent block mb-3 uppercase tracking-[0.2em]">
              HOW IT WORKS
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              A Simple, Direct Process.
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <li key={step.number} className="p-6 rounded-xl border border-surface-line bg-surface/60">
                <span className="font-mono-ui text-xs text-accent tracking-widest block mb-3 font-bold">
                  {step.number}
                </span>
                <h3 className="font-display text-lg text-ink font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-ink-muted font-light leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Speak with the CEO */}
      <section className="section-y border-b border-surface-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-eyebrow font-mono-ui text-accent block uppercase tracking-[0.2em]">
              START A CONVERSATION
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              Speak Directly With Our CEO.
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              Partnership conversations are handled personally by {ceoName}, Chief Executive Officer of BRAHM Global Holdings. Every enquiry is treated in confidence.
            </p>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              Offices in London, United Kingdom and Mumbai, India.
            </p>
          </div>
          <div className="lg:col-span-6 p-8 rounded-2xl border border-surface-line bg-paper">
            <h3 className="font-display text-xl text-ink font-semibold mb-2">{ceoName}</h3>
            <p className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted mb-6">
              Chief Executive Officer
            </p>
            <a
              href={mailto}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ink text-surface font-mono-ui text-xs uppercase tracking-wider font-semibold hover:bg-accent transition-colors"
            >
              Email the CEO
            </a>
            <p className="mt-4 text-xs text-ink-muted font-light">
              {email} · or use the <Link href="/contact" className="text-accent hover:underline">contact form</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
