"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Routes to prefetch during idle time — ordered by popularity
const PREFETCH_ROUTES = [
  "/features",
  "/features/ats-resume-optimizer",
  "/features/automated-job-applications",
  "/features/linkedin-profile-optimization-tool",
  "/features/ai-job-targeting",
  "/features/job-application-tracker",
  "/features/dashboard-analytics",
  "/features/ai-cover-letter-generator",
  "/features/interview-tips",
  "/pricing",
  "/testimonials",
];

export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Use requestIdleCallback to prefetch during browser idle time
    // This ensures we don't compete with critical rendering work
    const prefetchRoutes = () => {
      let index = 0;

      const prefetchNext = (deadline?: IdleDeadline) => {
        // Prefetch routes while we have idle time remaining
        while (index < PREFETCH_ROUTES.length) {
          if (deadline && deadline.timeRemaining() < 5) {
            // Not enough idle time, schedule next batch
            requestIdleCallback(prefetchNext);
            return;
          }
          router.prefetch(PREFETCH_ROUTES[index]);
          index++;
        }
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(prefetchNext, { timeout: 5000 });
      } else {
        // Fallback: prefetch after a delay
        setTimeout(() => {
          PREFETCH_ROUTES.forEach((route) => router.prefetch(route));
        }, 3000);
      }
    };

    // Wait for the page to be fully interactive before prefetching
    if (document.readyState === "complete") {
      prefetchRoutes();
    } else {
      window.addEventListener("load", prefetchRoutes, { once: true });
    }
  }, [router]);

  return null;
}
