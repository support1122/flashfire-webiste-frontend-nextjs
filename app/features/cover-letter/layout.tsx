import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/cover-letter",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/cover-letter",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/cover-letter",
      "x-default": "https://www.flashfirejobs.com/features/cover-letter",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator — Flashfire",
    description: "Create personalized, ATS-optimized cover letters tailored to each job in minutes with Flashfire's AI cover letter builder.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
