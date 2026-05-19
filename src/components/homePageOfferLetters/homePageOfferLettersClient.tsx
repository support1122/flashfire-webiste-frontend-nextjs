"use client";

import { useEffect, useRef } from "react";
import styles from "./homePageOfferLetters.module.css";
import Image from "next/image";
import Link from "next/link";

interface OfferLetterData {
  name: string;
  company: string;
  linkedinUrl: string;
  imagePath: string;
  profileImagePath?: string;
}

interface HomePageOfferLettersClientProps {
  heading?: string;
  variant?: "split" | "auto";
  autoScroll?: boolean;
  enableLoopControls?: boolean;
  buttonOnlyScroll?: boolean;
}

const offerLetters: OfferLetterData[] = [
  {
    name: "Kanchan",
    company: "MiRus",
    linkedinUrl: "https://www.linkedin.com/in/dr-kanchan-yadav-ba0b18106/",
    imagePath: "/images/kanchan_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/kanchan.jpeg",
  },
  {
    name: "Uhtiha",
    company: "MaineHealth Maine Medical Center",
    linkedinUrl: "https://www.linkedin.com/in/uhitha-doddapaneni-903932128/",
    imagePath: "/images/uhitha_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/uhitha.jpeg",
  },
  {
    name: "Vaishali Jain",
    company: "Lila Sciences",
    linkedinUrl: "https://www.linkedin.com/in/vaishali-jain-187665263/",
    imagePath: "/images/vaishali_jain_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/vaishalli_jain.png",
  },
  {
    name: "Anjali",
    company: "Skyworks Solutions, Inc.",
    linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
    imagePath: "/images/anjali_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  },
  {
    name: "Akrati",
    company: "Akamai Technologies",
    linkedinUrl: "https://www.linkedin.com/in/akratimalviya/",
    imagePath: "/images/akrati_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
  },
  {
    name: "Neha",
    company: "Deloitte",
    linkedinUrl: "https://www.linkedin.com/in/neha-senapati/",
    imagePath: "/images/neha_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/neha.png",
  },
  {
    name: "Teja",
    company: "LVIS",
    linkedinUrl: "https://www.linkedin.com",
    imagePath: "/images/teja_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/TEJA.jpeg",
  },
  {
    name: "Amit",
    company: "Armorcode",
    linkedinUrl: "#",
    imagePath: "/images/amit_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
  },
  {
    name: "Rudraksh",
    company: "State Street",
    linkedinUrl: "#",
    imagePath: "/images/rudraksh_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rudraksh.jpg",
  },
  // {
  //   name: "Sai Krishna",
  //   company: "Urban Electric Power",
  //   linkedinUrl: "https://www.linkedin.com/in/sai-krishna-grandhi/",
  //   imagePath: "/images/saikrishna_offer.png",
  //   profileImagePath:
  //     "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/SAI%20KRISHNA.jpeg",
  // },
  {
    name: "Rijul Jain",
    company: "Wise",
    linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
    imagePath: "/images/rijul_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  },
  {
    name: "Aman Guleria",
    company: "Barclays",
    linkedinUrl: "#",
    imagePath: "/images/aman_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
  },
  
];


export default function HomePageOfferLettersClient({
  heading = "40+ Offer letters received",
  variant = "split",
  autoScroll = false,
  enableLoopControls = false,
  buttonOnlyScroll = false,
}: HomePageOfferLettersClientProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isAutoVariant = variant === "auto";
  const visibleOfferLetters = isAutoVariant
    ? [...offerLetters, ...offerLetters]
    : offerLetters;

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!autoScroll || !isAutoVariant || !carousel) {
      return;
    }

    let frameId = 0;
    const scrollSpeed = 0.45;

    const scroll = () => {
      const resetPoint = carousel.scrollWidth / 2;

      if (carousel.scrollLeft >= resetPoint) {
        carousel.scrollLeft -= resetPoint;
      } else {
        carousel.scrollLeft += scrollSpeed;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [autoScroll, isAutoVariant]);

  const scrollOffers = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    if (!enableLoopControls) {
      carousel.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
      return;
    }

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const scrollAmount = Math.min(carousel.clientWidth * 0.85, 380);
    const isAtStart = carousel.scrollLeft <= 1;
    const isAtEnd = carousel.scrollLeft >= maxScrollLeft - 1;
    let nextScrollLeft = carousel.scrollLeft;

    if (direction === "right" && isAtEnd) {
      nextScrollLeft = 0;
    } else if (direction === "left" && isAtStart) {
      nextScrollLeft = maxScrollLeft;
    } else if (direction === "left") {
      nextScrollLeft = Math.max(0, carousel.scrollLeft - scrollAmount);
    } else {
      nextScrollLeft = Math.min(maxScrollLeft, carousel.scrollLeft + scrollAmount);
    }

    carousel.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  };

  return (

    <section
      className={`${styles.offerSection} ${
        isAutoVariant ? styles.autoOfferSection : ""
      }`}
    >
      <div
        className={`${styles.offerContent} ${
          isAutoVariant ? styles.autoOfferContent : ""
        }`}
      >
        <div
          className={`${styles.offerIntro} ${
            isAutoVariant ? styles.autoOfferIntro : ""
          }`}
        >
          <h2 className={styles.offerHeading}>{heading}</h2>
          {isAutoVariant ? (
            <p className={styles.offerSubHeading}>
              Real Results From Our <strong>AI Job Application Platform</strong>
            </p>
          ) : (
            <p className={styles.offerSubHeading}>
              Trusted by job seekers across the U.S. Real applications. Real
              interviews. Real offer letters that turned opportunities into
              successful careers.
            </p>
          )}

          {!isAutoVariant && (
            <div className={styles.arrowControls} aria-label="Offer letter navigation">
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Previous offer letter"
                onClick={() => scrollOffers("left")}
              >
                &larr;
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Next offer letter"
                onClick={() => scrollOffers("right")}
              >
                &rarr;
              </button>
            </div>
          )}
        </div>

        <div
          className={`${styles.offerCarousel} ${
            buttonOnlyScroll ? styles.buttonOnlyCarousel : ""
          } ${isAutoVariant ? styles.autoOfferCarousel : ""
          }`}
          ref={carouselRef}
        >
          {visibleOfferLetters.map((offer, i) => (
            <div
              key={`${offer.name}-${i}`}
              className={`${styles.offerCard} ${
                isAutoVariant ? styles.autoOfferCard : ""
              }`}
            >
              <div className={styles.imagePlaceholder}>
                <Image
                  src={offer.imagePath}
                  alt={`Offer Letter - ${offer.name}`}
                  fill
                  sizes="260px"
                  className={styles.offerImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/offer-placeholder.jpg";
                  }}
                />
              </div>

              <div className={styles.offerOverlay}>
                <div className={styles.profileInfo}>
                  <div className={styles.avatar}>
                    <Image
                      src={offer.profileImagePath || offer.imagePath}
                      alt={offer.name}
                      width={28}
                      height={28}
                      className={styles.avatarImage}
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className={styles.name}>{offer.name}</p>
                    <p className={styles.company}>{offer.company}</p>
                  </div>
                </div>
                {offer.linkedinUrl !== "#" ? (
                  <Link
                    href={offer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinIcon}
                  >
                    in
                  </Link>
                ) : (
                  <span className={`${styles.linkedinIcon} ${styles.linkedinIconDummy}`}>
                    in
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
