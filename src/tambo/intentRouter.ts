import mockData from "../data/mockServerState.json";

export function routeIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // PERFORMANCE ISSUES
  if (lower.includes("slow") || lower.includes("cpu")) {
    return [
      {
        type: "IncidentModeBanner",
        props: { mode: "incident" },
      },
      {
        type: "SystemHealthGraph",
        props: {
          cpuData: mockData.cpu,
          memoryData: mockData.memory,
          status: "critical",
        },
      },
    ];
  }

  // LOGS
  if (lower.includes("log") || lower.includes("error")) {
    return [
      {
        type: "LogTerminal",
        props: {
          logs: mockData.logs,
          highlight: "ERROR",
        },
      },
    ];
  }

  // ACTIONS
  if (
    lower.includes("rollback") ||
    lower.includes("restart") ||
    lower.includes("fix")
  ) {
    return [
      {
        type: "ActionPanel",
        props: {
          actions: ["rollback", "restart"],
          requiresConfirmation: true,
        },
      },
    ];
  }

  // DEFAULT
  return [];
}