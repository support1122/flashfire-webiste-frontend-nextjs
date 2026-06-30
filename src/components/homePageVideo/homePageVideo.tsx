"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./homePageVideo.module.css";

export default function HomePageVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState(14);
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element top hits viewport bottom, 1 when it reaches 35% from top
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.65)));
      setTilt(14 * (1 - progress));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="demo" ref={sectionRef} className={styles.videoContainer}>
      <div
        className={styles.videoWrapper}
        style={{
          transform: `perspective(1100px) rotateX(${tilt}deg)`,
          transformOrigin: "center bottom",
          transition: "transform 0.18s ease-out",
        }}
      >
        <video
          className={styles.videoPlayer}
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/video-thumbnail.png"
        >
          <source src="/videos/ii.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <span></span>
      </div>
    </section>
  );
}
