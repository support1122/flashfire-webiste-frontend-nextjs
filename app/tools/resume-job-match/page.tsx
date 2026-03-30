"use client"

import React, { useState, useRef, useCallback } from "react"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Shield,
  Zap,
  Lock,
  Target,
  BarChart,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackFeatureUsage, trackError } from "@/src/utils/PostHogTracking"

interface MatchDimension {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

const STATUS_COLORS = {
  pass: { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" },
  warning: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  fail: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
}

const STATUS_ICONS = {
  pass: <CheckCircle size={18} color="#059669" />,
  warning: <AlertCircle size={18} color="#d97706" />,
  fail: <XCircle size={18} color="#dc2626" />,
}

const faqs = [
  {
    question: "How does the resume job match work?",
    answer:
      "We extract keywords, skills, and requirements from the job description and compare them against your resume content. The analysis covers 7 dimensions including keyword overlap, skills gap, experience level, and more.",
  },
  {
    question: "What makes a good match score?",
    answer:
      "A score above 70 indicates strong alignment. 50-70 is a decent match with room for improvement. Below 50 means significant gaps that should be addressed before applying.",
  },
  {
    question: "Should I tailor my resume for every job?",
    answer:
      "Yes! Tailoring your resume to each job description significantly improves your chances. Use this tool to identify what to add or emphasize for each application.",
  },
  {
    question: "Is my data stored?",
    answer:
      "No. Your resume and job description are processed in memory and discarded immediately after analysis. Nothing is stored on our servers.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently PDF files only. PDF is the most ATS-compatible and widely accepted format.",
  },
]

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 70 ? "#059669" : score >= 50 ? "#d97706" : "#dc2626"

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "2.5rem", fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>out of 100</span>
      </div>
    </div>
  )
}

