"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Send, GitCommit, RefreshCw, Paintbrush, Terminal, Beaker, MessageSquare, Key, Settings, Command } from "lucide-react";
import { S1, S3, BORDER, TEXT, TEXT2, MUTED, ACCENT, COMMANDS } from "./types";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Plus, Send, GitCommit, RefreshCw, Paintbrush, Terminal, Beaker, MessageSquare, Key, Settings, Command
};

interface CommandsPaletteProps {
  onClose: () => void;
  onSelectWorker: (workerId: string) => void;
  onOpenSettings: () => void;
}

export const CommandsPalette = ({ onClose, onSelectWorker, onOpenSettings }: CommandsPaletteProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allCommands = useMemo(() => 
    COMMANDS.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category }))),
    []
  );
  
  const filteredCommands = useMemo(() => 
    allCommands.filter(cmd => cmd.name.toLowerCase().includes(search.toLowerCase())),
    [allCommands, search]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
      if (e.key === "ArrowUp") setSelectedIndex(i => Math.max(i - 1, 0));
      if (e.key === "Enter") {
        const cmd = filteredCommands[selectedIndex];
        if (cmd) handleSelect(cmd);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onClose]);

  const handleSelect = useCallback((cmd: typeof allCommands[0]) => {
    if (cmd.name.includes("Frontend")) onSelectWorker("frontend");
    else if (cmd.name.includes("Backend")) onSelectWorker("backend");
    else if (cmd.name.includes("Testing")) onSelectWorker("testing");
    else if (cmd.name.includes("Manager")) onSelectWorker("manager");
    else if (cmd.name.includes("Provider") || cmd.name.includes("Preferences")) {
      onClose();
      onOpenSettings();
    }
    else onClose();
  }, [onClose, onSelectWorker, onOpenSettings]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-start justify-center pt-20"
      style={{ background: "rgba(0,0,0,0.5)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ background: S1, border: `1px solid ${BORDER}` }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: BORDER }}>
          <Search size={18} style={{ color: MUTED }} />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: TEXT }}
            autoFocus
          />
          <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: S3, color: MUTED }}>ESC</kbd>
        </div>

        {/* Commands */}
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center" style={{ color: MUTED }}>
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No commands found</p>
              <p className="text-xs mt-1 opacity-60">Try a different search term</p>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              const Icon = iconMap[cmd.icon] || Search;
              const prevCmd = index > 0 ? filteredCommands[index - 1] : null;
              const showCategory = !prevCmd || prevCmd.category !== cmd.category;
              
              return (
                <div key={`${cmd.category}-${cmd.name}`}>
                  {showCategory && (
                    <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider font-medium" style={{ color: MUTED }}>
                      {cmd.category}
                    </div>
                  )}
                  <button
                    onClick={() => handleSelect(cmd)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{ background: isSelected ? `${ACCENT}20` : "transparent" }}
                  >
                    <Icon size={16} style={{ color: isSelected ? ACCENT : MUTED }} />
                    <span className="text-sm flex-1" style={{ color: isSelected ? TEXT : TEXT2 }}>{cmd.name}</span>
                    {cmd.shortcut && (
                      <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: S3, color: MUTED }}>{cmd.shortcut}</kbd>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t text-[10px]" style={{ borderColor: BORDER, color: MUTED }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: S3 }}>↑</kbd> <kbd className="px-1 rounded" style={{ background: S3 }}>↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1 rounded" style={{ background: S3 }}>↵</kbd> select</span>
          </div>
          <span>{filteredCommands.length} commands</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
