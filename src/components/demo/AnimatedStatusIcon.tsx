"use client";

import styles from "../AppPreview.module.css";
import { MUTED } from "./types";

interface AnimatedStatusIconProps {
  status: string;
  size?: number;
  isManager?: boolean;
}

export const AnimatedStatusIcon = ({ status, size = 16, isManager = false }: AnimatedStatusIconProps) => {
  if (status === "thinking") return (
    <div className={styles.thinking} style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <line x1="12" y1="1.5" x2="12" y2="0" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className={styles.ray} />
        <line x1="18.5" y1="4" x2="20" y2="2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className={styles.ray} />
        <line x1="5.5" y1="4" x2="4" y2="2.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className={styles.ray} />
        <line x1="20.5" y1="9.5" x2="22" y2="9.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className={styles.ray} />
        <line x1="3.5" y1="9.5" x2="2" y2="9.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" className={styles.ray} />
        <defs>
          <clipPath id="bulb-fill">
            <path d="M12 4a5.5 5.5 0 0 1 3.7 9.6V16.5a1 1 0 0 1-1 1h-5.4a1 1 0 0 1-1-1v-2.9A5.5 5.5 0 0 1 12 4z" />
          </clipPath>
        </defs>
        <g clipPath="url(#bulb-fill)">
          <rect x="6.5" y="4" width="11" height="13.5" fill="#fcd34d" className={styles.bulbFill} />
        </g>
        <path d="M12 4a5.5 5.5 0 0 1 3.7 9.6V16.5a1 1 0 0 1-1 1h-5.4a1 1 0 0 1-1-1v-2.9A5.5 5.5 0 0 1 12 4z" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 17.5h4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.5 19h3" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );

  if (status === "tool_calling") return (
    <div className={styles.writing} style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path className={styles.squiggle1} d="M2 16.5Q4 15 6 16.5T10 16.5" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path className={styles.squiggle2} d="M3 18.5Q5 17 7 18.5T11 18.5" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path className={styles.squiggle3} d="M2 20.5Q4 19 6 20.5T10 20.5" stroke="#4ade80" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M17 2L21 6L8 19L4 19L4 15L17 2Z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(74, 222, 128, 0.1)" />
        <path d="M15 4L19 8" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />
        <circle cx="5" cy="18" r="1.5" fill="#4ade80" />
      </svg>
    </div>
  );

  if (status === "streaming") return (
    <div style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path d="M4 6h16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className={styles.stream1} />
        <path d="M4 10h12" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" className={styles.stream2} />
        <path d="M4 14h14" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" className={styles.stream3} />
        <path d="M4 18h8" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" className={styles.stream4} />
      </svg>
    </div>
  );

  if (status === "verifying" || status === "analyzing") return (
    <div className={styles.verify} style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="11" cy="11" r="6" stroke="#c084fc" strokeWidth="1.5" />
        <path d="M15.5 15.5L20 20" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 11h4" stroke="#d8b4fe" strokeWidth="1.5" strokeLinecap="round" className={styles.scan} />
      </svg>
    </div>
  );

  if (status === "done") return (
    <div style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5" />
        <path d="M8 12l3 3 5-6" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  if (status === "error") return (
    <div style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.5" fill="#f87171" />
      </svg>
    </div>
  );

  return (
    <div style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
        <circle cx="12" cy="12" r="4" fill={MUTED} className={styles.breathe} opacity="0.3" />
      </svg>
    </div>
  );
};
