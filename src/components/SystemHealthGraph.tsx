import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  cpuData: number[];
  memoryData: number[];
  status: "normal" | "warning" | "critical";
};

export default function SystemHealthGraph({
  cpuData,
  memoryData,
  status,
}: Props) {

  const data = cpuData.map((cpu, i) => ({
    time: `${i}s`,
    cpu,
    memory: memoryData[i],
  }));

  const statusColor = {
    normal: "text-green-400",
    warning: "text-yellow-400",
    critical: "text-red-400",
  };

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <h2 className="font-semibold text-zinc-200 tracking-wide">
          SYSTEM HEALTH
        </h2>

        <div className={`text-xs font-mono ${statusColor[status]}`}>
          ● {status.toUpperCase()}
        </div>

      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f1f1f"
          />

          <XAxis
            dataKey="time"
            stroke="#666"
            tick={{ fontSize: 11 }}
          />

          <YAxis
            stroke="#666"
            tick={{ fontSize: 11 }}
            domain={[0, 100]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0a0a0a",
              border: "1px solid #222",
              fontSize: "12px",
            }}
          />

          {/* CPU — dominant */}
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />

          {/* Memory — secondary */}
          <Line
            type="monotone"
            dataKey="memory"
            stroke="#38bdf8"
            strokeWidth={1.5}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
