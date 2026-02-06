import SystemHealthGraph from "../components/SystemHealthGraph";
import LogTerminal from "../components/LogTerminal";
import ActionPanel from "../components/ActionPanel";
import IncidentModeBanner from "../components/IncidentModeBanner";
import SystemMessage from "../components/SystemMessage";
import IncidentSummary from "../components/IncidentSummary";
import { ComponentSchemas } from "./schemas";
import CommandBubble from "../components/CommandBubble";

export const ComponentRegistry = {
  SystemHealthGraph: {
    component: SystemHealthGraph,
    schema: ComponentSchemas.SystemHealthGraph,
  },
  LogTerminal: {
    component: LogTerminal,
    schema: ComponentSchemas.LogTerminal,
  },
  ActionPanel: {
    component: ActionPanel,
    schema: ComponentSchemas.ActionPanel,
  },
  IncidentModeBanner: {
    component: IncidentModeBanner,
    schema: ComponentSchemas.IncidentModeBanner,
  },
  SystemMessage: {
    component: SystemMessage,
    schema: null,
  },
  IncidentSummary: {
    component: IncidentSummary,
    schema: null,
  },
  CommandBubble: {
    component: CommandBubble,
    schema: null,
  },

};
