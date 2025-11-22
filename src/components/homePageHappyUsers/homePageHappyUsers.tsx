"use client";

import Image from "next/image";

export default function HomePageHappyUsers() {
  // Images from happy-users-sc folder
  const reviewImages = [
    "/images/happy-users-sc/image1.jpg",
    "/images/happy-users-sc/image2.jpg",
    "/images/happy-users-sc/image3.jpg",
    "/images/happy-users-sc/image4.jpg",
    "/images/happy-users-sc/image5.jpg",
    "/images/happy-users-sc/image6.jpg",
    "/images/happy-users-sc/image7.jpg",
    "/images/happy-users-sc/image8.jpg",
    "/images/happy-users-sc/image9.png",
    "/images/happy-users-sc/image10.jpg",
    "/images/happy-users-sc/image11.jpg",
    "/images/happy-users-sc/image12.jpg",
    "/images/happy-users-sc/image13.png",
    "/images/happy-users-sc/image14.jpg",
    "/images/happy-users-sc/image15.jpg",
    "/images/happy-users-sc/image16.png",
    "/images/happy-users-sc/image17.png",
    "/images/happy-users-sc/image18.jpg",
    "/images/happy-users-sc/image19.png",
    "/images/happy-users-sc/image20.png",
    "/images/happy-users-sc/image21.png",
    "/images/happy-users-sc/image22.png",
    "/images/happy-users-sc/image23.png",
    "/images/happy-users-sc/image24.png",
    "/images/happy-users-sc/image25.png",
  ];

  return (
    <section
      id="testimonials"
      className="w-full overflow-visible font-['Space_Grotesk',sans-serif] mb-8"
    >
      {/* === Top Orange Section === */}
      <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-52 mb-32 relative">
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
          100+ Happy Users&rsquo; Love!
        </h2>

        {/* Masonry Layout */}
        <div className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1">
          {reviewImages.map((imageSrc, i) => (
            <div
              key={i}
              className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={imageSrc}
                alt={`Flashfire user review ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-contain block rounded-[0.4rem]"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <Image
          src="/images/character1.png"
          alt="Flashfire Mascot Shape"
          width={300}
          height={300}
          className="absolute left-1/2 -bottom-28 -translate-x-1/2 z-[3] w-64 h-64 max-[600px]:w-40 max-[600px]:h-40 max-[600px]:-bottom-18"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </section>
  );
}
