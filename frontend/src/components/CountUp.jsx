import { useEffect, useState } from 'react'

export default function CountUp({ value, duration = 1200, decimals = 0, suffix = '' }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const to = Number(value)

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(to * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString()

  return (
    <>
      {formatted}
      {suffix}
    </>
  )
}
