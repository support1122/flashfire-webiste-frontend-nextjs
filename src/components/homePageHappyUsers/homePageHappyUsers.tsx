"use client";

import Image from "next/image";
import { useState, useCallback, memo } from "react";
import CachedTestimonialImage from "./CachedTestimonialImage";

// Export full list - pre-compressed WebP images (97% smaller than original PNGs)
export const ALL_REVIEW_IMAGES = [
  "/images/happy-users-sc/image29.webp",
  "/images/happy-users-sc/image30.webp",
  "/images/happy-users-sc/image31.webp",
  "/images/happy-users-sc/image28.webp",
  "/images/happy-users-sc/image26.webp",
  "/images/happy-users-sc/image22.webp",
  "/images/happy-users-sc/image25.webp",
  "/images/happy-users-sc/image27.webp",
  "/images/happy-users-sc/image24.webp",
  "/images/happy-users-sc/image23.webp",
  "/images/happy-users-sc/image3.webp",
  "/images/happy-users-sc/image34.webp",
  "/images/happy-users-sc/image43.webp",
  "/images/happy-users-sc/image44.webp",
  "/images/happy-users-sc/image45.webp",
  "/images/happy-users-sc/image46.webp",
  "/images/happy-users-sc/image20.webp",
  "/images/happy-users-sc/image21.webp",
  "/images/happy-users-sc/image13.webp",
  "/images/happy-users-sc/image19.webp",
  "/images/happy-users-sc/image15.webp",
  "/images/happy-users-sc/image17.webp",
  "/images/happy-users-sc/image16.webp",
  "/images/happy-users-sc/image14.webp",
  "/images/happy-users-sc/image18.webp",
  "/images/happy-users-sc/image9.webp",
  "/images/happy-users-sc/image12.webp",
  "/images/happy-users-sc/image8.webp",
  "/images/happy-users-sc/image7.webp",
  "/images/happy-users-sc/image32.webp",
  "/images/happy-users-sc/image33.webp",
  "/images/happy-users-sc/image36.webp",
  "/images/happy-users-sc/image1.webp",
  "/images/happy-users-sc/image37.webp",
  "/images/happy-users-sc/image38.webp",
  "/images/happy-users-sc/image39.webp",
  "/images/happy-users-sc/image40.webp",
  "/images/happy-users-sc/image41.webp",
  "/images/happy-users-sc/image42.webp",
  "/images/happy-users-sc/image5.webp",
  "/images/happy-users-sc/image6.webp",
  "/images/happy-users-sc/image2.webp",
  "/images/happy-users-sc/image10.webp",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8109%20-%20Edited.png",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8110%20-%20Edited.png",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8111%20-%20Edited.png",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8112%20-%20Edited.png",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8113%20-%20Edited.png",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/IMG_8114%20-%20Edited.png",
];

const HOMEPAGE_IMAGES = ALL_REVIEW_IMAGES.slice(0, 24);

const videos = [
  {
    videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
    name: "Anjali Shah",
    company: "Skyworks Solutions, Inc.",
    linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552896/website_thumbnails-19_imnzdt.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  },
  {
    videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
    name: "Rijul Jain",
    company: "Wise",
    linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552897/website_thumbnails-20_bxnl2z.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  },
  {
    videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
    name: "Aryan Gupta",
    company: "IBM",
    linkedinUrl: "#",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552895/website_thumbnails-18_j1ormv.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
  },
];

// Memoized image card — isolated from parent state changes
const ReviewImageCard = memo(function ReviewImageCard({
  src,
  index,
  priority,
}: {
  src: string;
  index: number;
  priority: boolean;
}) {
  return (
    <div className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)] contain-paint">
      <CachedTestimonialImage
        src={src}
        alt={`Flashfire user review ${index + 1}`}
        width={400}
        height={600}
        className="w-full h-auto object-contain block rounded-[0.4rem]"
        priority={priority}
        sizes="(max-width: 400px) 100vw, (max-width: 600px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
      />
    </div>
  );
});

// Memoized image grid — never re-renders when video state changes
const HomepageImageGrid = memo(function HomepageImageGrid() {
  return (
    <div
      id="happy-users-gallery"
      className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1"
    >
      {HOMEPAGE_IMAGES.map((src, i) => (
        <ReviewImageCard key={i} src={src} index={i} priority={i < 6} />
      ))}
    </div>
  );
});

