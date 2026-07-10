import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups, softSkills } from "@/data/resume";

// Flat list for the scrolling marquee strip.
const marqueeSkills = [
  "Laravel", "PHP", "Next.js", "React", "TypeScript", "MySQL", "MongoDB",
  "Docker", "n8n", "AWS", "GitHub CI/CD", "Python", "REST APIs", "Metabase",
];

export default function Skills() {
  return (
    <Section id="skills" eyebrow="03 · Skills" title="What I work with." glow="cyan">
      {/* Marquee strip */}
      <Reveal className="mb-12">
        <div className="glass relative overflow-hidden rounded-2xl py-4 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-8 pr-8">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-sm text-muted"
              >
                {skill}
                <span aria-hidden className="text-violet/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={(i % 3) * 0.08}>
            <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted transition-colors hover:border-violet/40 hover:text-fg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-dim">
          <span className="eyebrow">Beyond code</span>
          {softSkills.map((skill, i) => (
            <span key={skill} className="flex items-center gap-3 text-muted">
              {i > 0 && <span aria-hidden className="text-dim">·</span>}
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
