"use client";

import Image from "next/image";
import { ALL_REVIEW_IMAGES } from "./homePageHappyUsers";

export default function HappyUsersGalleryPage() {
  return (
    <section className="bg-[#f9eeea] py-24 px-6 font-['Space_Grotesk',sans-serif]">
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className="mb-6 text-5xl  font-bold text-[#f55d1d]">
          All Happy Users’ Testimonials
        </h1>
          <p className="mb-6 text-base md:text-lg text-black/80">
            Browse the full wall of screenshots and stories from users who have
          used Flashfire to land interviews and offers.
        </p>

        <div className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1">
          {ALL_REVIEW_IMAGES.map((imageSrc, i) => (
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


