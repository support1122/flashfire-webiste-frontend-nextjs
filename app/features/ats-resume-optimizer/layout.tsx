import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATS Resume Optimizer & Free ATS Resume Checker",
  description: "Flashfire is an AI resume optimizer and free ATS resume checker that scans your resume against job descriptions, improves ATS compatibility, and boosts recruiter visibility.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

