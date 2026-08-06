// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit values here to update the site. Links marked TODO are placeholders —
// swap them for the real URLs.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Yashwanth D",
  title: "Full-Stack Developer · AI Systems",
  tagline: "I build reliable systems that people depend on every day.",
  location: "India",
  summary:
    "Software Engineer at Stockarea building scalable full-stack applications with Laravel, React, and Next.js. I develop software that streamlines logistics and freight forwarding operations, plus AI-powered automation workflows that improve business processes and operational efficiency. Deeply into Generative AI, and actively building open-source AI projects with Python and FastAPI: LLM applications, multi-agent systems, RAG pipelines, AI document analysis, and AI-powered SQL query generation.",
  email: "yashwanth.devadoss@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/yashwanth-devadoss/",
    github: "https://github.com/yashoncode",
  },
};

// Headline metrics surfaced in the hero + about sections.
// `fun` shows on hover — keep them short enough to fit the card.
// `href` makes the card a link; use it to point at the section that proves the number.
// `detail` makes the card open a modal instead — for numbers that need the story,
// not just a destination. Set one or the other, never both.
export type StatDetail = {
  title: string;
  intro: string;
  sections: { heading: string; body?: string; points?: string[] }[];
};

export type Stat = {
  value: string;
  label: string;
  fun: string;
  href?: string;
  detail?: StatDetail;
};

export const stats: Stat[] = [
  {
    value: "4+",
    label: "Years shipping production software",
    fun: "Still zero DROP TABLE incidents. Touch wood.",
    href: "#experience",
  },
  {
    value: "3",
    label: "Open-source AI projects shipped",
    fun: "Multi-agent RAG, text-to-SQL, prompt engineering. All public.",
    href: "#projects",
  },
  {
    value: "60×",
    label: "Faster logistics report APIs (~5 min → ~5 sec)",
    fun: "Reports now load faster than my excuses. Click for the how.",
    detail: {
      title: "From 5 minutes to 5 seconds",
      intro:
        "The Excel export API was the slowest thing in the platform. Reports took around 5 minutes and peaked near 3 GB of memory. It now takes about 5 seconds at roughly 200 MB, and memory no longer grows with row count.",
      sections: [
        {
          heading: "The problem: Blade was building spreadsheets",
          body: "The export was rendered through Blade, Laravel's HTML template engine, with a PHP class per report and the sheet markup assembled from a template. Blade has no concept of flushing: it compiles the whole view and buffers it into a single string before returning anything. So a large export held the dataset in memory twice over, once as hydrated models and again as the fully rendered output, and both grew linearly with the number of rows. Blade is the right tool for a web page and the wrong one for a 100k-row file.",
        },
        {
          heading: "The fix: OpenSpout, a streaming writer",
          body: "OpenSpout is a PHP reader and writer for CSV, XLSX and ODS files, and the maintained successor to the abandoned box/spout. Instead of building an in-memory object model of the workbook, it writes one row at a time straight to the output file and immediately releases it. Memory stays flat regardless of file size, and the project documents staying under about 3 MB. That is the opposite of PhpSpreadsheet, which materialises every cell as a PHP object, so its memory scales with rows multiplied by columns.",
        },
        {
          heading: "My tweaks on top of it",
          points: [
            "Replaced the Blade render step with a row-by-row OpenSpout writer, so nothing is buffered before it is written.",
            "Fed the writer from a chunked query instead of one big result set, so the ORM never holds every record at once.",
            "Worked with plain arrays rather than fully hydrated models, cutting per-row object overhead.",
            "Resolved lookups once before the loop instead of querying inside it.",
            "Streamed the file out as it was written rather than assembling it and then sending it.",
          ],
        },
        {
          heading: "Result",
          body: "Peak memory fell from roughly 3 GB to roughly 200 MB and response time from about 5 minutes to about 5 seconds. The important part is not the multiple, it is that memory is now roughly constant, so the next tenfold increase in report size does not bring the endpoint down.",
        },
      ],
    },
  },
  {
    value: "4",
    label: "Production systems built end to end",
    fun: "CRM, ERP, warehouse & finance. Click for what each one does.",
    detail: {
      title: "Four systems, built end to end",
      intro:
        "Four domains of Stockarea's platform where I owned the data model, the architecture and the implementation rather than a slice of it.",
      sections: [
        {
          heading: "CRM: leads through to onboarding",
          body: "Lead management with deals, carrying a lead all the way to onboarding as either a customer or a vendor organisation. Onboarded organisations are then linked to warehouses and the other modules, so the rest of the platform can act on them instead of the CRM being a dead end.",
        },
        {
          heading: "ERP: the freight and customs enquiry lifecycle",
          body: "An enquiry management system covering the full cycle. An enquiry arrives for freight or customs services, schedules are collected from the vendors, pricing is quoted back to the customer, and once confirmed the flow moves into onboarding and the operations that follow.",
        },
        {
          heading: "Warehouse and asset management",
          points: [
            "Product kits: grouping individual products so they can be stocked and moved as one unit.",
            "Warehouse position management: which lot position holds the stock from a given inventory, so storage is traceable and space is used profitably.",
            "Contract and expense-contract management.",
            "Inward and outward movement of inventory.",
            "Organisation management.",
          ],
        },
        {
          heading: "Finance: Zoho Books integration",
          body: "Invoices, purchase orders and bills kept in sync with the Zoho Books API over webhooks. On top of that, automated profit and revenue reporting so the finance team can send, track and follow up on invoices, plus vendor management for bill payments and expense tracking.",
        },
      ],
    },
  },
  {
    value: "Researcher",
    label: "1 patent filed, 2 IEEE publications",
    fun: "Click to read the papers and the patent.",
    href: "#recognition",
  },
];

