"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Radio } from "lucide-react";
import { profile, stats, type StatDetail } from "@/data/resume";
import StatModal from "./StatModal";
import { CountUp } from "./motion";
import styles from "./Hero.module.css";

const istClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function Clock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(istClock.format(new Date()));
    const firstTick = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-muted">
      <Clock3 size={13} aria-hidden="true" className="mr-0.5 text-dim" />
      <span className="tabular-nums text-fg">{time}</span>
      IST
    </span>
  );
}

const FAMILY_TAIL = "evadoss";

function Identity() {
  const [expanded, setExpanded] = useState(false);
  const split = profile.name.lastIndexOf(" ");

  useEffect(() => {
    if (!expanded) return;
    const timer = setTimeout(() => setExpanded(false), 3000);
    return () => clearTimeout(timer);
  }, [expanded]);

  return (
    <div className="min-w-0 self-center">
      {/* Same font size in both states: the tail letters unfold by width and the
          whole line scales down on the compositor, so nothing reflows or jumps. */}
      <h1 aria-label={profile.name} className={`${styles.name} ${expanded ? styles.expanded : ""}`}>
        {profile.name.slice(0, split)}{" "}
        <button
          type="button"
          aria-label={expanded ? "Devadoss, collapse family name" : "D, reveal family name"}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className={`${styles.initial} cursor-pointer text-accent`}
        >
          {profile.name.slice(split + 1)}
          <span className={styles.tail} aria-hidden="true">
            <span>{FAMILY_TAIL}</span>
          </span>
        </button>
      </h1>
      <p className="mt-3 font-mono text-[0.74rem] font-medium tracking-[0.11em] text-accent uppercase sm:text-sm">
        {profile.title}
      </p>
      <p className="mt-6 max-w-[34rem] text-xl leading-snug font-medium tracking-tight text-balance text-fg sm:text-[1.47rem]">
        {profile.tagline}
      </p>
      <p className="mt-3 max-w-[34rem] text-sm leading-relaxed text-muted sm:text-[0.97rem]">
        {profile.heroDescription}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a href="#projects" className={styles.primaryAction}>
          View projects <ArrowRight size={15} aria-hidden="true" />
        </a>
        <a href="#contact" className={`glass ${styles.secondaryAction}`}>
          Get in touch <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** A ledger: figure, label, and a cue for rows that lead somewhere. */
function Manifest({ totalStars }: { totalStars: number | null }) {
  const [detail, setDetail] = useState<StatDetail | null>(null);

  const row = (value: string, label: string, cue?: ReactNode) => (
    <>
      <span className={styles.fig}><CountUp value={value} /></span>
      <span className={styles.rowLabel}>{label}</span>
      {cue && <span className={styles.rowCue} aria-hidden="true">{cue}</span>}
    </>
  );

  return (
    <>
      <ul className={styles.manifest} aria-label="Career and GitHub figures">
        {stats.map((stat) => (
          <li key={stat.label}>
            {stat.href ? (
              <a className={styles.row} href={stat.href}>{row(stat.value, stat.label, "→")}</a>
            ) : stat.detail ? (
              <button type="button" aria-haspopup="dialog" className={styles.row} onClick={() => setDetail(stat.detail!)}>
                {row(stat.value, stat.label, "+")}
              </button>
            ) : (
              <div className={styles.row}>{row(stat.value, stat.label)}</div>
            )}
          </li>
        ))}
        {totalStars !== null && (
          <li>
            <a className={`${styles.row} ${styles.stars}`} href={profile.links.github} target="_blank" rel="noreferrer">
              {row(totalStars.toLocaleString("en-US"), "GitHub stars, live", <i className={styles.liveDot} />)}
            </a>
          </li>
        )}
      </ul>
      <StatModal detail={detail} onDismiss={() => setDetail(null)} />
    </>
  );
}

export default function Hero({
  children,
  nowPanel,
  totalStars = null,
}: {
  children?: ReactNode;
  nowPanel: ReactNode;
  totalStars?: number | null;
}) {
  return (
    <section id="top" className="relative">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-22 pb-10 sm:px-6 sm:pt-24 lg:pt-28">
        <div className={styles.statusBar}>
          <span className="inline-flex items-center gap-2 font-semibold tracking-[0.08em] text-fg">
            <Radio size={16} className="text-accent" aria-hidden="true" />
            YD / OPS
          </span>
          <span className={styles.shipping}><i aria-hidden="true" />SHIPPING</span>
          <span className="ml-auto"><Clock /></span>
        </div>
        <div className={styles.identityAndRoute}>
          <Identity />
          {nowPanel}
        </div>
        <Manifest totalStars={totalStars} />
        {children && <div className="mt-10 sm:mt-12">{children}</div>}
        <a href="#about" aria-label="Scroll to about" className={`${styles.scrollCue} mx-auto mt-8 flex size-10 items-center justify-center rounded-md text-dim hover:text-accent`}>
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
