import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { publications, patents, awards } from "@/data/resume";

export default function Recognition() {
  return (
    <Section
      id="recognition"
      eyebrow="06 · Recognition"
      title="Research & recognition."
    >
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Publications */}
        <Reveal>
          <div className="relative pt-5">
            <span aria-hidden className="rule" />
            <h3 className="mb-6 font-mono text-[11px] font-medium tracking-[0.14em] text-dim uppercase">Publications</h3>
            <ul className="flex flex-col gap-5">
              {publications.map((pub) => (
                <li key={pub.title}>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/pub block"
                  >
                    <p className="leading-snug text-fg transition-colors group-hover/pub:text-accent">
                      {pub.title}
                      <ArrowUpRight
                        size={13}
                        aria-hidden
                        className="ml-1 inline-block text-accent"
                      />
                    </p>
                    <p className="mt-1 font-mono text-xs text-dim">
                      {pub.venue} · {pub.year}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Patent */}
        <Reveal delay={0.1}>
          <div className="relative pt-5">
            <span aria-hidden className="rule" />
            <h3 className="mb-6 font-mono text-[11px] font-medium tracking-[0.14em] text-dim uppercase">Patent</h3>
            {patents.map((patent) => (
              <div key={patent.appNo}>
                <p className="leading-snug text-fg">{patent.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {patent.authority}
                </p>
                <p className="mt-1 font-mono text-xs text-dim">
                  App. No: {patent.appNo}
                </p>
                <p className="mt-1 font-mono text-xs text-dim">{patent.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Awards */}
        <Reveal delay={0.2}>
          <div className="relative pt-5">
            <span aria-hidden className="rule" />
            <h3 className="mb-6 font-mono text-[11px] font-medium tracking-[0.14em] text-dim uppercase">Awards</h3>
            <ul className="flex flex-col gap-3">
              {awards.map((award) => (
                <li
                  key={award}
                  className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:top-[11px] before:left-0 before:h-px before:w-2 before:bg-accent"
                >
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
