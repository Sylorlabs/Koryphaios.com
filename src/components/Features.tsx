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
    desc: "Every output routes through a read-only Critic that gates with PASS or FAIL. Bad code never reaches you — it's baked into the architecture.",
    highlight: "Quality gate at the core",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
    title: "Ghost Commits",
    desc: "Dangling git objects stored off your branch with full metadata: cost, tokens, model, prompt hash. Roll back to any state. Your history stays clean.",
    highlight: "Time travel for your code",
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
    desc: "Workers run in separate git worktrees with API-level path enforcement. No race conditions, no overwrites, no surprises.",
    highlight: "True isolation",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Real Time Cost Tracking",
    desc: "Per provider, per model, per session, per token — visible live as it happens. Running 6 agents across 3 providers? See exactly what each burns.",
    highlight: "No more surprise bills",
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
    desc: "Stdio and SSE transports, full tool, resource, and prompt support. Plug in any MCP server and your agents use it immediately.",
    highlight: "Universal compatibility",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Role Based Security",
    desc: "Three permission tiers enforced at the API level: Manager (full access), Workers (path-restricted), Critic (read-only). JWT auth, rate limiting, encrypted storage.",
    highlight: "Defense in depth",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Real Time Streaming",
    desc: "WebSocket first, SSE fallback. 30+ event types: agent spawns, tool calls, Critic verdicts, cost updates. Full observability, zero black boxes.",
    highlight: "See everything",
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
    desc: "Built with Tauri: under 100MB native binary on Windows, macOS, and Linux. No Electron bloat, no VS Code subscription. System tray, native menus, local data.",
    highlight: "Lean and native",
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
            Built different.
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
