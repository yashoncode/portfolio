"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/data/resume";

const card =
  "glass flex h-full gap-5 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-border-strong";

export default function Education() {
  // The school card hides easter egg #05; holds the school name that is open.
  // It expands in flow rather than in a popover — Section clips overflow for
  // its glow blob, so anything absolutely positioned here gets cut off.
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
      glow="violet"
    >
      {/* Stretch, not items-start: cards side by side stay the same height,
          and both grow together when the egg below expands. */}
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((edu, i) => {
          const details = (
            <div>
              <h3 className="font-semibold leading-snug text-fg">
                {edu.school}
              </h3>
              <p className="mt-1 text-sm text-muted">{edu.degree}</p>
              <p className="mt-2 font-mono text-xs tracking-wider text-dim">
                {edu.period}
                {edu.detail && (
                  <span className="ml-3 text-cyan">{edu.detail}</span>
                )}
              </p>

              {edu.egg && (
                <AnimatePresence initial={false}>
                  {open === edu.school && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="eyebrow mb-2 mt-5">🥚 easter egg · 05</p>
                      <p className="font-semibold text-fg">{edu.egg.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {edu.egg.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );

          const icon = (
            <div className="h-fit rounded-xl bg-violet/10 p-2.5 text-violet">
              <GraduationCap size={22} />
            </div>
          );

          return (
            <Reveal key={edu.school} delay={i * 0.1}>
              {edu.egg ? (
                <button
                  onClick={() =>
                    setOpen((v) => (v === edu.school ? null : edu.school))
                  }
                  aria-expanded={open === edu.school}
                  className={`${card} w-full cursor-pointer`}
                >
                  {icon}
                  {details}
                </button>
              ) : (
                <div className={card}>
                  {icon}
                  {details}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
