import { Bot, Server, Workflow, Layout } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

const focus = [
  {
    icon: Bot,
    title: "Agentic AI Systems",
    text: "Multi-agent systems, RAG pipelines, and agentic knowledge bases in Python and FastAPI: LangGraph, LangChain, MCP, pgvector, Langfuse.",
  },
  {
    icon: Server,
    title: "Backend Ownership",
    text: "Laravel REST APIs, CRM & ERP modules designed, built, and run end to end, often as the sole engineer.",
  },
  {
    icon: Layout,
    title: "Full-Stack Delivery",
    text: "Laravel, React, and Next.js apps for logistics and freight forwarding, design to deploy via CI/CD, Docker, and Coolify.",
  },
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    text: "n8n, LLM-driven document handling, and custom tools automating daily operations for an entire company.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · About"
      title="Full-stack systems, now with agents."
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
