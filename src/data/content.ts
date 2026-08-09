export const site = {
  name: "Devansh Agrawal",
  title: "Backend Engineer",
  tagline: "Backend systems built for scale, integrity, and production load.",
  email: "agrawaldevansh2005@gmail.com",
  phone: "8273337174",
  location: "Noida, UP",
  resume: "https://drive.google.com/file/d/1-tpqyvgbMVtvKoY4M6J23HuGw1ihiK1s/view?usp=drive_link",
  links: {
    github: "https://github.com/devanshagrawal",
    linkedin: "https://www.linkedin.com/in/devanshagrawal",
    leetcode: "https://leetcode.com/u/agrawaldevansh",
  },
};

export const navItems = [
  { id: "intro", label: "Brief", number: "00", recruiter: true },
  { id: "journey", label: "Journey", number: "01", recruiter: true },
  { id: "systems", label: "Systems", number: "02", recruiter: true },
  { id: "architecture", label: "Lab", number: "03", recruiter: false },
  { id: "principles", label: "Principles", number: "04", recruiter: false },
  { id: "stack", label: "Toolkit", number: "05", recruiter: false },
  { id: "impact", label: "Impact", number: "06", recruiter: true },
  { id: "focus", label: "Focus", number: "07", recruiter: false },
  { id: "contact", label: "Connect", number: "08", recruiter: true },
] as const;

export const chapterBridges = {
  journey: "Responsibilities grow with every chapter.",
  systems: "Next — the systems those chapters produced.",
  architecture: "How those systems fit together.",
  principles: "The judgment behind the code.",
  stack: "The toolkit used in production.",
  impact: "Outcomes you can measure.",
  focus: "What comes next.",
  contact: "If this is the engineer you need —",
};

export const missionBrief = {
  eyebrow: "Mission Brief · Backend Engineer",
  lines: ["BUILDING", "BACKEND", "SYSTEMS", "THAT SCALE"],
  statement:
    "I build scalable backends, high-performance APIs, and data workflows — including multi-tenant platforms, large migrations, and AI-driven automation.",
  signals: [
    "Backend Engineer",
    "Enterprise Systems",
    "Scalable Architecture",
    "AI Integrations",
    "Production Experience",
    "Large-scale Migration",
  ],
};

export const journey = [
  {
    id: "chapter-1",
    number: "Chapter One",
    title: "Learning Production Engineering",
    company: "WhatBytes",
    role: "Backend Developer Intern",
    period: "Aug 2025 — Nov 2025",
    location: "Remote",
    mission:
      "Ship secure authentication and financial systems for booking and transaction workflows.",
    challenge:
      "Booking and payments needed reliable auth. Pricing for agents and DMCs had to stay flexible. Manual data entry slowed operations.",
    engineeringWork:
      "Built authentication and financial systems with Django and DRF. Designed dynamic pricing and markup engines. Integrated LLM-powered assistants to cut manual data entry.",
    result:
      "More reliable booking and transaction flows. Flexible pricing logic at scale. Less manual effort in day-to-day operations.",
    lessons: [
      "Auth and money paths must be correct before anything else ships.",
      "Configurable pricing beats hardcoded rules when business logic changes.",
      "LLM assistants help when they remove real operational work.",
    ],
  },
  {
    id: "chapter-2",
    number: "Chapter Two",
    title: "Building Enterprise Software",
    company: "Plutonic Services",
    role: "Backend Developer",
    period: "Nov 2025 — Present",
    location: "Noida, India",
    mission:
      "Lead backend architecture and delivery for production systems — including enterprise document management across HRMS and operations.",
    challenge:
      "A legacy platform needed a multi-tenant redesign. Document workflows required lifecycle control, audit trails, and role-based routing. Interns needed mentoring without slowing delivery.",
    engineeringWork:
      "Redesigned the platform into a multi-tenant architecture and consolidated data models. Built an enterprise document management system with lifecycle workflows, audit trails, and RBAC. Mentored interns while raising code quality and reliability.",
    result:
      "Clearer tenant boundaries and maintainability. Document workflows with auditability across modules. Stronger delivery standards across the backend team.",
    lessons: [
      "Multi-tenant design starts in the data model.",
      "Audit trails and RBAC belong in the product, not as add-ons.",
      "Mentoring works when quality standards are part of delivery.",
    ],
  },
  {
    id: "chapter-3",
    number: "Chapter Three",
    title: "Scaling Enterprise Systems",
    company: "Plutonic Services",
    role: "Backend Developer",
    period: "Ongoing",
    location: "Production",
    mission:
      "Scale production backends through large data migrations and performance work on high-traffic services.",
    challenge:
      "150K+ tasks and 100K+ invoices had to move with zero data loss. APIs and queries needed lower latency under real traffic.",
    engineeringWork:
      "Executed large-scale migrations with strong data integrity checks. Optimized APIs and database queries across high-traffic services.",
    result:
      "Zero data loss on migration. Continuity for business systems. Better performance on critical paths.",
    lessons: [
      "Integrity and continuity are the migration success criteria.",
      "Query and API optimization matter most on paths that carry traffic.",
      "Ownership grows when you own both delivery and scale.",
    ],
  },
];

