"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/*
 * Exact replica of the Koryphaios desktop app UI.
 * Colors, spacing, and layout are synced with the real frontend codebase:
 *   - surface-0: #0a0a0b  surface-1: #111113  surface-2: #1a1a1e  surface-3: #242428
 *   - border: #2a2a30  text-primary: #e8e8ed  text-secondary: #8b8b96  text-muted: #5a5a66
 *   - accent: #6366f1  success: #22c55e  error: #ef4444  warning: #f59e0b
 *   - font: Inter  monospace: JetBrains Mono
 *   - sidebar: 240px  header: 48px  git-panel: 320px
 */

const S0 = "#0a0a0b";
const S1 = "#111113";
const S2 = "#1a1a1e";
const S3 = "#242428";
const S4 = "#2e2e34";
const BORDER = "#2a2a30";
const TEXT = "#e8e8ed";
const TEXT2 = "#8b8b96";
const MUTED = "#5a5a66";
const ACCENT = "#6366f1";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";

/* Typing animation */
function useTypingEffect(text: string, speed: number, startDelay: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setDisplayed(""); setDone(false);
    let i = 0;
    const d = setTimeout(() => {
      const iv = setInterval(() => {
        i++; setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(d);
  }, [text, speed, startDelay, active]);
  return { displayed, done };
}

/* Status icon (matches real AnimatedStatusIcon.svelte) */
function StatusIcon({ color, status }: { color: string; status: "active" | "done" | "idle" }) {
  if (status === "done") return (
    <span className="flex items-center justify-center" style={{ width: 16, height: 16 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SUCCESS} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
  if (status === "active") return (
    <span className="relative flex items-center justify-center" style={{ width: 16, height: 16 }}>
      <span className="absolute inset-0 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: color }} />
      <span className="rounded-full" style={{ width: 6, height: 6, background: color }} />
    </span>
  );
  return <span className="rounded-full opacity-40" style={{ width: 8, height: 8, background: color }} />;
}

/* Context bar (matches real WorkerCard context bar) */
function CtxBar({ used, max, color }: { used: number; max: number; color: string }) {
  const pct = Math.min((used / max) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
        <span style={{ fontSize: 9, color: MUTED }}>Context</span>
        <span style={{ fontSize: 9, color: MUTED }}>{Math.round(used / 1000)}k / {Math.round(max / 1000)}k</span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 4, background: S4 }}>
        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.5, ease: "easeOut" }} />
      </div>
    </div>
  );
}

