import { z } from "zod";

export const SystemHealthGraphSchema = z.object({
  cpuData: z.array(z.number()),
  memoryData: z.array(z.number()),
  status: z.enum(["normal", "warning", "critical"]),
});

export const LogTerminalSchema = z.object({
  logs: z.array(z.string()),
  highlight: z.string().optional(),
});

export const ActionPanelSchema = z.object({
  actions: z.array(z.enum(["restart", "rollback", "deploy"])),
  requiresConfirmation: z.boolean(),
});

export const IncidentModeBannerSchema = z.object({
  mode: z.enum(["incident", "investigating", "stable"]),
});

export const ComponentSchemas = {
  SystemHealthGraph: SystemHealthGraphSchema,
  LogTerminal: LogTerminalSchema,
  ActionPanel: ActionPanelSchema,
  IncidentModeBanner: IncidentModeBannerSchema,
};
