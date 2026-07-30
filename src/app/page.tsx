import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import HowWeBuild from "@/components/HowWeBuild";
import TheBrahmStandard from "@/components/TheBrahmStandard";
import Portfolio from "@/components/Portfolio";
import FoundersVision from "@/components/FoundersVision";
import GlobalPresence from "@/components/GlobalPresence";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TheBrahmStandard />
      <Marquee />
      <About />
      <HowWeBuild />
      <Portfolio />
      <FoundersVision />
      <GlobalPresence />
      <CTA />
      <Footer theme="light" />
    </main>
  );
}
