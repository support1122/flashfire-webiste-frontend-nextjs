import { Metadata } from "next";

export { default } from "@/app/ai-resume-builder/page";

export const metadata: Metadata = {
  title: "AI Resume Builder for Job Seekers | Flashfire Australia",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for in Australia.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-resume-builder",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-resume-builder",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-resume-builder",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-resume-builder",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-resume-builder",
      "x-default": "https://www.flashfirejobs.com/ai-resume-builder",
    },
  },
};
