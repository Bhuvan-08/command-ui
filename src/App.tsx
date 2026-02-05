import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Command } from 'lucide-react';
import { routeIntent } from './tambo/intentRouter';
import { ComponentRegistry } from './tambo/registry';

type ActionType = "restart" | "rollback" | "deploy";

interface RenderedComponent {
  id: string;
  type: keyof typeof ComponentRegistry;
  props: any;
}

function App() {

  const [input, setInput] = useState("");
  const [components, setComponents] = useState<RenderedComponent[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [incidentActive, setIncidentActive] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const prompt = input;
    setInput("");
    setIsThinking(true);

    setTimeout(() => {

      const detectedComponents = routeIntent(prompt, incidentActive);

      if (detectedComponents.length > 0) {
        const newItems = detectedComponents.map((comp) => ({
          id: crypto.randomUUID(),
          type: comp.type as keyof typeof ComponentRegistry,
          props: comp.props,
        }));

        newItems.forEach((item, index) => {
          setTimeout(() => {
            setComponents(prev => [...prev, item]);
          }, index * 450); // spacing between tool deployment
        });

      }

      // Detect incident trigger
      const lower = prompt.toLowerCase();

      if (
        lower.includes("crash") ||
        lower.includes("down") ||
        lower.includes("slow") ||
        lower.includes("error")
      ) {
        setIncidentActive(true);
      }
      // Detect resolution
      if (
        lower.includes("resolved") ||
        lower.includes("fixed") ||
        lower.includes("stable") ||
        lower.includes("all good")
      ) {
        setIncidentActive(false);

        // Optional — show system recovery message
        setComponents(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "SystemMessage",
            props: {
              message: "✔ Incident resolved. System returning to stable state.",
              variant: "success",
            },
          }
        ]);
      }

      setIsThinking(false);

    }, 650);

  };

  // 🔥 Action execution handler
  const handleAction = (action: ActionType) => {

    const messages: Record<ActionType, string> = {
      restart: "Restarting critical service...",
      rollback: "Rolling back to last stable release...",
      deploy: "Deploying emergency patch...",
    };

    const success: Record<ActionType, string> = {
      restart: "✔ Service restarted successfully.",
      rollback: "✔ Rollback completed successfully.",
      deploy: "✔ Patch deployed successfully.",
    };

    // Show execution start
    setComponents(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "SystemMessage",
        props: {
          message: messages[action],
          variant: "warning",
        },
      }
    ]);

    // Simulate completion
    setTimeout(() => {
      setComponents(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "SystemMessage",
          props: {
            message: success[action],
            variant: "success",
          },
        }
      ]);
    }, 1500);
  };

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [components, isThinking]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-black">

      {/* HEADER */}
      <div className="w-full max-w-5xl flex justify-between items-center p-6 border-b border-zinc-900 fixed top-0 z-40 bg-black/70 backdrop-blur">

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />

          <h1 className="text-xl font-bold tracking-[0.2em] text-zinc-100">
            COMMAND_UI
          </h1>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          {incidentActive ? "INCIDENT_ACTIVE" : "SYSTEM_READY"}
        </div>

      </div>


      {/* MAIN AREA */}
      <div className="w-full max-w-4xl flex-1 pt-32 pb-40 px-6 flex flex-col gap-6">

        <AnimatePresence>

          {/* EMPTY STATE */}
          {components.length === 0 && !isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-600 mt-20"
            >
              <Terminal className="w-16 h-16 mx-auto mb-4 opacity-20" />

              <p className="text-sm tracking-widest">
                SYSTEM READY — DESCRIBE INCIDENT
              </p>
            </motion.div>
          )}

          {/* THINKING */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-card text-sm font-mono text-zinc-400"
            >
              Analyzing operational context...
            </motion.div>
          )}

          {/* GENERATED COMPONENTS */}
          {components.map((item) => {

            const RegistryItem = ComponentRegistry[item.type];
            if (!RegistryItem) return null;

            const Component = RegistryItem.component;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="terminal-card shadow-lg"
              >
                <Component
                  {...item.props}
                  onAction={handleAction} // SAFE — ignored by components that don't use it
                />
              </motion.div>
            );
          })}

        </AnimatePresence>

        <div ref={bottomRef} />

      </div>


      {/* COMMAND BAR */}
      <div className="fixed bottom-10 w-full max-w-2xl px-6 z-50">

        <form onSubmit={handleSubmit} className="relative">

          <div className="flex items-center bg-black border border-zinc-800 rounded-full px-6 py-4 shadow-2xl focus-within:border-green-500/50 transition-all">

            <Command className="w-5 h-5 text-zinc-500 mr-4" />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your intent..."
              className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-sm"
              autoFocus
            />

            <button
              type="submit"
              className="ml-3 p-2 bg-zinc-900 rounded-full hover:bg-green-500 hover:text-black transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>
        </form>

      </div>

    </div>
  );
}

export default App;
