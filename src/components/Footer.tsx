"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(213,178,97,0.1)] py-10 bg-[var(--dark-bg)]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/logo-192.png"
            alt="Koryphaios"
            width={64}
            height={64}
            className="mx-auto mb-3"
          />
          <p className="text-[var(--kintsugi-gold)] font-semibold uppercase tracking-[0.28em] text-sm">
            Koryphaios
          </p>
          <p className="text-[var(--text-secondary)] mt-2">
            AI Agent Orchestration Platform by{" "}
            <a
              href="https://sylorlabs.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--kintsugi-gold)] hover:text-[var(--kintsugi-gold-light)] transition-colors"
            >
              Sylorlabs
            </a>
          </p>

          <div className="flex justify-center gap-6 mt-6 mb-6">
            <a
              href="https://github.com/Sylorlabs/Koryphaios"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)] transition-colors text-sm inline-flex items-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="https://github.com/Sylorlabs/Koryphaios/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)] transition-colors text-sm"
            >
              Docs
            </a>
            <a
              href="https://github.com/Sylorlabs/Koryphaios/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)] transition-colors text-sm"
            >
              Apache 2.0
            </a>
            <a
              href="https://sylorlabs.com"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)] transition-colors text-sm"
            >
              Sylorlabs
            </a>
          </div>

          <p className="text-[rgba(214,206,192,0.4)] text-sm">
            &copy; 2026 Sylorlabs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
