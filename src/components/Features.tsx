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
    title: "Self-Checking AI Team",
    desc: "Every change gets reviewed by a Critic agent before it reaches you. Bad code is caught automatically — not your problem.",
    highlight: "Quality without the effort",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
    title: "Ghost Commits",
    desc: "Every AI change saved with full context — cost, tokens, model used. Clean git history, easy rollbacks. Know exactly what each change cost you.",
    highlight: "Undo without the mess",
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
    title: "Parallel Agents",
    desc: "Multiple AI specialists work on different parts at the same time without stepping on each other. Frontend, backend, tests — all at once.",
    highlight: "Parallel execution, fewer conflicts",
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
    title: "Works With Your Stack",
    desc: "Bring your own API keys for Claude, OpenAI, and 40+ providers. Plug in any MCP server or tool. No vendor lock-in.",
    highlight: "Plays nice with others",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "Your Code Stays Yours",
    desc: "Local-first with encrypted storage. Agents only access what they need. No data sent to us — your API keys, your providers, your machine.",
    highlight: "Privacy by design",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Watch It Happen",
    desc: "See agents spawn, work, and finish in real time. No black boxes — you know what's happening and what it costs as it happens.",
    highlight: "Full visibility",
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
