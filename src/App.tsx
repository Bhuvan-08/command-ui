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
  const booted = useRef(false);

  // ✅ Boot sequence
  useEffect(() => {

    if (booted.current) return;
    booted.current = true;

    const bootMessages = [
      "Initializing command interface...",
      "Connecting to observability cluster...",
      "All systems operational.",
    ];

    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setComponents(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "SystemMessage",
            props: { message: msg, variant: "info" },
          },
        ]);
      }, index * 600);
    });

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const prompt = input;
    setInput("");

    // COMMAND HISTORY
    setComponents(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "CommandBubble",
        props: { command: prompt },
      }
    ]);

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
          }, index * 450);
        });
      }

      const lower = prompt.toLowerCase();

      if (
        lower.includes("crash") ||
        lower.includes("down") ||
        lower.includes("slow") ||
        lower.includes("error")
      ) {
        setIncidentActive(true);
      }

      if (
        lower.includes("resolved") ||
        lower.includes("fixed") ||
        lower.includes("stable") ||
        lower.includes("all good")
      ) {

        setIncidentActive(false);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [components, isThinking]);

  return (
    <div className="h-dvh w-full flex flex-col bg-black overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-black/80 backdrop-blur shrink-0">

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


      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-3">

        <AnimatePresence>

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

          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="terminal-card text-sm font-mono text-zinc-400"
            >
              Analyzing operational context...
            </motion.div>
          )}

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
                className={`${item.type === "CommandBubble" ? "mt-6" : ""}`}
              >
                <Component
                  {...item.props}
                  onAction={handleAction}
                />
              </motion.div>
            );
          })}

        </AnimatePresence>

        <div ref={bottomRef} />

      </div>


      {/* ✅ COMMAND BAR — NOW STRUCTURALLY LOCKED */}
      <div className="border-t border-zinc-900 bg-black p-4 shrink-0">

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

          <div className="flex items-center bg-black border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-green-500/50 transition-all">

            <Command className="w-5 h-5 text-zinc-500 mr-3" />

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
              className="ml-3 p-2 bg-zinc-900 rounded-md hover:bg-green-500 hover:text-black transition-colors"
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
