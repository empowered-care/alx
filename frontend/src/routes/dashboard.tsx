import { createFileRoute, Link } from "@tanstack/react-router";
import { DashShell } from "@/components/DashShell";
import { ProgressRing } from "@/components/ProgressRing";
import { Sparkline } from "@/components/Sparkline";
import { metrics, trend, foods, peers } from "@/data/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Empowered Care" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <DashShell>
      {/* Top bar */}
      <header className="anim-fade-up mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold lg:text-5xl">Selam, Mihret</h1>
          <p className="mt-1 text-sm text-[color:var(--text-muted)]">Friday · June 6, 2026 · Addis Ababa</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" /> ⚠ Elevated Risk
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Biometric hub - spans 2 */}
        <section className="card-base anim-fade-up relative overflow-hidden lg:col-span-2" style={{ animationDelay: "0.05s" }}>
          <div className="absolute inset-x-0 top-0 h-1 grad-main" />
          <div className="p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Live Biometrics</h2>
              <span className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">7-day trend</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              <div>
                <ProgressRing value={metrics.heartRate.value} goal={metrics.heartRate.goal} label="Heart Rate" unit="bpm" color="calm" />
                <Sparkline data={trend.hr} color="#6BAE75" />
              </div>
              <div>
                <ProgressRing value={metrics.hrv.value} goal={metrics.hrv.goal} label="HRV" unit="ms" color="data" />
                <Sparkline data={trend.hrv} color="#F0A500" />
              </div>
              <div>
                <ProgressRing value={metrics.sleep.value} goal={metrics.sleep.goal} label="Sleep" unit="hours" color="pulse" display="4.8" />
                <Sparkline data={trend.sleep} color="#FF4C6A" />
              </div>
              <div>
                <ProgressRing value={metrics.steps.value} goal={metrics.steps.goal} label="Steps" unit="today" color="fuchsia" display="7.2k" />
                <Sparkline data={trend.steps} />
              </div>
            </div>
          </div>
        </section>

        {/* Sentinel Alert */}
        <section className="anim-fade-up anim-pulse-glow grad-glow relative overflow-hidden rounded-[20px] p-7 text-white" style={{ animationDelay: "0.13s" }}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h3l2-5 4 10 2-5 2 3h5" />
            </svg>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">Sentinel · Triggered</div>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">Hypertension Risk Detected</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            3 consecutive nights of severe sleep deprivation combined with rising resting heart rate
            indicate elevated cortisol and blood pressure risk.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Hydrate Now", "Rest Today", "Consult Doctor"].map((c) => (
              <span key={c} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">{c}</span>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--plum)] transition hover:scale-[1.03]">
            Get Medical Advice →
          </button>
        </section>

        {/* EFCT */}
        <section className="card-base anim-fade-up lg:col-span-2" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-x-0 top-0 h-1 grad-main" />
          <div className="p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">EFCT 2025 Nutrition</h2>
              <span className="text-[10px] italic text-[color:var(--text-muted)]">Powered by EFCT 2025</span>
            </div>

            <div className="relative">
              <input
                placeholder="Search Ethiopian foods..."
                className="w-full rounded-full border border-[color:var(--border)] bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-[color:var(--fuchsia)] focus:ring-4 focus:ring-[color:var(--fuchsia)]/15"
              />
              <svg className="absolute left-4 top-3.5 h-4 w-4 text-[color:var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5" />
              </svg>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {foods.map((f) => (
                <span key={f.name} className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-medium">
                  {f.name} · {f.qty}
                  <button className="text-[color:var(--text-muted)] hover:text-[color:var(--pulse)]">×</button>
                </span>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-[11px] uppercase tracking-widest text-[color:var(--text-muted)]">
                <span>Glycemic Load</span><span className="font-mono text-amber-600">28 / Moderate</span>
              </div>
              <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg, #6BAE75 0%, #F0A500 55%, #FF4C6A 100%)" }}>
                <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-2 border-white shadow-md grad-main" style={{ left: "44%" }} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3 border-t border-[color:var(--border)] pt-5">
              {[
                { l: "Calories", v: "1,840" }, { l: "Carbs", v: "210g" },
                { l: "Protein", v: "54g" }, { l: "Glyc. Load", v: "28" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">{s.l}</div>
                  <div className="font-mono text-lg font-medium text-amber-600">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mental Grounding */}
        <section className="anim-fade-up rounded-[20px] p-7 text-white" style={{ animationDelay: "0.28s", background: "var(--midnight)" }}>
          <h2 className="font-display text-2xl font-semibold">Nervous System</h2>
          <div className="mt-4 h-32">
            <MiniArea />
          </div>
          <div className="mt-2 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
            Sympathetic Dominance
          </div>
          <Link to="/grounding"
                className="mt-6 block w-full rounded-2xl py-3 text-center font-semibold text-white transition hover:scale-[1.02] grad-main">
            Enter Grounding Mode
          </Link>
        </section>

        {/* Community */}
        <section className="card-base anim-fade-up p-7 lg:col-span-2" style={{ animationDelay: "0.35s" }}>
          <div className="absolute inset-x-0 top-0 h-1 grad-main" />
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Community Watch</h2>
            <Link to="/community" className="text-xs font-semibold uppercase tracking-widest text-[color:var(--plum)] hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {peers.map((p) => (
              <div key={p.name} className="flex flex-col items-center text-center">
                <div className={`relative rounded-full p-1 ${p.state === "ok" ? "bg-[color:var(--calm)]" : "bg-[color:var(--pulse)] animate-pulse"}`}>
                  <div className="grad-main flex h-14 w-14 items-center justify-center rounded-full font-mono text-sm font-bold text-white">{p.initials}</div>
                </div>
                <div className="mt-2 text-sm font-semibold">{p.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">{p.last}</div>
                {p.emergency && <div className="mt-1 text-[9px] font-bold uppercase tracking-widest text-[color:var(--pulse)]">Emergency</div>}
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full border border-[color:var(--plum)] px-5 py-2 text-sm font-semibold text-[color:var(--fuchsia)] hover:bg-[color:var(--plum)] hover:text-white">
            Send Wellness Check
          </button>
        </section>

        {/* Kuriftu prescription */}
        <section className="anim-fade-up grad-glow relative overflow-hidden rounded-[20px] p-7 text-white" style={{ animationDelay: "0.42s" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">Personalized Spa Prescription</div>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">Damakese Botanical Restoration</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            Your stress markers have been elevated for 9 consecutive days. This restorative treatment
            has been formulated for your biometric profile.
          </p>
          <button className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--plum)] transition hover:scale-[1.03]">
            Book at Boston Day Spa →
          </button>
          <div className="mt-6 text-[10px] italic text-white/70">Auto-generated · Powered by Kuriftu API</div>
        </section>
      </div>
    </DashShell>
  );
}

import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { trend as t } from "@/data/mockData";

function MiniArea() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={t.hrvVsScreen}>
        <defs>
          <linearGradient id="hrvg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A4407C" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#A4407C" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="scrg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0A500" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#F0A500" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="d" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#1A0D1A", border: "1px solid #A4407C", borderRadius: 8, color: "white", fontSize: 12 }} />
        <Area type="monotone" dataKey="hrv" stroke="#A4407C" strokeWidth={2} fill="url(#hrvg)" />
        <Area type="monotone" dataKey="screen" stroke="#F0A500" strokeWidth={2} fill="url(#scrg)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
