import { ACTION_VERBS, BUZZWORDS, COMMON_SKILLS, WEAK_WORDS } from "@/src/utils/resumeSignalData"

export interface ATSCheckResult {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

export interface ATSOverviewMetrics {
  wordCount: number
  bulletCount: number
  sectionCount: number
  actionVerbCount: number
  measurableResults: number
}

export interface ATSAnalysisResult {
  score: number
  breakdown: ATSCheckResult[]
  summary: string
  strengths: string[]
  priorities: string[]
  metrics: ATSOverviewMetrics
}

const SECTION_PATTERNS: Record<string, RegExp> = {
  Summary: /(?:^|\n)\s*(?:summary|profile|objective|professional summary|career summary)\b/im,
  Experience: /(?:^|\n)\s*(?:experience|work history|employment|professional experience|work experience)\b/im,
  Education: /(?:^|\n)\s*(?:education|academic|qualifications)\b/im,
  Skills: /(?:^|\n)\s*(?:skills|technical skills|core competencies|proficiencies|areas of expertise)\b/im,
  Projects: /(?:^|\n)\s*(?:projects|personal projects|key projects|portfolio)\b/im,
  Certifications: /(?:^|\n)\s*(?:certifications|licenses)\b/im,
}

const DATE_PATTERNS = [
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\b/gi,
  /\b\d{1,2}\/\d{4}\b/g,
  /\b(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|present|current)\b/gi,
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\s*[-–—]\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|present|current)\b/gi,
]

function getLines(text: string) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean)
}

function getBulletLines(text: string) {
  return getLines(text).filter((line) => /^[•●○◦▪▸►\-–—*]\s|^\d+[.)]\s/.test(line))
}

function getSectionCount(text: string) {
  return Object.values(SECTION_PATTERNS).filter((pattern) => pattern.test(text)).length
}

function getMetrics(text: string): ATSOverviewMetrics {
  const words = text.split(/\s+/).filter(Boolean)
  const bullets = getBulletLines(text)
  const lower = text.toLowerCase()
  const measurableResults = (text.match(/\d+\s*%|\$[\d,]+(?:\.\d+)?|\b\d+\+?\s+(?:users?|customers?|projects?|team members?|stakeholders?|hours?|years?)\b/gi) || []).length
  const actionVerbCount = ACTION_VERBS.filter((verb) => lower.includes(verb)).length

  return {
    wordCount: words.length,
    bulletCount: bullets.length,
    sectionCount: getSectionCount(text),
    actionVerbCount,
    measurableResults,
  }
}

function scoreStatus(score: number, maxScore: number): "pass" | "warning" | "fail" {
  const ratio = maxScore === 0 ? 0 : score / maxScore
  if (ratio >= 0.75) return "pass"
  if (ratio >= 0.45) return "warning"
  return "fail"
}

function checkContactInfo(text: string): ATSCheckResult {
  const maxScore = 10
  let score = 0
  const lower = text.toLowerCase()

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text)
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
  const hasLinkedin = /linkedin\.com\/in\/[a-z0-9_-]+/i.test(lower)
  const hasLocation =
    /\b[A-Z][a-z]+,\s*[A-Z]{2}\b/.test(text) ||
    /\b\d{5}(?:-\d{4})?\b/.test(text) ||
    /\b(?:remote|hybrid|relocate|relocation)\b/i.test(text)

  if (hasEmail) score += 3
  if (hasPhone) score += 3
  if (hasLinkedin) score += 2
  if (hasLocation) score += 2

  const missing: string[] = []
  if (!hasEmail) missing.push("email")
  if (!hasPhone) missing.push("phone")
  if (!hasLinkedin) missing.push("LinkedIn")
  if (!hasLocation) missing.push("location")

  return {
    name: "Contact Information",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: missing.length === 0
      ? "Email, phone, LinkedIn, and location were all detected."
      : `Missing ${missing.join(", ")}. ATS systems need complete identity and contact signals.`,
  }
}

