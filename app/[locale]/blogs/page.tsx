import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleBlogsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleBlogsPage({ params }: LocaleBlogsPageProps) {
  await params; // Await params even if not used
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient />
      </Suspense>
      <Footer />
    </>
  );
}

