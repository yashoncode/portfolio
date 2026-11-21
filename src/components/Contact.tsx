import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile, languages } from "@/data/resume";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="07 · Contact"
      title="Let's build something together."
      alt
    >
      <Reveal>
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Whether it&apos;s a role, a project, or just an idea worth
          exploring, I&apos;d love to hear from you. My inbox is always
          open.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="group/mail mt-8 inline-flex max-w-full items-baseline gap-3 font-mono text-[clamp(1.05rem,4.4vw,2.6rem)] leading-tight font-medium tracking-[-0.04em] text-fg"
        >
          <span className="min-w-0 break-all bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 group-hover/mail:bg-[length:100%_100%] group-hover/mail:text-[#0a0f1a]">
            {profile.email}
          </span>
          <ArrowUpRight aria-hidden className="size-[0.8em] shrink-0 text-accent transition-transform group-hover/mail:-translate-y-1 group-hover/mail:translate-x-1" />
        </a>

        <div className="relative mt-12 flex flex-wrap items-center justify-between gap-4 pt-6">
          <span aria-hidden className="rule" />
          <div className="flex items-center gap-6">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <GithubIcon size={17} /> GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <LinkedinIcon size={17} /> LinkedIn
            </a>
          </div>
          <p className="font-mono text-xs text-muted">
            Speaks {languages.join(" · ")}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