function checkTextExtractability(text: string): ATSCheckResult {
  const maxScore = 6
  const nonWhitespaceChars = text.replace(/\s/g, "").length
  const lineCount = getLines(text).length

  let score = 0
  if (nonWhitespaceChars > 1800 && lineCount > 30) score = 6
  else if (nonWhitespaceChars > 900 && lineCount > 18) score = 5
  else if (nonWhitespaceChars > 450 && lineCount > 10) score = 3
  else if (nonWhitespaceChars > 150) score = 2

  return {
    name: "Text Extractability",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: score >= 5
      ? `${nonWhitespaceChars} readable characters extracted across ${lineCount} lines.`
      : "Text extraction looks weak. The PDF may rely on images, columns, or visual layout that ATS parsers skip.",
  }
}

function checkSectionHeaders(text: string): ATSCheckResult {
  const maxScore = 10
  const present = Object.entries(SECTION_PATTERNS).filter(([, pattern]) => pattern.test(text)).map(([name]) => name)
  const coreSections = ["Summary", "Experience", "Education", "Skills"]
  const coreCount = coreSections.filter((name) => present.includes(name)).length
  const bonus = present.includes("Projects") ? 1 : 0
  const certBonus = present.includes("Certifications") ? 1 : 0
  const score = Math.min(maxScore, coreCount * 2 + bonus + certBonus)
  const missing = coreSections.filter((name) => !present.includes(name))

  return {
    name: "Section Headers",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: missing.length === 0
      ? `Core resume structure is present: ${present.join(", ")}.`
      : `Detected ${present.join(", ") || "no standard headers"}. Add ${missing.join(", ")} using standard ATS-friendly labels.`,
  }
}

function checkDateFormatting(text: string): ATSCheckResult {
  const maxScore = 7
  const counts = DATE_PATTERNS.map((pattern) => (text.match(pattern) || []).length)
  const totalDates = counts.reduce((sum, count) => sum + count, 0)
  const activeFormats = counts.filter((count) => count > 0).length

  let score = 0
  if (totalDates >= 6 && activeFormats <= 2) score = 7
  else if (totalDates >= 4 && activeFormats <= 2) score = 5
  else if (totalDates >= 2) score = 3
  else if (totalDates >= 1) score = 2

  return {
    name: "Date Consistency",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: totalDates === 0
      ? "No clear date ranges detected. Every role and degree should show start and end dates."
      : activeFormats > 2
        ? `${totalDates} dates found with too many format variations. Use one consistent style like 'Jan 2022 - Present'.`
        : `${totalDates} dates detected with acceptable consistency.`,
  }
}

function checkBulletPoints(text: string): ATSCheckResult {
  const maxScore = 7
  const bulletLines = getBulletLines(text)
  const bulletCount = bulletLines.length
  const averageLength = bulletCount === 0
    ? 0
    : bulletLines.reduce((sum, line) => sum + line.length, 0) / bulletCount

  let score = 0
  if (bulletCount >= 12 && averageLength >= 45 && averageLength <= 180) score = 7
  else if (bulletCount >= 8) score = 6
  else if (bulletCount >= 5) score = 4
  else if (bulletCount >= 2) score = 2

  if (bulletCount >= 5 && averageLength < 30) {
    score = Math.max(1, score - 2)
  }

  return {
    name: "Bullet Points",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: bulletCount === 0
      ? "No bullet points detected. Structured bullets improve ATS parsing and recruiter scanning."
      : averageLength < 30
        ? `${bulletCount} bullets detected, but they are too short to explain impact.`
        : `${bulletCount} bullets detected with usable detail.`,
  }
}

