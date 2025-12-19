import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "How It Works - Flashfire Job Search Automation | Flashfire",
  description:
    "Learn how Flashfire automates your job search. We apply to 1000+ jobs with tailored resumes, saving you 150+ hours. See how our AI-powered platform works.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/how-it-works",
  },
  openGraph: {
    title: "How It Works - Flashfire Job Search Automation",
    description:
      "Learn how Flashfire automates your job search with AI-powered resume tailoring and automated applications.",
    url: "https://www.flashfirejobs.com/en-ca/how-it-works",
    type: "website",
  },
};

export default function HowItWorksPageCA() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="demo" />
    </>
  );
}
