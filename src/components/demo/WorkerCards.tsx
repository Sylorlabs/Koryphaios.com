"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Square } from "lucide-react";
import { S2, S3, BORDER, TEXT, TEXT2, MUTED, SUCCESS, Worker } from "./types";
import { AnimatedStatusIcon } from "./AnimatedStatusIcon";

interface WorkerCardProps {
  worker: Worker;
  phase: number;
  index: number;
  onClick?: () => void;
}

export const WorkerCard = ({ worker, phase, index, onClick }: WorkerCardProps) => {
  const ws = phase >= 7 ? "done" : phase >= 3 ? "active" : "idle";
  const agentStatus = phase >= 7 ? "done" : phase >= 4 ? "tool_calling" : phase >= 3 ? "thinking" : "idle";
  const isActive = ws === "active";
  
  const tokens = useMemo(() => {
    if (phase >= 5) {
      return worker.id === "frontend" ? 34200 : worker.id === "backend" ? 28700 : 22100;
    }
    if (phase >= 3) {
      return worker.id === "frontend" ? 8100 : worker.id === "backend" ? 5300 : 4200;
    }
    return 0;
  }, [phase, worker.id]);
  
  const contextPct = useMemo(() => 
    worker.ctxMax > 0 ? Math.min((tokens / worker.ctxMax) * 100, 100) : 0,
    [tokens, worker.ctxMax]
  );
  
  const ctxColor = contextPct > 80 ? "#ef4444" : contextPct > 50 ? "#f59e0b" : "#22c55e";
  
  const statusText = useMemo(() => {
    if (phase >= 7) return "Complete";
    if (phase >= 4) {
      return worker.id === "frontend" ? "Tool: write_file" : 
             worker.id === "backend" ? "Generating..." : "Tool: write_file";
    }
    if (phase >= 3) return "Thinking...";
    return "Idle";
  }, [phase, worker.id]);
  
  const tool = phase >= 4 && phase < 7 ? "write_file" : null;

  return (
    <motion.button
      onClick={onClick}
      className="rounded-lg transition-all duration-500 text-left"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: isActive ? 1 : 0.6 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: S2, border: `1px solid ${BORDER}`,
        padding: isActive ? "8px 12px" : "6px 10px",
        minWidth: 180, maxWidth: 240,
        boxShadow: isActive ? `0 0 12px ${worker.color}40` : "none",
        filter: ws === "done" ? "none" : isActive ? "none" : "grayscale(0.5)",
      }}
    >
      <div className="flex items-start justify-between" style={{ marginBottom: isActive ? 6 : 0 }}>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center pt-0.5">
            <AnimatedStatusIcon status={agentStatus} size={isActive ? 16 : 14} />
          </div>
          <span className="text-xs font-medium" style={{ color: TEXT, opacity: isActive ? 1 : 0.7 }}>{worker.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {isActive ? (
            <>
              <span className="text-[10px] capitalize px-1.5 py-0.5 rounded" style={{ background: S3, color: MUTED }}>{worker.domain}</span>
              <div className="p-0.5 rounded" style={{ color: MUTED }}><Square size={10} /></div>
            </>
          ) : (
            <span style={{ fontSize: 9, color: MUTED, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ws}</span>
          )}
        </div>
      </div>
      
      {isActive && (
        <>
          <div className="flex items-center justify-between mb-1.5">
            <span style={{ fontSize: 11, color: agentStatus === "done" ? SUCCESS : TEXT2 }}>{statusText}</span>
            <span style={{ fontSize: 10, color: MUTED }}>({worker.provider}) {worker.model}</span>
          </div>
          
          {tokens > 0 && (
            <div className="mb-1">
              <div className="flex items-center justify-between mb-0.5">
                <span style={{ fontSize: 9, color: MUTED }}>Context</span>
                <span style={{ fontSize: 9, color: MUTED }}>{Math.round(tokens / 1000)}k / {Math.round(worker.ctxMax / 1000)}k</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: S3 }}>
                <motion.div className="h-full rounded-full" style={{ background: ctxColor }} initial={{ width: 0 }} animate={{ width: `${contextPct}%` }} transition={{ duration: 1.5 }} />
              </div>
            </div>
          )}
          
          {tool && (
            <div className="flex flex-wrap gap-1 mt-1">
              <span style={{ fontSize: 10, padding: "1px 4px", borderRadius: 4, background: S3, color: "#6366f1" }}>{tool}</span>
            </div>
          )}
        </>
      )}
    </motion.button>
  );
};

interface MobileWorkerCardProps {
  worker: Worker;
  phase: number;
  index: number;
  onClick?: () => void;
}

export const MobileWorkerCard = ({ worker, phase, index, onClick }: MobileWorkerCardProps) => {
  const ws = phase >= 7 ? "done" : phase >= 3 ? "active" : "idle";
  const agentStatus = phase >= 7 ? "done" : phase >= 4 ? "tool_calling" : phase >= 3 ? "thinking" : "idle";
  const isActive = ws === "active";
  
  const tokens = useMemo(() => {
    if (phase >= 5) {
      return worker.id === "frontend" ? 34200 : worker.id === "backend" ? 28700 : 22100;
    }
    if (phase >= 3) {
      return worker.id === "frontend" ? 8100 : worker.id === "backend" ? 5300 : 4200;
    }
    return 0;
  }, [phase, worker.id]);
  
  const contextPct = useMemo(() => 
    worker.ctxMax > 0 ? Math.min((tokens / worker.ctxMax) * 100, 100) : 0,
    [tokens, worker.ctxMax]
  );
  
  const ctxColor = contextPct > 80 ? "#ef4444" : contextPct > 50 ? "#f59e0b" : "#22c55e";
  
  const statusText = useMemo(() => {
    if (phase >= 7) return "Complete";
    if (phase >= 4) {
      return worker.id === "frontend" ? "Tool: write_file" : 
             worker.id === "backend" ? "Generating..." : "Tool: write_file";
    }
    if (phase >= 3) return "Thinking...";
    return "Idle";
  }, [phase, worker.id]);

  return (
    <motion.button
      onClick={onClick}
      className="rounded-lg shrink-0 text-left"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: isActive ? 1 : 0.6 }}
      transition={{ delay: index * 0.1 }}
      style={{
        background: S2, border: `1px solid ${BORDER}`,
        padding: "6px 10px",
        minWidth: 140,
        boxShadow: isActive ? `0 0 8px ${worker.color}40` : "none",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <AnimatedStatusIcon status={agentStatus} size={12} />
          <span className="text-[11px] font-medium" style={{ color: TEXT }}>{worker.name}</span>
        </div>
        {isActive && <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: S3, color: MUTED }}>{worker.domain}</span>}
      </div>
      
      {isActive && (
        <>
          <div className="flex items-center justify-between mt-1">
            <span style={{ fontSize: 9, color: agentStatus === "done" ? SUCCESS : TEXT2 }}>{statusText}</span>
          </div>
          {tokens > 0 && (
            <div className="mt-1">
              <div className="h-1 rounded-full overflow-hidden" style={{ background: S3 }}>
                <motion.div className="h-full rounded-full" style={{ background: ctxColor }} initial={{ width: 0 }} animate={{ width: `${contextPct}%` }} transition={{ duration: 1.5 }} />
              </div>
            </div>
          )}
        </>
      )}
    </motion.button>
  );
};
