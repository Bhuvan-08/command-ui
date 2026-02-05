import mockData from "../data/mockServerState.json";

export function routeIntent(prompt: string, incidentActive: boolean) {
  const lower = prompt.toLowerCase();

  const blocks = [];

  const isIncident =
    lower.includes("slow") ||
    lower.includes("crash") ||
    lower.includes("error") ||
    lower.includes("cpu") ||
    lower.includes("down");

  const wantsLogs =
    lower.includes("log") ||
    lower.includes("error") ||
    lower.includes("why");

  const wantsAction =
    lower.includes("rollback") ||
    lower.includes("restart") ||
    lower.includes("fix");

  /*
    INCIDENT DETECTED
  */
  if (isIncident || (incidentActive && !lower.includes("stable"))) {
    blocks.push({
      type: "IncidentModeBanner",
      props: { mode: "incident" },
    });

    blocks.push({
      type: "SystemHealthGraph",
      props: {
        cpuData: mockData.cpu,
        memoryData: mockData.memory,
        status: incidentActive ? "critical" : "normal",
      },
    });

  }

  /*
    LOG REQUEST
  */
  if (wantsLogs) {
    blocks.push({
      type: "LogTerminal",
      props: {
        logs: mockData.logs,
        highlight: "ERROR",
      },
    });
  }

  /*
    ACTION REQUEST
  */
  if (wantsAction) {
    blocks.push({
      type: "ActionPanel",
      props: {
        actions: ["rollback", "restart"],
        requiresConfirmation: true,
      },
    });
  }

  return blocks;
}
