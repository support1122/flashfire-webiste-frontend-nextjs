"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackLead } from "@/lib/metaPixel";

export default function MeetingBookedPage() {
  const conversionTracked = useRef(false);

  // Trigger conversion tracking when URL changes to /meeting-booked
  useEffect(() => {
    if (typeof window === "undefined" || conversionTracked.current) return;
    conversionTracked.current = true;

    const utmSource = localStorage.getItem("utm_source") || "direct";
    const visitorId = localStorage.getItem("visitor_id") || null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.flashfirejobs.com";

    // 1. Track Facebook Pixel Lead conversion (client-side)
    trackLead({
      content_name: "Meeting Booked",
      content_category: "Consultation",
      value: 0,
      currency: "USD",
    });

    // 2. Track conversion in our backend campaign system
    fetch(`${API_BASE_URL}/api/campaigns/track/conversion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utmSource,
        visitorId,
        conversionType: "meeting_booked",
        pageUrl: "/meeting-booked",
        userAgent: navigator.userAgent,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // Conversion tracked in campaign system
      })
      .catch((err) => console.error("Campaign conversion track failed:", err));

    // 3. Track via Facebook Conversions API (server-side)
    // Get user data from localStorage if available
    const userEmail = localStorage.getItem("cal_invitee_email") || null;
    const userName = localStorage.getItem("cal_invitee_name") || null;
    const firstName = userName?.split(' ')[0] || null;
    const lastName = userName?.split(' ').slice(1).join(' ') || null;

    fetch(`${API_BASE_URL}/api/facebook/track/meeting-booked`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
        eventId: `meeting_booked_${Date.now()}_${visitorId || 'unknown'}`,
        eventSourceUrl: window.location.href,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // Facebook Conversions API tracked
      })
      .catch((err) => console.error("Facebook Conversions API track failed:", err));
  }, []);

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
