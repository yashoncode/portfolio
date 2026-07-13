// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Edit values here to update the site. Links marked TODO are placeholders —
// swap them for the real URLs.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Yashwanth D",
  title: "Software Engineer",
  tagline: "I build reliable systems that people depend on every day.",
  location: "India",
  summary:
    "Software Engineer with 3+ years building and owning Laravel REST APIs, CRM systems, and workflow automation for logistics and ERP platforms, now extending into full-stack development with Next.js and React. Comfortable across the full development cycle — from API and database design to testing, CI/CD deployment, and integration with internal and third-party services. Hands-on with AI and LLM tools to automate workflows and ship faster.",
  email: "yashwanth.devadoss@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/yashwanth-devadoss/",
    github: "https://github.com/yashoncode",
  },
};

// Headline metrics surfaced in the hero + about sections.
// `fun` shows on hover — keep them short enough to fit the card.
export const stats = [
  {
    value: "3+",
    label: "Years shipping production backends",
    fun: "Still zero DROP TABLE incidents. Touch wood.",
  },
  {
    value: "200+",
    label: "People using tools I built",
    fun: "Also 200+ people who know exactly who to blame.",
  },
  {
    value: "15×",
    label: "Faster reports (~5 min → ~5 sec)",
    fun: "Reports now load faster than my excuses.",
  },
  {
    value: "1",
    label: "Patent filed",
    fun: "I promise I'll stop bringing it up. (I won't.)",
  },
  {
    value: "2",
    label: "IEEE publications",
    fun: "My mom cites them at every family function.",
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
    role: "Software Engineer L2",
    company: "Stockarea",
    companyUrl: "https://stockarea.io/",
    period: "Oct 2024 — Present",
    current: true,
    points: [
      {
        icon: "zap",
        title: "3 GB → 200 MB",
        featured: true,
        text: "Diagnosed and fixed a major report-generation bottleneck — memory cut from ~3 GB to ~200 MB, response time from ~5 min to ~5 sec, by restructuring how large datasets are queried and processed.",
      },
      {
        icon: "users",
        title: "200+ daily users",
        featured: true,
        text: "Built and maintain workflow-automation tools used every day by 200+ people across the company, streamlining operations for every team.",
      },
      {
        icon: "server",
        title: "Core logistics APIs",
        text: "Build and own Laravel REST APIs powering core logistics workflows across internal modules and services.",
      },
      {
        icon: "sparkles",
        title: "CRM built solo, end to end",
        text: "Single-handedly designed and developed the company's CRM modules and workflows, with AI-powered automation integrated into the flows.",
      },
      {
        icon: "database",
        title: "Asset management backend",
        text: "Designed and built the positions & asset-management backend end to end as the sole engineer — data structuring, architecture, and implementation.",
      },
      {
        icon: "layout",
        title: "Full-stack with Next.js & React",
        text: "Developing internal web applications, extending ownership from backend APIs to full-stack delivery.",
      },
      {
        icon: "file-text",
        title: "ERP for billing & finance",
        text: "Architect and maintain the ERP backend for billing, invoicing, and purchase orders — improving accuracy and consistency of financial records.",
      },
      {
        icon: "workflow",
        title: "n8n automations",
        text: "WhatsApp messaging, website-to-email alerts, and scheduled jobs wired together — eliminating manual follow-ups and repetitive data entry.",
      },
      {
        icon: "rocket",
        title: "Own the whole pipeline",
        text: "End-to-end delivery: design, testing, debugging, and deployment via GitHub CI/CD, Docker, and Coolify.",
      },
    ],
  },
  {
    role: "Solutions Architect",
    company: "Stockarea",
    companyUrl: "https://stockarea.io/",
    period: "Aug 2023 — Oct 2024",
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
    role: "Founder & Software Analyst",
    company: "Flare Innovations",
    period: "Feb 2022 — Jun 2023",
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
        title: "Team leadership",
        text: "Coordinated small development teams through product prototyping and testing.",
      },
    ],
  },
];

export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend Development",
    skills: [
      "Laravel",
      "PHP",
      "REST API Development",
      "CRM & ERP Modules",
      "API Integration",
      "Feature Testing",
    ],
  },
  {
    label: "Frontend Development",
    skills: ["Next.js", "React", "JavaScript", "HTML", "CSS"],
  },
  { label: "Databases", skills: ["MySQL", "MongoDB", "SQL"] },
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
    skills: ["AWS", "GitHub CI/CD", "Coolify", "Docker"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "Linux", "Metabase"],
  },
  {
    label: "AI & Automation",
    skills: [
      "AI-Assisted Development",
      "AI Workflow Automation",
      "LLM Tools",
      "Prompt Engineering",
    ],
  },
  { label: "Languages", skills: ["PHP", "JavaScript", "Python"] },
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
};

export const education: Education[] = [
  {
    school: "Sri Sairam Engineering College, Chennai",
    degree: "B.E. in Electronics & Communication Engineering",
    period: "2019 — 2023",
    detail: "CGPA: 9.05 / 10",
  },
  {
    school: "Leo Matriculation Higher Secondary School, Chennai",
    degree: "Higher Secondary (Computer Science)",
    period: "2019",
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
  "Mentor, Smart India Hackathon (SIH) Finalist Team — 2024",
  "Best Outgoing Student, Institution of Engineers India (IEI) — 2023",
  "School Topper, SSLC (98%) — 2017",
];

export const languages = ["English", "Tamil"];

// Anchors used by the navbar + smooth scroll.
export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];
