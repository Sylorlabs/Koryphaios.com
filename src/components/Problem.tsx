"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444]">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
      </svg>
    ),
    title: "Provider Chaos",
    desc: "You're running Claude in one tab, GPT in another, Cursor on the side, and Gemini in the terminal. Nothing connects. Nothing shares context. You're the glue holding it all together, and you're failing at it.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444]">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Invisible Burn Rate",
    desc: "You have no idea what you're spending. Each provider has different pricing, different token counts, different billing cycles. The invoice arrives and it's a surprise every time. That's not engineering — that's gambling.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444]">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
    ),
    title: "No Undo. No Safety Net.",
    desc: "An AI agent rewrites your file and breaks everything. You hit Ctrl+Z or git revert and get a messy commit history with no context about what was tried, what it cost, or which model did it. One bad generation buried in undifferentiated commits can cost you hours of archaeology.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">The Problem</span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--porcelain)]">
            Your workflow is broken.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
            Tools like CrewAI and AutoGen proved multi agent orchestration works.
            But you still wire it together yourself — switching models, reviewing output,
            tracking costs, recovering from mistakes. That&apos;s not vibe coding.
            That&apos;s infrastructure work. Koryphaios is the native desktop app that
            handles it all so you don&apos;t have to.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={item.title}
                className="feature-card text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--porcelain)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
