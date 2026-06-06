import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/grounding", label: "Grounding" },
  { to: "/trainer", label: "Trainer" },
  { to: "/community", label: "Community" },
  { to: "/fhir", label: "FHIR Explorer" },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col justify-between p-6 lg:flex"
      style={{ backgroundColor: "var(--midnight)" }}
    >
      <div>
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" gradient />
          <span className="text-grad font-display text-xl font-semibold">Empowered</span>
        </Link>

        <nav className="mt-12 flex flex-col gap-1">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active ? "grad-main text-white shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="grad-main flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-bold text-white">
            MA
          </div>
          <div>
            <div className="text-sm font-medium text-white">Mihret A.</div>
            <button className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
