"use client";

import {
  useCallback,
  useEffect,
  useInsertionEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { EASE } from "./motion";

/*
 * ONE SCENE AT TWO MOMENTS:
 * 16 vertical cards (270 x 480 px, 9:16) sit on the inside of a cylinder.
 * Two motion values drive everything: `formation` (0 -> 1) and `expansion` (0 -> 1).
 * One pure function `reelPose(angle, formation, scene)` computes every card's 3D transform.
 */

export const REEL_SLOTS = 16;
const STEP = 360 / REEL_SLOTS;
// Autoplay dwells on each sector long enough to read its details, then steps one card forward
const DWELL_MS = 6500;
// After a drag, swipe, wheel turn or pick, autoplay stays off for this long
const USER_HOLD_MS = 15000;
const DEAL = 0.3;
const START = {
  radius: 460,
  perspective: 1000,
  tilt: -22,
  roll: -20,
  scale: 0.52,
};

export interface ReelScene {
  radius: number;
  anchor: number;
  perspective: number;
  tilt: number;
  roll: number;
  orientation: number;
  scale: number;
  expansion: number;
}

export interface ReelPose {
  x: number;
  y: number;
  z: number;
  yaw: number;
  roll: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  appear: number;
  behindCamera: boolean;
}

export interface ReelSectorItem {
  index: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  video?: string;
  focusAreas: string[];
  group: string;
}

export interface ReelRingHandle {
  spinToItem: (itemIndex: number) => void;
}

export function reelAngle(slot: number, angle: number, slots = REEL_SLOTS): number {
  return ((((slot * 360) / slots + angle + 180) % 360) + 360) % 360 - 180;
}

export function reelSlotItem(
  slot: number,
  angle: number,
  total: number,
  slots = REEL_SLOTS,
): number {
  const lap = Math.floor(((360 * slot) / slots + angle + 180) / 360);
  return (((slot - lap * slots) % total) + total) % total;
}

export function reelScene(expansion: number, camera = 720): ReelScene {
  const tilt = START.tilt * (1 - expansion);
  const radius = START.radius + (1620 - START.radius) * expansion;
  const anchor =
    -radius * Math.sin((tilt * Math.PI) / 180) +
    START.radius * Math.sin((START.tilt * Math.PI) / 180) * (1 - expansion);

  return {
    radius,
    anchor,
    perspective: START.perspective + (camera - START.perspective) * expansion,
    tilt,
    roll: START.roll * (1 - expansion),
    orientation: 1,
    scale: START.scale + (2.05 - START.scale) * expansion * expansion,
    expansion,
  };
}

export function reelPose(
  angle: number,
  formation: number,
  scene: ReelScene,
): ReelPose {
  const around = (((angle + 180) % 360) + 360) % 360;
  const order = around / 360;
  const t = Math.max(0, Math.min(1, (formation - order * (1 - DEAL)) / DEAL));
  const dealt = 1 - (1 - t) ** 3;
  const placed = -180 + around * dealt;
  const r = (placed * Math.PI) / 180;
  const radius = scene.radius - (1 - dealt) * order * 24;
  const x = -Math.sin(r) * radius;
  const z = -Math.cos(r) * radius;
  const cameraZ = z * Math.cos((scene.tilt * Math.PI) / 180);

  // Compensate for wide-angle rectilinear horizontal stretching on side cylinder cards
  const cosR = Math.cos(r);
  const rawStretch =
    cosR > 0.05
      ? (scene.radius + scene.perspective * cosR) /
        Math.max(120, scene.perspective + scene.radius * cosR)
      : 1;
  const stretch = Math.max(1, Math.min(2.1, rawStretch));
  const scaleX = scene.scale / (1 + (stretch - 1) * 0.68 * scene.expansion);
  const scaleY = scene.scale;

  return {
    x,
    y: 0,
    z,
    yaw: placed * scene.orientation,
    roll: 0,
    scale: scene.scale,
    scaleX,
    scaleY,
    appear: Math.min(1, t * 2.5),
    behindCamera: cameraZ >= scene.perspective - 70,
  };
}

export function verifyReelPose(): boolean {
  const s0 = reelScene(0);
  const s1 = reelScene(1);
  if (Math.abs(s0.radius - 460) > 1e-6 || Math.abs(s1.radius - 1620) > 1e-6) {
    return false;
  }
  for (let slot = 0; slot < REEL_SLOTS; slot++) {
    const a = reelAngle(slot, 0, REEL_SLOTS);
    const p = reelPose(a, 1, s1);
    if (Math.abs(Math.hypot(p.x, p.z) - s1.radius) > 1e-4) return false;
  }
  return true;
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=";

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = () => {
      const elapsed = performance.now() - t0;
      if (elapsed >= 0) {
        const solved = Math.floor(elapsed / 45);
        setOut(
          [...text]
            .map((ch, idx) =>
              ch === " " || idx < solved
                ? ch
                : idx < solved + 6
                  ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                  : "",
            )
            .join(""),
        );
        if (solved >= text.length) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);

  return <>{out || "\u00A0"}</>;
}

function Odometer({ value }: { value: number }) {
  const digits = Math.max(0, Math.min(999, value))
    .toString()
    .padStart(3, "0")
    .split("")
    .map(Number);

  return (
    <span className="bx-odometer">
      {digits.map((d, idx) => (
        <span key={idx} className="bx-odometerDigit">
          <span style={{ transform: `translateY(${-(10 * d)}%)` }}>
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

interface ReelLoaderProps {
  active: boolean;
  loading: boolean;
  ready: number;
  total: number;
  formation: MotionValue<number>;
  expansion: MotionValue<number>;
  skip: MotionValue<number>;
  stageRef: React.RefObject<HTMLElement | null>;
  onChromeStart: (immediate?: boolean) => void;
  onComplete: () => void;
}

function ReelLoader({
  active,
  loading,
  ready,
  total,
  formation,
  expansion,
  skip,
  stageRef,
  onChromeStart,
  onComplete,
}: ReelLoaderProps) {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const skippedRef = useRef(false);
  const finishedRef = useRef(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);
  const tryRevealRef = useRef<() => void>(() => {});
  const progressMv = useMotionValue(0);
  const [displayPct, setDisplayPct] = useState(0);

  useInsertionEffect(() => {
    return progressMv.on("change", (v) => setDisplayPct(Math.round(v)));
  }, [progressMv]);

  useEffect(() => {
    loadingRef.current = loading;
    tryRevealRef.current();
  }, [loading]);

  useEffect(() => {
    const targetPct = total ? (ready / total) * 100 : 100;
    const ctrl = animate(progressMv, targetPct, {
      duration: 0.55,
      ease: EASE,
    });
    return () => ctrl.stop();
  }, [progressMv, ready, total]);

  // Measure the real target heading in the section below and fly the loader wordmark into it
  useEffect(() => {
    if (showBackdrop || !showBrand) return;
    const brandEl = brandRef.current;
    const targetEl = stageRef.current?.querySelector("[data-sectors-wordmark]");
    if (skippedRef.current || !brandEl || !targetEl) {
      setShowBrand(false);
      return;
    }
    const fromRect = brandEl.getBoundingClientRect();
    const toRect = targetEl.getBoundingClientRect();
    const scale =
      parseFloat(getComputedStyle(targetEl).fontSize) /
      Math.max(1, parseFloat(getComputedStyle(brandEl).fontSize));

    const moveCtrl = animate(
      brandEl,
      {
        x: toRect.left - fromRect.left,
        y: toRect.top - fromRect.top,
        scale,
      },
      { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
    );
    const fadeCtrl = brandEl.lastElementChild
      ? animate(brandEl, { opacity: [1, 1, 0] }, { duration: 1.1, times: [0, 0.75, 1] })
      : null;
    const timer = window.setTimeout(() => setShowBrand(false), 1120);

    return () => {
      moveCtrl.stop();
      fadeCtrl?.stop();
      clearTimeout(timer);
    };
  }, [showBackdrop, showBrand, stageRef]);

  useEffect(() => {
    if (finishedRef.current) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let formed = false;
    let revealing = false;
    let cancelled = false;
    const controls: Array<{ stop: () => void }> = [];

    const finish = (immediate = false) => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      onComplete();
      if (immediate) onChromeStart(true);
    };

    const jumpToEnd = () => {
      if (cancelled || finishedRef.current) return;
      skippedRef.current = true;
      revealing = true;
      controls.forEach((c) => c.stop());
      if (backdropRef.current) backdropRef.current.style.display = "none";
      formation.jump(1);
      expansion.jump(1);
      setShowBackdrop(false);
      setShowBrand(false);
      finish(true);
    };

    if (mq.matches || skip.get() > 0) {
      jumpToEnd();
      return;
    }

    const unsubSkip = skip.on("change", jumpToEnd);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") {
        jumpToEnd();
      }
    };
    const onMotionChange = () => {
      if (mq.matches) jumpToEnd();
    };

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onMotionChange);

    if (!active) {
      return () => {
        cancelled = true;
        unsubSkip();
        window.removeEventListener("keydown", onKeyDown);
        mq.removeEventListener("change", onMotionChange);
      };
    }

    tryRevealRef.current = () => {
      if (!formed || loadingRef.current || revealing || cancelled || finishedRef.current) return;
      revealing = true;
      setShowBackdrop(false);
      controls.push(
        animate(expansion, 1, {
          duration: 1.35,
          ease: [0.5, 0, 0.15, 1],
          onComplete: () => finish(false),
        }),
      );
      controls.push(
        animate(0, 1, {
          duration: 0.75,
          onComplete: () => {
            if (!cancelled) onChromeStart(false);
          },
        }),
      );
    };

    controls.push(
      animate(formation, 1, {
        duration: 1.4,
        ease: "linear",
        onComplete: () => {
          if (cancelled || finishedRef.current) return;
          if (mq.matches || skip.get() > 0) {
            jumpToEnd();
            return;
          }
          formed = true;
          tryRevealRef.current();
        },
      }),
    );

    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
      unsubSkip();
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onMotionChange);
    };
  }, [active, formation, expansion, skip, onChromeStart, onComplete]);

  return (
    <>
      {showBrand && (
        <p ref={brandRef} className="bx-loaderBrand" aria-hidden="true">
          {"Sectors.".split("").map((ch, idx) => (
            <span key={idx} className="bx-loaderMask">
              <motion.span
                initial={{ y: "105%", rotate: 8 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1 + idx * 0.08,
                  ease: EASE,
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </p>
      )}

      <AnimatePresence>
        {showBackdrop && (
          <motion.div
            ref={backdropRef}
            className="bx-reelLoader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="bx-loaderStatus">
              <motion.p
                className="bx-loaderCaption"
                aria-hidden="true"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <ScrambleText text="Loading Sectors" delay={200} />
              </motion.p>
              <div
                className="bx-loaderCount"
                role="progressbar"
                aria-label="Preparing Group Sectors"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={total ? Math.round((ready / total) * 100) : 100}
              >
                <motion.span
                  className="bx-loaderMask"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{
                    y: "-100%",
                    transition: { duration: 0.5, ease: [0.6, 0, 0.8, 0.4] },
                  }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                >
                  <Odometer value={displayPct} />
                </motion.span>
                <span className="bx-loaderPercent">%</span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Skip entrance animation"
              title="Skip animation"
              onClick={() => skip.set(skip.get() + 1)}
            >
              ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function useSectorAssetProgress(items: ReelSectorItem[], enabled: boolean) {
  const [progress, setProgress] = useState({ ready: 0, total: items.length });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Don't spend the visitor's bandwidth until the section is close
    if (!enabled) return;
    let cancelled = false;
    const total = items.length;
    let readyCount = 0;

    items.forEach((it) => {
      const im = new window.Image();
      im.decoding = "async";
      const mark = () => {
        if (cancelled) return;
        readyCount += 1;
        setProgress({ ready: readyCount, total });
      };
      im.onload = () => {
        if ("decode" in im) {
          im.decode().catch(() => {}).finally(mark);
        } else {
          mark();
        }
      };
      im.onerror = mark;
      im.src = it.image;
    });

    const safety = window.setTimeout(() => {
      if (!cancelled) setTimedOut(true);
    }, 3000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [items, enabled]);

  return {
    ready: progress.ready,
    total: progress.total,
    loading: !timedOut && progress.ready < progress.total,
  };
}

function dominantAxis(dx: number, dy: number) {
  return Math.abs(dx) >= Math.abs(dy) ? dx : dy;
}

interface ReelCardProps {
  item: ReelSectorItem;
  itemIndex: number;
  isActive: boolean;
  isDimmed: boolean;
  preventClick: () => boolean;
  onSelect: (index: number) => void;
}

function ReelCard({
  item,
  itemIndex,
  isActive,
  isDimmed,
  preventClick,
  onSelect,
}: ReelCardProps) {
  const rotX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotY = useSpring(0, { stiffness: 180, damping: 24 });
  const liftZ = useSpring(0, { stiffness: 180, damping: 24 });

  const resetTilt = () => {
    rotX.set(0);
    rotY.set(0);
    liftZ.set(0);
  };

  const srLabel = `${item.title} — ${item.summary}`;

  return (
    <a
      href={`#sector-detail-${item.index}`}
      draggable={false}
      data-card=""
      data-active={isActive ? "" : undefined}
      data-dimmed={isDimmed ? "" : undefined}
      aria-label={srLabel}
      className="bx-card"
      style={
        {
          "--world": "var(--color-accent)",
          "--on": "var(--color-surface)",
        } as React.CSSProperties
      }
      onDragStart={(e) => e.preventDefault()}
      onClick={(e) => {
        e.preventDefault();
        if (preventClick()) return;
        onSelect(itemIndex);
      }}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
        const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
        rotX.set(-(20 * ny));
        rotY.set(24 * nx);
        liftZ.set(45);
      }}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
    >
      <motion.span
        className="bx-tilt"
        style={{ rotateX: rotX, rotateY: rotY, z: liftZ }}
      >
        <span className="bx-frame" aria-hidden="true" />
        <span className="bx-face">
          <Image
            draggable={false}
            src={item.image}
            alt={srLabel}
            fill
            sizes="360px"
            className="bx-reelPoster"
          />
          {item.video && (
            // src is attached by the ring loop only while this card faces the viewer and the section is near
            <video
              data-src={item.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className="bx-reelPreview"
              onLoadedData={(e) => {
                e.currentTarget.dataset.ready = "";
              }}
              onPlaying={(e) => {
                e.currentTarget.dataset.ready = "";
              }}
            />
          )}
          <span className="bx-views" aria-hidden="true">
            {item.index}
          </span>
          <span className="bx-cardLabel" aria-hidden="true">
            <b>{item.group === "Core Sectors" ? "CORE" : "EMERGING"}</b>
            <span>{item.title}</span>
            <i>↗</i>
          </span>
        </span>
      </motion.span>
    </a>
  );
}

interface ReelRingProps {
  items: ReelSectorItem[];
  activeIndex: number;
  focusedIndex: number | null;
  inView: boolean;
  /** Live: the section is on screen or about to be. Media loads and the loop runs only while true. */
  near: boolean;
  stageRef: React.RefObject<HTMLElement | null>;
  onSelect: (index: number) => void;
  onChromeStart: (immediate?: boolean) => void;
  onEntranceComplete: () => void;
}

const ReelRing = forwardRef<ReelRingHandle, ReelRingProps>(function ReelRing(
  {
    items,
    activeIndex,
    focusedIndex,
    inView,
    near,
    stageRef,
    onSelect,
    onChromeStart,
    onEntranceComplete,
  },
  ref,
) {
  const wallRef = useRef<HTMLDivElement>(null);
  const wasDraggedRef = useRef(false);
  const enteredRef = useRef(false);
  const userHoldUntilRef = useRef(0);
  // True while a picked card is still travelling to the front, so passing cards don't flash as active
  const pickPendingRef = useRef(false);
  const inViewRef = useRef(inView);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const nearRef = useRef(near);
  const wakeRef = useRef<() => void>(() => {});
  const [hasBeenNear, setHasBeenNear] = useState(near);
  if (near && !hasBeenNear) setHasBeenNear(true);
  useEffect(() => {
    nearRef.current = near;
    if (near) wakeRef.current();
  }, [near]);

  const { ready, total, loading } = useSectorAssetProgress(items, hasBeenNear);

  const formation = useMotionValue(0);
  const expansion = useMotionValue(0);
  const skip = useMotionValue(0);

  const targetAngle = useMotionValue(0);
  const springAngle = useSpring(targetAngle, {
    stiffness: 150,
    damping: 27,
    mass: 1,
  });

  const slots = REEL_SLOTS;
  const [slotItems, setSlotItems] = useState<number[]>(() =>
    Array.from({ length: slots }, (_, s) => reelSlotItem(s, 0, items.length, slots)),
  );
  const slotItemsRef = useRef(slotItems);

  useEffect(() => {
    verifyReelPose();
  }, []);

  const handleEntranceDone = useCallback(() => {
    enteredRef.current = true;
    onEntranceComplete();
  }, [onEntranceComplete]);

  const spinToItem = useCallback(
    (itemIdx: number) => {
      const current = springAngle.get();
      let bestDelta = Infinity;
      for (let s = 0; s < slots; s++) {
        const assigned = reelSlotItem(s, current, items.length, slots);
        if (assigned === itemIdx) {
          const ang = reelAngle(s, current, slots);
          if (Math.abs(ang) < Math.abs(bestDelta)) {
            bestDelta = ang;
          }
        }
      }
      if (Number.isFinite(bestDelta)) {
        userHoldUntilRef.current = performance.now() + USER_HOLD_MS;
        pickPendingRef.current = true;
        const nextTarget = Math.round((current - bestDelta) / STEP) * STEP;
        targetAngle.set(nextTarget);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          springAngle.jump(nextTarget);
        }
      }
    },
    [items.length, slots, springAngle, targetAngle],
  );

  useImperativeHandle(
    ref,
    () => ({
      spinToItem,
    }),
    [spinToItem],
  );

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const wall = wallRef.current;
    const ring = wall?.querySelector<HTMLElement>("[data-ring]");
    const lens = wall?.querySelector<HTMLElement>("[data-lens]");
    if (!wall || !ring || !lens) return;

    let introY = 0;
    let fitScale = 1;
    let wallScale = 1;
    const camera = 720;

    const measure = () => {
      const rect = wall.getBoundingClientRect();
      introY = -rect.height * 0.04;
      wallScale =
        parseFloat(getComputedStyle(ring).getPropertyValue("--wall-scale")) || 0.62;
      fitScale =
        Math.min(
          1.05,
          (rect.width - 32) / 1240,
          (0.66 * Math.max(rect.height, 520)) / 800,
        ) / wallScale;
    };

    measure();
    window.addEventListener("resize", measure);

    const cardEls = Array.from(wall.querySelectorAll<HTMLElement>("[data-card]"));
    let spinFactor = 1;
    let dragState: { x: number; y: number; a: number; moved: boolean } | null = null;
    let touchState: { x: number; y: number; a: number } | null = null;
    const pointer = { x: -1e4, y: -1e4, inWall: false, inStage: false };
    let hoveredSlot = -1;
    let wheelUntil = 0;
    let nextStepAt = 0;

    const holdAutoplay = () => {
      userHoldUntilRef.current = performance.now() + USER_HOLD_MS;
      pickPendingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!enteredRef.current || e.ctrlKey || e.metaKey) return;
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;
      e.preventDefault();
      holdAutoplay();
      wheelUntil = performance.now() + 220;
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const raw = (Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit;
      const clamped = Math.max(-480, Math.min(480, raw));
      const next = targetAngle.get() + 0.5 * clamped;
      targetAngle.set(next);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        springAngle.jump(next);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !enteredRef.current) return;
      holdAutoplay();
      dragState = {
        x: e.clientX,
        y: e.clientY,
        a: targetAngle.get(),
        moved: false,
      };
      wall.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!dragState) return;
      const dx = e.clientX - dragState.x;
      const dy = e.clientY - dragState.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) > 4) {
        dragState.moved = true;
      }
      const next = dragState.a + 0.2 * dominantAxis(dx, dy);
      targetAngle.set(next);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        springAngle.jump(next);
      }
    };

    const onPointerUp = () => {
      if (!dragState) return;
      wasDraggedRef.current = dragState.moved;
      if (dragState.moved) holdAutoplay();
      dragState = null;
      wall.style.cursor = "";
      window.setTimeout(() => {
        wasDraggedRef.current = false;
      }, 50);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchState = null;
      if (e.touches.length !== 1 || !enteredRef.current) return;
      holdAutoplay();
      touchState = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        a: targetAngle.get(),
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchState || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - touchState.x;
      const dy = e.touches[0].clientY - touchState.y;
      if (Math.abs(dx) < Math.abs(dy)) return;
      const next = touchState.a + 0.2 * dx;
      targetAngle.set(next);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        springAngle.jump(next);
      }
    };

    const onTouchEnd = () => {
      if (touchState) holdAutoplay();
      touchState = null;
    };

    const onPointerEnter = (e: PointerEvent) => {
      pointer.inWall = e.pointerType === "mouse";
    };
    const onPointerLeave = () => {
      pointer.inWall = false;
    };

    // A mouse resting anywhere on the section means someone is reading: autoplay waits
    const stage = stageRef.current;
    const onStageEnter = (e: PointerEvent) => {
      pointer.inStage = e.pointerType === "mouse";
    };
    const onStageLeave = () => {
      pointer.inStage = false;
    };
    stage?.addEventListener("pointerenter", onStageEnter);
    stage?.addEventListener("pointerleave", onStageLeave);

    wall.addEventListener("wheel", onWheel, { passive: false });
    wall.addEventListener("pointerdown", onPointerDown);
    wall.addEventListener("pointerenter", onPointerEnter);
    wall.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    wall.addEventListener("touchstart", onTouchStart, { passive: true });
    wall.addEventListener("touchmove", onTouchMove, { passive: true });
    wall.addEventListener("touchend", onTouchEnd);
    wall.addEventListener("touchcancel", onTouchEnd);

    const written = new Map<string, string>();
    const write = (key: string, value: string, apply: () => void) => {
      if (written.get(key) === value) return;
      written.set(key, value);
      apply();
    };
    const writeRingVar = (name: string, value: string) =>
      write(name, value, () => ring.style.setProperty(name, value));

    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameCount = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number, delta: number) => {
      const stepFrames = Math.min(delta / (1000 / 60), 3);
      const reduce = reducedMotionMq.matches;

      // Hover hit-testing every 3rd frame before style writes
      if (pointer.inWall && !dragState && enteredRef.current) {
        if (frameCount++ % 3 === 0) {
          const hit = document
            .elementFromPoint(pointer.x, pointer.y)
            ?.closest<HTMLElement>("[data-card]");
          hoveredSlot = hit ? cardEls.indexOf(hit) : -1;
        }
      } else {
        hoveredSlot = -1;
      }

      const exp = expansion.get();
      const scene = reelScene(exp, camera);
      const A = wallScale * (fitScale + (1 - fitScale) * exp);

      writeRingVar("--intro-offset", `${(introY * (1 - exp) + scene.anchor * A).toFixed(2)}px`);
      const perspStr = `${(scene.perspective * A).toFixed(2)}px`;
      write("perspective", perspStr, () => {
        lens.style.perspective = perspStr;
      });
      const originStr = `50% calc(50% + ${(introY * (1 - exp)).toFixed(2)}px)`;
      write("origin", originStr, () => {
        lens.style.perspectiveOrigin = originStr;
      });
      writeRingVar("--intro-tilt", `${scene.tilt.toFixed(3)}deg`);
      writeRingVar("--intro-roll", `${scene.roll.toFixed(3)}deg`);
      writeRingVar(
        "--intro-x",
        `${(160 * Math.sin((scene.roll * Math.PI) / 180) * A).toFixed(2)}px`,
      );
      writeRingVar("--intro-sz", A.toFixed(4));
      writeRingVar("--intro-scale", (fitScale + (1 - fitScale) * exp).toFixed(4));

      if (enteredRef.current) {
        write("entering", "done", () => wall.removeAttribute("data-entering"));
      }

      const hasFocusInside = !!stage?.contains(document.activeElement);
      const isHeldByUser = now < userHoldUntilRef.current;
      const isDriving = !!dragState || !!touchState || now < wheelUntil;
      spinFactor += ((hoveredSlot >= 0 ? 0.2 : 1) - spinFactor) * Math.min(1, 0.08 * stepFrames);

      const form = formation.get();
      const settledRaw = Math.max(0, Math.min(1, (exp - 0.15) / 0.68));
      const settled = settledRaw * settledRaw * (3 - 2 * settledRaw);

      if (!enteredRef.current) {
        // Smoothly rotate to an exact multiple of STEP (2 * STEP = 45deg) as the ring forms and opens, avoiding any post-entrance snap
        if (!reduce && inViewRef.current) {
          const entranceTurn = Math.min(1, 0.35 * form + 0.65 * exp);
          targetAngle.set(entranceTurn * 2 * STEP);
        }
      } else if (!isDriving) {
        // Settle on a whole card so one sector always faces the viewer
        const target = targetAngle.get();
        const snapped = Math.round(target / STEP) * STEP;
        if (Math.abs(snapped - target) > 0.01) {
          targetAngle.set(snapped);
          if (reduce) springAngle.jump(snapped);
        }

        const paused =
          reduce || isHeldByUser || hasFocusInside || pointer.inStage || !inViewRef.current;
        if (paused || nextStepAt === 0) {
          nextStepAt = now + DWELL_MS;
        } else if (now >= nextStepAt) {
          // Step forward through the sector list
          targetAngle.set(snapped - STEP);
          nextStepAt = now + DWELL_MS;
        }
      }

      const curAngle = springAngle.get();
      if (pickPendingRef.current && Math.abs(curAngle - targetAngle.get()) < STEP / 2) {
        pickPendingRef.current = false;
      }
      let slotsChanged = false;
      const nextSlotItems = [...slotItemsRef.current];
      let nearestSlot = 0;
      let nearestAbsAngle = Infinity;

      for (let s = 0; s < cardEls.length; s++) {
        const ang = reelAngle(s, curAngle, slots);
        const absAng = Math.abs(ang);
        const cardEl = cardEls[s];

        if (absAng < nearestAbsAngle) {
          nearestAbsAngle = absAng;
          nearestSlot = s;
        }

        const recycledItem = reelSlotItem(s, curAngle, items.length, slots);
        if (recycledItem !== nextSlotItems[s]) {
          nextSlotItems[s] = recycledItem;
          slotsChanged = true;
        }

        const videoEl = cardEl.querySelector<HTMLVideoElement>("video");
        const setVis = (v: string) => {
          if (cardEl.style.visibility !== v) {
            cardEl.style.visibility = v;
          }
        };

        const rawPeripheral = Math.max(0, Math.min(1, (86 - absAng) / 14));
        const peripheralFade = rawPeripheral * rawPeripheral * (3 - 2 * rawPeripheral);
        const edgeFade = 1 - settled * (1 - peripheralFade);
        const pose = reelPose(ang, form, scene);
        const finalOpacity = pose.appear * edgeFade;

        if (pose.behindCamera || finalOpacity <= 0.004) {
          setVis("hidden");
          if (videoEl && !videoEl.paused) videoEl.pause();
          continue;
        }
        setVis("visible");

        if (videoEl) {
          // Attach (or swap, after slot recycling) the clip only for settled, facing cards
          const wanted = videoEl.dataset.src;
          if (
            wanted &&
            settled > 0.6 &&
            !reduce &&
            videoEl.getAttribute("src") !== wanted
          ) {
            delete videoEl.dataset.ready;
            videoEl.preload = "auto";
            videoEl.src = wanted;
          }
          if (videoEl.readyState >= 2 && videoEl.dataset.ready === undefined) {
            videoEl.dataset.ready = "";
          }
          if (absAng <= 80 && settled > 0.6 && inViewRef.current && !reduce && videoEl.getAttribute("src")) {
            if (videoEl.paused) {
              videoEl.play().catch(() => {});
            }
          } else if (!videoEl.paused) {
            videoEl.pause();
          }
        }

        // The inside of the cylinder makes the front card the smallest: lift it smoothly as the ring expands
        const lift = 1 + 0.2 * settled * Math.max(0, 1 - absAng / STEP);
        const tf = `translate3d(${pose.x.toFixed(2)}px,${pose.y.toFixed(2)}px,${pose.z.toFixed(2)}px) rotateY(${pose.yaw.toFixed(2)}deg) rotateZ(${pose.roll.toFixed(2)}deg) scale3d(${(pose.scaleX * lift).toFixed(3)},${(pose.scaleY * lift).toFixed(3)},1)`;
        if (cardEl.style.transform !== tf) {
          cardEl.style.transform = tf;
        }

        const isOutside = pose.z > (scene.radius * scene.radius) / scene.perspective;
        write(`out-${s}`, isOutside ? "1" : "0", () => {
          if (isOutside) {
            cardEl.dataset.outside = "";
          } else {
            delete cardEl.dataset.outside;
          }
        });

        const op = String(Math.round(finalOpacity * 1000) / 1000);
        if (cardEl.style.opacity !== op) {
          cardEl.style.opacity = op;
        }
      }

      if (slotsChanged) {
        slotItemsRef.current = nextSlotItems;
        setSlotItems(nextSlotItems);
      }

      if (enteredRef.current && !pickPendingRef.current) {
        const frontItem = nextSlotItems[nearestSlot];
        if (typeof frontItem === "number" && frontItem !== activeIndexRef.current) {
          onSelectRef.current(frontItem);
        }
      }
    };

    const loop = (now: number) => {
      // Off screen: pause every clip and let the loop sleep until the section comes back
      if (!nearRef.current) {
        cardEls.forEach((el) => el.querySelector("video")?.pause());
        rafId = 0;
        return;
      }
      const delta = Math.max(1, now - lastTime);
      lastTime = now;
      tick(now, delta);
      rafId = window.requestAnimationFrame(loop);
    };

    wakeRef.current = () => {
      if (rafId) return;
      lastTime = performance.now();
      nextStepAt = 0;
      rafId = window.requestAnimationFrame(loop);
    };

    tick(lastTime, 16.67);
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      wakeRef.current = () => {};
      window.removeEventListener("resize", measure);
      wall.removeEventListener("wheel", onWheel);
      wall.removeEventListener("pointerdown", onPointerDown);
      wall.removeEventListener("pointerenter", onPointerEnter);
      wall.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      wall.removeEventListener("touchstart", onTouchStart);
      wall.removeEventListener("touchmove", onTouchMove);
      wall.removeEventListener("touchend", onTouchEnd);
      wall.removeEventListener("touchcancel", onTouchEnd);
      stage?.removeEventListener("pointerenter", onStageEnter);
      stage?.removeEventListener("pointerleave", onStageLeave);
    };
  }, [items.length, slots, springAngle, targetAngle, formation, expansion, stageRef]);

  const handleCardClick = useCallback(
    (itemIdx: number) => {
      onSelect(itemIdx);
      spinToItem(itemIdx);
    },
    [onSelect, spinToItem],
  );

  return (
    <>
      <ReelLoader
        active={inView}
        ready={ready}
        total={total}
        loading={loading}
        formation={formation}
        expansion={expansion}
        skip={skip}
        stageRef={stageRef}
        onChromeStart={onChromeStart}
        onComplete={handleEntranceDone}
      />
      <noscript>
        <style>{`.bx-reelLoader{display:none}[data-card]{opacity:1!important}`}</style>
      </noscript>
      <div
        ref={wallRef}
        data-entering=""
        className="bx-wall"
        aria-label="Group Sectors"
        role="region"
      >
        <div data-lens="" className="bx-wallLens">
          <div data-ring="" className="bx-wallCenter">
            {slotItems.map((itemIdx, slot) => {
              const item = items[itemIdx];
              const isDimmed =
                focusedIndex !== null && focusedIndex !== itemIdx;
              return (
                <ReelCard
                  key={slot}
                  item={item}
                  itemIndex={itemIdx}
                  isActive={itemIdx === activeIndex}
                  isDimmed={isDimmed}
                  preventClick={() => wasDraggedRef.current}
                  onSelect={handleCardClick}
                />
              );
            })}
          </div>
        </div>

        {/* Readable name for the front card: the on-card labels are too small at this depth and need hover */}
        <div className="bx-frontCaption" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="bx-frontCaptionIndex">
                {items[activeIndex]?.index} / {String(items.length).padStart(2, "0")}
              </span>
              <span className="bx-frontCaptionTitle">{items[activeIndex]?.title}</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
});

export default ReelRing;
