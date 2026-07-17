"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

const LINKS = [
  { label: "What We Build", href: "#build" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#difference" },
];

function Wordmark() {
  return (
    <Link href="#" className="flex items-center gap-3 group">
      <span className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/30 shrink-0 bg-ink-high">
        <Image
          src="/logo.png"
          alt="Brahm Global Holdings"
          fill
          sizes="36px"
          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
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
    </Link>
  );
}

export default function Navbar() {
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full top-0 fixed z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ink/95 backdrop-blur-sm border-b border-ink-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <Wordmark />

          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label font-mono-ui uppercase text-cream-muted hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-2.5 rounded-full text-label font-mono-ui uppercase tracking-[0.1em] hover:bg-gold-soft transition-colors duration-300"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-cream p-2 -mr-2"
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
            className="fixed inset-0 z-[60] bg-ink flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center h-20 px-margin-mobile shrink-0">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="text-cream p-2 -mr-2"
                aria-label="Close menu"
              >
                <Icon name="close" size={24} />
              </button>
            </div>
            <div className="flex flex-col justify-center gap-8 px-margin-mobile flex-1">
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
                    className="group flex items-baseline gap-4 py-2 border-b border-ink-line/40"
                  >
                    <span className="font-mono-ui text-xs tracking-widest text-gold">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl text-cream group-hover:text-gold transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="p-margin-mobile pb-10 shrink-0">
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gold text-ink px-6 py-4 rounded-full text-label font-mono-ui uppercase tracking-[0.1em]"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
