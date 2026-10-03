import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Mandate from "@/components/Mandate";
import GroupSectors from "@/components/GroupSectors";
import Portfolio from "@/components/Portfolio";
import PhilosophyStandard from "@/components/PhilosophyStandard";
import CTA from "@/components/CTA";
import FrameworkSequence from "@/components/brahm/FrameworkSequence";
import DifferenceSequence from "@/components/brahm/DifferenceSequence";
import BrahmFooter from "@/components/brahm/BrahmFooter";

/*
 * Homepage in its original order. Approved redesigns replace their original counterparts:
 * FrameworkSequence (was HowWeBuild), DifferenceSequence (was WhyBRAHM), BrahmFooter (was Footer).
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Mandate />
      <GroupSectors />
      <Portfolio />
      <FrameworkSequence />
      <PhilosophyStandard />
      <DifferenceSequence />
      <CTA />
      <BrahmFooter />
    </main>
  );
}
