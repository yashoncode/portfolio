"use client";

import { useEffect, useState } from "react";
import styles from "./sections.module.css";

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
    <span className="inline-block md:relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="A tiny planet. Probably decorative."
        aria-expanded={open}
        className="inline-flex size-6 cursor-pointer items-center justify-center text-sm motion-safe:transition-transform motion-safe:hover:rotate-12"
      >
        🪐
      </button>

      {open && (
        <>
          <span aria-hidden className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <span className={`${styles.popover} bottom-full left-0 mb-2 text-left font-sans tracking-normal md:right-0 md:left-auto`}>
            <span className="eyebrow mb-3 block">🥚 easter egg · 04</span>
            <span className="block text-lg font-bold text-fg">
              Certified space nerd.
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              The stars behind this site aren&apos;t decoration, I&apos;m
              genuinely obsessed with space. Look up: that meteor shower is
              for you. ☄️
            </span>
          </span>
        </>
      )}
    </span>
  );
}
