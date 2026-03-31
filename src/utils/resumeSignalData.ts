export interface SkillSignal {
  canonical: string
  category: "frontend" | "backend" | "data" | "cloud" | "product" | "design" | "marketing" | "sales" | "operations" | "security" | "qa" | "people"
  aliases: string[]
}

export interface ResumeToolPreset {
  id: string
  label: string
  role: string
  companyType: string
  description: string
  jobDescription: string
}

export const ACTION_VERBS = [
  "achieved", "administered", "advanced", "aligned", "analyzed", "architected",
  "automated", "boosted", "built", "championed", "collaborated", "consolidated",
  "coordinated", "created", "decreased", "delivered", "designed", "developed",
  "drove", "enabled", "engineered", "enhanced", "established", "evaluated",
  "executed", "expanded", "founded", "generated", "guided", "implemented",
  "improved", "increased", "influenced", "initiated", "launched", "led",
  "managed", "mentored", "modernized", "negotiated", "optimized", "orchestrated",
  "organized", "owned", "partnered", "pioneered", "planned", "presented",
  "prioritized", "produced", "reduced", "researched", "resolved", "revamped",
  "scaled", "shipped", "simplified", "spearheaded", "standardized",
  "streamlined", "strengthened", "supervised", "supported", "tested",
  "trained", "transformed", "validated",
]

export const WEAK_WORDS = [
  "responsible for", "duties included", "helped with", "assisted in",
  "worked on", "involved in", "participated in", "tasked with",
  "in charge of", "familiar with",
]

export const BUZZWORDS = [
  "synergy", "paradigm shift", "thought leader", "move the needle",
  "circle back", "low-hanging fruit", "disrupt", "leverage", "best-in-class",
  "world-class", "guru", "ninja", "rockstar", "go-getter", "self-starter",
  "results-oriented", "detail-oriented", "hard-working", "team player",
]

export const SKILL_SIGNALS: SkillSignal[] = [
  { canonical: "javascript", category: "frontend", aliases: ["javascript", "js", "ecmascript"] },
  { canonical: "typescript", category: "frontend", aliases: ["typescript", "ts"] },
  { canonical: "react", category: "frontend", aliases: ["react", "react.js"] },
  { canonical: "next.js", category: "frontend", aliases: ["next.js", "nextjs"] },
  { canonical: "vue", category: "frontend", aliases: ["vue", "vue.js"] },
  { canonical: "angular", category: "frontend", aliases: ["angular"] },
  { canonical: "html", category: "frontend", aliases: ["html", "html5"] },
  { canonical: "css", category: "frontend", aliases: ["css", "css3"] },
  { canonical: "tailwind css", category: "frontend", aliases: ["tailwind", "tailwind css"] },
  { canonical: "redux", category: "frontend", aliases: ["redux"] },
  { canonical: "node.js", category: "backend", aliases: ["node", "node.js", "nodejs"] },
  { canonical: "express", category: "backend", aliases: ["express", "express.js"] },
  { canonical: "python", category: "backend", aliases: ["python"] },
  { canonical: "java", category: "backend", aliases: ["java"] },
  { canonical: "spring boot", category: "backend", aliases: ["spring boot", "spring"] },
  { canonical: "c#", category: "backend", aliases: ["c#", ".net", "dotnet"] },
  { canonical: "go", category: "backend", aliases: ["go", "golang"] },
  { canonical: "sql", category: "backend", aliases: ["sql", "postgresql", "mysql", "sqlite"] },
  { canonical: "graphql", category: "backend", aliases: ["graphql"] },
  { canonical: "rest api", category: "backend", aliases: ["rest", "rest api", "restful api", "apis"] },
  { canonical: "aws", category: "cloud", aliases: ["aws", "amazon web services"] },
  { canonical: "azure", category: "cloud", aliases: ["azure", "microsoft azure"] },
  { canonical: "gcp", category: "cloud", aliases: ["gcp", "google cloud", "google cloud platform"] },
  { canonical: "docker", category: "cloud", aliases: ["docker"] },
  { canonical: "kubernetes", category: "cloud", aliases: ["kubernetes", "k8s"] },
  { canonical: "terraform", category: "cloud", aliases: ["terraform"] },
  { canonical: "ci/cd", category: "cloud", aliases: ["ci/cd", "cicd", "continuous integration", "continuous delivery"] },
  { canonical: "pandas", category: "data", aliases: ["pandas"] },
  { canonical: "numpy", category: "data", aliases: ["numpy"] },
  { canonical: "power bi", category: "data", aliases: ["power bi"] },
  { canonical: "tableau", category: "data", aliases: ["tableau"] },
  { canonical: "machine learning", category: "data", aliases: ["machine learning", "ml"] },
  { canonical: "deep learning", category: "data", aliases: ["deep learning"] },
  { canonical: "nlp", category: "data", aliases: ["nlp", "natural language processing"] },
  { canonical: "pytorch", category: "data", aliases: ["pytorch"] },
  { canonical: "tensorflow", category: "data", aliases: ["tensorflow"] },
  { canonical: "product management", category: "product", aliases: ["product management", "product manager"] },
  { canonical: "roadmapping", category: "product", aliases: ["roadmap", "roadmapping"] },
  { canonical: "experimentation", category: "product", aliases: ["experimentation", "a/b testing", "ab testing"] },
  { canonical: "stakeholder management", category: "product", aliases: ["stakeholder management", "cross-functional leadership"] },
  { canonical: "figma", category: "design", aliases: ["figma"] },
  { canonical: "user research", category: "design", aliases: ["user research", "ux research"] },
  { canonical: "wireframing", category: "design", aliases: ["wireframing", "wireframes"] },
  { canonical: "seo", category: "marketing", aliases: ["seo", "search engine optimization"] },
  { canonical: "content strategy", category: "marketing", aliases: ["content strategy"] },
  { canonical: "google analytics", category: "marketing", aliases: ["google analytics", "ga4", "ga"] },
  { canonical: "crm", category: "sales", aliases: ["crm", "salesforce", "hubspot"] },
  { canonical: "sales enablement", category: "sales", aliases: ["sales enablement"] },
  { canonical: "project management", category: "operations", aliases: ["project management"] },
  { canonical: "agile", category: "operations", aliases: ["agile", "scrum", "kanban"] },
  { canonical: "jira", category: "operations", aliases: ["jira"] },
  { canonical: "cybersecurity", category: "security", aliases: ["cybersecurity", "information security"] },
  { canonical: "iam", category: "security", aliases: ["iam", "identity and access management"] },
  { canonical: "penetration testing", category: "security", aliases: ["penetration testing", "pentesting"] },
  { canonical: "jest", category: "qa", aliases: ["jest"] },
  { canonical: "cypress", category: "qa", aliases: ["cypress"] },
  { canonical: "selenium", category: "qa", aliases: ["selenium"] },
  { canonical: "leadership", category: "people", aliases: ["leadership", "team leadership"] },
  { canonical: "mentoring", category: "people", aliases: ["mentoring", "coaching"] },
  { canonical: "communication", category: "people", aliases: ["communication", "written communication", "verbal communication"] },
]

