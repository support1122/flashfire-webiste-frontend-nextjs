import { Metadata } from "next";

export { default } from "@/app/features/linkedin-profile-optimization-tool/page";

export const metadata: Metadata = {
  title: "LinkedIn Profile Optimization for Recruiter Visibility | Flashfire Canada",
  description:
    "Optimize your LinkedIn profile to boost recruiter visibility. FlashFire optimizes your LinkedIn to rank higher in recruiter searches and get more interview messages in Canada.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization-tool",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization-tool",
      "x-default": "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
    },
  },
  openGraph: {
    title: "LinkedIn Profile Optimization for Recruiter Visibility | Flashfire Canada",
    description:
      "Rank higher in recruiter searches and get more interview messages with Flashfire's LinkedIn profile optimization.",
    url: "https://www.flashfirejobs.com/en-ca/features/linkedin-profile-optimization-tool",
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
