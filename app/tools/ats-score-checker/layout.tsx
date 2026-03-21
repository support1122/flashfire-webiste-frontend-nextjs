import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free ATS Score Checker — Check Your Resume ATS Score | FlashFire",
  description:
    "Upload your resume and get an instant ATS compatibility score. 12 industrial-grade checks with detailed feedback. Free, no signup required.",
  openGraph: {
    title: "Free ATS Score Checker | FlashFire",
    description:
      "Check your resume's ATS compatibility score instantly. 12 detailed checks, actionable feedback.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
