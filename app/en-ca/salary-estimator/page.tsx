import { Metadata } from "next";

export { default } from "@/app/salary-estimator/page";

export const metadata: Metadata = {
  title: "Salary Estimator – Realistic Salary Range by Role | Flashfire Canada",
  description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/salary-estimator",
    languages: {
      "en-US": "https://www.flashfirejobs.com/salary-estimator",
      "en-CA": "https://www.flashfirejobs.com/en-ca/salary-estimator",
      "x-default": "https://www.flashfirejobs.com/salary-estimator",
    },
  },
  openGraph: {
    title: "Salary Estimator – Realistic Salary Range by Role | Flashfire Canada",
    description: "Estimate a salary range based on role, experience, location, and skill premium. Great for job offer planning and negotiation.",
    url: "https://www.flashfirejobs.com/en-ca/salary-estimator",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};
