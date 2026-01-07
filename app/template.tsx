'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { smoothScrollToElement, smoothScrollTo } from '@/src/utils/smoothScroll';

/**
 * Template component that wraps all pages
 * Handles scroll restoration, ensures scroll to top on navigation, and handles hash anchors
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we should preserve scroll (from sessionStorage)
    const preserveScroll = sessionStorage.getItem('preserveScrollPosition');
    
    // Check for pending scroll anchor from footer click (stored without hash in URL)
    const pendingAnchor = sessionStorage.getItem('pendingScrollAnchor');
    
    // Immediately scroll to top so new content is visible right away
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Add fade-in effect to new page
    if (containerRef.current) {
      containerRef.current.classList.remove('page-transition-out');
      containerRef.current.classList.add('page-transition-in');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.remove('page-transition-in');
      }
    }, 600);
    
    if (pendingAnchor && !preserveScroll) {
      // Clear the pending anchor immediately
      sessionStorage.removeItem('pendingScrollAnchor');
      
      // Wait for page to render, then smooth scroll to anchor (already at top, so this ensures we stay at top)
      setTimeout(() => {
        const tryScroll = (count = 0) => {
          const element = document.getElementById(pendingAnchor);
          if (element) {
            // Ensure we're at absolute top with smooth scroll
            smoothScrollToElement(pendingAnchor, {
              duration: 800,
              easing: 'easeInOutCubic',
              offset: 0, // Scroll to absolute top
            });
          } else if (count < 20) {
            // Retry up to 20 times (4 seconds max)
            setTimeout(() => tryScroll(count + 1), 100);
          }
        };
        tryScroll();
      }, 100); // Start scrolling ASAP, don't wait for fade-in
    } else if (!preserveScroll) {
      // Already scrolled to top above, just ensure smooth feel
      setTimeout(() => {
        smoothScrollTo(0, {
          duration: 600,
          easing: 'easeInOutCubic',
        });
      }, 50);
    }
  }, [pathname]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
}
