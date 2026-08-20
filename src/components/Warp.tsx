"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

/** How long the outbound warp runs before the route actually changes. */
export const WARP_MS = 1150;

const FLAG = "warp";

/** Arm the arrival animation on the page we are about to land on. */
export function armWarp() {
  try {
    sessionStorage.setItem(FLAG, "1");
  } catch {
    // private mode, no storage. The jump still works, just without the arrival.
  }
}

/**
 * Departure: a flash, then an iris that swallows the page. Render this while
 * the jump is in flight, then push the route.
 */
export function WarpOut() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.15, 0.4] }}
        transition={{ duration: 0.5, times: [0, 0.12, 0.4, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #ffffff 0%, #ddd6fe 25%, #8b5cf6 50%, #22d3ee 68%, #0b0714 100%)",
        }}
        initial={{ scale: 0, opacity: 0.9, rotate: 0 }}
        animate={{ scale: 22, opacity: 1, rotate: 120 }}
        transition={{ duration: WARP_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
  );
}

/**
 * The other end of the same motion: only mounts if the page we came from armed
 * it, so a direct visit or a reload never flashes for no reason.
 */
export function WarpArrival() {
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(FLAG)) return;
      sessionStorage.removeItem(FLAG);
      setArrived(true);
    } catch {
      // no storage, no arrival.
    }
  }, []);

  if (!arrived) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        background:
          "radial-gradient(circle at 50% 42%, transparent 0%, rgba(139,92,246,0.35) 45%, #0b0714 72%)",
      }}
    />
  );
}
