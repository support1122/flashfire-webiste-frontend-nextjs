import { Metadata } from "next";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "About Us - Flashfire | Our Story, Mission & Vision",
  description:
    "Learn about Flashfire's founders, our mission to help job seekers, and how we're revolutionizing the job search process with AI-powered automation.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/about-us",
  },
  openGraph: {
    title: "About Us - Flashfire",
    description:
      "Learn about Flashfire's founders, our mission to help job seekers, and how we're revolutionizing the job search process.",
    url: "https://www.flashfirejobs.com/about-us",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <Footer />
    </>
  );
}

