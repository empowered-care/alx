import { useEffect, useId, useState } from 'react'
import CountUp from './CountUp'

const colorMap = {
  calm: '#6BAE75',
  amber: '#F0A500',
  pulse: '#FF4C6A',
  fuchsia: 'url(#ringGrad)',
}

export default function ProgressRing({
  percent,
  goal,
  color = 'fuchsia',
  size = 140,
  label,
  unit,
  value,
  display,
  animateValue = false,
}) {
  const gradId = useId().replace(/:/g, '')
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const rawPct = percent ?? (goal ? value / goal : 0.7)
  const pct = rawPct > 1 ? Math.min(1, rawPct / 100) : Math.min(1, rawPct)
  const targetOffset = circumference - circumference * pct
  const [offset, setOffset] = useState(circumference)
  const strokeColor = colorMap[color] || colorMap.fuchsia
  const numericValue = typeof value === 'number' ? value : parseFloat(String(value))

  useEffect(() => {
    const timer = setTimeout(() => setOffset(targetOffset), 80)
    return () => clearTimeout(timer)
  }, [targetOffset])

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={`ringGrad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A4407C" />
              <stop offset="100%" stopColor="#7F3766" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(164, 64, 124, 0.12)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color === 'fuchsia' ? `url(#ringGrad-${gradId})` : strokeColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-medium" style={{ color: 'var(--color-data)' }}>
            {display ??
              (animateValue && !Number.isNaN(numericValue) ? (
                <CountUp value={numericValue} decimals={Number.isInteger(numericValue) ? 0 : 1} />
              ) : (
                typeof value === 'number' ? value.toLocaleString() : value
              ))}
          </span>
          {unit && (
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
              {unit}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          {label}
        </span>
      )}
    </div>
  )
}
