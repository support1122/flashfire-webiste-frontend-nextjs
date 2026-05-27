import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cover Letter Builder for ATS-Friendly Job Applications",
  description: "Flashfire's AI cover letter builder helps you generate job-specific, ATS-friendly cover letters in minutes using AI-powered customization.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

