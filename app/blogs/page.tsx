import { Metadata } from "next";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Blog - Career Tips, Job Search Advice & Industry Insights | Flashfire",
  description:
    "Discover expert career tips, job search strategies, resume writing guides, and industry insights to accelerate your job search success.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/blogs",
  },
  openGraph: {
    title: "Blog - Career Tips & Job Search Advice",
    description:
      "Discover expert career tips, job search strategies, and industry insights.",
    url: "https://www.flashfirejobs.com/blogs",
    type: "website",
  },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <BlogsClient />
      <Footer />
    </>
  );
}
