import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

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

  const [liveCpu, setLiveCpu] = useState(cpuData);
  const [liveMemory, setLiveMemory] = useState(memoryData);

  // 🔥 Controlled metric drift
  useEffect(() => {

    const interval = setInterval(() => {

      setLiveCpu(prev => {
        const last = prev[prev.length - 1];

        const next = Math.max(
          5,
          Math.min(95, last + (Math.random() * 6 - 3))
        );

        return [...prev.slice(1), Number(next.toFixed(1))];
      });

      setLiveMemory(prev => {
        const last = prev[prev.length - 1];

        const next = Math.max(
          10,
          Math.min(90, last + (Math.random() * 4 - 2))
        );

        return [...prev.slice(1), Number(next.toFixed(1))];
      });

    }, 2200); // slow = professional

    return () => clearInterval(interval);

  }, []);

  const data = liveCpu.map((cpu, i) => ({
    time: i,
    cpu,
    memory: liveMemory[i],
  }));


  const statusColor = {
    normal: "text-green-400",
    warning: "text-yellow-400",
    critical: "text-red-400",
  };


  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">

        <h2 className="font-mono text-sm tracking-wide text-zinc-400">
          SYSTEM HEALTH
        </h2>

        <span className={`font-mono text-xs ${statusColor[status]}`}>
          {status.toUpperCase()}
        </span>

      </div>

      {/* GRAPH CONTAINER */}
      <div className="p-4 border border-zinc-800 rounded-xl bg-black">

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>

            <XAxis
              dataKey="time"
              stroke="#555"
              tick={{ fontSize: 10 }}
            />

            <YAxis
              stroke="#555"
              tick={{ fontSize: 10 }}
              domain={[0, 100]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#050505",
                border: "1px solid #27272a",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#f87171"
              dot={false}
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="memory"
              stroke="#60a5fa"
              dot={false}
              strokeWidth={2}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}
