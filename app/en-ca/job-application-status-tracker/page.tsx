import { Metadata } from "next";

export { default } from "@/app/job-application-status-tracker/page";

export const metadata: Metadata = {
  title: "Job Application Status Tracker with AI | Flashfire Canada",
  description:
    "Track every job application, follow-up, and interview in one AI-powered job application status tracker.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/job-application-status-tracker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/job-application-status-tracker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/job-application-status-tracker",
      "x-default": "https://www.flashfirejobs.com/job-application-status-tracker",
    },
  },
};
