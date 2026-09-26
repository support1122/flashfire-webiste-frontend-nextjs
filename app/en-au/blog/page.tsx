import { Metadata } from "next";
import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flashfire Blog: Australian Career Tips & Job Advice",
  description:
    "Discover expert career tips, job search strategies, resume writing guides, and industry insights to accelerate your job search success.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-au/blog",
    languages: {
      "en-US": "https://www.flashfirejobs.com/blog",
      "en-CA": "https://www.flashfirejobs.com/en-ca/blog",
      "en-GB": "https://www.flashfirejobs.com/en-gb/blog",
      "en-AU": "https://www.flashfirejobs.com/en-au/blog",
      "x-default": "https://www.flashfirejobs.com/blog",
    },
  },
  openGraph: {
    title: "Flashfire Blog: Australian Career Tips & Job Advice",
    description:
      "Discover expert career tips, job search strategies, and industry insights.",
    url: "https://www.flashfirejobs.com/en-au/blog",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function BlogPageAU() {
  return (
    <>
      <Navbar />
      <section
        style={{
          maxWidth: "800px",
          margin: "6rem auto 0",
          padding: "2rem 1.5rem 0",
          fontFamily: "inherit",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem", color: "#111" }}>
          Career Tips &amp; Job Advice for Australian Job Seekers
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#444", marginBottom: "1rem" }}>
          Whether you&rsquo;re a new graduate, a skilled worker, or an international student looking to build your career in Australia, the job market can feel overwhelming. Thousands of roles are posted every day across Sydney, Melbourne, Brisbane, and beyond — but knowing how to stand out is the real challenge.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#444", marginBottom: "1rem" }}>
          Our Australian career blog covers everything you need: from writing ATS-optimised resumes tailored to Australian employers, to understanding how work visas and Temporary Graduate (subclass 485) visa timelines affect your job search strategy. We publish practical, actionable guides written for the Australian market — not generic advice recycled from US-focused career sites.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#444", marginBottom: "2rem" }}>
          Explore our latest articles below. Topics include resume writing for Australian job applications, LinkedIn optimisation, networking in Australian cities, interview preparation, and how AI-powered tools like Flashfire can automate your job applications so you can focus on what matters most.
        </p>
      </section>
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient heading="Career Tips & Job Advice for Australian Job Seekers" />
      </Suspense>
      <Footer />
    </>
  );
}

