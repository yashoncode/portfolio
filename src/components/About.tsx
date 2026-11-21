import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/resume";

const focus = [
  {
    title: "Agentic AI Systems",
    text: "Multi-agent systems, RAG pipelines, and agentic knowledge bases in Python and FastAPI: LangGraph, LangChain, MCP, pgvector, Langfuse.",
  },
  {
    title: "Backend Ownership",
    text: "Laravel REST APIs, CRM & ERP modules designed, built, and run end to end, often as the sole engineer.",
  },
  {
    title: "Full-Stack Delivery",
    text: "Laravel, React, and Next.js apps for logistics and freight forwarding, design to deploy via CI/CD, Docker, and Coolify.",
  },
  {
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
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="max-w-[60ch] text-base leading-relaxed text-muted md:text-[1.08rem]">
            {profile.summary}
          </p>
        </Reveal>

        <ul className="lg:col-span-7">
          {focus.map(({ title, text }) => (
            <li key={title} className="rise relative grid gap-1.5 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <span aria-hidden className="rule" />
              <h3 className="font-medium tracking-tight text-fg">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
          <li aria-hidden className="rule relative! block" />
        </ul>
      </div>
    </Section>
  );
}