/* Feed entry (matches real FeedEntry.svelte) */
function FeedRow({ icon, label, labelColor, tag, children, delay, time }: {
  icon: React.ReactNode; label: string; labelColor: string; tag?: string; children: React.ReactNode; delay: number; time?: string;
}) {
  return (
    <motion.div className="flex items-start gap-2" style={{ padding: "3px 0" }} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay }}>
      {time && <span className="shrink-0 tabular-nums" style={{ fontSize: 10, color: MUTED, fontFamily: "'JetBrains Mono', monospace", width: 52, marginTop: 2 }}>{time}</span>}
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="shrink-0" style={{ fontSize: 12, fontWeight: 500, color: labelColor }}>{label}</span>
      {tag && <span style={{ fontSize: 10, color: labelColor, opacity: 0.5, background: `${labelColor}12`, padding: "1px 4px", borderRadius: 4 }}>{tag}</span>}
      <span style={{ fontSize: 12, color: TEXT2, lineHeight: 1.5 }}>{children}</span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export default function AppPreview() {
  const [phase, setPhase] = useState(0);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 6200),
      setTimeout(() => setPhase(6), 7400),
      setTimeout(() => setPhase(7), 8800),
      setTimeout(() => setPhase(8), 10200),
    ];
    const r = setTimeout(() => { setPhase(0); setLoop(l => l + 1); }, 14000);
    return () => { t.forEach(clearTimeout); clearTimeout(r); };
  }, [loop]);

  const prompt = "build a full-stack analytics dashboard with charts, API routes, and tests";
  const { displayed: typed, done: typeDone } = useTypingEffect(prompt, 25, 400, phase >= 0);

  type Worker = { id: string; name: string; domain: string; color: string; provider: string; model: string; ctxMax: number; };
  const workers: Worker[] = [
    { id: "frontend", name: "frontend", domain: "ui", color: "#00ffff", provider: "OpenAI", model: "gpt-5.3-codex", ctxMax: 500000 },
    { id: "backend", name: "backend", domain: "backend", color: "#4285f4", provider: "Google", model: "gemini-3.1-pro", ctxMax: 1000000 },
    { id: "testing", name: "testing", domain: "test", color: "#00ff80", provider: "Anthropic", model: "claude-sonnet-4.6", ctxMax: 1000000 },
  ];

  function workerStatus(w: Worker) {
    if (phase >= 7) return "done" as const;
    if (phase >= 3) return "active" as const;
    return "idle" as const;
  }

  function workerTokens(w: Worker) {
    if (phase >= 5) return w.id === "frontend" ? 34200 : w.id === "backend" ? 28700 : 22100;
    if (phase >= 3) return w.id === "frontend" ? 8100 : w.id === "backend" ? 5300 : 4200;
    return 0;
  }

  function workerStatusText(w: Worker) {
    if (phase >= 7) return "Complete";
    if (phase >= 4) return w.id === "frontend" ? "Tool: write_file" : w.id === "backend" ? "Generating..." : "Tool: write_file";
    if (phase >= 3) return "Thinking...";
    return "Idle";
  }

  const changedFiles = [
    { file: "Dashboard.svelte", status: "A" },
    { file: "ChartCard.svelte", status: "A" },
    { file: "+server.ts", status: "A" },
    { file: "queries.ts", status: "A" },
    { file: "analytics.test.ts", status: "A" },
  ];

  const sessions = [
    { name: "Analytics Dashboard", active: true, time: "just now", msgs: 12, cost: "$0.08" },
    { name: "Auth refactor", active: false, time: "2h ago", msgs: 34, cost: "$0.21" },
    { name: "CI pipeline fixes", active: false, time: "5h ago", msgs: 18, cost: "$0.14" },
    { name: "API v2 migration", active: false, time: "1d ago", msgs: 45, cost: "$0.37" },
  ];

  return (
    <motion.div className="relative mx-auto max-w-6xl" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="absolute -inset-8 rounded-3xl blur-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.06), transparent 70%)" }} />

      <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/60" style={{ background: S0, border: `1px solid ${BORDER}`, fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <div className="flex" style={{ height: 460 }}>

          {/* LEFT SIDEBAR (scaled from 240px real) */}
          <div className="shrink-0 flex flex-col" style={{ width: 200, background: S1, borderRight: `1px solid ${BORDER}` }}>

            {/* Logo header */}
            <div className="flex items-center justify-between shrink-0" style={{ height: 48, padding: "0 16px", borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-3">
                <div className="rounded-lg flex items-center justify-center shrink-0" style={{ width: 28, height: 28, background: "linear-gradient(135deg, #facc15, #d97706)", color: S0, fontSize: 12, fontWeight: 700 }}>K</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>Koryphaios</div>
                  <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.2 }}>v0.1.0</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </div>

            {/* Session list (matches SessionSidebar.svelte) */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between shrink-0" style={{ padding: "8px 12px", borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>Sessions</span>
                <div className="flex items-center justify-center rounded-md" style={{ width: 24, height: 24, color: MUTED, cursor: "default" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>
              <div style={{ padding: "6px 12px", borderBottom: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-2 rounded-md" style={{ padding: "5px 8px", background: S2, border: `1px solid ${BORDER}`, fontSize: 11, color: MUTED }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Search sessions...
                </div>
              </div>
              {sessions.map(s => (
                <div key={s.name} className="flex items-center gap-2" style={{ padding: "8px 16px", borderLeft: s.active ? `2px solid ${TEXT}` : "2px solid transparent", background: s.active ? `${ACCENT}08` : "transparent" }}>
                  {s.active && phase >= 1 && phase < 8 ? (
                    <StatusIcon color={WARNING} status="active" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.active ? TEXT : MUTED} strokeWidth="2" style={{ opacity: s.active ? 0.7 : 0.3 }}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate" style={{ fontSize: 12, fontWeight: s.active ? 500 : 400, color: s.active ? TEXT : TEXT2 }}>{s.name}</div>
                    <div className="flex items-center gap-2" style={{ fontSize: 10, color: MUTED }}>
                      <span>{s.time}</span>
                      <span>&middot;</span>
                      <span>{s.msgs} msgs</span>
                      <span>&middot;</span>
                      <span>{s.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between shrink-0" style={{ height: 40, padding: "0 12px", borderTop: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2">
                <span className="relative inline-flex">
                  <span className="animate-ping absolute rounded-full opacity-40" style={{ width: 8, height: 8, background: SUCCESS }} />
                  <span className="relative rounded-full" style={{ width: 8, height: 8, background: SUCCESS }} />
                </span>
                <span className="capitalize" style={{ fontSize: 11, color: MUTED }}>connected</span>
              </div>
              <span style={{ fontSize: 10, color: MUTED, background: S3, padding: "2px 6px", borderRadius: 4 }}>5 providers</span>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* MenuBar */}
            <header className="flex items-center justify-between shrink-0 select-none" style={{ height: 44, padding: "0 8px", borderBottom: `1px solid ${BORDER}`, background: S1 }}>
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1a1a1c, #2a2a2e)", border: `1px solid ${BORDER}`, marginRight: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><polygon points="9,1 16.5,5 16.5,13 9,17 1.5,13 1.5,5" fill="#1a1a1c" stroke="#c9943a" strokeWidth="1.2"/><text x="9" y="12.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="bold" fill="#d4a537">K</text></svg>
                </div>
                {["File", "Edit", "View"].map(m => (
                  <span key={m} className="rounded-md" style={{ padding: "4px 8px", fontSize: 12, color: TEXT2, cursor: "default" }}>{m}</span>
                ))}
                {phase >= 1 && phase < 8 && (
                  <div className="flex items-center gap-2 rounded-lg" style={{ padding: "4px 10px", background: S2, marginLeft: 4 }}>
                    <span className="animate-pulse rounded-full" style={{ width: 6, height: 6, background: "#fbbf24" }} />
                    <span style={{ fontSize: 11, color: TEXT2 }}>Kory: {phase < 3 ? "analyzing" : phase < 7 ? "executing" : "reviewing"}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 rounded-lg" style={{ padding: "4px 10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", marginLeft: 4 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f87171" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", color: "#f87171", textTransform: "uppercase" }}>YOLO</span>
                </div>
              </div>
              <div className="rounded-md" style={{ padding: "4px 12px", background: S2 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: TEXT }}>Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex items-center gap-1.5 rounded-md" style={{ padding: "4px 8px", color: ACCENT, fontSize: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>
                  Git
                </button>
                <button className="flex items-center gap-1.5 rounded-md" style={{ padding: "4px 8px", color: MUTED }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Commands</span>
                  <kbd style={{ fontSize: 9, padding: "1px 4px", borderRadius: 4, background: S3, border: `1px solid ${BORDER}`, color: MUTED }}>&#x2318;K</kbd>
                </button>
                {phase >= 3 && (
                  <button className="flex items-center gap-1.5 rounded-lg" style={{ padding: "6px 10px", background: S2 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SUCCESS} strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    <span style={{ fontSize: 11, color: TEXT2 }}>3 agents</span>
                  </button>
                )}
                <button className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, color: MUTED }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                </button>
              </div>
            </header>

            {/* Agent cards strip */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div className="flex gap-2 shrink-0 overflow-x-auto" style={{ padding: "8px 16px", borderBottom: `1px solid ${BORDER}`, background: S1 }} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  {workers.map((w, i) => {
                    const ws = workerStatus(w);
                    const isActive = ws === "active";
                    return (
                      <motion.div key={w.id} className="rounded-lg text-left transition-all" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: isActive ? 1 : 0.6 }} transition={{ delay: i * 0.1 }} style={{
                        background: S2,
                        border: `1px solid ${BORDER}`,
                        padding: "8px 12px",
                        minWidth: 180, maxWidth: 240,
                        boxShadow: isActive ? `0 0 12px ${w.color}40` : "none",
                        filter: ws === "done" ? "none" : isActive ? "none" : "grayscale(0.5)",
                      }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: isActive ? 6 : 0 }}>
                          <div className="flex items-center gap-1.5">
                            <StatusIcon color={w.color} status={ws} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: TEXT }}>{w.name}</span>
                          </div>
                          <span style={{ fontSize: 10, color: MUTED, background: S3, padding: "1px 6px", borderRadius: 4 }}>{w.domain}</span>
                        </div>
                        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                          <span style={{ fontSize: 11, color: ws === "done" ? SUCCESS : TEXT2 }}>{workerStatusText(w)}</span>
                          <span style={{ fontSize: 10, color: MUTED }}>({w.provider}) {w.model}</span>
                        </div>
                        <CtxBar used={workerTokens(w)} max={w.ctxMax} color={ws === "done" ? SUCCESS : w.color} />
                        {isActive && phase >= 4 && (
                          <div className="flex gap-1 mt-1">
                            <span style={{ fontSize: 10, padding: "1px 4px", borderRadius: 4, background: S3, color: ACCENT }}>write_file</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feed area (matches ManagerFeed.svelte + FeedEntry.svelte) */}
            <div className="flex-1 overflow-hidden" style={{ padding: "12px 16px", fontSize: 12 }}>
              {phase >= 0 && (
                <motion.div className="flex items-start gap-2" style={{ padding: "3px 0" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="shrink-0 tabular-nums" style={{ fontSize: 10, color: MUTED, fontFamily: "'JetBrains Mono', monospace", width: 52, marginTop: 2 }}>14:32:01</span>
                  <span className="shrink-0" style={{ marginTop: 1, color: ACCENT }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg>
                  </span>
                  <span style={{ fontSize: 12 }}>
                    <span style={{ color: ACCENT, fontWeight: 600 }}>you</span>{" "}
                    <span style={{ color: `${TEXT}99` }}>{typed}</span>
                    {!typeDone && <span className="animate-pulse" style={{ color: ACCENT }}>&#x2588;</span>}
                  </span>
                </motion.div>
              )}

              {phase >= 1 && (
                <FeedRow icon={<StatusIcon color={WARNING} status={phase < 2 ? "active" : "done"} />} label="manager" labelColor={WARNING} tag="analyzing" delay={0} time="14:32:03">
                  classifying domain... decomposing into 3 subtasks
                </FeedRow>
              )}
              {phase >= 2 && (
                <FeedRow icon={<StatusIcon color={WARNING} status="done" />} label="manager" labelColor={WARNING} tag="routing" delay={0} time="14:32:05">
                  frontend &rarr; gpt-5.3-codex &middot; backend &rarr; gemini-3.1-pro &middot; tests &rarr; claude-sonnet-4.6
                </FeedRow>
              )}

              {phase >= 4 && (
                <div style={{ borderLeft: `2px solid ${SUCCESS}30`, paddingLeft: 12, marginLeft: 56, marginTop: 4, marginBottom: 4 }}>
                  <FeedRow icon={<StatusIcon color="#00ffff" status={phase >= 7 ? "done" : "active"} />} label="worker:frontend" labelColor="#00cccc" tag="write_file" delay={0} time="14:32:08">
                    src/components/Dashboard.svelte <span style={{ color: `${TEXT}30` }}>+78 lines</span>
                  </FeedRow>
                  <FeedRow icon={<StatusIcon color="#4285f4" status={phase >= 7 ? "done" : "active"} />} label="worker:backend" labelColor="#4285f4" tag="write_file" delay={0.1} time="14:32:09">
                    src/routes/api/analytics/+server.ts <span style={{ color: `${TEXT}30` }}>+45 lines</span>
                  </FeedRow>
                  {phase >= 5 && (
                    <FeedRow icon={<StatusIcon color="#00ffff" status={phase >= 7 ? "done" : "active"} />} label="worker:frontend" labelColor="#00cccc" tag="write_file" delay={0} time="14:32:12">
                      src/components/ChartCard.svelte <span style={{ color: `${TEXT}30` }}>+52 lines</span>
                    </FeedRow>
                  )}
                  {phase >= 5 && (
                    <FeedRow icon={<StatusIcon color="#00ff80" status={phase >= 7 ? "done" : "active"} />} label="worker:testing" labelColor="#00cc66" tag="write_file" delay={0.15} time="14:32:13">
                      tests/analytics.test.ts <span style={{ color: `${TEXT}30` }}>+62 lines</span>
                    </FeedRow>
                  )}
                  {phase >= 6 && (
                    <FeedRow icon={<StatusIcon color="#4285f4" status={phase >= 7 ? "done" : "active"} />} label="worker:backend" labelColor="#4285f4" tag="write_file" delay={0.1} time="14:32:16">
                      src/lib/db/queries.ts <span style={{ color: `${TEXT}30` }}>+33 lines</span>
                    </FeedRow>
                  )}
                </div>
              )}

              {phase >= 7 && (
                <FeedRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={WARNING} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>} label="critic" labelColor={WARNING} tag="reviewing" delay={0} time="14:32:19">
                  reviewed 5 files across 3 workers...{" "}
                  <motion.span style={{ color: SUCCESS, fontWeight: 600 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>PASS</motion.span>
                  <span style={{ color: `${TEXT}25` }}> &mdash; no issues</span>
                </FeedRow>
              )}
              {phase >= 8 && (
                <FeedRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>} label="shadow" labelColor="#8b5cf6" tag="ghost-commit" delay={0} time="14:32:21">
                  saved &rarr; <span style={{ color: `${TEXT}30`, fontFamily: "monospace" }}>a3f2c1d</span> &middot; undo available
                </FeedRow>
              )}
              {phase >= 8 && (
                <motion.div className="flex items-center gap-4" style={{ paddingTop: 8, marginTop: 8, borderTop: `1px solid ${BORDER}`, fontSize: 10, color: MUTED }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <span>5 files changed</span><span>270 lines added</span><span>6,841 tokens</span><span style={{ color: WARNING }}>$0.12 total</span>
                </motion.div>
              )}
            </div>

            {/* Context bar */}
            <div className="flex items-center gap-3 shrink-0" style={{ padding: "8px 16px", borderTop: `1px solid ${BORDER}`, background: S1 }}>
              <span style={{ fontSize: 11, color: MUTED }}>Context</span>
              <div className="flex-1 rounded-full overflow-hidden" style={{ height: 6, background: S3 }}>
                <motion.div className="h-full rounded-full" style={{ background: phase >= 8 ? SUCCESS : ACCENT }} initial={{ width: "2%" }} animate={{ width: phase >= 8 ? "8%" : phase >= 4 ? "5%" : "2%" }} transition={{ duration: 1.5 }} />
              </div>
              <span className="tabular-nums" style={{ fontSize: 11, color: MUTED }}>
                {phase >= 8 ? "12.4k" : phase >= 4 ? "6.2k" : "1.1k"} / 1000.0k
              </span>
            </div>

            {/* CommandInput */}
            <div className="shrink-0" style={{ borderTop: `1px solid ${BORDER}`, background: S1, padding: "12px 16px" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
                <button className="flex items-center gap-2 rounded-lg" style={{ height: 36, padding: "0 12px", background: S3, color: TEXT, fontSize: 13, fontWeight: 500, border: `1px solid ${BORDER}` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><path d="M12 2L9.5 8.5 3 9.5l5 4.5L6.5 21 12 17.5 17.5 21 16 14l5-4.5-6.5-1z"/></svg>
                  Auto
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <button className="flex items-center gap-2 rounded-lg" style={{ height: 36, padding: "0 12px", background: S3, color: TEXT, fontSize: 13, fontWeight: 500, border: `1px solid ${BORDER}` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5"><path d="M12 2a9 9 0 019 9c0 3.9-2.5 7.2-6 8.5V21H9v-1.5C5.5 18.2 3 14.9 3 11a9 9 0 019-9z"/></svg>
                  Medium
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 rounded-lg" style={{ background: S2, border: `1px solid ${BORDER}`, padding: "14px 16px", fontSize: 14, color: MUTED, minHeight: 48 }}>
                  Describe what you want to build...
                </div>
                <button className="flex items-center justify-center gap-2 rounded-lg self-end shrink-0" style={{ minWidth: 80, height: 48, padding: "0 20px", background: ACCENT, color: "white", fontSize: 14, fontWeight: 600, border: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9"/></svg>
                  Send
                </button>
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                <span style={{ fontSize: 11, color: MUTED }}>Enter to send &middot; Shift+Enter for new line</span>
              </div>
            </div>
          </div>

          {/* RIGHT: SOURCE CONTROL PANEL */}
          <div className="shrink-0 flex flex-col" style={{ width: 200, background: S1, borderLeft: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between shrink-0" style={{ padding: "12px 12px", borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT2} strokeWidth="2"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>
                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Source Control</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            </div>
            <div className="flex items-center gap-1.5 shrink-0" style={{ padding: "6px 12px", borderBottom: `1px solid ${BORDER}` }}>
              <button className="flex items-center gap-1 rounded" style={{ padding: "2px 6px", background: S3, fontSize: 10, color: MUTED }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>
                main
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden" style={{ padding: "8px 12px" }}>
              {phase >= 8 ? (
                <>
                  <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                    <div className="flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
                      <span style={{ fontSize: 10, color: MUTED, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Staged Changes ({changedFiles.length})</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  {changedFiles.map((f, i) => (
                    <motion.div key={f.file} className="flex items-center gap-2" style={{ padding: "3px 0", fontSize: 11 }} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#4ade80", background: "rgba(74,222,128,0.12)", padding: "0 4px", borderRadius: 3 }}>{f.status}</span>
                      <span className="truncate flex-1" style={{ color: TEXT2 }}>{f.file}</span>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-3" style={{ marginTop: 8, fontSize: 10, color: MUTED }}>
                    <span style={{ color: "#4ade80" }}>5 added</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1" style={{ paddingTop: 32, opacity: 0.5 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 11, color: MUTED }}>Working tree clean</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}`, padding: "8px 12px" }}>
              {phase >= 8 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  <textarea readOnly style={{ width: "100%", height: 20, resize: "none", background: S2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: TEXT2, fontFamily: "inherit", outline: "none" }} value="feat: analytics dashboard" />
                  <button className="flex items-center justify-center gap-1.5 w-full rounded-md" style={{ marginTop: 6, padding: "6px 0", background: ACCENT, color: "white", fontSize: 12, fontWeight: 600 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Commit
                  </button>
                </motion.div>
              ) : (
                <textarea readOnly style={{ width: "100%", height: 20, resize: "none", background: S2, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 10px", fontSize: 12, color: `${MUTED}80`, fontFamily: "inherit", outline: "none" }} placeholder="Message (⌘+Enter to commit)" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
