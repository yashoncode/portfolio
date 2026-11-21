"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** 2px amber bar on the navbar's bottom edge tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent" />;
}

/** Counts the leading number of `value` ("4+", "60×", "337") up from zero
 *  the first time it scrolls into view. The server renders the final value,
 *  so nothing is ever blank without JS. Non-numeric values render as is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();
  const match = /^(\d[\d,]*)(.*)$/.exec(value);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match?.[2] ?? "";

  // Park at zero once hydrated so the count-up starts from 0, not from the final value.
  useEffect(() => {
    if (ref.current && target !== null && !reduce) ref.current.textContent = `0${suffix}`;
  }, [target, suffix, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || reduce || !inView) return;
    const controls = animate(0, target, {
      duration: Math.min(1.6, 0.7 + target / 600),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = `${Math.round(v).toLocaleString("en-US")}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, target, suffix, reduce]);

  return <span ref={ref} className={className}>{value}</span>;
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#·";

/** Mono label that "decodes" left to right from random glyphs on first view. */
export function Decode({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const total = 16;
    const id = window.setInterval(() => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      setShown(
        text
          .split("")
          .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (frame >= total) { window.clearInterval(id); setShown(text); }
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, reduce, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/** Experience spine: fills amber as the section scrolls past the 65% line,
 *  with a glowing "truck" riding the leading edge. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const top = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-3 bottom-0 left-[5px] w-px bg-border">
        <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY: reduce ? 1 : fill }} />
        {!reduce && (
          <motion.span
            className="absolute left-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_2px_var(--color-accent)]"
            style={{ top }}
          />
        )}
      </div>
      {children}
    </div>
  );
}

/** A role's dot on the spine; lights up once the truck reaches it. */
export function TimelineNode({ current }: { current?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reached = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });
  const reduce = useReducedMotion();
  const lit = reduce || reached;
  const tone = current ? "border-ok bg-ok text-ok" : "border-accent bg-accent text-accent";

  return (
    <span
      ref={ref}
      aria-hidden
      className={`timeline-node absolute top-2 left-0 size-[11px] rounded-full border transition-colors duration-500 ${
        lit ? `${tone} is-lit` : "border-border bg-bg text-transparent"
      }`}
    />
  );
}
