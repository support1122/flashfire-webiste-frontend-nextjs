import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Search Analytics Dashboard to Improve Interviews",
  description: "Track job applications, monitor interview rates, and measure your job search performance. FlashFire helps you improve your strategy with actionable insights.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/dashboard-analytics",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/dashboard-analytics",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/dashboard-analytics",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/dashboard-analytics",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/dashboard-analytics",
      "x-default": "https://www.flashfirejobs.com/features/dashboard-analytics",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search Analytics Dashboard — Flashfire",
    description: "Track applications, response rates, and interview conversions with Flashfire's job search analytics dashboard.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
