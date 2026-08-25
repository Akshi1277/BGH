import type { Metadata } from "next";
import Footer from "@/components/Footer";

const siteUrl = "https://brahmglobalholdings.com";
const title = "Privacy Policy & Data Protection — BRAHM Global Holdings";
const description =
  "Official Privacy Policy and Data Protection Notice for BRAHM Global Holdings Ltd. Details our commitment to UK GDPR compliance, data security, and user rights.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/privacy`,
    siteName: "BRAHM Global Holdings",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Brahm Global Holdings Privacy Policy",
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

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `${siteUrl}/privacy`,
    "publisher": {
      "@type": "Organization",
      "name": "BRAHM Global Holdings",
      "url": siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressCountry": "GB"
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
              LEGAL & GOVERNANCE
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              Privacy Policy & <span className="italic text-accent">Data Protection.</span>
            </h1>
            <p className="text-base sm:text-lg text-ink-muted font-light leading-relaxed">
              Effective Date: January 1, 2026. This policy describes how BRAHM Global Holdings Ltd collects, processes, and protects your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Main Privacy Body */}
      <section className="section-y border-b border-surface-line bg-paper">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop space-y-12 text-ink">
          
          {/* 1. Data Controller */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              1. Data Controller Information
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              BRAHM Global Holdings Ltd is the data controller responsible for personal information collected through this website (<code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-surface-line font-mono-ui">https://brahmglobalholdings.com</code>) and associated communication channels.
            </p>
            <div className="p-4 rounded-xl border border-surface-line bg-surface text-xs font-mono-ui space-y-1 text-ink-muted">
              <p><strong className="text-ink">Entity:</strong> BRAHM Global Holdings Ltd</p>
              <p><strong className="text-ink">Registered Location:</strong> London, Greater London, United Kingdom</p>
              <p><strong className="text-ink">Data Protection Inquiries:</strong> hello@brahmglobalholdings.com</p>
            </div>
          </div>

          {/* 2. Personal Information Collected */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              2. Information We Collect
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              We practice data minimization and collect only the data necessary to provide our services and respond to inquiries:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-ink-muted font-light">
              <li>
                <strong className="text-ink font-medium">Voluntary Correspondence:</strong> Information you provide when initiating email conversations or partnerships (including your name, email address, corporate affiliation, and project scope).
              </li>
              <li>
                <strong className="text-ink font-medium">Technical Telemetry & Server Logs:</strong> Standard web server connection data including IP addresses, browser headers, referring URLs, and timestamps, utilized solely for network security and traffic monitoring.
              </li>
              <li>
                <strong className="text-ink font-medium">Zero Data Brokerage:</strong> We do not sell, license, rent, or trade your personal information to third-party advertising networks or data aggregators under any circumstances.
              </li>
            </ul>
          </div>

          {/* 3. Legal Bases for Processing */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              3. Legal Bases Under UK GDPR
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              We process personal data only when lawful grounds exist under Article 6 of the UK GDPR:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-surface-line bg-surface">
                <h3 className="font-mono-ui text-xs uppercase tracking-wider text-accent font-bold mb-2">Legitimate Interests</h3>
                <p className="text-xs text-ink-muted font-light leading-relaxed">Responding to enterprise business inquiries and maintaining the security of our infrastructure.</p>
              </div>
              <div className="p-4 rounded-xl border border-surface-line bg-surface">
                <h3 className="font-mono-ui text-xs uppercase tracking-wider text-accent font-bold mb-2">Contractual Necessity</h3>
                <p className="text-xs text-ink-muted font-light leading-relaxed">Executing agreements, engineering services, and joint venture collaborations.</p>
              </div>
              <div className="p-4 rounded-xl border border-surface-line bg-surface">
                <h3 className="font-mono-ui text-xs uppercase tracking-wider text-accent font-bold mb-2">Legal Compliance</h3>
                <p className="text-xs text-ink-muted font-light leading-relaxed">Adhering to statutory requirements under English company and financial regulations.</p>
              </div>
            </div>
          </div>

          {/* 4. Security & Cryptographic Protection */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              4. Security & Retention Safeguards
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              All communications and web traffic are protected by TLS 1.3 cryptographic transport encryption. Access to incoming inquiries is strictly restricted to authorized partners and executive staff through multi-factor authentication. Personal data is retained only for the duration required to satisfy the business purpose for which it was originally collected.
            </p>
          </div>

          {/* 5. Your Statutory Rights */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold">
              5. Your Rights Under UK Data Protection Law
            </h2>
            <p className="text-ink-muted text-sm sm:text-base font-light leading-relaxed">
              Under the UK GDPR and Data Protection Act 2018, you maintain comprehensive statutory rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-ink-muted font-light">
              <li><strong className="text-ink font-medium">Right of Access:</strong> You may request a copy of the personal information we hold about you.</li>
              <li><strong className="text-ink font-medium">Right to Rectification:</strong> You may request correction of inaccurate or incomplete records.</li>
              <li><strong className="text-ink font-medium">Right to Erasure:</strong> You may request deletion of your personal data where retention is no longer justified.</li>
              <li><strong className="text-ink font-medium">Right to Object:</strong> You may object at any time to processing based upon legitimate interests.</li>
            </ul>
            <p className="text-ink-muted text-sm font-light pt-2">
              To submit a Subject Access Request (SAR) or exercise any of the rights above, please contact our data team at <a href="mailto:hello@brahmglobalholdings.com" className="text-accent underline font-medium">hello@brahmglobalholdings.com</a>.
            </p>
          </div>

        </div>
      </section>

      <Footer theme="light" />
    </main>
  );
}
