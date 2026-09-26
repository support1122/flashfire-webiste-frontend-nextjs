import { Metadata } from "next";

export { default } from "@/app/ai-career-assessment-skill-gap-analysis/page";

export const metadata: Metadata = {
  title: "AI Career Assessment & Skill Gap Analysis Tool | Flashfire Australia",
  description:
    "Run an AI-powered career assessment and skill gap analysis to understand your strengths, weaknesses, and best-fit roles in the Australian job market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-career-assessment-skill-gap-analysis",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-career-assessment-skill-gap-analysis",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-career-assessment-skill-gap-analysis",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-career-assessment-skill-gap-analysis",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-career-assessment-skill-gap-analysis",
      "x-default": "https://www.flashfirejobs.com/ai-career-assessment-skill-gap-analysis",
    },
  },
};
