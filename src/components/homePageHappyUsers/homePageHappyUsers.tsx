"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import React from "react";

// Helper function to optimize Cloudinary URLs for fast loading
const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:good,w_${width},c_limit,dpr_auto/${parts[1]}`;
    }
  }
  return url;
};

// Export full list so a dedicated gallery page can show all images
export const ALL_REVIEW_IMAGES = [
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204030/image29_zwh3vm.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204030/image30_chtdsv.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204030/image31_qqfkqe.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204029/image28_vuemm5.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204028/image26_gccg1d.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204027/image22_rx8zqm.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204027/image25_olv1fx.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204026/image27_b1jiaa.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204026/image24_lep6eo.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204026/image23_s1ky7z.png", // 10

  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204025/image20_xttrfl.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204024/image21_e2ftbw.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204024/image13_f3mubl.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204024/image13_f3mubl.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204024/image19_nxbjhs.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204023/image15_leype3.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204023/image17_tq2ul3.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204022/image16_aulqus.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204022/image14_bslkfz.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204022/image18_pdvylr.jpg",

  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204021/image9_mhagc2.png",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204020/image12_zmzj7r.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204020/image8_j0gfwt.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204019/image7_m3kys4.jpg",

  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204019/image5_y4ywbn.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204019/image6_usjiww.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204018/image2_qveizf.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204018/image3_bbkufe.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204018/image1_qgcecr.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204018/image1_qgcecr.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/v1766204018/image10_mwk9v3.jpg",
];


export default function HomePageHappyUsers() {
  const pathname = usePathname();
  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";

  const videos = [
    {
      videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
      name: "Anjali Shah",
      company: "Skyworks Solutions, Inc.",
      linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
      profileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-19.jpg",
      smallProfileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
      name: "Rijul Jain",
      company: "Wise",
      linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
      profileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-20.jpg",
      smallProfileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
      name: "Aryan Gupta",
      company: "IBM",
      linkedinUrl: "#",
      profileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-18.jpg",
      smallProfileImage:
        "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
    },
  ];
  
  // Show a subset on the homepage (24 images)
  const reviewImages = ALL_REVIEW_IMAGES.slice(0, 24);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePlay = (index: number) => {
    // Close all other videos
    setPlayingIndex(index);
  };

  // Preload first 8 images immediately on mount for instant display
  useEffect(() => {
    const preloadImages = async () => {
      const firstBatch = reviewImages.slice(0, 8);
      firstBatch.forEach((url, index) => {
        const img = new window.Image();
        img.src = optimizeCloudinaryUrl(url, 800);
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(index));
        };
      });
    };
    preloadImages();
  }, []);

  // Intersection Observer for lazy loading remaining images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!loadedImages.has(index) && index >= 8) {
              const img = new window.Image();
              img.src = optimizeCloudinaryUrl(reviewImages[index], 800);
              img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(index));
              };
            }
            observer.unobserve(entry.target);
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

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [reviewImages, loadedImages]);

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
    >
      {/* === Top Orange Section === */}
      <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-40 relative pt-[90px] max-[768px]:pt-[70px]">
        <h2
          className="mb-12 max-[600px]:text-[2rem]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "76.26px",
            lineHeight: "110%",
            letterSpacing: "-2.29px", // -3% of 76.26px
            textAlign: "center",
          }}
        >
          100+ Happy User&rsquo;s Love!
        </h2>

        {/* Masonry Layout */}
        <div
          id="happy-users-gallery"
          className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1"
        >
          {reviewImages.map((imageSrc, i) => {
            const optimizedUrl = optimizeCloudinaryUrl(imageSrc, 800);
            const isLoaded = loadedImages.has(i);
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
                {isLoaded || isEager ? (
                  <Image
                    src={optimizedUrl}
                    alt={`Flashfire user review ${i + 1}`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain block rounded-[0.4rem] transition-opacity duration-300"
                    style={{ width: "100%", height: "auto" }}
                    loading={isEager ? "eager" : "lazy"}
                    unoptimized
                    priority={isEager}
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-slate-200 animate-pulse rounded-[0.4rem] flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
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

      {/* === Bottom White Section === */}
      <div className="bg-[#fffaf8] py-32 px-8 pb-20 text-center max-[768px]:py-16 max-[768px]:px-4">
        <div className="flex justify-center items-stretch flex-nowrap gap-6 w-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative w-80 h-[32rem] rounded-none overflow-hidden bg-[#fffaf8] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 flex-shrink-0 hover:shadow-[0_14px_28px_rgba(0,0,0,0.3)] max-[768px]:w-full max-[768px]:max-w-[30rem] max-[768px]:h-[calc(100vh-8rem)] max-[480px]:max-w-full"
            >
              <div className="relative w-full h-full rounded-none overflow-hidden">
                {/* YouTube Video Embed - Show when playing */}
                {playingIndex === index && (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="w-full h-full object-cover block rounded-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-30"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* Thumbnail Image Overlay - Show when video is not playing */}
                {playingIndex !== index && (
                  <>
                    <Image
                      src={video.profileImage}
                      alt={`${video.name} - Click to play video`}
                      fill
                      className="w-full h-full object-cover rounded-none"
                      onClick={() => handlePlay(index)}
                    unoptimized
                    />
                    {/* Play Button Overlay */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/60 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-all duration-250 backdrop-blur-[2px] hover:bg-black/75 hover:scale-105 z-10"
                      onClick={() => handlePlay(index)}
                    >
                      ▶
                    </div>
                  </>
                )}

                {/* User Info - Always visible, overlaid on video */}
                <div className="absolute bottom-2 left-2 right-2 h-[5.5rem] bg-black border border-[#ff4c00] text-white text-left py-3 px-4 flex items-center z-20">
                  <div className="flex items-center gap-3 w-full h-full">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
                      <Image
                        src={(video as any).smallProfileImage || video.profileImage}
                        alt={video.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                        }}
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-xl font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.name}
                      </p>
                      <p className="text-sm m-0 text-white/90 leading-tight mt-0.5 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.company}
                      </p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={
                        video.linkedinUrl !== "#"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`flex-shrink-0 w-6 h-6 bg-white rounded flex items-center justify-center transition-colors ${
                        video.linkedinUrl !== "#"
                          ? "hover:bg-[#ff4c00] cursor-pointer"
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
                        className="w-4 h-4 text-black"
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
          ))}
        </div>
      </div>
    </section>
  );
}
