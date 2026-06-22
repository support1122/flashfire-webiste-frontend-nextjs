import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Job Matching Platform | Flashfire",
  description:
    "Flashfire's AI job matching platform connects your skills, experience, and goals with the right roles across the market.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-job-matching-platform",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