export default function ResumeJobMatchPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    matchScore: number
    breakdown: MatchDimension[]
    missingKeywords: string[]
    recommendations: string[]
    warning?: string
  } | null>(null)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    setError(null)
    setResult(null)
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.")
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File must be less than 5MB.")
      return
    }
    setFile(f)
    trackFeatureUsage("resume_job_match", "file_uploaded", {
      file_size: f.size,
      file_type: f.type,
    } as Record<string, unknown>)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
    },
    [handleFile],
  )

  const canAnalyze = file && jobDescription.trim().length >= 50 && !loading

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

      const res = await fetch("/api/tools/resume-match", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!data.success) {
        setError(data.error || "Analysis failed.")
        trackError("resume_match_failed", data.error || "Analysis failed", "resume_job_match")
      } else {
        setResult(data)
        trackFeatureUsage("resume_job_match", "analysis_completed", {
          match_score: data.matchScore,
          missing_keywords_count: data.missingKeywords?.length,
          recommendations_count: data.recommendations?.length,
          pass_count: data.breakdown?.filter((d: MatchDimension) => d.status === "pass").length,
          fail_count: data.breakdown?.filter((d: MatchDimension) => d.status === "fail").length,
          jd_length: jobDescription.length,
          is_image_pdf: data.warning === "image-based-pdf",
        } as Record<string, unknown>)
      }
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
          background: "linear-gradient(135deg, #fff7f2 0%, #fff0e6 50%, #ffffff 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Hero */}
        <section style={{ padding: "120px 20px 40px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "9999px",
              padding: "4px 14px",
              fontSize: "13px",
              fontWeight: 600,
              background: "#ff4c00",
              color: "#fff",
              marginBottom: "20px",
            }}
          >
            Free Resume Match Tool
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            See How Well Your Resume Matches Any Job
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "#4b5563", lineHeight: 1.6, marginBottom: "28px" }}>
            Upload your resume and paste a job description to get keyword gaps, skills analysis, and tailored recommendations.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              fontSize: "0.85rem",
              color: "#6b7280",
            }}
          >
            {[
              { icon: <Shield size={16} color="#ff4c00" />, label: "No signup required" },
              { icon: <Lock size={16} color="#ff4c00" />, label: "100% secure" },
              { icon: <Zap size={16} color="#ff4c00" />, label: "Instant results" },
            ].map((t) => (
              <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 20px 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              { step: "1", title: "Upload Resume", desc: "Drop your PDF resume" },
              { step: "2", title: "Paste Job Description", desc: "Add the target job post" },
              { step: "3", title: "Get Results", desc: "Score, gaps & recommendations" },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #ffd7c4",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#ff4c00",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "10px",
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tool Section */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 60px" }}>
          {/* Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "#ff4c00" : "#ffd7c4"}`,
              borderRadius: "16px",
              padding: "40px 24px",
              textAlign: "center",
              background: dragOver ? "#fff2ea" : "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginBottom: "20px",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0])
              }}
            />
            <Upload size={36} color="#ff4c00" style={{ marginBottom: "10px" }} />
            {file ? (
              <div>
                <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>{file.name}</p>
                <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                  {(file.size / 1024).toFixed(0)} KB — Click or drop to replace
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}>
                  Drop your resume here or click to browse
                </p>
                <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>PDF only, max 5MB</p>
              </div>
            )}
          </div>

          {/* Job Description Textarea */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: "8px",
                fontSize: "0.95rem",
              }}
            >
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              style={{
                width: "100%",
                minHeight: "180px",
                borderRadius: "12px",
                border: "1px solid #ffd7c4",
                padding: "14px 16px",
                fontSize: "0.9rem",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.6,
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff4c00")}
              onBlur={(e) => (e.target.style.borderColor = "#ffd7c4")}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                color: jobDescription.trim().length < 50 ? "#d97706" : "#6b7280",
                marginTop: "4px",
              }}
            >
              <span>{jobDescription.trim().length < 50 ? "Minimum 50 characters required" : ""}</span>
              <span>{jobDescription.length} characters</span>
            </div>
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "12px",
                padding: "14px 18px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#dc2626",
                fontSize: "0.9rem",
              }}
            >
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button
            onClick={analyze}
            disabled={!canAnalyze}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: canAnalyze ? "#ff4c00" : "#d1d5db",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: canAnalyze ? "pointer" : "not-allowed",
              transition: "background 0.2s",
              marginBottom: "32px",
            }}
          >
            {loading ? "Analyzing..." : "Analyze Match"}
          </button>

          {/* Results */}
          {result && (
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid #ffd7c4",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(255,76,0,0.08)",
              }}
            >
              {result.warning === "image-based-pdf" ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <AlertCircle size={48} color="#d97706" style={{ marginBottom: "16px" }} />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                    Image-Based PDF Detected
                  </h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.6 }}>{result.recommendations[0]}</p>
                </div>
              ) : (
                <>
                  {/* Score Ring */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
                    <ScoreRing score={result.matchScore} />
                    <p
                      style={{
                        marginTop: "16px",
                        color: "#4b5563",
                        textAlign: "center",
                        fontSize: "0.95rem",
                      }}
                    >
                      {result.matchScore >= 70
                        ? "Strong match! Your resume aligns well with this job."
                        : result.matchScore >= 50
                          ? "Decent match, but there are gaps to address."
                          : "Significant gaps detected. Consider tailoring your resume for this role."}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "16px", fontSize: "1.1rem" }}>
                    Match Breakdown
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {result.breakdown.map((dim) => {
                      const colors = STATUS_COLORS[dim.status]
                      return (
                        <div
                          key={dim.name}
                          style={{
                            borderRadius: "12px",
                            border: `1px solid ${colors.border}`,
                            background: colors.bg,
                            padding: "14px 18px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "6px",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ color: colors.text }}>
                                <BarChart size={18} />
                              </span>
                              <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>
                                {dim.name}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: colors.text }}>
                                {dim.score}/{dim.maxScore}
                              </span>
                              {STATUS_ICONS[dim.status]}
                            </div>
                          </div>
                          <p style={{ fontSize: "0.83rem", color: "#4b5563", lineHeight: 1.5, margin: 0 }}>
                            {dim.feedback}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Missing Keywords */}
                  {result.missingKeywords.length > 0 && (
                    <div style={{ marginBottom: "28px" }}>
                      <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "12px", fontSize: "1.1rem" }}>
                        Missing Keywords
                      </h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {result.missingKeywords.map((kw) => (
                          <span
                            key={kw}
                            style={{
                              background: "#fffbeb",
                              border: "1px solid #fde68a",
                              borderRadius: "8px",
                              padding: "4px 12px",
                              fontSize: "0.82rem",
                              fontWeight: 500,
                              color: "#92400e",
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div>
                      <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "12px", fontSize: "1.1rem" }}>
                        Recommendations
                      </h3>
                      <ol
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {result.recommendations.map((rec, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: "0.9rem",
                              color: "#374151",
                              lineHeight: 1.6,
                            }}
                          >
                            {rec}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px 80px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "32px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className={faqStyles.faqContainer}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${faqStyles.faqItem} ${activeFaqIndex === index ? faqStyles.active : ""}`}
              >
                <button
                  className={faqStyles.faqQuestion}
                  onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className={faqStyles.faqIcon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
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
