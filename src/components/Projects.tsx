import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import Section from "./Section";
import Reveal from "./Reveal";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 · Projects"
      title="Open-source AI, built in the open."
      glow="violet"
    >
      <div className="flex flex-col gap-4">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <article className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 md:p-8">
              <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-xl font-semibold text-fg transition-colors hover:text-violet md:text-2xl"
                >
                  {project.name}
                  <ArrowUpRight
                    size={16}
                    className="opacity-40 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                  />
                </a>
                <div className="flex items-center gap-3 font-mono text-xs text-dim">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
                  >
                    <GithubIcon size={14} />
                    source
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan transition-colors hover:text-fg"
                    >
                      <ExternalLink size={13} />
                      live demo
                    </a>
                  )}
                </div>
              </div>

              <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                {project.blurb}
              </p>

              <ul className="mb-6 flex flex-col gap-2.5">
                {project.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-xs leading-relaxed text-muted before:absolute before:left-0 before:top-[7px] before:h-1 before:w-2.5 before:rounded-full before:bg-violet/50 md:text-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-violet/25"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
