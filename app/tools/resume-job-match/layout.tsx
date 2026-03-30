import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Resume Job Match Analyzer — Match Resume to Any Job | FlashFire",
  description:
    "Upload your resume and paste a job description to see how well they match. Get keyword gaps, skills analysis, and tailored recommendations. Free, no signup.",
  openGraph: {
    title: "Free Resume Job Match Analyzer | FlashFire",
    description:
      "See how well your resume matches any job description. Skills gap analysis, missing keywords, and recommendations.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