export const missions = journey;

export const principles = [
  {
    id: "performance",
    principle: "Performance is a feature",
    detail: "Latency affects trust. Slow APIs and queries are defects.",
  },
  {
    id: "simple",
    principle: "Simple systems last longer",
    detail: "Clear models and contracts age better than clever shortcuts.",
  },
  {
    id: "measure",
    principle: "Measure before optimizing",
    detail: "Profile queries and hot paths first. Then change what the data shows.",
  },
  {
    id: "readable",
    principle: "Readable code beats clever code",
    detail: "The next engineer should understand intent without a walkthrough.",
  },
  {
    id: "maintain",
    principle: "Build for maintainability",
    detail: "Consolidate models. Prefer changes you can still own under load.",
  },
  {
    id: "automate",
    principle: "Automate repetitive work",
    detail: "Workers, cron, and assistants earn their place by removing manual effort.",
  },
  {
    id: "systems",
    principle: "Think in systems, not endpoints",
    detail: "Auth, cache, storage, queues, and failure modes are one design.",
  },
];

export const philosophy = principles;

export const systems = [
  {
    id: "ca-cloud-desk",
    name: "CA Cloud Desk",
    tagline: "Multi-tenant legal workflow backend",
    overview:
      "A large-scale multi-tenant Django backend for legal workflow management — CRM, orders and invoicing, notifications, and workflow automation.",
    problem:
      "Legal workflows needed shared product capabilities with firm-level data isolation, plus reliable appointments, ledgers, and alerts.",
    contribution: [
      "Contributed to the multi-tenant Django backend across CRM, orders/invoicing, notifications, and workflow automation.",
      "Built appointment workflows with scheduled reminders, in-app notifications, and automated HTML email via Celery.",
      "Implemented ledger and outstanding alert pipelines using Celery, cron, transactional email, and WhatsApp.",
    ],
    technologies: ["Python", "Django", "Celery", "Redis", "HTML Email", "WhatsApp"],
    businessImpact:
      "Automated reminders and outstanding alerts reduced manual follow-up. Multi-tenant workflows stayed consistent across firms.",
    takeaway:
      "Async workers make operational alerts reliable when appointments, ledgers, and notifications share one backend.",
    impact: [
      { metric: "Multi-tenant", label: "Django backend" },
      { metric: "Celery", label: "Reminders & alerts" },
      { metric: "WhatsApp", label: "Notifications" },
    ],
  },
  {
    id: "inframind-ai",
    name: "InfraMind AI",
    tagline: "Multilingual enterprise RAG",
    overview:
      "A multilingual RAG system for querying long-term enterprise records — built with Django, DRF, Qdrant, and Llama 3.",
    problem:
      "Enterprise records lived in long documents across languages. Teams needed grounded answers from their own data.",
    contribution: [
      "Developed the multilingual RAG system to query across long-term enterprise records.",
      "Built asynchronous document ingestion with text extraction, embeddings, metadata tagging, and retrieval.",
      "Implemented AI retrieval workflows using embeddings, a vector database, and LLM response generation.",
    ],
    technologies: ["Python", "Django", "DRF", "Qdrant", "Llama 3", "Embeddings", "RAG"],
    businessImpact:
      "Teams can query enterprise records with grounded, multilingual retrieval instead of manual search alone.",
    takeaway:
      "Ingestion, embeddings, and retrieval come before generation — the LLM answers from indexed context.",
    impact: [
      { metric: "RAG", label: "Enterprise search" },
      { metric: "Async", label: "Ingestion" },
      { metric: "Qdrant", label: "Vector store" },
    ],
  },
];

export const currentlyExploring = [
  {
    title: "Distributed Systems",
    detail: "Designing backends that stay reliable as services, queues, and data paths grow.",
  },
  {
    title: "System Design",
    detail: "Multi-tenant models, API boundaries, and capacity thinking before implementation.",
  },
  {
    title: "AI Infrastructure",
    detail: "RAG pipelines, embeddings, and LLM workflows that run in production operations.",
  },
  {
    title: "Scalable Backend Architecture",
    detail: "Caching, async workers, and query optimization for high-traffic services.",
  },
  {
    title: "Cloud Engineering",
    detail: "AWS building blocks — compute, storage, email, and deploy paths that stay operable.",
  },
];

