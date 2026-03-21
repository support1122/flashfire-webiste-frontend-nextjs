// ATS Analysis Engine — Industry-grade scoring, 15 checks, hard cap at 95

export interface ATSCheckResult {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

export interface ATSAnalysisResult {
  score: number
  breakdown: ATSCheckResult[]
  summary: string
}

const ACTION_VERBS = [
  "achieved", "administered", "advanced", "analyzed", "appointed", "approved",
  "arranged", "assessed", "assigned", "automated", "boosted", "budgeted",
  "built", "centralized", "chaired", "coached", "collaborated", "completed",
  "conducted", "consolidated", "constructed", "consulted", "contracted",
  "converted", "coordinated", "created", "cultivated", "customized",
  "decreased", "delegated", "delivered", "demonstrated", "designed",
  "developed", "devised", "directed", "discovered", "doubled", "drove",
  "earned", "eliminated", "enabled", "engineered", "enhanced", "established",
  "evaluated", "exceeded", "executed", "expanded", "expedited", "facilitated",
  "finalized", "forecasted", "formulated", "founded", "generated", "guided",
  "headed", "identified", "implemented", "improved", "increased", "influenced",
  "initiated", "innovated", "inspired", "instituted", "integrated",
  "introduced", "invented", "investigated", "launched", "led", "leveraged",
  "managed", "mapped", "maximized", "mentored", "merged", "migrated",
  "minimized", "mobilized", "modernized", "monitored", "motivated",
  "negotiated", "operated", "optimized", "orchestrated", "organized",
  "outperformed", "overhauled", "oversaw", "partnered", "pioneered",
  "planned", "presented", "prioritized", "produced", "programmed",
  "projected", "promoted", "proposed", "publicized", "published",
  "recommended", "reconciled", "recruited", "redesigned", "reduced",
  "refined", "reformed", "regenerated", "remodeled", "reorganized",
  "represented", "researched", "resolved", "restructured", "revamped",
  "reviewed", "revised", "revitalized", "saved", "scheduled", "secured",
  "simplified", "spearheaded", "standardized", "steered", "stimulated",
  "streamlined", "strengthened", "supervised", "surpassed", "synchronized",
  "synthesized", "systematized", "tabulated", "targeted", "trained",
  "transformed", "translated", "troubleshot", "uncovered", "unified",
  "upgraded", "utilized", "validated", "visualized", "volunteered", "won",
]

// Words ATS parsers flag as filler / weak
const WEAK_WORDS = [
  "responsible for", "duties included", "helped with", "assisted in",
  "worked on", "involved in", "participated in", "tasked with",
  "in charge of", "familiar with",
]

const BUZZWORDS = [
  "synergy", "paradigm shift", "thought leader", "move the needle",
  "circle back", "low-hanging fruit", "disrupt", "leverage",
  "best-in-class", "world-class", "guru", "ninja", "rockstar",
  "go-getter", "self-starter", "results-oriented", "detail-oriented",
  "hard-working", "team player",
]

const COMMON_SKILLS = [
  // Programming Languages
  "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "go",
  "rust", "swift", "kotlin", "php", "sql", "scala", "perl", "matlab",
  "r programming", "objective-c", "dart", "lua", "haskell", "elixir",
  // Databases
  "nosql", "mongodb", "postgresql", "mysql", "redis", "elasticsearch",
  "dynamodb", "cassandra", "sqlite", "mariadb", "neo4j", "firebase",
  // DevOps & Cloud
  "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "ansible",
  "jenkins", "git", "ci/cd", "github", "gitlab", "bitbucket", "heroku",
  "vercel", "netlify", "cloudflare", "nginx", "apache",
  // Frontend
  "react", "angular", "vue", "next.js", "node.js", "express", "svelte",
  "html", "css", "sass", "tailwind", "bootstrap", "webpack", "vite",
  "jquery", "redux", "graphql", "rest", "api",
  // Backend & Frameworks
  "django", "flask", "spring", "rails", ".net", "laravel", "fastapi",
  "microservices", "serverless",
  // Data Science & ML
  "machine learning", "deep learning", "natural language processing",
  "nlp", "computer vision", "tensorflow", "pytorch", "pandas", "numpy",
  "scikit-learn", "spark", "hadoop", "keras", "opencv", "spacy",
  "statistical modeling", "predictive analytics", "predictive modeling",
  "hypothesis testing", "regression", "classification", "clustering",
  "neural networks", "random forest", "xgboost", "lightgbm",
  "feature engineering", "model deployment", "mlops",
  "data mining", "data wrangling", "data cleaning", "data engineering",
  "big data", "etl", "data pipeline", "data warehousing",
  "causal inference", "time series", "bayesian",
  // Data Visualization & BI
  "tableau", "power bi", "excel", "matplotlib", "seaborn", "ggplot2",
  "d3.js", "looker", "qlik", "arcgis", "plotly",
  // Project & Product Management
  "agile", "scrum", "kanban", "jira", "confluence", "trello", "asana",
  "monday.com", "notion", "project management", "product management",
  "stakeholder management",
  // Design
  "figma", "sketch", "photoshop", "illustrator", "adobe xd", "canva",
  "invision", "zeplin",
  // System Administration
  "linux", "bash", "powershell", "windows server", "active directory",
  // CRM & Marketing
  "salesforce", "hubspot", "sap", "oracle", "marketo", "mailchimp",
  "google analytics", "adobe analytics", "google ads", "facebook ads",
  "a/b testing", "seo", "sem", "content marketing",
  // Business & Soft Skills
  "leadership", "communication", "problem solving", "teamwork",
  "analytical", "strategic planning", "data analysis", "financial modeling",
  "marketing", "ux", "ui", "business development", "account management",
  "customer success", "technical writing", "copywriting", "content strategy",
  "cross-functional", "presentation", "negotiation", "mentoring",
  "business analytics", "roi analysis", "budget management",
  // Security & Networking
  "cybersecurity", "penetration testing", "network security", "encryption",
  "oauth", "jwt", "ssl", "firewall", "vpn",
  // Testing & QA
  "unit testing", "integration testing", "selenium", "cypress", "jest",
  "mocha", "pytest", "test automation", "qa",
  // Mobile
  "react native", "flutter", "ios", "android", "mobile development",
  // Other Technical
  "jupyter", "jupyter notebook", "r studio", "rstudio", "visual studio",
  "vs code", "intellij", "pycharm", "postman", "swagger",
  "xml", "json", "yaml", "csv", "parquet",
  "blockchain", "web3", "solidity",
  "chatgpt", "llm", "large language model", "generative ai", "prompt engineering",
  "automation", "scripting", "web scraping", "beautiful soup",
]

// ─── 1. Contact Information (10 pts) ─────────────────────────────
function checkContactInfo(text: string): ATSCheckResult {
  const maxScore = 10
  let score = 0
  const lower = text.toLowerCase()

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i
  const locationRegex = /\b(?:[A-Z][a-z]+,?\s*(?:AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|ON|BC|AB|QC|MB|SK|NS|NB))\b/
  const hasLocation = locationRegex.test(text) || /\b\d{5}(?:-\d{4})?\b/.test(text) || /\b[A-Z][a-z]+,\s*[A-Z]{2}\b/.test(text)

  const hasEmail = emailRegex.test(text)
  const hasPhone = phoneRegex.test(text)
  const hasLinkedin = linkedinRegex.test(lower)

  if (hasEmail) score += 3
  if (hasPhone) score += 3
  if (hasLinkedin) score += 2
  if (hasLocation) score += 2

  const status = score >= 8 ? "pass" : score >= 5 ? "warning" : "fail"
  const missing: string[] = []
  if (!hasEmail) missing.push("email")
  if (!hasPhone) missing.push("phone number")
  if (!hasLinkedin) missing.push("LinkedIn URL")
  if (!hasLocation) missing.push("location")

  return {
    name: "Contact Information",
    score,
    maxScore,
    status,
    feedback: missing.length === 0
      ? "All contact details found — email, phone, LinkedIn, and location."
      : `Missing: ${missing.join(", ")}. Complete contact info helps ATS parse your identity correctly.`,
  }
}

// ─── 2. Text Extractability (6 pts) ──────────────────────────────
function checkTextExtractability(text: string): ATSCheckResult {
  const maxScore = 6
  const charCount = text.replace(/\s/g, "").length
  const lineCount = text.split("\n").filter((l) => l.trim().length > 0).length

  let score = 0
  if (charCount > 800 && lineCount > 20) score = 6
  else if (charCount > 400 && lineCount > 10) score = 4
  else if (charCount > 100) score = 2
  else score = 0

  const status = score >= 5 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Text Extractability",
    score,
    maxScore,
    status,
    feedback: charCount <= 100
      ? "Very little text extracted. This may be an image-based or heavily designed PDF that ATS cannot read."
      : charCount <= 400
        ? "Limited text extracted. Some content may be in images, headers, or footers that ATS skips."
        : `${charCount} characters across ${lineCount} lines — text is properly extractable.`,
  }
}

