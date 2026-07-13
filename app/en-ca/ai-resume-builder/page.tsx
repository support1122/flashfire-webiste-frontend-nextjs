import { Metadata } from "next";

export { default } from "@/app/ai-resume-builder/page";

export const metadata: Metadata = {
  title: "AI Resume Builder for Job Seekers | Flashfire Canada",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for in Canada.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ai-resume-builder",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-resume-builder",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-resume-builder",
      "x-default": "https://www.flashfirejobs.com/ai-resume-builder",
    },
  },
};