export const impactMetrics = [
  {
    value: 150000,
    suffix: "+",
    label: "Tasks Migrated",
    detail: "Zero data loss",
    story: "Large-scale task migration with strong data integrity and system continuity.",
  },
  {
    value: 100000,
    suffix: "+",
    label: "Invoices Migrated",
    detail: "Integrity preserved",
    story: "Invoice migration executed with zero data loss alongside the task cutover.",
  },
  {
    value: 600,
    suffix: "+",
    label: "LeetCode Problems",
    detail: "DSA foundation",
    story: "Algorithmic depth that supports backend design, debugging, and performance work.",
  },
];

export const impactTags = [
  "Multi-tenant Systems",
  "Enterprise Workflows",
  "AI Integrations",
  "Backend Performance",
  "Large-scale Data Migration",
  "Document Management",
  "Async Processing",
  "Production Systems",
];

export type TechGroup = "Backend" | "Databases" | "AI" | "Cloud" | "Infrastructure";

export const techGroups: TechGroup[] = ["Backend", "Databases", "AI", "Cloud", "Infrastructure"];

export const techNodes = [
  { id: "python", name: "Python", group: "Backend" as TechGroup, experience: "Primary language for production backends.", usedIn: ["Plutonic Services", "WhatBytes", "CA Cloud Desk", "InfraMind AI"], related: ["django", "celery", "drf"], x: 16, y: 22 },
  { id: "django", name: "Django", group: "Backend" as TechGroup, experience: "Multi-tenant backends, auth, and domain modules.", usedIn: ["CA Cloud Desk", "InfraMind AI", "WhatBytes"], related: ["python", "drf", "celery"], x: 36, y: 16 },
  { id: "drf", name: "DRF", group: "Backend" as TechGroup, experience: "REST APIs for auth, finance, and AI services.", usedIn: ["WhatBytes", "InfraMind AI"], related: ["django", "jwt"], x: 56, y: 18 },
  { id: "celery", name: "Celery", group: "Backend" as TechGroup, experience: "Async jobs — reminders, alerts, email, WhatsApp.", usedIn: ["CA Cloud Desk"], related: ["redis", "django"], x: 30, y: 40 },
  { id: "postgres", name: "PostgreSQL", group: "Databases" as TechGroup, experience: "Indexing, query optimization, multi-tenant schemas.", usedIn: ["Plutonic Services", "Migrations", "CA Cloud Desk"], related: ["redis", "mysql"], x: 74, y: 24 },
  { id: "mysql", name: "MySQL", group: "Databases" as TechGroup, experience: "Relational stores for operational data.", usedIn: ["Production services"], related: ["postgres"], x: 88, y: 38 },
  { id: "redis", name: "Redis", group: "Databases" as TechGroup, experience: "Caching and Celery broker.", usedIn: ["CA Cloud Desk", "Async workers"], related: ["celery", "postgres"], x: 54, y: 42 },
  { id: "llm", name: "LLMs", group: "AI" as TechGroup, experience: "LLM integration and assistant workflows.", usedIn: ["InfraMind AI", "WhatBytes"], related: ["rag", "qdrant", "python"], x: 58, y: 64 },
  { id: "rag", name: "RAG", group: "AI" as TechGroup, experience: "Retrieval pipelines over enterprise records.", usedIn: ["InfraMind AI"], related: ["llm", "qdrant"], x: 76, y: 70 },
  { id: "qdrant", name: "Qdrant", group: "AI" as TechGroup, experience: "Vector store for semantic retrieval.", usedIn: ["InfraMind AI"], related: ["rag", "llm"], x: 90, y: 58 },
  { id: "aws", name: "AWS", group: "Cloud" as TechGroup, experience: "EC2, RDS, S3, SES, Lambda.", usedIn: ["Document systems", "Deployments"], related: ["s3", "nginx"], x: 18, y: 62 },
  { id: "s3", name: "S3", group: "Cloud" as TechGroup, experience: "Object storage for documents and assets.", usedIn: ["Document management"], related: ["aws"], x: 34, y: 76 },
  { id: "nginx", name: "Nginx", group: "Infrastructure" as TechGroup, experience: "Reverse proxy and production topology.", usedIn: ["Deployments"], related: ["aws"], x: 12, y: 44 },
  { id: "jwt", name: "JWT / OAuth", group: "Infrastructure" as TechGroup, experience: "Authentication and authorization.", usedIn: ["WhatBytes"], related: ["drf", "django"], x: 42, y: 58 },
];

export const techEdges: [string, string][] = [
  ["python", "django"],
  ["django", "drf"],
  ["django", "celery"],
  ["celery", "redis"],
  ["django", "postgres"],
  ["redis", "postgres"],
  ["postgres", "mysql"],
  ["drf", "jwt"],
  ["aws", "s3"],
  ["aws", "nginx"],
  ["python", "llm"],
  ["llm", "rag"],
  ["rag", "qdrant"],
];

