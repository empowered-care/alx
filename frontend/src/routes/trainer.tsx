import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashShell } from "@/components/DashShell";
import { trainerClients, trend } from "@/data/mockData";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/trainer")({
  head: () => ({ meta: [{ title: "Trainer Intelligence — Empowered Care" }] }),
  component: Trainer,
});

const badgeStyles: Record<string, { bg: string; text: string }> = {
  GOOD: { bg: "rgba(107,174,117,0.15)", text: "#3F8347" },
  MODERATE: { bg: "rgba(240,165,0,0.18)", text: "#B47800" },
  REST: { bg: "rgba(255,76,106,0.16)", text: "#D03048" },
};

function Trainer() {
  const [sel, setSel] = useState(0);
  const c = trainerClients[sel];
  const scoreColor = c.score >= 75 ? "var(--calm)" : c.score >= 50 ? "var(--data)" : "var(--pulse)";
  const prescription = c.score >= 75 ? "TRAIN HARD" : c.score >= 50 ? "LIGHT SESSION" : "REST DAY";

  return (
    <DashShell>
      <header className="anim-fade-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">Trainer Intelligence</h1>
        <p className="mt-1 text-sm text-[color:var(--text-muted)]">Powered by FHIR-grade biometric data · 4 active clients</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* client list */}
        <aside className="card-base anim-fade-up p-4" style={{ animationDelay: "0.05s" }}>
          <div className="px-2 pb-2 text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">Clients</div>
          <div className="flex flex-col gap-1">
            {trainerClients.map((cl, i) => {
              const s = badgeStyles[cl.badge];
              return (
                <button key={cl.name} onClick={() => setSel(i)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-left transition ${sel === i ? "grad-main text-white" : "hover:bg-[color:var(--surface)]"}`}>
                  <div>
                    <div className="text-sm font-semibold">{cl.name}</div>
                    <div className={`text-[10px] uppercase tracking-widest ${sel === i ? "text-white/70" : "text-[color:var(--text-muted)]"}`}>Score {cl.score}</div>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: sel === i ? "rgba(255,255,255,0.2)" : s.bg, color: sel === i ? "#fff" : s.text }}>
                    {cl.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* detail */}
        <div className="space-y-6">
          <section className="card-base anim-fade-up flex items-center justify-between p-7" style={{ animationDelay: "0.12s" }}>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">Recovery Score</div>
              <div className="font-mono text-7xl font-medium" style={{ color: scoreColor }}>{c.score}</div>
              <div className="text-sm text-[color:var(--text-muted)]">out of 100</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">Today's Prescription</div>
              <div className="mt-2 rounded-full px-6 py-3 text-lg font-bold tracking-wide" style={{ background: badgeStyles[c.badge].bg, color: badgeStyles[c.badge].text }}>
                {prescription}
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { l: "Sleep", v: c.sleep, u: "hours", d: trend.sleep },
              { l: "HRV", v: c.hrv, u: "ms", d: trend.hrv },
              { l: "Resting HR", v: c.rhr, u: "bpm", d: trend.hr },
            ].map((m, i) => (
              <section key={m.l} className="card-base anim-fade-up relative overflow-hidden p-6" style={{ animationDelay: `${0.18 + i * 0.06}s` }}>
                <div className="absolute inset-x-0 top-0 h-1 grad-main" />
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">{m.l}</div>
                <div className="mt-2 font-mono text-3xl font-medium text-amber-600">{m.v}<span className="ml-1 text-sm text-[color:var(--text-muted)]">{m.u}</span></div>
                <div className="mt-3 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={m.d}>
                      <defs>
                        <linearGradient id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A4407C" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#A4407C" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="d" hide />
                      <Tooltip contentStyle={{ background: "#1A0D1A", border: "1px solid #A4407C", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                      <Area type="monotone" dataKey="v" stroke="#A4407C" strokeWidth={2} fill={`url(#g${i})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
            ))}
          </div>

          <section className="card-base anim-fade-up p-7" style={{ animationDelay: "0.4s" }}>
            <label className="text-[10px] uppercase tracking-widest text-[color:var(--text-muted)]">Trainer Note</label>
            <textarea
              defaultValue="Light mobility session today. Focus on parasympathetic recovery — breathwork + zone-2 walk only. Re-assess tomorrow."
              className="mt-3 h-28 w-full resize-none rounded-xl border border-[color:var(--border)] bg-white p-4 text-sm outline-none transition focus:border-[color:var(--plum)] focus:ring-4 focus:ring-[color:var(--fuchsia)]/15"
            />
            <button className="mt-4 rounded-full grad-main px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]">
              Send Prescription
            </button>
          </section>
        </div>
      </div>
    </DashShell>
  );
}
