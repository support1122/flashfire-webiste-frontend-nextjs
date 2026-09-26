import { Metadata } from "next";

export { default } from "@/app/ai-follow-up-email-generator/page";

export const metadata: Metadata = {
  title: "AI Follow-Up Email Generator for Job Applications | Flashfire UK",
  description:
    "Generate professional, timely follow-up emails for job applications and interviews using Flashfire's AI follow-up email generator.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/ai-follow-up-email-generator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-follow-up-email-generator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-follow-up-email-generator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/ai-follow-up-email-generator",
      "en-AU": "https://www.flashfirejobs.com/en-au/ai-follow-up-email-generator",
      "x-default": "https://www.flashfirejobs.com/ai-follow-up-email-generator",
    },
  },
};
