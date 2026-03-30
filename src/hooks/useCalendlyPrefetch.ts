"use client";
import { useCallback, useRef } from "react";

/**
 * Hook that prefetches Calendly resources on hover/focus intent.
 * Adds a prefetch link for the Calendly page and preloads the CalendlyModal JS chunk.
 * Only runs once per page load.
 */
export function useCalendlyPrefetch() {
  const prefetched = useRef(false);

  const onPointerEnter = useCallback(() => {
    if (prefetched.current) return;
    prefetched.current = true;

    // Prefetch the Calendly scheduling page
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "https://calendly.com/feedback-flashfire/30min";
    document.head.appendChild(link);

    // Preload the CalendlyModal JS chunk
    import("@/src/components/calendlyModal/CalendlyModal").catch(() => {});
  }, []);

  return { onPointerEnter };
}
