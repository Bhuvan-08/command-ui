import React from 'react';

interface LogTerminalProps {
  logs: string[];
  highlight?: string;
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ 
  logs = [], 
  highlight 
}) => {
  // Default logs if empty
  const displayLogs = logs.length > 0 ? logs : [
    "[10:00:01] INFO  System init...",
    "[10:00:02] INFO  Services loaded",
    "[10:00:05] WARN  Latency spike detected",
    "[10:00:08] ERROR Connection timeout at 192.168.1.1",
    "[10:00:09] CRIT  Kernel panic avoided"
  ];

  return (
    <div className="w-full bg-black border border-zinc-800 rounded-md p-4 font-mono text-sm h-64 overflow-y-auto">
       <div className="flex border-b border-zinc-800 pb-2 mb-2 sticky top-0 bg-black">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-zinc-500 text-xs">/var/log/syslog</span>
       </div>
       
       <div className="flex flex-col gap-1 text-zinc-300">
          {displayLogs.map((log, index) => {
            const isError = log.includes("ERROR") || log.includes("CRIT");
            const isHighlighted = highlight && log.toLowerCase().includes(highlight.toLowerCase());
            
            return (
              <div 
                key={index} 
                className={`
                  ${isError ? "text-red-500" : "text-zinc-400"}
                  ${isHighlighted ? "bg-yellow-900/30 border-l-2 border-yellow-500 pl-2" : ""}
                `}
              >
                <span className="opacity-50 mr-2">$</span>{log}
              </div>
            );
          })}
          <div className="animate-pulse">_</div>
       </div>
    </div>
  );
};