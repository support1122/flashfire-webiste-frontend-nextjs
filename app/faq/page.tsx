import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Flashfire Job Search Automation",
  description:
    "Find answers to common questions about Flashfire's job search automation service, pricing, how it works, and more.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description:
      "Find answers to common questions about Flashfire's job search automation.",
    url: "https://www.flashfirejobs.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "5rem", minHeight: "60vh" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: 700,
            margin: "2rem auto 1rem",
            maxWidth: "800px",
            padding: "0 1rem",
          }}
        >
          Frequently Asked Questions
        </h1>
        <HomePageFAQ />
      </main>
      <Footer />
    </>
  );
}