// Memoized video card
const HomeVideoCard = memo(function HomeVideoCard({
  video,
  index,
  isPlaying,
  onPlay,
  onStop,
}: {
  video: (typeof videos)[0];
  index: number;
  isPlaying: boolean;
  onPlay: (i: number) => void;
  onStop: () => void;
}) {
  const handlePlay = useCallback(() => onPlay(index), [onPlay, index]);

  return (
    <div className="relative w-80 h-[32rem] rounded-none overflow-hidden bg-[#fffaf8] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-shadow duration-300 flex-shrink-0 hover:shadow-[0_14px_28px_rgba(0,0,0,0.3)] max-[768px]:w-full max-[768px]:max-w-[30rem] max-[768px]:h-[calc(100vh-8rem)] max-[480px]:max-w-full">
      <div className="relative w-full h-full rounded-none overflow-hidden">
        {isPlaying && (
          <>
            <iframe
              id={`userVideo-${index}`}
              src={`${video.videoUrl}?autoplay=1&rel=0`}
              className="w-full h-full object-cover block rounded-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
            <button
              onClick={onStop}
              className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 z-30"
              aria-label="Close video"
            >
              ✕
            </button>
          </>
        )}

        {!isPlaying && (
          <>
            <div className="w-full h-full relative">
              <CachedTestimonialImage
                src={video.profileImage}
                alt={`${video.name} - Click to play video`}
                width={800}
                height={1280}
                className="w-full h-full object-cover rounded-none cursor-pointer"
                onClick={handlePlay}
                priority
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/60 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-black/75 z-10"
              onClick={handlePlay}
            >
              ▶
            </div>
          </>
        )}

        <div className="absolute bottom-2 left-2 right-2 h-[5.5rem] bg-black border border-[#ff4c00] text-white text-left py-3 px-4 flex items-center z-20">
          <div className="flex items-center gap-3 w-full h-full">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
              <CachedTestimonialImage
                src={video.smallProfileImage}
                alt={video.name}
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
                priority
                sizes="40px"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-xl font-semibold m-0 text-white leading-tight truncate">
                {video.name}
              </p>
              <p className="text-sm m-0 text-white/90 leading-tight mt-0.5 truncate">
                {video.company}
              </p>
            </div>
            <a
              href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
              target={video.linkedinUrl !== "#" ? "_blank" : undefined}
              rel={video.linkedinUrl !== "#" ? "noopener noreferrer" : undefined}
              className={`flex-shrink-0 w-6 h-6 bg-white rounded flex items-center justify-center transition-colors ${
                video.linkedinUrl !== "#" ? "hover:bg-[#ff4c00] cursor-pointer" : "cursor-default opacity-50"
              }`}
              aria-label="LinkedIn Profile"
              onClick={(e) => {
                if (video.linkedinUrl === "#") e.preventDefault();
              }}
            >
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function HomePageHappyUsers() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = useCallback((i: number) => setPlayingIndex(i), []);
  const handleStop = useCallback(() => setPlayingIndex(null), []);

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
    >
      {/* === Top Orange Section === */}
      <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-40 relative pt-[90px] max-[768px]:pt-[70px]">
        <h2
          className="mb-4 text-[76.26px] max-[600px]:text-[40px] max-[400px]:text-[30px] text-center font-bold"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: "110%",
            letterSpacing: "-2.29px",
          }}
        >
          500+ Happy User&apos;s Love
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

        <HomepageImageGrid />

        <Image
          src="/images/character1.png"
          alt="Flashfire Mascot Shape"
          width={300}
          height={300}
          className="absolute left-1/2 -bottom-28 -translate-x-1/2 z-[3] w-64 h-64 max-[600px]:w-40 max-[600px]:h-40 max-[600px]:-bottom-18"
        />
      </div>

      {/* === Bottom White Section === */}
      <div className="bg-[#fffaf8] py-32 px-8 pb-20 text-center max-[768px]:py-16 max-[768px]:px-4">
        <div className="flex justify-center items-stretch flex-nowrap gap-6 w-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-6">
          {videos.map((video, index) => (
            <HomeVideoCard
              key={index}
              video={video}
              index={index}
              isPlaying={playingIndex === index}
              onPlay={handlePlay}
              onStop={handleStop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
