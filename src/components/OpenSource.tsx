"use client";

import { motion } from "framer-motion";

const badges = [
  "TypeScript", "SvelteKit 2", "Bun", "Tauri", "SQLite",
  "TailwindCSS v4", "WebSockets", "Pino", "Zod", "MCP Protocol", "Apache 2.0",
];

export default function OpenSource() {
  return (
    <section id="open-source" className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-[rgba(213,178,97,0.03)] blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="kintsugi-badge mb-6 inline-flex">Open Source</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--porcelain)] mb-6">
            Free. No catch.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
            Apache 2.0 licensed. Full source. No telemetry. No vendor lock-in.
            You pay your providers directly at their published rates — we add
            zero markup, zero fees, zero hidden costs. The code is yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <motion.div
            className="feature-card text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--kintsugi-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <h3 className="text-lg font-semibold text-[var(--kintsugi-gold)] mb-2">
              No Subscription
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              No monthly fee, no tiers, no seat licenses. Clone the repo,
              add your API keys, start building. All features unlocked. Forever.
            </p>
          </motion.div>

          <motion.div
            className="feature-card text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--kintsugi-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            <h3 className="text-lg font-semibold text-[var(--kintsugi-gold)] mb-2">
              Full Source
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Apache 2.0 license. Fork it, modify it, build on it.
              TypeScript frontend + Bun backend + Tauri desktop — fully auditable.
            </p>
          </motion.div>

          <motion.div
            className="feature-card text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--kintsugi-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <h3 className="text-lg font-semibold text-[var(--kintsugi-gold)] mb-2">
              Your Keys, Your Data
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              No cloud proxy. No analytics. No telemetry.
              API calls go directly from your machine to your providers.
              We never see your code, your prompts, or your keys.
            </p>
          </motion.div>
        </div>

        {/* Tech badges */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="kintsugi-panel p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-[var(--kintsugi-gold)] mb-4 font-semibold text-center flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Built With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {badges.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-[var(--kintsugi-border)] text-sm text-[var(--text-secondary)] bg-[rgba(213,178,97,0.05)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
