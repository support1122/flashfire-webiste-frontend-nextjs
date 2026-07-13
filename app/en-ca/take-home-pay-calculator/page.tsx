import { Metadata } from "next";

export { default } from "@/app/take-home-pay-calculator/page";

export const metadata: Metadata = {
  title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire Canada",
  description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and provincial tax to get your net paycheck.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/take-home-pay-calculator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/take-home-pay-calculator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/take-home-pay-calculator",
      "x-default": "https://www.flashfirejobs.com/take-home-pay-calculator",
    },
  },
  openGraph: {
    title: "Take Home Pay Calculator – Net Paycheck Estimator | Flashfire Canada",
    description: "See your actual take-home pay after taxes and deductions. Enter gross pay, frequency, and provincial tax to get your net paycheck.",
    url: "https://www.flashfirejobs.com/en-ca/take-home-pay-calculator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
