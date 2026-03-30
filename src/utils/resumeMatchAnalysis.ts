// Resume Match Analysis Engine — 7 dimensions totaling 100 points

export interface MatchDimension {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

export interface ResumeMatchResult {
  matchScore: number
  breakdown: MatchDimension[]
  missingKeywords: string[]
  recommendations: string[]
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "was", "are", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "need", "must",
  "that", "this", "these", "those", "i", "me", "my", "we", "our", "you",
  "your", "he", "him", "his", "she", "her", "it", "its", "they", "them",
  "their", "what", "which", "who", "whom", "how", "when", "where", "why",
  "not", "no", "nor", "as", "if", "then", "than", "too", "very", "just",
  "about", "above", "after", "again", "all", "also", "am", "any", "because",
  "before", "between", "both", "each", "few", "get", "got", "here", "into",
  "more", "most", "new", "now", "only", "other", "out", "over", "own",
  "same", "so", "some", "such", "there", "through", "under", "up", "us",
  "able", "across", "already", "among", "another", "around", "back",
  "become", "best", "better", "big", "come", "day", "different", "down",
  "end", "even", "every", "first", "give", "good", "great", "high",
  "include", "including", "keep", "know", "large", "last", "left", "life",
  "like", "line", "long", "look", "make", "many", "much", "next", "number",
  "off", "often", "old", "one", "part", "place", "point", "right", "see",
  "set", "show", "side", "small", "start", "still", "take", "thing",
  "think", "three", "time", "turn", "two", "use", "used", "using", "want",
  "way", "well", "work", "working", "world", "year", "years",
])

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
  "automation", "scripting", "web scraping", "beautiful soup", "selenium",
]

const ACTION_VERBS = [
  "achieved", "administered", "analyzed", "built", "collaborated", "created",
  "delivered", "designed", "developed", "directed", "drove", "enabled",
  "engineered", "established", "executed", "expanded", "facilitated",
  "generated", "guided", "implemented", "improved", "increased", "initiated",
  "launched", "led", "managed", "mentored", "negotiated", "optimized",
  "orchestrated", "organized", "pioneered", "planned", "produced",
  "reduced", "researched", "resolved", "spearheaded", "streamlined",
  "supervised", "trained", "transformed",
]