// Icon keys map to lucide icons in the Experience component.
export type ExperiencePoint = {
  icon: string;
  title: string;
  text: string;
  /** Marks a headline metric — rendered with extra emphasis. */
  featured?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current?: boolean;
  points: ExperiencePoint[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer L1 → L2",
    company: "Stockarea",
    companyUrl: "https://stockarea.io/",
    period: "Oct 2024 - Present · L2 since Apr 2026",
    current: true,
    points: [
      {
        icon: "zap",
        title: "3 GB → 200 MB",
        featured: true,
        text: "Diagnosed and fixed a major report-generation bottleneck: memory cut from ~3 GB to ~200 MB, response time from ~5 min to ~5 sec, by restructuring how large datasets are queried and processed.",
      },
      {
        icon: "users",
        title: "Company-wide automation",
        text: "Built and maintain the workflow-automation tools every team runs on, streamlining daily operations across the company.",
      },
      {
        icon: "server",
        title: "One admin API, four domains",
        text: "Build and own the Laravel admin API powering core logistics workflows across CRM, ERP, positions, and asset management.",
      },
      {
        icon: "sparkles",
        title: "CRM built, end to end",
        text: "Designed and built the company's CRM modules and workflows end to end, with AI-powered automation integrated into the flows.",
      },
      {
        icon: "database",
        title: "Asset management backend",
        text: "Designed and built the positions & asset-management backend end to end as the sole engineer, covering data structuring, architecture, and implementation.",
      },
      {
        icon: "layout",
        title: "Full-stack with Next.js & React",
        text: "Developing internal web applications, extending ownership from backend APIs to full-stack delivery.",
      },
      {
        icon: "bot",
        title: "AI automation in production",
        featured: true,
        text: "Build AI-powered automation workflows into logistics and CRM processes, with LLM-driven document and data handling that removes manual steps and speeds up operations.",
      },
      {
        icon: "file-text",
        title: "Finance module & Zoho Books",
        text: "Built and maintain the finance module: invoices, purchase orders, and bills synced with the Zoho Books API over webhooks, with automated profit and revenue reporting for the finance team, plus vendor bill-payment and expense tracking.",
      },
      {
        icon: "workflow",
        title: "AI voice calls in production",
        text: "Three outreach channels for the sales team on n8n with open-source LLMs: email, WhatsApp reminders, and AI voice calls handling 100+ calls a week, with constrained prompts, response validation, failure logging, and automatic retries. Follow-up work that filled a rep's day now takes 5 to 15 minutes.",
      },
      {
        icon: "rocket",
        title: "Own the whole pipeline",
        text: "End-to-end delivery: design, testing, debugging, and deployment via GitHub CI/CD, Docker, and Coolify.",
      },
    ],
  },
  {
    role: "Solutions Architect, Automation",
    company: "Stockarea",
    companyUrl: "https://stockarea.io/",
    period: "Aug 2023 - Oct 2024",
    points: [
      {
        icon: "workflow",
        title: "Automation foundation",
        text: "Designed and built the base of Stockarea's internal automation, translating business operations into reliable backend workflows.",
      },
      {
        icon: "plug",
        title: "Systems integration",
        text: "Backend integrations with Laravel and Google APIs connecting disparate internal tools.",
      },
      {
        icon: "bar-chart",
        title: "Data & reporting",
        text: "Reporting and data-management with Metabase, MongoDB, and SQL to support operational decision-making.",
      },
      {
        icon: "wrench",
        title: "Early tooling",
        text: "Workflow tools in Google Apps Script and AppSheet that became part of daily operations.",
      },
    ],
  },
  {
    role: "Founder & Software Lead",
    company: "Flare Innovations",
    period: "Feb 2022 - Jun 2023",
    points: [
      {
        icon: "rocket",
        title: "Founded the company",
        text: "Founded and led development of IoT-based monitoring systems for aquaculture and hydroponics environments.",
      },
      {
        icon: "activity",
        title: "Real-time sensor data",
        text: "Python applications processing and analyzing live sensor data from hardware devices.",
      },
      {
        icon: "cloud",
        title: "Hardware → cloud",
        text: "Integrated hardware sensors with cloud systems for remote, real-time monitoring.",
      },
      {
        icon: "users",
        title: "Led a 10-person team",
        text: "Led a 10-person team through product prototyping, deployment, and testing.",
      },
      {
        icon: "sparkles",
        title: "Incubated and deployed",
        text: "Incubated at ICAR-CIBA (Central Institute of Brackishwater Aquaculture) and Annamalai University, with a pilot system deployed at CIBA. Wound down after graduation to join Stockarea.",
      },
    ],
  },
];