// ─── 3. Section Headers (10 pts) ─────────────────────────────────
function checkSectionHeaders(text: string): ATSCheckResult {
  const maxScore = 10
  const lower = text.toLowerCase()

  const sections: Record<string, RegExp> = {
    Experience: /(?:^|\n)\s*(?:experience|work\s*history|employment|professional\s*experience|work\s*experience)\b/im,
    Education: /(?:^|\n)\s*(?:education|academic|qualifications)\b/im,
    Skills: /(?:^|\n)\s*(?:skills|technical\s*skills|core\s*competencies|proficiencies|areas\s*of\s*expertise|key\s*skills)\b/im,
    Summary: /(?:^|\n)\s*(?:summary|profile|objective|professional\s*summary|career\s*summary|about)\b/im,
    Projects: /(?:^|\n)\s*(?:projects|personal\s*projects|key\s*projects|portfolio)\b/im,
  }

  let found = 0
  const missing: string[] = []
  const present: string[] = []
  for (const [name, regex] of Object.entries(sections)) {
    if (regex.test(lower)) {
      found++
      present.push(name)
    } else {
      missing.push(name)
    }
  }

  // Core 4 (Experience, Education, Skills, Summary) = 2 pts each; Projects = bonus 2 pts
  const coreCount = ["Experience", "Education", "Skills", "Summary"].filter((s) => present.includes(s)).length
  const hasProjects = present.includes("Projects")
  const score = Math.min(maxScore, coreCount * 2 + (hasProjects ? 2 : 0))

  const status = score >= 8 ? "pass" : score >= 6 ? "warning" : "fail"

  return {
    name: "Section Headers",
    score,
    maxScore,
    status,
    feedback: coreCount === 4
      ? `All core sections detected (${present.join(", ")}). ATS can parse your resume structure.`
      : `Found: ${present.join(", ") || "none"}. Missing: ${missing.join(", ")}. Standard ATS headers are critical for parsing.`,
  }
}

