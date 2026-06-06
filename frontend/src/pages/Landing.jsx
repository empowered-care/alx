import { Link, NavLink } from 'react-router-dom'
import Logo from '../components/Logo'
import './Landing.css'

const WAVEFORM_PATH =
  'M0 65 L20 65 L28 45 L36 85 L44 30 L52 75 L60 55 L68 65 L88 65 L96 50 L104 80 L112 40 L120 70 L128 60 L136 65 L156 65 L164 48 L172 82 L180 35 L188 72 L196 58 L204 65 L224 65 L232 46 L240 84 L248 32 L256 74 L264 56 L272 65 L292 65 L300 52 L308 78 L316 42 L324 68 L332 62 L340 65 L360 65 L368 47 L376 83 L384 38 L392 71 L400 57 L408 65 L428 65 L436 49 L444 81 L452 36 L460 73 L468 59 L476 65 L496 65 L504 51 L512 79 L520 44 L528 69 L536 63 L544 65 L564 65 L572 48 L580 82 L588 34 L596 74 L604 56 L612 65 L632 65'

function EcgSvg({ gradId }) {
  return (
    <svg viewBox="0 0 640 130" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6BAE75" />
          <stop offset="40%" stopColor="#7A5070" />
          <stop offset="75%" stopColor="#C17B4E" />
          <stop offset="100%" stopColor="#FF4C6A" />
        </linearGradient>
      </defs>
      <path d={WAVEFORM_PATH} stroke={`url(#${gradId})`} />
    </svg>
  )
}

function HeartRateWaveform() {
  return (
    <div className="landing-waveform-wrap" aria-hidden="true">
      <div className="landing-waveform-track">
        <EcgSvg gradId="ecgGradA" />
        <EcgSvg gradId="ecgGradB" />
      </div>
      <div className="landing-pulse-dot" />
    </div>
  )
}

const FEATURE_CARDS = [
  {
    label: 'SENTINEL',
    text: 'Detects chronic disease patterns from wearable signals before symptoms appear.',
  },
  {
    label: 'FEDERATED',
    text: 'Your data stays yours. Apple Health, Google Connect, WeVa — one private view.',
  },
  {
    label: 'CULTURAL',
    text: 'Powered by EFCT 2025 — the only platform that understands Injera and Shiro.',
  },
]

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/community', label: 'Community' },
  { to: '/trainer', label: 'For Trainers' },
  { to: '/fhir', label: 'FHIR' },
]

export default function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-nav landing-animate">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-brand">
            <Logo className="h-8 w-8" />
            <span className="landing-brand-name">Empowered Care</span>
          </Link>

          <nav className="landing-nav-links" aria-label="Primary">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `landing-nav-link${isActive ? ' landing-nav-link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link to="/dashboard" className="btn-register">
            Register Now
          </Link>
        </div>
      </header>

      <main className="landing-main" id="hero">
        <div className="landing-hero-grid">
          <div className="landing-hero-copy landing-animate landing-animate-delay-1">
            <p className="landing-eyebrow">Wellness Reimagined</p>
            <h1>
              <span className="landing-headline-fuchsia">Know Your</span>
              <span className="landing-headline-fuchsia">Body.</span>
              <span className="landing-headline-midnight">Before It Speaks.</span>
            </h1>
            <p className="landing-subtitle">
              The first federated health companion built for Ethiopia — unifying your wearable
              data, chronic disease risk, and community into one living dashboard.
            </p>
            <div className="landing-ctas">
              <Link to="/dashboard" className="btn-landing-primary">
                Start Your Journey
                <span aria-hidden="true">→</span>
              </Link>
              <Link to="/fhir" className="btn-landing-ghost">
                See How It Works
              </Link>
            </div>
          </div>

          <div
            className="landing-visual landing-animate landing-animate-delay-3"
            aria-label="Live heart rate waveform visualization"
          >
            <div className="landing-sphere-glow" />
            <div className="landing-sphere-ring" />
            <div className="landing-sphere" />
            <HeartRateWaveform />
            <div className="landing-metrics-row">
              <span className="landing-metric-item">
                <span className="landing-metric-key">HR</span> — 78 BPM
              </span>
              <span className="landing-metric-item">
                <span className="landing-metric-key">HRV</span> — 42 MS
              </span>
            </div>
          </div>
        </div>

        <div className="landing-partners-strip landing-animate landing-animate-delay-4">
          <span>Apple Health</span>
          <span className="landing-partners-dot">·</span>
          <span>Google Health Connect</span>
          <span className="landing-partners-dot">·</span>
          <span>WeVa Sphere</span>
          <span className="landing-partners-dot">·</span>
          <span>Kuriftu Resorts</span>
          <span className="landing-partners-dot">·</span>
          <span>EFCT 2025</span>
        </div>

        <div className="landing-features landing-animate landing-animate-delay-5">
          {FEATURE_CARDS.map((card) => (
            <article key={card.label} className="landing-feature-card">
              <p className="landing-feature-label">{card.label}</p>
              <p className="landing-feature-text">{card.text}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
