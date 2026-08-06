"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

const LINKS = [
  { label: "Home", href: "/#vision" },
  { label: "Group", href: "/#sectors" },
  { label: "Group Companies", href: "/#companies" },
  { label: "Contact", href: "/#contact" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span className="relative w-9 h-9 rounded-full overflow-hidden border border-[#34D399]/40 shrink-0 bg-[#141A16]">
        <Image
          src="/whatsapp.svg"
          alt="Brahm Global Holdings"
          fill
          sizes="36px"
          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-[0.12em] text-ink">
          BRAHM
        </span>
        <span className="font-mono-ui text-[9px] tracking-[0.32em] text-accent mt-1 font-semibold">
          GLOBAL HOLDINGS
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  if (pathname?.startsWith("/enif") || pathname?.startsWith("/7auriga")) {
    return null;
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full top-0 fixed z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-surface-line shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <Wordmark />

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label font-mono-ui uppercase text-ink-muted hover:text-ink transition-colors py-2 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/enif"
                  className="px-5 py-2.5 bg-ink text-surface rounded-full text-xs font-mono-ui uppercase tracking-[0.12em] font-bold hover:bg-accent transition-colors flex items-center justify-center"
                >
                  ENIF
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
                <Link
                  href="/7auriga"
                  className="px-5 py-2.5 bg-ink text-surface rounded-full text-xs font-mono-ui uppercase tracking-[0.12em] font-bold hover:bg-accent transition-colors flex items-center justify-center"
                >
                  7 AURIGA
                </Link>
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-ink p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10"
            aria-label="Open menu"
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white text-ink flex flex-col md:hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] overflow-y-auto"
          >
            <div className="flex justify-between items-center h-20 px-4 sm:px-margin-mobile shrink-0 border-b border-surface-line">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="text-ink p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10"
                aria-label="Close menu"
              >
                <Icon name="close" size={24} />
              </button>
            </div>
            <div className="flex flex-col justify-center gap-6 sm:gap-8 px-4 sm:px-margin-mobile flex-1 py-8">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3 border-b border-white/10 active:text-[#34D399]"
                  >
                    <span className="font-mono-ui text-xs tracking-widest text-[#34D399]">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl text-[#F4F4F0] group-hover:text-[#34D399] transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-4 sm:p-margin-mobile pb-[max(2.5rem,env(safe-area-inset-bottom))] shrink-0 flex flex-col gap-3">
              <Link
                href="/enif"
                onClick={() => setOpen(false)}
                className="w-full px-6 py-4 bg-ink text-surface rounded-full text-xs font-mono-ui uppercase tracking-[0.1em] font-bold hover:bg-accent transition-colors flex items-center justify-center"
              >
                ENIF
              </Link>
              <Link
                href="/7auriga"
                onClick={() => setOpen(false)}
                className="w-full px-6 py-4 bg-ink text-surface rounded-full text-xs font-mono-ui uppercase tracking-[0.1em] font-bold hover:bg-accent transition-colors flex items-center justify-center"
              >
                7 AURIGA
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
