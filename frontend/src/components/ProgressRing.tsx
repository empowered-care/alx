import { useEffect, useState } from "react";

type ColorKey = "calm" | "data" | "pulse" | "fuchsia";

const colorMap: Record<ColorKey, string> = {
  calm: "#6BAE75",
  data: "#F0A500",
  pulse: "#FF4C6A",
  fuchsia: "url(#ringGradient)",
};

interface Props {
  value: number;
  goal: number;
  label: string;
  unit?: string;
  display?: string;
  color?: ColorKey;
  size?: number;
}

export function ProgressRing({
  value, goal, label, unit = "", display, color = "fuchsia", size = 140,
}: Props) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / goal);
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const t = setTimeout(() => setOffset(c - c * pct), 80);
    return () => clearTimeout(t);
  }, [c, pct]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A4407C" />
              <stop offset="100%" stopColor="#7F3766" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(164,64,124,0.12)" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            stroke={colorMap[color]} strokeWidth={stroke} fill="none"
            strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-mono text-2xl font-medium" style={{ color: "var(--data)" }}>
            {display ?? value.toLocaleString()}
          </div>
          {unit && <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">{unit}</div>}
        </div>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{label}</div>
    </div>
  );
}