// ─── 4. Date Consistency (7 pts) ─────────────────────────────────
function checkDateFormatting(text: string): ATSCheckResult {
  const maxScore = 7

  // Detect different date format types
  const monthYearFormat = text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\b/gi) || []
  const slashFormat = text.match(/\b\d{1,2}\/\d{4}\b/g) || []
  const yearDashFormat = text.match(/\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|[Pp]resent|[Cc]urrent)\b/g) || []
  const fullMonthYearRange = text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\s*[-–—]\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|[Pp]resent|[Cc]urrent)\b/gi) || []

  const totalDates = monthYearFormat.length + slashFormat.length + yearDashFormat.length + fullMonthYearRange.length

  // Penalize mixed formats — ATS prefers consistency
  const formatTypes = [monthYearFormat.length > 0, slashFormat.length > 0, yearDashFormat.length > 0].filter(Boolean).length
  const hasMixedFormats = formatTypes > 1

  let score: number
  if (totalDates >= 6 && !hasMixedFormats) score = 7
  else if (totalDates >= 4) score = hasMixedFormats ? 4 : 6
  else if (totalDates >= 2) score = 3
  else if (totalDates >= 1) score = 2
  else score = 0

  const status = score >= 5 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Date Consistency",
    score,
    maxScore,
    status,
    feedback: totalDates === 0
      ? "No recognizable dates found. Use consistent formats like 'Jan 2020 – Present' or 'MM/YYYY'."
      : hasMixedFormats
        ? `${totalDates} dates found but using mixed formats. Stick to one format (e.g., 'Mon YYYY') for ATS consistency.`
        : totalDates < 4
          ? `${totalDates} date(s) found. Ensure every role and degree has clear start and end dates.`
          : `${totalDates} dates found with consistent formatting. Well structured.`,
  }
}

