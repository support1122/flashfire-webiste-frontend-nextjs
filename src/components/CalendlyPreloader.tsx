"use client";
import { useEffect, useRef } from "react";

/**
 * Silently loads a hidden Calendly iframe after the page is idle.
 * This warms the browser's HTTP cache with Calendly's static assets
 * (JS, CSS, fonts, images) so the real modal iframe loads near-instantly.
 */
export default function CalendlyPreloader() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const schedulePreload = () => {
      if (iframeRef.current) return;

      const iframe = document.createElement("iframe");
      iframe.src =
        "https://calendly.com/feedback-flashfire/30min?embed_domain=1&embed_type=Inline";
      iframe.setAttribute("aria-hidden", "true");
      iframe.setAttribute("tabindex", "-1");
      iframe.title = "";
      iframe.style.cssText =
        "position:absolute;width:0;height:0;border:0;overflow:hidden;clip:rect(0,0,0,0);pointer-events:none;";
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    };

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(schedulePreload, {
        timeout: 3000,
      });
      return () => {
        (window as any).cancelIdleCallback(id);
        if (iframeRef.current) {
          iframeRef.current.remove();
          iframeRef.current = null;
        }
      };
    } else {
      const timer = setTimeout(schedulePreload, 3000);
      return () => {
        clearTimeout(timer);
        if (iframeRef.current) {
          iframeRef.current.remove();
          iframeRef.current = null;
        }
      };
    }
  }, []);

  return null;
}
