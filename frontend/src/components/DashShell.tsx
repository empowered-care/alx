import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function DashShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-[240px]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
