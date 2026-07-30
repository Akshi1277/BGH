"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import { StarButton } from "./ui/StarButton";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "The Group", href: "/#group" },
  { label: "Ventures", href: "/#companies" },
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
        <span className="font-display text-lg tracking-[0.12em] text-[#F4F4F0]">
          BRAHM
        </span>
        <span className="font-mono-ui text-[9px] tracking-[0.32em] text-[#34D399] mt-1">
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

  if (pathname?.startsWith("/enif")) {
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
            ? "bg-[#0A0D0B]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
          <Wordmark />

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label font-mono-ui uppercase text-white/70 hover:text-[#34D399] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
              <StarButton
                href="/enif"
                className="font-mono-ui uppercase tracking-[0.12em] font-bold"
              >
                ENIF
              </StarButton>
            </motion.div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[#F4F4F0] p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 active:bg-white/10"
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
            className="fixed inset-0 z-[60] bg-[#0A0D0B] text-[#F4F4F0] flex flex-col md:hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] overflow-y-auto"
          >
            <div className="flex justify-between items-center h-20 px-4 sm:px-margin-mobile shrink-0 border-b border-white/10">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="text-[#F4F4F0] p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/5 active:bg-white/10"
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
            <div className="p-4 sm:p-margin-mobile pb-[max(2.5rem,env(safe-area-inset-bottom))] shrink-0">
              <StarButton
                href="/enif"
                onClick={() => setOpen(false)}
                className="w-full font-mono-ui uppercase tracking-[0.1em] font-bold py-4 h-auto justify-center"
              >
                ENIF
              </StarButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
