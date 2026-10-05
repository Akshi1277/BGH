import FilmHero from "@/components/brahm/FilmHero";
import Clients from "@/components/Clients";
import Mandate from "@/components/Mandate";
import SectorReel from "@/components/brahm/SectorReel";
import Portfolio from "@/components/Portfolio";
import PhilosophySection from "@/components/brahm/PhilosophySection";
import ContactSection from "@/components/brahm/ContactSection";
import FrameworkSequence from "@/components/brahm/FrameworkSequence";
import DifferenceSequence from "@/components/brahm/DifferenceSequence";
import BrahmFooter from "@/components/brahm/BrahmFooter";

/*
 * Homepage in its original order. Redesigns replace their original counterparts:
 * FilmHero (was Hero),
 * SectorReel (was GroupSectors), FrameworkSequence (was HowWeBuild), PhilosophySection (was PhilosophyStandard), DifferenceSequence (was WhyBRAHM),
 * ContactSection (was CTA), BrahmFooter (was Footer).
 */
export default function Home() {
  return (
    <main>
      <FilmHero />
      <Clients />
      <Mandate />
      <SectorReel />
      <Portfolio />
      <FrameworkSequence />
      <PhilosophySection />
      <DifferenceSequence />
      <ContactSection />
      <BrahmFooter />
    </main>
  );
}