function checkActionVerbs(text: string): ATSCheckResult {
  const maxScore = 7
  const bulletLines = getBulletLines(text)
  const candidateLines = bulletLines.length > 0 ? bulletLines : getLines(text)
  const found = new Set<string>()
  let leadingVerbBullets = 0

  for (const line of candidateLines) {
    const words = line.replace(/^[•●○◦▪▸►\-–—*\d.)\s]+/, "").toLowerCase().split(/\s+/)
    const firstWord = words[0]?.replace(/[^a-z]/g, "")

    if (firstWord && ACTION_VERBS.includes(firstWord)) {
      leadingVerbBullets += 1
    }

    for (const word of words) {
      const cleaned = word.replace(/[^a-z]/g, "")
      if (ACTION_VERBS.includes(cleaned)) {
        found.add(cleaned)
      }
    }
  }

  let score = 0
  if (found.size >= 14 && leadingVerbBullets >= 5) score = 7
  else if (found.size >= 10) score = 6
  else if (found.size >= 6) score = 4
  else if (found.size >= 3) score = 2
  else score = 1

  return {
    name: "Action Verbs",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: found.size >= 10
      ? `${found.size} unique action verbs found with ${leadingVerbBullets} bullet starts using strong verbs.`
      : `Only ${found.size} strong action verbs found. Start more bullets with direct verbs such as built, led, optimized, and delivered.`,
  }
}

function checkLength(text: string): ATSCheckResult {
  const maxScore = 5
  const wordCount = text.split(/\s+/).filter(Boolean).length

  let score = 1
  if (wordCount >= 400 && wordCount <= 800) score = 5
  else if (wordCount >= 300 && wordCount <= 950) score = 4
  else if (wordCount >= 200 && wordCount <= 1150) score = 3
  else if (wordCount >= 120) score = 2

  return {
    name: "Resume Length",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: wordCount < 200
      ? `About ${wordCount} words. The resume is too thin for most professional roles.`
      : wordCount > 1000
        ? `About ${wordCount} words. Trim repetition and low-signal content to improve scan speed.`
        : `About ${wordCount} words, which is in a healthy range for ATS and recruiter review.`,
  }
}

function checkSkillsSection(text: string): ATSCheckResult {
  const maxScore = 8
  const lower = text.toLowerCase()
  const dedicatedSectionMatch = lower.match(/(?:^|\n)\s*(?:skills|technical skills|core competencies|key skills)\s*[:\n]([\s\S]*?)(?=\n\s*(?:experience|education|projects|certifications|summary|profile)\b|$)/i)
  const searchableText = dedicatedSectionMatch?.[1] || lower

  const matchedSkills = COMMON_SKILLS.filter((skill) => searchableText.includes(skill.toLowerCase()))
  let score = 1
  if (matchedSkills.length >= 15) score = 8
  else if (matchedSkills.length >= 10) score = 7
  else if (matchedSkills.length >= 6) score = 5
  else if (matchedSkills.length >= 3) score = 3

  if (!dedicatedSectionMatch && matchedSkills.length >= 4) {
    score = Math.max(1, score - 2)
  }

  return {
    name: "Skills Section",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: dedicatedSectionMatch
      ? `${matchedSkills.length} recognizable skills found in a dedicated skills section.`
      : `${matchedSkills.length} skills detected, but they are scattered. Add a dedicated Skills section for better ATS indexing.`,
  }
}

function checkEducation(text: string): ATSCheckResult {
  const maxScore = 6
  const lower = text.toLowerCase()
  let score = 0

  const degree = /\b(bachelor|master|phd|doctorate|associate|mba|b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|b\.?tech|m\.?tech|certificate|diploma)\b/i.test(lower)
  const institution = /\b(university|college|institute|school|academy)\b/i.test(lower)
  const year = /\b(19|20)\d{2}\b/.test(text)
  const gpa = /\b(?:gpa|cgpa)\s*[:.]?\s*\d/i.test(text) || /\b\d\.\d{1,2}\s*\/\s*4\b/.test(text)

  if (degree) score += 2
  if (institution) score += 2
  if (year) score += 1
  if (gpa) score += 1

  return {
    name: "Education",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: score >= 5
      ? "Education details are complete enough for ATS parsing."
      : "Education details are incomplete. Include degree, institution, and graduation year.",
  }
}

function checkQuantifiableAchievements(text: string): ATSCheckResult {
  const maxScore = 10
  const matches = new Set(text.match(/\d+\s*%|\$[\d,]+(?:\.\d+)?(?:\s*[kmb])?|\b\d+\+?\s+(?:users?|customers?|projects?|team members?|stakeholders?|hours?|weeks?|months?|years?)\b/gi) || [])
  const count = matches.size

  let score = 0
  if (count >= 10) score = 10
  else if (count >= 7) score = 8
  else if (count >= 4) score = 6
  else if (count >= 2) score = 3
  else if (count >= 1) score = 1

  return {
    name: "Quantifiable Impact",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: count === 0
      ? "No measurable outcomes found. Add percentages, revenue, time saved, scale, or growth metrics."
      : `${count} measurable outcomes detected.`,
  }
}

