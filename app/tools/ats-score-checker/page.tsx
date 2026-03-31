"use client"

import React, { useCallback, useRef, useState } from "react"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  FileText,
  Hash,
  Layout,
  List,
  Mail,
  ScanSearch,
  Shield,
  Sparkles,
  Target,
  Type,
  Upload,
  XCircle,
  Zap,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackError, trackFeatureUsage } from "@/src/utils/PostHogTracking"
import { Pill, ScoreRing, SectionBadge, STATUS_COLORS, toolTheme } from "@/src/components/tools/toolTheme"

interface ATSCheckResult {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

interface ATSMetrics {
  wordCount: number
  bulletCount: number
  sectionCount: number
  actionVerbCount: number
  measurableResults: number
}

const CHECK_ICONS: Record<string, React.ReactNode> = {
  "Contact Information": <Mail size={18} />,
  "Text Extractability": <FileText size={18} />,
  "Section Headers": <Layout size={18} />,
  "Date Consistency": <BarChart3 size={18} />,
  "Bullet Points": <List size={18} />,
  "Action Verbs": <Zap size={18} />,
  "Resume Length": <Type size={18} />,
  "Skills Section": <Target size={18} />,
  "Education": <FileText size={18} />,
  "Quantifiable Impact": <Hash size={18} />,
  "Professional Email": <Mail size={18} />,
  "Formatting & Readability": <Layout size={18} />,
  "Language Strength": <Sparkles size={18} />,
  "Resume Best Practices": <Shield size={18} />,
  "Parse Compatibility": <ScanSearch size={18} />,
}

const STATUS_ICONS = {
  pass: <CheckCircle size={18} color="#059669" />,
  warning: <AlertCircle size={18} color="#d97706" />,
  fail: <XCircle size={18} color="#dc2626" />,
}

const faqs = [
  {
    question: "What is an ATS score?",
    answer:
      "An ATS score estimates how easily applicant tracking systems can parse, index, and rank your resume. It focuses on structure, readability, and content signals rather than design alone.",
  },
  {
    question: "What makes this checker stronger now?",
    answer:
      "The current engine scores 15 resume signals, calculates strengths and priorities, and surfaces core resume metrics such as bullet density, action verbs, measurable results, and section coverage.",
  },
  {
    question: "Is my resume stored?",
    answer:
      "No. The uploaded PDF is processed in memory for analysis and is not stored after the response is returned.",
  },
  {
    question: "What if my PDF is image-based?",
    answer:
      "If the PDF contains mostly images instead of selectable text, ATS systems will struggle to parse it. The tool flags that case and recommends using a text-based PDF.",
  },
]

function getScoreLabel(score: number) {
  if (score >= 85) return "Strong ATS readiness"
  if (score >= 70) return "Good foundation"
  if (score >= 50) return "Needs iteration"
  return "High ATS risk"
}

export default function ATSScoreCheckerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const [result, setResult] = useState<{
    score: number
    breakdown: ATSCheckResult[]
    summary: string
    strengths: string[]
    priorities: string[]
    metrics: ATSMetrics
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
    trackFeatureUsage("ats_score_checker", "file_uploaded", {
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

  const analyze = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)

    trackButtonClick("Analyze ATS Score", "ats_score_checker", "cta", {
      button_location: "tool_section",
    })

    try {
      const formData = new FormData()
      formData.append("resume", file)

      const response = await fetch("/api/tools/ats-score", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (!data.success) {
        setError(data.error || "Analysis failed.")
        trackError("ats_analysis_failed", data.error || "Analysis failed", "ats_score_checker")
        return
      }

      setResult(data)
      trackFeatureUsage("ats_score_checker", "analysis_completed", {
        ats_score: data.score,
        pass_count: data.breakdown?.filter((item: ATSCheckResult) => item.status === "pass").length,
        fail_count: data.breakdown?.filter((item: ATSCheckResult) => item.status === "fail").length,
        warning_count: data.breakdown?.filter((item: ATSCheckResult) => item.status === "warning").length,
        is_image_pdf: data.warning === "image-based-pdf",
      } as Record<string, unknown>)
    } catch {
      setError("Something went wrong. Please try again.")
      trackError("ats_analysis_error", "Network or unexpected error", "ats_score_checker")
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
              gridTemplateColumns: "minmax(0, 1.08fr) minmax(320px, 0.92fr)",
              gap: "24px",
              alignItems: "stretch",
            }}
          >
            <div>
              <SectionBadge>Free ATS Score Checker</SectionBadge>
              <h1
                style={{
                  fontSize: "clamp(2.3rem, 6vw, 4.5rem)",
                  lineHeight: 1.02,
                  fontWeight: 800,
                  color: toolTheme.slate,
                  margin: "20px 0 16px",
                  maxWidth: "760px",
                }}
              >
                Audit your resume for ATS parsing, structure, and content quality.
              </h1>
              <p style={{ maxWidth: "650px", fontSize: "1.04rem", lineHeight: 1.7, color: toolTheme.body, margin: 0 }}>
                Upload a PDF and get a cleaner analysis of what is helping your resume, what is blocking it, and which fixes should come first.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
                <Pill>No signup required</Pill>
                <Pill tone="soft">15 ATS checks</Pill>
                <Pill tone="warning">Strengths + priorities</Pill>
              </div>
            </div>

            <div
              style={{
                borderRadius: "28px",
                background: "rgba(255,255,255,0.88)",
                border: `1px solid ${toolTheme.border}`,
                boxShadow: "0 28px 80px rgba(255,76,0,0.09)",
                padding: "24px",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px", marginBottom: "18px" }}>
                {[
                  { label: "Parse-safe", value: "Layout" },
                  { label: "Signal depth", value: "Content" },
                  { label: "Fix order", value: "Priority" },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "14px", borderRadius: "18px", background: toolTheme.cream, border: `1px solid ${toolTheme.border}` }}>
                    <div style={{ fontSize: "1.02rem", fontWeight: 800, color: toolTheme.slate }}>{item.value}</div>
                    <div style={{ fontSize: "0.82rem", color: toolTheme.muted }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                {[
                  "Checks formatting risks that can break parser output",
                  "Flags weak bullets, missing sections, and thin skills coverage",
                  "Surfaces measurable metrics instead of a bare score only",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 14px",
                      borderRadius: "16px",
                      background: "#fffaf6",
                      border: `1px solid ${toolTheme.border}`,
                    }}
                  >
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
                background: "rgba(255,255,255,0.92)",
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
                  padding: "42px 24px",
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
                  {file ? file.name : "Drop your resume here or click to browse"}
                </div>
                <div style={{ color: toolTheme.muted, fontSize: "0.92rem" }}>
                  {file ? `${(file.size / 1024).toFixed(0)} KB • click or drop to replace` : "PDF only • up to 5 MB"}
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
                disabled={!file || loading}
                style={{
                  width: "100%",
                  marginTop: "18px",
                  border: "none",
                  borderRadius: "18px",
                  padding: "16px 18px",
                  background: !file || loading ? "#cbd5e1" : toolTheme.primary,
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: !file || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Analyzing resume..." : "Check ATS score"}
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
                <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "14px", fontSize: "1.1rem" }}>What gets checked</div>
                <div style={{ display: "grid", gap: "10px" }}>
                  {[
                    "Contact details and professional email format",
                    "Section structure, dates, and bullet quality",
                    "Skills coverage, quantified impact, and language strength",
                    "Formatting hazards such as columns, symbols, and parse issues",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", color: toolTheme.body, lineHeight: 1.55 }}>
                      <span style={{ marginTop: "6px", width: "8px", height: "8px", borderRadius: "999px", background: toolTheme.primary }} />
                      <span>{item}</span>
                    </div>
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
                  <Pill tone="soft">Instant feedback</Pill>
                </div>
                <div style={{ color: toolTheme.body, lineHeight: 1.65 }}>
                  This checker is tuned for utility: it tells users what the parser can read, which signals are thin, and where the resume is likely to underperform.
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
                  <p style={{ maxWidth: "620px", margin: "0 auto", color: toolTheme.body, lineHeight: 1.7 }}>{result.summary}</p>
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
                      <ScoreRing score={result.score} />
                      <div style={{ marginTop: "16px", fontSize: "1.05rem", fontWeight: 800, color: toolTheme.slate }}>
                        {getScoreLabel(result.score)}
                      </div>
                    </div>

                    <div>
                      <SectionBadge>Result Summary</SectionBadge>
                      <p style={{ fontSize: "1rem", lineHeight: 1.72, color: toolTheme.body, margin: "18px 0 18px" }}>{result.summary}</p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
                        {[
                          { label: "Words", value: result.metrics.wordCount },
                          { label: "Bullets", value: result.metrics.bulletCount },
                          { label: "Sections", value: result.metrics.sectionCount },
                          { label: "Action verbs", value: result.metrics.actionVerbCount },
                          { label: "Measured results", value: result.metrics.measurableResults },
                        ].map((item) => (
                          <div key={item.label} style={{ borderRadius: "18px", background: toolTheme.cream, border: `1px solid ${toolTheme.border}`, padding: "14px" }}>
                            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: toolTheme.slate }}>{item.value}</div>
                            <div style={{ fontSize: "0.84rem", color: toolTheme.muted }}>{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginTop: "24px", marginBottom: "28px" }}>
                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>What is already working</div>
                      <div style={{ display: "grid", gap: "10px" }}>
                        {result.strengths.map((item) => (
                          <div key={item} style={{ display: "flex", gap: "10px", color: toolTheme.body, lineHeight: 1.55 }}>
                            <CheckCircle size={16} color="#059669" style={{ marginTop: "3px", flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderRadius: "24px", background: "#fffaf6", border: `1px solid ${toolTheme.border}`, padding: "20px" }}>
                      <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "12px" }}>Fix these first</div>
                      <div style={{ display: "grid", gap: "10px" }}>
                        {result.priorities.map((item) => (
                          <div key={item} style={{ display: "flex", gap: "10px", color: toolTheme.body, lineHeight: 1.55 }}>
                            <AlertCircle size={16} color="#d97706" style={{ marginTop: "3px", flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, color: toolTheme.slate, marginBottom: "14px", fontSize: "1.1rem" }}>Detailed breakdown</div>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {result.breakdown.map((check) => {
                        const colors = STATUS_COLORS[check.status]
                        return (
                          <div
                            key={check.name}
                            style={{
                              borderRadius: "20px",
                              border: `1px solid ${colors.border}`,
                              background: colors.bg,
                              padding: "16px 18px",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: colors.text }}>{CHECK_ICONS[check.name] || <BarChart3 size={18} />}</span>
                                <span style={{ fontWeight: 700, color: toolTheme.slate }}>{check.name}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: colors.text, fontWeight: 700 }}>
                                  {check.score}/{check.maxScore}
                                </span>
                                {STATUS_ICONS[check.status]}
                              </div>
                            </div>
                            <div style={{ color: toolTheme.body, lineHeight: 1.6 }}>{check.feedback}</div>
                          </div>
                        )
                      })}
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
              <SectionBadge>What We Check</SectionBadge>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, color: toolTheme.slate, margin: "18px 0 10px" }}>
                The analysis covers structure, content, and parser safety.
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              {[
                "Contact information",
                "Section headers",
                "Date consistency",
                "Bullet quality",
                "Action verbs",
                "Resume length",
                "Skills section",
                "Education details",
                "Quantifiable impact",
                "Professional email",
                "Formatting risks",
                "Language strength",
                "Best practices",
                "Parse compatibility",
              ].map((item) => (
                <div key={item} style={{ borderRadius: "20px", background: "rgba(255,255,255,0.88)", border: `1px solid ${toolTheme.border}`, padding: "16px 18px", color: toolTheme.body }}>
                  {item}
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
