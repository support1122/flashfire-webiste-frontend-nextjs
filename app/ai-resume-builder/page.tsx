import { Metadata } from "next";
import AIResumeBuilderPageClient from "./AIResumeBuilderClient";

export const metadata: Metadata = {
  title: "AI Resume Builder — ATS-Optimized | Flashfire",
  description: "Build an ATS-optimized resume in minutes with Flashfire's AI Resume Builder. Get more interviews with a resume tailored to your target job.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-resume-builder",
  },
  openGraph: {
    title: "AI Resume Builder — ATS-Optimized | Flashfire",
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Resume Builder | Flashfire",
    "url": "https://www.flashfirejobs.com/ai-resume-builder",
    "description": "Build an ATS-optimized resume in minutes with Flashfire's AI Resume Builder. Get more interviews with a professionally crafted resume tailored to your target job.",
    "applicationCategory": "BusinessApplication",
    "publisher": {
      "@type": "Organization",
      "name": "Flashfire",
      "url": "https://www.flashfirejobs.com"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AIResumeBuilderPageClient />
    </>
  );
}