export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Agentic AI & LLM",
    skills: [
      "Multi-Agent Systems",
      "RAG Pipelines",
      "LangChain",
      "LangGraph",
      "LangFlow",
      "MCP",
      "Prompt Engineering",
      "Human-in-the-Loop",
      "Agentic Knowledge Bases",
      "Text-to-SQL",
      "AI Document Analysis",
    ],
  },
  {
    label: "AI Engineering Stack",
    skills: [
      "Python",
      "FastAPI",
      "PGVector",
      "ChromaDB",
      "Langfuse",
      "Hybrid Retrieval (BM25 + Vector)",
      "Cross-Encoder Reranking",
      "Embeddings",
      "Streaming (SSE)",
      "Streamlit",
    ],
  },
  {
    label: "Backend Development",
    skills: [
      "Laravel",
      "PHP",
      "REST API Development",
      "CRM & ERP Modules",
      "API Integration",
      "Feature Testing",
      "Unit Testing",
      "PHPUnit",
      "Pytest",
    ],
  },
  {
    label: "Frontend Development",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  { label: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQL"] },
  {
    label: "Async Processing",
    skills: ["Laravel Jobs", "Event-Based Processing", "Task Scheduling"],
  },
  {
    label: "Automation & Workflow",
    skills: ["n8n", "Google Apps Script", "Zapier", "AppSheet"],
  },
  {
    label: "DevOps & Deployment",
    skills: ["AWS", "AWS RDS", "GitHub CI/CD", "Coolify", "Docker"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "Linux", "Metabase"],
  },
  { label: "Languages", skills: ["Python", "PHP", "JavaScript", "TypeScript"] },
];

export type Project = {
  name: string;
  blurb: string;
  url: string;
  liveUrl?: string;
  /** Two or three lines of what makes it interesting. */
  points: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "DocMagic",
    blurb:
      "Multi-agent RAG assistant that answers questions over logistics, ERP and CRM documents. Every answer is cited to the exact page or sheet.",
    url: "https://github.com/yashoncode/docmagic/tree/langgraph",
    liveUrl: "https://docmagic.streamlit.app/",
    points: [
      "LangGraph supervisor routes each question to one capability specialist (documents, spreadsheet data, arithmetic or live web search), so the model never juggles every tool at once.",
      "Hybrid retrieval fuses dense vector search with BM25, then re-scores with a cross-encoder reranker; ingestion runs metadata → analyst → reviewer with a bounded revision loop.",
      "Built twice on two branches, Next.js + FastAPI + pgvector and Streamlit + LCEL + Chroma, so the architectural trade-offs are visible side by side.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Next.js",
      "pgvector",
      "Langfuse",
      "SSE",
    ],
  },
  {
    name: "Tevel IntelliDB",
    blurb:
      "An AI-first SQL client: a database engineer, not a chat box. Ask in plain English, get safe, reviewable SQL.",
    url: "https://github.com/yashoncode/Tevel-IntelliDB",
    points: [
      "Schema-only RAG: the model reasons over metadata (tables, columns, keys, indexes, relationships) and never sees a single row of customer data.",
      "Schema Intelligence Layer with an FK relationship graph, join-path finding, and a business vocabulary that decodes cryptic names (tbl_cust_hdr → customer header).",
      "Read-only safety gate blocks writes and injection; invalid SQL goes through an auto-repair loop until it validates. Cross-platform desktop builds for Windows, macOS and Linux.",
    ],
    stack: [
      "Electron",
      "Vue 3",
      "TypeScript",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Embeddings",
    ],
  },
  {
    name: "ImaGen",
    blurb:
      "A prompt-engineering playground for image editing. Pick the technique, see exactly how it changes the result.",
    url: "https://github.com/yashoncode/imaGen-Prompt-Enhancement",
    points: [
      "Eight selectable prompting strategies (zero-shot, few-shot, structured, chain-of-thought, self-refine, meta-prompt, tree-of-thought and raw) compared on the same instruction.",
      "Always shows the exact messages sent to the LLM and the final prompt handed to the image model, so the technique's effect is measurable rather than magic.",
      "Brush a mask, and the edited frame is composited back over the original inside your region only, working around an image model with no server-side mask.",
    ],
    stack: ["Python", "Streamlit", "NVIDIA NIM", "FLUX.2", "Prompt Engineering", "Pillow"],
  },
];

