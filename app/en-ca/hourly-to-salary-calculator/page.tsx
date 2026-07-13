import { Metadata } from "next";

export { default } from "@/app/hourly-to-salary-calculator/page";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire Canada",
  description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/hourly-to-salary-calculator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/hourly-to-salary-calculator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/hourly-to-salary-calculator",
      "x-default": "https://www.flashfirejobs.com/hourly-to-salary-calculator",
    },
  },
  openGraph: {
    title: "Hourly to Salary Calculator – Convert Hourly Pay | Flashfire Canada",
    description: "Convert your hourly wage to annual salary instantly. Includes overtime and weeks-per-year inputs.",
    url: "https://www.flashfirejobs.com/en-ca/hourly-to-salary-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
