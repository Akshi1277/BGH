"use client"
// Hot reload trigger

import type React from "react"
import Link from "next/link"

interface ShinyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  className?: string
  baseBg?: string
  highlight?: string
  highlightSubtle?: string
}

export function ShinyButton({ 
  children, 
  onClick, 
  href,
  target,
  rel,
  className = "",
  baseBg = "#000000",
  highlight = "#34D399", 
  highlightSubtle = "#6EE7B7"
}: ShinyButtonProps) {
  
  const style = {
    "--shiny-cta-bg": baseBg,
    "--shiny-cta-bg-subtle": "rgba(255, 255, 255, 0.15)",
    "--shiny-cta-fg": "#ffffff",
    "--shiny-cta-highlight": highlight,
    "--shiny-cta-highlight-subtle": highlightSubtle,
  } as React.CSSProperties;

  const content = (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }

        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);
          
          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shiny-cta .shiny-fill::before,
        .shiny-cta .shiny-fill::after,
        .shiny-cta span::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Dots pattern */
        .shiny-cta .shiny-fill::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at var(--position) var(--position),
            white calc(var(--position) / 4),
            transparent 0
          ) padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta .shiny-fill::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        .shiny-cta span {
          z-index: 1;
          /* stands in for the 1px border the rim layers now draw, so the button keeps its size */
          margin: 1px;
        }

        /*
         * The rotating rim. It used to be a conic-gradient border whose angle was animated through
         * a custom property, which made the browser repaint the button on the main thread every
         * frame for as long as the page was open. Now the gradient is drawn once on an oversized
         * layer that spins with a transform (handled by the GPU), and a fill layer inset by 1px
         * covers all of it except the rim. Same picture, no per-frame repaint.
         */
        .shiny-cta .shiny-rim,
        .shiny-cta .shiny-fill {
          pointer-events: none;
          position: absolute;
        }

        .shiny-cta .shiny-rim {
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          width: 150%;
          aspect-ratio: 1;
          z-index: -3;
          background: conic-gradient(
            from calc(0deg - var(--gradient-angle-offset)),
            transparent,
            var(--shiny-cta-highlight) var(--gradient-percent),
            var(--gradient-shine) calc(var(--gradient-percent) * 2),
            var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
            transparent calc(var(--gradient-percent) * 4)
          );
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
          animation: shimmer var(--duration) linear infinite,
            shimmer calc(var(--duration) / 0.4) linear infinite reverse paused;
          animation-composition: add;
        }

        .shiny-cta .shiny-fill {
          inset: 1px;
          z-index: -2;
          border-radius: inherit;
          background: var(--shiny-cta-bg);
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          /* the dots and shimmer layers live on this fill, so they stay inside the rim like before */
          overflow: hidden;
        }

        .shiny-cta:is(:hover, :focus-visible) .shiny-rim {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
          animation-play-state: running;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite paused;
        }

        /* Animate. The shimmer spins with a transform, so it runs all the time; the dots highlight
         * sweeps by repainting, so it only runs while the button is hovered or focused. */
        .shiny-cta .shiny-fill::before,
        .shiny-cta .shiny-fill::after {
          animation: var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta .shiny-fill::before {
          animation-play-state: paused;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible) .shiny-fill::before,
        .shiny-cta:is(:hover, :focus-visible) .shiny-fill::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) span::before {
          opacity: 1;
          animation-play-state: running;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }

        @keyframes breathe {
          from, to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}} />
      <i className="shiny-rim" aria-hidden="true" />
      <i className="shiny-fill" aria-hidden="true" />
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={`shiny-cta ${className}`}
        onClick={onClick}
        style={style}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={`shiny-cta ${className}`} onClick={onClick} style={style}>
      {content}
    </button>
  );
}
