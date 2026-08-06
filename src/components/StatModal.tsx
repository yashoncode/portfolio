"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { StatDetail } from "@/data/resume";

/**
 * Native <dialog> rather than a hand-rolled overlay: Esc-to-close, focus
 * trapping and top-layer stacking come free, and ::backdrop gives the blur
 * without a fixed-position div fighting the cursor and galaxy layers for
 * z-index.
 */
export default function StatModal({
  detail,
  onDismiss,
}: {
  detail: StatDetail | null;
  onDismiss: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (detail) el.showModal();
    else if (el.open) el.close();
  }, [detail]);

  return (
    <dialog
      ref={ref}
      className="stat-modal glass glass-keep w-[min(46rem,calc(100vw_-_2rem))] rounded-2xl p-0 text-left"
      // Esc and the close() call both fire this; keep React state in sync.
      onClose={onDismiss}
      // A click landing on the dialog itself is a click on the backdrop —
      // anything inside the content div stops short of here.
      onClick={(e) => {
        if (e.target === ref.current) onDismiss();
      }}
    >
      {detail && (
        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-fg sm:text-2xl">{detail.title}</h2>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Close"
              className="shrink-0 rounded-lg p-1.5 text-dim transition-colors hover:bg-white/5 hover:text-fg"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
            {detail.intro}
          </p>

          <div className="flex flex-col gap-7">
            {detail.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-violet">
                  {s.heading}
                </h3>
                {s.body && (
                  <p className="text-sm leading-relaxed text-muted">{s.body}</p>
                )}
                {s.points && (
                  <ul className="flex flex-col gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[9px] before:h-1 before:w-2.5 before:rounded-full before:bg-cyan/50"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
