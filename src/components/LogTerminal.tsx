import React from 'react';

interface LogTerminalProps {
  logs?: string[];
  highlight?: string;
}

const LogTerminal: React.FC<LogTerminalProps> = ({
  logs = [],
  highlight,
}) => {

  const displayLogs =
    logs.length > 0
      ? logs
      : [
          "[10:00:01] INFO  System init...",
          "[10:00:02] INFO  Services loaded",
          "[10:00:05] WARN  Latency spike detected",
          "[10:00:08] ERROR Connection timeout at 192.168.1.1",
          "[10:00:09] CRIT  Kernel panic avoided",
        ];

  const getSeverityColor = (log: string) => {
    if (log.includes("CRIT")) return "text-red-400";
    if (log.includes("ERROR")) return "text-red-500";
    if (log.includes("WARN")) return "text-yellow-400";
    if (log.includes("INFO")) return "text-zinc-400";

    return "text-zinc-300";
  };

  const isHighlighted = (log: string) => {
    if (!highlight) return false;
    return log.toLowerCase().includes(highlight.toLowerCase());
  };

  return (
    <div className="w-full font-mono text-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />

          <span className="ml-3 text-zinc-500 text-xs tracking-wide">
            /var/log/syslog
          </span>
        </div>

        <span className="text-xs text-zinc-600">
          LIVE
        </span>

      </div>

      {/* Logs */}
      <div className="h-64 overflow-y-auto pr-2 space-y-1">

        {displayLogs.map((log, index) => {

          const severityColor = getSeverityColor(log);
          const highlighted = isHighlighted(log);

          return (
            <div
              key={index}
              className={`
                flex items-start
                ${severityColor}
                ${highlighted ? "bg-yellow-500/10 border-l-2 border-yellow-400 pl-2 rounded-sm" : ""}
              `}
            >
              <span className="opacity-40 mr-2">$</span>

              <span className="leading-relaxed">
                {log}
              </span>
            </div>
          );
        })}

        {/* Cursor */}
        <div className="text-green-500 animate-pulse">▊</div>

      </div>
    </div>
  );
};

export default LogTerminal;
