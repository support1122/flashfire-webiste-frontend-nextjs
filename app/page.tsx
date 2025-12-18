import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";

export const metadata: Metadata = {
  title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster",
  description:
    "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/",
  },
  openGraph: {
    title: "FLASHFIRE - AI-Powered Job Search Automation",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    url: "https://www.flashfirejobs.com/",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
