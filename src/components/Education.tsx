import { GraduationCap } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/data/resume";

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="04 · Education"
      title="Where it started."
      alt
      glow="violet"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.1}>
            <div className="glass flex h-full gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
              <div className="h-fit rounded-xl bg-violet/10 p-2.5 text-violet">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="font-semibold leading-snug text-fg">{edu.school}</h3>
                <p className="mt-1 text-sm text-muted">{edu.degree}</p>
                <p className="mt-2 font-mono text-xs tracking-wider text-dim">
                  {edu.period}
                  {edu.detail && (
                    <span className="ml-3 text-cyan">{edu.detail}</span>
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
