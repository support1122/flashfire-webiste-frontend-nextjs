import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/job-automation",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/job-automation",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/job-automation",
      "x-default": "https://www.flashfirejobs.com/features/job-automation",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Job Application Automation — Flashfire",
    description: "Automate your job applications with AI. Apply to 1,000+ roles with ATS-optimized resumes and get interviews faster with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
