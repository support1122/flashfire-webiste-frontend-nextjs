import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";

export const metadata: Metadata = {
  title: "AI Job Application Software to Apply for Jobs Automatically",
  description:
    "Flashfire is an AI job application software that helps you apply for jobs automatically with ATS-optimized resumes and targeted applications.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    languages: {
      "en-US": "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
      "en-CA": "https://www.flashfirejobs.com/en-ca/how-flashfire-ai-job-automation-platform-works",
      "x-default": "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    },
  },
  openGraph: {
    title: "AI Job Application Software to Apply for Jobs Automatically",
    description:
      "Flashfire is an AI job application software that helps you apply for jobs automatically with ATS-optimized resumes and targeted applications.",
    url: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Flashfire AI Job Automation Works",
    description: "See how Flashfire automates your job search with AI-optimized applications and targeted resume submissions.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}

