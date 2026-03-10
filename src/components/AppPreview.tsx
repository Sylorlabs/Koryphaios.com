"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
import {
  Settings, Activity, ChevronDown, GitBranch, Zap, Search,
  MessageSquare, ArrowDown, Paintbrush, Bug, Beaker,
  Send, Plus, Minus, Check, GitCommit,
  ArrowUp, RefreshCw, Sparkles, Square
} from "lucide-react";

/* ── Theme tokens ─────────────────────────────────────────────────────── */
const S0 = "#0a0a0b";
const S1 = "#111113";
const S2 = "#1a1a1e";
const S3 = "#242428";
const BORDER = "#2a2a30";
const TEXT = "#e8e8ed";
const TEXT2 = "#8b8b96";
const MUTED = "#5a5a66";
const ACCENT = "#6366f1";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";

/* ── AnimatedStatusIcon (exact from AnimatedStatusIcon.svelte) ─────────── */
function AnimatedStatusIcon({ status, size = 16, isManager = false }: { status: string; size?: number; isManager?: boolean }) {
  if (status === "thinking") return (
    <div className="ap-thinking shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        {/* Glow rays */}
        <line x1="12" y1="1.5" x2="12" y2="0" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="ap-ray"/>
        <line x1="18.5" y1="4" x2="20" y2="2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="ap-ray"/>
        <line x1="5.5" y1="4" x2="4" y2="2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="ap-ray"/>
        <line x1="20.5" y1="9.5" x2="22" y2="9.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="ap-ray"/>
        <line x1="3.5" y1="9.5" x2="2" y2="9.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className="ap-ray"/>
        {/* Bulb body with fill */}
        <defs>
          <clipPath id="bulb-fill">
            <path d="M12 4a5.5 5.5 0 0 1 3.7 9.6V16.5a1 1 0 0 1-1 1h-5.4a1 1 0 0 1-1-1v-2.9A5.5 5.5 0 0 1 12 4z"/>
          </clipPath>
        </defs>
        <g clipPath="url(#bulb-fill)">
          <rect x="6.5" y="4" width="11" height="13.5" fill="#fcd34d" className="ap-bulb-fill"/>
        </g>
        {/* Bulb outline */}
        <path d="M12 4a5.5 5.5 0 0 1 3.7 9.6V16.5a1 1 0 0 1-1 1h-5.4a1 1 0 0 1-1-1v-2.9A5.5 5.5 0 0 1 12 4z" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Base lines */}
        <path d="M10 17.5h4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10.5 19h3" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    </div>
  );
  if (status === "tool_calling") return (
    <div className="ap-writing shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        {/* Squiggle lines being written - appear and disappear (UNDER pen) */}
        <path className="ap-squiggle-1" d="M2 16.5Q4 15 6 16.5T10 16.5" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <path className="ap-squiggle-2" d="M3 18.5Q5 17 7 18.5T11 18.5" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" fill="none"/>
        <path className="ap-squiggle-3" d="M2 20.5Q4 19 6 20.5T10 20.5" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
        {/* Pen nib (ON TOP) */}
        <path d="M17 2L21 6L8 19L4 19L4 15L17 2Z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(74, 222, 128, 0.1)"/>
        <path d="M15 4L19 8" stroke="#22c55e" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="5" cy="18" r="1.5" fill="#4ade80"/>
      </svg>
    </div>
  );
  if (status === "streaming") return (
    <div className="shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path d="M4 6h16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className="ap-s1"/>
        <path d="M4 10h12" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" className="ap-s2"/>
        <path d="M4 14h14" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className="ap-s3"/>
        <path d="M4 18h8" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" className="ap-s4"/>
      </svg>
    </div>
  );
  if (status === "verifying" || status === "analyzing") return (
    <div className="ap-verify shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="11" cy="11" r="6" stroke="#c084fc" strokeWidth="1.5"/>
        <path d="M15.5 15.5L20 20" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 11h4" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" className="ap-scan"/>
      </svg>
    </div>
  );
  if (status === "done") return (
    <div className="shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-6" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
  if (status === "error") return (
    <div className="shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#ef4444" strokeWidth="1.5"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="#f87171" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="0.5" fill="#f87171"/>
      </svg>
    </div>
  );
  return (
    <div className="shrink-0" style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="12" cy="12" r="4" fill={MUTED} className="ap-breathe" opacity="0.3"/>
      </svg>
    </div>
  );
}

