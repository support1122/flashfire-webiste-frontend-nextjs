"use client";

import { usePathname, useRouter } from "next/navigation";
import ContactForm from "./contactForm";
import { FaEnvelope, FaPhone, FaBuilding, FaUser, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

export default function ContactUsClient() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScheduleDemo = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Contact_Us_Page"
          : "Contact_Us_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Contact_Us_Schedule_Demo_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Schedule A Demo", "contact_us_cta", "cta", {
          button_location: "contact_us_sales_enquiry",
          section: "contact_us",
        });
        trackSignupIntent("contact_us_cta", {
          signup_source: "contact_us_schedule_demo_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/get-me-interview" ||
        normalizedPath === "/en-ca/get-me-interview";
      const isOnContactUsPage =
        normalizedPath === "/contact-us" ||
        normalizedPath === "/en-ca/contact-us";

      // If already on get-me-interview, just show modal
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
      }

      // If on contact us page, change URL but keep page content visible
      if (isOnContactUsPage) {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem(
            "previousPageBeforeGetMeInterview",
            normalizedPath
          );
          sessionStorage.setItem(
            "preserveScrollPosition",
            currentScrollY.toString()
          );
        }

        const targetPath = normalizedPath.startsWith("/en-ca")
          ? "/en-ca/get-me-interview"
          : "/get-me-interview";
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }

      // Navigate to get-me-interview
      const targetPath = "/get-me-interview";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Schedule Demo handler:", error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Contact Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mb-16">
          {/* Left Panel: Contact Information */}
          <div className="flex flex-col mt-16 ">
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              Contact{" "}
              <span className="text-[#ff4c00]">Flashfire</span>
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're thrilled to connect! Contact us to learn about our products, get job search tips, or make corporate inquiries anytime.
            </p>
          </div>

          {/* Right Panel: Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
            <ContactForm />
          </div>
        </div>

        {/* Bottom Section: Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Customer Support */}
          <div className="bg-gradient-to-br from-[#fff1ec] to-white rounded-xl p-6 border border-orange-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Customer Support
            </h3>
            <p className="text-gray-600 mb-4">
              Got questions? We're just an email away.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:support@flashfirejobs.com"
                className="text-[#ff4c00] font-semibold uppercase text-sm hover:underline"
              >
                SUPPORT@FLASHFIREJOBS.COM
              </a>
              
            </div>
          </div>

          {/* Card 2: Sales Enquiry */}
          <div className="bg-gradient-to-br from-[#fff1ec] to-white rounded-xl p-6 border border-orange-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Sales Enquiry
            </h3>
            <p className="text-gray-600 mb-4">
              Partner with us to elevate your career solutions.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleScheduleDemo}
                className="text-[#ff4c00] font-semibold uppercase text-sm hover:underline text-left"
              >
                SCHEDULE A DEMO
              </button>
              <a
                href="/pricing"
                className="text-[#ff4c00] font-semibold uppercase text-sm hover:underline"
              >
                KNOW MORE
              </a>
        </div>
      </div>

          {/* Card 3: Join our Community */}
          <div className="bg-gradient-to-br from-[#fff1ec] to-white rounded-xl p-6 border border-orange-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Join our Community
            </h3>
            <p className="text-gray-600 mb-4">
              Join our community for career tips and updates.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/flashfire-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#ff4c00] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/flashfirejobs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#ff4c00] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/@flashfireindia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#ff4c00] transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
