import { Metadata } from "next";
import UKHome from "@/src/components/countries/uk/Home";

export const metadata: Metadata = {
  title: "Flashfire: AI Job Search Automation UK",
  description:
    "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-gb",
    languages: {
      "en-US": "https://www.flashfirejobs.com/",
      "en-CA": "https://www.flashfirejobs.com/en-ca",
      "en-GB": "https://www.flashfirejobs.com/en-gb",
      "en-AU": "https://www.flashfirejobs.com/en-au",
      "x-default": "https://www.flashfirejobs.com/",
    },
  },
  openGraph: {
    title: "Flashfire: AI Job Search Automation UK",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    url: "https://www.flashfirejobs.com/en-gb",
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

export default function HomeUK() {
  return <UKHome />;
}

