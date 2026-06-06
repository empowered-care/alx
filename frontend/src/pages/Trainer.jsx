import { useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import CountUp from '../components/CountUp'
import DashShell from '../components/DashShell'
import { days, trainerClients } from '../data/mockData'

const badgeStyles = {
  GOOD: { bg: 'rgba(107,174,117,0.15)', text: '#3F8347' },
  MODERATE: { bg: 'rgba(240,165,0,0.18)', text: '#B47800' },
  REST: { bg: 'rgba(255,76,106,0.16)', text: '#D03048' },
}

function scoreColor(score) {
  if (score >= 75) return 'var(--color-calm)'
  if (score >= 50) return 'var(--color-data)'
  return 'var(--color-pulse)'
}

export default function Trainer() {
  const [selectedId, setSelectedId] = useState(trainerClients[0].id)
  const client = trainerClients.find((c) => c.id === selectedId)

  const chartMetrics = [
    { label: 'Sleep', value: client.sleep, unit: 'hours', trend: client.sleepTrend },
    { label: 'HRV', value: client.hrv, unit: 'ms', trend: client.hrvTrend },
    { label: 'Resting HR', value: client.restingHR, unit: 'bpm', trend: client.hrTrend },
  ]

  return (
    <DashShell>
      <header className="animate-fade-in-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">
          Trainer Intelligence Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Powered by FHIR-grade biometric data
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="card animate-fade-in-up p-4" style={{ animationDelay: '0.05s' }}>
          <p className="px-2 pb-2 text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
            Clients
          </p>
          <div className="flex flex-col gap-1">
            {trainerClients.map((c) => {
              const style = badgeStyles[c.badge]
              const active = selectedId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                    active ? 'bg-gradient-main text-white' : 'hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p
                      className={`text-[10px] uppercase tracking-widest ${
                        active ? 'text-white/70' : 'text-[var(--color-text-muted)]'
                      }`}
                    >
                      Score {c.recoveryScore}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background: active ? 'rgba(255,255,255,0.2)' : style.bg,
                      color: active ? '#fff' : style.text,
                    }}
                  >
                    {c.badge}
                  </span>
                </button>
              )
            })}
          </div>
        </aside>

        <div className="space-y-6">
          <section
            className="card animate-fade-in-up flex items-center justify-between p-7"
            style={{ animationDelay: '0.12s' }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                Recovery Score
              </p>
              <p
                className="font-mono text-7xl font-medium"
                style={{ color: scoreColor(client.recoveryScore) }}
              >
                <CountUp value={client.recoveryScore} />
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">out of 100</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                Today&apos;s Prescription
              </p>
              <span
                className="mt-2 inline-block rounded-full px-6 py-3 text-lg font-bold tracking-wide"
                style={{
                  background: badgeStyles[client.badge].bg,
                  color: badgeStyles[client.badge].text,
                }}
              >
                {client.prescription}
              </span>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            {chartMetrics.map((metric, i) => {
              const data = days.map((d, idx) => ({ d, v: metric.trend[idx] }))
              return (
                <section
                  key={metric.label}
                  className="card animate-fade-in-up relative overflow-hidden p-6"
                  style={{ animationDelay: `${0.18 + i * 0.06}s` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-main" />
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-mono text-3xl font-medium text-[var(--color-data)]">
                    {metric.value}
                    <span className="ml-1 text-sm text-[var(--color-text-muted)]">{metric.unit}</span>
                  </p>
                  <div className="mt-3 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#A4407C" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#A4407C" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="d" hide />
                        <Tooltip
                          contentStyle={{
                            background: '#1A0D1A',
                            border: '1px solid #A4407C',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="#A4407C"
                          strokeWidth={2}
                          fill={`url(#grad-${i})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              )
            })}
          </div>

          <section className="card animate-fade-in-up p-7" style={{ animationDelay: '0.4s' }}>
            <label className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
              Prescription for today...
            </label>
            <textarea
              defaultValue="Light mobility session today. Focus on parasympathetic recovery — breathwork + zone-2 walk only."
              rows={4}
              className="mt-3 w-full resize-none rounded-xl border border-[rgba(164,64,124,0.12)] bg-white p-4 text-sm outline-none transition focus:border-[var(--color-plum)] focus:ring-4 focus:ring-[rgba(164,64,124,0.15)]"
            />
            <button type="button" className="btn-primary mt-4 text-sm">
              Send Prescription
            </button>
          </section>
        </div>
      </div>
    </DashShell>
  )
}
