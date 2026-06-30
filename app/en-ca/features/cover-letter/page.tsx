import { Metadata } from "next";

export { default } from "@/app/features/cover-letter/page";

export const metadata: Metadata = {
  title: "AI Cover Letter Builder | Flashfire Canada",
  description:
    "Generate personalized cover letters tailored to each Canadian role without writing from scratch. Flashfire keeps tone, proof, and keywords on point.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/cover-letter",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/cover-letter",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/cover-letter",
      "x-default": "https://www.flashfirejobs.com/features/cover-letter",
    },
  },
  openGraph: {
    title: "AI Cover Letter Builder | Flashfire Canada",
    description:
      "Craft compelling cover letters fast using Flashfire’s AI + human review workflow designed for Canadian employers.",
    url: "https://www.flashfirejobs.com/en-ca/features/cover-letter",
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

