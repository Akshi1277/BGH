import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://brahmglobalholdings.com";
const title = "BRAHM GLOBAL HOLDINGS";
const description =
  "We Engineer What's Next. BRAHM GLOBAL HOLDINGS is a UK-based technology company designing and building software products, SaaS platforms, and AI-powered ecosystems — including Talent Pro League, LSA, Luxure De Eden, and Alayn.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${title} — We Engineer What's Next`,
    template: `%s — ${title}`,
  },
  description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: `${title} — We Engineer What's Next`,
    description,
    url: siteUrl,
    siteName: title,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — We Engineer What's Next`,
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
      className={`${playfair.variable} ${inter.variable} ${jbmono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream font-sans-ui relative">
        <div
          aria-hidden
          className="grain-overlay pointer-events-none fixed inset-0 z-[999]"
        />
        {children}
      </body>
    </html>
  );
}
