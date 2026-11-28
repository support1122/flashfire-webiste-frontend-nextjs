"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import React from "react";
import CachedTestimonialImage from "./CachedTestimonialImage";
import HomePageFeaturedCustomerStories from "./HomePageFeaturedCustomerStories";
import styles from "./homePageHappyUsers.module.css";
import { getLocalePrefix } from "@/src/utils/locale";

// Helper function to optimize Cloudinary URLs for fast loading
const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      // Extract just the image path (everything after the last slash in parts[1])
      const pathParts = parts[1].split('/');
      const imagePath = pathParts[pathParts.length - 1];
      // Reconstruct with optimized parameters
      return `${parts[0]}/upload/f_auto,q_auto:best,w_${width},c_limit,dpr_auto/${imagePath}`;
    }
  }
  return url;
};

const R2 = "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/happy-users-sc%20copy";

export const ALL_REVIEW_IMAGES = [
  `${R2}/image47.png`,
  `${R2}/image48.png`,
  `${R2}/image49.png`,
  `${R2}/image51.png`,
  `${R2}/image52.png`,
  `${R2}/image53.png`,
  `${R2}/image29.png`,
  `${R2}/image30.png`,
  `${R2}/image31.png`,
  `${R2}/image28.png`,
  `${R2}/image26.png`,
  `${R2}/image22.png`,
  `${R2}/image25.png`,
  `${R2}/image27.jpg`,
  `${R2}/image24.png`,
  `${R2}/image23.png`,
  `${R2}/image3.jpg`,
  `${R2}/image34.png`,
  `${R2}/image43.png`,
  `${R2}/image44.png`,
  `${R2}/image45.png`,
  `${R2}/image46.png`,
  `${R2}/image20.png`,
  `${R2}/image21.jpg`,
  `${R2}/image13.png`,
  `${R2}/image19.png`,
  `${R2}/image15.png`,
  `${R2}/image17.png`,
  `${R2}/image16.png`,
  `${R2}/image14.png`,
  `${R2}/image18.jpg`,
  `${R2}/image9.png`,
  `${R2}/image12.jpg`,
  `${R2}/image8.jpg`,
  `${R2}/image7.jpg`,
  `${R2}/image32.png`,
  `${R2}/image33.png`,
  `${R2}/image36.png`,
  `${R2}/image1.jpg`,
  `${R2}/image37.png`,
  `${R2}/image38.png`,
  `${R2}/image39.png`,
  `${R2}/image40.png`,
  `${R2}/image41.png`,
  `${R2}/image42.png`,
  `${R2}/image5.jpg`,
  `${R2}/image6.jpg`,
  `${R2}/image2.jpg`,
  `${R2}/image10.jpg`,
  `${R2}/image11.jpg`,
  `${R2}/image4.jpg`,
  `${R2}/image35.png`,
];


interface HomePageHappyUsersProps {
  variant?: "default" | "pricing" | "pricingVideos";
  heading?: string;
  headingClassName?: string;
  ctaLabel?: string;
  includeFeaturedStories?: boolean;
}

const DEFAULT_PRICING_HEADING_CLASS =
  "mb-[720px] max-w-[430px] text-[64px] font-black leading-[1.02] tracking-[-0.02em] text-white max-[1024px]:mb-[560px] max-[1024px]:text-[50px] max-[768px]:mb-4 max-[768px]:max-w-[360px] max-[768px]:text-[40px] max-[480px]:text-[34px]";

