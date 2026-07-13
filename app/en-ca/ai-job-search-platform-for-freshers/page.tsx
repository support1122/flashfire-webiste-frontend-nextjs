import { Metadata } from "next";

export { default } from "@/app/ai-job-search-platform-for-freshers/page";

export const metadata: Metadata = {
  title: "AI Job Search Platform for Freshers | Flashfire Canada",
  description:
    "Use Flashfire's AI job search platform for freshers to discover internships and entry-level roles that match your skills and goals in Canada.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ai-job-search-platform-for-freshers",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-job-search-platform-for-freshers",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-job-search-platform-for-freshers",
      "x-default": "https://www.flashfirejobs.com/ai-job-search-platform-for-freshers",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Search Platform for Freshers — Flashfire Canada",
    description: "Fresh graduate? Flashfire automates your job search so you can apply to hundreds of roles with optimized resumes and get interviews faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};
