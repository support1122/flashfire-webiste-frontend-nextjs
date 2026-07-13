import { Metadata } from "next";

export { default } from "@/app/features/automated-job-applications/page";

export const metadata: Metadata = {
  title: "Job Application Automation Tool | AI Job Applications | Flashfire Canada",
  description:
    "Flashfire is an AI job application automation tool that helps Canadian job seekers automate job applications, beat ATS filters, and land interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/automated-job-applications",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/automated-job-applications",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/automated-job-applications",
      "x-default": "https://www.flashfirejobs.com/features/automated-job-applications",
    },
  },
  openGraph: {
    title: "Job Application Automation Tool | AI Job Applications | Flashfire Canada",
    description:
      "Automate job applications, beat ATS filters, and land interviews faster with Flashfire's AI job application automation tool.",
    url: "https://www.flashfirejobs.com/en-ca/features/automated-job-applications",
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
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};
