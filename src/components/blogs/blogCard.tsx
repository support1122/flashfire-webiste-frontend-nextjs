"use client";

import { FaRegClock } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CachedBlogImage from "./CachedBlogImage";

type Blog = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  category?: string;
  image?: string;
  coverImage?: string;
  categoryColor?: string;
  tags?: string[];
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const router = useRouter();

  // Ensure slug exists before rendering link
  if (!blog.slug) {
    return null;
  }

  const authorSlug = blog.author?.name ? blog.author.name.replace(/\s+/g, "-").toLowerCase() : "";

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authorSlug) {
      router.push(`/author/${authorSlug}`);
    }
  };

  return (
    <section className="flex flex-col border border-gray-200 rounded-[0.1rem] p-[0.3rem] bg-white transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_0.4rem_0.8rem_rgba(0,0,0,0.08)] max-[640px]:p-0 max-[640px]:border-0 max-[640px]:hover:translate-y-0">

      <Link
        href={`/blog/${blog.slug}`}
        className="block flex-1 bg-white border border-gray-200 rounded-[0.1rem] overflow-hidden shadow-[0_0.2rem_0.5rem_rgba(0,0,0,0.05)] text-left transition-all duration-300 cursor-pointer max-[768px]:max-w-full"
      >
        {/* === Image === */}
        <div className="w-full aspect-video overflow-hidden relative bg-[#f9f9f9] max-[768px]:aspect-[16/10]">
          <CachedBlogImage
            src={blog.image || blog.coverImage || ""}
            alt={blog.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-300 block"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* === Content === */}
        <div className="px-6 pt-6 pb-5 max-[640px]:px-4 max-[640px]:pt-4 max-[640px]:pb-4">
          <p className="text-[0.9rem] font-bold text-[#f78b5d] uppercase mb-2 bg-transparent max-[640px]:text-[0.8rem]">
            {(blog.category || "").toUpperCase()}
          </p>

          <h3 className="text-[1.2rem] font-bold text-[#111] mb-2.5 leading-[1.4] line-clamp-2 max-[640px]:text-[1.1rem] max-[640px]:mb-2">{blog.title}</h3>

          {/* Author */}
          <p className="text-[0.9rem] text-[#666] mb-2">
            {blog.author?.name ? (
              <>
                By{" "}
                <span
                  onClick={handleAuthorClick}
                  className="font-semibold text-[#111] hover:text-[#f97316] transition-colors cursor-pointer"
                >
                  {blog.author.name}
                </span>
              </>
            ) : (
              <>By <span className="font-semibold text-[#111]">Debashri Mandal</span></>
            )}
          </p>

          <p className="text-base text-[#555] mb-1 leading-[1.4] line-clamp-3">
            {blog.excerpt}
          </p>


          <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-[0.95rem] text-[#777] font-medium max-[640px]:text-[0.85rem] max-[640px]:gap-x-4">
            <span className="flex flex-row items-center whitespace-nowrap">
              <BsCalendarEvent className="shrink-0 text-[#ff4c00] mr-1.5 text-[0.8rem]" />
              <span>{blog.date}</span>
            </span>
            <span className="flex flex-row items-center whitespace-nowrap">
              <FaRegClock className="shrink-0 text-[#ff4c00] mr-1.5 text-[0.8rem]" />
              <span>{blog.readTime ? blog.readTime.toUpperCase() : ""} READ</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
