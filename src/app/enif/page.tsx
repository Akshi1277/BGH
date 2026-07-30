import type { Metadata } from "next";
import { LumaBar } from "@/components/ui/LumaBar";
import EnifHero from "@/components/enif/EnifHero";
import EnifCapabilities from "@/components/enif/EnifCapabilities";

import EnifWhy from "@/components/enif/EnifWhy";
import EnifPhilosophy from "@/components/enif/EnifPhilosophy";
import EnifMethod from "@/components/enif/EnifMethod";
import EnifTech from "@/components/enif/EnifTech";
import EnifCTA from "@/components/enif/EnifCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ENIF Technologies — Beyond the Stars",
  description:
    "ENIF Technologies is the technology and innovation division of BRAHM Global Holdings — designing, engineering and maintaining digital products, intelligent platforms and enterprise software.",
};

export default function EnifPage() {
  return (
    <main className="bg-[#04070D] text-[#F8FAFC] min-h-screen selection:bg-[#38BDF8]/30 selection:text-white">
      <LumaBar />
      <EnifHero />
      <EnifCapabilities />

      <EnifWhy />
      <EnifMethod />
      <EnifPhilosophy />
      <EnifTech />
      <EnifCTA />
      <div className="bg-[#04070D]">
        <Footer theme="dark" />
      </div>
    </main>
  );
}
