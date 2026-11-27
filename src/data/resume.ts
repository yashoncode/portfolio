// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit values here to update the site. Links marked TODO are placeholders —
// swap them for the real URLs.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Yashwanth D",
  fullName: "Yashwanth Devadoss",
  title: "Full-Stack Developer | AI Systems & Automation",
  tagline: "I build business software and the automation that runs it.",
  heroDescription:
    "Developer at Stockarea, working on our CRM, ERP and finance systems, the AI automations between them, and LLM features in Python.",
  location: "India",
  summary:
    "I have 4+ years of combined experience in software engineering and technology leadership. I founded Flare Innovations in February 2022 and led its 10-person team until June 2023. Since joining Stockarea in August 2023, I've built production n8n workflows, REST APIs and database integrations for CRM, ERP and finance. I also build LLM applications in Python, including a document assistant that cites the page or sheet behind each answer.",
  email: "yashwanth.devadoss@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/yashwanth-devadoss/",
    github: "https://github.com/yashoncode",
  },
};

// Headline metrics surfaced in the hero + about sections.
// Rendered as ledger rows: the figure, then its label.
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
  href?: string;
  detail?: StatDetail;
};

export const stats: Stat[] = [
  {
    value: "4+",
    label: "Years shipping production software",
    href: "#experience",
  },
  {
    value: "100+",
    label: "AI voice calls a week, in production",
    href: "#experience",
  },
  {
    value: "60×",
    label: "Faster report APIs, 5 min down to 5 sec",
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
    value: "1",
    label: "Patent filed, plus 2 IEEE papers",
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
        icon: "workflow",
        title: "AI voice calls in production",
        featured: true,
        text: "Three outreach channels for the sales team on n8n with open-source LLMs: email, WhatsApp reminders, and AI voice calls handling 100+ calls a week, with constrained prompts, response validation, failure logging, and automatic retries. Follow-up work that filled a rep's day now takes 5 to 15 minutes.",
      },
      {
        icon: "users",
        title: "Company-wide automation",
        text: "I build and maintain the production workflows teams run daily in n8n, Zapier, CopilotKit and Google Apps Script. LLM steps extract fields from documents and process data for logistics and CRM.",
      },
      {
        icon: "file-text",
        title: "Finance automation with Zoho Books",
        text: "Built and maintain the finance module. Webhooks keep invoices, purchase orders and bills in sync with the Zoho Books API. The module automates profit and revenue reporting and tracks vendor bill payments and expenses.",
      },
      {
        icon: "table",
        title: "Google Sheets for daily operations",
        text: "Automated the Google Sheets that operations teams use for day-to-day updates. Apps Script pulls data in, fills the sheets and sends the updates, so nobody has to compile them by hand.",
      },
      {
        icon: "zap",
        title: "3 GB → 200 MB",
        featured: true,
        text: "Cut report memory use from about 3 GB to 200 MB and response time from about 5 minutes to 5 seconds by querying records in chunks and writing one row at a time.",
      },
      {
        icon: "search",
        title: "493 ms → 0.8 ms",
        featured: true,
        text: "Replaced substring LIKE scans with a typo-tolerant Manticore full-text index. Search fell from 493 ms to 0.8 ms at 1M rows and stayed flat as the table grew. A scheduled job syncs the index from MySQL, keeping indexing off the write path.",
      },
      {
        icon: "server",
        title: "One admin API, four domains",
        text: "Built and maintain the Laravel admin API for CRM, ERP, warehouse positions and asset management.",
      },
      {
        icon: "sparkles",
        title: "CRM built, end to end",
        text: "Designed and built the CRM modules from lead management through customer and vendor onboarding, including AI-assisted sales follow-ups.",
      },
      {
        icon: "database",
        title: "Asset management backend",
        text: "Designed the data model and architecture and built the backend for warehouse positions and asset management as the sole engineer.",
      },
      {
        icon: "rocket",
        title: "Own the whole pipeline",
        text: "Design, test and debug applications, then deploy them with GitHub CI/CD, Docker and Coolify.",
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
        text: "Designed and built the backend workflows that formed the basis of Stockarea's internal automation.",
      },
      {
        icon: "plug",
        title: "Systems integration",
        text: "Connected internal tools through Laravel backend integrations and Google APIs.",
      },
      {
        icon: "bar-chart",
        title: "Data & reporting",
        text: "Managed data and built reports with Metabase, MongoDB and SQL to guide operations.",
      },
      {
        icon: "wrench",
        title: "Early tooling",
        text: "Built tools in Google Apps Script and AppSheet that teams used in daily operations.",
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
        text: "Founded Flare Innovations and led development of IoT monitoring systems for aquaculture and hydroponics.",
      },
      {
        icon: "activity",
        title: "Real-time sensor data",
        text: "Built Python applications to process and analyze live data from hardware sensors.",
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
        text: "Flare Innovations received incubation support from ICAR-CIBA (Central Institute of Brackishwater Aquaculture) and Annamalai University. We deployed a pilot at CIBA. I wound down the company after graduation to join Stockarea.",
      },
    ],
  },
];

