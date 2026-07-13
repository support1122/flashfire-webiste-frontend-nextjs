import { Metadata } from "next";

export { default } from "@/app/ai-remote-job-search-platform/page";

export const metadata: Metadata = {
  title: "AI Remote Job Search Platform | Flashfire Canada",
  description:
    "Discover remote jobs across Canada, US, and global markets with Flashfire's AI-powered remote job search platform.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ai-remote-job-search-platform",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ai-remote-job-search-platform",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ai-remote-job-search-platform",
      "x-default": "https://www.flashfirejobs.com/ai-remote-job-search-platform",
    },
  },
};
