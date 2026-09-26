import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "Flashfire UK Pricing: Affordable Job Automation Plans",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/pricing",
    languages: {
      "en-US": "https://www.flashfirejobs.com/pricing",
      "en-CA": "https://www.flashfirejobs.com/en-ca/pricing",
      "en-GB": "https://www.flashfirejobs.com/en-gb/pricing",
      "en-AU": "https://www.flashfirejobs.com/en-au/pricing",
      "x-default": "https://www.flashfirejobs.com/pricing",
    },
  },
  openGraph: {
    title: "Flashfire UK Pricing: Affordable Job Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/en-gb/pricing",
    type: "website",
  },
};

export default function PricingPageUK() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flashfire",
    "url": "https://www.flashfirejobs.com/en-gb/pricing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered job search automation platform that finds jobs, optimizes resumes, and applies to roles on your behalf — for UK job seekers.",
    "offers": [
      {
        "@type": "Offer",
        "name": "PRIME",
        "price": "79",
        "priceCurrency": "GBP",
        "url": "https://www.flashfirejobs.com/en-gb/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "IGNITE",
        "price": "149",
        "priceCurrency": "GBP",
        "url": "https://www.flashfirejobs.com/en-gb/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "PROFESSIONAL",
        "price": "299",
        "priceCurrency": "GBP",
        "url": "https://www.flashfirejobs.com/en-gb/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "EXECUTIVE",
        "price": "499",
        "priceCurrency": "GBP",
        "url": "https://www.flashfirejobs.com/en-gb/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Navbar />
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
