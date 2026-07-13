import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import GlobalPresence from "@/components/GlobalPresence";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Capabilities />
        <About />
        <Portfolio />
        <GlobalPresence />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
