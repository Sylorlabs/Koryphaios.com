"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Providers", href: "#providers" },
  { name: "Architecture", href: "#architecture" },
  { name: "Download", href: "/download" },
  { name: "README", href: "https://github.com/Sylorlabs/Koryphaios/blob/main/README.md" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0B0A]/95 backdrop-blur-md border-b border-[rgba(213,178,97,0.1)]"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-64.png"
            alt="Koryphaios"
            width={44}
            height={44}
          />
          <span className="font-[var(--font-cinzel)] text-lg font-bold text-[var(--kintsugi-gold)] tracking-wide">
            Koryphaios
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Sylorlabs/Koryphaios"
            target="_blank"
            rel="noreferrer"
            className="kintsugi-button-outline px-4 py-2 text-sm flex items-center gap-2"
            aria-label="View Koryphaios on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            View on GitHub
          </a>
          <a
            href="/download"
            className="kintsugi-button-primary px-5 py-2 text-sm"
          >
            Download
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[var(--text-secondary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-[#0D0B0A]/98 backdrop-blur-md border-t border-[rgba(213,178,97,0.1)] px-6 py-4 space-y-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="block text-sm text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)]"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/Sylorlabs/Koryphaios"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--kintsugi-gold)]"
          >
            GitHub
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
