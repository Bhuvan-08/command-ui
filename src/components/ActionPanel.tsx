import React from 'react';
import { ShieldAlert, RotateCcw, Rocket } from 'lucide-react';

interface ActionPanelProps {
  actions: ("restart" | "rollback" | "deploy")[];
  requiresConfirmation: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ 
  actions = ["restart"], 
  requiresConfirmation 
}) => {
  return (
    <div className="p-6 border border-red-900/50 bg-red-950/10 rounded-lg flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center gap-2 text-red-500 mb-2">
        <ShieldAlert className="w-6 h-6" />
        <h3 className="font-bold tracking-wider">ADMIN_OVERRIDE_REQUIRED</h3>
      </div>
      
      <div className="flex gap-4">
        {actions.includes("restart") && (
          <button className="px-6 py-2 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-red-500 transition-all uppercase text-xs font-bold tracking-widest flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        )}
        
        {actions.includes("rollback") && (
          <button className="px-6 py-2 bg-red-900/20 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all uppercase text-xs font-bold tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Rollback
          </button>
        )}

        {actions.includes("deploy") && (
           <button className="px-6 py-2 bg-green-900/20 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all uppercase text-xs font-bold tracking-widest flex items-center gap-2">
           <Rocket className="w-4 h-4" /> Deploy
         </button>
        )}
      </div>

      {requiresConfirmation && (
        <p className="text-xs text-red-400 mt-2 animate-pulse">
          ⚠️ AUTHORIZATION REQUIRED FOR EXECUTION
        </p>
      )}
    </div>
  );
};