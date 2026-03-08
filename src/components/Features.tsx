"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
  highlight: string;
}

const features: Feature[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "Manager Worker Critic",
    desc: "The Critic is what sets this apart. Claude Code can spawn subagents, Cursor can run parallel workers — but neither routes every output through a dedicated read only Critic that gates with PASS or FAIL before results reach you. That quality gate is baked into the architecture, not bolted on. Bad output never reaches you.",
    highlight: "Critic gate is the difference",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
    title: "Ghost Commits",
    desc: "Cursor and Aider commit AI changes to your branch. Claude Code added a --worktree flag in early 2026. Koryphaios does something different: ghost commits are dangling git objects stored off your branch entirely, with cost, tokens, model, and prompt hash in git notes. Your branch history stays clean. Roll back one agent without touching another's work. No other tool stores this metadata.",
    highlight: "Dangling objects with full metadata",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="2" y="2" width="9" height="9" rx="1"/>
        <rect x="13" y="2" width="9" height="9" rx="1"/>
        <rect x="2" y="13" width="9" height="9" rx="1"/>
        <rect x="13" y="13" width="9" height="9" rx="1"/>
      </svg>
    ),
    title: "Parallel Agent Isolation",
    desc: "Cursor 2.0 and Claude Code both support git worktrees for parallel agents now. What Koryphaios adds is enforced file system sandboxing per role — Workers are restricted at the API level to only the paths they were granted. Two agents editing overlapping files is a configuration error, not a race condition you have to discover after the fact.",
    highlight: "API level path enforcement",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Real Time Cost Tracking",
    desc: "Claude Code has a /cost command. Cursor shows a monthly credit bar. Koryphaios meters every API call in real time per provider, per model, per session, per token — visible in the UI as it happens, not after the fact. Running 6 parallel agents across 3 providers? You see exactly what each one is burning, live.",
    highlight: "Live · per model · per session",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "MCP Integration",
    desc: "Cursor, Claude Code, and Windsurf all support MCP. So does Koryphaios — stdio and SSE transports, full tool, resource, and prompt support. This is table stakes in 2026 and Koryphaios ships it. Plug in any MCP server and your agents can use it immediately. No config gymnastics.",
    highlight: "Stdio + SSE · full spec support",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Role Based Security",
    desc: "Manager has full unsandboxed access. Workers are restricted to explicitly granted files and paths at the API level. The Critic is read only — it cannot write or execute anything. JWT auth, 120 req/min rate limiting, CORS enforcement, encrypted API key storage. Three permission tiers. No tool in this space enforces them this strictly.",
    highlight: "Three tiers · enforced at API level",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Real Time Streaming",
    desc: "WebSocket first, SSE fallback. 30+ distinct event types: agent spawns, routing decisions, tool calls, Critic verdicts, ghost commit writes, cost updates, circuit breaker trips. Every decision the system makes is observable as it happens. You are never waiting on a black box.",
    highlight: "30+ event types · full observability",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Native Desktop App",
    desc: "Cursor and Windsurf are VS Code forks — Electron apps that inherit its memory footprint. Claude Code is a CLI tool. Koryphaios is built with Tauri: a native binary under 100MB on Windows, macOS, and Linux. System tray, file drops, native menus, local data. No subscription to an IDE you didn't ask for.",
    highlight: "Tauri · not a VS Code fork",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgba(213,178,97,0.03)] blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--porcelain)]">
            The details that actually matter.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[var(--porcelain)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
                {feature.desc}
              </p>
              <span className="text-xs text-[var(--kintsugi-gold)] uppercase tracking-widest">
                {feature.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
