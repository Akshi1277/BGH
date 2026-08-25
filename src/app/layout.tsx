import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Manrope, Crimson_Text } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-tech-display",
  subsets: ["latin"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-crimson",
  display: "swap",
});

const siteUrl = "https://brahmglobalholdings.com";
const title = "BRAHM GLOBAL HOLDINGS";
const tagline = "Building Enduring Businesses";
const description =
  "BRAHM Global Holdings is a British venture builder and holding company that creates, acquires and scales exceptional businesses across technology, education, sport, hospitality and luxury consumer brands — including Talent Pro League, LSA, Alayn, Luxure De Eden, and our technology division, ENIF.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: `${title} — ${tagline}`,
    template: `%s — ${title}`,
  },
  description,
  keywords: [
    "Brahm",
    "Brahm Global",
    "Brahm Global Holdings",
    "Venture Builder",
    "Holding Company",
    "UK",
    "ENIF Technologies",
    "7AURIGA",
    "Talent Pro League",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: `${title} — ${tagline}`,
    description,
    url: siteUrl,
    siteName: title,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Brahm Global Holdings Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${tagline}`,
    description,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": title,
    "alternateName": ["Brahm", "Brahm Global", "BGH", "BRAHM Global Holdings Ltd"],
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressRegion": "Greater London",
      "addressCountry": "GB"
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
    ],
    "sameAs": [
      "https://www.linkedin.com/company/brahmglobalholdings"
    ]
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${spaceGrotesk.variable} ${jbmono.variable} ${manrope.variable} ${crimsonText.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-ink font-sans-ui relative selection:bg-accent selection:text-white">
        <div
          aria-hidden
          className="grain-overlay pointer-events-none fixed inset-0 z-[999]"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
