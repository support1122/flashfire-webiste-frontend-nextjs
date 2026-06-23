import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import Features from "@/src/components/pages/features/Features";

export const metadata: Metadata = {
  title: "AI-Powered Job Search & Job Search Automation",
  description:
    "Flashfire offers AI-powered job search and job search automation to apply smarter, optimize resumes, and get interview calls faster.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features",
  },
  openGraph: {
    title: "AI-Powered Job Search & Job Search Automation",
    description:
      "Flashfire offers AI-powered job search and job search automation to apply smarter, optimize resumes, and get interview calls faster.",
    url: "https://www.flashfirejobs.com/features",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
};

export default function FeaturesPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <Features />
      </main>
      <Footer />
    </div>
  );
}


