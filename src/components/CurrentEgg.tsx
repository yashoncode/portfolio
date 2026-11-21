"use client";

import { useEffect, useState } from "react";
import styles from "./sections.module.css";

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
    <span className="inline-block md:relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer rounded border border-ok/40 bg-ok/10 px-2 py-1 font-mono text-[10px] font-semibold tracking-widest text-ok uppercase hover:border-ok"
      >
        Current
      </button>

      {open && (
        <>
          <span aria-hidden className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className={`${styles.popover} top-full left-0 mt-2 text-left font-sans normal-case tracking-normal`}>
            <span className="eyebrow mb-3 block">🥚 easter egg · 03</span>
            <span className="block text-lg font-bold text-fg">
              Day one, still here.
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              Stockarea is my first company after college, and I&apos;m
              still here, growing with it.
            </span>
          </span>
        </>
      )}
    </span>
  );
}
