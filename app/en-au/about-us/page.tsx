import { Metadata } from "next";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "About Flashfire — AI Job Search Automation Platform (Australia)",
  description:
    "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps Australian job seekers land interviews faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/about-us",
    languages: {
      "en-US": "https://www.flashfirejobs.com/about-us",
      "en-CA": "https://www.flashfirejobs.com/en-ca/about-us",
      "en-GB": "https://www.flashfirejobs.com/en-gb/about-us",
      "en-AU": "https://www.flashfirejobs.com/en-au/about-us",
      "x-default": "https://www.flashfirejobs.com/about-us",
    },
  },
  openGraph: {
    title: "About Flashfire — AI Job Search Automation Platform (Australia)",
    description:
      "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps Australian job seekers land interviews faster.",
    url: "https://www.flashfirejobs.com/en-au/about-us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Flashfire — AI Job Search Automation Platform (Australia)",
    description: "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps Australian job seekers land interviews faster.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function AboutUsPageAU() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Job Application Service | Job Application Automation (Australia)",
    "url": "https://www.flashfirejobs.com/en-au/about-us",
    "description": "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps Australian job seekers land interviews faster.",
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