export const softSkills = [
  "Problem Solving",
  "Fast Learner",
  "Adaptability",
  "Team Collaboration",
  "Communication",
  "Leadership",
  "Analytical Thinking",
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  detail?: string;
  /** Present on the card that hides an easter egg (see Education.tsx). */
  egg?: { title: string; text: string };
};

export const education: Education[] = [
  {
    school: "Sri Sairam Engineering College, Chennai",
    degree: "B.E. in Electronics & Communication Engineering",
    period: "2019 - 2023",
    detail: "CGPA: 9.05 / 10",
  },
  {
    school: "Leo Matriculation Higher Secondary School, Chennai",
    degree: "Higher Secondary (Computer Science)",
    period: "2019",
    egg: {
      title: "Average kid, then school topper.",
      text: "I finished school as the topper, but I did not start anywhere near the top. I was an average student until self learning and plain curiosity took over, and that is still how I pick up anything new.",
    },
  },
];

export const publications = [
  {
    title: "Intelligently Optimized System for Hydroponic Cultivation",
    venue: "IEEE Xplore",
    year: "2022",
    url: "https://ieeexplore.ieee.org/document/9767724",
  },
  {
    title: "Aiderbot: DTMF Based Medical Robot",
    venue: "IEEE Xplore",
    year: "2022",
    url: "https://ieeexplore.ieee.org/document/10047694",
  },
];

export const patents = [
  {
    title: "An Intelligent Transport Vehicle Management and Routing System",
    authority: "Intellectual Property India",
    appNo: "202241077102",
    detail: "Filed Dec 2022 · Published Jan 2023",
  },
];

export const awards = [
  "Mentor, Smart India Hackathon (SIH) Finalist Team, 2024",
  "Best Outgoing Student, Institution of Engineers India (IEI), 2023",
  "School Topper, SSLC (98%), 2017",
];

export const languages = ["English", "Tamil"];

// Anchors used by the navbar + smooth scroll.
export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];
