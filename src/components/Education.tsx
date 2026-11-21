"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/data/resume";

const row =
  "relative grid w-full gap-2 py-6 text-left md:grid-cols-[minmax(0,1fr)_auto] md:gap-8";

export default function Education() {
  // The school card hides easter egg #05; holds the school name that is open.
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Section
      id="education"
      eyebrow="05 · Education"
      title="Where it started."
      alt
    >
      <div>
        {education.map((edu, i) => {
          const details = (
            <>
              <span aria-hidden className="rule" />
              <div className="min-w-0">
                <h3 className="text-lg leading-snug font-medium tracking-tight text-fg transition-colors group-hover/edu:text-accent sm:text-xl">
                  {edu.school}
                </h3>
                <p className="mt-1 text-sm text-muted">{edu.degree}</p>
              </div>
              <p className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted md:flex-col md:items-end md:pt-1.5">
                <span>{edu.period}</span>
                {edu.detail && (
                  <span className="text-accent">{edu.detail}</span>
                )}
              </p>

              {edu.egg && open === edu.school && (
                <div className="border-t border-border pt-4 md:col-span-2">
                  <p className="eyebrow mb-2">🥚 easter egg · 05</p>
                  <p className="font-semibold text-fg">{edu.egg.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {edu.egg.text}
                  </p>
                </div>
              )}
            </>
          );

          return (
            <Reveal key={edu.school} delay={i * 0.1}>
              {edu.egg ? (
                <button
                  onClick={() =>
                    setOpen((v) => (v === edu.school ? null : edu.school))
                  }
                  aria-expanded={open === edu.school}
                  className={`${row} group/edu cursor-pointer`}
                >
                  {details}
                </button>
              ) : (
                <div className={row}>
                  {details}
                </div>
              )}
            </Reveal>
          );
        })}
        <div aria-hidden className="rule relative!" />
      </div>
    </Section>
  );
}
