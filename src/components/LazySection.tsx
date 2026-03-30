"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  /** How far before the viewport to start loading (px). Default 200. */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** Optional className for the wrapper */
  className?: string;
};

/**
 * Defers mounting of children until the section scrolls near the viewport.
 * Once mounted, children stay mounted forever (no unmount on scroll-away).
 */
export default function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "100px",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={mounted ? undefined : { minHeight }}>
      {mounted ? children : null}
    </div>
  );
}