function checkProfessionalEmail(text: string): ATSCheckResult {
  const maxScore = 3
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)

  if (!emailMatch) {
    return {
      name: "Professional Email",
      score: 0,
      maxScore,
      status: "fail",
      feedback: "No email address found.",
    }
  }

  const email = emailMatch[0].toLowerCase()
  const localPart = email.split("@")[0]
  const unprofessional = /\d{4,}|sexy|hot|cool|babe|dude|gamer|ninja|69|420/i.test(localPart)
  const score = unprofessional ? 1 : /^[a-z]+[._-][a-z]+/.test(localPart) ? 3 : 2

  return {
    name: "Professional Email",
    score,
    maxScore,
    status: score === 3 ? "pass" : score === 2 ? "warning" : "fail",
    feedback: unprofessional
      ? "Email format looks unprofessional. Prefer a clean first.last variation."
      : "Email format is acceptable for ATS submission.",
  }
}

function checkFormattingIssues(text: string): ATSCheckResult {
  const maxScore = 7
  let score = maxScore
  const issues: string[] = []
  const lines = getLines(text)

  if (lines.filter((line) => (line.match(/\t/g) || []).length >= 3).length > 2) {
    score -= 2
    issues.push("table or tab-heavy layout detected")
  }

  if (lines.filter((line) => line.length > 150).length > 4) {
    score -= 1
    issues.push("very long lines may indicate merged columns")
  }

  if ((text.match(/[^\w\s.,;:!?@#$%&*()\-–—/\\'"]/g) || []).length / Math.max(text.length, 1) > 0.03) {
    score -= 1
    issues.push("excessive special characters")
  }

  if ((text.match(/\bpage\s*\d+\b/gi) || []).length > 0) {
    score -= 1
    issues.push("page numbering")
  }

  if (lines.filter((line) => line.length > 15 && line === line.toUpperCase()).length > 4) {
    score -= 1
    issues.push("excessive all-caps text")
  }

  return {
    name: "Formatting & Readability",
    score: Math.max(0, score),
    maxScore,
    status: scoreStatus(Math.max(0, score), maxScore),
    feedback: issues.length === 0
      ? "Formatting looks ATS-safe with no major parsing hazards detected."
      : `Potential issues: ${issues.join(", ")}.`,
  }
}

function checkWeakLanguage(text: string): ATSCheckResult {
  const maxScore = 5
  const lower = text.toLowerCase()
  const weakHits = WEAK_WORDS.filter((phrase) => lower.includes(phrase))
  const buzzHits = BUZZWORDS.filter((phrase) => lower.includes(phrase))
  const totalHits = weakHits.length + buzzHits.length

  let score = 5
  if (totalHits >= 8) score = 1
  else if (totalHits >= 5) score = 2
  else if (totalHits >= 3) score = 3
  else if (totalHits >= 1) score = 4

  return {
    name: "Language Strength",
    score,
    maxScore,
    status: scoreStatus(score, maxScore),
    feedback: totalHits === 0
      ? "Language is mostly direct and specific."
      : `Weak or generic phrasing detected: ${[...weakHits, ...buzzHits].slice(0, 5).join(", ")}.`,
  }
}

function checkConsistency(text: string): ATSCheckResult {
  const maxScore = 5
  let score = maxScore
  const issues: string[] = []
  const lines = getLines(text)

  const pronouns = text.match(/\b(i|my|me|myself)\b/gi) || []
  if (pronouns.length > 2) {
    score -= 1
    issues.push("first-person pronouns")
  }

  if (/references?\s*(?:available)?\s*(?:upon|on)\s*request/i.test(text)) {
    score -= 1
    issues.push("outdated references statement")
  }

  const shortSections = lines.filter((line) => /^[A-Z][A-Z\s&]{2,}$/.test(line)).length > 0 && lines.filter((line) => line.length < 5).length > 6
  if (shortSections) {
    score -= 1
    issues.push("thin or fragmented sections")
  }

  const duplicateHeaders = Array.from(lines.reduce((map, line) => {
    if (/^(summary|experience|education|skills|projects|certifications)$/i.test(line)) {
      map.set(line.toLowerCase(), (map.get(line.toLowerCase()) || 0) + 1)
    }
    return map
  }, new Map<string, number>()).entries()).filter(([, count]) => count > 1)

  if (duplicateHeaders.length > 0) {
    score -= 1
    issues.push("repeated section headers")
  }

  return {
    name: "Resume Best Practices",
    score: Math.max(0, score),
    maxScore,
    status: scoreStatus(Math.max(0, score), maxScore),
    feedback: issues.length === 0
      ? "Resume follows common ATS and recruiter best practices."
      : `Issues found: ${issues.join(", ")}.`,
  }
}

function checkParseCompatibility(text: string): ATSCheckResult {
  const maxScore = 4
  let score = maxScore
  const issues: string[] = []

  if ((text.match(/[�\ufffd]/g) || []).length > 0) {
    score -= 2
    issues.push("character encoding errors")
  }

  if (text.split("\n").filter((line) => /\s{4,}/.test(line) && line.trim().length > 10).length > 5) {
    score -= 1
    issues.push("excessive spacing from complex layout")
  }

  if ((text.match(/https?:\/\/\S{80,}/g) || []).length > 0) {
    score -= 1
    issues.push("very long URLs")
  }

  return {
    name: "Parse Compatibility",
    score: Math.max(0, score),
    maxScore,
    status: scoreStatus(Math.max(0, score), maxScore),
    feedback: issues.length === 0
      ? "No major parsing compatibility issues detected."
      : `Potential parser risks: ${issues.join(", ")}.`,
  }
}

export function analyzeATS(text: string): ATSAnalysisResult {
  const breakdown = [
    checkContactInfo(text),
    checkTextExtractability(text),
    checkSectionHeaders(text),
    checkDateFormatting(text),
    checkBulletPoints(text),
    checkActionVerbs(text),
    checkLength(text),
    checkSkillsSection(text),
    checkEducation(text),
    checkQuantifiableAchievements(text),
    checkProfessionalEmail(text),
    checkFormattingIssues(text),
    checkWeakLanguage(text),
    checkConsistency(text),
    checkParseCompatibility(text),
  ]

  const rawScore = breakdown.reduce((sum, item) => sum + item.score, 0)
  const score = Math.min(95, rawScore)
  const passCount = breakdown.filter((item) => item.status === "pass").length
  const warningCount = breakdown.filter((item) => item.status === "warning").length
  const failCount = breakdown.filter((item) => item.status === "fail").length
  const metrics = getMetrics(text)

  const priorities = breakdown
    .filter((item) => item.status !== "pass")
    .sort((a, b) => (a.score / a.maxScore) - (b.score / b.maxScore))
    .slice(0, 3)
    .map((item) => `${item.name}: ${item.feedback}`)

  const strengths = breakdown
    .filter((item) => item.status === "pass")
    .sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore))
    .slice(0, 3)
    .map((item) => `${item.name}: ${item.feedback}`)

  let summary = ""
  if (score >= 85) {
    summary = `Strong ATS readiness with ${passCount} passing checks. Tighten the remaining ${warningCount + failCount} items for a cleaner submission.`
  } else if (score >= 70) {
    summary = `Good foundation, but ${failCount} critical checks and ${warningCount} warnings still limit ATS performance.`
  } else if (score >= 50) {
    summary = `This resume is partially ATS-friendly, but it still has multiple blockers that can reduce parsing quality or keyword coverage.`
  } else {
    summary = `This resume is at high risk of underperforming in ATS systems. Fix structure, formatting, and content clarity before using it broadly.`
  }

  return {
    score,
    breakdown,
    summary,
    strengths,
    priorities,
    metrics,
  }
}