// ─── 5. Bullet Points & Structure (7 pts) ────────────────────────
function checkBulletPoints(text: string): ATSCheckResult {
  const maxScore = 7
  const lines = text.split("\n")

  const bulletLines = lines.filter((line) => {
    const trimmed = line.trim()
    return /^[•●○◦▪▸►\-–—\*]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)
  })

  // Check average bullet length (too short = vague, too long = walls of text)
  const avgBulletLength = bulletLines.length > 0
    ? bulletLines.reduce((sum, l) => sum + l.trim().length, 0) / bulletLines.length
    : 0

  const count = bulletLines.length
  let score: number
  if (count >= 12 && avgBulletLength >= 40 && avgBulletLength <= 200) score = 7
  else if (count >= 8) score = 6
  else if (count >= 5) score = 4
  else if (count >= 2) score = 2
  else score = 0

  // Penalize if bullets are too short (under 30 chars avg = lazy bullets)
  if (count >= 5 && avgBulletLength < 30) score = Math.max(score - 2, 1)

  const status = score >= 5 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Bullet Points",
    score,
    maxScore,
    status,
    feedback: count === 0
      ? "No bullet points detected. Use bullets to list achievements — ATS parses structured lists better than paragraphs."
      : count < 5
        ? `Only ${count} bullet(s) found. Aim for 3-5 per role to detail your impact.`
        : avgBulletLength < 30
          ? `${count} bullets found, but they're too short (avg ${Math.round(avgBulletLength)} chars). Add context and metrics.`
          : `${count} bullet points with good detail (avg ${Math.round(avgBulletLength)} chars per bullet).`,
  }
}

// ─── 6. Action Verbs (7 pts) ─────────────────────────────────────
function checkActionVerbs(text: string): ATSCheckResult {
  const maxScore = 7
  const lines = text.split("\n")

  // Only check lines that start with bullets — that's where action verbs matter
  const bulletLines = lines.filter((l) => /^\s*[•●○◦▪▸►\-–—\*]\s/.test(l) || /^\s*\d+[.)]\s/.test(l))
  const allLines = bulletLines.length > 3 ? bulletLines : lines

  const foundVerbs = new Set<string>()
  let bulletsStartingWithVerb = 0

  for (const line of allLines) {
    const words = line.trim().replace(/^[•●○◦▪▸►\-–—\*\d.)]\s*/, "").toLowerCase().split(/\s+/)
    const firstWord = words[0]?.replace(/[^a-z]/g, "")
    if (firstWord && ACTION_VERBS.includes(firstWord)) {
      bulletsStartingWithVerb++
    }
    for (const w of words) {
      const clean = w.replace(/[^a-z]/g, "")
      if (ACTION_VERBS.includes(clean)) foundVerbs.add(clean)
    }
  }

  const uniqueCount = foundVerbs.size
  // Reward diversity + bullet-leading usage
  const leadingRatio = bulletLines.length > 0 ? bulletsStartingWithVerb / bulletLines.length : 0

  let score: number
  if (uniqueCount >= 15 && leadingRatio >= 0.6) score = 7
  else if (uniqueCount >= 10) score = 6
  else if (uniqueCount >= 6) score = 5
  else if (uniqueCount >= 3) score = 3
  else score = 1

  const status = score >= 5 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Action Verbs",
    score,
    maxScore,
    status,
    feedback: uniqueCount >= 10
      ? `${uniqueCount} unique action verbs found, ${bulletsStartingWithVerb} bullets lead with a verb. Strong impact language.`
      : uniqueCount >= 5
        ? `${uniqueCount} action verbs found. Try starting more bullets with verbs like "spearheaded", "optimized", "delivered".`
        : `Only ${uniqueCount} action verb(s) — weak. Start every bullet with a strong verb (built, led, increased, designed).`,
  }
}

// ─── 7. Resume Length (5 pts) ────────────────────────────────────
function checkLength(text: string): ATSCheckResult {
  const maxScore = 5
  const words = text.split(/\s+/).filter((w) => w.length > 0)
  const wordCount = words.length
  const estimatedPages = Math.round((wordCount / 475) * 10) / 10

  let score: number
  // Sweet spot: 400-800 words (1-2 pages, well-written)
  if (wordCount >= 400 && wordCount <= 800) score = 5
  else if (wordCount >= 300 && wordCount <= 1000) score = 4
  else if (wordCount >= 200 && wordCount <= 1200) score = 3
  else if (wordCount >= 100) score = 2
  else score = 1

  const status = score >= 4 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Resume Length",
    score,
    maxScore,
    status,
    feedback: wordCount < 200
      ? `~${wordCount} words is too thin. Most competitive resumes are 400-800 words.`
      : wordCount > 1000
        ? `~${wordCount} words (~${estimatedPages} pages). Recruiters spend 6-7 seconds scanning — tighten to 1-2 pages.`
        : `~${wordCount} words (~${estimatedPages} pages). Good length for ATS and recruiter review.`,
  }
}

