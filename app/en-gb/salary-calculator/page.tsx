import { Metadata } from "next";

export { default } from "@/app/salary-calculator/page";

export const metadata: Metadata = {
  title: "Salary Calculator – Estimate Take-Home Pay | Flashfire UK",
  description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and provincial tax estimates.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb/salary-calculator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/salary-calculator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/salary-calculator",
      "en-GB": "https://www.flashfirejobs.com/en-gb/salary-calculator",
      "en-AU": "https://www.flashfirejobs.com/en-au/salary-calculator",
      "x-default": "https://www.flashfirejobs.com/salary-calculator",
    },
  },
  openGraph: {
    title: "Salary Calculator – Estimate Take-Home Pay | Flashfire UK",
    description: "Calculate your take-home pay from annual salary. Includes bonus, pre-tax deductions, federal and provincial tax estimates.",
    url: "https://www.flashfirejobs.com/en-gb/salary-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
