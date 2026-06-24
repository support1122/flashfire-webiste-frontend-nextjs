import { Metadata } from "next";

export const metadata: Metadata = {
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
