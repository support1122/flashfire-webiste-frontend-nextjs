import { Metadata } from "next";

export { default } from "@/app/features/job-application-tracker/page";

export const metadata: Metadata = {
  title: "Job Application Tracker to Track Job Applications | Flashfire Canada",
  description:
    "Track job applications in one place with FlashFire's job application tracker. Organize jobs, monitor interviews, and optimize your Canadian job search faster.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/features/job-application-tracker",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/job-application-tracker",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/job-application-tracker",
      "x-default": "https://www.flashfirejobs.com/features/job-application-tracker",
    },
  },
  openGraph: {
    title: "Job Application Tracker to Track Job Applications | Flashfire Canada",
    description:
      "Organize jobs, monitor interviews, and optimize your job search faster with FlashFire's job application tracker.",
    url: "https://www.flashfirejobs.com/en-ca/features/job-application-tracker",
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
