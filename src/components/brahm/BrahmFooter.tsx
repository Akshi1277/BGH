import Link from "next/link";
import NetworkMark from "./NetworkMark";
import { footer } from "./content";

/**
 * The BRAHM Global Holdings Footer (Chalk & Pine Light Theme)
 * - Large architectural wordmark: BRAHM + Global Holdings
 * - NetworkMark ecosystem backdrop in light ink tone
 * - 3 Columns of Group links matching brahmglobalholdings.com
 * - Tagline, HQ London, international markets, and copyright bar.
 */
export default function BrahmFooter() {
  return (
    <footer className="relative overflow-hidden bg-surface text-ink border-t border-surface-line">
      {/* Decorative NetworkMark watermark in light graphite ink */}
      <NetworkMark
        tone="ink"
        className="pointer-events-none absolute -right-[14vw] -top-[16vw] w-[min(85vw,960px)] opacity-[0.25]"
      />

      <div className="relative mx-auto max-w-[1400px] px-8 pt-20 md:px-12 md:pt-28">
        {/* Large Architectural Wordmark */}
        <div className="select-none">
          <p
            className="font-display text-[clamp(68px,17vw,280px)] leading-[0.8] tracking-[-0.03em] text-ink font-normal uppercase"
            aria-label="BRAHM Global Holdings"
          >
            BRAHM
          </p>
          <p className="font-mono-ui mt-4 md:mt-6 text-xs md:text-sm tracking-[0.42em] uppercase font-semibold text-accent">
            Global Holdings
          </p>
        </div>

        {/* Info & Navigation Grid */}
        <div className="mt-16 md:mt-24 grid gap-12 border-t border-surface-line pt-12 lg:grid-cols-12">
          {/* Tagline & HQ */}
          <div className="space-y-6 lg:col-span-4">
            <p className="font-display max-w-[32ch] text-[20px] md:text-[22px] leading-snug text-ink/80 font-normal">
              {footer.tagline}
            </p>
            <div className="font-mono-ui text-xs uppercase tracking-wider space-y-1.5 text-ink-muted">
              <p>{footer.hq}</p>
              <p className="text-ink/40">{footer.markets}</p>
            </div>
          </div>

          {/* 3 Nav Columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footer.columns.map((col) => (
              <div key={col.heading}>
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-block text-[14px] md:text-[15px] font-light text-ink-muted transition-colors duration-200 hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Copyright & Location Bar */}
      <div className="relative mt-16 md:mt-20 border-t border-surface-line bg-surface-soft/60">
        <div className="font-mono-ui text-xs mx-auto flex max-w-[1400px] flex-col justify-between gap-3 px-8 py-6 text-ink/50 sm:flex-row md:px-12">
          <p>
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <p>{footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