/* ── Typing effect ────────────────────────────────────────────────────── */
function useTypingEffect(text: string, speed: number, delay: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) { clearInterval(iv); setDone(true); } }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay, active]);
  return { displayed, done };
}

/* ── Demo data ────────────────────────────────────────────────────────── */
type Worker = { id: string; name: string; domain: string; color: string; provider: string; model: string; ctxMax: number };
const WORKERS: Worker[] = [
  { id: "frontend", name: "frontend", domain: "ui",      color: "#00ffff", provider: "Codex",     model: "gpt-5.3-codex",    ctxMax: 500000 },
  { id: "backend",  name: "backend",  domain: "backend", color: "#4285f4", provider: "Google",    model: "gemini-3.1-pro",   ctxMax: 1000000 },
  { id: "testing",  name: "testing",  domain: "test",    color: "#00ff80", provider: "Anthropic", model: "claude-sonnet-4.6", ctxMax: 1000000 },
];
const SESSIONS = [
  { id: "s1", title: "Analytics Dashboard", active: true,  time: "14:32", msgs: 12, cost: "$0.08" },
  { id: "s2", title: "Auth refactor",        active: false, time: "12:17", msgs: 34, cost: "$0.21" },
  { id: "s3", title: "CI pipeline fixes",    active: false, time: "09:05", msgs: 18, cost: "$0.14" },
  { id: "s4", title: "API v2 migration",     active: false, time: "Mar 7", msgs: 45, cost: "$0.37" },
];
const STAGED = [
  { path: "src/components/Dashboard.svelte", status: "added", additions: 78 },
  { path: "src/components/ChartCard.svelte", status: "added", additions: 52 },
  { path: "src/routes/api/analytics/+server.ts", status: "added", additions: 45 },
  { path: "src/lib/db/queries.ts", status: "added", additions: 33 },
  { path: "tests/analytics.test.ts", status: "added", additions: 62 },
];

function statusLetter(s: string) { return s === "added" ? "A" : s === "modified" ? "M" : s === "deleted" ? "D" : "?"; }
function statusColor(s: string) { return s === "added" ? "#4ade80" : s === "modified" ? "#fbbf24" : s === "deleted" ? "#f87171" : TEXT2; }

