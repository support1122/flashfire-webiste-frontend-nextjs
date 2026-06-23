import { Metadata } from "next";
import AIResumeBuilderPageClient from "./AIResumeBuilderClient";

export const metadata: Metadata = {
  title: "AI Resume Builder | Flashfire",
  description: "Build an ATS-optimized resume in minutes with Flashfire's AI Resume Builder. Get more interviews with a professionally crafted resume tailored to your target job.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-resume-builder",
  },
  openGraph: {
    title: "AI Resume Builder | Flashfire",
    description: "Build an ATS-optimized resume in minutes with Flashfire's AI Resume Builder.",
    url: "https://www.flashfirejobs.com/ai-resume-builder",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flashfire",
      },
    ],
  },
};

export default function Page() {
  return <AIResumeBuilderPageClient />;
}
