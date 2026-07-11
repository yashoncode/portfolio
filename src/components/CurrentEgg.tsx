"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/** The "Current" pill on the active role — hides easter egg #03. */
export default function CurrentEgg() {
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
    <span className="relative ml-3 inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet transition-transform hover:scale-105"
      >
        Current
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.span
              className="fixed inset-0 z-40 block"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.span
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass absolute left-0 top-full z-50 mt-3 block w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl p-5 text-left font-sans normal-case tracking-normal"
            >
              <span className="eyebrow mb-3 block">🥚 easter egg · 03</span>
              <span className="block text-lg font-bold text-fg">
                Day one, still here.
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">
                Stockarea is my first company after college — and I&apos;m
                still here, growing with it.
              </span>
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
