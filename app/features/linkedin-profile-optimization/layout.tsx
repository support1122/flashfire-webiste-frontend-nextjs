import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best LinkedIn Profile Optimization Services to Rank Higher | FlashFire",
  description: "FlashFire offers LinkedIn profile optimization services to help job seekers rank higher in recruiter searches and improve their LinkedIn profile ranking.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/linkedin-profile-optimization",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Profile Optimization — Flashfire",
    description: "Optimize your LinkedIn profile to rank higher in recruiter searches and convert profile views into interview messages with Flashfire.",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
