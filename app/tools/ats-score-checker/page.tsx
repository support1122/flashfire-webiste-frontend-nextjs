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
  Mail,
  Layout,
  BarChart,
  Award,
  Calendar,
  List,
  Type,
  AlignLeft,
  Hash,
  FileCheck,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackFeatureUsage, trackError } from "@/src/utils/PostHogTracking"

interface ATSCheckResult {
  name: string
  score: number
  maxScore: number
  status: "pass" | "warning" | "fail"
  feedback: string
}

const CHECK_ICONS: Record<string, React.ReactNode> = {
  "Contact Information": <Mail size={18} />,
  "Text Extractability": <FileText size={18} />,
  "Section Headers": <Layout size={18} />,
  "Date Consistency": <Calendar size={18} />,
  "Bullet Points": <List size={18} />,
  "Action Verbs": <Zap size={18} />,
  "Resume Length": <AlignLeft size={18} />,
  "Skills Section": <Award size={18} />,
  "Education": <FileCheck size={18} />,
  "Quantifiable Impact": <Hash size={18} />,
  "Professional Email": <Mail size={18} />,
  "Formatting & Readability": <Type size={18} />,
  "Language Strength": <AlertCircle size={18} />,
  "Resume Best Practices": <Shield size={18} />,
  "Parse Compatibility": <FileText size={18} />,
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
    question: "What is an ATS score?",
    answer:
      "An ATS (Applicant Tracking System) score measures how well your resume can be parsed and understood by automated hiring software. A higher score means better chances of passing the initial screening.",
  },
  {
    question: "Is this tool really free?",
    answer:
      "Yes, 100% free. No signup, no credit card, no limits. Upload your resume and get instant results.",
  },
  {
    question: "Is my resume data secure?",
    answer:
      "Your resume is processed server-side and never stored. The file is analyzed in memory and discarded immediately after returning your results.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "Currently we support PDF files only. PDF is the most widely accepted format by ATS systems.",
  },
  {
    question: "How accurate is the ATS score?",
    answer:
      "Our checker runs 12 industrial-grade checks covering the most common ATS parsing criteria. While no tool can guarantee a specific ATS outcome, our checks align with what major ATS systems evaluate.",
  },
  {
    question: "What should I do if my score is low?",
    answer:
      "Review each check's feedback and address the failing items first. Focus on adding missing sections, using standard headers, including quantifiable achievements, and ensuring proper formatting.",
  },
]

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? "#059669" : score >= 50 ? "#d97706" : "#dc2626"

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

export default function ATSScoreCheckerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    score: number
    breakdown: ATSCheckResult[]
    summary: string
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
    trackFeatureUsage("ats_score_checker", "file_uploaded", {
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

      const res = await fetch("/api/tools/ats-score", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!data.success) {
        setError(data.error || "Analysis failed.")
        trackError("ats_analysis_failed", data.error || "Analysis failed", "ats_score_checker")
      } else {
        setResult(data)
        trackFeatureUsage("ats_score_checker", "analysis_completed", {
          ats_score: data.score,
          pass_count: data.breakdown?.filter((c: ATSCheckResult) => c.status === "pass").length,
          fail_count: data.breakdown?.filter((c: ATSCheckResult) => c.status === "fail").length,
          warning_count: data.breakdown?.filter((c: ATSCheckResult) => c.status === "warning").length,
          is_image_pdf: data.warning === "image-based-pdf",
        } as Record<string, unknown>)
      }
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
            Free ATS Score Checker
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
            Check Your Resume&apos;s ATS Score
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "#4b5563", lineHeight: 1.6, marginBottom: "28px" }}>
            Upload your resume and get an instant compatibility score with detailed feedback on what ATS systems look for.
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
              { step: "1", title: "Upload", desc: "Drop your PDF resume" },
              { step: "2", title: "Analyze", desc: "15 ATS checks run instantly" },
              { step: "3", title: "Results", desc: "Get score + actionable feedback" },
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
              padding: "48px 24px",
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
            <Upload size={40} color="#ff4c00" style={{ marginBottom: "12px" }} />
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
            disabled={!file || loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: !file || loading ? "#d1d5db" : "#ff4c00",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: !file || loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              marginBottom: "32px",
            }}
          >
            {loading ? "Analyzing..." : "Check ATS Score"}
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
                  <p style={{ color: "#4b5563", lineHeight: 1.6 }}>{result.summary}</p>
                </div>
              ) : (
                <>
                  {/* Score Ring */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
                    <ScoreRing score={result.score} />
                    <p
                      style={{
                        marginTop: "16px",
                        color: "#4b5563",
                        textAlign: "center",
                        maxWidth: "500px",
                        lineHeight: 1.6,
                        fontSize: "0.95rem",
                      }}
                    >
                      {result.summary}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <h3 style={{ fontWeight: 700, color: "#0f172a", marginBottom: "16px", fontSize: "1.1rem" }}>
                    Detailed Breakdown
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {result.breakdown.map((check) => {
                      const colors = STATUS_COLORS[check.status]
                      return (
                        <div
                          key={check.name}
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
                              <span style={{ color: colors.text }}>{CHECK_ICONS[check.name] || <BarChart size={18} />}</span>
                              <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>{check.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: colors.text }}>
                                {check.score}/{check.maxScore}
                              </span>
                              {STATUS_ICONS[check.status]}
                            </div>
                          </div>
                          <p style={{ fontSize: "0.83rem", color: "#4b5563", lineHeight: 1.5, margin: 0 }}>
                            {check.feedback}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* What We Check */}
        <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px 60px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "32px",
            }}
          >
            What We Check
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              { name: "Contact Information", desc: "Email, phone, LinkedIn, location" },
              { name: "Text Extractability", desc: "Readable by ATS parsers" },
              { name: "Section Headers", desc: "Standard resume sections" },
              { name: "Date Consistency", desc: "Consistent date formats" },
              { name: "Bullet Points", desc: "Structured achievements" },
              { name: "Action Verbs", desc: "Impactful language usage" },
              { name: "Resume Length", desc: "Optimal word count" },
              { name: "Skills Section", desc: "Industry-standard skills" },
              { name: "Education", desc: "Degree, institution, GPA" },
              { name: "Quantifiable Impact", desc: "Metrics, %, $ amounts" },
              { name: "Professional Email", desc: "Well-formed email" },
              { name: "Formatting & Readability", desc: "Tables, columns, special chars" },
              { name: "Language Strength", desc: "No weak phrases or clichés" },
              { name: "Resume Best Practices", desc: "Pronouns, filler, completeness" },
              { name: "Parse Compatibility", desc: "Encoding & URL issues" },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #ffd7c4",
                  padding: "18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{ color: "#ff4c00", flexShrink: 0, marginTop: "2px" }}>
                  {CHECK_ICONS[item.name] || <BarChart size={18} />}
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem", marginBottom: "2px" }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
