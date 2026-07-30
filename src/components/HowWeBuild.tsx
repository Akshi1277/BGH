import ProcessFlow from "./ProcessFlow";

const STEPS = [
  {
    title: "Identify",
    description: "We recognise opportunities where innovation, operational excellence and long-term demand intersect.",
  },
  {
    title: "Validate",
    description: "Every opportunity is rigorously assessed through research, commercial viability and strategic alignment before resources are committed.",
  },
  {
    title: "Build",
    description: "We design, engineer and establish businesses with strong operational foundations, exceptional products and scalable systems.",
  },
  {
    title: "Operate",
    description: "Execution defines every successful enterprise. We focus relentlessly on governance, leadership, customer experience and operational excellence.",
  },
  {
    title: "Grow",
    description: "Through disciplined investment, innovation and strategic expansion, our companies strengthen their market position while creating sustainable long-term value.",
  },
  {
    title: "Endure",
    description: "Our objective is not simply growth, but permanence—building institutions capable of evolving, leading and creating value for generations.",
  },
];

export default function HowWeBuild() {
  return (
    <ProcessFlow
      id="how-we-build"
      eyebrow="How We Build"
      heading={
        <>
          The <span className="italic text-accent">BRAHM</span> Framework
        </>
      }
      description="A disciplined approach to creating, operating and growing enduring enterprises. Every company within BRAHM Global Holdings is built upon the same disciplined methodology—one that transforms ideas into enduring enterprises through strategic thinking, operational excellence and long-term ownership."
      steps={STEPS}
    />
  );
}
