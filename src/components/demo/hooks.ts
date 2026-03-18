"use client";

import { useEffect, useState, useRef } from "react";

/* ── Hook to detect mobile viewport ───────────────────────────────────── */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  
  return isMobile;
}

/* ── Typing effect (Strict Mode safe) ─────────────────────────────────── */
export function useTypingEffect(text: string, speed: number, delay: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Reset when inactive
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDisplayed("");
      setDone(false);
      hasStartedRef.current = false;
      return;
    }

    // Already started or done, don't restart
    if (hasStartedRef.current || done) return;

    hasStartedRef.current = true;
    let i = 0;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDone(true);
        }
      }, speed);
    }, delay);
  }, [text, speed, delay, active, done]);

  return { displayed, done };
}
