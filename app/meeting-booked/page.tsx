"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import * as fbq from "@/lib/metaPixel";

export default function MeetingBookedPage() {
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    // Track Facebook Pixel conversion event only once
    if (!hasTracked && typeof window !== "undefined") {
      try {
        // Get user data from localStorage (set during booking)
        const inviteeEmail =
          typeof window !== "undefined"
            ? localStorage.getItem("cal_invitee_email") || ""
            : "";
        const inviteeName =
          typeof window !== "undefined"
            ? localStorage.getItem("cal_invitee_name") || ""
            : "";

        // Get UTM parameters for better attribution
        const utm_source =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_source") || "direct"
            : "direct";
        const utm_medium =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_medium") || "website"
            : "website";
        const utm_campaign =
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "organic"
            : "organic";

        // Track Schedule event (standard Facebook event for meeting bookings)
        fbq.event("Schedule", {
          content_name: "Meeting Booked",
          content_category: "Consultation",
          value: 0,
          currency: "USD",
          // User data for better matching
          ...(inviteeEmail && { em: inviteeEmail.toLowerCase() }),
          ...(inviteeName && { fn: inviteeName.split(" ")[0] }),
          ...(inviteeName && { ln: inviteeName.split(" ").slice(1).join(" ") }),
          // UTM parameters for attribution
          utm_source,
          utm_medium,
          utm_campaign,
        });

        console.log("✅ Facebook Pixel Schedule event tracked:", {
          email: inviteeEmail,
          name: inviteeName,
          utm_source,
          utm_medium,
          utm_campaign,
        });

        setHasTracked(true);
      } catch (error) {
        console.error("❌ Failed to track Facebook Pixel event:", error);
      }
    }
  }, [hasTracked]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Meeting Booked Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Your consultation is confirmed. Check your email for the calendar
            invite and meeting details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
