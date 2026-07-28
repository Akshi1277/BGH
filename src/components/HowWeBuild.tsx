import ProcessFlow from "./ProcessFlow";

const STEPS = [
  "Discover Opportunities",
  "Validate Markets",
  "Build Products",
  "Launch Commercially",
  "Scale Sustainably",
  "Expand Internationally",
];

export default function HowWeBuild() {
  return (
    <ProcessFlow
      id="how-we-build"
      eyebrow="How We Build"
      heading={
        <>
          The <span className="italic text-accent">BRAHM</span> Framework.
        </>
      }
      description="Every venture follows the same disciplined process — this framework allows every company within the Group to grow with consistency, clarity and operational discipline."
      steps={STEPS}
    />
  );
}
