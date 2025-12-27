import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { blogPosts } from "@/src/data/blogsData";
import BlogsPage from "@/src/components/blogs/blogsPage";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { slugToCategory, getAllCategorySlugs } from "@/src/utils/blogCategoryUtils";

export const dynamicParams = true;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate static params for all blog posts and categories
export async function generateStaticParams() {
  const blogSlugs = blogPosts
    .filter((post) => post.slug && post.slug !== "undefined")
    .map((post) => ({
      slug: post.slug,
    }));
  
  const categorySlugs = getAllCategorySlugs().map((categorySlug) => ({
    slug: categorySlug,
  }));
  
  return [...blogSlugs, ...categorySlugs];
}

// Generate metadata for blog posts and categories
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Check if it's a blog post
  const post = blogPosts.find((p) => p.slug === slug);
  if (post) {
    return {
      title: `${post.title} | Flashfire Blog`,
      description: post.excerpt,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.flashfirejobs.com/blog/${post.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://www.flashfirejobs.com/blog/${post.slug}`,
        type: "article",
        images: post.image
          ? [
              {
                url: post.image,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [
              {
                url: "https://www.flashfirejobs.com/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "FLASHFIRE Logo",
              },
            ],
        publishedTime: post.date,
        authors: ["Flashfire"],
        section: post.category,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  // Check if it's a category
  const category = slugToCategory(slug);
  if (category && category !== slug) {
    return {
      title: `${category} - Blog | Flashfire`,
      description: `Explore ${category} articles, tips, and insights on Flashfire Blog.`,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.flashfirejobs.com/blog/${slug}`,
      },
      openGraph: {
        title: `${category} - Flashfire Blog`,
        description: `Explore ${category} articles, tips, and insights.`,
        url: `https://www.flashfirejobs.com/blog/${slug}`,
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
        title: `${category} - Flashfire Blog`,
        description: `Explore ${category} articles, tips, and insights.`,
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  // Not found
  return {
    title: "Page Not Found | Flashfire",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Validate params
  if (!slug || slug === "undefined") {
    return notFound();
  }

  // Check if it's a blog post
  const post = blogPosts.find((p) => p.slug === slug);
  if (post) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    return <BlogsPage post={post} />;
  }

  // Check if it's a category
  const category = slugToCategory(slug);
  if (category && category !== slug) {
    // It's a category, show filtered blog list
    return (
      <>
        <Navbar />
        <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
          <BlogsClient categorySlug={slug} />
        </Suspense>
        <Footer />
      </>
    );
  }

  // Not found
  return notFound();
}
