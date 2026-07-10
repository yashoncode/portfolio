import { Sparkles, Server, Workflow, Layout } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

const focus = [
  {
    icon: Server,
    title: "Backend Ownership",
    text: "Laravel REST APIs, CRM & ERP modules designed, built, and run end to end — often as the sole engineer.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    text: "n8n, Google Apps Script, and custom tools automating daily operations for an entire company.",
  },
  {
    icon: Layout,
    title: "Full-Stack Delivery",
    text: "Extending backend ownership into Next.js and React apps — design to deploy via CI/CD, Docker, and Coolify.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Shipping",
    text: "LLM tools and AI automation woven into workflows and the development process itself to ship faster.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title="Building reliable systems, end to end."
      glow="violet"
    >
      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {profile.summary}
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {focus.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                <div className="mb-4 inline-flex rounded-xl bg-violet/10 p-2.5 text-violet transition-colors group-hover:bg-violet/20">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 font-semibold text-fg">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