export default function HomePageHappyUsers({
  variant = "default",
  heading = "1000+ Happy User’s Love",
  headingClassName = DEFAULT_PRICING_HEADING_CLASS,
  ctaLabel = "Book a Demo",
  includeFeaturedStories = false,
}: HomePageHappyUsersProps) {
  const pathname = usePathname();
  const prefix = getLocalePrefix(pathname);

  const handleTryItYourself = () => {
    if (typeof window === "undefined") {
      return;
    }

    const currentPath = pathname || window.location.pathname;
    const currentScrollY = window.scrollY || window.pageYOffset || 0;

    sessionStorage.setItem("previousPageBeforeBookADemo", currentPath);
    sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString());
    window.history.pushState({}, "", `${prefix}/book-a-demo`);
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  const videos = [
    {
      videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
      name: "Anjali Shah",
      company: "Skyworks Solutions, Inc.",
      linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
      profileImage: "/images/thumbnail-anjali.png",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg"
    },
    {
      videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
      name: "Rijul Jain",
      company: "Wise",
      linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
      profileImage: "/images/thumbnail-rijul.png",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg"
    },
    {
      videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
      name: "Aryan Gupta",
      company: "IBM",
      linkedinUrl: "#",
      profileImage: "/images/thumbnail-aryan.png",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg"
    },
  ];

  // Show a subset on the homepage (24 images)
  const reviewImages = ALL_REVIEW_IMAGES.slice(0, 24);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPricingVideoPaused, setIsPricingVideoPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [loadedProfileImages, setLoadedProfileImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const profileImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Persistent cache for preloaded images - survives re-renders
  const preloadedImageCache = useRef<Set<string>>(new Set());

  const handlePlay = (index: number) => {
    // Close all other videos
    setPlayingIndex(index);
  };

  // Preload images immediately on mount - only runs once
  useEffect(() => {
    const preloadImages = () => {
      // Preload video profile images first (critical for UX)
      videos.forEach((video, index) => {
        const profileImageUrl = optimizeCloudinaryUrl(video.profileImage, 800);
        const smallProfileImageUrl = optimizeCloudinaryUrl(video.smallProfileImage, 100);

        // Only preload if not already cached
        if (!preloadedImageCache.current.has(profileImageUrl)) {
          preloadedImageCache.current.add(profileImageUrl);
          const profileImg = new window.Image();
          profileImg.src = profileImageUrl;
          profileImg.onload = () => {
            setLoadedProfileImages(prev => new Set(prev).add(index * 2));
          };
          profileImg.onerror = () => {
            if (video.profileImage.includes('res.cloudinary.com')) {
              const fallbackUrl = video.profileImage.replace('f_auto', 'f_jpg');
              profileImg.src = fallbackUrl;
              preloadedImageCache.current.add(fallbackUrl);
            }
            setLoadedProfileImages(prev => new Set(prev).add(index * 2));
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedProfileImages(prev => new Set(prev).add(index * 2));
        }

        if (!preloadedImageCache.current.has(smallProfileImageUrl)) {
          preloadedImageCache.current.add(smallProfileImageUrl);
          const smallProfileImg = new window.Image();
          smallProfileImg.src = smallProfileImageUrl;
          smallProfileImg.onload = () => {
            setLoadedProfileImages(prev => new Set(prev).add(index * 2 + 1));
          };
          smallProfileImg.onerror = () => {
            const fallbackUrl = video.smallProfileImage.replace('f_auto', 'f_jpg');
            smallProfileImg.src = fallbackUrl;
            preloadedImageCache.current.add(fallbackUrl);
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedProfileImages(prev => new Set(prev).add(index * 2 + 1));
        }
      });

      // Preload first batch of review images
      const firstBatch = reviewImages.slice(0, 8);
      firstBatch.forEach((url, index) => {
        const optimizedUrl = optimizeCloudinaryUrl(url, 800);
        if (!preloadedImageCache.current.has(optimizedUrl)) {
          preloadedImageCache.current.add(optimizedUrl);
          const img = new window.Image();
          img.src = optimizedUrl;
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(index));
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedImages(prev => new Set(prev).add(index));
        }
      });
    };

    preloadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Intersection Observer for lazy loading remaining images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            const isProfileImage = entry.target.hasAttribute('data-profile');

            if (isProfileImage) {
              const videoIndex = Math.floor(index / 2);
              const isSmallImage = index % 2 === 1;

              if (!loadedProfileImages.has(index)) {
                const video = videos[videoIndex];
                const imageUrl = isSmallImage ? video.smallProfileImage : video.profileImage;
                const optimizedUrl = optimizeCloudinaryUrl(imageUrl, isSmallImage ? 100 : 800);

                // Check if already cached
                if (preloadedImageCache.current.has(optimizedUrl)) {
                  setLoadedProfileImages(prev => new Set(prev).add(index));
                } else {
                  preloadedImageCache.current.add(optimizedUrl);
                  const img = new window.Image();
                  img.src = optimizedUrl;
                  img.onload = () => {
                    setLoadedProfileImages(prev => new Set(prev).add(index));
                  };
                  img.onerror = () => {
                    if (imageUrl.includes('res.cloudinary.com')) {
                      const fallbackUrl = imageUrl.replace('f_auto', 'f_jpg');
                      img.src = fallbackUrl;
                      preloadedImageCache.current.add(fallbackUrl);
                    }
                    setLoadedProfileImages(prev => new Set(prev).add(index));
                  };
                }
              }
            } else if (!loadedImages.has(index) && index >= 8) {
              // Handle review images
              const optimizedUrl = optimizeCloudinaryUrl(reviewImages[index], 800);

              // Check if already cached
              if (preloadedImageCache.current.has(optimizedUrl)) {
                setLoadedImages(prev => new Set(prev).add(index));
              } else {
                preloadedImageCache.current.add(optimizedUrl);
                const img = new window.Image();
                img.src = optimizedUrl;
                img.onload = () => {
                  setLoadedImages(prev => new Set(prev).add(index));
                };
              }
            }

            if (!isProfileImage) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before image enters viewport
        threshold: 0.01
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    profileImageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      profileImageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [reviewImages, loadedImages, loadedProfileImages, videos]);

  if (variant === "pricingVideos") {
    return (
      <section className="bg-[#fffaf8] py-20 px-8 text-center max-[768px]:py-16 max-[768px]:px-4">
        <div
          className={`${styles.pricingVideoDeck} ${
            playingIndex !== null || isPricingVideoPaused
              ? styles.pricingVideoDeckPaused
              : ""
          }`}
          onMouseEnter={() => setIsPricingVideoPaused(true)}
          onMouseLeave={() => setIsPricingVideoPaused(false)}
          onPointerEnter={() => setIsPricingVideoPaused(true)}
          onPointerLeave={() => setIsPricingVideoPaused(false)}
        >
          <div className={styles.pricingVideoTrack}>
          {[...videos, ...videos].map((video, itemIndex) => {
            const index = itemIndex % videos.length;
            const animationDelay = `-${itemIndex * 5}s`;

            return (
            <div
              key={`${video.name}-${itemIndex}`}
              className={styles.pricingVideoCard}
              style={
                {
                  animationDelay,
                  animationPlayState:
                    playingIndex !== null || isPricingVideoPaused
                      ? "paused"
                      : "running",
                } as React.CSSProperties
              }
            >
              <div className="relative w-full h-full rounded-none overflow-hidden">
                {playingIndex === itemIndex && (
                  <>
                    <iframe
                      id={`pricingUserVideo-${itemIndex}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="w-full h-full object-cover block rounded-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-30"
                      aria-label="Close video"
                    >
                      ×
                    </button>
                  </>
                )}

                {playingIndex !== itemIndex && (
                  <>
                    <div
                      ref={(el) => {
                        profileImageRefs.current[index * 2] = el;
                      }}
                      data-index={index * 2}
                      data-profile="true"
                      className="w-full h-full relative"
                    >
                      <CachedTestimonialImage
                        src={video.profileImage}
                        alt={`${video.name} - Click to play video`}
                        width={800}
                        height={1280}
                        className="w-full h-full object-cover rounded-none cursor-pointer"
                        onClick={() => setPlayingIndex(itemIndex)}
                        priority
                        sizes="(max-width: 768px) 100vw, 330px"
                      />
                    </div>
                    <button
                      type="button"
                      data-story-play
                      aria-label={`Play ${video.name}'s customer story`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full border-2 border-white bg-white flex justify-center items-center cursor-pointer transition-transform duration-200 hover:scale-105 z-10"
                      onClick={() => setPlayingIndex(itemIndex)}
                    >
                      <span aria-hidden="true" className="ml-1 h-0 w-0 border-y-[0.55rem] border-y-transparent border-l-[0.8rem] border-l-black" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 left-3 right-3 h-[94px] bg-black border border-[#ff4c00] text-white text-left py-4 px-5 flex items-center z-20">
                  <div className="flex items-center gap-3 w-full h-full">
                    <div className="relative w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
                      <Image
                        src={video.smallProfileImage}
                        alt={video.name}
                        width={46}
                        height={46}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-[18px] font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.name}
                      </p>
                      <p className="text-[13px] m-0 text-white/90 leading-tight mt-1 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.company}
                      </p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={video.linkedinUrl !== "#" ? "noopener noreferrer" : undefined}
                      className={`group flex-shrink-0 w-7 h-7 bg-white rounded flex items-center justify-center transition-colors ${
                        video.linkedinUrl !== "#"
                          ? "hover:bg-black cursor-pointer"
                          : "cursor-default opacity-50"
                      }`}
                      aria-label="LinkedIn Profile"
                      onClick={(e) => {
                        if (video.linkedinUrl === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-black group-hover:text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "pricing") {
    const pricingReviewImages = ALL_REVIEW_IMAGES.slice(0, 18);

    return (
      <section
        id="testimonials"
        className="relative w-full overflow-visible bg-[#ff5a18] font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
      >
        <div className="relative mx-auto grid min-h-[1560px] w-full grid-cols-[500px_minmax(0,1fr)] overflow-hidden px-[59px] pt-[65px] max-[1024px]:grid-cols-[360px_minmax(0,1fr)] max-[1024px]:px-7 max-[768px]:flex max-[768px]:min-h-0 max-[768px]:flex-col max-[768px]:gap-8 max-[768px]:px-5 max-[768px]:py-10">
          <div className="relative z-[2] flex flex-col items-start pt-[3px] text-left max-[768px]:pt-0">
            <h2 className={headingClassName}>
              {heading}
            </h2>

            <button
              type="button"
              onClick={handleTryItYourself}
              className="inline-flex h-[56px] items-center gap-4 bg-black px-[24px] text-[20px] font-bold leading-none text-white transition-colors hover:bg-[#1c1c1c]"
            >
              {ctaLabel}
              <span className="text-[34px] font-normal leading-none" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>

          <div className={`${styles.pricingReviewViewport} relative h-[1300px] min-w-0 overflow-hidden max-[768px]:h-[1400px] max-[480px]:h-[1200px]`}>
            <div className={`${styles.pricingReviewTrack} columns-4 gap-[10px] max-[1200px]:columns-3 max-[768px]:columns-3 max-[520px]:columns-2`}>
              {[...pricingReviewImages, ...pricingReviewImages].map((imageSrc, i) => (
                <div
                  key={`${imageSrc}-${i}`}
                  className="mb-[10px] inline-block w-full overflow-hidden rounded-[3px] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] [break-inside:avoid]"
                >
                  <CachedTestimonialImage
                    src={imageSrc}
                    alt={`Flashfire user review ${i + 1}`}
                    width={340}
                    height={480}
                    className="block h-auto w-full object-contain"
                    priority={i < 8}
                    sizes="(max-width: 520px) 50vw, (max-width: 768px) 33vw, 180px"
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[92px] bg-gradient-to-b from-[#ff5a18] via-[rgba(255,90,24,0.82)] to-[rgba(255,90,24,0)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[150px] bg-gradient-to-b from-[rgba(255,90,24,0)] via-[rgba(255,90,24,0.82)] to-[#ff5a18]" />
          </div>
        </div>

        <div className="absolute bottom-[-75px] left-1/2 z-[5] h-[150px] w-[150px] -translate-x-1/2 max-[768px]:hidden">
          <Image
            src="/images/character1.png"
            alt="Flashfire mascot"
            fill
            sizes="150px"
            className="object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
    >
      {/* === Top Orange Section === */}
      <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-40 relative pt-[90px] max-[768px]:pt-[70px]">
        <h2
          className="
                mb-4 
                text-[76.26px] 
                max-[600px]:text-[40px] 
                max-[400px]:text-[30px]
                text-center
                font-bold
              "
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: "110%",
            letterSpacing: "-2.29px",
          }}
        >
          1000+ Happy User{'\''}s Love
        </h2>
        <p
          className="mb-12 max-[600px]:text-[1.125rem]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "140%",
            textAlign: "center",
            opacity: 0.95,
          }}
        >
          Trusted by Job Seekers Using Our <span style={{ color: "#fff", fontWeight: 600 }}>AI Job Search Platform</span>
        </p>

        {/* Masonry Layout */}
        <div
          id="happy-users-gallery"
          className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1"
        >
          {reviewImages.map((imageSrc, i) => {
            const isEager = i < 8; // First 8 images load eagerly

            return (
              <div
                key={i}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                data-index={i}
                className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
              >
                <CachedTestimonialImage
                  src={imageSrc}
                  alt={`Flashfire user review ${i + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-contain block rounded-[0.4rem] transition-opacity duration-300"
                  priority={isEager}
                  sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
                />
              </div>
            );
          })}
        </div>

        <Image
          src="/images/character1.png"
          alt="Flashfire Mascot Shape"
          width={300}
          height={300}
          className="absolute left-1/2 -bottom-28 -translate-x-1/2 z-[3] w-64 h-64 max-[600px]:w-40 max-[600px]:h-40 max-[600px]:-bottom-18 "
        />
      </div>

      {includeFeaturedStories && (
        <HomePageFeaturedCustomerStories reviewImages={reviewImages} />
      )}

      {/* === Bottom White Section === */}
      <div className="border-t border-[#f1e8e3] bg-[linear-gradient(180deg,#fffaf8_0%,#fff_100%)] py-20 px-8 max-[768px]:py-14 max-[768px]:px-5">
        <div className="w-full max-w-[1220px] mx-auto">
          <div className="mb-6 grid grid-cols-[1fr_auto] items-end gap-6 text-left max-[640px]:grid-cols-1 max-[640px]:gap-2">
            <div>
              <span className="mb-3 flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#77716e] before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#d5633b]">
                Customer video stories
              </span>
              <h3 className="m-0 max-w-[35rem] text-[clamp(2rem,3.5vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.05em] text-[#171717]">
                Hear it from the people who have been there.
              </h3>
            </div>
            <p className="mb-1 max-w-[16rem] text-[0.84rem] leading-[1.5] text-[#77716e] max-[640px]:max-w-none">
              Real job seekers share their experience with Flashfire.
            </p>
          </div>
          <div className="grid grid-cols-2 items-stretch gap-4 max-[900px]:gap-3 max-[640px]:grid-cols-1">
          {videos.slice(1).map((video, index) => (
            <div
              key={index}
              className="group relative w-full overflow-hidden rounded-[0.9rem] border border-[#eee7e2] bg-white shadow-[0_5px_18px_rgba(45,25,16,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(45,25,16,0.14)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#c94312]">
                {/* YouTube Video Embed - Show when playing */}
                {playingIndex === index && (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="block h-full w-full rounded-[0.9rem] object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute right-3 top-3 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/75 text-white shadow-lg transition-colors hover:bg-[#ff5a18]"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* Thumbnail Image Overlay - Show when video is not playing */}
                {playingIndex !== index && (
                  <>
                    <div
                      ref={(el) => {
                        profileImageRefs.current[index * 2] = el;
                      }}
                      data-index={index * 2}
                      data-profile="true"
                      className="w-full h-full relative"
                    >
                      <CachedTestimonialImage
                        src={video.profileImage}
                        alt={`${video.name} - Click to play video`}
                        width={800}
                        height={1280}
                        className="h-full w-full cursor-pointer rounded-[0.9rem] object-cover object-[center_68%] transition-transform duration-500 group-hover:scale-[1.025]"
                        onClick={() => handlePlay(index)}
                        fit="cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-black/15" aria-hidden="true" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
                    {/* Play Button Overlay */}
                    <button
                      type="button"
                      data-story-play
                      onClick={() => handlePlay(index)}
                      aria-label={`Play ${video.name}'s customer story`}
                      className="absolute left-1/2 top-1/2 z-10 flex h-[3.5rem] w-[3.5rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white shadow-xl transition duration-300 hover:scale-110"
                    >
                      <span aria-hidden="true" className="ml-1 h-0 w-0 border-y-[0.55rem] border-y-transparent border-l-[0.8rem] border-l-black" />
                    </button>
                    <span className="pointer-events-none absolute bottom-3 left-0 right-0 z-10 text-center text-[0.62rem] font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      Watch {video.name}&apos;s story
                    </span>
                  </>
                )}

              </div>
              <div className="flex min-h-[3.35rem] items-center gap-2 px-3 py-2.5 text-left">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image src={video.smallProfileImage} alt="" width={32} height={32} className="h-full w-full rounded-full object-cover" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-[0.67rem] font-bold leading-tight text-[#25211f]">{video.name}</p>
                  <p className="m-0 mt-1 truncate text-[0.57rem] leading-tight text-[#817a76]">{video.company}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#fff2ec] px-2 py-1 text-[0.48rem] font-extrabold uppercase tracking-wide text-[#c66a49]">Video story</span>
                <a
                  href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                  target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                  rel={video.linkedinUrl !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={`${video.name} on LinkedIn`}
                  onClick={(e) => { if (video.linkedinUrl === "#") e.preventDefault(); }}
                  className={`group flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-[#e8e4e1] bg-white transition-colors ${video.linkedinUrl !== "#" ? "hover:bg-[#ff5a18]" : "cursor-default opacity-50"}`}
                >
                  <svg className="h-3.5 w-3.5 text-black group-hover:text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C23.2 0.774 22.222 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
