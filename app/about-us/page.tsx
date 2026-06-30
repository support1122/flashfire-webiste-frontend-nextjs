import { Metadata } from "next";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "About Flashfire — AI Job Search Automation Platform",
  description:
    "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster in the US & Canada.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/about-us",
  },
  openGraph: {
    title: "About Flashfire — AI Job Search Automation Platform",
    description:
      "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster in the US & Canada.",
    url: "https://www.flashfirejobs.com/about-us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Flashfire — AI Job Search Automation Platform",
    description: "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function AboutUsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Job Application Service | Job Application Automation",
    "url": "https://www.flashfirejobs.com/about-us",
    "description": "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster in the US & Canada.",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <AboutUs />
      <Footer />
    </>
  );
}

