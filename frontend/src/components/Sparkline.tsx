import { LineChart, Line, ResponsiveContainer } from "recharts";

export function Sparkline({ data, color = "#A4407C" }: { data: { d: string; v: number }[]; color?: string }) {
  return (
    <div className="h-10 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} strokeOpacity={0.7} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
