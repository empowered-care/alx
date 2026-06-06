import { createFileRoute } from "@tanstack/react-router";
import { DashShell } from "@/components/DashShell";
import { peers } from "@/data/mockData";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community Watch — Empowered Care" }] }),
  component: Community,
});

function Community() {
  return (
    <DashShell>
      <header className="anim-fade-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">Community Watch</h1>
        <p className="mt-1 text-sm text-[color:var(--text-muted)]">Your peer support circle · 4 members</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {peers.map((p, i) => (
          <div key={p.name} className="card-base anim-fade-up p-7 text-center" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className={`mx-auto inline-block rounded-full p-1.5 ${p.state === "ok" ? "bg-[color:var(--calm)]" : "bg-[color:var(--pulse)] animate-pulse"}`}>
              <div className="grad-main flex h-20 w-20 items-center justify-center rounded-full font-mono text-xl font-bold text-white">
                {p.initials}
              </div>
            </div>
            <div className="mt-4 font-display text-2xl font-semibold">{p.name}</div>
            <div className="text-xs uppercase tracking-widest text-[color:var(--text-muted)]">Last check-in · {p.last}</div>

            {p.emergency && (
              <div className="mt-3 rounded-full bg-[color:var(--pulse)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--pulse)]">
                Emergency Contact
              </div>
            )}

            <button className={`mt-5 w-full rounded-full py-2.5 text-sm font-semibold transition ${
              p.state === "ok"
                ? "border border-[color:var(--plum)] text-[color:var(--fuchsia)] hover:bg-[color:var(--plum)] hover:text-white"
                : "grad-main text-white hover:scale-[1.02]"
            }`}>
              {p.state === "ok" ? "Send Wellness Check" : "Trigger Emergency Protocol"}
            </button>
          </div>
        ))}
      </div>

      <section className="card-base anim-fade-up mt-8 p-7" style={{ animationDelay: "0.4s" }}>
        <h2 className="font-display text-2xl font-semibold">Recent Activity</h2>
        <ul className="mt-4 divide-y divide-[color:var(--border)]">
          {[
            { who: "Biruk", what: "completed a 5km run", when: "2h ago", c: "calm" },
            { who: "Tigist", what: "logged her morning meditation", when: "yesterday", c: "calm" },
            { who: "Dawit", what: "missed check-in — emergency contact alerted", when: "3 days ago", c: "pulse" },
            { who: "Hana", what: "shared a recipe: low-GL teff bowl", when: "4h ago", c: "data" },
          ].map((a, i) => (
            <li key={i} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: `var(--${a.c})` }} />
                <span className="text-sm"><b>{a.who}</b> {a.what}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[color:var(--text-muted)]">{a.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </DashShell>
  );
}
