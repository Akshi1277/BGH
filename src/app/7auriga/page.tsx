import type { Metadata } from "next";
import { AurigaBar } from "@/components/ui/AurigaBar";
import AurigaHero from "@/components/auriga/AurigaHero";
import AurigaAbout from "@/components/auriga/AurigaAbout";
import AurigaCapabilities from "@/components/auriga/AurigaCapabilities";
import AurigaStandard from "@/components/auriga/AurigaStandard";
import AurigaOrganisations from "@/components/auriga/AurigaOrganisations";
import AurigaMethod from "@/components/auriga/AurigaMethod";
import AurigaCTA from "@/components/auriga/AurigaCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "7AURIGA - Strategic Communications & Creative Company",
  description: "7AURIGA builds perception. We build identities that endure. Brand, Media, and Communications.",
};

export default function AurigaPage() {
  return (
    <div className="min-h-screen bg-[#04070D] text-[#F8FAFC] selection:bg-[#E0115F] selection:text-white">
      {/* 7AURIGA Custom Navigation */}
      <AurigaBar />

      <main>
        <AurigaHero />
        <AurigaAbout />
        <AurigaCapabilities />
        <AurigaStandard />
        <AurigaMethod />
        <AurigaOrganisations />
        <AurigaCTA />
      </main>

      {/* Global BGH Footer for consistency */}
      <Footer />
    </div>
  );
}