// ─── 8. Skills Section (8 pts) ───────────────────────────────────
function checkSkillsSection(text: string): ATSCheckResult {
  const maxScore = 8
  const lower = text.toLowerCase()

  // Extract the actual SKILLS section via standalone header
  const sectionPatterns = [
    /(?:^|\n)\s*(?:SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|KEY SKILLS|AREAS OF EXPERTISE)\s*\n([\s\S]*?)(?=\n\s*(?:EXPERIENCE|EDUCATION|PROJECTS|CERTIFICATIONS|WORK|EMPLOYMENT|SUMMARY|PROFILE|PUBLICATIONS|AWARDS|REFERENCES|LEADERSHIP|INTERESTS|HOBBIES)\s*\n|$)/i,
    /(?:^|\n)\s*(?:skills|technical skills|core competencies|key skills|proficiencies|expertise)\s*[:.\n]([\s\S]*?)(?=\n\s*(?:experience|education|projects|certifications|work|employment|summary|profile|publications|awards|references)\s*[:.\n]|$)/i,
  ]

  let skillsText = ""
  for (const pattern of sectionPatterns) {
    const match = lower.match(pattern)
    if (match && match[1] && match[1].trim().length > 20) {
      skillsText = match[1]
      break
    }
  }

  const searchText = skillsText || lower
  const foundSkills = new Set<string>()
  for (const skill of COMMON_SKILLS) {
    if (searchText.includes(skill.toLowerCase())) {
      foundSkills.add(skill)
    }
  }

  const count = foundSkills.size
  // Industry standard: 8-15 skills is well-organized, 15+ is strong
  let score: number
  if (count >= 15) score = 8
  else if (count >= 10) score = 7
  else if (count >= 6) score = 5
  else if (count >= 3) score = 3
  else score = 1

  // Penalize if no dedicated skills section was found (skills scattered in body only)
  if (!skillsText && count >= 3) score = Math.max(score - 2, 1)

  const status = score >= 6 ? "pass" : score >= 3 ? "warning" : "fail"

  return {
    name: "Skills Section",
    score,
    maxScore,
    status,
    feedback: !skillsText
      ? `${count} skills found scattered in the resume, but no dedicated Skills section detected. Add a clear "Skills" header for ATS.`
      : count >= 10
        ? `${count} industry-recognized skills found in a dedicated section. Well organized.`
        : count >= 5
          ? `${count} skills detected. Consider adding more role-specific technical skills to improve keyword matching.`
          : `Only ${count} recognizable skill(s). Expand your skills section with industry-standard terms.`,
  }
}

// ─── 9. Education (6 pts) ────────────────────────────────────────
function checkEducation(text: string): ATSCheckResult {
  const maxScore = 6
  const lower = text.toLowerCase()
  let score = 0

  const degreeKeywords = /\b(bachelor|master|phd|doctorate|associate|mba|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|b\.?e\.?|m\.?e\.?|b\.?tech|m\.?tech|diploma|certificate)\b/i
  const yearRegex = /\b(19|20)\d{2}\b/
  const institutionIndicators = /\b(university|college|institute|school|academy)\b/i
  const hasGPA = /\b(?:gpa|cgpa)\s*[:.]?\s*\d/i.test(text) || /\b\d\.\d{1,2}\s*\/\s*4/i.test(text)

  if (degreeKeywords.test(lower)) score += 2
  if (institutionIndicators.test(lower)) score += 2
  if (yearRegex.test(text)) score += 1
  if (hasGPA) score += 1

  const status = score >= 5 ? "pass" : score >= 3 ? "warning" : "fail"
  const missing: string[] = []
  if (!degreeKeywords.test(lower)) missing.push("degree type")
  if (!institutionIndicators.test(lower)) missing.push("institution")
  if (!yearRegex.test(text)) missing.push("graduation year")

  return {
    name: "Education",
    score,
    maxScore,
    status,
    feedback: missing.length === 0 && hasGPA
      ? "Education section is complete — degree, institution, year, and GPA."
      : missing.length === 0
        ? "Education section has degree, institution, and year. Consider adding GPA if strong (3.5+)."
        : `Missing: ${missing.join(", ")}. Complete education info helps ATS validate qualifications.`,
  }
}

