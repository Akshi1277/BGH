"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/*
 * Smooth wheel scrolling for the home page's scroll-driven story (hero film, pinned sections).
 * Lenis eases the real window scroll, so every scroll-linked animation glides together instead
 * of stepping with each wheel notch. Touch keeps native momentum (Lenis default), and Lenis
 * itself drops smoothing for prefers-reduced-motion.
 */

let instance: Lenis | null = null;

/** True while Lenis is easing the page, so scroll-linked effects can skip their own easing. */
export function isSmoothScrolling() {
  return instance !== null;
}

/** Scroll the page through Lenis when it's running, natively otherwise. */
export function smoothScrollTo(top: number) {
  if (instance) instance.scrollTo(top);
  else window.scrollTo({ top, behavior: "smooth" });
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true });
    instance = lenis;

    // Same-page hash links (nav, footer, "Explore The Group"): glide there through Lenis.
    // Runs in the capture phase so Next's <Link> sees the click as handled and skips its own
    // instant jump, which would otherwise fight the smooth scroll.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
      // Sector cards are #anchors for no-JS fallback only; the reel handles their clicks
      if (!link || link.closest("[data-card]")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
      history.pushState(null, "", url.hash);
    };
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("click", onClick, true);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
