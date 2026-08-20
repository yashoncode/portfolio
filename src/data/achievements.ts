// ─────────────────────────────────────────────────────────────────────────────
// The interview cheat sheet behind /achievements.
//
// Not a resume. Every item is something that survives a follow-up question,
// so `proof` names the actual mechanism, not the outcome again in new words.
// Ordered inside each group by how often it gets asked about.
//
//   claim  — the one line you'd say out loud. Keep it under ~70 chars.
//   metric — the number or label on the badge. Omit when there isn't a real one.
//   proof  — 2 to 4 bullets naming the how. This is the part that gets probed.
// ─────────────────────────────────────────────────────────────────────────────

export type Achievement = {
  claim: string;
  metric?: string;
  proof: string[];
};

export type AchievementGroup = {
  /** Short label for the section header. */
  label: string;
  /** What an interviewer is really testing when they ask about this group. */
  probe: string;
  items: Achievement[];
};

export const achievementGroups: AchievementGroup[] = [
  {
    label: "Scale & performance",
    probe: "Can you find a bottleneck yourself, or do you wait to be told?",
    items: [
      {
        claim: "Took report exports from ~5 min to ~5 sec, 3 GB to 200 MB",
        metric: "60×",
        proof: [
          "Root cause: exports were rendered through Blade, which buffers the whole compiled view into one string before returning. The dataset sat in memory twice, once as hydrated models and again as rendered output, both scaling linearly with rows.",
          "Swapped in OpenSpout, a streaming XLSX writer that emits one row and immediately releases it, so memory never holds the workbook. Chose it over PhpSpreadsheet, which materialises every cell as a PHP object.",
          "Fed the writer from a chunked query over plain arrays instead of one hydrated result set, and hoisted every lookup out of the row loop.",
          "The number to lead with is not 60×, it is that peak memory is now roughly constant. The next 10× in report size no longer takes the endpoint down.",
        ],
      },
      {
        claim: "Moved heavy work off the request path with queues and events",
        proof: [
          "Laravel jobs and event-based processing for anything that does not need to block a response.",
          "Scheduled tasks for the recurring reporting and sync work, so nothing depends on someone remembering to trigger it.",
        ],
      },
    ],
  },
  {
    label: "Manual work I deleted",
    probe: "Do you fix the ticket, or the process behind it?",
    items: [
      {
        claim: "Ended vendor price discovery by phone call and spreadsheet",
        metric: "phone → thread",
        proof: [
          "Before me: operations rang each vendor one at a time for a quote, pasted the replies into Excel, and scanned the sheet by eye to find the best price. Nobody could answer how long a quote had been outstanding.",
          "Now an enquiry sends a templated pricing request to the vendors, and every reply stays on that same thread, so the quote history sits with the enquiry instead of in one person's inbox.",
          "Replies come back marked against the enquiry, so best price is a sort on real data rather than a person reading a spreadsheet under time pressure.",
          "The time saved is the obvious half. The half worth saying out loud is that price comparison stopped depending on who was doing it that day.",
        ],
      },
      {
        claim: "One join key turned the finance spreadsheets into queryable data",
        metric: "org code ↔ Zoho ID",
        proof: [
          "The missing piece was identity. Our organisation code and the Zoho Books account ID were the same customer with nothing linking them, so revenue and cost could only ever be reconciled by hand in sheets.",
          "Mapping the two in the database is the whole unlock. The same numbers then went into the database instead of a spreadsheet, and analysis became a query rather than a rebuild.",
          "Receivables now drive automated email follow-up to customers for payment, so collections chase themselves instead of waiting on someone's memory.",
          "Payables work the same way round: bills tracked against vendors so they get paid on time, not when a due date is noticed.",
        ],
      },
      {
        claim: "Wired WhatsApp into Laravel so RFPs go out from inside the system",
        metric: "external API client",
        proof: [
          "The problem was handoff. Every lead and deal is created in the CRM, but the operations person still had to go find that deal from the salesperson before acting on it, because the actual conversation lived in a chat the system could not see.",
          "Built a WhatsApp API client into the Laravel app so RFPs and deal communication are sent from the record itself. The thread then belongs to the deal rather than to somebody's phone.",
          "Same principle as the vendor pricing flow, different channel: communication that happens outside the system is communication the system cannot follow up on.",
        ],
      },
    ],
  },
  {
    label: "Systems I own end to end",
    probe: "Do you own a feature or a domain? Can you design a data model?",
    items: [
      {
        claim: "Four production domains where I owned the data model, not a slice",
        metric: "4 systems",
        proof: [
          "CRM: leads and deals through to onboarding as a customer or vendor organisation, then linked to warehouses so the rest of the platform can act on them. The CRM is not a dead end.",
          "ERP: the full freight and customs enquiry lifecycle. Enquiry in, vendor schedules collected, pricing quoted back, confirmation into onboarding and the operations that follow.",
          "Warehouse and assets: product kits, lot position management so stock is traceable to a position, contracts and expense contracts, inward and outward inventory movement.",
          "Finance: invoices, POs and bills synced with Zoho Books over webhooks, automated profit and revenue reporting, vendor bill payments and expense tracking.",
        ],
      },
      {
        claim: "Sole engineer on the positions and asset-management backend",
        proof: [
          "Data structuring, architecture and implementation, all of it. No one else to hand the hard part to.",
          "The interesting constraint: a lot position has to stay traceable to the inventory that filled it while space is still used profitably, so the model answers both questions from the same rows.",
        ],
      },
      {
        claim: "Own the Laravel admin API powering all four domains",
        proof: [
          "One API surface, four domains. The real tension is keeping module boundaries honest when everything shares organisations and warehouses.",
          "Feature and unit tests with PHPUnit on the paths that would be expensive to get wrong.",
        ],
      },
      {
        claim: "Delivery is mine too: CI/CD, Docker, Coolify",
        proof: [
          "GitHub CI/CD pipelines, containerised deploys through Coolify, AWS and RDS underneath.",
          "Means I debug my own production issues instead of describing them to someone else.",
        ],
      },
    ],
  },
  {
    label: "AI in production, not demos",
    probe: "Have you shipped LLM work that real users depend on daily?",
    items: [
      {
        claim: "AI voice calls handling 100+ outreach calls a week",
        metric: "100+/wk",
        proof: [
          "Three channels for the sales team on n8n with open-source LLMs: email, WhatsApp reminders, and voice calls.",
          "The production part is the guardrails, not the model: constrained prompts, response validation, failure logging, automatic retries.",
          "Follow-up work that filled a rep's day now takes 5 to 15 minutes. That is the sentence to lead with.",
        ],
      },
      {
        claim: "LLM document and data handling inside logistics and CRM flows",
        proof: [
          "Built into the existing workflows rather than bolted alongside them, so the manual step disappears instead of moving.",
          "Removes the transcription and lookup work that used to sit between a document arriving and the record being correct.",
        ],
      },
      {
        claim: "Built the workflow automation every team in the company runs on",
        proof: [
          "Started as the automation foundation in the Solutions Architect role, then grew into the tools daily operations depend on.",
          "Earlier generation was Google Apps Script and AppSheet, and some of it still runs. Knowing when a spreadsheet is the right answer is part of the job.",
        ],
      },
    ],
  },
  {
    label: "Built in the open",
    probe: "What do you build when nobody assigns it, and how do you argue architecture?",
    items: [
      {
        claim: "DocMagic: multi-agent RAG over logistics, ERP and CRM documents",
        metric: "cited answers",
        proof: [
          "A LangGraph supervisor routes each question to one capability specialist, documents, spreadsheet data, arithmetic or live web search, so the model never juggles every tool at once.",
          "Hybrid retrieval fuses dense vector search with BM25, then re-scores with a cross-encoder reranker. Ingestion runs metadata, analyst, reviewer with a bounded revision loop.",
          "Built twice on two branches, Next.js + FastAPI + pgvector and Streamlit + LCEL + Chroma, so the architectural trade-offs are visible side by side rather than argued about.",
          "Every answer cites the exact page or sheet. In this domain an uncited answer is not an answer.",
        ],
      },
      {
        claim: "Tevel IntelliDB: an AI SQL client that never sees your data",
        metric: "schema-only RAG",
        proof: [
          "The model reasons over metadata only, tables, columns, keys, indexes, relationships, and never touches a single customer row. That is the whole design premise.",
          "Schema Intelligence Layer with an FK relationship graph and join-path finding, plus a business vocabulary that decodes cryptic names, so tbl_cust_hdr becomes customer header.",
          "Read-only safety gate blocks writes and injection. Invalid SQL goes through an auto-repair loop until it validates.",
          "Ships as cross-platform desktop builds for Windows, macOS and Linux.",
        ],
      },
      {
        claim: "ImaGen: eight prompting strategies compared on one instruction",
        metric: "8 techniques",
        proof: [
          "Zero-shot, few-shot, structured, chain-of-thought, self-refine, meta-prompt, tree-of-thought and raw, all run against the same instruction so the difference is measurable.",
          "Always shows the exact messages sent to the LLM and the final prompt handed to the image model, so the technique's effect stops being folklore.",
          "The image model has no server-side mask, so a brushed region is composited back over the original client side. Worth framing as a constraint I worked around, not a feature.",
        ],
      },
    ],
  },
  {
    label: "Research & recognition",
    probe: "Is the depth real, or is all of it self-reported?",
    items: [
      {
        claim: "Patent filed: intelligent transport vehicle management and routing",
        metric: "IP India",
        proof: [
          "Application 202241077102 with Intellectual Property India. Filed Dec 2022, published Jan 2023.",
          "Same problem space I work in now, which is worth pointing out: the logistics interest predates the logistics job.",
        ],
      },
      {
        claim: "Two IEEE Xplore publications, both 2022",
        metric: "2 papers",
        proof: [
          "Intelligently Optimized System for Hydroponic Cultivation, IEEE Xplore 2022.",
          "Aiderbot: DTMF Based Medical Robot, IEEE Xplore 2022.",
          "Both came out of the hardware work at Flare, so they connect to the founding story rather than sitting on their own.",
        ],
      },
      {
        claim: "Best Outgoing Student, Institution of Engineers India, 2023",
        metric: "IEI 2023",
        proof: [
          "Awarded across the graduating cohort, not within a single subject.",
          "Graduated with 9.05 / 10 CGPA in Electronics & Communication Engineering.",
        ],
      },
      {
        claim: "Mentored a Smart India Hackathon finalist team, 2024",
        proof: [
          "Mentoring one year after graduating, while shipping full time.",
          "Useful signal for anything with a coaching or tech-lead component to the role.",
        ],
      },
    ],
  },
  {
    label: "Trajectory",
    probe: "Where is this person going, and how fast did they get here?",
    items: [
      {
        claim: "L1 to L2 in 18 months at Stockarea",
        metric: "Oct 2024 → Apr 2026",
        proof: [
          "Joined as Software Engineer L1 in Oct 2024, promoted to L2 in Apr 2026.",
          "Scope grew with it: backend APIs, then full-stack delivery with Next.js and React, then AI automation in production.",
          "Was at the company before that as Solutions Architect for Automation from Aug 2023, so the domain knowledge did not start at the promotion.",
        ],
      },
      {
        claim: "Founded a company and led a 10-person team, straight out of college",
        metric: "Flare, 2022",
        proof: [
          "Flare Innovations: IoT monitoring for aquaculture and hydroponics. Founded Feb 2022, ran it to Jun 2023.",
          "Incubated at ICAR-CIBA (Central Institute of Brackishwater Aquaculture) and Annamalai University, with a pilot system actually deployed at CIBA.",
          "Python applications processing live sensor data, hardware sensors integrated with cloud for remote monitoring.",
          "Wound it down after graduation to join Stockarea. Worth saying plainly: that was a decision, not a failure.",
        ],
      },
      {
        claim: "Went from average student to school topper on self-learning alone",
        metric: "98% SSLC",
        proof: [
          "Nowhere near the top until self-learning and plain curiosity took over. Finished as school topper.",
          "That is still exactly how I pick up anything new, which is the reason the answer is worth giving at all.",
        ],
      },
      {
        claim: "Four-plus years shipping production software, zero data-loss incidents",
        metric: "4+ years",
        proof: [
          "No dropped tables, no lost tenant data, across CRM, ERP, warehouse and finance modules.",
          "Boring on purpose. In a finance module that syncs to Zoho Books, boring is the feature.",
        ],
      },
    ],
  },
];

/** Header line. Counted rather than hardcoded so it cannot drift from the list. */
export const achievementCount = achievementGroups.reduce(
  (n, g) => n + g.items.length,
  0,
);
