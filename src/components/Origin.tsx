"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { story } from "@/data/story";

/**
 * The page on the other side of the portal. Opens with an iris contracting
 * out of the flash the star left behind, so the arrival reads as one motion
 * continuing rather than a fresh page load.
 */
export default function Origin() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* portal iris closing inward, then out of the way */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 0%, rgba(139,92,246,0.35) 45%, #0b0714 72%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute -top-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[140px] sm:animate-aurora" />
        <div className="absolute bottom-0 right-1/4 h-[22rem] w-[22rem] rounded-full bg-cyan/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-3xl px-6 py-24 sm:py-32"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} />
          back through the portal
        </Link>

        <p className="eyebrow mt-12 mb-4">{story.subtitle}</p>
        <h1 className="text-gradient text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          {story.title}
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted">{story.intro}</p>

        <div className="mt-20 flex flex-col gap-16">
          {story.chapters.map((c, i) => (
            <motion.section
              key={`${c.year}-${c.title}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l border-border pl-8"
            >
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-violet shadow-[0_0_14px_rgba(139,92,246,0.9)]" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet">
                {c.year}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-fg sm:text-3xl">
                {c.title}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {c.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <p className="mt-24 border-t border-border pt-10 text-center font-mono text-sm text-dim">
          {story.closing}
        </p>
      </motion.div>
    </main>
  );
}
