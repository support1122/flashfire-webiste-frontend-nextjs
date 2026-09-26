import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview Practice Tool for Mock Interviews",
  description: "Practice real interview questions, improve your answers with instant feedback, build confidence, and prepare for interviews with FlashFire's interview practice tool.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/interview-tips",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/interview-tips",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/interview-tips",
      "en-GB": "https://www.flashfirejobs.com/en-gb/features/interview-tips",
      "en-AU": "https://www.flashfirejobs.com/en-au/features/interview-tips",
      "x-default": "https://www.flashfirejobs.com/features/interview-tips",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Interview Practice Tool — Flashfire",
    description: "Practice mock interviews with AI, get instant feedback, and prepare confidently for real interviews with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
