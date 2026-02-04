import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  cpuData: number[];
  memoryData: number[];
  status: "normal" | "warning" | "critical";
};

export default function SystemHealthGraph({
  cpuData,
  memoryData,
}: Props) {
  const data = cpuData.map((cpu, i) => ({
    time: i,
    cpu,
    memory: memoryData[i],
  }));

  return (
    <div className="relative p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md w-full h-80 overflow-hidden group hover:border-zinc-700 transition-colors mb-4">
      <h2 className="text-green-400 font-semibold mb-2">
        System Health
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" />
          <Line type="monotone" dataKey="memory" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