export const architectureNodes = [
  { id: "client", label: "Client", why: "Where product traffic enters the system.", description: "Users and services calling the API.", x: 50, y: 6, kind: "edge" as const },
  { id: "gateway", label: "API Gateway", why: "Single edge for routing into backend services.", description: "Nginx in front of Django REST endpoints.", x: 50, y: 18, kind: "edge" as const },
  { id: "auth", label: "Authentication", why: "Protect booking, finance, and enterprise modules.", description: "JWT and OAuth with role-based access.", x: 22, y: 32, kind: "service" as const },
  { id: "api", label: "Business Services", why: "Domain logic for tenants, documents, and AI queries.", description: "Django / DRF application layer.", x: 50, y: 32, kind: "core" as const },
  { id: "redis", label: "Redis", why: "Caching and async job brokering.", description: "Cache layer and Celery broker.", x: 78, y: 32, kind: "service" as const, anim: "cache" as const },
  { id: "db", label: "PostgreSQL", why: "Source of truth for application data.", description: "Indexed relational store with query optimization.", x: 50, y: 48, kind: "data" as const },
  { id: "queue", label: "Queue", why: "Keep slow work off the request path.", description: "Celery-backed background jobs.", x: 78, y: 48, kind: "worker" as const, anim: "queue" as const },
  { id: "workers", label: "Workers", why: "Reminders, alerts, email, WhatsApp, and ingestion.", description: "Celery workers for async pipelines.", x: 78, y: 64, kind: "worker" as const, anim: "worker" as const },
  { id: "s3", label: "S3", why: "Document and file storage outside the database.", description: "Object storage for enterprise documents.", x: 22, y: 48, kind: "data" as const },
  { id: "llm", label: "AI Layer", why: "LLM responses grounded in retrieved context.", description: "Llama 3 and assistant workflows.", x: 28, y: 72, kind: "ai" as const },
  { id: "vector", label: "Vector Database", why: "Semantic search over long documents.", description: "Qdrant / vector retrieval for RAG.", x: 50, y: 72, kind: "ai" as const },
  { id: "notify", label: "Notify", why: "Transactional email and WhatsApp alerts.", description: "SES and WhatsApp delivery channels.", x: 72, y: 80, kind: "edge" as const },
];

export const architectureEdges: [string, string][] = [
  ["client", "gateway"], ["gateway", "api"], ["api", "auth"], ["api", "redis"],
  ["api", "db"], ["api", "s3"], ["redis", "queue"], ["queue", "workers"],
  ["workers", "notify"], ["workers", "db"], ["workers", "s3"], ["api", "vector"],
  ["api", "llm"], ["vector", "llm"],
];

export const requestFlows = [
  { name: "Auth + read", path: ["client", "gateway", "api", "auth", "redis", "db"], kind: "hit" as const },
  { name: "Cache miss", path: ["client", "gateway", "api", "redis", "db", "redis"], kind: "miss" as const },
  { name: "Async job", path: ["api", "redis", "queue", "workers", "notify"], kind: "queue" as const },
  { name: "RAG query", path: ["client", "gateway", "api", "vector", "llm"], kind: "ai" as const },
];

export const loaderSteps = [
  "Opening engineering journal…",
  "Loading systems…",
  "Connecting architecture…",
  "Ready.",
];

export const commandItems = [
  { id: "intro", label: "Mission Brief", hint: "Start here", group: "Navigate" },
  { id: "journey", label: "Engineering Journey", hint: "Chapters", group: "Navigate" },
  { id: "systems", label: "Systems Built", hint: "Case studies", group: "Navigate" },
  { id: "architecture", label: "Architecture Lab", hint: "Playground", group: "Navigate" },
  { id: "principles", label: "Engineering Principles", hint: "Judgment", group: "Navigate" },
  { id: "stack", label: "Engineering Toolkit", hint: "Skills map", group: "Navigate" },
  { id: "impact", label: "Impact", hint: "Outcomes", group: "Navigate" },
  { id: "focus", label: "Current Focus", hint: "Exploring", group: "Navigate" },
  { id: "contact", label: "Let's Build Something Great", hint: "Contact", group: "Navigate" },
  { id: "resume", label: "Open Resume", hint: "PDF", group: "Actions", action: "resume" },
  { id: "github", label: "Open GitHub", hint: "External", group: "Actions", action: "github" },
  { id: "recruiter", label: "Toggle Recruiter Mode", hint: "Fast evaluation", group: "Actions", action: "recruiter" },
  { id: "terminal", label: "Open Terminal", hint: "Easter egg", group: "Actions", action: "terminal" },
];
