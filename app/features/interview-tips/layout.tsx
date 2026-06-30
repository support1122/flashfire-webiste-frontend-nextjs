import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Interview Practice Tool for Mock Interviews & Feedback",
  description: "Practice mock interviews with FlashFire's AI interview tool. Get instant feedback, improve answers, and prepare confidently for real interviews.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/interview-tips",
    languages: {
      "en-US": "https://www.flashfirejobs.com/features/interview-tips",
      "en-CA": "https://www.flashfirejobs.com/en-ca/features/interview-tips",
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
