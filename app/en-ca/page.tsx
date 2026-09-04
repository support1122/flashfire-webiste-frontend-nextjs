import { Metadata } from "next";
import CanadaHome from "@/src/components/countries/ca/Home";

export const metadata: Metadata = {
  title: "Flashfire: AI Job Search Automation Canada",
  description:
    "We apply to 1000+ jobs with tailored resumes for every role. Save 150+ hours, skip the grunt work, and track your job hunt with real-time updates.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca",
    languages: {
      "en-US": "https://www.flashfirejobs.com/",
      "en-CA": "https://www.flashfirejobs.com/en-ca",
      "en-GB": "https://www.flashfirejobs.com/en-gb",
      "x-default": "https://www.flashfirejobs.com/",
    },
  },
  openGraph: {
    title: "Flashfire: AI Job Search Automation Canada",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    url: "https://www.flashfirejobs.com/en-ca",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function HomeCA() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Flashfire: AI Job Search Automation Canada",
    "url": "https://www.flashfirejobs.com/en-ca",
    "description": "We apply to 1000+ jobs with tailored resumes for every role. Save 150+ hours, skip the grunt work, and track your job hunt with real-time updates.",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <CanadaHome />
    </>
  );
}

