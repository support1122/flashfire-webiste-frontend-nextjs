import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATS Resume Optimizer | Tailor Your Resume with AI - Flashfire",
  description: "Get your resume ATS-ready in minutes. We optimize your base resume for each job description, ensuring it's perfectly tailored to pass ATS filters and land more interviews.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

