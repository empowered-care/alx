import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Empowered Care — Wellness Reimagined" },
      { name: "description", content: "The first federated health companion built for Africa." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative grad-main">
        {/* Extra glow layers behind floating card */}
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-[680px] w-[680px] rounded-full anim-hero-glow"
             style={{ background: "radial-gradient(circle, rgba(255,180,220,0.55) 0%, rgba(194,80,122,0.4) 35%, rgba(127,55,102,0) 70%)" }} />
        <div className="pointer-events-none absolute top-20 right-0 h-[420px] w-[420px] rounded-full blur-3xl"
             style={{ background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(circle, #C2507A, transparent 65%)" }} />

        {/* NAV */}
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div className="flex items-center gap-2 text-white">
            <Logo className="h-9 w-9 text-white" />
            <span className="font-display text-2xl font-semibold">Empowered</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-white/85 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/community" className="hover:text-white">Community</Link>
            <Link to="/trainer" className="hover:text-white">For Trainers</Link>
          </div>
          <button className="rounded-full border border-white/70 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[color:var(--plum)]">
            Register Now
          </button>
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-32 pt-16 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:pb-40 lg:pt-24">
          <div className="text-white">
            <div className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-pink-100/85">
              Wellness Reimagined · Ethiopia 2026
            </div>
            <h1 className="font-display font-semibold leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(64px, 9vw, 132px)" }}>
              Know Your Body.
              <br />
              <span className="font-light italic text-pink-100/95">Before It Speaks.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85">
              The first federated health companion built for Africa — unifying wearable data,
              chronic disease detection, and community into one living intelligence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/dashboard"
                    className="group rounded-full bg-white px-7 py-3.5 font-semibold text-[color:var(--plum)] transition-all hover:scale-[1.03] hover:shadow-2xl">
                Begin Your Journey
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <button className="rounded-full border border-white/70 px-7 py-3.5 font-semibold text-white transition-all hover:bg-white/10">
                Watch the Demo
              </button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-white/65">
              <span>Apple Health</span><span>·</span>
              <span>Google Health Connect</span><span>·</span>
              <span>WeVa Sphere</span><span>·</span>
              <span>Kuriftu Resorts</span><span>·</span>
              <span>EFCT 2025</span>
            </div>
          </div>

          {/* Floating glass dashboard preview */}
          <div className="relative">
            <div className="anim-levitate relative rounded-3xl border border-white/25 p-6 backdrop-blur-2xl"
                 style={{ background: "rgba(255,255,255,0.10)", boxShadow: "0 30px 80px rgba(20,5,30,0.45)" }}>
              <div className="mb-5 flex items-center justify-between text-white/80">
                <div className="text-xs uppercase tracking-[0.25em]">Live Biometrics</div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6BAE75]" />
                  <span className="text-[10px] uppercase tracking-widest">Streaming</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: "HR", value: "78", unit: "bpm", color: "#6BAE75" },
                  { label: "HRV", value: "42", unit: "ms", color: "#F0A500" },
                  { label: "Sleep", value: "4.8", unit: "h", color: "#FF4C6A" },
                  { label: "Steps", value: "7.2k", unit: "today", color: "#FFFFFF" },
                ].map((m) => (
                  <MiniRing key={m.label} {...m} />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60">Sentinel</div>
                  <div className="font-display text-lg text-white">Hypertension Watch</div>
                </div>
                <div className="rounded-full bg-[#FF4C6A]/25 px-3 py-1 text-xs font-semibold text-white">ACTIVE</div>
              </div>
            </div>
          </div>
        </div>

        {/* WAVE */}
        <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none">
          <path d="M0,80 C320,140 720,0 1440,90 L1440,120 L0,120 Z" fill="var(--cream)" />
        </svg>
      </section>

      {/* Features strip */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--plum)]">The System</div>
          <h2 className="mt-3 font-display text-5xl font-semibold text-[color:var(--text-primary)]">
            Six surfaces. One living intelligence.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Biometric Hub", d: "Federated wearable data unified in one view — Apple, Google, WeVa." },
            { t: "Sentinel Alert", d: "Predictive chronic risk detection before symptoms arrive." },
            { t: "EFCT Nutrition", d: "Glycemic load tracking for traditional Ethiopian foods." },
            { t: "Grounding Mode", d: "Nervous system regulation when sympathetic dominance hits." },
            { t: "Community Watch", d: "Peer monitoring with emergency contact escalation." },
            { t: "Kuriftu Prescription", d: "Auto-generated luxury spa restoration plans." },
          ].map((f, i) => (
            <div key={f.t} className="card-base anim-fade-up p-7 hover:card-base-hover" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="mb-4 h-1 w-12 grad-main rounded-full" />
              <h3 className="font-display text-2xl font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MiniRing({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  const size = 96, stroke = 6, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.18)" strokeWidth={stroke} fill="none" />
          <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.35} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-mono text-xl font-medium text-white">{value}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/60">{unit}</div>
        </div>
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70">{label}</div>
    </div>
  );
}
