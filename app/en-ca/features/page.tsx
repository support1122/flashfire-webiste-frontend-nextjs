import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import Features from "@/src/components/pages/features/Features";

export const metadata: Metadata = {
  title: "Features - Why Choose Flashfire",
  description:
    "Explore Flashfire's key features: AI-powered matching, dynamic resume optimization, LinkedIn optimization, precision targeting, and more.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features",
  },
};

export default function FeaturesPageCA() {
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

