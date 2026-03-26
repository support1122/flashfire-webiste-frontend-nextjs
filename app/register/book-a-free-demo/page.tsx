"use client";

import RegisterPage from "@/src/components/register/Register";
import { useEffect } from "react";

export default function GetStartedRegisterPage() {
  useEffect(() => {
    // 1. Restore scroll (if exists)
    const savedScrollY = sessionStorage.getItem("preserveScrollPosition");

    if (savedScrollY) {
      const scrollY = parseInt(savedScrollY, 10);

      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "instant" });
      });

      sessionStorage.removeItem("preserveScrollPosition");
    }

    // 2. Open modal (IMPORTANT)
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  }, []);

  return <RegisterPage />;
}