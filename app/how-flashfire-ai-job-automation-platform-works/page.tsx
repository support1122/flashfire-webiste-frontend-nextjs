import { Metadata } from "next";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";

export const metadata: Metadata = {
  title: "Job Search Automation Platform to Land More Interviews",
  description:
    "Automate your job search with FlashFire. Optimize your resume, apply to relevant jobs, track applications, and land more interview calls faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    languages: {
      "en-US": "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
      "en-CA": "https://www.flashfirejobs.com/en-ca/how-flashfire-ai-job-automation-platform-works",
      "en-GB": "https://www.flashfirejobs.com/en-gb/how-flashfire-ai-job-automation-platform-works",
      "en-AU": "https://www.flashfirejobs.com/en-au/how-flashfire-ai-job-automation-platform-works",
      "x-default": "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    },
  },
  openGraph: {
    title: "Job Search Automation Platform to Land More Interviews",
    description:
      "Automate your job search with FlashFire. Optimize your resume, apply to relevant jobs, track applications, and land more interview calls faster.",
    url: "https://www.flashfirejobs.com/how-flashfire-ai-job-automation-platform-works",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
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

