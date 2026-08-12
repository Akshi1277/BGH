import type { Metadata } from "next";
import { LumaBar } from "@/components/ui/LumaBar";
import EnifHero from "@/components/enif/EnifHero";
import EnifCapabilities from "@/components/enif/EnifCapabilities";

import EnifWhy from "@/components/enif/EnifWhy";
import EnifPhilosophy from "@/components/enif/EnifPhilosophy";
import EnifMethod from "@/components/enif/EnifMethod";
import EnifCTA from "@/components/enif/EnifCTA";
import Footer from "@/components/Footer";
import EnifPageWrapper from "@/components/enif/EnifPageWrapper";

const title = "ENIF Technologies — Beyond the Stars";
const description = "ENIF Technologies is the technology and innovation division of BRAHM Global Holdings — designing, engineering and maintaining digital products, intelligent platforms and enterprise software.";
const siteUrl = "https://brahmglobalholdings.com";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/enif",
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/enif`,
    siteName: "ENIF Technologies",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/eniflogo.png",
        width: 1200,
        height: 630,
        alt: "ENIF Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/eniflogo.png"],
  },
};

export default function EnifPage() {
  return (
    <main className="bg-[#04070D] text-[#F8FAFC] min-h-screen selection:bg-[#38BDF8]/30 selection:text-white">
      <EnifPageWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ENIF Technologies",
              description: description,
              url: `${siteUrl}/enif`,
              logo: `${siteUrl}/eniflogo.png`,
              parentOrganization: {
                "@type": "Organization",
                name: "BRAHM Global Holdings",
              },
            }),
          }}
        />
        <LumaBar />
        <EnifHero />
        <EnifCapabilities />
        <EnifWhy />
        <EnifMethod />
        <EnifPhilosophy />
        <EnifCTA />
        <div className="bg-[#04070D]">
          <Footer theme="dark" />
        </div>
      </EnifPageWrapper>
    </main>
  );
}