export const workflows = [
  {
    name: "Feature release",
    steps: ["Write the spec", "Code it (Next.js + Laravel)", "Deploy via CI/CD", "Live in production"],
  },
  {
    name: "Sales follow-up",
    steps: ["Lead goes cold (CRM)", "LLM drafts message", "Email + WhatsApp", "AI voice call"],
  },
  {
    name: "Finance sync",
    steps: ["Invoice created", "Webhook", "Zoho Books", "Profit report"],
  },
  {
    name: "Document intake",
    steps: ["Document uploaded", "LLM extracts fields", "Validate", "Record updated"],
  },
  {
    name: "Open source",
    steps: ["Issue reported", "Develop the fix", "PR reviewed and merged", "Release + user feedback"],
  },
];

export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Automation & Integrations",
    skills: ["n8n", "Zapier", "Google Apps Script", "AppSheet", "REST APIs", "Webhooks", "Zoho Books API", "Google APIs", "WhatsApp automation", "AI voice calls"],
  },
  {
    label: "AI Engineering",
    skills: ["LLM Applications", "RAG Pipelines", "Multi-Agent Systems", "LangChain", "LangGraph", "MCP", "Prompt Engineering", "Text-to-SQL", "Embeddings", "PGVector", "ChromaDB", "Langfuse", "Hybrid Retrieval (BM25 + Vector)", "Cross-Encoder Reranking"],
  },
  {
    label: "Python & Backend",
    skills: ["Python", "FastAPI", "Laravel", "PHP", "Laravel Jobs & Queues", "Task Scheduling", "Pytest", "PHPUnit"],
  },
  {
    label: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "SQL", "Manticore Full-Text Search"],
  },
  {
    label: "Infrastructure",
    skills: ["Docker", "AWS", "AWS RDS", "GitHub CI/CD", "Coolify", "Linux", "Git", "Metabase"],
  },
  {
    label: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  url: string;
  repo?: string;
  liveUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
  /** Two or three lines of what makes it interesting. */
  points: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "MeeTube",
    blurb:
      "I build and maintain this open-source YouTube and YouTube Music client for Android on my own. It downloads videos in up to 4K.",
    repo: "yashoncode/meetube",
    url: "https://github.com/yashoncode/meetube",
    downloadUrl: "https://github.com/yashoncode/meetube/releases/latest",
    featured: true,
    points: [
      "MeeTune AI Karaoke removes vocals on the phone as the song plays. The on-device model downloads once (39 MB), keeping the APK the same size.",
      "I develop features, tune performance, fix bugs and publish versioned releases.",
      "I triage community issues and feedback, then document the changes in the changelog.",
    ],
    stack: ["Java", "Android", "Gradle", "SponsorBlock"],
  },
  {
    name: "DocMagic",
    repo: "yashoncode/docmagic",
    blurb:
      "I built two versions of this multi-agent RAG assistant for logistics, ERP and CRM documents. It cites the source page or sheet with each answer.",
    url: "https://github.com/yashoncode/docmagic/tree/langgraph",
    liveUrl: "https://docmagic-frontend-umber.vercel.app/",
    points: [
      "A LangGraph supervisor routes each question to a specialist for documents, spreadsheets, calculations or web search.",
      "The retrieval pipeline combines BM25 keyword matches and vector search, then reranks the results with a cross-encoder.",
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
    name: "Reyaak",
    repo: "yashoncode/reyaak",
    blurb:
      "A native Kotlin agent for Android that runs on the phone and picks an LLM provider for each turn.",
    url: "https://github.com/yashoncode/reyaak",
    points: [
      "The router uses Thompson sampling to select among 37 free-tier providers, accounting for reliability and rate limits.",
      "The agent stores searchable facts and writes its own procedures. During idle time it archives skills while preserving built-in and user-edited ones.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Room", "Coroutines", "Thompson Sampling", "Android"],
  },
  {
    name: "Tevel IntelliDB",
    repo: "yashoncode/Tevel-IntelliDB",
    blurb:
      "A desktop and Android SQL client that turns plain-English questions into SQL for review. I wrote the AI layer and its 36 unit tests.",
    url: "https://github.com/yashoncode/Tevel-IntelliDB",
    points: [
      "Schema-only retrieval combines keyword matches with table embeddings. The model sees table definitions, keys and relationships while customer rows stay private.",
      "The validator repairs invalid SQL and asks for confirmation before running statements it rates as moderate or high risk.",
    ],
    stack: [
      "Electron",
      "Vue 3",
      "TypeScript",
      "Capacitor",
      "Java (JDBC)",
      "MySQL",
      "PostgreSQL",
      "Embeddings",
    ],
  },
  {
    name: "KonnectTV",
    blurb:
      "A phone remote and app manager for Android TV and Google TV. It pairs over Wi-Fi and works without root.",
    repo: "yashoncode/konnect-tv",
    url: "https://github.com/yashoncode/konnect-tv",
    points: [
      "Turn off promotional apps, undo changes from a history log, and use the phone keyboard to type on the TV.",
      "Glowlauncher replaces the stock home screen with a clock and a dock of favorite apps. On a 1 GB test TV, home screen memory use fell from 80 MB to 21 MB.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "ADB", "Android TV"],
  },
  {
    name: "MeeTube TV",
    blurb:
      "A YouTube client for Android TV, Google TV and Fire TV, with a glass sidebar and a player designed around the remote.",
    repo: "yashoncode/meetube-tv",
    url: "https://github.com/yashoncode/meetube-tv",
    points: [
      "Focusing a video card prepares it for playback before you press OK, even on a TV with 1 GB of RAM.",
      "Browse Shorts with the up and down buttons, search by voice, or sign in with a code to see subscriptions.",
    ],
    stack: ["Java", "Android TV", "Gradle", "AV1"],
  },
  {
    name: "WA Backup",
    blurb:
      "An offline Android viewer for exported WhatsApp chats. Open a text file or ZIP archive to read the conversation and its media on your phone.",
    repo: "yashoncode/wa-backup",
    url: "https://github.com/yashoncode/wa-backup",
    points: [
      "Read Android and iOS exports, search for a message, or jump straight to a date in the chat.",
      "Explore reply times, busiest days and message counts for each participant. Imported chats stay on the device.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Android"],
  },
  {
    name: "DBY",
    blurb:
      "A MySQL and MariaDB client for Android that lets you browse tables, run SQL and edit rows from your phone.",
    repo: "yashoncode/DBY",
    url: "https://github.com/yashoncode/DBY",
    points: [
      "A native Rust core speaks the MySQL wire protocol over TLS, including connections to Amazon RDS and Aurora MySQL.",
      "Pin frequently used tables, build queries visually, and export results as CSV or JSON.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Rust", "UniFFI", "MySQL"],
  },
  {
    name: "ImaGen",
    repo: "yashoncode/imaGen-Prompt-Enhancement",
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
