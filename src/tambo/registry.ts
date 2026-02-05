import SystemHealthGraph from "../components/SystemHealthGraph";
import LogTerminal from "../components/LogTerminal";
import ActionPanel from "../components/ActionPanel";
import IncidentModeBanner from "../components/IncidentModeBanner";
import SystemMessage from "../components/SystemMessage";

import { ComponentSchemas } from "./schemas";

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
  schema: null, // safe for hackathon — no props validation needed
  },

};
