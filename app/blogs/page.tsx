import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import { blogPosts } from "@/src/data/blogsData";

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

export default function BlogsPage() {
  // Filter valid blog posts for crawler discovery
  const validBlogPosts = blogPosts.filter(
    (post) => post?.slug && typeof post.slug === "string" && post.slug.trim() !== "" && post.slug !== "undefined"
  );

  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient />
      </Suspense>
      {/* Server-rendered blog links for crawlers - all links in HTML source */}
      <section style={{ 
        padding: "2rem", 
        maxWidth: "1200px", 
        margin: "0 auto",
        fontSize: "0.875rem",
        lineHeight: "1.8"
      }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "1rem", fontWeight: "600" }}>All Blog Posts</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem" }}>
          {validBlogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              style={{ 
                color: "#2563eb", 
                textDecoration: "none",
                whiteSpace: "nowrap"
              }}
            >
              {post.title}
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
