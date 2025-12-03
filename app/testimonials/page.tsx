import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "Testimonials - Success Stories from Flashfire Users | Flashfire",
  description:
    "Read real testimonials and success stories from job seekers who used Flashfire to land their dream jobs faster with AI-powered job search automation.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/testimonials",
  },
  openGraph: {
    title: "Testimonials - Success Stories from Flashfire Users",
    description:
      "Read real testimonials from job seekers who found success with Flashfire.",
    url: "https://www.flashfirejobs.com/testimonials",
    type: "website",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="testimonials" />
    </>
  );
}

