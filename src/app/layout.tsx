import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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
  title: {
    default: `${title} — ${tagline}`,
    template: `%s — ${title}`,
  },
  description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: `${title} — ${tagline}`,
    description,
    url: siteUrl,
    siteName: title,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${tagline}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${spaceGrotesk.variable} ${jbmono.variable} h-full antialiased`}
    >
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
