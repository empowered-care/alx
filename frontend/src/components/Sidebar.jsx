import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { navItems, user } from '../data/mockData'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between bg-[var(--color-midnight)] p-6 lg:flex">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" gradient />
          <span className="font-display text-gradient text-xl font-semibold">Empowered</span>
        </Link>

        <nav className="mt-12 flex flex-col gap-1">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-main text-white shadow-lg'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-main font-mono text-sm font-bold text-white">
            {user.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user.name.split(' ')[0]} A.</p>
            <button type="button" className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
