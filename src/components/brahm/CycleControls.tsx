"use client";

import Icon from "../Icon";

/** Pause/play, then one step per item: a hairline that fills pine for the current one. */
export default function CycleControls({
  steps,
  active,
  paused,
  onPause,
  onPick,
  className = "",
}: {
  steps: { number: string; name: string }[];
  active: number;
  paused: boolean;
  onPause: () => void;
  onPick: (i: number) => void;
  className?: string;
}) {
  // names fit beside the numbers only when there are a few steps
  const named = steps.length <= 4;
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <button
        type="button"
        onClick={onPause}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink-muted transition-colors hover:border-accent/50 hover:text-accent"
        aria-label={paused ? "Play carousel" : "Pause carousel"}
        aria-pressed={paused}
      >
        <Icon name={paused ? "play" : "pause"} size={11} />
      </button>
      <div className="flex min-w-0 flex-1 gap-2">
        {steps.map((s, i) => (
          <button key={s.name} type="button" onClick={() => onPick(i)} aria-label={`Show ${s.name}`} aria-current={i === active} className="group min-w-0 flex-1 text-left">
            <span className="block h-px w-full bg-ink/15">
              <span className={`block h-px bg-accent transition-[width] duration-700 ${i === active ? "w-full" : "w-0"}`} />
            </span>
            <span className={`mt-2 block truncate font-mono-ui text-[10px] uppercase tracking-[0.16em] transition-colors ${i === active ? "text-ink" : "text-ink/40 group-hover:text-ink/70"}`}>
              {s.number}
              {named && <span className="hidden sm:inline"> {s.name}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
