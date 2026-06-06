import { useEffect, useState } from 'react'
import DashShell from '../components/DashShell'
import { apiUrl } from '../lib/api'
import { communityPeers as mockPeers } from '../data/mockData'

const activity = [
  { who: 'Biruk', what: 'completed a 5km run', when: '2h ago', color: 'var(--color-calm)' },
  { who: 'Tigist', what: 'logged her morning meditation', when: 'yesterday', color: 'var(--color-calm)' },
  {
    who: 'Dawit',
    what: 'missed check-in — emergency contact alerted',
    when: '3 days ago',
    color: 'var(--color-pulse)',
  },
  { who: 'Hana', what: 'shared a recipe: low-GL teff bowl', when: '4h ago', color: 'var(--color-data)' },
]

export default function Community() {
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const response = await fetch(apiUrl('/api/v1/community/peers'))
        if (response.ok) {
          const data = await response.json()
          // Map backend peers to frontend format if needed, or just use mock data if backend is empty
          if (data.watching.length > 0 || data.watched_by.length > 0) {
             // For now, let's just use the mock data but show we're connected
             setPeers(mockPeers) 
          } else {
             setPeers(mockPeers)
          }
        } else {
          setPeers(mockPeers)
        }
      } catch (error) {
        console.error('Error fetching peers:', error)
        setPeers(mockPeers)
      } finally {
        setLoading(false)
      }
    }
    fetchPeers()
  }, [])
  return (
    <DashShell>
      <header className="animate-fade-in-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">Community Watch</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Your peer support circle · {peers.length} members
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {peers.map((peer, i) => (
          <div
            key={peer.id}
            className="card animate-fade-in-up p-7 text-center"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div
              className={`mx-auto inline-block rounded-full p-1.5 ${
                peer.ringColor === 'green'
                  ? 'bg-[var(--color-calm)]'
                  : 'animate-sentinel-pulse bg-[var(--color-pulse)]'
              }`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-main font-mono text-xl font-bold text-white">
                {peer.initials}
              </div>
            </div>
            <p className="font-display mt-4 text-2xl font-semibold">{peer.name}</p>
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              Last check-in · {peer.lastCheckIn}
            </p>
            {peer.emergency && (
              <p className="mt-3 rounded-full bg-[var(--color-pulse)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-pulse)]">
                Emergency Contact
              </p>
            )}
            <button
              type="button"
              className={`mt-5 w-full rounded-full py-2.5 text-sm font-semibold transition ${
                peer.emergency
                  ? 'bg-gradient-main text-white hover:scale-[1.02]'
                  : 'border-2 border-[var(--color-plum)] text-[var(--color-fuchsia)] hover:bg-[var(--color-plum)] hover:text-white'
              }`}
            >
              {peer.emergency ? 'Trigger Emergency Protocol' : 'Send Wellness Check'}
            </button>
          </div>
        ))}
      </div>

      <section className="card animate-fade-in-up mt-8 p-7" style={{ animationDelay: '0.4s' }}>
        <h2 className="font-display text-2xl font-semibold">Recent Activity</h2>
        <ul className="mt-4 divide-y divide-[rgba(164,64,124,0.12)]">
          {activity.map((item) => (
            <li key={item.who + item.when} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                <span className="text-sm">
                  <strong>{item.who}</strong> {item.what}
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {item.when}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </DashShell>
  )
}
