import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile, languages } from "@/data/resume";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="06 · Contact"
      title="Let's build something together."
      alt
    >
      <div className="relative overflow-hidden rounded-3xl">
        {/* Glow backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet/20 blur-[120px]" />
          <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]" />
        </div>

        <Reveal>
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-14">
            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Whether it&apos;s a role, a project, or just an idea worth
              exploring — I&apos;d love to hear from you. My inbox is always
              open.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="accent-gradient group inline-flex min-w-0 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:px-7 sm:text-sm"
              >
                <Mail size={16} className="shrink-0" />
                <span className="truncate">{profile.email}</span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
              <div className="flex items-center gap-5">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <GithubIcon size={18} /> GitHub
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <LinkedinIcon size={18} /> LinkedIn
                </a>
              </div>
              <p className="font-mono text-xs tracking-wider text-dim">
                Speaks {languages.join(" · ")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
