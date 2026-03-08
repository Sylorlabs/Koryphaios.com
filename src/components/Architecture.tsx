"use client";

import { motion } from "framer-motion";

const steps = [
  {
    role: "You",
    color: "#F6EFE2",
    label: "input",
    text: "One prompt. The Manager handles the rest.",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F6EFE2"><circle cx="12" cy="12" r="10"/></svg>
    ),
  },
  {
    role: "Kory (Manager)",
    color: "#D5B261",
    label: "orchestrator",
    text: "Classifies tasks, picks the best models, builds fallback chains, spawns workers in isolated git worktrees.",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#D5B261"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
    ),
  },
  {
    role: "Workers",
    color: "#10B981",
    label: "sandboxed · parallel",
    text: "Multiple specialists run simultaneously in separate worktrees. Each sandboxed to specific paths — no conflicts, no overwrites.",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#10B981"><rect x="2" y="2" width="20" height="20" rx="4"/></svg>
    ),
  },
  {
    role: "Critic",
    color: "#60A5FA",
    label: "read only · quality gate",
    text: "Reviews all output before you see it. Returns PASS or FAIL with line-level feedback. Bad code never reaches you.",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#60A5FA"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
    ),
  },
  {
    role: "Shadow Logger",
    color: "#8B5CF6",
    label: "ghost commits · undo",
    text: "Every change stored as a dangling commit with cost, tokens, model, and prompt hash. Time travel to any state. Your branch stays clean.",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#8B5CF6"><circle cx="12" cy="12" r="10"/></svg>
    ),
  },
];

const tools = [
  "bash", "read_file", "write_file", "edit_file", "delete_file", "move_file",
  "patch", "diff", "grep", "glob", "ls",
  "web_fetch", "web_search", "ask_user", "ask_manager", "agent",
];

export default function Architecture() {
  return (
    <section id="architecture" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[rgba(213,178,97,0.03)] blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">Architecture</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--porcelain)] mb-4">
            Agents that manage themselves.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            One instruction. The system handles delegation, execution, quality control, and rollback.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.role}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center pt-1">
                <div className="flex-shrink-0">{step.icon}</div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 min-h-[40px] bg-[var(--kintsugi-border)]" />
                )}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: step.color }}>
                    {step.role}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                    {step.label}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools grid */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="kintsugi-panel p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--kintsugi-gold)] mb-4 font-semibold flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--kintsugi-gold)]">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
              16 Built-In Tools + MCP Extensions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="text-center py-2 px-3 rounded-xl border border-[var(--kintsugi-border)] text-xs font-mono text-[var(--text-secondary)]"
                >
                  {tool}
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-4 text-center opacity-60">
              + any MCP server tools via stdio or SSE transport
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
