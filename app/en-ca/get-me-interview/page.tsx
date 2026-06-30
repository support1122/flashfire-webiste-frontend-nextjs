import { Metadata } from "next";

export { default } from "@/app/get-me-interview/page";

export const metadata: Metadata = {
  title: "Get Me an Interview | Flashfire Canada",
  description:
    "Unlock Flashfire’s human-powered, AI-assisted job search system built for Canadian job seekers. Track every application and land interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/get-me-interview",
    languages: {
      "en-US": "https://www.flashfirejobs.com/get-me-interview",
      "en-CA": "https://www.flashfirejobs.com/en-ca/get-me-interview",
      "x-default": "https://www.flashfirejobs.com/get-me-interview",
    },
  },
  openGraph: {
    title: "Get Me an Interview | Flashfire Canada",
    description:
      "Activate Flashfire’s end-to-end job application engine: resume tailoring, job automation, tracking, and updates—all for Canada.",
    url: "https://www.flashfirejobs.com/en-ca/get-me-interview",
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

