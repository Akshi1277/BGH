import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Contact Us — BRAHM Global Holdings";
const description =
  "Connect with BRAHM Global Holdings. Contact our London headquarters for strategic partnerships, venture incubation, enterprise engineering with ENIF, or brand intelligence with 7AURIGA.";

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

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description: description,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "BRAHM Global Holdings",
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
        addressRegion: "Greater London",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "corporate inquiries",
          email: "brahmglobalholdings@gmail.com",
          availableLanguage: ["English"],
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-surface text-ink pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="section-y border-b border-surface-line relative overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl">
            <span className="text-eyebrow font-mono-ui text-accent block mb-4 uppercase tracking-[0.2em]">
              GET IN TOUCH
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Start a <span className="italic text-accent">Conversation.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-ink-muted font-light leading-relaxed">
              We welcome conversations with ambitious organisations, institutional partners, and visionary founders. Send a direct message below or reach our London headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Info & Dedicated Portals */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="font-mono-ui text-xs text-accent uppercase tracking-widest font-semibold block mb-2">
                  Direct Inquiries
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold mb-4">
                  Direct Line to Leadership
                </h2>
                <p className="text-sm text-ink-muted font-light leading-relaxed">
                  Every submission is reviewed directly by group partners. We do not use automated ticketing queues or outsourced support agencies.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="p-6 rounded-2xl border border-surface-line bg-surface/60 space-y-3">
                <span className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted block font-medium">
                  Primary Corporate Email
                </span>
                <a
                  href="mailto:brahmglobalholdings@gmail.com"
                  className="font-display text-lg sm:text-xl text-ink hover:text-accent font-semibold transition-colors flex items-center justify-between group"
                >
                  <span className="break-all">brahmglobalholdings@gmail.com</span>
                  <span className="w-8 h-8 rounded-full border border-surface-line bg-paper flex items-center justify-center text-ink group-hover:text-accent group-hover:border-accent/40 shrink-0 ml-2 transition-all">
                    <Icon name="arrow-up-right" size={14} />
                  </span>
                </a>
                <p className="text-xs text-ink-muted font-light">
                  Average response time: within 24 hours on London business days.
                </p>
              </div>

              {/* London HQ Card */}
              <div className="p-6 rounded-2xl border border-surface-line bg-surface/60 space-y-2">
                <span className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted block font-medium">
                  Headquarters & Governance
                </span>
                <p className="font-display text-base text-ink font-semibold">
                  London, Greater London, United Kingdom
                </p>
                <p className="text-xs text-ink-muted font-light leading-relaxed">
                  BRAHM Global Holdings Ltd is registered and headquartered in London, operating under UK corporate governance and GDPR data protection frameworks.
                </p>
              </div>

              {/* Dedicated Division Portals */}
              <div className="space-y-3 pt-4 border-t border-surface-line/70">
                <span className="font-mono-ui text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
                  Dedicated Group Portals
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/enif"
                    className="p-4 rounded-xl border border-surface-line bg-surface/40 hover:bg-surface hover:border-accent/30 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="font-mono-ui text-[9px] text-accent uppercase tracking-wider font-semibold block mb-1">
                        Technology Division
                      </span>
                      <p className="font-display text-sm text-ink font-medium group-hover:text-accent transition-colors">
                        ENIF Technologies
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted group-hover:text-accent font-mono-ui mt-3">
                      <span>View Portal</span>
                      <Icon name="arrow-up-right" size={10} />
                    </span>
                  </Link>

                  <Link
                    href="/7auriga"
                    className="p-4 rounded-xl border border-surface-line bg-surface/40 hover:bg-surface hover:border-accent/30 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="font-mono-ui text-[9px] text-accent uppercase tracking-wider font-semibold block mb-1">
                        Brand & Media Division
                      </span>
                      <p className="font-display text-sm text-ink font-medium group-hover:text-accent transition-colors">
                        7AURIGA
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted group-hover:text-accent font-mono-ui mt-3">
                      <span>View Portal</span>
                      <Icon name="arrow-up-right" size={10} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

    

      <Footer theme="light" />
    </main>
  );
}
