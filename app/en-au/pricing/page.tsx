import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "Flashfire AU Pricing: Affordable Job Automation Plans",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/pricing",
    languages: {
      "en-US": "https://www.flashfirejobs.com/pricing",
      "en-CA": "https://www.flashfirejobs.com/en-ca/pricing",
      "en-GB": "https://www.flashfirejobs.com/en-gb/pricing",
      "en-AU": "https://www.flashfirejobs.com/en-au/pricing",
      "x-default": "https://www.flashfirejobs.com/pricing",
    },
  },
  openGraph: {
    title: "Flashfire AU Pricing: Affordable Job Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/en-au/pricing",
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

export default function PricingPageAU() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flashfire",
    "url": "https://www.flashfirejobs.com/en-au/pricing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered job search automation platform that finds jobs, optimizes resumes, and applies to roles on your behalf — for Australian job seekers.",
    "offers": [
      {
        "@type": "Offer",
        "name": "PRIME",
        "price": "99",
        "priceCurrency": "AUD",
        "url": "https://www.flashfirejobs.com/en-au/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "IGNITE",
        "price": "299",
        "priceCurrency": "AUD",
        "url": "https://www.flashfirejobs.com/en-au/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "PROFESSIONAL",
        "price": "549",
        "priceCurrency": "AUD",
        "url": "https://www.flashfirejobs.com/en-au/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "EXECUTIVE",
        "price": "899",
        "priceCurrency": "AUD",
        "url": "https://www.flashfirejobs.com/en-au/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Navbar />
      <h1 className="sr-only">Flashfire AU Pricing: Affordable Job Automation Plans</h1>
      <HomePagePricingPlans />
      <HomePageOfferLetters
        heading="60+ Offer letters received"
        enableLoopControls
        buttonOnlyScroll
      />
      <div className="mt-[55px] md:mt-[70px]">
        <HomePageHappyUsers variant="pricing" />
      </div>
      <HomePageHappyUsers variant="pricingVideos" />
      <HomePageFoundersNote variant="pricing" />
      <HomePageFAQ />
      <Footer />
    </>
  );
}
