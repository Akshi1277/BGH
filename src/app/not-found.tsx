import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "404 — Page Not Found",
  description: "The requested resource could not be found on BRAHM Global Holdings.",
  robots: {
    index: false,
    follow: true,
  },
};

const RECOVERY_LINKS = [
  { label: "Home", href: "/", desc: "Group overview and operating mandate" },
  { label: "About", href: "/about", desc: "Corporate history, philosophy and governance" },
  { label: "Contact", href: "/contact", desc: "Direct channels and venture inquiries" },
  { label: "ENIF Technologies", href: "/enif", desc: "Enterprise software & AI division" },
  { label: "7AURIGA", href: "/7auriga", desc: "Identity intelligence & media practice" },
  { label: "Privacy Policy", href: "/privacy", desc: "Data protection & UK GDPR terms" },
];

export default function NotFound() {
  return (
    <main className="min-h-[85vh] flex items-center justify-center py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none w-[500px] h-[500px] rounded-full"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 12%, transparent) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-2xl w-full mx-auto text-center relative z-10">
        {/* Eyebrow / Error Code */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-line bg-surface-high mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono-ui text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            HTTP 404 — NOT FOUND
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-4">
          Resource Not Located.
        </h1>

        <p className="text-ink-muted text-base sm:text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed">
          The requested page does not exist or may have been moved. If you are an AI crawler or visitor, use the directory below to navigate.
        </p>

        {/* Recovery Link Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-10">
          {RECOVERY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group p-4 rounded-xl border border-surface-line bg-paper/60 hover:bg-paper hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display text-base text-ink group-hover:text-accent transition-colors font-medium">
                  {item.label}
                </span>
                <Icon
                  name="arrow-right"
                  size={14}
                  className="text-ink-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                />
              </div>
              <span className="text-xs text-ink-muted font-light">
                {item.desc}
              </span>
            </Link>
          ))}
        </div>

        {/* Machine-Readable Helpers */}
        <div className="pt-6 border-t border-surface-line flex flex-wrap items-center justify-center gap-6 text-xs font-mono-ui uppercase tracking-wider text-ink-muted">
          <Link
            href="/llms.txt"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>llms.txt</span>
            <Icon name="arrow-up-right" size={12} />
          </Link>
          <Link
            href="/llms-full.txt"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>llms-full.txt</span>
            <Icon name="arrow-up-right" size={12} />
          </Link>
          <Link
            href="/sitemap.xml"
            className="hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span>sitemap.xml</span>
            <Icon name="arrow-up-right" size={12} />
          </Link>
        </div>
      </div>
    </main>
  );
}
