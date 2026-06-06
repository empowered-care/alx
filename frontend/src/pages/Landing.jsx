import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import ProgressRing from '../components/ProgressRing'
import { biometrics, partners } from '../data/mockData'

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative min-h-screen bg-gradient-glow">
        <div
          className="anim-hero-glow pointer-events-none absolute -right-[10%] -top-32 h-[720px] w-[720px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,180,220,0.65) 0%, rgba(194,80,122,0.45) 35%, rgba(127,55,102,0) 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, #C2507A, transparent 65%)' }}
        />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div className="flex items-center gap-3 text-white">
            <Logo className="h-9 w-9" />
            <span className="font-display text-2xl font-semibold">Empowered Care</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-white/85 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <Link to="/dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
            <Link to="/community" className="transition hover:text-white">
              Community
            </Link>
            <Link to="/trainer" className="transition hover:text-white">
              For Trainers
            </Link>
          </div>
          <button type="button" className="btn-ghost text-sm">
            Register Now
          </button>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-32 pt-12 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:pb-40 lg:pt-20">
          <div className="text-white">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-pink-100/85">
              Wellness Reimagined · Ethiopia 2026
            </p>
            <h1
              className="font-display font-semibold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(64px, 10vw, 132px)' }}
            >
              Know Your Body.
              <br />
              <span className="font-light italic text-pink-100/95">Before It Speaks.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85">
              The first federated health companion built for Africa — unifying wearable data,
              chronic disease detection, and community into one living intelligence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/dashboard" className="btn-white group">
                Begin Your Journey
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <button type="button" className="btn-ghost">
                Watch the Demo
              </button>
            </div>
            <p className="mt-12 text-xs uppercase tracking-widest text-white/65">
              {partners.join(' · ')}
            </p>
          </div>

          <div className="relative flex justify-center">
            <div
              className="anim-hero-glow pointer-events-none absolute inset-0 m-auto h-[480px] w-[480px] rounded-full opacity-80 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,200,230,0.7) 0%, rgba(194,80,122,0.5) 40%, transparent 70%)',
              }}
            />
            <div
              className="animate-levitate relative rounded-3xl border border-white/25 p-8 backdrop-blur-2xl"
              style={{
                background: 'rgba(255,255,255,0.12)',
                boxShadow: '0 30px 80px rgba(20,5,30,0.45)',
              }}
            >
              <div className="mb-6 flex items-center justify-between text-white/80">
                <span className="text-xs uppercase tracking-[0.25em]">Live Biometrics</span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-calm)]" />
                  Streaming
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ProgressRing
                  percent={biometrics.heartRate.percent}
                  color="calm"
                  label="Heart Rate"
                  value={biometrics.heartRate.value}
                  unit="BPM"
                  size={96}
                />
                <ProgressRing
                  percent={biometrics.hrv.percent}
                  color="amber"
                  label="HRV"
                  value={biometrics.hrv.value}
                  unit="ms"
                  size={96}
                />
                <ProgressRing
                  percent={biometrics.sleep.percent}
                  color="pulse"
                  label="Sleep"
                  value={biometrics.sleep.value}
                  unit="h"
                  size={96}
                />
                <ProgressRing
                  percent={biometrics.steps.percent}
                  color="fuchsia"
                  label="Steps"
                  display="7.2k"
                  size={96}
                />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/60">Sentinel</p>
                  <p className="font-display text-lg text-white">Hypertension Watch</p>
                </div>
                <span className="rounded-full bg-[var(--color-pulse)]/25 px-3 py-1 text-xs font-semibold text-white">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
          <path d="M0,80 C320,140 720,0 1440,90 L1440,120 L0,120 Z" fill="var(--color-cream)" />
        </svg>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-plum)]">
            The System
          </p>
          <h2 className="font-display mt-3 text-5xl font-semibold">Six surfaces. One living intelligence.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Biometric Hub', d: 'Federated wearable data unified in one view — Apple, Google, WeVa.' },
            { t: 'Sentinel Alert', d: 'Predictive chronic risk detection before symptoms arrive.' },
            { t: 'EFCT Nutrition', d: 'Glycemic load tracking for traditional Ethiopian foods.' },
            { t: 'Grounding Mode', d: 'Nervous system regulation when sympathetic dominance hits.' },
            { t: 'Community Watch', d: 'Peer monitoring with emergency contact escalation.' },
            { t: 'Kuriftu Prescription', d: 'Auto-generated luxury spa restoration plans.' },
          ].map((f, i) => (
            <div
              key={f.t}
              className="card animate-fade-in-up p-7"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="mb-4 h-1 w-12 rounded-full bg-gradient-main" />
              <h3 className="font-display text-2xl font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
