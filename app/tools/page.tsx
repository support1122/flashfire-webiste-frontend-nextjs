"use client"

import React from "react"
import Link from "next/link"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import { FileText, Target, ArrowRight } from "lucide-react"
import { trackButtonClick } from "@/src/utils/PostHogTracking"

const tools = [
  {
    title: "ATS Score Checker",
    description:
      "Upload your resume and get an instant ATS compatibility score with detailed feedback on 12 key criteria.",
    href: "/tools/ats-score-checker",
    icon: FileText,
    badge: "Free",
  },
  {
    title: "Resume Job Match",
    description:
      "See how well your resume matches a specific job description. Get keyword gaps, skills analysis, and recommendations.",
    href: "/tools/resume-job-match",
    icon: Target,
    badge: "Free",
  },
]

export default function ToolsPage() {
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
        <section style={{ padding: "120px 20px 60px", textAlign: "center" }}>
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
            Free Tools
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            Free Resume Tools
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#4b5563",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Powerful, free tools to help you optimize your resume and land more interviews. No signup required.
          </p>
        </section>

        {/* Tool Cards */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 20px 100px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
          }}
        >
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{ textDecoration: "none" }}
              onClick={() => {
                trackButtonClick(tool.title, "tools_landing", "link", {
                  button_location: "tools_page",
                  destination: tool.href,
                })
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #ffd7c4",
                  padding: "32px 28px",
                  boxShadow: "0 10px 30px rgba(255,76,0,0.08)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(255,76,0,0.12)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(255,76,0,0.08)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#fff2ea",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <tool.icon size={24} color="#ff4c00" />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ff4c00",
                      background: "#fff2ea",
                      borderRadius: "9999px",
                      padding: "2px 10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                  {tool.title}
                </h2>
                <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.6, marginBottom: "16px" }}>
                  {tool.description}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ff4c00",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  Try Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}
