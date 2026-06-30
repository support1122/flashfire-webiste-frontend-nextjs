import { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing - Affordable Job Search Automation Plans | Flashfire",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/pricing",
    languages: {
      "en-US": "https://www.flashfirejobs.com/pricing",
      "en-CA": "https://www.flashfirejobs.com/en-ca/pricing",
      "x-default": "https://www.flashfirejobs.com/pricing",
    },
  },
  openGraph: {
    title: "Pricing - Affordable Job Search Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/pricing",
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

export default function PricingPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing - Affordable Job Search Automation Plans | Flashfire",
    "url": "https://www.flashfirejobs.com/pricing",
    "description": "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flashfire",
    "url": "https://www.flashfirejobs.com/pricing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered job search automation platform that finds jobs, optimizes resumes, and applies to roles on your behalf.",
    "offers": [
      {
        "@type": "Offer",
        "name": "PRIME",
        "price": "99",
        "priceCurrency": "USD",
        "url": "https://www.flashfirejobs.com/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "IGNITE",
        "price": "199",
        "priceCurrency": "USD",
        "url": "https://www.flashfirejobs.com/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "PROFESSIONAL",
        "price": "349",
        "priceCurrency": "USD",
        "url": "https://www.flashfirejobs.com/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "EXECUTIVE",
        "price": "599",
        "priceCurrency": "USD",
        "url": "https://www.flashfirejobs.com/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <PricingPageClient />
    </>
  );
}

