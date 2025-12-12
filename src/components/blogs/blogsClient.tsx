"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./blogs.module.css";
import BlogCard from "./blogCard";
import { blogPosts } from "@/src/data/blogsData";
import { FaSearch } from "react-icons/fa";

// Function to generate default tags based on category
function getDefaultTags(category: string, title: string): string[] {
  const categoryTags: Record<string, string[]> = {
    "Career Advice": ["Career Tips", "Job Search", "Professional Development"],
    "Job Search Strategy": ["Job Search", "Career Strategy", "Job Hunting"],
    "Success Stories": ["Success Stories", "Career Growth", "Job Search"],
  };

  // Extract keywords from title
  const titleKeywords = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));

  const defaultTags = categoryTags[category] || ["Career Tips", "Job Search"];
  return [...defaultTags, ...titleKeywords].slice(0, 5);
}

// Add default tags to blogs that don't have them
const blogsWithTags = blogPosts.map((blog) => ({
  ...blog,
  tags: blog.tags && blog.tags.length > 0 
    ? blog.tags 
    : getDefaultTags(blog.category, blog.title),
}));

export default function BlogsClient() {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Decode and normalize tag from URL
  const decodedTag = useMemo(() => {
    if (!tagParam) return "";
    return decodeURIComponent(tagParam.replace(/\+/g, " ")).trim();
  }, [tagParam]);

  // Decode and normalize category from URL
  const decodedCategory = useMemo(() => {
    if (!categoryParam) return "";
    return decodeURIComponent(categoryParam.replace(/\+/g, " ")).trim();
  }, [categoryParam]);

  // All unique categories for chip display
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    blogsWithTags.forEach((blog) => {
      if (blog.category) {
        set.add(blog.category);
      }
    });
    return Array.from(set);
  }, []);

  // Filter blogs by tag if tag parameter exists
  const filteredBlogs = useMemo(() => {
    const normalizedCategory = decodedCategory.toLowerCase();
    const normalizedTag = decodedTag.toLowerCase();
    const normalizedSearch = searchQuery.toLowerCase();

    // Priority: category filter, then tag filter, else all
    let base = blogsWithTags;

    if (normalizedCategory) {
      base = base.filter((blog) =>
        blog.category.toLowerCase().includes(normalizedCategory)
      );
    } else if (normalizedTag) {
      base = base.filter((blog) => {
        if (!blog.tags || blog.tags.length === 0) return false;
        return blog.tags.some((tag) => {
          if (!tag) return false;
          return tag.toLowerCase().includes(normalizedTag);
        });
      });
    }

    if (normalizedSearch) {
      base = base.filter((blog) => {
        return (
          blog.title.toLowerCase().includes(normalizedSearch) ||
          (blog.excerpt || "").toLowerCase().includes(normalizedSearch)
        );
      });
    }

    return base;
  }, [decodedCategory, decodedTag, searchQuery]);

  return (
    <section className={styles.blogsSection}>
      <header className={styles.header}>
        <h2>Insights That Spark Career Growth.</h2>
        <p>
          Learn how to outsmart hiring systems, stand out to recruiters, and
          stay ahead with{" "}
          <span className={styles.highlight}>Flashfire's expert-backed</span>{" "}
          tips.
        </p>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our blogs..."
            className={styles.searchInput}
            aria-label="Search blogs"
          />
          <button
            type="button"
            className={styles.searchButton}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Category chips */}
      {allCategories.length > 0 && (
        <div className={styles.categoryChips}>
          {allCategories.map((cat) => {
            const isActive =
              decodedCategory &&
              decodedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/blogs?category=${encodeURIComponent(cat)}`}
                className={`${styles.categoryChip} ${
                  isActive ? styles.categoryChipActive : ""
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}

      {/* Filter Indicator */}
      {(decodedCategory || decodedTag) && (
        <div className={styles.tagFilterContainer}>
          <span className={styles.tagFilterText}>
            {decodedCategory ? (
              <>Showing category: <strong>{decodedCategory}</strong></>
            ) : (
              <>Showing tag: <strong>{decodedTag}</strong></>
            )}
          </span>
          <Link href="/blogs" className={styles.clearFilterLink}>
            View all blogs
          </Link>
        </div>
      )}

      {filteredBlogs.length > 0 ? (
        <div className={styles.blogGrid}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        decodedTag && (
          <div className={styles.noResults}>
            <p>No blogs found for tag: <strong>{decodedTag}</strong></p>
            <Link href="/blogs" className={styles.clearFilterLink}>
              View all blogs
            </Link>
          </div>
        )
      )}
    </section>
  );
}
