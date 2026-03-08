"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444]">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
      </svg>
    ),
    title: "Too Many Tools",
    desc: "Claude in one tab, GPT in another, Cursor on the side. You're the glue holding it all together.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF4444]">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Surprise Bills",
    desc: "Different providers, different pricing, different billing cycles. The invoice arrives and it's always a shock.",
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
    title: "No Safety Net",
    desc: "AI breaks your code and undoing means messy commits with zero context about what was tried or what it cost.",
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
            Multi-agent tools exist, but you're still the manager — switching models,
            reviewing output, tracking costs. That's not vibe coding. That's infrastructure work.
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
