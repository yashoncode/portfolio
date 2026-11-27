import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/resume";
import styles from "./sections.module.css";

const marqueeSkills = skillGroups.flatMap(({ skills }) => skills.slice(0, 4));

export default function Skills() {
  return (
    <Section id="skills" eyebrow="04 · Skills" title="What I work with.">
      {/* Marquee strip */}
      <Reveal className="mb-5">
        <div className="overflow-hidden border-y border-border py-3.5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
          <div className={`${styles.ticker} flex w-max gap-6 pr-6`}>
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                aria-hidden={i >= marqueeSkills.length || undefined}
                className={`flex items-center gap-6 font-mono text-xs whitespace-nowrap text-muted ${i >= marqueeSkills.length ? "motion-reduce:hidden" : ""}`}
              >
                {skill}
                <span aria-hidden className="h-1 w-1 bg-accent" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <ul className="mt-4">
        {skillGroups.map((group) => (
          <li key={group.label} className="rise relative grid gap-2 py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
            <span aria-hidden className="rule" />
            <h3 className="font-mono text-[11px] font-medium tracking-[0.14em] text-dim uppercase md:pt-1">{group.label}</h3>
            <p className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed text-fg">
              {/* Separator rides at the end of each item so a wrap never starts a line with it. */}
              {group.skills.map((skill, i) => (
                <span key={skill} className="inline-flex items-center gap-2">
                  <span className="transition-colors hover:text-accent">{skill}</span>
                  {i < group.skills.length - 1 && <span aria-hidden className="text-dim">·</span>}
                </span>
              ))}
            </p>
          </li>
        ))}
        <li aria-hidden className="rule relative! block" />
      </ul>
    </Section>
  );
}
