import { Metadata } from "next";

export const metadata: Metadata = {
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
