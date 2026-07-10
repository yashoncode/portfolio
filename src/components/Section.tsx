import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Glow = "violet" | "cyan" | "indigo" | "none";

const glowStyles: Record<Exclude<Glow, "none">, string> = {
  violet: "bg-violet/10",
  cyan: "bg-cyan/10",
  indigo: "bg-indigo/10",
};

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Soft full-bleed background band to set the section apart. */
  alt?: boolean;
  /** Accent glow tint behind the section heading. */
  glow?: Glow;
};

/** Shared section shell: anchor, eyebrow label, big heading, revealed content. */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  alt = false,
  glow = "none",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${alt ? "bg-bg-soft/60" : ""} ${className}`}
    >
      {glow !== "none" && (
        <div
          aria-hidden
          className={`absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-[140px] ${glowStyles[glow]}`}
        />
      )}
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-28 lg:py-32">
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl md:mb-12 md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

