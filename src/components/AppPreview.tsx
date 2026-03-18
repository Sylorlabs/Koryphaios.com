"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AppPreview.module.css";

// NOTE: This is a simulated demo for illustrative purposes
import {
  Settings, Activity, ChevronDown, GitBranch, Zap, Search,
  MessageSquare, ArrowDown, Paintbrush, Bug, Beaker,
  Send, Plus, Minus, Check, GitCommit,
  ArrowUp, RefreshCw, Sparkles, Square
} from "lucide-react";

// Demo components
import {
  S0, S1, S2, S3, BORDER, TEXT, TEXT2, MUTED, ACCENT, SUCCESS, WARNING,
  WORKERS, SESSIONS, STAGED, PROMPT, MOBILE_SUGGESTIONS,
  useIsMobile, useTypingEffect,
  AnimatedStatusIcon, SettingsPanel, CommandsPalette, WorkerChatView,
  WorkerCard, MobileWorkerCard,
  statusLetter, statusColor,
} from "./demo";

// Suggestions with icons (defined here to avoid import issues)
const SUGGESTIONS = [
  { label: "Build a new UI component", Icon: Paintbrush, prompt: "Build a beautiful, responsive landing page using Tailwind and Svelte." },
  { label: "Debug an issue", Icon: Bug, prompt: "Help me find and fix a bug in my authentication logic." },
  { label: "Refactor for performance", Icon: Zap, prompt: "Analyze my code and suggest performance optimizations." },
  { label: "Write unit tests", Icon: Beaker, prompt: "Generate comprehensive unit tests for my backend API routes." },
] as const;

