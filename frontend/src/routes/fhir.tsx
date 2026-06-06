import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashShell } from "@/components/DashShell";

export const Route = createFileRoute("/fhir")({
  head: () => ({ meta: [{ title: "FHIR Explorer — Empowered Care" }] }),
  component: FhirExplorer,
});

const metricOptions = [
  { key: "hr", label: "Heart Rate", loinc: "8867-4", unit: "beats/minute" },
  { key: "hrv", label: "HRV", loinc: "80404-7", unit: "ms" },
  { key: "sleep", label: "Sleep Duration", loinc: "93832-4", unit: "h" },
  { key: "bp", label: "Blood Pressure", loinc: "85354-9", unit: "mmHg" },
];

function FhirExplorer() {
  const [type, setType] = useState(metricOptions[1].key);
  const [value, setValue] = useState("42");
  const [pid, setPid] = useState("MIHRET-001");
  const [dt, setDt] = useState(new Date().toISOString().slice(0, 16));
  const [pushed, setPushed] = useState(false);
  const [loading, setLoading] = useState(false);

  const m = metricOptions.find((x) => x.key === type)!;

  const json = useMemo(() => ({
    resourceType: "Observation",
    status: "final",
    category: [{
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: "vital-signs",
        display: "Vital Signs",
      }],
    }],
    code: { coding: [{ system: "http://loinc.org", code: m.loinc, display: m.label }] },
    subject: { reference: `Patient/${pid}` },
    effectiveDateTime: new Date(dt).toISOString(),
    valueQuantity: { value: Number(value), unit: m.unit, system: "http://unitsofmeasure.org" },
    device: { display: "WeVa Sphere v2.1" },
  }), [type, value, pid, dt, m]);

  function push() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPushed(true); }, 1100);
  }

  return (
    <DashShell>
      <header className="anim-fade-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">FHIR Explorer</h1>
        <p className="mt-1 text-sm text-[color:var(--text-muted)]">Live HL7 FHIR R4 Observation generator · LOINC compliant</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* INPUT */}
        <section className="card-base anim-fade-up p-7" style={{ animationDelay: "0.05s" }}>
          <h2 className="font-display text-2xl font-semibold">Observation Input</h2>
          <div className="mt-6 space-y-4">
            <Field label="Metric Type">
              <select value={type} onChange={(e) => setType(e.target.value)} className={fieldCls}>
                {metricOptions.map((o) => <option key={o.key} value={o.key}>{o.label} (LOINC {o.loinc})</option>)}
              </select>
            </Field>
            <Field label="Value">
              <input value={value} onChange={(e) => { setValue(e.target.value); setPushed(false); }} className={fieldCls} />
            </Field>
            <Field label="Patient ID">
              <input value={pid} onChange={(e) => { setPid(e.target.value); setPushed(false); }} className={fieldCls} />
            </Field>
            <Field label="Date / Time">
              <input type="datetime-local" value={dt} onChange={(e) => { setDt(e.target.value); setPushed(false); }} className={fieldCls} />
            </Field>
          </div>
          <button className="mt-7 rounded-full grad-main px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]">
            Generate FHIR Observation
          </button>
        </section>

        {/* OUTPUT */}
        <section className="anim-fade-up overflow-hidden rounded-[20px]" style={{ animationDelay: "0.13s", background: "var(--midnight)" }}>
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4C6A]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F0A500]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#6BAE75]" />
              <span className="ml-4 font-mono text-xs text-white/60">observation.fhir.json</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/50">FHIR R4</span>
          </div>
          <pre className="overflow-auto p-6 font-mono text-[12px] leading-relaxed">
            <Highlight obj={json} />
          </pre>

          <div className="border-t border-white/10 p-5">
            {pushed ? (
              <div className="rounded-xl bg-[color:var(--calm)]/20 px-4 py-3 text-center text-sm font-semibold text-[#9FE0A8]">
                ✓ Observation Delivered · FHIR Compliant · LOINC {m.loinc}
              </div>
            ) : (
              <button onClick={push} disabled={loading}
                className="w-full rounded-full grad-main py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-70">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Pushing to WeVa Sphere...
                  </span>
                ) : "Push to WeVa Sphere"}
              </button>
            )}
          </div>
        </section>
      </div>
    </DashShell>
  );
}

const fieldCls =
  "w-full rounded-xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--plum)] focus:ring-4 focus:ring-[color:var(--fuchsia)]/15";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--text-muted)]">{label}</label>
      {children}
    </div>
  );
}

/* Tiny syntax highlighter for FHIR JSON */
function Highlight({ obj }: { obj: unknown }) {
  const s = JSON.stringify(obj, null, 2);
  const parts: React.ReactNode[] = [];
  // regex: keys, strings, numbers, punctuation
  const re = /("[^"]+")(\s*:)|("[^"]*")|(-?\d+(?:\.\d+)?)|([{}\[\],])/g;
  let last = 0, idx = 0, mm: RegExpExecArray | null;
  while ((mm = re.exec(s)) !== null) {
    if (mm.index > last) parts.push(s.slice(last, mm.index));
    if (mm[1]) { parts.push(<span key={idx++} style={{ color: "#C2507A" }}>{mm[1]}</span>); parts.push(<span key={idx++} style={{ color: "#7A5070" }}>{mm[2]}</span>); }
    else if (mm[3]) parts.push(<span key={idx++} style={{ color: "#F0A500" }}>{mm[3]}</span>);
    else if (mm[4]) parts.push(<span key={idx++} style={{ color: "#fff" }}>{mm[4]}</span>);
    else if (mm[5]) parts.push(<span key={idx++} style={{ color: "#7A5070" }}>{mm[5]}</span>);
    last = mm.index + mm[0].length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return <code style={{ color: "#FDF6FB" }}>{parts}</code>;
}
