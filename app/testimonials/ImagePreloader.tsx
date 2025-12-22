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

    // Preload critical images (first 20) for instant display
    const criticalImages = ALL_REVIEW_IMAGES.slice(0, 20);
    criticalImages.forEach((imageSrc, index) => {
      const optimizedUrl = optimizeCloudinaryUrl(imageSrc, 1200);
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedUrl;
      document.head.appendChild(link);
    });

    return () => {
    };
  }, []);

  return null; // This component doesn't render anything
}

