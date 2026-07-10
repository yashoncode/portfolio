"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Hairline gradient divider between sections. The ✦ glyph hides easter
 * egg #02 — click it.
 */
export default function Divider() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative mx-auto max-w-6xl px-6">
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-border-strong to-transparent"
      />
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="A decorative star. Or is it?"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-bg px-3 text-[10px] text-violet/70 transition-all duration-300 hover:scale-125 hover:text-cyan"
      >
        ✦
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute bottom-full left-1/2 z-50 mb-4 w-72 max-w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-2xl p-5 text-center shadow-2xl shadow-black/50"
            >
              <p className="eyebrow mb-3">🥚 easter egg · 02</p>
              <p className="text-lg font-bold text-fg">Certified introvert.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Real fact: I&apos;m an introvert — so I built this website to
                do the talking for me.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
