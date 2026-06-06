import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import DashShell from '../components/DashShell'
import ProgressRing from '../components/ProgressRing'
import Sparkline from '../components/Sparkline'
import {
  biometrics,
  communityPeers,
  foodLogs,
  kuriftuPrescription,
  mentalWellness,
  nutritionSummary,
  ringLabels,
  sentinelAlert,
  sparklineColors,
  user,
} from '../data/mockData'

function NervousSystemChart() {
  return (
    <ResponsiveContainer width="100%" height={128}>
      <AreaChart data={mentalWellness.chartData}>
        <defs>
          <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A4407C" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#A4407C" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0A500" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#F0A500" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: '#1A0D1A',
            border: '1px solid #A4407C',
            borderRadius: 8,
            color: 'white',
            fontSize: 12,
          }}
        />
        <Area type="monotone" dataKey="hrv" stroke="#A4407C" strokeWidth={2} fill="url(#hrvGrad)" />
        <Area type="monotone" dataKey="screen" stroke="#F0A500" strokeWidth={2} fill="url(#screenGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/health/dashboard')
        if (response.ok) {
          const data = await response.json()
          setDashboardData(data)
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const today = 'Friday · June 6, 2026'
  const glPercent = Math.min((nutritionSummary.glycemicLoad / 40) * 100, 100)

  const displayBiometrics = dashboardData ? {
    ...biometrics,
    heartRate: { ...biometrics.heartRate, value: dashboardData.latest_heart_rate },
    hrv: { ...biometrics.hrv, value: dashboardData.latest_hrv },
    sleep: { ...biometrics.sleep, value: dashboardData.sleep_score / 10 }, // Assuming sleep score / 10 = hours for mock consistency
    steps: { ...biometrics.steps, value: dashboardData.daily_steps },
  } : biometrics

  return (
    <DashShell>
      <header className="animate-fade-in-up mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold lg:text-5xl">
            Selam, {user.firstName}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {today} · {user.location}
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          ⚠ ELEVATED RISK
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section
          className="card card-header-accent animate-fade-in-up relative overflow-hidden lg:col-span-2"
          style={{ animationDelay: '0.05s' }}
        >
          <div className="p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Live Biometrics</h2>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                7-day trend
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {Object.entries(displayBiometrics).map(([key, metric]) => (
                <div key={key}>
                  <ProgressRing
                    percent={metric.percent}
                    color={metric.color}
                    label={ringLabels[key]}
                    value={metric.value}
                    unit={key === 'steps' ? 'today' : metric.unit}
                    display={key === 'steps' ? '7.2k' : undefined}
                    animateValue={key !== 'steps'}
                  />
                  <Sparkline data={metric.trend} color={sparklineColors[key]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {sentinelAlert.triggered && (
          <section
            className="animate-sentinel-pulse animate-fade-in-up relative overflow-hidden rounded-[20px] bg-gradient-glow p-7 text-white"
            style={{ animationDelay: '0.13s' }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                <path d="M3 12h3l2-5 4 10 2-5 2 3h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
              Sentinel · Triggered
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold leading-tight">
              {sentinelAlert.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/90">{sentinelAlert.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {sentinelAlert.recommendations.map((rec) => (
                <span
                  key={rec}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur"
                >
                  {rec}
                </span>
              ))}
            </div>
            <button type="button" className="btn-white mt-6 w-full text-sm">
              Get Medical Advice →
            </button>
          </section>
        )}

        <section
          className="card animate-fade-in-up relative overflow-hidden lg:col-span-2"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-main" />
          <div className="p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">EFCT 2025 Nutrition</h2>
              <span className="text-[10px] italic text-[var(--color-text-muted)]">
                Powered by EFCT 2025
              </span>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search Ethiopian foods..."
                className="w-full rounded-full border border-[rgba(164,64,124,0.2)] bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--color-fuchsia)] focus:ring-4 focus:ring-[rgba(164,64,124,0.15)]"
              />
              <svg
                className="absolute left-4 top-3.5 h-4 w-4 text-[var(--color-text-muted)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-3.5-3.5" />
              </svg>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {foodLogs.map((food) => (
                <span
                  key={food.id}
                  className="flex items-center gap-2 rounded-full border border-[rgba(164,64,124,0.12)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium"
                >
                  {food.name} · {food.amount}
                  <button type="button" className="text-[var(--color-text-muted)] hover:text-[var(--color-pulse)]">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-[11px] uppercase tracking-widest text-[var(--color-text-muted)]">
                <span>Glycemic Load</span>
                <span className="font-mono text-[var(--color-data)]">
                  {nutritionSummary.glycemicLoad} / Moderate
                </span>
              </div>
              <div
                className="relative h-3 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6BAE75 0%, #F0A500 55%, #FF4C6A 100%)',
                }}
              >
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-2 border-white bg-gradient-main shadow-md"
                  style={{ left: `${glPercent}%`, marginLeft: '-8px' }}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[rgba(164,64,124,0.12)] pt-5 md:grid-cols-4">
              {[
                { l: 'Calories', v: nutritionSummary.calories.toLocaleString() },
                { l: 'Carbs', v: `${nutritionSummary.carbs}g` },
                { l: 'Protein', v: `${nutritionSummary.protein}g` },
                { l: 'Glyc. Load', v: nutritionSummary.glycemicLoad },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    {s.l}
                  </p>
                  <p className="font-mono text-lg font-medium text-[var(--color-data)]">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="animate-fade-in-up rounded-[20px] p-7 text-white"
          style={{ animationDelay: '0.28s', background: 'var(--color-midnight)' }}
        >
          <h2 className="font-display text-2xl font-semibold">Nervous System State</h2>
          <div className="mt-4">
            <NervousSystemChart />
          </div>
          <span className="mt-2 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
            {mentalWellness.status}
          </span>
          <Link
            to="/grounding"
            className="btn-primary mt-6 block w-full rounded-2xl py-3 text-center text-sm"
          >
            Enter Grounding Mode
          </Link>
        </section>

        <section
          className="card animate-fade-in-up relative overflow-hidden lg:col-span-2"
          style={{ animationDelay: '0.35s' }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-main" />
          <div className="p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Community Watch</h2>
              <Link
                to="/community"
                className="text-xs font-semibold uppercase tracking-widest text-[var(--color-plum)] hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {communityPeers.map((peer) => (
                <div key={peer.id} className="flex flex-col items-center text-center">
                  <div
                    className={`rounded-full p-1 ${
                      peer.ringColor === 'green'
                        ? 'bg-[var(--color-calm)]'
                        : 'animate-sentinel-pulse bg-[var(--color-pulse)]'
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-main font-mono text-sm font-bold text-white">
                      {peer.initials}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-semibold">{peer.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    {peer.lastCheckIn}
                  </p>
                  {peer.emergency && (
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[var(--color-pulse)]">
                      Emergency Contact
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 rounded-full border-2 border-[var(--color-plum)] px-5 py-2 text-sm font-semibold text-[var(--color-fuchsia)] transition hover:bg-[var(--color-plum)] hover:text-white"
            >
              Send Wellness Check
            </button>
          </div>
        </section>

        <section
          className="animate-fade-in-up relative overflow-hidden rounded-[20px] bg-gradient-glow p-7 text-white lg:col-span-2"
          style={{ animationDelay: '0.42s' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
            Personalized Spa Prescription
          </p>
          <h3 className="font-display mt-3 text-2xl font-semibold leading-tight">
            {kuriftuPrescription.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/85">{kuriftuPrescription.body}</p>
          <button type="button" className="btn-white mt-5 text-sm">
            Book at {kuriftuPrescription.spa} →
          </button>
          <p className="mt-6 text-[10px] italic text-white/70">
            Auto-generated · Powered by Kuriftu API
          </p>
        </section>
      </div>
    </DashShell>
  )
}
