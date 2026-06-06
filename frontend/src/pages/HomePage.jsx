import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useSectionReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function NavbarLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M16 3C10 3 6 8 6 14C6 19 9 24 14 27C15 27 16 27 17 27C22 24 26 19 26 14C26 8 22 3 16 3Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 9V17"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M3 22H7L9 16L11 24L13 18L15 22H19L21 15L23 23L25 19L27 22H29"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MetricTile({ label, value, unit, color, badge }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] p-4">
      <div className="font-sans text-[11px] uppercase tracking-widest text-white/60">{label}</div>
      <div className="font-mono text-[28px] font-bold leading-tight" style={{ color }}>
        {value}
      </div>
      <div className="font-sans text-[11px] text-white/50">{unit}</div>
      {badge && (
        <div className="mt-1 font-sans text-[10px]" style={{ color: '#FF4C6A' }}>
          {badge}
        </div>
      )}
    </div>
  )
}

const FEATURES = [
  {
    title: 'Chronic Disease Sentinel',
    body: 'Real-time hypertension and diabetes risk detection powered by 72-hour wearable data analysis.',
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <path
          d="M20 34C20 34 8 24 8 15C8 10 12 6 17 6C19 6 20 8 20 8C20 8 21 6 23 6C28 6 32 10 32 15C32 24 20 34 20 34Z"
          stroke="#A4407C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 20L18 24L26 14"
          stroke="#A4407C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 8L32 6V14"
          stroke="#A4407C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Mental Grounding Engine',
    body: 'HRV + screen time correlation detects burnout before it peaks. Triggers immersive grounding sessions.',
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <path
          d="M20 6C13 6 8 11 8 18C8 22 10 26 13 28C14 24 16 22 20 22C24 22 26 24 27 28C30 26 32 22 32 18C32 11 27 6 20 6Z"
          stroke="#A4407C"
          strokeWidth="1.8"
        />
        <path
          d="M12 30C14 28 17 27 20 27C23 27 26 28 28 30"
          stroke="#A4407C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M14 18C16 16 18 15 20 15C22 15 24 16 26 18"
          stroke="#A4407C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'EFCT 2025 Nutrition',
    body: "The only tracker built on Ethiopia's national food composition table. Glycemic load for Injera, Shiro, Teff, and more.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <path
          d="M8 28C8 28 12 24 20 24C28 24 32 28 32 28"
          stroke="#A4407C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <ellipse cx="20" cy="24" rx="14" ry="5" stroke="#A4407C" strokeWidth="1.8" />
        <path
          d="M20 19V10C20 8 22 6 24 6C25 6 26 7 26 8"
          stroke="#A4407C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18 12C17 10 16 8 14 7"
          stroke="#A4407C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Community Watch',
    body: 'Federated peer monitoring. Trusted contacts receive automatic alerts when your biometrics go critical.',
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <circle cx="20" cy="14" r="5" stroke="#A4407C" strokeWidth="1.8" />
        <circle cx="10" cy="28" r="4" stroke="#A4407C" strokeWidth="1.8" />
        <circle cx="30" cy="28" r="4" stroke="#A4407C" strokeWidth="1.8" />
        <path d="M16 18L12 24" stroke="#A4407C" strokeWidth="1.5" />
        <path d="M24 18L28 24" stroke="#A4407C" strokeWidth="1.5" />
        <path d="M14 28H26" stroke="#A4407C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'B2B Integrations',
    body: 'Direct API connections to gym trainer dashboards, Kuriftu Resorts, and WeVa Sphere clinical records.',
    icon: (
      <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
        <rect x="8" y="22" width="5" height="10" rx="1" fill="#A4407C" opacity="0.5" />
        <rect x="17" y="16" width="5" height="16" rx="1" fill="#A4407C" opacity="0.7" />
        <rect x="26" y="10" width="5" height="22" rx="1" fill="#A4407C" />
        <path
          d="M6 32H34M10 20L16 14L22 18L30 8"
          stroke="#A4407C"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Extract',
    body: 'Your wearables sync via Apple HealthKit and Google Health Connect — steps, heart rate, HRV, sleep stages, all captured in background.',
  },
  {
    num: '02',
    title: 'Transform',
    body: 'Raw signals are normalized and validated through our mobile ETL engine into a standardized internal health model.',
  },
  {
    num: '03',
    title: 'Deliver',
    body: 'Normalized data is mapped to FHIR Observation resources with LOINC codes and pushed to WeVa Sphere for clinical access.',
  },
]

const STATS = [
  { value: '150K', label: 'ETB Grand Prize' },
  { value: '5', label: 'Wellness Tracks' },
  { value: '2', label: 'Event Days' },
  { value: '48h', label: 'Build Sprint' },
]

function FhirSnippet() {
  return (
    <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed">
      <span className="text-white/30">{'{'}</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;resourceType&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;Observation&quot;</span>
      <span className="text-white/30">,</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;status&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;final&quot;</span>
      <span className="text-white/30">,</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;code&quot;</span>
      <span className="text-white/30">: {'{'}</span>
      {'\n    '}
      <span className="text-[#C2507A]">&quot;coding&quot;</span>
      <span className="text-white/30">: [{'{'}</span>
      {'\n      '}
      <span className="text-[#C2507A]">&quot;system&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;http://loinc.org&quot;</span>
      <span className="text-white/30">,</span>
      {'\n      '}
      <span className="text-[#C2507A]">&quot;code&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;80404-7&quot;</span>
      <span className="text-white/30">,</span>
      {'\n      '}
      <span className="text-[#C2507A]">&quot;display&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;Heart rate variability&quot;</span>
      {'\n    '}
      <span className="text-white/30">{'}'}]</span>
      {'\n  '}
      <span className="text-white/30">{'}'},</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;subject&quot;</span>
      <span className="text-white/30">: {'{ '}</span>
      <span className="text-[#C2507A]">&quot;reference&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;Patient/weva-uuid-8923&quot;</span>
      <span className="text-white/30"> {'}'},</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;effectiveDateTime&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;2026-06-06T09:15:00Z&quot;</span>
      <span className="text-white/30">,</span>
      {'\n  '}
      <span className="text-[#C2507A]">&quot;valueQuantity&quot;</span>
      <span className="text-white/30">: {'{'}</span>
      {'\n    '}
      <span className="text-[#C2507A]">&quot;value&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-white">42.5</span>
      <span className="text-white/30">,</span>
      {'\n    '}
      <span className="text-[#C2507A]">&quot;unit&quot;</span>
      <span className="text-white/30">: </span>
      <span className="text-[#F0A500]">&quot;ms&quot;</span>
      {'\n  '}
      <span className="text-white/30">{'}'}</span>
      {'\n'}
      <span className="text-white/30">{'}'}</span>
    </pre>
  )
}

export default function HomePage() {
  const featuresRef = useSectionReveal()
  const processRef = useSectionReveal()
  const hackathonRef = useSectionReveal()
  const ctaRef = useSectionReveal()

  return (
    <div className="homepage min-h-screen overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full">
        <div className="flex items-center justify-between px-8 py-5 lg:px-20">
          <Link to="/" className="flex items-center gap-2.5">
            <NavbarLogo />
            <span className="font-display text-[20px] font-bold text-white">EmpoweredCare</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            <a href="#features" className="text-[14px] text-white transition-opacity hover:opacity-70">
              Features
            </a>
            <Link to="/dashboard" className="text-[14px] text-white transition-opacity hover:opacity-70">
              Dashboard
            </Link>
            <Link to="/community" className="text-[14px] text-white transition-opacity hover:opacity-70">
              Community
            </Link>
            <Link to="/trainer" className="text-[14px] text-white transition-opacity hover:opacity-70">
              For Trainers
            </Link>
          </nav>

          <Link
            to="/dashboard"
            className="rounded-full border border-white px-5 py-2 text-[14px] text-white transition-all hover:bg-white hover:text-[#A4407C]"
          >
            Register Now
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative min-h-screen"
        style={{ background: 'linear-gradient(135deg, #A4407C 0%, #7F3766 100%)' }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-white opacity-5 blur-3xl" />

        <div className="grid min-h-screen items-center px-8 pb-20 pt-32 lg:grid-cols-2 lg:px-20">
          {/* Left column */}
          <div>
            <p className="hero-fade-in hero-fade-in-delay-1 mb-6 font-sans text-[12px] uppercase tracking-[0.2em] text-white/70">
              Wellness Reimagined · Ethiopia 2026
            </p>

            <h1 className="font-display font-bold leading-none text-white">
              <span
                className="hero-fade-in hero-fade-in-delay-2 block"
                style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
              >
                Know Your Body.
              </span>
              <span
                className="hero-fade-in hero-fade-in-delay-3 mb-8 block text-white/85"
                style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
              >
                Before It Speaks.
              </span>
            </h1>

            <p className="hero-fade-in hero-fade-in-delay-4 mb-10 max-w-md font-sans text-[16px] leading-relaxed text-white/75">
              The first federated health companion built for Africa — unifying wearable data, chronic
              disease detection, and community into one living intelligence.
            </p>

            <div className="hero-fade-in hero-fade-in-delay-5 flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="rounded-full bg-white px-7 py-3.5 font-sans text-[14px] font-semibold text-[#A4407C] transition-all duration-200 hover:scale-105 hover:bg-white/90"
              >
                Begin Your Journey →
              </Link>
              <Link
                to="/fhir"
                className="rounded-full border border-white/50 px-7 py-3.5 font-sans text-[14px] text-white transition-all duration-200 hover:bg-white/10"
              >
                Watch the Demo
              </Link>
            </div>

            <div className="hero-fade-in hero-fade-in-delay-6 mt-12">
              <p className="mb-3 font-sans text-[11px] text-white/50">Integrated with</p>
              <p className="font-sans text-[13px] tracking-[0.05em] text-white/60">
                Apple Health · Google Health Connect · WeVa Sphere · Kuriftu Resorts · EFCT 2025
              </p>
            </div>
          </div>

          {/* Right column — dashboard card */}
          <div className="mt-12 flex justify-center lg:mt-0 lg:justify-end">
            <div className="animate-floating w-full max-w-[340px] rounded-3xl border border-white/15 bg-white/[0.08] p-7 backdrop-blur-[16px]">
              <div className="mb-4 flex items-center gap-2">
                <h2 className="font-display text-[18px] text-white">Live Biometrics</h2>
                <span className="flex items-center gap-1 font-sans text-[11px] text-[#FF4C6A]">
                  <span className="animate-pulse-dot">●</span> LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricTile label="Heart Rate" value="78" unit="BPM" color="#6BAE75" />
                <MetricTile label="HRV" value="42" unit="ms" color="#F0A500" />
                <MetricTile label="Sleep" value="4.8h" unit="hours" color="#FF4C6A" badge="⚠ Critical" />
                <MetricTile label="Steps" value="7,200" unit="steps" color="#FFFFFF" />
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 font-sans text-[13px] text-[#FF4C6A]">
                  <span className="inline-block h-2 w-2 animate-pulse-dot rounded-full bg-[#FF4C6A]" />
                  Sentinel Alert Active
                </div>
                <p className="mt-1 font-sans text-[11px] text-white/50">
                  Hypertension risk detected · Sleep &lt; 5h
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full leading-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-16 w-full md:h-20">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z"
              fill="#FFF8FC"
            />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        ref={featuresRef}
        className="section-reveal bg-[#FFF8FC] px-8 py-20 lg:px-20"
      >
        <p className="mb-3 text-center font-sans text-[12px] uppercase tracking-[0.2em] text-[#A4407C]">
          What We Do
        </p>
        <h2 className="mb-4 text-center font-display text-[44px] text-[#1A0D1A]">
          One Platform. Every Signal.
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center font-sans text-[16px] text-[#7A5070]">
          Empowered Care unifies five critical wellness domains into a single federated intelligence
          layer.
        </p>

        <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="min-w-[220px] flex-shrink-0 rounded-[20px] border border-[rgba(164,64,124,0.12)] bg-white p-6 shadow-[0_4px_24px_rgba(127,55,102,0.08)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(127,55,102,0.14)] lg:min-w-0"
            >
              {feature.icon}
              <h3 className="mb-2 mt-4 font-sans text-[15px] font-semibold text-[#1A0D1A]">
                {feature.title}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed text-[#7A5070]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        ref={processRef}
        className="section-reveal px-8 py-24 lg:px-20"
        style={{ background: 'linear-gradient(135deg, #1A0D1A 0%, #2D1428 100%)' }}
      >
        <p className="mb-3 text-center font-sans text-[12px] uppercase tracking-[0.2em] text-[#A4407C]">
          The Process
        </p>
        <h2 className="mb-4 text-center font-display text-[48px] text-white">From Wrist to Clinic.</h2>
        <p className="mx-auto mb-16 max-w-xl text-center font-sans text-[16px] text-white/60">
          A mobile ETL pipeline transforms your raw wearable signals into clinical-grade FHIR data.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-start">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-1 items-center lg:flex-row">
              <div className="flex-1 px-4 py-6 text-center lg:px-8 lg:py-0">
                <div className="mb-2 font-mono text-[64px] font-bold leading-none text-[#A4407C]/20">
                  {step.num}
                </div>
                <h3 className="mb-3 font-display text-[22px] text-white">{step.title}</h3>
                <p className="mx-auto max-w-xs font-sans text-[14px] leading-relaxed text-white/60">
                  {step.body}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden h-24 w-px shrink-0 self-center bg-[#A4407C]/20 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-16 h-px max-w-4xl"
          style={{ background: 'linear-gradient(90deg, transparent, #A4407C 50%, transparent)', opacity: 0.2 }}
        />

        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-[rgba(164,64,124,0.2)] bg-white/[0.04] p-6">
          <div className="mb-4 flex items-center gap-2 font-sans text-[13px] text-white/40">
            <span className="h-2 w-2 rounded-full bg-[#A4407C]" />
            FHIR Observation · HRV · LOINC 80404-7
          </div>
          <FhirSnippet />
        </div>
      </section>

      {/* HACKATHON */}
      <section ref={hackathonRef} className="section-reveal bg-[#FFF8FC] px-8 py-20 lg:px-20">
        <p className="mb-3 text-center font-sans text-[12px] uppercase tracking-[0.2em] text-[#A4407C]">
          Wellness Hackathon 2026
        </p>
        <h2 className="mb-4 text-center font-display text-[44px] text-[#1A0D1A]">
          Heal · Build · Thrive
        </h2>
        <p className="mb-16 text-center font-sans text-[15px] text-[#7A5070]">
          Day 1 · June 6 · Capstone ALX Tech Hub, Lideta
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[rgba(164,64,124,0.15)] bg-white p-6 text-center"
            >
              <div className="font-mono text-[40px] font-bold text-[#A4407C]">{stat.value}</div>
              <div className="mt-2 font-sans text-[13px] text-[#7A5070]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section
        ref={ctaRef}
        className="section-reveal px-8 py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #A4407C 0%, #7F3766 100%)' }}
      >
        <h2 className="mb-4 font-display text-[52px] text-white">
          Your body is already speaking.
        </h2>
        <p className="mb-10 font-sans text-[18px] text-white/75">
          Start listening with Empowered Care.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="rounded-full bg-white px-8 py-4 font-sans font-semibold text-[#A4407C] transition-all duration-200 hover:scale-105"
          >
            Begin Your Journey →
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-white/40 px-8 py-4 font-sans text-white transition-all duration-200 hover:bg-white/10"
          >
            Explore the Dashboard
          </Link>
        </div>

        <p className="mt-8 font-sans text-[12px] text-white/40">
          Wellness Hackathon 2026 · ALX Africa · Addis Ababa, Ethiopia
        </p>
      </section>
    </div>
  )
}
