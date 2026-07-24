"use client";

import { ClipboardList, HandHeart, Puzzle, Sparkles } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const features = [
  {
    icon: Puzzle,
    title: "Jobs That Match Your Goals",
    text: "We understand your skills, experience, and career goals to help you target the right opportunities.",
  },
  {
    icon: ClipboardList,
    title: "Strategic Job Search",
    text: "We focus on quality opportunities that genuinely fit your profile, not just more applications.",
  },
  {
    icon: HandHeart,
    title: "Personalized Career Support",
    text: "Every recommendation is tailored to your experience, interests, and long-term career goals.",
  },
  {
    icon: Sparkles,
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
            More Than a{" "}
            <span className="text-[#ff4c00]">Job Application</span>
            <br className="hidden sm:block" />
            <span className="text-[#ff4c00]"> Service</span>
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

        <div className="mx-auto mt-7 grid max-w-5xl grid-cols-1 gap-7 md:grid-cols-2">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex min-h-[122px] items-center gap-7 rounded-[5px] border border-[#e4e4e4] bg-white px-9 py-7 text-left shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center text-[#ff8a2a]">
                  <Icon className="h-12 w-12" strokeWidth={1.7} />
                </div>

                <div>
                  <h3 className="mb-2 text-base font-extrabold text-black md:text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium leading-5 text-[#777] md:text-[15px]">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}