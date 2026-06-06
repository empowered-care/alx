import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const phrases = ['Breathe In...', 'Hold...', 'Breathe Out...']

export default function Grounding() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [showExit, setShowExit] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setPhase((p) => (p + 1) % phrases.length), 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowExit(true), 60000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-main text-white">
      <div
        className="animate-ambient pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,200,230,0.35) 0%, transparent 60%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-[520px] w-[520px] items-center justify-center">
          <div className="animate-breathe absolute h-full w-full rounded-full bg-white/15" />
          <div className="animate-breathe-offset absolute h-2/3 w-2/3 rounded-full bg-white/25" />
          <p
            key={phase}
            className="font-display relative text-5xl font-light italic transition-opacity duration-700 lg:text-6xl"
          >
            {phrases[phase]}
          </p>
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-white/75">
          Notifications paused · Grounding in progress
        </p>
      </div>

      {showExit && (
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="btn-ghost absolute bottom-8 right-8 text-sm backdrop-blur"
        >
          End Session
        </button>
      )}
    </div>
  )
}
