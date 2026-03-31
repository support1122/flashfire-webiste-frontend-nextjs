import { ACTION_VERBS, ROLE_FAMILY_KEYWORDS, SKILL_SIGNALS } from "@/src/utils/resumeSignalData"

export interface MatchDimension {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

export interface MatchKeywordSignal {
  term: string
  importance: "high" | "medium"
  matched: boolean
  source: "skill" | "requirement" | "phrase"
}

export interface ResumeMatchInsights {
  jobTitle: string
  seniority: string
  workMode: string
  roleFamily: string
  detectedRequirements: string[]
}

export interface ResumeMatchResult {
  matchScore: number
  breakdown: MatchDimension[]
  missingKeywords: string[]
  matchedKeywords: string[]
  missingSkills: string[]
  matchedSkills: string[]
  keywordSignals: MatchKeywordSignal[]
  recommendations: string[]
  insights: ResumeMatchInsights
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "was", "are", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "must", "that",
  "this", "these", "those", "you", "your", "our", "their", "they", "them",
  "what", "which", "who", "how", "when", "where", "why", "not", "as", "if",
  "then", "than", "too", "very", "about", "after", "again", "also", "any",
  "before", "between", "both", "each", "few", "into", "more", "most", "only",
  "other", "over", "same", "some", "such", "through", "under", "using",
  "work", "working", "experience", "required", "preferred", "candidate",
  "candidates", "team", "role", "job", "position", "plus",
])

function normalizeText(text: string) {
  return text.toLowerCase().replace(/[^\w\s+.#/-]/g, " ")
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items))
}

function extractUnigramsAndBigrams(text: string) {
  const normalized = normalizeText(text)
  const words = normalized.split(/\s+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word))
  const frequencies = new Map<string, number>()

  for (const word of words) {
    frequencies.set(word, (frequencies.get(word) || 0) + 1)
  }

  for (let index = 0; index < words.length - 1; index += 1) {
    const phrase = `${words[index]} ${words[index + 1]}`
    frequencies.set(phrase, (frequencies.get(phrase) || 0) + 1)
  }

  return frequencies
}

function hasTerm(text: string, term: string) {
  const normalizedText = ` ${normalizeText(text)} `
  const normalizedTerm = normalizeText(term).trim()
  return normalizedText.includes(` ${normalizedTerm} `)
}

function extractJobTitle(jobDescription: string) {
  const lines = jobDescription.split("\n").map((line) => line.trim()).filter(Boolean)
  const firstMeaningfulLine = lines.find((line) => line.length > 4) || ""
  const explicitMatch = jobDescription.match(/(?:job title|position|role)\s*[:\-]\s*([^\n]+)/i)
  if (explicitMatch?.[1]) {
    return explicitMatch[1].trim()
  }
  return firstMeaningfulLine.length <= 80 ? firstMeaningfulLine : "Target role"
}

function detectSeniority(text: string) {
  const lower = text.toLowerCase()
  if (/\b(principal|staff|head|director|lead)\b/.test(lower)) return "Lead+"
  if (/\b(senior|sr\.)\b/.test(lower)) return "Senior"
  if (/\b(junior|jr\.|entry level|associate|intern)\b/.test(lower)) return "Entry to Mid"
  return "Mid-level"
}

function detectWorkMode(text: string) {
  const lower = text.toLowerCase()
  if (/\bhybrid\b/.test(lower)) return "Hybrid"
  if (/\bremote\b/.test(lower)) return "Remote"
  if (/\bon[-\s]?site\b/.test(lower)) return "On-site"
  return "Not specified"
}

