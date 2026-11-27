import { ArrowUpRight, Download, ExternalLink, GitFork, Plus, Star } from "lucide-react";
import { projects, type Project } from "@/data/resume";
import type { RepoCounts } from "@/lib/github";
import { GithubIcon } from "./icons";
import { CountUp } from "./motion";
import Section from "./Section";

type Counts = RepoCounts[string];

function Points({ points }: { points: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
      {points.map((point) => (
        <li key={point} className="flex gap-3">
          <span aria-hidden className="mt-[0.65em] h-px w-2.5 shrink-0 bg-accent" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 text-muted transition-colors hover:text-accent">
        <GithubIcon size={14} /> Source<span className="sr-only"> for {project.name}</span><ArrowUpRight size={12} aria-hidden />
      </a>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 text-accent transition-colors hover:text-fg">
          <ExternalLink size={13} aria-hidden /> Live demo<span className="sr-only"> of {project.name}</span>
        </a>
      )}
    </div>
  );
}

function Featured({ project, counts }: { project: Project; counts?: Counts }) {
  return (
    <article className="rise relative mb-12 overflow-hidden rounded-xl border border-accent/40 bg-surface">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12 lg:p-10">
        <div className="min-w-0">
          <p className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent uppercase">
            <span aria-hidden className="h-px w-5 bg-accent" /> Featured project
          </p>
          <h3 className="text-4xl font-semibold tracking-[-0.045em] text-fg sm:text-5xl">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              {project.name}
            </a>
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.blurb}</p>
          <div className="mt-6 max-w-2xl"><Points points={project.points} /></div>
          <p className="mt-6 font-mono text-xs text-dim">{project.stack.join(" · ")}</p>
        </div>

        <aside className="flex flex-col gap-6 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {counts && counts.stars > 0 && (
            <div className="font-mono">
              <p className="flex items-center gap-1.5 text-[11px] tracking-wider text-muted uppercase">
                <Star size={13} className="text-accent" aria-hidden /> GitHub stars
              </p>
              <p className="mt-2 text-6xl leading-none font-medium tracking-[-0.06em] text-accent tabular-nums">
                <CountUp value={counts.stars.toLocaleString("en-US")} />
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                {counts.forks > 0 && (
                  <span className="inline-flex items-center gap-1.5"><GitFork size={12} aria-hidden />{counts.forks} forks</span>
                )}
                <span className="inline-flex items-center gap-1.5 text-ok"><span aria-hidden className="size-1.5 rounded-full bg-ok" />live from GitHub</span>
              </p>
            </div>
          )}
          <div className="flex flex-col gap-1 lg:mt-auto">
            {project.downloadUrl && (
              <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="group/dl inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 font-mono text-sm font-semibold text-[#0a0f1a] transition-[filter] hover:brightness-110">
                <Download size={15} aria-hidden className="transition-transform group-hover/dl:translate-y-0.5" /> Download<span className="sr-only"> {project.name}</span>
              </a>
            )}
            <Links project={project} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function Row({ project, counts }: { project: Project; counts?: Counts }) {
  const stars = counts && counts.stars > 0 ? counts.stars : null;
  const forks = counts && counts.forks > 0 ? counts.forks : null;

  return (
    <li className="rise relative">
      <span aria-hidden className="rule" />
      <details className="group/row">
        <summary className="-mx-3 grid cursor-pointer list-none gap-x-8 gap-y-2 rounded-md px-3 py-6 transition-colors hover:bg-surface/60 md:grid-cols-[14rem_minmax(0,1fr)_auto] md:items-baseline [&::-webkit-details-marker]:hidden">
          <h3 className="flex items-center justify-between gap-4 text-xl font-semibold tracking-tight text-fg transition-colors group-hover/row:text-accent sm:text-2xl">
            {project.name}
            {stars !== null && (
              <span className="inline-flex items-center gap-1 font-mono text-sm font-medium text-accent tabular-nums md:hidden">
                <Star size={13} aria-hidden />{stars}
              </span>
            )}
          </h3>
          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">{project.blurb}</p>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-dim">{project.stack.join(" · ")}</p>
          </div>
          <div className="hidden items-center gap-4 font-mono text-sm tabular-nums md:flex">
            {stars !== null && (
              <span className="inline-flex items-center gap-1.5 text-accent"><Star size={13} aria-hidden />{stars}<span className="sr-only"> stars</span></span>
            )}
            {forks !== null && (
              <span className="inline-flex items-center gap-1.5 text-muted"><GitFork size={13} aria-hidden />{forks}<span className="sr-only"> forks</span></span>
            )}
            <Plus size={16} aria-hidden className="text-dim transition-transform duration-300 group-open/row:rotate-45 group-hover/row:text-accent" />
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-dim md:hidden">
            <Plus size={12} aria-hidden className="transition-transform duration-300 group-open/row:rotate-45" />
            <span className="group-open/row:hidden">Details</span><span className="hidden group-open/row:inline">Close</span>
          </span>
        </summary>
        <div className="grid gap-x-8 pb-7 md:grid-cols-[14rem_minmax(0,1fr)_auto]">
          <div className="min-w-0 md:col-start-2">
            <Points points={project.points} />
            <div className="mt-4"><Links project={project} /></div>
          </div>
        </div>
      </details>
    </li>
  );
}

export default function Projects({ repos }: { repos: RepoCounts | null }) {
  const withCounts = projects.map((project) => ({
    project,
    counts: project.repo ? repos?.[project.repo.toLowerCase()] : undefined,
  }));
  const featured = withCounts.find(({ project }) => project.featured);
  const rest = withCounts.filter(({ project }) => !project.featured);

  return (
    <Section id="projects" eyebrow="03 · Projects" title="Open source, shipped and starred.">
      {featured && <Featured project={featured.project} counts={featured.counts} />}
      <ul>
        {rest.map(({ project, counts }) => (
          <Row key={project.name} project={project} counts={counts} />
        ))}
        <li aria-hidden className="rule relative! block" />
      </ul>
    </Section>
  );
}
