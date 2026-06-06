import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/grounding")({
  head: () => ({ meta: [{ title: "Grounding Mode — Empowered Care" }] }),
  component: Grounding,
});

const phrases = ["Breathe In...", "Hold...", "Breathe Out...", "Hold..."];

function Grounding() {
  const [phase, setPhase] = useState(0);
  const [exitVisible, setExitVisible] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setPhase((p) => (p + 1) % phrases.length), 3000);
    const t = setTimeout(() => setExitVisible(true), 6000); // demo: 6s
    return () => { clearInterval(i); clearTimeout(t); };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden text-white grad-main">
      <div className="pointer-events-none absolute inset-0 anim-ambient"
           style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,200,230,0.35) 0%, transparent 60%)" }} />

      <div className="relative flex flex-col items-center">
        <div className="relative flex h-[520px] w-[520px] items-center justify-center">
          <div className="absolute h-full w-full rounded-full bg-white anim-breathe-out" />
          <div className="absolute h-2/3 w-2/3 rounded-full bg-white anim-breathe-in" />
          <div key={phase} className="relative font-display text-5xl font-light italic transition-opacity duration-700">
            {phrases[phase]}
          </div>
        </div>

        <div className="mt-12 text-xs uppercase tracking-[0.3em] text-white/75">
          Notifications paused · Grounding in progress
        </div>
      </div>

      {exitVisible && (
        <Link to="/dashboard"
              className="absolute bottom-8 right-8 rounded-full border border-white/50 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20">
          End Session
        </Link>
      )}
    </div>
  );
}
