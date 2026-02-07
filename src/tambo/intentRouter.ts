import mockData from "../data/mockServerState.json";

export function routeIntent(prompt: string, incidentActive: boolean) {

  const lower = prompt.toLowerCase();

  /*
  =============================
  RESOLUTION (TOP PRIORITY)
  =============================
  */

  const resolving =
    lower.includes("stable") ||
    lower.includes("resolved") ||
    lower.includes("fixed") ||
    lower.includes("recovered");

  if (resolving) {
    return [
      {
        type: "IncidentModeBanner",
        props: { mode: "stable" },
      },
      {
        type: "SystemHealthGraph",
        props: {
          cpuData: mockData.cpu.map(() => 20),
          memoryData: mockData.memory.map(() => 25),
          status: "normal",
        },
      },
    ];
  }

  /*
  =============================
  ACTIONS (SECOND PRIORITY)
  =============================
  */

  const wantsAction =
    lower.includes("rollback") ||
    lower.includes("restart") ||
    lower.includes("deploy");

  if (wantsAction) {
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

  /*
  =============================
  LOGS (THIRD PRIORITY)
  =============================
  */

  const wantsLogs =
    lower.includes("log") ||
    lower.includes("logs");

  if (wantsLogs) {
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

  /*
  =============================
  INCIDENT DETECTION (LAST)
  =============================
  */

  const isIncident =
    lower.includes("slow") ||
    lower.includes("latency") ||
    lower.includes("spike") ||
    lower.includes("error") ||
    lower.includes("cpu") ||
    lower.includes("down") ||
    lower.includes("performance") ||
    lower.includes("issue");

  if (isIncident || incidentActive) {
    return [
      {
        type: "IncidentModeBanner",
        props: { mode: "incident" },
      },
      {
        type: "IncidentSummary",
        props: {
          cause: "Database connection saturation",
          impact: "Elevated API latency detected across services",
          recommendation: "Rollback latest deployment",
        },
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

  /*
  =============================
  FALLBACK
  =============================
  */

  return [
    {
      type: "SystemMessage",
      props: {
        message:
          "Command not recognized. Try checking system performance or logs.",
        variant: "warning",
      },
    },
  ];
}
