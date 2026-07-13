import React from "react";

const ITEMS = [
  "Software Products",
  "SaaS Platforms",
  "AI-Powered Solutions",
  "Digital Ecosystems",
  "Brahm Global Holdings",
  "United Kingdom",
  "We Engineer What's Next",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="border-y border-ink-line bg-ink-soft py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-mono-ui text-label uppercase tracking-[0.15em] text-cream-muted px-8">
              {item}
            </span>
            <span className="text-gold/50">&#9670;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
