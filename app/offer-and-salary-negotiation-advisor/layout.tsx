import { Metadata } from "next";

export const metadata: Metadata = {
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
