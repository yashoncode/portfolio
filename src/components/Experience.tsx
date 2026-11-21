import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import CurrentEgg from "./CurrentEgg";
import { Timeline, TimelineNode } from "./motion";
import { experience, type ExperiencePoint } from "@/data/resume";

/** "3 GB → 200 MB" style titles become the visual anchor of their row. */
function Metric({ title }: { title: string }) {
  const [from, to] = title.split("→").map((part) => part.trim());
  return (
    <p className="flex flex-wrap items-baseline gap-x-2.5 font-mono text-2xl leading-none font-medium tracking-[-0.05em] text-accent tabular-nums sm:text-[1.9rem]">
      <span className="text-muted line-through decoration-1 decoration-dim/70">{from}</span>
      <span aria-hidden className="text-dim">→</span>
      <span className="sr-only">down to</span>
      <span className="slide-in inline-block">{to}</span>
    </p>
  );
}

function Highlight({ point }: { point: ExperiencePoint }) {
  const isMetric = point.featured && point.title.includes("→");
  return (
    <li className="rise relative py-5 pr-1">
      <span aria-hidden className="rule" />
      {isMetric ? (
        <Metric title={point.title} />
      ) : (
        <h4 className={`font-medium tracking-tight ${point.featured ? "text-accent" : "text-fg"}`}>{point.title}</h4>
      )}
      <p className={`text-sm leading-relaxed text-muted ${isMetric ? "mt-3" : "mt-1.5"}`}>{point.text}</p>
    </li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="02 · Experience" title="My journey so far." alt>
      <Timeline>
        <div className="flex flex-col gap-16 md:gap-24">
          {experience.map((job) => (
            <article key={`${job.role}-${job.period}`} className="relative grid gap-6 pl-7 sm:pl-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
              <TimelineNode current={job.current} />

              <header className="lg:sticky lg:top-24 lg:self-start">
                <h3 className="text-xl leading-tight font-semibold tracking-tight text-balance text-fg md:text-2xl">
                  {job.role}
                </h3>
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 py-1 text-accent underline-offset-4 hover:underline"
                  >
                    {job.company}
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                ) : (
                  <p className="mt-1.5 py-1 text-accent">{job.company}</p>
                )}
                <div className="relative mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs leading-relaxed text-muted">
                  <span>{job.period}</span>
                  {job.current && <CurrentEgg />}
                </div>
              </header>

              <ul className="grid gap-x-10 sm:grid-cols-2">
                {job.points.map((point) => (
                  <Highlight key={point.title} point={point} />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Timeline>
    </Section>
  );
}