// ─── 10. Quantifiable Impact (10 pts) ────────────────────────────
function checkQuantifiableAchievements(text: string): ATSCheckResult {
  const maxScore = 10

  const percentages = text.match(/\d+\s*%/g) || []
  const dollarAmounts = text.match(/\$[\d,]+(?:\.\d+)?(?:\s*(?:million|billion|k|m|b))?/gi) || []
  const numericalImpact = text.match(/\b\d+\+?\s*(?:years?|months?|clients?|customers?|projects?|team\s*members?|people|users?|employees?|hours?|stakeholders?|applications?|documents?)\b/gi) || []
  const impactPhrases = text.match(/(?:increased|decreased|reduced|improved|grew|saved|generated|boosted|cut|lifted|accelerated|shortened|expanded)\s+[^.]*?\d+/gi) || []

  const uniqueMetrics = new Set([
    ...percentages,
    ...dollarAmounts,
    ...numericalImpact.slice(0, 20),
    ...impactPhrases.slice(0, 20),
  ])
  const totalMatches = uniqueMetrics.size

  // Industry standard: top resumes have 8-15 quantified points
  let score: number
  if (totalMatches >= 12) score = 10
  else if (totalMatches >= 8) score = 8
  else if (totalMatches >= 5) score = 6
  else if (totalMatches >= 3) score = 4
  else if (totalMatches >= 1) score = 2
  else score = 0

  const status = score >= 7 ? "pass" : score >= 4 ? "warning" : "fail"

  return {
    name: "Quantifiable Impact",
    score,
    maxScore,
    status,
    feedback: totalMatches === 0
      ? "No quantified achievements. Add specific numbers — '30% increase', '$50K saved', 'managed 12-person team'."
      : totalMatches < 5
        ? `${totalMatches} measurable result(s). Strong resumes have 8-12+ quantified bullet points. Add %, $, and counts.`
        : totalMatches < 10
          ? `${totalMatches} quantified results — solid. Add metrics to remaining bullets for maximum impact.`
          : `${totalMatches} quantified achievements — strong data-driven resume.`,
  }
}

// ─── 11. Professional Email (3 pts) ──────────────────────────────
function checkProfessionalEmail(text: string): ATSCheckResult {
  const maxScore = 3
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)

  if (!emailMatch) {
    return {
      name: "Professional Email",
      score: 0,
      maxScore,
      status: "fail",
      feedback: "No email found. ATS systems require an email to create your candidate profile.",
    }
  }

  const email = emailMatch[0].toLowerCase()
  const localPart = email.split("@")[0]
  const unprofessional = /\d{4,}|sexy|hot|cool|babe|dude|gamer|ninja|69|420/i
  const isUnprofessional = unprofessional.test(localPart)
  const domain = email.split("@")[1]
  const isBusinessDomain = !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com"].includes(domain)

  let score = 2
  if (isUnprofessional) score = 1
  else if (isBusinessDomain || /^[a-z]+[._][a-z]+@/.test(email)) score = 3

  const status = score >= 2 ? "pass" : "warning"

  return {
    name: "Professional Email",
    score,
    maxScore,
    status,
    feedback: isUnprofessional
      ? "Email looks unprofessional. Use firstname.lastname format for better impressions."
      : score === 3
        ? "Professional email format detected."
        : "Email found. Consider a firstname.lastname format for maximum professionalism.",
  }
}

