import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HappyUsersGalleryPage from "@/src/components/homePageHappyUsers/HappyUsersGalleryPage";
import ImagePreloader from "./ImagePreloader";

export const metadata: Metadata = {
  title: "Success Stories & Testimonials | Flashfire",
  description:
    "See real success stories from job seekers who landed their dream jobs with Flashfire. Read testimonials from professionals who automated their job search and saved 150+ hours.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/testimonials",
  },
  openGraph: {
    title: "Success Stories & Testimonials | Flashfire",
    description:
      "See real success stories from job seekers who landed their dream jobs with Flashfire.",
    url: "https://www.flashfirejobs.com/testimonials",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/favicon.svg",
        width: 803,
        height: 781,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/favicon.svg"],
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <ImagePreloader />
      <Navbar />
      <HappyUsersGalleryPage />
      <Footer />
    </>
  );
}

