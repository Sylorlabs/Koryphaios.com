"use client";

import { motion } from "framer-motion";

const without = [
  "Copy-paste between Claude, ChatGPT, and Cursor all day",
  "One agent overwrites what another just wrote",
  "No idea how much you spent until the invoice hits",
  "AI breaks your code and undoing it means reverting messy commits",
  "You are the manager, the reviewer, and the debugger",
  "Provider goes down? You manually switch to another one",
  "Context lost between sessions — start explaining from scratch",
  "Every line of AI output waits for your approval before anything moves",
];

const withK = [
  "One prompt spawns multiple specialist workers in parallel",
  "Git worktree isolation — agents literally cannot clobber each other",
  "Real time cost tracking: $0.08 per session, not $80 surprises",
  "Ghost commits let you time travel to any previous agent state",
  "The Critic reviews and gates every output — you only see what passed",
  "Circuit breaker auto fails over through 25 fallback models",
  "Persistent sessions with full token and cost metadata",
  "Less human in the loop — the system runs, you steer",
];

export default function VibeCoder() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">Before & After</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--porcelain)] mb-4">
            The difference is not subtle.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Every other AI tool still needs you in the loop — reviewing output, catching mistakes,
            switching providers, managing context. Koryphaios is designed from the ground up to
            minimize how much of that lands on you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <h3 className="text-lg font-bold text-[#EF4444]">
                Without Koryphaios
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {without.map((item) => (
                <li key={item} className="flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            className="feature-card border-[var(--kintsugi-border-strong)]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h3 className="text-lg font-bold text-[#10B981]">
                With Koryphaios
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {withK.map((item) => (
                <li key={item} className="flex gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
