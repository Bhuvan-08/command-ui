import React from 'react';
import { RotateCcw, Rocket, ShieldAlert } from 'lucide-react';

interface ActionPanelProps {
  actions: ("restart" | "rollback" | "deploy")[];
  requiresConfirmation: boolean;
  onAction?: (action: string) => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  actions = ["restart"],
  requiresConfirmation,
  onAction,
}) => {

  const buttonBase =
    "px-5 py-2 border rounded-md text-xs font-semibold tracking-wide flex items-center gap-2 transition-all";

  return (
    <div className="w-full">

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-2 text-yellow-400">
          <ShieldAlert className="w-5 h-5" />

          <h3 className="font-semibold tracking-wide text-zinc-200">
            EXECUTION PANEL
          </h3>
        </div>

        {requiresConfirmation && (
          <span className="text-xs text-yellow-500 font-mono">
            AUTHORIZATION REQUIRED
          </span>
        )}

      </div>

      <div className="flex gap-3 flex-wrap">

        {actions.includes("restart") && (
          <button
            onClick={() => onAction?.("restart")}
            className={`${buttonBase} border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400`}
          >
            <RotateCcw className="w-4 h-4" />
            Restart Service
          </button>
        )}

        {actions.includes("rollback") && (
          <button
            onClick={() => onAction?.("rollback")}
            className={`${buttonBase} border-red-500/60 text-red-400 hover:bg-red-500 hover:text-black`}
          >
            <ShieldAlert className="w-4 h-4" />
            Rollback Release
          </button>
        )}

        {actions.includes("deploy") && (
          <button
            onClick={() => onAction?.("deploy")}
            className={`${buttonBase} border-green-500/60 text-green-400 hover:bg-green-500 hover:text-black`}
          >
            <Rocket className="w-4 h-4" />
            Deploy Patch
          </button>
        )}

      </div>

    </div>
  );
};

export default ActionPanel;