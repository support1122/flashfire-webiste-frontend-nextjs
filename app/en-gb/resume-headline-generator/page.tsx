import { Metadata } from "next";

export { default } from "@/app/resume-headline-generator/page";

export const metadata: Metadata = {
  title: "Resume Headline Generator | Flashfire UK",
  description: "Generate 5 AI-powered, recruiter-tested resume headlines instantly. Free resume headline generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/resume-headline-generator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/resume-headline-generator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/resume-headline-generator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/resume-headline-generator",
      "en-AU": "https://www.flashfirejobs.com/en-au/resume-headline-generator",
      "x-default": "https://www.flashfirejobs.com/resume-headline-generator",
    },
  },
};