/* ── Main ─────────────────────────────────────────────────────────────── */
export default function AppPreview() {
  const [phase, setPhase] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 3200),
      setTimeout(() => setPhase(3), 4800),
      setTimeout(() => setPhase(4), 6600),
      setTimeout(() => setPhase(5), 8800),
      setTimeout(() => setPhase(6), 10600),
      setTimeout(() => setPhase(7), 12800),
      setTimeout(() => setPhase(8), 15000),
    ];
    const r = setTimeout(() => { setPhase(0); setLoop(l => l + 1); }, 22000);
    return () => { t.forEach(clearTimeout); clearTimeout(r); };
  }, [loop]);

  const prompt = "build a full-stack analytics dashboard with charts, API routes, and tests";
  const { displayed: typed, done: typeDone } = useTypingEffect(prompt, 25, 400, phase >= 1);

  function wStatus(w: Worker): "idle" | "active" | "done" { return phase >= 7 ? "done" : phase >= 3 ? "active" : "idle"; }
  function wAgentStatus(w: Worker): string { return phase >= 7 ? "done" : phase >= 4 ? "tool_calling" : phase >= 3 ? "thinking" : "idle"; }
  function wTokens(w: Worker) { return phase >= 5 ? (w.id === "frontend" ? 34200 : w.id === "backend" ? 28700 : 22100) : phase >= 3 ? (w.id === "frontend" ? 8100 : w.id === "backend" ? 5300 : 4200) : 0; }
  function wStatusText(w: Worker) { return phase >= 7 ? "Complete" : phase >= 4 ? (w.id === "frontend" ? "Tool: write_file" : w.id === "backend" ? "Generating..." : "Tool: write_file") : phase >= 3 ? "Thinking..." : "Idle"; }
  function wTool(w: Worker) { return phase >= 4 && phase < 7 ? "write_file" : null; }

  const koryPhase = phase >= 1 && phase < 8 ? (phase < 3 ? "analyzing" : phase < 7 ? "executing" : "reviewing") : null;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[1400px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <style>{`
        .ap-thinking{animation:lightbulb-bounce 1.2s ease-in-out infinite}
        @keyframes lightbulb-bounce{0%,100%{transform:translateY(6px)}30%{transform:translateY(3px) rotate(-5deg)}60%{transform:translateY(5px) rotate(3deg)}}
        .ap-ray{animation:ray-appear 1.2s ease-in-out infinite}
        @keyframes ray-appear{0%,100%{opacity:0;transform:scale(0.5)}20%{opacity:0.3;transform:scale(0.7)}30%{opacity:1;transform:scale(1)}40%{opacity:0.3;transform:scale(0.7)}50%{opacity:0;transform:scale(0.5)}}
        .ap-bulb-fill{animation:bulb-fill 1.2s ease-in-out infinite}
        @keyframes bulb-fill{0%,100%{y:17.5;height:0;opacity:0}25%{y:14;height:3.5;opacity:0.3}35%,50%{y:4;height:13.5;opacity:1}65%{y:10;height:7.5;opacity:0.5}}
        .ap-writing{animation:ap-pen-write 1.8s ease-in-out infinite}
        @keyframes ap-pen-write{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(1px,-1px) rotate(-3deg)}50%{transform:translate(2px,0) rotate(0deg)}75%{transform:translate(1px,1px) rotate(3deg)}}
        .ap-squiggle-1{stroke-dasharray:15;animation:ap-sq1 1.5s ease-in-out infinite}
        @keyframes ap-sq1{0%{stroke-dashoffset:15;opacity:0}15%{opacity:1}40%{stroke-dashoffset:0;opacity:1}70%{opacity:0}100%{stroke-dashoffset:-15;opacity:0}}
        .ap-squiggle-2{stroke-dasharray:15;animation:ap-sq2 1.5s ease-in-out infinite 0.35s}
        @keyframes ap-sq2{0%{stroke-dashoffset:15;opacity:0}15%{opacity:1}40%{stroke-dashoffset:0;opacity:1}70%{opacity:0}100%{stroke-dashoffset:-15;opacity:0}}
        .ap-squiggle-3{stroke-dasharray:15;animation:ap-sq3 1.5s ease-in-out infinite 0.7s}
        @keyframes ap-sq3{0%{stroke-dashoffset:15;opacity:0}15%{opacity:0.6}40%{stroke-dashoffset:0;opacity:0.6}70%{opacity:0}100%{stroke-dashoffset:-15;opacity:0}}
        .ap-blink{animation:ap-bl .8s step-end infinite}
        @keyframes ap-bl{0%,100%{opacity:1}50%{opacity:0}}
        .ap-s1{stroke-dasharray:20;animation:ap-st 1.5s ease-in-out infinite 0s}
        .ap-s2{stroke-dasharray:20;animation:ap-st 1.5s ease-in-out infinite .2s}
        .ap-s3{stroke-dasharray:20;animation:ap-st 1.5s ease-in-out infinite .4s}
        .ap-s4{stroke-dasharray:20;animation:ap-st 1.5s ease-in-out infinite .6s}
        @keyframes ap-st{0%{stroke-dashoffset:20;opacity:.3}50%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:-20;opacity:.3}}
        .ap-verify{animation:ap-mg 2s ease-in-out infinite}
        @keyframes ap-mg{0%,100%{transform:translateX(0)}25%{transform:translateX(2px)}75%{transform:translateX(-2px)}}
        .ap-scan{animation:ap-sc 1.5s ease-in-out infinite}
        @keyframes ap-sc{0%,100%{transform:translateY(-2px);opacity:.4}50%{transform:translateY(2px);opacity:1}}
        .ap-breathe{animation:ap-br 3s ease-in-out infinite}
        @keyframes ap-br{0%,100%{opacity:.2}50%{opacity:.5}}
        /* Custom scrollbar for the demo */
        .app-preview-demo ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .app-preview-demo ::-webkit-scrollbar-track {
          background: ${S1};
          border-radius: 2px;
        }
        .app-preview-demo ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 2px;
        }
        .app-preview-demo ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.6);
        }
        .app-preview-demo * {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.4) ${S1};
        }
      `}</style>

      <div className="absolute -inset-12 rounded-3xl blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.08), transparent 70%)" }} />

      <div className="relative rounded-xl overflow-hidden app-preview-demo" style={{ background: S0, border: `1px solid ${BORDER}`, fontFamily: "'Inter', -apple-system, sans-serif", boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${BORDER}` }}>

        {/* ── macOS Title Bar ──────────────────────────────────────────── */}
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

        <MobilePreview isMobile={useIsMobile()} phase={phase} koryPhase={koryPhase} typed={typed} typeDone={typeDone} prompt={prompt} />

        <div className="hidden md:flex" style={{ height: 680 }}>

          {/* ── SIDEBAR (SessionSidebar.svelte) ───────────────────────── */}
          <nav className="shrink-0 flex flex-col" style={{ width: 220, background: S1, borderRight: `1px solid ${BORDER}` }}>
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-3 border-b" style={{ borderColor: BORDER }}>
              <span className="text-sm font-semibold leading-none" style={{ color: TEXT }}>Sessions</span>
              <div className="p-1.5 rounded-lg flex items-center justify-center" style={{ color: TEXT2 }}><Plus size={16} /></div>
            </div>
            {/* Search */}
            <div className="px-3 py-2">
              <div className="relative flex items-center">
                <Search size={14} className="absolute pointer-events-none" style={{ left: 10, color: MUTED }} />
                <div className="w-full h-8 rounded-lg text-xs flex items-center" style={{ paddingLeft: 32, background: S2, border: `1px solid ${BORDER}`, color: MUTED, fontSize: 12 }}>Search sessions...</div>
              </div>
            </div>
            {/* Session list */}
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
            {/* Sidebar footer */}
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
          </nav>

          {/* ── MAIN + GIT ────────────────────────────────────────────── */}
          <div className="flex-1 flex min-w-0">
            <div className="flex-1 flex flex-col min-w-0">

              {/* ── MenuBar (MenuBar.svelte) ─────────────────────────── */}
              <header className="flex items-center justify-between px-2 border-b shrink-0 select-none" style={{ height: 44, borderColor: BORDER, background: S1 }}>
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center w-9 h-9 mr-1 shrink-0 overflow-hidden" style={{ background: "transparent" }}>
                    <img src="/logo-64.png" alt="K" width={32} height={32} className="object-contain" />
                  </div>
                  {(["File", "Edit", "View"] as const).map(m => (
                    <span key={m} className="px-2 py-1 rounded-md" style={{ fontSize: 12, color: TEXT2 }}>{m}</span>
                  ))}
                  {koryPhase && (
                    <span className="flex items-center gap-2 min-w-0 max-w-[200px]">
                      <span style={{ fontSize: 11, color: MUTED }} aria-hidden>|</span>
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg" style={{ background: S2 }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs leading-none" style={{ color: TEXT2 }}>Kory: {koryPhase}</span>
                      </div>
                    </span>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: S2 }}>
                    <span className="text-sm font-medium" style={{ color: TEXT }}>Analytics Dashboard</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ color: MUTED }}>
                    <Search size={14} />
                    <span style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Commands</span>
                    <kbd style={{ fontSize: 9, padding: "1px 4px", borderRadius: 4, background: S3, border: `1px solid ${BORDER}`, color: MUTED, opacity: 0.6 }}>⌘K</kbd>
                  </button>
                  {phase >= 3 && (
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: S2 }}>
                      <Activity size={12} color="#34d399" />
                      <span className="text-xs leading-none" style={{ color: TEXT2 }}>3 agents</span>
                      <ChevronDown size={12} style={{ color: MUTED }} />
                    </button>
                  )}
                  <button className="p-2 rounded-lg flex items-center justify-center" style={{ color: MUTED }}>
                    <Settings size={18} />
                  </button>
                </div>
              </header>

              {/* ── WorkerCards (WorkerCard.svelte) ──────────────────── */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    className="flex gap-2 shrink-0 overflow-x-auto px-4 py-2 border-b"
                    style={{ borderColor: BORDER, background: S1 }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {WORKERS.map((w, i) => {
                      const ws = wStatus(w);
                      const agentStatus = wAgentStatus(w);
                      const isActive = ws === "active";
                      const tokens = wTokens(w);
                      const contextPct = w.ctxMax > 0 ? Math.min((tokens / w.ctxMax) * 100, 100) : 0;
                      const ctxColor = contextPct > 80 ? "#ef4444" : contextPct > 50 ? "#f59e0b" : "#22c55e";
                      const tool = wTool(w);
                      return (
                        <motion.div
                          key={w.id}
                          className="rounded-lg transition-all duration-500"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: isActive ? 1 : 0.6 }}
                          transition={{ delay: i * 0.1 }}
                          style={{
                            background: S2, border: `1px solid ${BORDER}`,
                            padding: isActive ? "8px 12px" : "6px 10px",
                            minWidth: 180, maxWidth: 240,
                            boxShadow: isActive ? `0 0 12px ${w.color}40` : "none",
                            filter: ws === "done" ? "none" : isActive ? "none" : "grayscale(0.5)",
                          }}
                        >
                          <div className="flex items-start justify-between" style={{ marginBottom: isActive ? 6 : 0 }}>
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center pt-0.5"><AnimatedStatusIcon status={agentStatus} size={isActive ? 16 : 14} /></div>
                              <span className="text-xs font-medium" style={{ color: TEXT, opacity: isActive ? 1 : 0.7 }}>{w.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {isActive
                                ? <><span className="text-[10px] capitalize px-1.5 py-0.5 rounded" style={{ background: S3, color: MUTED }}>{w.domain}</span><div className="p-0.5 rounded" style={{ color: MUTED }}><Square size={10} /></div></>
                                : <span style={{ fontSize: 9, color: MUTED, opacity: 0.4, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{ws}</span>}
                            </div>
                          </div>
                          {isActive && (
                            <div className="flex items-center justify-between mb-1.5">
                              <span style={{ fontSize: 11, color: agentStatus === "done" ? SUCCESS : TEXT2 }}>{wStatusText(w)}</span>
                              <span style={{ fontSize: 10, color: MUTED }}>({w.provider}) {w.model}</span>
                            </div>
                          )}
                          {isActive && tokens > 0 && (
                            <div className="mb-1">
                              <div className="flex items-center justify-between mb-0.5">
                                <span style={{ fontSize: 9, color: MUTED }}>Context</span>
                                <span style={{ fontSize: 9, color: MUTED }}>{Math.round(tokens / 1000)}k / {Math.round(w.ctxMax / 1000)}k</span>
                              </div>
                              <div className="h-1 rounded-full overflow-hidden" style={{ background: S3 }}>
                                <motion.div className="h-full rounded-full" style={{ background: ctxColor }} initial={{ width: 0 }} animate={{ width: `${contextPct}%` }} transition={{ duration: 1.5 }} />
                              </div>
                            </div>
                          )}
                          {isActive && tool && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              <span style={{ fontSize: 10, padding: "1px 4px", borderRadius: 4, background: S3, color: ACCENT }}>{tool}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── ManagerFeed (ManagerFeed.svelte + FeedEntry.svelte) ── */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex items-center justify-between px-4 border-b shrink-0" style={{ height: 40, borderColor: BORDER, background: S1 }}>
                  <span className="flex items-center gap-2 text-sm font-medium" style={{ color: TEXT2 }}><MessageSquare size={16} />Agent feed</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ background: S0 }}>
                  {/* Empty state */}
                  {phase === 0 && (
                    <div className="flex flex-col items-center justify-center text-center h-full max-w-2xl mx-auto py-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(245,158,11,0.10)", color: WARNING }}><MessageSquare size={24} /></div>
                      <h2 className="text-lg font-semibold mb-1" style={{ color: TEXT }}>Ready for your request</h2>
                      <p className="text-sm mb-5" style={{ color: MUTED }}>Start a new project or collaborate with specialized agents on your existing code.</p>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {[
                          { label: "Build a new UI component", Icon: Paintbrush, prompt: "Build a beautiful, responsive landing page using Tailwind and Svelte." },
                          { label: "Debug an issue", Icon: Bug, prompt: "Help me find and fix a bug in my authentication logic." },
                          { label: "Refactor for performance", Icon: Zap, prompt: "Analyze my code and suggest performance optimizations." },
                          { label: "Write unit tests", Icon: Beaker, prompt: "Generate comprehensive unit tests for my backend API routes." },
                        ].map(s => (
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
                    <motion.div className="flex flex-col group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-start gap-3 py-2 text-sm leading-relaxed rounded px-3 -mx-2">
                        <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:01</span>
                        <div className="shrink-0 flex items-center justify-center w-5 h-6"><Send size={14} color={ACCENT} /></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold tracking-wide" style={{ color: ACCENT }}>you</span>
                          <div className="mt-1" style={{ color: TEXT, fontSize: 13 }}>
                            {typed}{!typeDone && <span className="inline-block w-2 h-4 ml-0.5 animate-pulse align-middle" style={{ background: ACCENT }} />}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Manager analyzing */}
                  {phase >= 2 && (
                    <motion.div className="flex flex-col group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                      <div className="flex items-start gap-3 py-2 text-sm leading-relaxed rounded px-3 -mx-2">
                        <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:03</span>
                        <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase < 3 ? "analyzing" : "done"} size={14} isManager /></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>manager</span>
                          <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>analyzing</span>
                          <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>classifying domain... decomposing into 3 subtasks</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Manager routing */}
                  {phase >= 3 && (
                    <motion.div className="flex flex-col group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-start gap-3 py-2 text-sm leading-relaxed rounded px-3 -mx-2">
                        <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:05</span>
                        <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="done" size={14} isManager /></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>manager</span>
                          <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>routing</span>
                          <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>frontend → gpt-5.3-codex · backend → gemini-3.1-pro · tests → claude-sonnet-4.6</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Worker entries */}
                  {phase >= 4 && (
                    <div className="ml-20 border-l-2 pl-4 py-1 space-y-1 my-1" style={{ borderColor: `${SUCCESS}30` }}>
                      {[
                        { time: "14:32:08", nameColor: "#00cccc", name: "worker:frontend", file: "src/components/Dashboard.svelte", lines: "+78 lines" },
                        { time: "14:32:09", nameColor: "#4285f4", name: "worker:backend", file: "src/routes/api/analytics/+server.ts", lines: "+45 lines" },
                      ].map((e, i) => (
                        <motion.div key={e.name} className="flex items-start gap-3 py-1 text-sm rounded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                          <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>{e.time}</span>
                          <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold tracking-wide" style={{ color: e.nameColor }}>{e.name}</span>
                            <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: e.nameColor, opacity: 0.5, background: `${e.nameColor}12` }}>write_file</span>
                            <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>{e.file} <span style={{ color: `${TEXT}30` }}>{e.lines}</span></div>
                          </div>
                        </motion.div>
                      ))}
                      {phase >= 5 && [
                        { time: "14:32:12", nameColor: "#00cccc", name: "worker:frontend", file: "src/components/ChartCard.svelte", lines: "+52 lines" },
                        { time: "14:32:13", nameColor: "#00cc66", name: "worker:testing", file: "tests/analytics.test.ts", lines: "+62 lines" },
                      ].map((e, i) => (
                        <motion.div key={e.name + "b"} className="flex items-start gap-3 py-1 text-sm rounded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                          <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>{e.time}</span>
                          <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold tracking-wide" style={{ color: e.nameColor }}>{e.name}</span>
                            <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: e.nameColor, opacity: 0.5, background: `${e.nameColor}12` }}>write_file</span>
                            <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>{e.file} <span style={{ color: `${TEXT}30` }}>{e.lines}</span></div>
                          </div>
                        </motion.div>
                      ))}
                      {phase >= 6 && (
                        <motion.div className="flex items-start gap-3 py-1 text-sm rounded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                          <span className="text-xs shrink-0 w-16 leading-6 tabular-nums" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:16</span>
                          <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={14} /></div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold tracking-wide" style={{ color: "#4285f4" }}>worker:backend</span>
                            <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: "#4285f4", opacity: 0.5, background: "#4285f412" }}>write_file</span>
                            <div className="mt-0.5" style={{ color: TEXT2, fontSize: 12 }}>src/lib/db/queries.ts <span style={{ color: `${TEXT}30` }}>+33 lines</span></div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Critic */}
                  {phase >= 7 && (
                    <motion.div className="flex flex-col group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-start gap-3 py-2 text-sm leading-relaxed rounded px-3 -mx-2">
                        <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:19</span>
                        <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="verifying" size={14} /></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold tracking-wide" style={{ color: WARNING }}>critic</span>
                          <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: WARNING, opacity: 0.5, background: `${WARNING}12` }}>reviewing</span>
                          <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>reviewed 5 files across 3 workers... <motion.span style={{ color: SUCCESS, fontWeight: 600 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>PASS</motion.span><span style={{ color: `${TEXT}25` }}> — no issues</span></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Shadow commit */}
                  {phase >= 8 && (
                    <motion.div className="flex flex-col group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="flex items-start gap-3 py-2 text-sm leading-relaxed rounded px-3 -mx-2">
                        <span className="text-xs shrink-0 w-16 leading-6 tabular-nums pt-0.5" style={{ color: MUTED, fontFamily: "'JetBrains Mono', monospace" }}>14:32:21</span>
                        <div className="shrink-0 flex items-center justify-center w-5 h-6 pt-1"><AnimatedStatusIcon status="done" size={14} /></div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold tracking-wide" style={{ color: "#8b5cf6" }}>shadow</span>
                          <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ color: "#8b5cf6", opacity: 0.5, background: "#8b5cf612" }}>ghost-commit</span>
                          <div className="mt-1" style={{ color: TEXT2, fontSize: 12 }}>saved → <span style={{ color: `${TEXT}30`, fontFamily: "monospace" }}>a3f2c1d</span> · undo available</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Stats */}
                  {phase >= 8 && (
                    <motion.div className="flex items-center gap-4 px-3" style={{ paddingTop: 8, marginTop: 4, borderTop: `1px solid ${BORDER}`, fontSize: 10, color: MUTED }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <span>5 files changed</span><span>270 lines added</span><span>6,841 tokens</span><span style={{ color: WARNING }}>$0.12 total</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ── CommandInput (CommandInput.svelte) ───────────────── */}
              <div className="shrink-0 border-t" style={{ borderColor: BORDER, background: S1 }}>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3 mb-3">
                    <button className="flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium" style={{ background: S3, color: TEXT, border: `1px solid ${BORDER}` }}>
                      <Sparkles size={16} color="#fbbf24" /><span>Auto</span><ChevronDown size={14} style={{ color: MUTED }} />
                    </button>
                    <button className="flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium" style={{ background: S3, color: TEXT, border: `1px solid ${BORDER}` }}>
                      {/* BrainCog icon for Medium - exact from Lucide */}
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
            </div>

            {/* ── SourceControlPanel (SourceControlPanel.svelte) ─────── */}
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
                <textarea readOnly value={phase >= 8 ? "feat: analytics dashboard" : ""} placeholder="Message (⌘+Enter to commit)" className="w-full text-xs resize-none mb-1 font-sans" style={{ height: 52, background: S2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: phase >= 8 ? TEXT2 : `${MUTED}60`, outline: "none" }} />
                <div className="flex items-center justify-between mb-2" style={{ fontSize: 10 }}><span /><span style={{ color: MUTED }}>{phase >= 8 ? "23" : "0"}/72</span></div>
                <button disabled={phase < 8} className="w-full text-xs py-1.5 flex items-center justify-center gap-2 rounded" style={{ background: phase >= 8 ? ACCENT : S3, color: phase >= 8 ? "white" : MUTED, fontWeight: 600, border: "none" }}><Check size={12} /> Commit</button>
              </div>
              {phase >= 8 && (
                <motion.div className="flex items-center gap-3 px-4 py-2 border-b" style={{ borderColor: BORDER, background: S2, fontSize: 10 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="font-medium" style={{ color: "#4ade80" }}>5 added</span></motion.div>
              )}
              <div className="flex-1 overflow-y-auto">
                {phase >= 8 ? (
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile Preview Component ─────────────────────────────────────────── */
function MobilePreview({ isMobile, phase, koryPhase, typed, typeDone, prompt }: { 
  isMobile: boolean; 
  phase: number; 
  koryPhase: string | null;
  typed: string;
  typeDone: boolean;
  prompt: string;
}) {
  if (!isMobile) return null;
  
  function wStatus(w: typeof WORKERS[0]): "idle" | "active" | "done" { return phase >= 7 ? "done" : phase >= 3 ? "active" : "idle"; }
  function wAgentStatus(w: typeof WORKERS[0]): string { return phase >= 7 ? "done" : phase >= 4 ? "tool_calling" : phase >= 3 ? "thinking" : "idle"; }
  function wTokens(w: typeof WORKERS[0]) { return phase >= 5 ? (w.id === "frontend" ? 34200 : w.id === "backend" ? 28700 : 22100) : phase >= 3 ? (w.id === "frontend" ? 8100 : w.id === "backend" ? 5300 : 4200) : 0; }
  function wStatusText(w: typeof WORKERS[0]) { return phase >= 7 ? "Complete" : phase >= 4 ? (w.id === "frontend" ? "Tool: write_file" : w.id === "backend" ? "Generating..." : "Tool: write_file") : phase >= 3 ? "Thinking..." : "Idle"; }
  
  return (
    <div className="md:hidden flex flex-col" style={{ height: 520, background: S0 }}>
      {/* Mobile Header */}
      <header className="flex items-center justify-between px-3 py-2 border-b shrink-0" style={{ borderColor: BORDER, background: S1 }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 shrink-0 overflow-hidden" style={{ background: "transparent" }}>
            <img src="/logo-64.png" alt="K" width={24} height={24} className="object-contain" />
          </div>
          {koryPhase && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: S2 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px]" style={{ color: TEXT2 }}>Kory: {koryPhase}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {phase >= 3 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: S2 }}>
              <Activity size={10} color="#34d399" />
              <span className="text-[10px]" style={{ color: TEXT2 }}>3 agents</span>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Worker Cards - Horizontal scroll */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="flex gap-2 overflow-x-auto px-3 py-2 border-b shrink-0"
            style={{ borderColor: BORDER, background: S1 }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {WORKERS.map((w, i) => {
              const ws = wStatus(w);
              const agentStatus = wAgentStatus(w);
              const isActive = ws === "active";
              const tokens = wTokens(w);
              const contextPct = w.ctxMax > 0 ? Math.min((tokens / w.ctxMax) * 100, 100) : 0;
              const ctxColor = contextPct > 80 ? "#ef4444" : contextPct > 50 ? "#f59e0b" : "#22c55e";
              return (
                <motion.div
                  key={w.id}
                  className="rounded-lg shrink-0"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: isActive ? 1 : 0.6 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: S2, border: `1px solid ${BORDER}`,
                    padding: "6px 10px",
                    minWidth: 140,
                    boxShadow: isActive ? `0 0 8px ${w.color}40` : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <AnimatedStatusIcon status={agentStatus} size={12} />
                      <span className="text-[11px] font-medium" style={{ color: TEXT }}>{w.name}</span>
                    </div>
                    {isActive && <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: S3, color: MUTED }}>{w.domain}</span>}
                  </div>
                  {isActive && (
                    <>
                      <div className="flex items-center justify-between mt-1">
                        <span style={{ fontSize: 9, color: agentStatus === "done" ? SUCCESS : TEXT2 }}>{wStatusText(w)}</span>
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
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Feed */}
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
                {["UI Component", "Debug Issue", "Performance", "Unit Tests"].map((label) => (
                  <div key={label} className="p-2 rounded-lg border text-center" style={{ background: S2, borderColor: BORDER }}>
                    <span className="text-[10px]" style={{ color: TEXT }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User message */}
          {phase >= 1 && (
            <motion.div className="mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: `${ACCENT}10` }}>
                <Send size={12} color={ACCENT} className="mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>you</span>
                  <div className="mt-0.5 text-xs" style={{ color: TEXT }}>
                    {typed}{!typeDone && <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse align-middle" style={{ background: ACCENT }} />}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Manager analyzing */}
          {phase >= 2 && (
            <motion.div className="mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }}>
                <AnimatedStatusIcon status={phase < 3 ? "analyzing" : "done"} size={12} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: WARNING }}>manager</span>
                  <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: WARNING, background: `${WARNING}20` }}>analyzing</span>
                  <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>decomposing into 3 subtasks...</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Manager routing */}
          {phase >= 3 && (
            <motion.div className="mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }}>
                <AnimatedStatusIcon status="done" size={12} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: WARNING }}>manager</span>
                  <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: WARNING, background: `${WARNING}20` }}>routing</span>
                  <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>frontend • backend • testing</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Worker entries */}
          {phase >= 4 && (
            <div className="space-y-2 mb-2">
              {[
                { time: "14:32", nameColor: "#00cccc", name: "frontend", file: "Dashboard.svelte" },
                { time: "14:32", nameColor: "#4285f4", name: "backend", file: "+server.ts" },
              ].map((e) => (
                <motion.div key={e.name} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: S2 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <AnimatedStatusIcon status={phase >= 7 ? "done" : "tool_calling"} size={12} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold" style={{ color: e.nameColor }}>{e.name}</span>
                    <div className="text-[11px] truncate" style={{ color: TEXT2 }}>{e.file}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Critic */}
          {phase >= 7 && (
            <motion.div className="mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
            </motion.div>
          )}

          {/* Shadow commit */}
          {phase >= 8 && (
            <motion.div className="mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}>
                <AnimatedStatusIcon status="done" size={12} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold" style={{ color: "#8b5cf6" }}>shadow</span>
                  <span className="ml-1.5 text-[8px] px-1 py-0.5 rounded" style={{ color: "#8b5cf6", background: "#8b5cf620" }}>commit</span>
                  <div className="mt-0.5 text-[11px]" style={{ color: TEXT2 }}>saved → a3f2c1d</div>
                </div>
              </div>
            </motion.div>
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
