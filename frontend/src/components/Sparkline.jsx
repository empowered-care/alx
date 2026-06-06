import { Line, LineChart, ResponsiveContainer } from 'recharts'

export default function Sparkline({ data, color = '#A4407C', height = 40 }) {
  const chartData = data.map((v, i) => ({ i, v: typeof v === 'object' ? v.v : v }))

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            dot={false}
            strokeOpacity={0.6}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
