import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "Features - AI-Powered Job Search Automation | Flashfire",
  description:
    "Discover Flashfire's powerful features: automated job applications, AI resume tailoring, real-time tracking, and more to accelerate your job search.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/feature",
  },
  openGraph: {
    title: "Features - AI-Powered Job Search Automation",
    description:
      "Discover Flashfire's powerful features for automated job search.",
    url: "https://www.flashfirejobs.com/feature",
    type: "website",
  },
};

export default function FeaturePage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="feature" />
    </>
  );
}

