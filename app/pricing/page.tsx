import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "Pricing - Affordable Job Search Automation Plans | Flashfire",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/pricing",
  },
  openGraph: {
    title: "Pricing - Affordable Job Search Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="pricing" />
    </>
  );
}

