"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StrategyCallPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger Calendly modal directly
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-[#f4fbf7] px-4 py-16 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Opening calendar...</p>
      </div>
    </main>
  );
}