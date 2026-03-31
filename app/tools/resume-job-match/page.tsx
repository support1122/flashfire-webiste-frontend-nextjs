"use client"

import React, { useCallback, useRef, useState } from "react"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import {
  AlertCircle,
  BarChart3,
  Briefcase,
  CheckCircle,
  ClipboardList,
  Lock,
  ScanSearch,
  Shield,
  Sparkles,
  Target,
  Upload,
  XCircle,
  Zap,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackError, trackFeatureUsage } from "@/src/utils/PostHogTracking"
import { Pill, ScoreRing, SectionBadge, STATUS_COLORS, toolTheme } from "@/src/components/tools/toolTheme"
import { TOOL_JOB_PRESETS } from "@/src/utils/resumeSignalData"

interface MatchDimension {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

interface MatchKeywordSignal {
  term: string
  importance: "high" | "medium"
  matched: boolean
  source: "skill" | "requirement" | "phrase"
}

interface MatchInsights {
  jobTitle: string
  seniority: string
  workMode: string
  roleFamily: string
  detectedRequirements: string[]
}

const STATUS_ICONS = {
  pass: <CheckCircle size={18} color="#059669" />,
  warning: <AlertCircle size={18} color="#d97706" />,
  fail: <XCircle size={18} color="#dc2626" />,
}

const faqs = [
  {
    question: "How does the job match score work?",
    answer:
      "The matcher combines requirement coverage, relevant skill overlap, title alignment, experience fit, impact evidence, and keyword usage. It is designed to help users tailor a resume for a specific role instead of relying on a generic template.",
  },
  {
    question: "Why are role presets included?",
    answer:
      "Presets make the tool easier to test and demonstrate. Users can load a realistic sample job description immediately, then replace it with a live one when ready.",
  },
  {
    question: "Can I use this for any industry?",
    answer:
      "Yes, but the strongest results come when the job description is complete and specific. The matcher performs best with clear responsibilities, skills, and requirements.",
  },
  {
    question: "Is anything stored?",
    answer:
      "No. The resume file and job description are processed for analysis and not stored after the response is returned.",
  },
]

function getMatchLabel(score: number) {
  if (score >= 75) return "Strong role match"
  if (score >= 55) return "Promising but incomplete"
  return "Needs resume tailoring"
}

export default function ResumeJobMatchPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const [result, setResult] = useState<{
    matchScore: number
    breakdown: MatchDimension[]
    missingKeywords: string[]
    matchedKeywords: string[]
    missingSkills: string[]
    matchedSkills: string[]
    keywordSignals: MatchKeywordSignal[]
    recommendations: string[]
    insights: MatchInsights
    warning?: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((nextFile: File) => {
    setError(null)
    setResult(null)
    if (nextFile.type !== "application/pdf") {
      setError("Please upload a PDF file.")
      return
    }
    if (nextFile.size > 5 * 1024 * 1024) {
      setError("File must be less than 5MB.")
      return
    }
    setFile(nextFile)
    trackFeatureUsage("resume_job_match", "file_uploaded", {
      file_size: nextFile.size,
      file_type: nextFile.type,
    } as Record<string, unknown>)
  }, [])

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setDragOver(false)
      if (event.dataTransfer.files[0]) {
        handleFile(event.dataTransfer.files[0])
      }
    },
    [handleFile],
  )

  const canAnalyze = Boolean(file && jobDescription.trim().length >= 50 && !loading)

  const analyze = async () => {
    if (!file || jobDescription.trim().length < 50) return
    setLoading(true)
    setError(null)
    setResult(null)

    trackButtonClick("Analyze Match", "resume_job_match", "cta", {
      button_location: "tool_section",
    })

    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobDescription", jobDescription)

      const response = await fetch("/api/tools/resume-match", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!data.success) {
        setError(data.error || "Analysis failed.")
        trackError("resume_match_failed", data.error || "Analysis failed", "resume_job_match")
        return
      }

      setResult(data)
      trackFeatureUsage("resume_job_match", "analysis_completed", {
        match_score: data.matchScore,
        missing_keywords_count: data.missingKeywords?.length,
        pass_count: data.breakdown?.filter((item: MatchDimension) => item.status === "pass").length,
        fail_count: data.breakdown?.filter((item: MatchDimension) => item.status === "fail").length,
        jd_length: jobDescription.length,
        is_image_pdf: data.warning === "image-based-pdf",
      } as Record<string, unknown>)
    } catch {
      setError("Something went wrong. Please try again.")
      trackError("resume_match_error", "Network or unexpected error", "resume_job_match")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          background: toolTheme.bg,
          minHeight: "100vh",
        }}
      >
        <section style={{ padding: "120px 20px 48px" }}>
          <div
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
              gap: "24px",
            }}
          >
            <div>
              <SectionBadge>Free Resume Match Tool</SectionBadge>
              <h1
                style={{
                  fontSize: "clamp(2.3rem, 6vw, 4.4rem)",
                  lineHeight: 1.02,
                  fontWeight: 800,
                  color: toolTheme.slate,
                  margin: "20px 0 16px",
                  maxWidth: "760px",
                }}
              >
                Compare your resume against a real role and see where the fit breaks.
              </h1>
              <p style={{ margin: 0, maxWidth: "650px", fontSize: "1.04rem", lineHeight: 1.7, color: toolTheme.body }}>
                The matcher now gives users better UX and better signal depth: role presets, skill coverage, requirement gaps, matched keywords, and prioritized recommendations.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
                <Pill>No signup required</Pill>
                <Pill tone="soft">Role presets</Pill>
                <Pill tone="warning">Matched + missing signals</Pill>
              </div>
            </div>

            <div
              style={{
                borderRadius: "28px",
                background: "rgba(255,255,255,0.88)",
                border: `1px solid ${toolTheme.border}`,
                boxShadow: "0 28px 80px rgba(255,76,0,0.09)",
                padding: "24px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", marginBottom: "16px" }}>
                {[
                  { label: "Signals", value: "7" },
                  { label: "Preset roles", value: `${TOOL_JOB_PRESETS.length}` },
                  { label: "Coverage", value: "Skills" },
                  { label: "Output", value: "Actionable" },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "14px", borderRadius: "18px", background: toolTheme.cream, border: `1px solid ${toolTheme.border}` }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: toolTheme.slate }}>{item.value}</div>
                    <div style={{ fontSize: "0.82rem", color: toolTheme.muted }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                {[
                  "Highlights role framing, experience fit, and requirement coverage",
                  "Separates matched skills from missing skills and keywords",
                  "Includes example datasets so users are never stuck at a blank textarea",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "16px", background: "#fffaf6", border: `1px solid ${toolTheme.border}` }}>
                    <CheckCircle size={16} color={toolTheme.primary} />
                    <span style={{ fontSize: "0.92rem", color: toolTheme.body }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 20px 72px" }}>
          <div
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                borderRadius: "30px",
                background: "rgba(255,255,255,0.94)",
                border: `1px solid ${toolTheme.border}`,
                boxShadow: "0 30px 80px rgba(255,76,0,0.08)",
                padding: "26px",
              }}
            >
              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? toolTheme.primary : toolTheme.borderStrong}`,
                  borderRadius: "26px",
                  background: dragOver ? "#fff0e6" : "#fffaf6",
                  padding: "38px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 180ms ease",
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    if (event.target.files?.[0]) {
                      handleFile(event.target.files[0])
                    }
                  }}
                />
                <div
                  style={{
                    width: "62px",
                    height: "62px",
                    borderRadius: "20px",
                    background: "#ffe8db",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <Upload size={28} color={toolTheme.primary} />
                </div>
                <div style={{ fontWeight: 700, color: toolTheme.slate, fontSize: "1.05rem", marginBottom: "6px" }}>
                  {file ? file.name : "Upload the resume you want to tailor"}
                </div>
                <div style={{ color: toolTheme.muted, fontSize: "0.92rem" }}>
                  {file ? `${(file.size / 1024).toFixed(0)} KB • click or drop to replace` : "PDF only • up to 5 MB"}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "10px", flexWrap: "wrap" }}>
                  <label style={{ fontWeight: 700, color: toolTheme.slate }}>Job description</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {TOOL_JOB_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setJobDescription(preset.jobDescription)}
                        style={{
                          borderRadius: "999px",
                          border: `1px solid ${toolTheme.borderStrong}`,
                          background: "#fff6ef",
                          color: toolTheme.primaryDark,
                          padding: "8px 12px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the full job description here or load a preset above."
                  style={{
                    width: "100%",
                    minHeight: "240px",
                    borderRadius: "22px",
                    border: `1px solid ${toolTheme.border}`,
                    background: "#fffdfb",
                    padding: "16px 18px",
                    fontSize: "0.94rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                    lineHeight: 1.65,
                    outline: "none",
                    resize: "vertical",
                  }}
                  onFocus={(event) => {
                    event.target.style.borderColor = toolTheme.primary
                  }}
                  onBlur={(event) => {
                    event.target.style.borderColor = toolTheme.border
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginTop: "8px", color: jobDescription.trim().length < 50 ? "#d97706" : toolTheme.muted, fontSize: "0.82rem" }}>
                  <span>{jobDescription.trim().length < 50 ? "Minimum 50 characters required" : "Ready for analysis"}</span>
                  <span>{jobDescription.length} characters</span>
                </div>
              </div>

              {error && (
                <div
                  style={{
                    marginTop: "16px",
                    borderRadius: "18px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#dc2626",
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={analyze}
                disabled={!canAnalyze}
                style={{
                  width: "100%",
                  marginTop: "18px",
                  border: "none",
                  borderRadius: "18px",
                  padding: "16px 18px",
                  background: canAnalyze ? toolTheme.primary : "#cbd5e1",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: canAnalyze ? "pointer" : "not-allowed",
                }}
              >
                {loading ? "Analyzing resume match..." : "Analyze match"}
              </button>
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              <div
                style={{
                  borderRadius: "28px",
                  background: "rgba(255,255,255,0.88)",
                  border: `1px solid ${toolTheme.border}`,
                  padding: "24px",
                }}
              >
                <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "14px", fontSize: "1.1rem" }}>Preset job datasets</div>
                <div style={{ display: "grid", gap: "10px" }}>
                  {TOOL_JOB_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setJobDescription(preset.jobDescription)}
                      style={{
                        textAlign: "left",
                        borderRadius: "18px",
                        border: `1px solid ${toolTheme.border}`,
                        background: "#fffaf6",
                        padding: "14px 16px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 700, color: toolTheme.slate }}>{preset.role}</div>
                      <div style={{ fontSize: "0.84rem", color: toolTheme.muted, marginTop: "4px" }}>
                        {preset.companyType} • {preset.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: "28px",
                  background: "linear-gradient(180deg, #fff8f3 0%, #ffffff 100%)",
                  border: `1px solid ${toolTheme.border}`,
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
                  <Pill tone="soft">Secure processing</Pill>
                  <Pill tone="soft">No saved files</Pill>
                  <Pill tone="soft">Role-specific output</Pill>
                </div>
                <div style={{ color: toolTheme.body, lineHeight: 1.65 }}>
                  This tool is meant to make tailoring practical. Users can load a sample role, inspect the result shape, and then swap in a live JD without changing the workflow.
                </div>
              </div>
            </div>
          </div>
        </section>

        {result && (
          <section style={{ padding: "0 20px 72px" }}>
            <div
              style={{
                maxWidth: "1180px",
                margin: "0 auto",
                borderRadius: "32px",
                background: "rgba(255,255,255,0.96)",
                border: `1px solid ${toolTheme.border}`,
                boxShadow: "0 32px 90px rgba(255,76,0,0.08)",
                padding: "28px",
              }}
            >
              {result.warning === "image-based-pdf" ? (
                <div style={{ textAlign: "center", padding: "18px 0" }}>
                  <AlertCircle size={54} color="#d97706" style={{ marginBottom: "12px" }} />
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: toolTheme.slate, marginBottom: "10px" }}>Image-based PDF detected</h2>
                  <p style={{ maxWidth: "620px", margin: "0 auto", color: toolTheme.body, lineHeight: 1.7 }}>{result.recommendations[0]}</p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(250px, 300px) minmax(0, 1fr)",
                      gap: "28px",
                      alignItems: "center",
                      paddingBottom: "28px",
                      borderBottom: `1px solid ${toolTheme.border}`,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <ScoreRing score={result.matchScore} />
                      <div style={{ marginTop: "16px", fontSize: "1.05rem", fontWeight: 800, color: toolTheme.slate }}>
                        {getMatchLabel(result.matchScore)}
                      </div>
                    </div>

                    <div>
                      <SectionBadge>Match Summary</SectionBadge>
                      <h2 style={{ fontSize: "2rem", fontWeight: 800, color: toolTheme.slate, margin: "18px 0 10px" }}>{result.insights.jobTitle}</h2>
                      <p style={{ fontSize: "1rem", lineHeight: 1.72, color: toolTheme.body, margin: "0 0 16px" }}>
                        This analysis compares the resume against the role&apos;s visible requirements, skill vocabulary, expected seniority, and positioning cues.
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <Pill>{result.insights.roleFamily}</Pill>
                        <Pill tone="soft">{result.insights.seniority}</Pill>
                        <Pill tone="soft">{result.insights.workMode}</Pill>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginTop: "24px", marginBottom: "28px" }}>
                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Matched skills</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.matchedSkills.length > 0 ? result.matchedSkills.map((item) => <Pill key={item} tone="success">{item}</Pill>) : <span style={{ color: toolTheme.muted }}>No strong skill matches detected yet.</span>}
                      </div>
                    </div>

                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Missing skills</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.missingSkills.length > 0 ? result.missingSkills.map((item) => <Pill key={item} tone="warning">{item}</Pill>) : <span style={{ color: toolTheme.muted }}>No major skill gaps detected.</span>}
                      </div>
                    </div>

                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Detected requirements</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.insights.detectedRequirements.length > 0 ? result.insights.detectedRequirements.map((item) => <Pill key={item} tone="soft">{item}</Pill>) : <span style={{ color: toolTheme.muted }}>The JD did not expose many structured requirements.</span>}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "18px", marginBottom: "28px" }}>
                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Matched keywords</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.matchedKeywords.length > 0 ? result.matchedKeywords.map((item) => <Pill key={item} tone="success">{item}</Pill>) : <span style={{ color: toolTheme.muted }}>No matched keywords returned.</span>}
                      </div>
                    </div>
                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Missing keywords</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.missingKeywords.length > 0 ? result.missingKeywords.map((item) => <Pill key={item} tone="warning">{item}</Pill>) : <span style={{ color: toolTheme.muted }}>No meaningful keyword gaps detected.</span>}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "14px", fontSize: "1.1rem" }}>Match breakdown</div>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {result.breakdown.map((dimension) => {
                        const colors = STATUS_COLORS[dimension.status]
                        return (
                          <div
                            key={dimension.name}
                            style={{
                              borderRadius: "20px",
                              border: `1px solid ${colors.border}`,
                              background: colors.bg,
                              padding: "16px 18px",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <BarChart3 size={18} color={colors.text} />
                                <span style={{ fontWeight: 700, color: toolTheme.slate }}>{dimension.name}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: colors.text, fontWeight: 700 }}>
                                  {dimension.score}/{dimension.maxScore}
                                </span>
                                {STATUS_ICONS[dimension.status]}
                              </div>
                            </div>
                            <div style={{ color: toolTheme.body, lineHeight: 1.6 }}>{dimension.feedback}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "18px", marginBottom: "28px" }}>
                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Priority signals</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.keywordSignals.slice(0, 12).map((signal) => (
                          <Pill key={`${signal.term}-${signal.source}`} tone={signal.matched ? "success" : signal.importance === "high" ? "warning" : "soft"}>
                            {signal.term}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Recommended next moves</div>
                      <div style={{ display: "grid", gap: "10px" }}>
                        {result.recommendations.map((item) => (
                          <div key={item} style={{ display: "flex", gap: "10px", color: toolTheme.body, lineHeight: 1.55 }}>
                            <Zap size={16} color={toolTheme.primary} style={{ marginTop: "3px", flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section style={{ padding: "0 20px 72px" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <SectionBadge>What This Analyzes</SectionBadge>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: toolTheme.slate, margin: "18px 0 10px" }}>
                Better signals for a better tailoring workflow.
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              {[
                { icon: Briefcase, label: "Role alignment" },
                { icon: ClipboardList, label: "Critical requirements" },
                { icon: Target, label: "Skills coverage" },
                { icon: BarChart3, label: "Experience fit" },
                { icon: Sparkles, label: "Impact evidence" },
                { icon: ScanSearch, label: "Keyword signals" },
                { icon: Shield, label: "Secure processing" },
                { icon: Lock, label: "No stored files" },
              ].map((item) => (
                <div key={item.label} style={{ borderRadius: "20px", background: "rgba(255,255,255,0.88)", border: `1px solid ${toolTheme.border}`, padding: "16px 18px", display: "flex", alignItems: "center", gap: "10px", color: toolTheme.body }}>
                  <item.icon size={18} color={toolTheme.primary} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 20px 96px" }}>
          <div style={{ textAlign: "center", marginBottom: "22px" }}>
            <SectionBadge>FAQ</SectionBadge>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: toolTheme.slate, margin: "18px 0 0" }}>
              Frequently asked questions
            </h2>
          </div>
          <div className={faqStyles.faqContainer}>
            {faqs.map((faq, index) => (
              <div key={faq.question} className={`${faqStyles.faqItem} ${activeFaqIndex === index ? faqStyles.active : ""}`}>
                <button className={faqStyles.faqQuestion} onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.faqIcon}>{activeFaqIndex === index ? <FaTimes /> : <FaPlus />}</span>
                </button>
                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
