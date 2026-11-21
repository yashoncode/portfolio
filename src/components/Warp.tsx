"use client";

import { useEffect, useRef } from "react";

const WARP_MS = 850;
const FLAG = "warp";

/** Returns the departure time so navigation can skip the effect for reduced motion. */
export function armWarp() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  try {
    sessionStorage.setItem(FLAG, "1");
  } catch {
    // Navigation also works with session storage disabled.
  }
  return WARP_MS;
}

export function WarpOut() {
  return <div aria-hidden className="warp-out pointer-events-none fixed inset-0 z-[100]" style={{ animationDuration: `${WARP_MS}ms` }} />;
}

export function WarpArrival() {
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(FLAG)) return;
      sessionStorage.removeItem(FLAG);
      overlay.current?.classList.add("warp-in");
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }, []);
  return <div ref={overlay} aria-hidden className="pointer-events-none fixed inset-0 z-[100] opacity-0" />;
}
