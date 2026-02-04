"use client";

import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { Target, Rocket, Handshake, Trophy } from "lucide-react";

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
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#fff0e6] py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main Heading - centered */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 sm:mb-6 leading-tight text-center">
            Find Jobs Faster With<br />
            <span className="text-[#ff4c00] font-bold">Human-Powered</span> Automation.
          </h1>

          {/* Sub-heading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto text-center px-0 sm:px-2">
            Flashfire applies to relevant jobs on your behalf so you don't have
            to search manually.
          </p>

          {/* Key Benefits - centered container, left-aligned list for clean wrap */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
            <ul className="flex flex-col items-center gap-3 sm:gap-4 text-center list-none pl-0">
              <li className="flex items-center justify-center gap-3">
                <span className="text-black font-bold text-lg shrink-0">▪</span>
                <span className="text-base sm:text-lg font-bold text-black leading-snug">
                  Flashfire scans job listings near your location
                </span>
              </li>
              <li className="flex items-center justify-center mr-[28px] gap-3">
                <span className="text-black font-bold text-lg shrink-0">▪</span>
                <span className="text-base sm:text-lg font-bold text-black leading-snug">
                  Our team applies to matched roles for you
                </span>
              </li>
              <li className="flex items-center justify-center mr-[46px] gap-3">
                <span className="text-black font-bold text-lg shrink-0">▪</span>
                <span className="text-base sm:text-lg font-bold text-black leading-snug">
                  You get updates without lifting a finger
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Middle Section - Behind the Scenes */}
      <section className="bg-[#fff0e6] py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ff4c00] text-center mb-8 sm:mb-12 md:mb-16 px-0 sm:px-2">
              Behind the Scenes of Your Job Search
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.id}
                    className="group bg-[#ff4c00] rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-white/20 flex flex-col items-center text-center"
                  >
                    <div className="flex justify-center mb-4 sm:mb-6 shrink-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4 md:p-5 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/95">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ff4c00] mb-3 sm:mb-4 px-0 sm:px-2 leading-tight">
            Ready to Let Flashfire Search & Apply for You?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black mb-8 sm:mb-10 max-w-2xl mx-auto px-0 sm:px-2">
            Set the goal. Flashfire runs the system.
          </p>
          <button
            {...getButtonProps()}
            onClick={handleGetStarted}
            className="bg-white border-2 border-[#ff4c00] text-[#ff4c00] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-bold text-base sm:text-lg md:text-xl rounded-xl hover:bg-[#fff0e6] transition-colors inline-flex items-center justify-center w-full sm:w-auto max-w-md mx-auto"
          >
            Get Started With Flashfire
          </button>
        </div>
      </section>
    </div>
  );
}

