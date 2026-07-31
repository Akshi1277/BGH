"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Wraps @splinetool/react-spline with visibility-based pausing.
 * The runtime keeps rendering frames forever once loaded (scenes with any
 * idle/auto-play animation defeat its own `renderOnDemand` default), which
 * pegs the GPU/main thread and shows up as scroll jank on the rest of the
 * page. We stop() the Application whenever the canvas leaves the viewport
 * (or the tab is backgrounded) and play() it again when it's back in view.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const isVisibleRef = useRef(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        const app = appRef.current;
        if (!app) return;
        if (entry.isIntersecting && document.hidden === false) app.play();
        else app.stop();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);

    const onVisibilityChange = () => {
      const app = appRef.current;
      if (!app) return;
      if (document.hidden || !isVisibleRef.current) app.stop();
      else app.play();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
          </div>
        }
      >
        <Spline
          scene={scene}
          className="h-full w-full"
          onLoad={(app) => {
            appRef.current = app;
            if (!isVisibleRef.current || document.hidden) app.stop();
          }}
        />
      </Suspense>
    </div>
  );
}