export const COMMON_SKILLS = SKILL_SIGNALS.map((signal) => signal.canonical)

export const ROLE_FAMILY_KEYWORDS: Record<string, string[]> = {
  "Software Engineering": ["software engineer", "frontend", "backend", "full stack", "developer", "platform engineer"],
  "Data & AI": ["data scientist", "data analyst", "machine learning", "analytics", "ai engineer"],
  "Product": ["product manager", "product owner", "roadmap", "prioritization"],
  "Design": ["product designer", "ux", "ui", "visual design", "research"],
  "Marketing": ["growth", "seo", "campaign", "content", "demand generation"],
  "Sales": ["account executive", "sales", "pipeline", "quota", "customer acquisition"],
  "Operations": ["operations", "program manager", "project manager", "process improvement"],
  "Security": ["security engineer", "security analyst", "iam", "risk", "compliance"],
}

export const TOOL_JOB_PRESETS: ResumeToolPreset[] = [
  {
    id: "frontend",
    label: "Frontend",
    role: "Senior Frontend Engineer",
    companyType: "SaaS Startup",
    description: "High-ownership React / Next.js product role",
    jobDescription:
      "We are hiring a Senior Frontend Engineer to lead development of customer-facing product experiences across our React and Next.js platform. You will partner closely with product managers, designers, and backend engineers to ship accessible, responsive, high-performance interfaces. Requirements include 5+ years of experience building modern web applications, strong proficiency in JavaScript, TypeScript, React, Next.js, HTML, CSS, design systems, REST APIs, performance optimization, experimentation, analytics instrumentation, and testing with Jest or Cypress. You should be comfortable owning architecture decisions, mentoring junior engineers, collaborating cross-functionally, and using metrics to improve conversion and retention.",
  },
  {
    id: "data",
    label: "Data",
    role: "Data Analyst",
    companyType: "Growth Company",
    description: "Analytics role focused on SQL, BI, and experimentation",
    jobDescription:
      "We are looking for a Data Analyst to turn product, marketing, and revenue data into actionable insights. You will define KPI frameworks, build dashboards, analyze funnel performance, and support A/B testing programs. The ideal candidate has 3+ years of analytics experience and strong skills in SQL, Python, Excel, Tableau or Power BI, stakeholder management, experimentation, data storytelling, statistical analysis, and business reporting. Experience working with product teams, marketing attribution, data quality, and cross-functional communication is required.",
  },
  {
    id: "product",
    label: "Product",
    role: "Product Manager",
    companyType: "B2B Platform",
    description: "Execution-heavy PM role with discovery and analytics",
    jobDescription:
      "We are hiring a Product Manager to own roadmap execution for core platform workflows. You will synthesize customer feedback, define product requirements, prioritize initiatives, and work closely with engineering, design, operations, and leadership. Requirements include 4+ years in product management, experience with user research, roadmap planning, KPI definition, experimentation, stakeholder alignment, agile delivery, Jira, writing PRDs, and using qualitative and quantitative data to guide decisions. Candidates should demonstrate strong communication, cross-functional leadership, and a history of shipping measurable improvements.",
  },
]
