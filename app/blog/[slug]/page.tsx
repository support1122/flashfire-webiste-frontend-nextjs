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
  // Custom meta title for specific blogs
  const metaTitle = post.slug === "how-to-optimize-resume-for-ats" 
    ? "How to Optimize a Resume for ATS | ATS Resume Optimization"
    : post.slug === "how-to-search-for-a-new-job"
    ? "How to Search for a New Job: The Best Way to Find One Fast"
    : post.slug === "how-to-automate-job-applications"
    ? "How to Automate Job Applications | Job Application Automation"
    : post.slug === "best-ai-job-application-tools"
    ? "Best AI Job Application Tool in 2026 | Top AI Tools"
    : post.slug === "linkedin-profile-attractive-to-recruiters"
    ? "How to Make Your LinkedIn Profile Attractive to Recruiters"
    : post.slug === "check-if-resume-is-ats-friendly"
    ? "How to Check If Your Resume Is ATS Friendly"
    : post.slug === "how-to-beat-ats-systems"
    ? "How to Beat ATS Systems & Get Your Resume Shortlisted"
    : post.slug === "highest-paying-software-engineering-jobs"
    ? "Highest Paying Software Engineering Jobs in 2026"
    : post.slug === "how-to-get-a-job-as-a-software-engineer"
    ? "How to Get a Job as a Software Engineer in 2026"
    : post.slug === "find-job-after-graduation"
    ? "How to Find a Job After Graduation in 2026"
    : post.slug === "how-to-change-careers"
    ? "How to Change Careers Successfully | Step-by-Step Guide"
    : post.slug === "devops-engineer-job-responsibilities"
    ? "DevOps Engineer Job Responsibilities & Job Profile"
    : post.slug === "best-paying-jobs-in-the-us"
    ? "Best Paying Jobs in the US: Top 10 High-Salary Careers"
    : `${post.title} | Flashfire Blog`;
  
  return {
    title: metaTitle,
    description: post.excerpt,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.flashfirejobs.com/blog/${post.slug}`,
    },
    openGraph: {
      title: metaTitle,
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
      title: metaTitle,
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
