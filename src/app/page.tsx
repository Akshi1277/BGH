import Hero from "@/components/Hero";
import Mandate from "@/components/Mandate";
import GroupSectors from "@/components/GroupSectors";
import Portfolio from "@/components/Portfolio";
import HowWeBuild from "@/components/HowWeBuild";
import PhilosophyStandard from "@/components/PhilosophyStandard";
import WhyBRAHM from "@/components/WhyBRAHM";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Mandate />
      <GroupSectors />
      <Portfolio />
      <HowWeBuild />
      <PhilosophyStandard />
      <WhyBRAHM />
      <CTA />
      <Footer theme="light" />
    </main>
  );
}