function detectRoleFamily(text: string) {
  const lower = text.toLowerCase()
  const ranked = (Object.entries(ROLE_FAMILY_KEYWORDS) as [string, string[]][])
    .map(([family, keywords]) => ({
      family,
      score: keywords.filter((keyword) => lower.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score)

  return ranked[0]?.score ? ranked[0].family : "General"
}

function extractRequirements(text: string) {
  const requirementMatches = text.match(/\b\d+\+?\s+years?\b|\b(?:bachelor|master|phd|mba)\b|\b(?:sql|python|react|aws|tableau|power bi|product management|figma|seo|salesforce)\b/gi) || []
  return unique(requirementMatches.map((item) => item.trim())).slice(0, 6)
}

function buildSkillCoverage(resumeText: string, jdText: string) {
  const matchedSkills: string[] = []
  const missingSkills: string[] = []
  const jdRelevantSkills = SKILL_SIGNALS.filter((signal) => signal.aliases.some((alias) => hasTerm(jdText, alias)))

  for (const signal of jdRelevantSkills) {
    const matched = signal.aliases.some((alias) => hasTerm(resumeText, alias))
    if (matched) matchedSkills.push(signal.canonical)
    else missingSkills.push(signal.canonical)
  }

  return {
    matchedSkills: unique<string>(matchedSkills),
    missingSkills: unique<string>(missingSkills),
    relevantSkills: unique<string>(jdRelevantSkills.map((signal) => signal.canonical)),
  }
}

function buildKeywordSignals(resumeText: string, jdText: string, missingSkills: string[], matchedSkills: string[]) {
  const frequencies = extractUnigramsAndBigrams(jdText)
  const rankedTerms = Array.from(frequencies.entries())
    .filter(([term, count]) => count >= 2 || term.split(" ").length > 1)
    .filter(([term]) => term.length >= 4)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)

  const signals: MatchKeywordSignal[] = []
  const seen = new Set<string>()

  for (const [term, count] of rankedTerms) {
    if (STOP_WORDS.has(term)) continue
    if (seen.has(term)) continue
    seen.add(term)
    signals.push({
      term,
      importance: count >= 3 ? "high" : "medium",
      matched: hasTerm(resumeText, term),
      source: term.split(" ").length > 1 ? "phrase" : "requirement",
    })
  }

  for (const skill of unique([...matchedSkills, ...missingSkills])) {
    if (seen.has(skill)) continue
    seen.add(skill)
    signals.push({
      term: skill,
      importance: "high",
      matched: matchedSkills.includes(skill),
      source: "skill",
    })
  }

  return signals.slice(0, 24)
}

function scoreKeywordAlignment(signals: MatchKeywordSignal[]): MatchDimension {
  const maxScore = 25
  const totalWeight = signals.reduce((sum, signal) => sum + (signal.importance === "high" ? 2 : 1), 0)
  const matchedWeight = signals.reduce((sum, signal) => {
    if (!signal.matched) return sum
    return sum + (signal.importance === "high" ? 2 : 1)
  }, 0)
  const ratio = totalWeight === 0 ? 1 : matchedWeight / totalWeight
  const score = Math.round(ratio * maxScore)

  return {
    name: "Keyword Alignment",
    score,
    maxScore,
    status: ratio >= 0.7 ? "pass" : ratio >= 0.45 ? "warning" : "fail",
    feedback: `${Math.round(ratio * 100)}% of the high-signal requirements and phrases from the job description appear in the resume.`,
  }
}

function scoreSkillsCoverage(matchedSkills: string[], missingSkills: string[], relevantSkills: string[]): MatchDimension {
  const maxScore = 20
  const ratio = relevantSkills.length === 0 ? 1 : matchedSkills.length / relevantSkills.length
  const score = Math.round(ratio * maxScore)

  return {
    name: "Skills Coverage",
    score,
    maxScore,
    status: ratio >= 0.7 ? "pass" : ratio >= 0.4 ? "warning" : "fail",
    feedback: relevantSkills.length === 0
      ? "No standard skill signals were detected in the job description."
      : `${matchedSkills.length} of ${relevantSkills.length} relevant skills were found in the resume.`,
  }
}

function extractYears(text: string) {
  const matches = text.match(/(\d+)\+?\s+years?/gi) || []
  return matches.map((match) => Number.parseInt(match, 10)).filter((value) => Number.isFinite(value))
}

function scoreExperienceAlignment(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 15
  const requiredYears = Math.max(0, ...extractYears(jdText))
  const declaredYears = Math.max(0, ...extractYears(resumeText))
  const rangeMatches = resumeText.match(/\b(19|20)\d{2}\s*[-–—]\s*((19|20)\d{2}|present|current)\b/gi) || []

  let estimatedYears = declaredYears
  for (const range of rangeMatches) {
    const years = range.match(/\d{4}/g)
    if (!years?.[0]) continue
    const start = Number.parseInt(years[0], 10)
    const end = years[1] ? Number.parseInt(years[1], 10) : new Date().getFullYear()
    estimatedYears = Math.max(estimatedYears, Math.max(0, end - start))
  }

  if (requiredYears === 0) {
    return {
      name: "Experience Fit",
      score: 12,
      maxScore,
      status: "pass",
      feedback: "No explicit years-of-experience threshold was detected.",
    }
  }

  if (estimatedYears >= requiredYears) {
    return {
      name: "Experience Fit",
      score: 15,
      maxScore,
      status: "pass",
      feedback: `The resume appears to meet the ${requiredYears}+ year experience expectation.`,
    }
  }

  if (estimatedYears >= requiredYears * 0.7) {
    return {
      name: "Experience Fit",
      score: 10,
      maxScore,
      status: "warning",
      feedback: `Experience appears close to the ${requiredYears}+ year requirement but may need stronger framing.`,
    }
  }

  return {
    name: "Experience Fit",
    score: 5,
    maxScore,
    status: "fail",
    feedback: `Experience appears below the ${requiredYears}+ year requirement stated in the job description.`,
  }
}

function scoreEducationAlignment(resumeText: string, jdText: string): MatchDimension {
  const maxScore = 10
  const lowerResume = resumeText.toLowerCase()
  const lowerJd = jdText.toLowerCase()
  const degreeOrder = ["associate", "bachelor", "master", "phd"]

  const jdRequirement = degreeOrder.findIndex((degree) => lowerJd.includes(degree))
  const resumeDegree = degreeOrder.findIndex((degree) => lowerResume.includes(degree))

  if (jdRequirement === -1) {
    return {
      name: "Education Fit",
      score: 8,
      maxScore,
      status: "pass",
      feedback: "No specific degree requirement was detected in the job description.",
    }
  }

  if (resumeDegree >= jdRequirement) {
    return {
      name: "Education Fit",
      score: 10,
      maxScore,
      status: "pass",
      feedback: "Education level appears to meet the stated requirement.",
    }
  }

  if (resumeDegree === jdRequirement - 1) {
    return {
      name: "Education Fit",
      score: 6,
      maxScore,
      status: "warning",
      feedback: "Education level is close but may need support from certifications or equivalent experience.",
    }
  }

  return {
    name: "Education Fit",
    score: 2,
    maxScore,
    status: "fail",
    feedback: "Education requirements appear underrepresented in the resume.",
  }
}

function scoreTitleAndRoleAlignment(resumeText: string, insights: ResumeMatchInsights): MatchDimension {
  const maxScore = 10
  const tokens = insights.jobTitle.toLowerCase().split(/\s+/).filter((token) => token.length > 3)
  const matchedTokens = tokens.filter((token) => hasTerm(resumeText, token))
  const roleFamilyMatched = insights.roleFamily !== "General" && hasTerm(resumeText, insights.roleFamily.toLowerCase().split("&")[0].trim())
  const ratio = tokens.length === 0 ? 0.5 : matchedTokens.length / tokens.length

  let score = 2
  if (ratio >= 0.7 || roleFamilyMatched) score = 10
  else if (ratio >= 0.4) score = 7
  else if (ratio >= 0.2) score = 5

  return {
    name: "Role Alignment",
    score,
    maxScore,
    status: score >= 8 ? "pass" : score >= 5 ? "warning" : "fail",
    feedback: score >= 8
      ? "Resume language aligns well with the target role and title."
      : "Add the target title, adjacent titles, or clearer role framing in the summary and experience sections.",
  }
}

function scoreImpactAndVerbStrength(resumeText: string): MatchDimension {
  const maxScore = 10
  const lower = resumeText.toLowerCase()
  const verbCount = ACTION_VERBS.filter((verb) => lower.includes(verb)).length
  const metricsCount = (resumeText.match(/\d+\s*%|\$[\d,]+(?:\.\d+)?|\b\d+\+?\s+(?:users?|customers?|projects?|revenue|arr|team members?|stakeholders?)\b/gi) || []).length

  let score = 2
  if (verbCount >= 10 && metricsCount >= 6) score = 10
  else if (verbCount >= 7 && metricsCount >= 4) score = 8
  else if (verbCount >= 4 && metricsCount >= 2) score = 6
  else if (verbCount >= 3 || metricsCount >= 1) score = 4

  return {
    name: "Impact Evidence",
    score,
    maxScore,
    status: score >= 8 ? "pass" : score >= 5 ? "warning" : "fail",
    feedback: `${verbCount} strong action verbs and ${metricsCount} measurable outcomes were detected in the resume.`,
  }
}

function scoreRequirementsCoverage(signals: MatchKeywordSignal[]): MatchDimension {
  const maxScore = 10
  const highSignals = signals.filter((signal) => signal.importance === "high")
  const matchedHighSignals = highSignals.filter((signal) => signal.matched)
  const ratio = highSignals.length === 0 ? 1 : matchedHighSignals.length / highSignals.length
  const score = Math.round(ratio * maxScore)

  return {
    name: "Critical Requirements",
    score,
    maxScore,
    status: ratio >= 0.7 ? "pass" : ratio >= 0.45 ? "warning" : "fail",
    feedback: `${matchedHighSignals.length} of ${highSignals.length || 0} high-priority requirements are covered.`,
  }
}

function generateRecommendations(
  insights: ResumeMatchInsights,
  missingSkills: string[],
  missingKeywords: string[],
  breakdown: MatchDimension[],
) {
  const recommendations: string[] = []

  if (missingSkills.length > 0) {
    recommendations.push(`Add or strengthen these missing skills where accurate: ${missingSkills.slice(0, 5).join(", ")}.`)
  }

  if (missingKeywords.length > 0) {
    recommendations.push(`Mirror the job description language more directly with terms such as ${missingKeywords.slice(0, 5).join(", ")}.`)
  }

  const failingAreas = breakdown.filter((dimension) => dimension.status === "fail").map((dimension) => dimension.name)
  if (failingAreas.includes("Experience Fit")) {
    recommendations.push("Reframe relevant work, freelance projects, internships, and scope of ownership to better match the experience requirement.")
  }
  if (failingAreas.includes("Role Alignment")) {
    recommendations.push(`Use the target role framing '${insights.jobTitle}' or adjacent titles in your summary and most relevant experience bullets.`)
  }
  if (failingAreas.includes("Impact Evidence")) {
    recommendations.push("Rewrite weak bullets into result-oriented statements with scale, speed, revenue, quality, or efficiency metrics.")
  }
  if (failingAreas.includes("Critical Requirements")) {
    recommendations.push("Move the most relevant requirements higher in the resume so scanners and recruiters see them in the first screen.")
  }

  return unique(recommendations).slice(0, 6)
}

export function analyzeMatch(resumeText: string, jobDescription: string): ResumeMatchResult {
  const insights: ResumeMatchInsights = {
    jobTitle: extractJobTitle(jobDescription),
    seniority: detectSeniority(jobDescription),
    workMode: detectWorkMode(jobDescription),
    roleFamily: detectRoleFamily(jobDescription),
    detectedRequirements: extractRequirements(jobDescription),
  }

  const { matchedSkills, missingSkills, relevantSkills } = buildSkillCoverage(resumeText, jobDescription)
  const keywordSignals = buildKeywordSignals(resumeText, jobDescription, missingSkills, matchedSkills)

  const breakdown: MatchDimension[] = [
    scoreKeywordAlignment(keywordSignals),
    scoreSkillsCoverage(matchedSkills, missingSkills, relevantSkills),
    scoreExperienceAlignment(resumeText, jobDescription),
    scoreEducationAlignment(resumeText, jobDescription),
    scoreTitleAndRoleAlignment(resumeText, insights),
    scoreImpactAndVerbStrength(resumeText),
    scoreRequirementsCoverage(keywordSignals),
  ]

  const matchScore = breakdown.reduce((sum, dimension) => sum + dimension.score, 0)
  const matchedKeywords = keywordSignals.filter((signal) => signal.matched).map((signal) => signal.term)
  const missingKeywords = keywordSignals.filter((signal) => !signal.matched).map((signal) => signal.term)
  const recommendations = generateRecommendations(insights, missingSkills, missingKeywords, breakdown)

  return {
    matchScore,
    breakdown,
    missingKeywords: unique(missingKeywords).slice(0, 16),
    matchedKeywords: unique(matchedKeywords).slice(0, 16),
    missingSkills,
    matchedSkills,
    keywordSignals,
    recommendations,
    insights,
  }
}
