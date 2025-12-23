"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./homePageVideo.module.css";

// Global flag to track if video has been loaded (prevents reloading)
let globalVideoLoaded = false;

export default function HomePageVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const hasLoadedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (!videoRef.current || hasLoadedRef.current) return;

    const video = videoRef.current;
    const videoUrl = '/videos/ii.mp4';

    video.preload = 'auto';

    if (isInitialLoadRef.current && !globalVideoLoaded) {
      video.load();
      globalVideoLoaded = true;
      isInitialLoadRef.current = false;
    }

    const handleCanPlay = () => {
      setIsVideoReady(true);
      hasLoadedRef.current = true;
    };

    const handleLoadedData = () => {
      setIsVideoReady(true);
      hasLoadedRef.current = true;
    };

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
    };

    // Prevent reloading - if video already has data, don't reload
    const handleLoadStart = () => {
      if (hasLoadedRef.current && video.readyState >= 2) {
        // Video already loaded, prevent reload by stopping the load
        // We can't prevent it directly, but we can track it
        console.debug('Video load attempted but already loaded');
      }
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    video.addEventListener('loadstart', handleLoadStart);

    // Add link preload in head (only once globally)
    if (!document.querySelector(`link[href="${videoUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoUrl;
      link.type = 'video/mp4';
      document.head.appendChild(link);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  // Intersection Observer to handle play/pause - NO RELOADING
  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const video = videoRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            // Video is in viewport - play it (NEVER reload)
            if (video.readyState >= 2) {
              // Video has enough data to play
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  // Ignore autoplay errors (browser policy)
                  console.debug('Video autoplay prevented:', error);
                });
              }
            } else if (!hasLoadedRef.current && !globalVideoLoaded) {
              // Only load if never loaded before
              video.load();
            }
          } else {
            // Video is out of viewport - pause it (keep loaded, don't reload)
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '150px', // Start playing 150px before entering viewport
        threshold: [0, 0.25, 0.5], // Multiple thresholds
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section 
      id="demo" 
      ref={containerRef}
      className={styles.videoContainer}
    >
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          controls
          muted
          loop
          playsInline
          preload="auto"
          // Remove autoPlay to prevent reloading - use Intersection Observer instead
        >
          <source src="/videos/ii.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <span></span>
      </div>
    </section>
  );
}
