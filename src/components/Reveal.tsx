"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Fades + slides children in when they enter the viewport. */
export default function Reveal({
  children,
  delay = 0,
  y = 48,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`reveal-fx ${className ?? ""}`}
      initial={{
        opacity: 0,
        y: reduce ? 0 : y,
        filter: reduce ? "blur(0px)" : "blur(10px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
