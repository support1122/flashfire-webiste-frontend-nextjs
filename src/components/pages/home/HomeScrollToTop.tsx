"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Tiny client component — scrolls to top on homepage mount */
export default function HomeScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/" || pathname === "/en-ca") {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    }
  }, [pathname]);

  return null;
}