// ─── 12. Formatting & Readability (7 pts) ────────────────────────
function checkFormattingIssues(text: string): ATSCheckResult {
  const maxScore = 7
  let deductions = 0
  const warnings: string[] = []

  const lines = text.split("\n")

  // Tables / multi-column detection
  const tabHeavyLines = lines.filter((l) => (l.match(/\t/g) || []).length >= 3)
  if (tabHeavyLines.length > 3) {
    deductions += 2
    warnings.push("table/column layout detected (ATS reads left-to-right, columns merge)")
  }

  // Excessive special characters
  const specialCharRatio = (text.match(/[^\w\s.,;:!?@#$%&*()\-–—/\\'"]/g) || []).length / Math.max(text.length, 1)
  if (specialCharRatio > 0.03) {
    deductions += 1
    warnings.push("unusual characters that may confuse ATS parsers")
  }

  // All-caps overuse
  const allCapsLines = lines.filter((l) => l.trim().length > 15 && l.trim() === l.trim().toUpperCase())
  if (allCapsLines.length > 4) {
    deductions += 1
    warnings.push("excessive ALL CAPS (use Title Case for headers instead)")
  }

  // Very long lines = possible merged columns
  const veryLongLines = lines.filter((l) => l.trim().length > 150)
  if (veryLongLines.length > 3) {
    deductions += 1
    warnings.push("very long lines — possible multi-column merge issue")
  }

  // Check for headers/footers (page numbers, repeated text)
  const pageNumbers = text.match(/\bpage\s*\d+\s*(?:of\s*\d+)?\b/gi) || []
  if (pageNumbers.length > 0) {
    deductions += 1
    warnings.push("page numbers detected (ATS may parse them as content)")
  }

  const score = Math.max(0, maxScore - deductions)
  const status = score >= 6 ? "pass" : score >= 4 ? "warning" : "fail"

  return {
    name: "Formatting & Readability",
    score,
    maxScore,
    status,
    feedback: warnings.length === 0
      ? "Clean formatting — no tables, special characters, or layout issues detected."
      : `Issues: ${warnings.join("; ")}. Fix these for reliable ATS parsing.`,
  }
}

// ─── 13. Weak Language Detection (5 pts) ─────────────────────────
function checkWeakLanguage(text: string): ATSCheckResult {
  const maxScore = 5
  const lower = text.toLowerCase()

  const foundWeak: string[] = []
  for (const phrase of WEAK_WORDS) {
    if (lower.includes(phrase)) foundWeak.push(phrase)
  }

  const foundBuzz: string[] = []
  for (const phrase of BUZZWORDS) {
    if (lower.includes(phrase)) foundBuzz.push(phrase)
  }

  const totalIssues = foundWeak.length + foundBuzz.length

  let score: number
  if (totalIssues === 0) score = 5
  else if (totalIssues <= 2) score = 4
  else if (totalIssues <= 4) score = 2
  else score = 1

  const status = score >= 4 ? "pass" : score >= 2 ? "warning" : "fail"

  const examples = [...foundWeak, ...foundBuzz].slice(0, 3)

  return {
    name: "Language Strength",
    score,
    maxScore,
    status,
    feedback: totalIssues === 0
      ? "No weak phrases or cliché buzzwords detected. Professional tone."
      : `Found ${totalIssues} weak/cliché phrase(s): "${examples.join('", "')}". Replace with specific, results-driven language.`,
  }
}

// ─── 14. Consistency & Completeness (5 pts) ──────────────────────
function checkConsistency(text: string): ATSCheckResult {
  const maxScore = 5
  let score = 5
  const issues: string[] = []

  // Check for orphan dates (dates without context)
  const hasExperienceSection = /\b(experience|work\s*history|employment)\b/i.test(text)
  const dateCount = (text.match(/\b(?:19|20)\d{2}\b/g) || []).length

  if (hasExperienceSection && dateCount < 2) {
    score -= 1
    issues.push("too few dates in experience section")
  }

  // Check for very short sections (< 2 lines after a header)
  const headerPattern = /(?:^|\n)\s*([A-Z][A-Z\s&]{2,})\s*\n/g
  let match
  const sectionLengths: { header: string; length: number }[] = []
  const positions: number[] = []
  while ((match = headerPattern.exec(text)) !== null) {
    positions.push(match.index)
  }
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i]
    const end = positions[i + 1] || text.length
    const sectionText = text.substring(start, end)
    const contentLines = sectionText.split("\n").filter((l) => l.trim().length > 5)
    if (contentLines.length <= 1) {
      sectionLengths.push({ header: sectionText.split("\n")[0].trim(), length: contentLines.length })
    }
  }

  if (sectionLengths.length > 0) {
    score -= 1
    issues.push(`thin section(s): ${sectionLengths.map((s) => s.header).slice(0, 2).join(", ")}`)
  }

  // Check for first-person pronouns (should be omitted in resumes)
  const pronounCount = (text.match(/\b(I |my |me |myself )\b/g) || []).length
  if (pronounCount > 3) {
    score -= 1
    issues.push(`${pronounCount} first-person pronouns found (I, my, me) — omit for professional tone`)
  }

  // Check for references line (wastes space)
  if (/references?\s*(?:available)?\s*(?:upon|on)\s*request/i.test(text)) {
    score -= 1
    issues.push('"References available upon request" is outdated — remove it')
  }

  score = Math.max(0, score)
  const status = score >= 4 ? "pass" : score >= 2 ? "warning" : "fail"

  return {
    name: "Resume Best Practices",
    score,
    maxScore,
    status,
    feedback: issues.length === 0
      ? "Resume follows standard best practices — no pronouns, no filler sections, good completeness."
      : `Issues: ${issues.join("; ")}.`,
  }
}

// ─── 15. File & Parse Compatibility (4 pts) ──────────────────────
function checkParseCompatibility(text: string): ATSCheckResult {
  const maxScore = 4
  let score = 4
  const issues: string[] = []

  // Check for common encoding issues
  const encodingIssues = (text.match(/[�\ufffd]/g) || []).length
  if (encodingIssues > 0) {
    score -= 2
    issues.push(`${encodingIssues} character encoding error(s) — content may display incorrectly`)
  }

  // Check for excessive whitespace (sign of complex layouts)
  const doubleSpaceLines = text.split("\n").filter((l) => /\s{4,}/.test(l) && l.trim().length > 10)
  if (doubleSpaceLines.length > 5) {
    score -= 1
    issues.push("excessive whitespace detected — possibly from multi-column layouts")
  }

  // Check for URLs that are too long (can break ATS parsing)
  const longUrls = text.match(/https?:\/\/\S{80,}/g) || []
  if (longUrls.length > 0) {
    score -= 1
    issues.push("very long URLs detected — use shortened or hyperlinked versions")
  }

  score = Math.max(0, score)
  const status = score >= 3 ? "pass" : score >= 2 ? "warning" : "fail"

  return {
    name: "Parse Compatibility",
    score,
    maxScore,
    status,
    feedback: issues.length === 0
      ? "No parsing issues detected — file should process cleanly across ATS platforms."
      : `Potential issues: ${issues.join("; ")}.`,
  }
}

// ─── Main Export ─────────────────────────────────────────────────
export function analyzeATS(text: string): ATSAnalysisResult {
  const checks = [
    checkContactInfo(text),        // 10
    checkTextExtractability(text),  // 6
    checkSectionHeaders(text),      // 10
    checkDateFormatting(text),      // 7
    checkBulletPoints(text),        // 7
    checkActionVerbs(text),         // 7
    checkLength(text),              // 5
    checkSkillsSection(text),       // 8
    checkEducation(text),           // 6
    checkQuantifiableAchievements(text), // 10
    checkProfessionalEmail(text),   // 3
    checkFormattingIssues(text),    // 7
    checkWeakLanguage(text),        // 5
    checkConsistency(text),         // 5
    checkParseCompatibility(text),  // 4
  ]
  // Max possible raw = 100

  const rawScore = checks.reduce((sum, c) => sum + c.score, 0)

  // Hard cap at 95 — no resume is perfect
  const totalScore = Math.min(95, rawScore)

  const passCount = checks.filter((c) => c.status === "pass").length
  const failCount = checks.filter((c) => c.status === "fail").length
  const warningCount = checks.filter((c) => c.status === "warning").length

  let summary: string
  if (totalScore >= 85) {
    summary = `Strong resume — ${passCount} of ${checks.length} checks passed. Focus on the remaining ${warningCount + failCount} item(s) to further optimize for ATS.`
  } else if (totalScore >= 70) {
    summary = `Good ATS compatibility (${passCount} checks passed). Address the ${failCount} failing and ${warningCount} warning item(s) below to stand out.`
  } else if (totalScore >= 50) {
    summary = `Below average — ${failCount} checks failed. Your resume may be filtered out by ATS before a recruiter sees it. Fix the red items first.`
  } else {
    summary = `Needs major work — ${failCount} checks failed. Most ATS systems will struggle to parse this resume. Rebuild with standard sections, formatting, and keywords.`
  }

  return {
    score: totalScore,
    breakdown: checks,
    summary,
  }
}
