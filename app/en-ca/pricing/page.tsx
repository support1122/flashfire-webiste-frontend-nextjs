import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "Flashfire CA Pricing: Affordable Job Automation Plans",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/pricing",
    languages: {
      "en-US": "https://www.flashfirejobs.com/pricing",
      "en-CA": "https://www.flashfirejobs.com/en-ca/pricing",
      "x-default": "https://www.flashfirejobs.com/pricing",
    },
  },
  openGraph: {
    title: "Flashfire CA Pricing: Affordable Job Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/en-ca/pricing",
    type: "website",
  },
};

export default function PricingPageCA() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Flashfire",
    "url": "https://www.flashfirejobs.com/en-ca/pricing",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered job search automation platform that finds jobs, optimizes resumes, and applies to roles on your behalf — for Canadian job seekers.",
    "offers": [
      {
        "@type": "Offer",
        "name": "PRIME",
        "price": "139",
        "priceCurrency": "CAD",
        "url": "https://www.flashfirejobs.com/en-ca/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "IGNITE",
        "price": "239",
        "priceCurrency": "CAD",
        "url": "https://www.flashfirejobs.com/en-ca/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "PROFESSIONAL",
        "price": "409",
        "priceCurrency": "CAD",
        "url": "https://www.flashfirejobs.com/en-ca/pricing",
        "availability": "https://schema.org/InStock",
        "category": "OneTime"
      },
      {
        "@type": "Offer",
        "name": "EXECUTIVE",
        "price": "799",
        "priceCurrency": "CAD",
        "url": "https://www.flashfirejobs.com/en-ca/pricing",
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
