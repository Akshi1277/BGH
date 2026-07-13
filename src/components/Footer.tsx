import React from "react";
import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    heading: "Portfolio",
    links: [
      { label: "Talent Pro League", href: "#portfolio" },
      { label: "LSA", href: "#portfolio" },
      { label: "Luxure De Eden", href: "#portfolio" },
      { label: "Alayn", href: "#portfolio" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "What We Build", href: "#build" },
      { label: "Why We're Different", href: "#difference" },
      { label: "Why Trust Us", href: "#trust" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Start a Project", href: "#contact" },
      { label: "LinkedIn", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-ink border-t border-ink-line">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/30 shrink-0 bg-ink-high">
              <Image
                src="/image copy.png"
                alt="Brahm Global Holdings"
                fill
                sizes="36px"
                className="object-cover opacity-90"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-[0.12em] text-cream">
                BRAHM
              </span>
              <span className="font-mono-ui text-[9px] tracking-[0.32em] text-gold mt-1">
                GLOBAL HOLDINGS
              </span>
            </span>
          </div>
          <p className="text-sm text-cream-muted leading-relaxed max-w-xs">
            We engineer what&rsquo;s next. A UK-based technology company
            designing and building software products, SaaS platforms, and
            AI-powered ecosystems.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-mono-ui text-label uppercase tracking-[0.1em] text-cream-faint mb-1">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-cream-muted hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[11px] font-mono-ui uppercase tracking-[0.1em] text-cream-faint">
            &copy; {new Date().getFullYear()} Brahm Global Holdings. All
            rights reserved.
          </div>
          <div className="flex gap-6 text-[11px] font-mono-ui uppercase tracking-[0.1em] text-cream-faint">
            <Link href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
