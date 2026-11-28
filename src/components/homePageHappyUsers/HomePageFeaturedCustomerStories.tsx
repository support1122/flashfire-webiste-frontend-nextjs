"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./homePageFeaturedCustomerStories.module.css";

const FEATURED_VIDEO = "https://www.youtube.com/embed/p41OvikonKo?autoplay=1&rel=0";
const FEATURED_THUMBNAIL = "/images/thumbnail-anjali.png";
const REVIEW_ASSETS_BASE = "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/happy-users-sc%20copy";

type Props = {
  reviewImages: string[];
};

export default function HomePageFeaturedCustomerStories({ reviewImages }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const reviewCards = [
    `${REVIEW_ASSETS_BASE}/image9.png`,
    `${REVIEW_ASSETS_BASE}/image10.jpg`,
  ];

  return (
    <section className={styles.section} aria-labelledby="customer-stories-title">
      <header className={styles.sectionHeader}>
        <h2 id="customer-stories-title">Real people. Real job-search progress.</h2>
      </header>
      <div className={styles.layout}>
        <article className={styles.featuredStory}>
          <div className={styles.storyTopline}>
            <span>Featured customer story</span>
            <span className={styles.number}>01</span>
          </div>
          <div className={styles.person}>
            <Image
              src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg"
              alt="Anjali Shah"
              width={56}
              height={56}
              className={styles.avatar}
              unoptimized
            />
            <div>
              <strong>Anjali Shah</strong>
              <span>Skyworks Solutions, Inc.</span>
            </div>
          </div>
          <h2>Job-search support, from the first match to the next opportunity.</h2>
          <p className={styles.summary}>
            Flashfire helps take the busywork off your plate with targeted applications,
            a resume tailored to every role, and progress updates along the way.
          </p>
          <ol className={styles.benefits}>
            <li><span>01</span>Roles matched to your goals</li>
            <li><span>02</span>Resume tailored for each application</li>
            <li><span>03</span>Applications and progress tracked</li>
          </ol>
          <div className={styles.supportNote}>
            <span className={styles.sparkle} aria-hidden="true">✦</span>
            <div>
              <strong>A dedicated team supporting your search</strong>
              <span>Personal guidance helps you move forward at every step.</span>
            </div>
          </div>
        </article>

        <div className={styles.mediaColumn}>
          <div className={styles.reviewGrid}>
            {reviewCards.map((imageSrc, index) => (
              <article className={styles.reviewCard} key={index}>
                <div className={styles.cardTopline}>
                  <strong>{index % 2 === 0 ? "Customer review" : "Job-seeker feedback"}</strong>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.reviewImageFrame}>
                  <Image
                    src={imageSrc}
                    alt={`Flashfire customer feedback ${index + 1}`}
                    fill
                    sizes="(max-width: 760px) 90vw, 25vw"
                    className={styles.reviewImage}
                    unoptimized
                  />
                </div>
                <p>Feedback shared by Flashfire users.</p>
              </article>
            ))}
          </div>

          <article className={styles.videoCard}>
            <div className={styles.cardTopline}>
              <strong>Customer video story</strong>
              <span className={styles.nameTag}>Anjali Shah</span>
            </div>
            <div className={styles.videoFrame}>
              {isPlaying ? (
                <iframe
                  src={FEATURED_VIDEO}
                  title="Anjali Shah’s Flashfire customer story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  className={styles.videoButton}
                  type="button"
                  data-story-play
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play Anjali Shah’s customer story"
                >
                  <Image
                    src={FEATURED_THUMBNAIL}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 90vw, 50vw"
                    className={styles.videoThumbnail}
                    unoptimized
                  />
                  <span className={styles.playIcon} aria-hidden="true">▶</span>
                  <span className={styles.videoCaption}>Watch Anjali Shah’s story</span>
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
