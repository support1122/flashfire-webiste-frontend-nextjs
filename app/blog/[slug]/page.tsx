import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogPosts } from "@/src/data/blogsData";
import BlogsPage from "@/src/components/blogs/blogsPage";

type Props = {
  params: {
    slug: string;
  };
};

// Generate static params for all blog posts to prevent undefined slugs
export async function generateStaticParams() {
  return blogPosts
    .filter((post) => post.slug && post.slug !== "undefined")
    .map((post) => ({
      slug: post.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Flashfire",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

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
        : [],
      publishedTime: post.date,
      authors: ["Flashfire"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  
  // Validate slug is not undefined or empty
  if (!slug || slug === "undefined") {
    return notFound();
  }

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return <BlogsPage post={post} />;
}
