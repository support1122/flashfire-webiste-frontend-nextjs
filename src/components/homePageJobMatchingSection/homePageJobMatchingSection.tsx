"use client";

import { Handshake, Rocket, Search, Target } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const features = [
  {
    icon: Target,
    number: "01",
    category: "MATCH",
    title: "Jobs That Match Your Goals",
    text: "We understand your skills, experience, and career goals to help you target the right opportunities.",
  },
  {
    icon: Search,
    number: "02",
    category: "SEARCH",
    title: "Strategic Job Search",
    text: "We focus on quality opportunities that genuinely fit your profile, not just more applications.",
  },
  {
    icon: Handshake,
    number: "03",
    category: "SUPPORT",
    title: "Personalized Career Support",
    text: "Every recommendation is tailored to your experience, interests, and long-term career goals.",
  },
  {
    icon: Rocket,
    number: "04",
    category: "APPLY",
    title: "Apply With Confidence",
    text: "We help you apply to roles where you're a strong fit, increasing your chances of interview calls.",
  },
];

export default function JobMatchingSection() {
  const { getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleStartAIJobSearch = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Matching_Section"
          : "Job_Matching_Section";

      GTagUTM({
        eventName: "sign_up_click",
        label: "Job_Matching_Start_AI_Job_Search_Button",
        utmParams: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign:
            typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
        },
      });
      trackButtonClick("Start AI-Powered Job Search", "job_matching_cta", "cta", {
        button_location: "job_matching_section",
        section: "job_matching",
      });
      trackSignupIntent("job_matching_cta", {
        signup_source: "job_matching_button",
        funnel_stage: "signup_intent",
      });

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", "/Get-Started");
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    } catch (error) {
      console.error("Error starting AI job search:", error);
    } finally {
      stopHold();
    }
  };

  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 md:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-black md:text-5xl">
            More Than a
            <br className="hidden sm:block" />
            <span> Job Application Service</span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base font-medium leading-8 text-[#7a7a7a] md:text-xl">
            Landing interviews takes more than clicking &ldquo;Apply.&rdquo; Flashfire
            combines experienced career experts with intelligent technology to
            help you find better opportunities, improve your resume, apply
            strategically, stay organized, and prepare for interviews.
            Technology helps us move faster. Our people help you get hired.
          </p>

          <button
            {...getButtonProps()}
            onClick={handleStartAIJobSearch}
            className="mt-12 inline-flex min-h-12 items-center justify-center rounded-[5px] bg-black px-8 text-base font-bold text-white shadow-md transition-colors hover:bg-[#ff4c00] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
          >
            Start AI-Powered Job Search
          </button>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-sm font-medium text-[#7a7a7a]">
              How Flashfire works
            </span>
            <div className="h-px flex-1 bg-[#e4e4e4]" />
          </div>

          <div className="mt-6 grid grid-cols-1 divide-y divide-[#e4e4e4] border border-[#e4e4e4] md:grid-cols-4 md:divide-x md:divide-y-0">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="px-7 py-8 text-left">
                  <p className="text-xs font-semibold tracking-wide text-[#9a9a9a]">
                    {item.number} — {item.category}
                  </p>

                  <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#e4e4e4] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Icon className="h-6 w-6 text-[#ff5a1f]" strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-[#777]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}