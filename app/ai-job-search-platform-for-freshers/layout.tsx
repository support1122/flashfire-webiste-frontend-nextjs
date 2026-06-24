import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Job Search Platform for Freshers | Flashfire",
  description:
    "Use Flashfire's AI job search platform for freshers to discover internships and entry-level roles that match your skills and goals.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-job-search-platform-for-freshers",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Search Platform for Freshers — Flashfire",
    description: "Fresh graduate? Flashfire automates your job search so you can apply to hundreds of roles with optimized resumes and get interviews faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