export default function AppPreview() {
  const [phase, setPhase] = useState(0);
  const [loop, setLoop] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const [activeWorkerChat, setActiveWorkerChat] = useState<string | null>(null);
  
  const isMobile = useIsMobile();

  // Demo phase timing
  const phaseTimeouts = useMemo(() => [1000, 3200, 4800, 6600, 8800, 10600, 12800, 15000], []);
  const loopDuration = 22000;

  useEffect(() => {
    const timers: NodeJS.Timeout[] = phaseTimeouts.map((timeout, i) => 
      setTimeout(() => setPhase(i + 1), timeout)
    );
    
    const resetTimer = setTimeout(() => { 
      setPhase(0); 
      setLoop(l => l + 1); 
    }, loopDuration);
    
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, [loop, phaseTimeouts]);

  const { displayed: typed, done: typeDone } = useTypingEffect(PROMPT, 25, 400, phase >= 1);

  const koryPhase = useMemo(() => {
    if (phase >= 1 && phase < 8) {
      return phase < 3 ? "analyzing" : phase < 7 ? "executing" : "reviewing";
    }
    return null;
  }, [phase]);

  const showAgents = phase >= 3;
  const showCommit = phase >= 8;

  const handleOpenWorkerChat = useCallback((workerId: string) => {
    setActiveWorkerChat(workerId);
    setShowCommands(false);
  }, []);

  const handleCloseChat = useCallback(() => {
    setActiveWorkerChat(null);
  }, []);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[1400px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-12 rounded-3xl blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.08), transparent 70%)" }} />

      <div className={`relative rounded-xl overflow-hidden ${styles.demo}`} style={{ background: S0, border: `1px solid ${BORDER}`, fontFamily: "'Inter', -apple-system, sans-serif", boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${BORDER}` }}>

        {/* Demo label */}
        <div className="absolute top-10 right-4 z-20 px-2 py-1 rounded text-[10px] font-medium bg-black/60 text-white/60 border border-white/10 pointer-events-none">
          Demo simulation
        </div>

        {/* macOS Title Bar */}
        <div className="flex items-center px-3 md:px-4 relative shrink-0" style={{ height: 36, background: S1, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs md:text-[13px]" style={{ color: MUTED }}>Koryphaios</span>
          </div>
        </div>

        {/* Modals & Overlays */}
        <AnimatePresence>
          {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        </AnimatePresence>
        
        <AnimatePresence>
          {showCommands && (
            <CommandsPalette 
              onClose={() => setShowCommands(false)} 
              onSelectWorker={handleOpenWorkerChat}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {activeWorkerChat && (
            <WorkerChatView 
              workerId={activeWorkerChat}
              onBack={handleCloseChat}
            />
          )}
        </AnimatePresence>

        {/* Mobile View */}
        {isMobile && (
          <MobileView 
            phase={phase}
            koryPhase={koryPhase}
            showAgents={showAgents}
            typed={typed}
            typeDone={typeDone}
            onOpenWorkerChat={handleOpenWorkerChat}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {/* Desktop View */}
        {!isMobile && (
          <DesktopView
            phase={phase}
            koryPhase={koryPhase}
            showAgents={showAgents}
            showCommit={showCommit}
            typed={typed}
            typeDone={typeDone}
            onOpenWorkerChat={handleOpenWorkerChat}
            onOpenCommands={() => setShowCommands(true)}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ── Mobile View Component ────────────────────────────────────────────── */
interface MobileViewProps {
  phase: number;
  koryPhase: string | null;
  showAgents: boolean;
  typed: string;
  typeDone: boolean;
  onOpenWorkerChat: (id: string) => void;
  onOpenSettings: () => void;
}

function MobileView({ phase, koryPhase, showAgents, typed, typeDone, onOpenWorkerChat, onOpenSettings }: MobileViewProps) {
  return (
    <div className="md:hidden flex flex-col" style={{ height: 520, background: S0 }}>
      {/* Mobile Header */}
      <header className="flex items-center justify-between px-3 py-2 border-b shrink-0" style={{ borderColor: BORDER, background: S1 }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 shrink-0 overflow-hidden" style={{ background: "transparent" }}>
            <img src="/logo-64.png" alt="K" width={24} height={24} className="object-contain" />
          </div>
          {koryPhase && (
            <button onClick={() => onOpenWorkerChat("manager")} className="flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: S2 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px]" style={{ color: TEXT2 }}>Kory: {koryPhase}</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {showAgents && (
            <button onClick={() => onOpenWorkerChat("manager")} className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: S2 }}>
              <Activity size={10} color="#34d399" />
              <span className="text-[10px]" style={{ color: TEXT2 }}>3 agents</span>
            </button>
          )}
          <button onClick={onOpenSettings} className="p-1.5 rounded" style={{ color: MUTED }}>
            <Settings size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Worker Cards */}
      <AnimatePresence>
        {showAgents && (
          <motion.div
            className="flex gap-2 overflow-x-auto px-3 py-2 border-b shrink-0"
            style={{ borderColor: BORDER, background: S1 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {WORKERS.map((worker, i) => (
              <MobileWorkerCard 
                key={worker.id} 
                worker={worker} 
                phase={phase} 
                index={i} 
                onClick={() => onOpenWorkerChat(worker.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Feed */}
      <MobileFeed 
        phase={phase}
        typed={typed}
        typeDone={typeDone}
        onOpenWorkerChat={onOpenWorkerChat}
      />

      {/* Mobile Input */}
      <div className="shrink-0 border-t p-3" style={{ borderColor: BORDER, background: S1 }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg flex items-center px-3" style={{ background: S2, border: `1px solid ${BORDER}`, height: 40, fontSize: 13, color: MUTED }}>
            <span className="truncate">Describe what you want...</span>
          </div>
          <button className="flex items-center justify-center rounded-lg shrink-0" style={{ width: 40, height: 40, background: ACCENT, color: "white" }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Feed Component ────────────────────────────────────────────── */
interface MobileFeedProps {
  phase: number;
  typed: string;
  typeDone: boolean;
  onOpenWorkerChat: (id: string) => void;
}

function MobileFeed({ phase, typed, typeDone, onOpenWorkerChat }: MobileFeedProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center px-3 py-2 border-b shrink-0" style={{ borderColor: BORDER, background: S1 }}>
        <MessageSquare size={14} style={{ color: TEXT2 }} />
        <span className="ml-2 text-xs" style={{ color: TEXT2 }}>Agent Feed</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3" style={{ background: S0 }}>
        {/* Empty state */}
        {phase === 0 && (
          <div className="flex flex-col items-center justify-center text-center h-full py-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(245,158,11,0.10)", color: WARNING }}>
              <MessageSquare size={18} />
            </div>
            <h2 className="text-sm font-semibold mb-1" style={{ color: TEXT }}>Ready for your request</h2>
            <p className="text-xs mb-3" style={{ color: MUTED }}>Start a new project or collaborate with agents.</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              {MOBILE_SUGGESTIONS.map((label) => (
                <div key={label} className="p-2 rounded-lg border text-center" style={{ background: S2, borderColor: BORDER }}>
                  <span className="text-[10px]" style={{ color: TEXT }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User message */}
        {phase >= 1 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full mb-2 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: `${ACCENT}10` }}>
              <Send size={12} color={ACCENT} className="mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>you</span>
                <div className="mt-0.5 text-xs" style={{ color: TEXT }}>
                  {typed}{!typeDone && <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse align-middle" style={{ background: ACCENT }} />}
                </div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Manager analyzing */}
        {phase >= 2 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full mb-2 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }}>
              <AnimatedStatusIcon status={phase < 3 ? "analyzing" : "done"} size={12} />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold" style={{ color: WARNING }}>manager</span>
                <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: WARNING, background: `${WARNING}20` }}>analyzing</span>
                <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>decomposing into 3 subtasks...</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Manager routing */}
        {phase >= 3 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full mb-2 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }}>
              <AnimatedStatusIcon status="done" size={12} />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold" style={{ color: WARNING }}>manager</span>
                <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: WARNING, background: `${WARNING}20` }}>routing</span>
                <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>frontend • backend • testing</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Worker entries */}
        {phase >= 4 && (
          <div className="space-y-2 mb-2">
            {[
              { time: "14:32", nameColor: "#00cccc", name: "frontend", file: "Dashboard.svelte", workerId: "frontend" },
              { time: "14:32", nameColor: "#4285f4", name: "backend", file: "+server.ts", workerId: "backend" },
            ].map((e) => (
              <motion.button key={e.name} onClick={() => onOpenWorkerChat(e.workerId)} className="w-full flex items-start gap-2 p-2 rounded-lg text-left" style={{ background: S2 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={12} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: e.nameColor }}>{e.name}</span>
                  <div className="text-[11px] truncate" style={{ color: TEXT2 }}>{e.file}</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Critic */}
        {phase >= 7 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full mb-2 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }}>
              <AnimatedStatusIcon status="verifying" size={12} />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold" style={{ color: WARNING }}>critic</span>
                <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: WARNING, background: `${WARNING}20` }}>reviewing</span>
                <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>
                  reviewed 5 files... <span style={{ color: SUCCESS, fontWeight: 600 }}>PASS</span>
                </div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Shadow commit */}
        {phase >= 8 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full mb-2 text-left" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
              <AnimatedStatusIcon status="done" size={12} />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold" style={{ color: "#8b5cf6" }}>shadow</span>
                <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: "#8b5cf6", background: "#8b5cf620" }}>commit</span>
                <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>saved → a3f2c1d</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Stats */}
        {phase >= 8 && (
          <motion.div className="flex items-center justify-between px-2 py-2 rounded" style={{ background: S3, fontSize: 9, color: MUTED }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>5 files</span>
            <span>270 lines</span>
            <span style={{ color: WARNING }}>$0.12</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Desktop View Component ───────────────────────────────────────────── */
interface DesktopViewProps {
  phase: number;
  koryPhase: string | null;
  showAgents: boolean;
  showCommit: boolean;
  typed: string;
  typeDone: boolean;
  onOpenWorkerChat: (id: string) => void;
  onOpenCommands: () => void;
  onOpenSettings: () => void;
}

function DesktopView({ phase, koryPhase, showAgents, showCommit, typed, typeDone, onOpenWorkerChat, onOpenCommands, onOpenSettings }: DesktopViewProps) {
  return (
    <div className="hidden md:flex" style={{ height: 680 }}>
      {/* SIDEBAR */}
      <nav className="shrink-0 flex flex-col" style={{ width: 220, background: S1, borderRight: `1px solid ${BORDER}` }}>
        <SidebarHeader />
        <SidebarSearch />
        <SidebarSessions phase={phase} />
        <SidebarFooter />
      </nav>

      {/* MAIN + GIT */}
      <div className="flex-1 flex min-w-0">
        <div className="flex-1 flex flex-col min-w-0">
          {/* MenuBar */}
          <DesktopMenuBar 
            koryPhase={koryPhase}
            showAgents={showAgents}
            onOpenWorkerChat={onOpenWorkerChat}
            onOpenCommands={onOpenCommands}
            onOpenSettings={onOpenSettings}
          />

          {/* WorkerCards */}
          <AnimatePresence>
            {showAgents && (
              <motion.div
                className="flex gap-2 shrink-0 overflow-x-auto px-4 py-2 border-b"
                style={{ borderColor: BORDER, background: S1 }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {WORKERS.map((worker, i) => (
                  <WorkerCard 
                    key={worker.id} 
                    worker={worker} 
                    phase={phase} 
                    index={i}
                    onClick={() => onOpenWorkerChat(worker.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ManagerFeed */}
          <DesktopFeed 
            phase={phase}
            typed={typed}
            typeDone={typeDone}
            onOpenWorkerChat={onOpenWorkerChat}
          />

          {/* CommandInput */}
          <CommandInput />
        </div>

        {/* SourceControlPanel */}
        <SourceControlPanel showCommit={showCommit} />
      </div>
    </div>
  );
}

/* ── Sidebar Components ───────────────────────────────────────────────── */
function SidebarHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-3 border-b" style={{ borderColor: BORDER }}>
      <span className="text-sm font-semibold leading-none" style={{ color: TEXT }}>Sessions</span>
      <div className="p-1.5 rounded-lg flex items-center justify-center" style={{ color: TEXT2 }}><Plus size={16} /></div>
    </div>
  );
}

function SidebarSearch() {
  return (
    <div className="px-3 py-2">
      <div className="relative flex items-center">
        <Search size={14} className="absolute pointer-events-none" style={{ left: 10, color: MUTED }} />
        <div className="w-full h-8 rounded-lg text-xs flex items-center" style={{ paddingLeft: 32, background: S2, border: `1px solid ${BORDER}`, color: MUTED, fontSize: 12 }}>Search sessions...</div>
      </div>
    </div>
  );
}

function SidebarSessions({ phase }: { phase: number }) {
  return (
    <div className="flex-1 overflow-y-auto px-1.5">
      <div className="mb-1">
        <div className="px-2 py-1.5 uppercase tracking-wider" style={{ fontSize: 10, fontWeight: 500, color: MUTED }}>Today</div>
        {SESSIONS.slice(0, 3).map(s => (
          <div key={s.id} className="flex items-center gap-2.5 px-2.5 py-2.5 mx-1 rounded-lg" style={{ background: s.active ? `${ACCENT}10` : "transparent" }}>
            {s.active && phase >= 1 && phase < 8
              ? <div className="shrink-0 flex items-center justify-center" style={{ width: 16, height: 16 }}><AnimatedStatusIcon status={phase < 3 ? "analyzing" : phase < 7 ? "thinking" : "done"} size={14} isManager /></div>
              : <MessageSquare size={14} className="shrink-0" style={{ color: MUTED, position: "relative", top: -2 }} />}
            <div className="flex-1 min-w-0">
              <div className="text-xs truncate" style={{ color: TEXT }}>{s.title}</div>
              <div className="flex items-center gap-2" style={{ marginTop: 2, fontSize: 10, color: MUTED }}>
                <span>{s.time}</span><span>{s.msgs} msgs</span><span>{s.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-1">
        <div className="px-2 py-1.5 uppercase tracking-wider" style={{ fontSize: 10, fontWeight: 500, color: MUTED }}>Earlier</div>
        {SESSIONS.slice(3).map(s => (
          <div key={s.id} className="flex items-center gap-2.5 px-2.5 py-2.5 mx-1 rounded-lg">
            <MessageSquare size={14} className="shrink-0" style={{ color: MUTED, position: "relative", top: -2 }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs truncate" style={{ color: TEXT }}>{s.title}</div>
              <div className="flex items-center gap-2" style={{ marginTop: 2, fontSize: 10, color: MUTED }}>
                <span>{s.time}</span><span>{s.msgs} msgs</span><span>{s.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="px-3 border-t flex items-center justify-between shrink-0" style={{ height: 40, borderColor: BORDER }}>
      <div className="flex items-center gap-2">
        <span className="relative inline-flex">
          <span className="animate-ping absolute rounded-full opacity-40" style={{ width: 8, height: 8, background: SUCCESS }} />
          <span className="relative rounded-full" style={{ width: 8, height: 8, background: SUCCESS }} />
        </span>
        <span className="capitalize" style={{ fontSize: 11, color: MUTED }}>connected</span>
      </div>
      <span style={{ fontSize: 10, color: MUTED, background: S3, padding: "2px 6px", borderRadius: 4 }}>5 providers</span>
    </div>
  );
}

/* ── Desktop Menu Bar Component ───────────────────────────────────────── */
interface DesktopMenuBarProps {
  koryPhase: string | null;
  showAgents: boolean;
  onOpenWorkerChat: (id: string) => void;
  onOpenCommands: () => void;
  onOpenSettings: () => void;
}

function DesktopMenuBar({ koryPhase, showAgents, onOpenWorkerChat, onOpenCommands, onOpenSettings }: DesktopMenuBarProps) {
  return (
    <header className="flex items-center justify-between px-2 border-b shrink-0 select-none" style={{ height: 44, borderColor: BORDER, background: S1 }}>
      <div className="flex items-center gap-1">
        <div className="flex items-center justify-center w-9 h-9 mr-1 shrink-0 overflow-hidden" style={{ background: "transparent" }}>
          <img src="/logo-64.png" alt="K" width={32} height={32} className="object-contain" />
        </div>
        {["File", "Edit", "View"].map(m => (
          <span key={m} className="px-2 py-1 rounded-md" style={{ fontSize: 12, color: TEXT2 }}>{m}</span>
        ))}
        {koryPhase && (
          <button 
            onClick={() => onOpenWorkerChat("manager")}
            className="flex items-center gap-2 min-w-0 max-w-[200px] hover:bg-white/5 rounded-md transition-colors"
          >
            <span style={{ fontSize: 11, color: MUTED }} aria-hidden>|</span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg" style={{ background: S2 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs leading-none" style={{ color: TEXT2 }}>Kory: {koryPhase}</span>
            </div>
          </button>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: S2 }}>
          <span className="text-sm font-medium" style={{ color: TEXT }}>Analytics Dashboard</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onOpenCommands}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5 transition-colors" 
          style={{ color: MUTED }}
        >
          <Search size={14} />
          <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Commands</span>
          <kbd style={{ fontSize: 9, padding: "1px 4px", borderRadius: 4, background: S3, border: `1px solid ${BORDER}`, color: MUTED, opacity: 0.6 }}>⌘K</kbd>
        </button>
        {showAgents && (
          <button 
            onClick={() => onOpenWorkerChat("manager")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors" 
            style={{ background: S2 }}
          >
            <Activity size={12} color="#34d399" />
            <span className="text-xs leading-none" style={{ color: TEXT2 }}>3 agents</span>
            <ChevronDown size={12} style={{ color: MUTED }} />
          </button>
        )}
        <button 
          onClick={onOpenSettings}
          className="p-2 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" 
          style={{ color: MUTED }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}

/* ── Desktop Feed Component ───────────────────────────────────────────── */
interface DesktopFeedProps {
  phase: number;
  typed: string;
  typeDone: boolean;
  onOpenWorkerChat: (id: string) => void;
}

function DesktopFeed({ phase, typed, typeDone, onOpenWorkerChat }: DesktopFeedProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center justify-between px-4 border-b shrink-0" style={{ height: 40, borderColor: BORDER, background: S1 }}>
        <button 
          onClick={() => onOpenWorkerChat("manager")}
          className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors" 
          style={{ color: TEXT2 }}
        >
          <MessageSquare size={16} />Agent feed
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ background: S0 }}>
        {/* Empty state */}
        {phase === 0 && (
          <div className="flex flex-col items-center justify-center text-center h-full max-w-2xl mx-auto py-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(245,158,11,0.10)", color: WARNING }}><MessageSquare size={24} /></div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: TEXT }}>Ready for your request</h2>
            <p className="text-sm mb-5" style={{ color: MUTED }}>Start a new project or collaborate with specialized agents on your existing code.</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              {SUGGESTIONS.map(s => (
                <div key={s.label} className="flex flex-col items-start p-3 rounded-xl border text-left" style={{ background: S2, borderColor: BORDER }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: S3, color: MUTED }}><s.Icon size={14} /></div>
                  <span className="text-sm font-medium mb-1" style={{ color: TEXT }}>{s.label}</span>
                  <span className="leading-relaxed opacity-60 line-clamp-2" style={{ fontSize: 11, color: MUTED }}>{s.prompt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User message */}
        {phase >= 1 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full flex flex-col group text-left hover:bg-white/5 rounded-lg -mx-2 px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:01</span>
              <div className="shrink-0 flex items-center justify-center w-5 h-6"><Send size={14} color={ACCENT} /></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide" style={{ color: ACCENT }}>you</span>
                <div className="mt-1" style={{ color: TEXT, fontSize: 13 }}>
                  {typed}{!typeDone && <span className="inline-block w-2 h-4 ml-0.5 animate-pulse align-middle" style={{ background: ACCENT }} />}
                </div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Manager analyzing */}
        {phase >= 2 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full flex flex-col group text-left hover:bg-white/5 rounded-lg -mx-2 px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:03</span>
              <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase < 3 ? "analyzing" : "done"} size={14} isManager /></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>manager</span>
                <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>analyzing</span>
                <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>classifying domain... decomposing into 3 subtasks</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Manager routing */}
        {phase >= 3 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full flex flex-col group text-left hover:bg-white/5 rounded-lg -mx-2 px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:05</span>
              <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="done" size={14} isManager /></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>manager</span>
                <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>routing</span>
                <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>frontend → gpt-5.4 · backend → gemini-3.1-pro · tests → claude-sonnet-4.6</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Worker entries */}
        {phase >= 4 && (
          <div className="ml-20 border-l-2 pl-4 py-1 space-y-1 my-1" style={{ borderColor: `${SUCCESS}30` }}>
            {[
              { time: "14:32:08", nameColor: "#00cccc", name: "worker:frontend", file: "src/components/Dashboard.svelte", lines: "+78 lines", workerId: "frontend" },
              { time: "14:32:09", nameColor: "#4285f4", name: "worker:backend", file: "src/routes/api/analytics/+server.ts", lines: "+45 lines", workerId: "backend" },
            ].map((e, i) => (
              <motion.button key={e.name} onClick={() => onOpenWorkerChat(e.workerId)} className="w-full flex items-start gap-3 py-1 text-sm rounded text-left hover:bg-white/5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>{e.time}</span>
                <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: e.nameColor }}>{e.name}</span>
                  <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: e.nameColor, opacity: 0.5, background: `${e.nameColor}12` }}>write_file</span>
                  <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>{e.file} <span style={{ color: `${TEXT}30` }}>{e.lines}</span></div>
                </div>
              </motion.button>
            ))}
            {phase >= 5 && [
              { time: "14:32:12", nameColor: "#00cccc", name: "worker:frontend", file: "src/components/ChartCard.svelte", lines: "+52 lines", workerId: "frontend" },
              { time: "14:32:13", nameColor: "#00cc66", name: "worker:testing", file: "tests/analytics.test.ts", lines: "+62 lines", workerId: "testing" },
            ].map((e, i) => (
              <motion.button key={`${e.name}-b`} onClick={() => onOpenWorkerChat(e.workerId)} className="w-full flex items-start gap-3 py-1 text-sm rounded text-left hover:bg-white/5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>{e.time}</span>
                <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: e.nameColor }}>{e.name}</span>
                  <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: e.nameColor, opacity: 0.5, background: `${e.nameColor}12` }}>write_file</span>
                  <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>{e.file} <span style={{ color: `${TEXT}30` }}>{e.lines}</span></div>
                </div>
              </motion.button>
            ))}
            {phase >= 6 && (
              <motion.button onClick={() => onOpenWorkerChat("backend")} className="w-full flex items-start gap-3 py-1 text-sm rounded text-left hover:bg-white/5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:16</span>
                <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: "#4285f4" }}>worker:backend</span>
                  <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: "#4285f4", opacity: 0.5, background: "#4285f412" }}>write_file</span>
                  <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>src/lib/db/queries.ts <span style={{ color: `${TEXT}30` }}>+33 lines</span></div>
                </div>
              </motion.button>
            )}
          </div>
        )}

        {/* Critic */}
        {phase >= 7 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full flex flex-col group text-left hover:bg-white/5 rounded-lg -mx-2 px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:19</span>
              <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="verifying" size={14} /></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>critic</span>
                <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>reviewing</span>
                <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>reviewed 5 files across 3 workers... <motion.span style={{ color: SUCCESS, fontWeight: 600 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>PASS</motion.span><span style={{ color: `${TEXT}25` }}> — no issues</span></div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Shadow commit */}
        {phase >= 8 && (
          <motion.button onClick={() => onOpenWorkerChat("manager")} className="w-full flex flex-col group text-left hover:bg-white/5 rounded-lg -mx-2 px-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:21</span>
              <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="done" size={14} /></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide" style={{ color: "#8b5cf6" }}>shadow</span>
                <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: "#8b5cf6", opacity: 0.5, background: "#8b5cf612" }}>ghost-commit</span>
                <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>saved → <span style={{ color: `${TEXT}30`, fontFamily: "monospace" }}>a3f2c1d</span> · undo available</div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Stats */}
        {phase >= 8 && (
          <motion.div className="flex items-center gap-4 px-3" style={{ paddingTop: 8, marginTop: 4, borderTop: `1px solid ${BORDER}`, fontSize: 10, color: MUTED }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span>5 files changed</span><span>270 lines added</span><span>6,841 tokens</span><span style={{ color: WARNING }}>$0.12 total</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Command Input Component ───────────────────────────────────────────── */
function CommandInput() {
  return (
    <div className="shrink-0 border-t" style={{ borderColor: BORDER, background: S1 }}>
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button className="flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium" style={{ background: S3, color: TEXT, border: `1px solid ${BORDER}` }}>
            <Sparkles size={16} color="#fbbf24" /><span>Auto</span><ChevronDown size={14} style={{ color: MUTED }} />
          </button>
          <button className="flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium" style={{ background: S3, color: TEXT, border: `1px solid ${BORDER}` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: TEXT }}>
              <path d="m10.852 14.772-.383.923"/>
              <path d="m10.852 9.228-.383-.923"/>
              <path d="m13.148 14.772.382.924"/>
              <path d="m13.531 8.305-.383.923"/>
              <path d="m14.772 10.852.923-.383"/>
              <path d="m14.772 13.148.923.383"/>
              <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771"/>
              <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771"/>
              <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706"/>
              <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516"/>
              <path d="M4.5 10.291A4 4 0 0 0 6 18"/>
              <path d="M6.002 5.125a3 3 0 0 0 .4 1.375"/>
              <path d="m9.228 10.852-.923-.383"/>
              <path d="m9.228 13.148-.923.383"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>Medium</span><ChevronDown size={14} style={{ color: MUTED }} />
          </button>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg flex items-center" style={{ background: S2, border: `1px solid ${BORDER}`, minHeight: 52, padding: "14px 16px", fontSize: 15, color: MUTED }}>Describe what you want to build...</div>
          <button className="flex items-center justify-center gap-2 rounded-lg self-end shrink-0" style={{ minWidth: 80, height: 52, padding: "0 20px", background: ACCENT, color: "white", fontSize: 14, fontWeight: 600, border: "none" }}>
            <Send size={18} />Send
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs" style={{ color: MUTED }}>Enter to send · Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}

/* ── Source Control Panel Component ───────────────────────────────────── */
interface SourceControlPanelProps {
  showCommit: boolean;
}

function SourceControlPanel({ showCommit }: SourceControlPanelProps) {
  return (
    <aside className="hidden lg:flex shrink-0 flex-col border-l" style={{ width: 220, borderColor: BORDER, background: S1 }}>
      <div className="flex items-center justify-between px-3 py-3 border-b relative" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-2">
          <GitCommit size={14} style={{ color: TEXT2 }} />
          <span className="text-sm font-semibold" style={{ color: TEXT }}>Source Control</span>
          <button className="flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ fontSize: 10, background: S3, color: MUTED }}><GitBranch size={10} />main<ChevronDown size={10} /></button>
        </div>
        <div className="flex items-center gap-1">
          <div className="p-1.5 rounded" style={{ color: MUTED }}><RefreshCw size={14} /></div>
          <div className="p-1.5 rounded" style={{ color: MUTED }}><ArrowDown size={14} /></div>
          <div className="p-1.5 rounded" style={{ color: MUTED }}><ArrowUp size={14} /></div>
        </div>
      </div>
      <div className="p-3 border-b" style={{ borderColor: BORDER }}>
        <textarea readOnly value={showCommit ? "feat: analytics dashboard" : ""} placeholder="Message (⌘+Enter to commit)" className="w-full text-xs resize-none mb-1 font-sans" style={{ height: 52, background: S2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: showCommit ? TEXT2 : `${MUTED}60`, outline: "none" }} />
        <div className="flex items-center justify-between mb-2" style={{ fontSize: 10 }}><span /><span style={{ color: MUTED }}>{showCommit ? "23" : "0"}/72</span></div>
        <button disabled={!showCommit} className="w-full text-xs py-1.5 flex items-center justify-center gap-2 rounded" style={{ background: showCommit ? ACCENT : S3, color: showCommit ? "white" : MUTED, fontWeight: 600, border: "none" }}><Check size={12} /> Commit</button>
      </div>
      {showCommit && (
        <motion.div className="flex items-center gap-3 px-4 py-2 border-b" style={{ borderColor: BORDER, background: S2, fontSize: 10 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="font-medium" style={{ color: "#4ade80" }}>5 added</span></motion.div>
      )}
      <div className="flex-1 overflow-y-auto">
        {showCommit ? (
          <>
            <div className="px-3 py-1.5 mt-2 uppercase tracking-wider flex items-center justify-between sticky top-0 z-10" style={{ fontSize: 10, fontWeight: 700, color: MUTED, background: S1 }}>
              <div className="flex items-center gap-1"><ArrowUp size={10} /><span>Staged Changes ({STAGED.length})</span></div>
              <div className="p-1 rounded" style={{ color: TEXT }}><Minus size={12} /></div>
            </div>
            {STAGED.map((f, i) => (
              <motion.div key={f.path} className="w-full flex items-center gap-2 px-3 py-1.5 text-xs" initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="truncate" style={{ color: TEXT2 }}>{f.path.split("/").pop()}</span>
                  <div className="flex items-center gap-1 shrink-0 ml-auto mr-1">{f.additions > 0 && <span style={{ color: "#4ade80", fontWeight: 500 }}>+{f.additions}</span>}</div>
                </div>
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${statusColor(f.status)}20`, color: statusColor(f.status), fontSize: 9, fontWeight: 700 }}>{statusLetter(f.status)}</div>
              </motion.div>
            ))}
          </>
        ) : (
          <div className="p-6 text-center flex flex-col items-center justify-center" style={{ color: MUTED }}>
            <div className="text-xl mb-1 opacity-50">✓</div>
            <p className="text-sm font-medium" style={{ color: TEXT2 }}>Working tree clean</p>
            <p className="text-xs opacity-50">No changes to commit</p>
          </div>
        )}
        <div className="px-3 py-1.5 mt-2 uppercase tracking-wider flex items-center justify-between sticky top-0 z-10" style={{ fontSize: 10, fontWeight: 700, color: MUTED, background: S1 }}>
          <div className="flex items-center gap-1"><ArrowDown size={10} /><span>Changes (0)</span></div>
          <div className="p-1 rounded" style={{ color: TEXT }}><Plus size={12} /></div>
        </div>
      </div>
    </aside>
  );
}
