import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Command } from 'lucide-react';
import { routeIntent } from './tambo/intentRouter';
import { ComponentRegistry } from './tambo/registry';

// Define the shape of a rendered component
interface RenderedComponent {
  id: string;
  type: keyof typeof ComponentRegistry;
  props: any;
}

function App() {
  const [input, setInput] = useState("");
  const [components, setComponents] = useState<RenderedComponent[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Get the intent from our router
    const detectedComponents = routeIntent(input);

    if (detectedComponents.length > 0) {
      // 2. Add new components to the list with unique IDs
      const newItems = detectedComponents.map((comp) => ({
        id: Date.now() + Math.random().toString(), // Unique key
        type: comp.type as keyof typeof ComponentRegistry,
        props: comp.props,
      }));
      setComponents((prev) => [...prev, ...newItems]);
    }

    setInput("");
  };

  // Auto-scroll to bottom when new components appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [components]);

  return (
    <div className="min-h-screen w-full relative scanline flex flex-col items-center">
      
      {/* Header / Status Bar */}
      <div className="w-full max-w-5xl flex justify-between items-center p-6 border-b border-zinc-900/50 backdrop-blur-sm fixed top-0 z-40">
        <div className="flex items-center gap-3">
           <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
           <h1 className="text-xl font-bold tracking-[0.2em] text-zinc-100">COMMAND_UI</h1>
        </div>
        <div className="text-xs text-zinc-500 font-mono">v1.0.4 // SYSTEM_READY</div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-4xl flex-1 pt-32 pb-40 px-6 flex flex-col gap-8">
        <AnimatePresence>
          {components.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center text-zinc-600 mt-20"
            >
              <Terminal className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-sm tracking-widest">AWAITING INPUT...</p>
            </motion.div>
          )}

          {components.map((item) => {
            const RegistryItem = ComponentRegistry[item.type];
            if (!RegistryItem) return null;
            const Component = RegistryItem.component;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {/* Render the actual component */}
                <Component {...item.props} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Floating Input Bar */}
      <div className="fixed bottom-10 w-full max-w-2xl px-6 z-50">
        <form 
          onSubmit={handleSubmit}
          className="relative group"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-zinc-800 rounded-full px-6 py-4 shadow-2xl focus-within:border-green-500/50 transition-all">
            <Command className="w-5 h-5 text-zinc-500 mr-4" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your intent..."
              className="flex-1 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-600 font-mono text-sm"
              autoFocus
            />
            <button type="submit" className="p-2 bg-zinc-900 rounded-full hover:bg-green-500 hover:text-black transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;