"use client";

import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { Target, Rocket, Handshake, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "STEP 1: You Share Your Goals & Location",
    description: "We learn your job preferences, skills, and where you want to work.",
    icon: Target,
  },
  {
    id: 2,
    title: "STEP 2: We Scan Jobs Matching Your Criteria",
    description: "Flashfire filters roles near you that match your skills, visa status, salary expectations, and more.",
    icon: Rocket,
  },
  {
    id: 3,
    title: "STEP 3: Our Team Applies for You",
    description: "A dedicated team of 4-5 trained professionals applies manually to each role - so your resume lands where it matters.",
    icon: Handshake,
  },
  {
    id: 4,
    title: "STEP 4: You Get Updates",
    description: "You see where applications are sent and how they perform - without doing it yourself.",
    icon: Trophy,
  },
];

export default function JobSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetStarted = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Search_Page"
          : "Job_Search_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Search_Get_Started_Button",
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
        trackButtonClick("Get Started With Flashfire", "job_search_cta", "cta", {
          button_location: "job_search_cta_section",
          section: "job_search_cta",
        });
        trackSignupIntent("job_search_cta", {
          signup_source: "job_search_cta_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path first
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/get-me-interview" ||
        normalizedPath === "/en-ca/get-me-interview";
      const isOnJobSearchPage =
        normalizedPath === "/job-search" ||
        normalizedPath === "/en-ca/job-search";

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
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
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      // If on job search page, change URL but keep page content visible
      if (isOnJobSearchPage) {
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

      // Only navigate if NOT already on the page
      const targetPath = "/get-me-interview";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Get Started handler:", error);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fff0e6]">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight text-center">
            Find Jobs Faster With<br />
            <span className="text-[#ff4c00]">Human-Powered</span> Automation.
          </h1>

          {/* Sub-heading */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-black/80 mb-10 leading-relaxed max-w-3xl mx-auto text-center">
            Flashfire applies to relevant jobs on your behalf so you don&apos;t have
            to search manually.
          </p>

          {/* Key Benefits */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#ff4c00]/20">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff4c00] font-bold text-lg mt-0.5">▪</span>
                  <span className="text-base sm:text-lg font-semibold text-black">
                    Flashfire scans job listings near your location
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff4c00] font-bold text-lg mt-0.5">▪</span>
                  <span className="text-base sm:text-lg font-semibold text-black">
                    Our team applies to matched roles for you
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff4c00] font-bold text-lg mt-0.5">▪</span>
                  <span className="text-base sm:text-lg font-semibold text-black">
                    You get updates without lifting a finger
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              {...getButtonProps()}
              onClick={handleGetStarted}
              className="bg-[#ff4c00] text-white px-8 py-4 font-bold text-lg rounded-lg hover:bg-[#e64400] transition-colors inline-flex items-center gap-2"
            >
              Get me interview
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Middle Section - Behind the Scenes */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 md:p-16">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff4c00] mb-3">
                Behind the Scenes of Your Job Search
              </h2>
              <div className="w-16 h-1 bg-[#ff4c00] mx-auto" />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.id}
                    className="bg-[#ff4c00] rounded-xl p-6 sm:p-8 text-white border border-[#ff4c00]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff4c00] mb-3 leading-tight">
            Ready to Let Flashfire Search & Apply for You?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/70 mb-8 max-w-2xl mx-auto">
            Set the goal. Flashfire runs the system.
          </p>

          <button
            {...getButtonProps()}
            onClick={handleGetStarted}
            className="bg-white border-2 border-[#ff4c00] text-[#ff4c00] px-8 py-4 font-bold text-lg rounded-lg hover:bg-[#fff0e6] transition-colors inline-flex items-center gap-2"
          >
            Get Started With Flashfire
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}