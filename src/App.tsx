import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
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

  // ✅ Boot sequence (StrictMode safe)
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
      }, index * 650);
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

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [components, isThinking]);

  return (
    <div className="h-dvh w-full flex flex-col bg-black">

      {/* 🔥 PROFESSIONAL HEADER */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-900 bg-black shrink-0">

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-[0.25em] text-zinc-100">
            COMMAND_UI
          </h1>

          <span className="text-xs text-zinc-600 font-mono tracking-wider mt-1">
            {incidentActive ? "INCIDENT ACTIVE" : "SYSTEM READY"}
          </span>
        </div>

      </div>


      {/* SCROLLABLE INCIDENT CANVAS */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-3">

        <AnimatePresence>

          {components.length === 0 && !isThinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-600 mt-24"
            >
              <Terminal className="w-14 h-14 mx-auto mb-4 opacity-20" />

              <p className="text-sm tracking-widest">
                SYSTEM READY — ENTER COMMAND
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


      {/* 🔥 ENTERPRISE COMMAND SURFACE */}
      <div className="border-t border-zinc-900 bg-[#050505] shrink-0">

        <div className="max-w-4xl mx-auto px-6 py-5">

          <form onSubmit={handleSubmit}>

            <div
              className="
              flex items-center
              bg-[#0b0b0b]
              border border-zinc-800
              rounded-2xl
              px-6
              py-5
              shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]
              focus-within:border-green-500/40
              transition-all
              "
            >

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter operational command..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-zinc-200
                  placeholder:text-zinc-600
                  font-mono
                  text-base
                  tracking-wide
                "
                autoFocus
              />

              <button
                type="submit"
                className="
                ml-6
                px-5
                py-2.5
                text-sm
                font-semibold
                tracking-wide
                text-zinc-200
                bg-zinc-900
                hover:bg-green-500
                hover:text-black
                rounded-lg
                transition-all
                "
              >
                EXECUTE
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default App;
