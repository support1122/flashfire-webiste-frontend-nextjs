import React from "react"

export const toolTheme = {
  bg: "linear-gradient(180deg, #fff8f3 0%, #fff1e6 45%, #ffffff 100%)",
  primary: "#ff4c00",
  primaryDark: "#d63f00",
  border: "#ffd7c4",
  borderStrong: "#ffb28f",
  cream: "#fff4ec",
  slate: "#0f172a",
  body: "#475569",
  muted: "#64748b",
}

export const STATUS_COLORS = {
  pass: { bg: "#ecfdf5", text: "#059669", border: "#a7f3d0" },
  warning: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  fail: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
}

export function ScoreRing({ score, size = 176 }: { score: number; size?: number }) {
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? "#059669" : score >= 50 ? "#d97706" : "#dc2626"

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#fde7da" strokeWidth={strokeWidth} />
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
          style={{ transition: "stroke-dashoffset 700ms ease" }}
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
        <span style={{ fontSize: "2.8rem", fontWeight: 800, color }}>{score}</span>
        <span style={{ fontSize: "0.84rem", color: toolTheme.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          out of 100
        </span>
      </div>
    </div>
  )
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "999px",
        padding: "7px 14px",
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: toolTheme.primary,
        background: "#ffe7d9",
        border: `1px solid ${toolTheme.borderStrong}`,
      }}
    >
      {children}
    </span>
  )
}

export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "soft" | "success" | "warning"
}) {
  const styles = {
    default: { background: "#fff4ec", border: toolTheme.border, color: toolTheme.slate },
    soft: { background: "#fff7f2", border: "#f3d4c1", color: toolTheme.body },
    success: { background: "#ecfdf5", border: "#a7f3d0", color: "#047857" },
    warning: { background: "#fffbeb", border: "#fde68a", color: "#92400e" },
  }[tone]

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        padding: "8px 12px",
        fontSize: "0.82rem",
        fontWeight: 600,
        background: styles.background,
        border: `1px solid ${styles.border}`,
        color: styles.color,
      }}
    >
      {children}
    </span>
  )
}
