import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlashFire - AI Job Search Automation | Get Hired Faster",
  description:
    "Automate your job search with tailored resumes and applications. Apply to 1000+ jobs, save 150+ hours, and track your job hunt with real-time updates.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/Get-Started",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
