"use client"

import React from "react"
import Link from "next/link"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import { ArrowRight, FileSearch, ScanSearch, Sparkles, Target } from "lucide-react"
import { trackButtonClick } from "@/src/utils/PostHogTracking"
import { Pill, SectionBadge, toolTheme } from "@/src/components/tools/toolTheme"

const tools = [
  {
    title: "ATS Score Checker",
    description: "Production-grade ATS scoring across structure, formatting, readability, and content signals.",
    href: "/tools/ats-score-checker",
    icon: ScanSearch,
    stats: ["15 scoring checks", "Actionable priorities", "No signup"],
  },
  {
    title: "Resume Job Match",
    description: "Match your resume against a role with keyword, skills, requirement, and positioning analysis.",
    href: "/tools/resume-job-match",
    icon: Target,
    stats: ["Role presets", "Skills gaps", "Match recommendations"],
  },
]

export default function ToolsPage() {
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
        <section style={{ padding: "120px 20px 72px" }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
                gap: "28px",
                alignItems: "end",
              }}
            >
              <div>
                <SectionBadge>Free Resume Tools</SectionBadge>
                <h1
                  style={{
                    fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
                    lineHeight: 1.02,
                    fontWeight: 800,
                    color: toolTheme.slate,
                    margin: "20px 0 18px",
                    maxWidth: "760px",
                  }}
                >
                  Sharper tools for resume quality, ATS readiness, and role matching.
                </h1>
                <p
                  style={{
                    maxWidth: "640px",
                    fontSize: "1.06rem",
                    lineHeight: 1.7,
                    color: toolTheme.body,
                    margin: 0,
                  }}
                >
                  The tooling keeps the same Flashfire visual language, but the experience is cleaner, faster to scan, and more useful once a user lands on the result.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(14px)",
                  border: `1px solid ${toolTheme.border}`,
                  borderRadius: "28px",
                  padding: "24px",
                  boxShadow: "0 30px 70px rgba(255,76,0,0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "14px",
                      background: "#ffe9dc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sparkles size={20} color={toolTheme.primary} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: toolTheme.slate }}>Built for real resume iteration</div>
                    <div style={{ fontSize: "0.9rem", color: toolTheme.muted }}>Clear signals, fewer dead-end states</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "18px" }}>
                  <Pill>Cleaner result hierarchy</Pill>
                  <Pill tone="soft">Production-grade scoring</Pill>
                  <Pill tone="warning">Keyword + skills datasets</Pill>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "12px",
                  }}
                >
                  {[
                    { label: "ATS signals", value: "15" },
                    { label: "Match dimensions", value: "7" },
                    { label: "Preset roles", value: "3" },
                    { label: "Output style", value: "Actionable" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "14px",
                        borderRadius: "18px",
                        background: toolTheme.cream,
                        border: `1px solid ${toolTheme.border}`,
                      }}
                    >
                      <div style={{ fontSize: "1.35rem", fontWeight: 800, color: toolTheme.slate }}>{item.value}</div>
                      <div style={{ fontSize: "0.84rem", color: toolTheme.muted }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 20px 96px" }}>
          <div
            style={{
              maxWidth: "1160px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
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
                    height: "100%",
                    padding: "28px",
                    borderRadius: "28px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, #fff8f3 100%)",
                    border: `1px solid ${toolTheme.border}`,
                    boxShadow: "0 22px 60px rgba(255,76,0,0.07)",
                    transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-4px)"
                    event.currentTarget.style.boxShadow = "0 30px 80px rgba(255,76,0,0.12)"
                    event.currentTarget.style.borderColor = toolTheme.borderStrong
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)"
                    event.currentTarget.style.boxShadow = "0 22px 60px rgba(255,76,0,0.07)"
                    event.currentTarget.style.borderColor = toolTheme.border
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "18px" }}>
                    <div
                      style={{
                        width: "54px",
                        height: "54px",
                        borderRadius: "18px",
                        background: "#ffe9dc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <tool.icon size={26} color={toolTheme.primary} />
                    </div>
                    <Pill>Free</Pill>
                  </div>

                  <h2 style={{ fontSize: "1.55rem", lineHeight: 1.15, fontWeight: 800, color: toolTheme.slate, margin: "0 0 10px" }}>
                    {tool.title}
                  </h2>
                  <p style={{ fontSize: "0.98rem", lineHeight: 1.65, color: toolTheme.body, margin: "0 0 18px" }}>
                    {tool.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "26px" }}>
                    {tool.stats.map((item) => (
                      <Pill key={item} tone="soft">
                        {item}
                      </Pill>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: toolTheme.primaryDark,
                      fontWeight: 700,
                    }}
                  >
                    <span>Open tool</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ padding: "0 20px 96px" }}>
          <div
            style={{
              maxWidth: "1160px",
              margin: "0 auto",
              borderRadius: "32px",
              background: "linear-gradient(135deg, #fff1e6 0%, #ffffff 100%)",
              border: `1px solid ${toolTheme.border}`,
              padding: "28px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.8fr)",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <SectionBadge>Why this feels better</SectionBadge>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, color: toolTheme.slate, margin: "18px 0 10px" }}>
                The UX now emphasizes decision-making, not just scores.
              </h3>
              <p style={{ margin: 0, maxWidth: "620px", color: toolTheme.body, lineHeight: 1.7 }}>
                Users can see what is working, what is blocking them, and what to fix first without reading every line of feedback.
              </p>
            </div>
            <div style={{ display: "grid", gap: "12px" }}>
              {[
                { icon: FileSearch, text: "More structured result panels" },
                { icon: ScanSearch, text: "Stronger ATS signal reporting" },
                { icon: Target, text: "Richer match data and presets" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "18px",
                    background: "rgba(255,255,255,0.82)",
                    border: `1px solid ${toolTheme.border}`,
                  }}
                >
                  <item.icon size={18} color={toolTheme.primary} />
                  <span style={{ fontWeight: 600, color: toolTheme.slate }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
