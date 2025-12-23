"use client";

import { useEffect } from "react";
import { ALL_REVIEW_IMAGES } from "./homePageHappyUsers/homePageHappyUsers";

// Helper function to optimize Cloudinary URLs
const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:good,w_${width},c_limit,dpr_auto/${parts[1]}`;
    }
  }
  return url;
};

// Video thumbnail images from homePageHappyUsers
const videoThumbnails = [
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-19.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-20.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-18.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
];

/**
 * Comprehensive preloader for home page
 * Preloads ALL images and videos immediately when page loads
 * Uses efficient batching to avoid blocking the main thread
 */
export default function HomePagePreloader() {
  useEffect(() => {
    // Add preconnect and dns-prefetch for Cloudinary
    const addResourceHints = () => {
      // Cloudinary preconnect
      if (!document.querySelector('link[href="https://res.cloudinary.com"]')) {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://res.cloudinary.com';
        document.head.appendChild(preconnect);
      }

      // Cloudinary DNS prefetch
      if (!document.querySelector('link[href="https://res.cloudinary.com"][rel="dns-prefetch"]')) {
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = 'https://res.cloudinary.com';
        document.head.appendChild(dnsPrefetch);
      }

      // R2 bucket preconnect for video thumbnails
      if (!document.querySelector('link[href="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev"]')) {
        const r2Preconnect = document.createElement('link');
        r2Preconnect.rel = 'preconnect';
        r2Preconnect.href = 'https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev';
        document.head.appendChild(r2Preconnect);
      }
    };

    addResourceHints();

    // Preload video file immediately with advanced caching
    const preloadVideo = () => {
      const videoUrl = '/videos/ii.mp4';
      
      // Check if already preloaded
      if (document.querySelector(`link[href="${videoUrl}"]`)) {
        return; // Already preloaded
      }

      // Create video element for preloading (hidden, not in DOM)
      const preloadVideo = document.createElement('video');
      preloadVideo.preload = 'auto';
      preloadVideo.src = videoUrl;
      preloadVideo.muted = true;
      preloadVideo.style.display = 'none';
      preloadVideo.style.position = 'absolute';
      preloadVideo.style.width = '1px';
      preloadVideo.style.height = '1px';
      preloadVideo.style.opacity = '0';
      preloadVideo.style.pointerEvents = 'none';
      
      preloadVideo.load();
      
      preloadVideo.addEventListener('loadedmetadata', () => {
        if (preloadVideo.readyState < 3) {
          preloadVideo.load();
        }
      }, { once: true });

      // Add to body (hidden) to ensure it loads
      document.body.appendChild(preloadVideo);
      
      // Also add as link preload for better browser optimization
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoUrl;
      link.type = 'video/mp4';
      document.head.appendChild(link);

      preloadVideo.addEventListener('canplaythrough', () => {
        setTimeout(() => {
          if (preloadVideo.parentNode) {
            preloadVideo.parentNode.removeChild(preloadVideo);
          }
        }, 1000);
      }, { once: true });
    };

    preloadVideo();
    const preloadAllImages = () => {
      const batchSize = 8;
      let currentBatch = 0;
      const totalImages = ALL_REVIEW_IMAGES.length;

      const loadBatch = () => {
        const start = currentBatch * batchSize;
        const end = Math.min(start + batchSize, totalImages);

        for (let i = start; i < end; i++) {
          const url = ALL_REVIEW_IMAGES[i];
          const optimizedUrl = optimizeCloudinaryUrl(url, 800);
          
          const img = new window.Image();
          img.src = optimizedUrl;
          img.loading = 'eager';
          
          if (i < 24) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = optimizedUrl;
            document.head.appendChild(link);
          }
        }

        currentBatch++;
        
        if (end < totalImages) {
          setTimeout(loadBatch, 50);
        }
      };
    loadBatch();
    };

    const preloadVideoThumbnails = () => {
      videoThumbnails.forEach((url) => {
        const img = new window.Image();
        img.src = url;
        img.loading = 'eager';
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
      });
    };

    preloadAllImages();
    preloadVideoThumbnails();

    const characterImg = new window.Image();
    characterImg.src = '/images/character1.png';
    characterImg.loading = 'eager';

    const characterLink = document.createElement('link');
    characterLink.rel = 'preload';
    characterLink.as = 'image';
    characterLink.href = '/images/character1.png';
    document.head.appendChild(characterLink);

  }, []);

  return null;
}

