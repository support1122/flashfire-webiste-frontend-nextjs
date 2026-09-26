import { Metadata } from "next";
import RefundPolicy from "@/src/components/legal/RefundPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Refund Policy - Flashfire Guarantee & Eligibility",
  description:
    "Understand Flashfire's refund policy, eligibility criteria, and process for requesting a refund on our job search automation services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/refund-policy",
  },
  openGraph: {
    title: "Refund Policy - Flashfire Guarantee & Eligibility",
    description:
      "Understand Flashfire's refund policy, eligibility criteria, and process for requesting a refund.",
    url: "https://www.flashfirejobs.com/en-au/refund-policy",
    type: "website",
  },
};

export default function RefundPolicyPageAU() {
  return (
    <>
      <Navbar />
      <RefundPolicy />
      <Footer />
    </>
  );
}

