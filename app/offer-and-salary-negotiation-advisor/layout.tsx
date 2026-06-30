import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.flashfirejobs.com/offer-and-salary-negotiation-advisor",
    languages: {
      "en-US": "https://www.flashfirejobs.com/offer-and-salary-negotiation-advisor",
      "en-CA": "https://www.flashfirejobs.com/en-ca/offer-and-salary",
      "x-default": "https://www.flashfirejobs.com/offer-and-salary-negotiation-advisor",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Offer & Salary Negotiation Advisor — Flashfire",
    description: "Get AI-powered salary negotiation advice and offer evaluation to maximize your compensation with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
