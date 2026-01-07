import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Job Application Tracker to Monitor Applications Live",
  description: "Track, organize, and optimize your job search. Save, apply, track, and revisit job applications — all from one clean, streamlined FlashFire dashboard.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

