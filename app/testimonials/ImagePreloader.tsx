"use client";

import { useEffect } from "react";
import { ALL_REVIEW_IMAGES } from "@/src/components/homePageHappyUsers/homePageHappyUsers";

const optimizeCloudinaryUrl = (url: string, width: number = 1200) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:best,w_${width},c_limit,dpr_auto/${parts[1]}`;
    }
  }
  return url;
};

export default function ImagePreloader() {
  useEffect(() => {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://res.cloudinary.com';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://res.cloudinary.com';
    document.head.appendChild(dnsPrefetch);

    const preloadAllImages = () => {
      const batchSize = 10; // Load 10 images at a time to avoid blocking
      let currentBatch = 0;
      const totalImages = ALL_REVIEW_IMAGES.length;

      const loadBatch = () => {
        const start = currentBatch * batchSize;
        const end = Math.min(start + batchSize, totalImages);

        for (let i = start; i < end; i++) {
          const imageSrc = ALL_REVIEW_IMAGES[i];
          const optimizedUrl = optimizeCloudinaryUrl(imageSrc, 1200);
          
          // Create image element to preload
          const img = new window.Image();
          img.src = optimizedUrl;
          img.loading = 'eager';
          
          // Also add as link preload for critical images (first 30)
          if (i < 30) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = optimizedUrl;
            document.head.appendChild(link);
          }
        }

        currentBatch++;
        
        if (end < totalImages) {
          setTimeout(loadBatch, 40); // 40ms delay between batches
        }
      };

      loadBatch();
    };

    preloadAllImages();

    return () => {
    };
  }, []);

  return null; // This component doesn't render anything
}

