import { Metadata } from "next";

export { default } from "@/app/ats-score-checker/page";

export const metadata: Metadata = {
  title: "Free ATS Resume Score Checker | Flashfire Canada",
  description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/ats-score-checker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/ats-score-checker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/ats-score-checker",
      "x-default": "https://www.flashfirejobs.com/ats-score-checker",
    },
  },
  openGraph: {
    title: "Free ATS Resume Score Checker | Flashfire Canada",
    description: "Check your resume ATS score instantly. Get detailed feedback and improvement tips. Free ATS score checker.",
    url: "https://www.flashfirejobs.com/en-ca/ats-score-checker",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
};
