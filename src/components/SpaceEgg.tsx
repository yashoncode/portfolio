"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * The 🪐 in the footer — hides easter egg #04. Opening it also fires a
 * meteor shower in the Galaxy background via a window event.
 */
export default function SpaceEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent("meteor-shower"));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="A tiny planet. Probably decorative."
        className="cursor-pointer text-sm transition-transform duration-300 hover:rotate-12 hover:scale-125 inline-block"
      >
        🪐
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
              className="glass absolute bottom-full right-0 z-50 mb-4 block w-72 max-w-[calc(100vw-2.5rem)] rounded-2xl p-5 text-left shadow-2xl shadow-black/50"
            >
              <span className="eyebrow mb-3 block">🥚 easter egg · 04</span>
              <span className="block text-lg font-bold text-fg">
                Certified space nerd.
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">
                The stars behind this site aren&apos;t decoration — I&apos;m
                genuinely obsessed with space. Look up: that meteor shower is
                for you. ☄️
              </span>
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
