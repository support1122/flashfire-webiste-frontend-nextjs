"use client";

import { useEffect } from "react";
import { smoothScrollToElement } from "../smoothScroll";

type ScrollToSectionProps = {
  targetId: string;
};

export default function ScrollToSection({
  targetId,
}: ScrollToSectionProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const attemptScroll = (attempt = 1, maxAttempts = 10) => {
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        smoothScrollToElement(targetId, {
          duration: 800, 
          easing: 'easeInOutCubic',
        }).then(() => {
          console.log(`✅ Smoothly scrolled to section: ${targetId}`);
        });
      } else if (attempt < maxAttempts) {
        console.log(`⏳ Waiting for section "${targetId}" to render (attempt ${attempt}/${maxAttempts})...`);
        setTimeout(() => attemptScroll(attempt + 1, maxAttempts), 100);
      } else {
        console.warn(`❌ Could not find section with id="${targetId}" after ${maxAttempts} attempts`);
      }
    };

    const scrollTimer = setTimeout(() => attemptScroll(), 100);

    return () => clearTimeout(scrollTimer);
  }, [targetId]);

  return null;
}

