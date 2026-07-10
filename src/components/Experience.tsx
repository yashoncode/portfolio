import {
  Zap,
  Users,
  Server,
  Sparkles,
  Database,
  Layout,
  FileText,
  Workflow,
  Rocket,
  Plug,
  BarChart3,
  Wrench,
  Activity,
  Cloud,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { experience } from "@/data/resume";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  users: Users,
  server: Server,
  sparkles: Sparkles,
  database: Database,
  layout: Layout,
  "file-text": FileText,
  workflow: Workflow,
  rocket: Rocket,
  plug: Plug,
  "bar-chart": BarChart3,
  wrench: Wrench,
  activity: Activity,
  cloud: Cloud,
};

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 · Experience"
      title="My journey so far."
      alt
      glow="indigo"
    >
      <div className="relative">
        {/* Timeline spine */}
        <div
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-border-strong to-transparent md:left-[9px]"
        />

        <div className="flex flex-col gap-12 md:gap-16">
          {experience.map((job, i) => (
            <Reveal key={`${job.role}-${job.period}`} delay={i * 0.05}>
              <article className="relative pl-8 sm:pl-10 md:pl-14">
                {/* Timeline node */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 md:h-[19px] md:w-[19px] ${
                    job.current
                      ? "border-violet bg-violet/30"
                      : "border-border-strong bg-surface"
                  }`}
                >
                  {job.current && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet" />
                  )}
                </span>

                <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold text-fg md:text-2xl">
                    {job.role}
                  </h3>
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-0.5 text-violet transition-colors hover:text-cyan"
                    >
                      @ {job.company}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  ) : (
                    <span className="text-violet">@ {job.company}</span>
                  )}
                </div>
                <p className="mb-6 font-mono text-xs tracking-wider text-dim">
                  {job.period}
                  {job.current && (
                    <span className="ml-3 rounded-full border border-violet/40 bg-violet/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet">
                      Current
                    </span>
                  )}
                </p>

                {/* Achievement cards */}
                <ul className="grid gap-3 sm:grid-cols-2">
                  {job.points.map((point) => {
                    const Icon = icons[point.icon] ?? Server;
                    return (
                      <li
                        key={point.title}
                        className={`glass group flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 ${
                          point.featured ? "border-violet/25" : ""
                        }`}
                      >
                        <div
                          className={`h-fit shrink-0 rounded-xl p-2.5 transition-colors ${
                            point.featured
                              ? "bg-cyan/10 text-cyan group-hover:bg-cyan/20"
                              : "bg-violet/10 text-violet group-hover:bg-violet/20"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4
                            className={`font-mono text-sm font-bold ${
                              point.featured ? "text-cyan" : "text-fg"
                            }`}
                          >
                            {point.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-muted">
                            {point.text}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
