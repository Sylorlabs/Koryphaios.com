"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Send, Terminal } from "lucide-react";
import { S0, S1, S2, BORDER, TEXT, TEXT2, MUTED, ACCENT, SUCCESS, WARNING, WORKERS, WORKER_CHATS, MANAGER_CHAT } from "./types";
import { AnimatedStatusIcon } from "./AnimatedStatusIcon";

interface WorkerChatViewProps {
  workerId: string | null;
  onBack: () => void;
}

export const WorkerChatView = ({ workerId, onBack }: WorkerChatViewProps) => {
  const worker = workerId === "manager" ? null : WORKERS.find(w => w.id === workerId) || null;
  const messages = worker ? WORKER_CHATS[worker.id] || [] : MANAGER_CHAT;
  const title = worker ? `worker:${worker.name}` : "manager";
  const color = worker?.color || WARNING;

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col"
      style={{ background: S0 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0" style={{ borderColor: BORDER, background: S1 }}>
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-white/5" style={{ color: MUTED }}>
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <AnimatedStatusIcon status="done" size={14} />
          <span className="font-semibold text-sm" style={{ color }}>{title}</span>
          {worker && (
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: S2, color: MUTED }}>{worker.domain}</span>
          )}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[10px]" style={{ color: MUTED }}>
          <span>{worker?.model || "orchestrator"}</span>
          <span>•</span>
          <span>{worker?.provider || "system"}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={`${msg.timestamp}-${msg.role}-${i}`}
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.5) }}
          >
            <div className="w-16 shrink-0 text-[10px] tabular-nums pt-1" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>
              {msg.timestamp}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {msg.role === "user" && <Send size={12} color={ACCENT} />}
                {msg.role === "manager" && <AnimatedStatusIcon status={msg.status || "done"} size={12} isManager />}
                {msg.role === "worker" && <AnimatedStatusIcon status="done" size={12} />}
                {msg.role === "critic" && <AnimatedStatusIcon status={msg.status || "done"} size={12} />}
                {msg.role === "shadow" && <AnimatedStatusIcon status="done" size={12} />}
                {msg.role === "tool" && <Terminal size={12} style={{ color: SUCCESS }} />}
                <span className="text-[10px] font-semibold tracking-wide" style={{ 
                  color: msg.role === "user" ? ACCENT : 
                         msg.role === "manager" ? WARNING :
                         msg.role === "critic" ? WARNING :
                         msg.role === "shadow" ? "#8b5cf6" :
                         msg.role === "tool" ? SUCCESS :
                         color
                }}>
                  {msg.role === "user" ? "you" : msg.role === "tool" ? "tool" : title}
                </span>
                {msg.status && msg.role !== "user" && (
                  <span className="text-[9px] px-1 py-0.5 rounded" style={{ 
                    color: msg.status === "done" ? SUCCESS : WARNING, 
                    background: `${msg.status === "done" ? SUCCESS : WARNING}12` 
                  }}>
                    {msg.status}
                  </span>
                )}
              </div>
              <div 
                className="text-sm whitespace-pre-wrap leading-relaxed"
                style={{ color: msg.role === "user" ? TEXT : TEXT2 }}
              >
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t shrink-0" style={{ borderColor: BORDER, background: S1 }}>
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg flex items-center px-4" style={{ background: S2, border: `1px solid ${BORDER}`, height: 44, color: MUTED }}>
            Message {title}...
          </div>
          <button className="px-4 rounded-lg flex items-center justify-center" style={{ background: ACCENT, color: "white" }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
