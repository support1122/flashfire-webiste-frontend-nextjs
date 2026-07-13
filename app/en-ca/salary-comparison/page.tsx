import { Metadata } from "next";

export { default } from "@/app/salary-comparison/page";

export const metadata: Metadata = {
  title: "Salary Comparison – Compare Two Job Offers | Flashfire Canada",
  description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/salary-comparison",
    languages: {
      "en-US": "https://www.flashfirejobs.com/salary-comparison",
      "en-CA": "https://www.flashfirejobs.com/en-ca/salary-comparison",
      "x-default": "https://www.flashfirejobs.com/salary-comparison",
    },
  },
  openGraph: {
    title: "Salary Comparison – Compare Two Job Offers | Flashfire Canada",
    description: "Compare two job offers side by side including salary, bonus, benefits, and commute costs to find the better total value.",
    url: "https://www.flashfirejobs.com/en-ca/salary-comparison",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