function extractKeywords(text: string): Map<string, number> {
  const words = text.toLowerCase().split(/[\s,;:.!?()\[\]{}"'\/\\]+/)
  const freq = new Map<string, number>()

  for (const word of words) {
    const clean = word.replace(/[^a-z0-9+#.-]/g, "")
    if (clean.length > 2 && !STOP_WORDS.has(clean)) {
      freq.set(clean, (freq.get(clean) || 0) + 1)
    }
  }

  // Also extract 2-word phrases
  const lower = text.toLowerCase()
  const twoWordPhrases = lower.match(/[a-z]+\s+[a-z]+/g) || []
  for (const phrase of twoWordPhrases) {
    const words = phrase.split(/\s+/)
    if (words.every((w) => w.length > 2 && !STOP_WORDS.has(w))) {
      freq.set(phrase, (freq.get(phrase) || 0) + 1)
    }
  }

  return freq
}

function checkKeywordMatch(resumeText: string, jdText: string): { dimension: MatchDimension; missingKeywords: string[] } {
  const maxScore = 25
  const jdKeywords = extractKeywords(jdText)
  const resumeLower = resumeText.toLowerCase()

  // Get top JD keywords by frequency (most important ones)
  const sortedJdKeywords = Array.from(jdKeywords.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)

  let matched = 0
  const missing: string[] = []

  for (const [keyword] of sortedJdKeywords) {
    if (resumeLower.includes(keyword)) {
      matched++
    } else {
      missing.push(keyword)
    }
  }

  const total = sortedJdKeywords.length
  const ratio = total > 0 ? matched / total : 0
  const score = Math.round(ratio * maxScore)
  const status = ratio >= 0.6 ? "pass" : ratio >= 0.35 ? "warning" : "fail"

  return {
    dimension: {
      name: "Keyword Match",
      score,
      maxScore,
      status,
      feedback: `${matched} of ${total} key terms from the job description found in your resume (${Math.round(ratio * 100)}% match).`,
    },
    missingKeywords: missing.slice(0, 15),
  }
}

function checkSkillsGap(resumeText: string, jdText: string): { dimension: MatchDimension; matchedSkills: string[]; missingSkills: string[] } {
  const maxScore = 20
  const jdLower = jdText.toLowerCase()
  const resumeLower = resumeText.toLowerCase()

  const jdSkills: string[] = []
  for (const skill of COMMON_SKILLS) {
    if (jdLower.includes(skill.toLowerCase())) {
      jdSkills.push(skill)
    }
  }

  const matchedSkills: string[] = []
  const missingSkills: string[] = []

  for (const skill of jdSkills) {
    if (resumeLower.includes(skill.toLowerCase())) {
      matchedSkills.push(skill)
    } else {
      missingSkills.push(skill)
    }
  }

  const total = jdSkills.length
  const ratio = total > 0 ? matchedSkills.length / total : 1
  const score = Math.round(ratio * maxScore)
  const status = ratio >= 0.7 ? "pass" : ratio >= 0.4 ? "warning" : "fail"

  return {
    dimension: {
      name: "Skills Gap",
      score,
      maxScore,
      status,
      feedback: total === 0
        ? "No standard skills detected in the job description."
        : `${matchedSkills.length} of ${total} required skills found in your resume.`,
    },
    matchedSkills,
    missingSkills,
  }
}

function checkExperienceLevel(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 15

  const extractYears = (text: string): number[] => {
    const years: number[] = []
    const patterns = [
      /(\d+)\+?\s*years?\s*(?:of)?\s*experience/gi,
      /(\d+)\+?\s*years?\s*(?:of)?\s*(?:professional|relevant|industry)/gi,
    ]
    for (const pattern of patterns) {
      let match
      while ((match = pattern.exec(text)) !== null) {
        years.push(parseInt(match[1]))
      }
    }
    return years
  }

  const jdYears = extractYears(jdText)
  const resumeYears = extractYears(resumeText)

  // Also estimate from date ranges in resume
  const dateRanges = resumeText.match(/\b(20\d{2}|19\d{2})\s*[-–—]\s*(?:(20\d{2}|19\d{2})|present|current)\b/gi) || []
  let estimatedExperience = 0
  for (const range of dateRanges) {
    const years = range.match(/\d{4}/g)
    if (years && years.length >= 2) {
      estimatedExperience += parseInt(years[1]) - parseInt(years[0])
    } else if (years && /present|current/i.test(range)) {
      estimatedExperience += new Date().getFullYear() - parseInt(years[0])
    }
  }

  const requiredYears = jdYears.length > 0 ? Math.max(...jdYears) : 0
  const candidateYears = resumeYears.length > 0 ? Math.max(...resumeYears) : estimatedExperience

  let score: number
  let status: "pass" | "warning" | "fail"
  let feedback: string

  if (requiredYears === 0) {
    score = 12
    status = "pass"
    feedback = "No specific experience requirement detected in job description."
  } else if (candidateYears >= requiredYears) {
    score = 15
    status = "pass"
    feedback = `Your experience (~${candidateYears} years) meets or exceeds the ${requiredYears}+ year requirement.`
  } else if (candidateYears >= requiredYears * 0.7) {
    score = 10
    status = "warning"
    feedback = `Your experience (~${candidateYears} years) is close to the ${requiredYears}+ year requirement.`
  } else {
    score = 5
    status = "fail"
    feedback = `Your experience (~${candidateYears} years) is below the ${requiredYears}+ year requirement.`
  }

  return { name: "Experience Level", score, maxScore, status, feedback }
}

function checkEducationMatch(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 10
  const jdLower = jdText.toLowerCase()
  const resumeLower = resumeText.toLowerCase()

  const degreeHierarchy = [
    { level: 4, patterns: ["phd", "doctorate", "doctoral"] },
    { level: 3, patterns: ["master", "m.s.", "m.a.", "mba", "m.tech", "m.e."] },
    { level: 2, patterns: ["bachelor", "b.s.", "b.a.", "b.tech", "b.e.", "undergraduate"] },
    { level: 1, patterns: ["associate", "diploma", "certificate"] },
  ]

  let jdLevel = 0
  let resumeLevel = 0

  for (const { level, patterns } of degreeHierarchy) {
    for (const p of patterns) {
      if (jdLower.includes(p) && level > jdLevel) jdLevel = level
      if (resumeLower.includes(p) && level > resumeLevel) resumeLevel = level
    }
  }

  let score: number
  let status: "pass" | "warning" | "fail"

  if (jdLevel === 0) {
    score = 8
    status = "pass"
    return { name: "Education Match", score, maxScore, status, feedback: "No specific education requirement detected in job description." }
  }

  if (resumeLevel >= jdLevel) {
    score = 10
    status = "pass"
  } else if (resumeLevel >= jdLevel - 1) {
    score = 6
    status = "warning"
  } else {
    score = 2
    status = "fail"
  }

  return {
    name: "Education Match",
    score,
    maxScore,
    status,
    feedback: resumeLevel >= jdLevel
      ? "Your education level meets the job requirements."
      : "Your education level may not fully match the requirements. Consider highlighting relevant certifications or coursework.",
  }
}

function checkTitleAlignment(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 10
  const jdLower = jdText.toLowerCase()
  const resumeLower = resumeText.toLowerCase()

  // Extract potential job titles from JD (usually in first few lines)
  const jdFirstLines = jdLower.split("\n").slice(0, 5).join(" ")
  const titlePatterns = [
    /(?:job\s+title|position|role)[:\s]*([\w\s]+)/i,
    /^([\w\s]+(?:engineer|developer|manager|analyst|designer|architect|lead|director|specialist|coordinator|consultant|administrator))/im,
  ]

  let jdTitle = ""
  for (const pattern of titlePatterns) {
    const match = jdFirstLines.match(pattern)
    if (match) {
      jdTitle = match[1].trim()
      break
    }
  }

  if (!jdTitle) {
    // Try to extract from common title words in JD
    const titleWords = ["engineer", "developer", "manager", "analyst", "designer",
      "architect", "lead", "director", "specialist", "coordinator", "consultant",
      "senior", "junior", "staff", "principal", "associate", "intern"]
    const jdWords = jdLower.split(/\s+/)
    const foundTitleWords = titleWords.filter((w) => jdWords.includes(w))
    if (foundTitleWords.length > 0) {
      jdTitle = foundTitleWords.join(" ")
    }
  }

  if (!jdTitle) {
    return {
      name: "Title Alignment",
      score: 7,
      maxScore,
      status: "pass",
      feedback: "Could not detect a specific job title in the description.",
    }
  }

  const titleWords = jdTitle.split(/\s+/).filter((w) => w.length > 3)
  const matchedWords = titleWords.filter((w) => resumeLower.includes(w))
  const ratio = titleWords.length > 0 ? matchedWords.length / titleWords.length : 0

  let score: number
  if (ratio >= 0.5) score = 10
  else if (ratio >= 0.25) score = 6
  else score = 2

  const status = score >= 7 ? "pass" : score >= 5 ? "warning" : "fail"

  return {
    name: "Title Alignment",
    score,
    maxScore,
    status,
    feedback: ratio >= 0.5
      ? "Your resume contains relevant job title keywords from the description."
      : "Consider incorporating the target job title or similar titles in your resume summary or experience sections.",
  }
}

function checkActionVerbStrength(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 10
  const resumeLower = resumeText.toLowerCase()
  const jdLower = jdText.toLowerCase()

  // Find action verbs in JD
  const jdVerbs = ACTION_VERBS.filter((v) => jdLower.includes(v))
  const resumeVerbs = ACTION_VERBS.filter((v) => resumeLower.includes(v))

  // Check overlap
  const jdVerbSet = new Set(jdVerbs)
  const matchedVerbs = resumeVerbs.filter((v) => jdVerbSet.has(v))

  const totalResumeVerbs = resumeVerbs.length
  let score: number

  if (totalResumeVerbs >= 8 && matchedVerbs.length >= 3) score = 10
  else if (totalResumeVerbs >= 5) score = 7
  else if (totalResumeVerbs >= 2) score = 4
  else score = 1

  const status = score >= 7 ? "pass" : score >= 4 ? "warning" : "fail"

  return {
    name: "Action Verb Strength",
    score,
    maxScore,
    status,
    feedback: totalResumeVerbs >= 5
      ? `${totalResumeVerbs} strong action verbs found, ${matchedVerbs.length} matching the job description.`
      : `Only ${totalResumeVerbs} action verb(s) found. Use more impactful verbs that match the job description.`,
  }
}

function checkIndustryTerminology(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 10
  const jdKeywords = extractKeywords(jdText)
  const resumeLower = resumeText.toLowerCase()

  // Focus on multi-frequency JD terms (repeated = important)
  const importantTerms = Array.from(jdKeywords.entries())
    .filter(([, count]) => count >= 2)
    .map(([term]) => term)
    .slice(0, 20)

  if (importantTerms.length === 0) {
    return {
      name: "Industry Terminology",
      score: 7,
      maxScore,
      status: "pass",
      feedback: "No heavily repeated industry terms detected in the job description.",
    }
  }

  const matched = importantTerms.filter((term) => resumeLower.includes(term))
  const ratio = matched.length / importantTerms.length

  const score = Math.round(ratio * maxScore)
  const status = ratio >= 0.5 ? "pass" : ratio >= 0.3 ? "warning" : "fail"

  return {
    name: "Industry Terminology",
    score,
    maxScore,
    status,
    feedback: `${matched.length} of ${importantTerms.length} key industry terms from the job description appear in your resume.`,
  }
}

function generateRecommendations(
  keywordResult: { missingKeywords: string[] },
  skillsResult: { missingSkills: string[] },
  breakdown: MatchDimension[],
  matchScore: number,
): string[] {
  const recs: string[] = []

  // Skills gap recommendations
  if (skillsResult.missingSkills.length > 0) {
    const top = skillsResult.missingSkills.slice(0, 5).join(", ")
    recs.push(`Add these missing skills to your resume: ${top}`)
  }

  // Missing keywords
  if (keywordResult.missingKeywords.length > 0) {
    const top = keywordResult.missingKeywords.slice(0, 5).join(", ")
    recs.push(`Incorporate these job description keywords naturally into your experience: ${top}`)
  }

  // Dimension-specific recommendations
  for (const dim of breakdown) {
    if (dim.status === "fail") {
      switch (dim.name) {
        case "Experience Level":
          recs.push("Highlight all relevant experience including projects, freelance work, and volunteer roles to bridge the experience gap.")
          break
        case "Education Match":
          recs.push("Consider adding relevant certifications, online courses, or bootcamp completions to strengthen your education section.")
          break
        case "Title Alignment":
          recs.push("Add the target job title to your resume summary or objective to improve title alignment.")
          break
        case "Action Verb Strength":
          recs.push("Replace passive descriptions with strong action verbs like 'spearheaded', 'implemented', 'optimized', and 'delivered'.")
          break
        case "Industry Terminology":
          recs.push("Mirror the language and terminology used in the job description throughout your resume.")
          break
      }
    }
  }

  if (matchScore < 50) {
    recs.push("Consider tailoring your resume specifically for this role — a targeted resume significantly outperforms a generic one.")
  }

  return recs.slice(0, 7)
}

export function analyzeMatch(resumeText: string, jobDescription: string): ResumeMatchResult {
  const keywordResult = checkKeywordMatch(resumeText, jobDescription)
  const skillsResult = checkSkillsGap(resumeText, jobDescription)

  const breakdown: MatchDimension[] = [
    keywordResult.dimension,
    skillsResult.dimension,
    checkExperienceLevel(resumeText, jobDescription),
    checkEducationMatch(resumeText, jobDescription),
    checkTitleAlignment(resumeText, jobDescription),
    checkActionVerbStrength(resumeText, jobDescription),
    checkIndustryTerminology(resumeText, jobDescription),
  ]

  const matchScore = breakdown.reduce((sum, d) => sum + d.score, 0)

  const allMissing = [
    ...keywordResult.missingKeywords,
    ...skillsResult.missingSkills.filter((s) => !keywordResult.missingKeywords.includes(s)),
  ].slice(0, 20)

  const recommendations = generateRecommendations(keywordResult, skillsResult, breakdown, matchScore)

  return {
    matchScore,
    breakdown,
    missingKeywords: allMissing,
    recommendations,
  }
}
