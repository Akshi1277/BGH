import type { Metadata } from "next";
import EnifHero from "@/components/enif/EnifHero";
import EnifServices from "@/components/enif/EnifServices";
import PillList from "@/components/enif/PillList";
import EnifEngagement from "@/components/enif/EnifEngagement";
import EnifWhy from "@/components/enif/EnifWhy";
import ProcessFlow from "@/components/ProcessFlow";
import EnifCTA from "@/components/enif/EnifCTA";
import Footer from "@/components/Footer";

const INDUSTRIES = [
  "Technology",
  "Education",
  "Sport",
  "Healthcare",
  "Hospitality",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Property",
  "Finance",
  "Government",
  "Start-ups",
];

const TECHNOLOGIES = [
  "Cloud Infrastructure",
  "Artificial Intelligence",
  "Machine Learning",
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Python",
  "Azure",
  "AWS",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
];

const PROCESS_STEPS = [
  "Discovery",
  "Research",
  "UI/UX Design",
  "Architecture",
  "Development",
  "Quality Assurance",
  "Deployment",
  "Continuous Improvement",
];

export const metadata: Metadata = {
  title: "ENIF Technologies — Beyond the Stars",
  description:
    "ENIF Technologies is the technology and innovation division of BRAHM Global Holdings — designing, engineering and maintaining digital products, intelligent platforms and enterprise software.",
};

export default function EnifPage() {
  return (
    <main className="bg-[#04070D] text-[#F8FAFC] min-h-screen">
      <EnifHero />
      <EnifServices />
      <PillList
        eyebrow="Industries"
        heading={
          <>
            We engineer solutions across{" "}
            <span className="italic text-[#38BDF8]">multiple industries</span>.
          </>
        }
        items={INDUSTRIES}
      />
      <EnifEngagement />
      <EnifWhy />
      <ProcessFlow
        id="development-process"
        eyebrow="Development Process"
        heading={
          <>
            A disciplined path from{" "}
            <span className="italic text-[#38BDF8]">idea to production</span>.
          </>
        }
        steps={PROCESS_STEPS}
        accent="cyan"
        theme="dark"
      />
      <PillList
        eyebrow="Technologies"
        heading="The stack behind every build."
        items={TECHNOLOGIES}
      />
      <EnifCTA />
      <Footer theme="dark" />
    </main>
  );
}
