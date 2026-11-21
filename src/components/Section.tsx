import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { Decode } from "./motion";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Soft full-bleed background band to set the section apart. */
  alt?: boolean;
};

/** Shared section shell: anchor, decoding eyebrow, big heading, content. */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  alt = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative border-t border-border ${alt ? "bg-surface/35" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-28">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.13em] text-accent uppercase before:h-px before:w-6 before:bg-accent">
          <Decode text={eyebrow} />
        </p>
        <Reveal>
          <h2 id={`${id}-heading`} className="mb-10 text-3xl leading-[1.05] font-semibold tracking-[-0.045em] text-balance text-fg sm:text-4xl md:mb-14 lg:text-[3.4rem]">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
