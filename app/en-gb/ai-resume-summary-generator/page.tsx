import { Metadata } from "next";

export { default } from "@/app/ai-resume-summary-generator/page";

export const metadata: Metadata = {
  title: "AI Resume Summary Generator | Flashfire UK",
  description: "Generate a compelling professional resume summary in seconds. Free AI resume summary generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/ai-resume-summary-generator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-resume-summary-generator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-resume-summary-generator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-resume-summary-generator",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-resume-summary-generator",
      "x-default": "https://www.flashfirejobs.com/ai-resume-summary-generator",
    },
  },
};
