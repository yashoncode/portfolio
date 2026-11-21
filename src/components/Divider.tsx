"use client";

import { useEffect, useState } from "react";
import styles from "./sections.module.css";

/**
 * Hairline divider between sections. The ✦ glyph hides easter
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
    <div className="relative z-10 mx-auto max-w-6xl px-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="A decorative star. Or is it?"
        className="absolute top-1/2 left-1/2 grid size-7 -translate-1/2 cursor-pointer place-items-center rounded border border-border bg-surface text-xs text-accent transition-colors hover:border-accent"
      >
        ✦
      </button>

      {open && (
        <>
          <div aria-hidden className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={`${styles.popover} bottom-full left-1/2 mb-5 -translate-x-1/2 text-center`}>
            <p className="eyebrow mb-3">🥚 easter egg · 02</p>
            <p className="text-lg font-bold text-fg">Certified introvert.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Real fact: I&apos;m an introvert, so I built this website to
              do the talking for me.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
