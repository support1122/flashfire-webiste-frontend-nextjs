import { Metadata } from "next";

export { default } from "@/app/ai-job-alerts/page";

export const metadata: Metadata = {
  title: "AI Job Alerts & Smart Job Notifications | Flashfire Canada",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile in Canada.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ai-job-alerts",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-job-alerts",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-job-alerts",
      "x-default": "https://www.flashfirejobs.com/ai-job-alerts",
    },
  },
};
