import { BookOpen, FileBadge, Trophy, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { publications, patents, awards } from "@/data/resume";

export default function Recognition() {
  return (
    <Section
      id="recognition"
      eyebrow="05 · Recognition"
      title="Research & recognition."
      glow="indigo"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Publications */}
        <Reveal>
          <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-violet/10 p-2.5 text-violet">
                <BookOpen size={20} />
              </div>
              <h3 className="font-semibold text-fg">Publications</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {publications.map((pub) => (
                <li key={pub.title}>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/pub block"
                  >
                    <p className="text-sm leading-snug text-fg transition-colors group-hover/pub:text-cyan">
                      {pub.title}
                      <ArrowUpRight
                        size={13}
                        className="ml-1 inline-block opacity-40 transition-all group-hover/pub:-translate-y-0.5 group-hover/pub:translate-x-0.5 group-hover/pub:opacity-100"
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
          <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-cyan/10 p-2.5 text-cyan">
                <FileBadge size={20} />
              </div>
              <h3 className="font-semibold text-fg">Patent</h3>
            </div>
            {patents.map((patent) => (
              <div key={patent.appNo}>
                <p className="text-sm leading-snug text-fg">{patent.title}</p>
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
          <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-indigo/10 p-2.5 text-indigo">
                <Trophy size={20} />
              </div>
              <h3 className="font-semibold text-fg">Awards</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {awards.map((award) => (
                <li
                  key={award}
                  className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[9px] before:h-1 before:w-2.5 before:rounded-full before:bg-indigo/50"
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
