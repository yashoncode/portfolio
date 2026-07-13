"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile, stats } from "@/data/resume";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

export default function Hero() {
  // Click the trailing "D" to reveal the full family name; auto-collapses
  const [showDev, setShowDev] = useState(false);

  useEffect(() => {
    if (!showDev) return;
    const t = setTimeout(() => setShowDev(false), 3000);
    return () => clearTimeout(t);
  }, [showDev]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      {/* Ambient background: aurora blobs + grid */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute -top-40 left-1/4 h-[20rem] w-[20rem] rounded-full bg-violet/25 blur-[100px] sm:h-[34rem] sm:w-[34rem] sm:animate-aurora sm:blur-[140px]" />
        <div
          className="absolute -right-32 top-1/3 hidden rounded-full bg-cyan/15 sm:block sm:h-[28rem] sm:w-[28rem] sm:animate-aurora sm:blur-[140px]"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute -bottom-48 left-1/3 h-[16rem] w-[16rem] rounded-full bg-indigo/20 blur-[110px] sm:h-[26rem] sm:w-[26rem] sm:blur-[160px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16"
      >
        <motion.p variants={item} className="eyebrow mb-5 flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Software Engineer · Open to opportunities
        </motion.p>

        <motion.h1
          variants={item}
          aria-label={profile.name}
          className={`text-gradient -mt-4 max-w-4xl whitespace-nowrap pt-4 font-bold leading-[1.05] tracking-tight transition-all duration-500 ${
            showDev
              ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
              : "text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          }`}
        >
          {profile.name.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} aria-hidden="true">
                &nbsp;
              </span>
            ) : i === profile.name.length - 1 && ch === "D" ? (
              <span
                key={i}
                aria-hidden="true"
                onClick={() => setShowDev((v) => !v)}
                className={`name-letter-d inline-block cursor-pointer select-none ${
                  showDev
                    ? "d-open font-black [-webkit-text-fill-color:var(--color-fg)]"
                    : ""
                }`}
              >
                D
                {showDev && (
                  <motion.span
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    ev
                    <span className="font-bold opacity-15">adoss</span>
                  </motion.span>
                )}
              </span>
            ) : (
              <span key={i} aria-hidden="true" className="name-letter inline-block">
                {ch}
              </span>
            )
          )}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg md:text-xl"
        >
          {profile.tagline}{" "}
          <span className="text-fg">Laravel</span>{" "}
          APIs, CRM &amp; ERP systems, and workflow automation for logistics —
          now going full-stack with{" "}
          <span className="text-fg">Next.js</span> and{" "}
          <span className="text-fg">React</span>.
        </motion.p>

        {/* Headline stats */}
        <motion.div
          variants={item}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 md:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map(({ value, label, fun }, i) => (
            <div
              key={label}
              className={`glass group relative rounded-2xl p-4 transition-colors hover:border-violet/40 sm:p-5 ${
                i === stats.length - 1 && stats.length % 2 === 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
            >
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <div className="text-2xl font-bold text-fg md:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted md:text-sm">
                  {label}
                </div>
              </div>
              {/* Funny fact, revealed on hover */}
              <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-center font-mono text-[11px] leading-relaxed text-cyan">
                  {fun}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2 text-dim transition-colors hover:text-fg"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
