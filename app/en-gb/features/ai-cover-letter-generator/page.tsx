import { Metadata } from "next";

export { default } from "@/app/features/ai-cover-letter-generator/page";

export const metadata: Metadata = {
  title: "AI Cover Letter Builder for ATS-Friendly Job Applications | Flashfire UK",
  description:
    "Flashfire's AI cover letter builder helps UK job seekers generate job-specific, ATS-friendly cover letters in minutes using AI-powered customization.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/features/ai-cover-letter-generator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/ai-cover-letter-generator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/ai-cover-letter-generator",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/ai-cover-letter-generator",
      "x-default": "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
    },
  },
  openGraph: {
    title: "AI Cover Letter Builder for ATS-Friendly Job Applications | Flashfire UK",
    description:
      "Generate job-specific, ATS-friendly cover letters in minutes with Flashfire's AI-powered customization, built for UK job seekers.",
    url: "https://www.flashfirejobs.com/en-gb/features/ai-cover-letter-generator",
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
