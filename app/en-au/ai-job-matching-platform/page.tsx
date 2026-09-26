import { Metadata } from "next";

export { default } from "@/app/ai-job-matching-platform/page";

export const metadata: Metadata = {
  title: "AI Job Matching Platform | Flashfire Australia",
  description:
    "Flashfire's AI job matching platform connects your skills, experience, and goals with the right roles across the Australian market.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/ai-job-matching-platform",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-job-matching-platform",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-job-matching-platform",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-job-matching-platform",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-job-matching-platform",
      "x-default": "https://www.flashfirejobs.com/ai-job-matching-platform",
    },
  },
};
