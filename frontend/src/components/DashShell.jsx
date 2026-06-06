import Sidebar from './Sidebar'

export default function DashShell({ children }) {
  return (
    <div className="page-bg min-h-screen">
      <Sidebar />
      <main className="lg:pl-60">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  )
}
