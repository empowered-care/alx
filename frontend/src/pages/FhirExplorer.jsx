import { useMemo, useState } from 'react'
import DashShell from '../components/DashShell'
import { fhirMetricOptions } from '../data/mockData'

function buildObservation(metric, value, patientId, dateTime) {
  return {
    resourceType: 'Observation',
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'vital-signs',
            display: 'Vital Signs',
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: metric.loinc,
          display: metric.key,
        },
      ],
    },
    subject: { reference: `Patient/${patientId}` },
    effectiveDateTime: new Date(dateTime).toISOString(),
    valueQuantity: {
      value: Number(value),
      unit: metric.unit,
      system: 'http://unitsofmeasure.org',
    },
    device: { display: 'WeVa Sphere v2.1' },
  }
}

function JsonHighlight({ data }) {
  const json = JSON.stringify(data, null, 2)
  const parts = []
  const re = /("[^"]+")(\s*:)|("[^"]*")|(-?\d+(?:\.\d+)?)|([{}\[\],])/g
  let last = 0
  let idx = 0
  let match

  while ((match = re.exec(json)) !== null) {
    if (match.index > last) parts.push(json.slice(last, match.index))
    if (match[1]) {
      parts.push(
        <span key={idx++} style={{ color: '#C2507A' }}>
          {match[1]}
        </span>,
      )
      parts.push(
        <span key={idx++} style={{ color: '#7A5070' }}>
          {match[2]}
        </span>,
      )
    } else if (match[3]) {
      parts.push(
        <span key={idx++} style={{ color: '#F0A500' }}>
          {match[3]}
        </span>,
      )
    } else if (match[4]) {
      parts.push(
        <span key={idx++} style={{ color: '#fff' }}>
          {match[4]}
        </span>,
      )
    } else if (match[5]) {
      parts.push(
        <span key={idx++} style={{ color: '#7A5070' }}>
          {match[5]}
        </span>,
      )
    }
    last = match.index + match[0].length
  }
  if (last < json.length) parts.push(json.slice(last))

  return (
    <pre className="overflow-auto font-mono text-xs leading-relaxed">
      <code style={{ color: '#FDF6FB' }}>{parts}</code>
    </pre>
  )
}

const fieldClass =
  'mt-1 w-full rounded-xl border border-[rgba(164,64,124,0.2)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-fuchsia)] focus:ring-4 focus:ring-[rgba(164,64,124,0.15)]'

export default function FhirExplorer() {
  const [metricKey, setMetricKey] = useState('HRV')
  const [value, setValue] = useState('42')
  const [patientId, setPatientId] = useState('MIHRET-001')
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16))
  const [pushing, setPushing] = useState(false)
  const [success, setSuccess] = useState(false)

  const metric = fhirMetricOptions.find((m) => m.key === metricKey)

  const observation = useMemo(
    () => buildObservation(metric, value, patientId, dateTime),
    [metric, value, patientId, dateTime],
  )

  const handlePush = async () => {
    setPushing(true)
    setSuccess(false)
    try {
      const response = await fetch('http://localhost:8000/api/v1/fhir/observation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric_key: metric.key,
          value: Number(value),
          patient_id: patientId,
          date_time: new Date(dateTime).toISOString(),
          loinc: metric.loinc,
          unit: metric.unit,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to push to WeVa Sphere')
      }

      const data = await response.json()
      console.log('FHIR Response:', data)
      setSuccess(true)
    } catch (error) {
      console.error('Error pushing to FHIR endpoint:', error)
      alert('Failed to connect to the backend. Please ensure the backend is running on http://localhost:8000')
    } finally {
      setPushing(false)
    }
  }

  return (
    <DashShell>
      <header className="animate-fade-in-up mb-8">
        <h1 className="font-display text-4xl font-semibold lg:text-5xl">FHIR Explorer</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Live HL7 FHIR R4 Observation generator · LOINC compliant
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card animate-fade-in-up p-7" style={{ animationDelay: '0.05s' }}>
          <h2 className="font-display text-2xl font-semibold">Observation Input</h2>
          <div className="mt-6 space-y-4">
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Metric Type
              <select
                value={metricKey}
                onChange={(e) => {
                  setMetricKey(e.target.value)
                  setSuccess(false)
                }}
                className={fieldClass}
              >
                {fhirMetricOptions.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.key} (LOINC {m.loinc})
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Value
              <input
                type="number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setSuccess(false)
                }}
                className={fieldClass}
              />
            </label>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Patient ID
              <input
                type="text"
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value)
                  setSuccess(false)
                }}
                className={fieldClass}
              />
            </label>
            <label className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Date / Time
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => {
                  setDateTime(e.target.value)
                  setSuccess(false)
                }}
                className={fieldClass}
              />
            </label>
          </div>
          <button type="button" className="btn-primary mt-7 text-sm">
            Generate FHIR Observation
          </button>
        </section>

        <section className="animate-fade-in-up flex flex-col" style={{ animationDelay: '0.13s' }}>
          <div
            className="flex-1 overflow-hidden rounded-[20px]"
            style={{ background: 'var(--color-midnight)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-pulse)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-data)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-calm)]" />
                <span className="ml-4 font-mono text-xs text-white/60">observation.fhir.json</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/50">FHIR R4</span>
            </div>
            <div className="p-6">
              <JsonHighlight data={observation} />
            </div>
            <div className="border-t border-white/10 p-5">
              {success ? (
                <div className="rounded-xl bg-[var(--color-calm)]/20 px-4 py-3 text-center text-sm font-semibold text-[#9FE0A8]">
                  ✓ Observation Delivered · FHIR Compliant · LOINC {metric.loinc}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePush}
                  disabled={pushing}
                  className="btn-primary flex w-full items-center justify-center gap-2 text-sm"
                >
                  {pushing && <span className="spinner" />}
                  {pushing ? 'Pushing to WeVa Sphere...' : 'Push to WeVa Sphere'}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </DashShell>
  )
}
