/**
 * Scrolls to the absolute top of the page (position 0)
 * Handles Next.js scroll restoration, sticky elements, and CSS scroll-behavior
 * 
 * @param options - Configuration options for scrolling
 * @param options.behavior - Scroll behavior: 'smooth' or 'instant' (default: 'instant')
 * @param options.delay - Delay in milliseconds before scrolling (default: 0)
 */
export function scrollToTop(options: {
  behavior?: 'smooth' | 'instant';
  delay?: number;
} = {}): void {
  const { behavior = 'instant', delay = 0 } = options;

  if (typeof window === 'undefined') {
    return;
  }

  const performScroll = () => {
    // Clear any preserved scroll position from sessionStorage
    try {
      sessionStorage.removeItem('preserveScrollPosition');
    } catch (e) {
      // Ignore errors
    }

    // Temporarily disable smooth scroll behavior from CSS
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    if (behavior === 'instant') {
      htmlElement.style.scrollBehavior = 'auto';
    }

    // Force scroll to absolute top using multiple methods
    const forceScrollToZero = () => {
      // Method 1: window.scrollTo with coordinates
      window.scrollTo(0, 0);

      // Method 2: Direct property assignment
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      }

      // Method 3: window.scrollTo with options
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    };

    // Execute immediately
    forceScrollToZero();

    // Execute in next animation frame
    requestAnimationFrame(() => {
      forceScrollToZero();

      // Execute after a short delay to catch browser scroll restoration
      setTimeout(() => {
        forceScrollToZero();

        // One more check after layout
        requestAnimationFrame(() => {
          forceScrollToZero();

          // Final check after more time
          setTimeout(() => {
            forceScrollToZero();

            // Restore original scroll behavior
            if (behavior === 'instant') {
              htmlElement.style.scrollBehavior = originalScrollBehavior;
            }
          }, 100);
        });
      }, 50);
    });
  };

  if (delay > 0) {
    setTimeout(performScroll, delay);
  } else {
    performScroll();
  }
}

/**
 * Scrolls to top immediately without animation
 * Useful for route changes where you want instant scroll
 */
export function scrollToTopInstant(): void {
  scrollToTop({ behavior: 'instant', delay: 0 });
}

/**
 * Scrolls to top with smooth animation
 * Useful for user-initiated scrolls
 */
export function scrollToTopSmooth(): void {
  scrollToTop({ behavior: 'smooth', delay: 0 });
}

