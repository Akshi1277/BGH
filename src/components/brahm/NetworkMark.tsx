/**
 * The hero's ecosystem plan, drawn still: orbits, the core hexagon, spokes and the outer scale.
 * Used where the system comes to rest (the closing call to action and the footer). Decorative only.
 */
export default function NetworkMark({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  const c = 500;
  const s = tone === "ink" ? "rgba(28,31,30," : "rgba(248,246,242,";
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: Math.round((c + 320 * Math.cos(a)) * 100) / 100, y: Math.round((c + 320 * Math.sin(a)) * 100) / 100 };
  });
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * Math.PI * 2;
    const r2 = i % 12 === 0 ? 462 : 470;
    const q = (v: number) => Math.round(v * 100) / 100;
    return { x1: q(c + 478 * Math.cos(a)), y1: q(c + 478 * Math.sin(a)), x2: q(c + r2 * Math.cos(a)), y2: q(c + r2 * Math.sin(a)), long: i % 12 === 0 };
  });
  return (
    <svg viewBox="0 0 1000 1000" className={className} aria-hidden="true" fill="none">
      <circle cx={c} cy={c} r={478} stroke={`${s}0.16)`} vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r={440} stroke={`${s}0.14)`} strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r={320} stroke={`${s}0.3)`} vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r={210} stroke={`${s}0.14)`} strokeDasharray="1 6" vectorEffect="non-scaling-stroke" />
      <circle cx={c} cy={c} r={118} stroke={`${s}0.3)`} vectorEffect="non-scaling-stroke" />
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={`${s}${t.long ? 0.3 : 0.14})`} vectorEffect="non-scaling-stroke" />
      ))}
      {hex.map((p, i) => {
        const m = hex[(i + 1) % 6];
        return <line key={`h${i}`} x1={p.x} y1={p.y} x2={m.x} y2={m.y} stroke={`${s}0.3)`} vectorEffect="non-scaling-stroke" />;
      })}
      {hex.map((p, i) => (
        <g key={`n${i}`}>
          <line x1={c} y1={c} x2={p.x} y2={p.y} stroke={`${s}0.18)`} vectorEffect="non-scaling-stroke" />
          <circle cx={p.x} cy={p.y} r={5} fill={`${s}0.55)`} />
        </g>
      ))}
    </svg>
  );
}
