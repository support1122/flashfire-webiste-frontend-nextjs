"use client";

import { ClipboardList, HandHeart, Puzzle, Sparkles } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const features = [
  {
    icon: Puzzle,
    title: "Intelligent Skill Matching",
    text: "Flashfire understands your real skills and experience instead of relying only on keywords, resulting in more accurate matches.",
  },
  {
    icon: ClipboardList,
    title: "Smarter AI-Powered Job Search",
    text: "Focus only on roles that genuinely align with your profile and career direction.",
  },
  {
    icon: HandHeart,
    title: "Personalized Recommendations",
    text: "Your job feed adapts to your experience level, interests, and long-term goals.",
  },
  {
    icon: Sparkles,
    title: "Apply With Confidence",
    text: "Apply only where you are a strong match, improving response rates and interview success.",
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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-[#fff6f4] px-4 py-20 sm:px-6 md:px-12 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#ff4c00]/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#ff4c00]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-[#fff0ea] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
            AI Job Matching
          </span>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-black md:text-5xl">
            What Makes Flashfire an{" "}
            <span className="text-[#ff4c00]">AI Job</span>
            <br className="hidden sm:block" />
            <span className="text-[#ff4c00]"> Matching Platform</span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base font-medium leading-8 text-[#7a7a7a] md:text-xl">
            Flashfire is not just an AI job application tool. It is a complete
            AI-powered job matching platform that aligns your skills,
            experience, and career goals with the right opportunities&mdash;before
            you apply.
          </p>

          <button
            {...getButtonProps()}
            onClick={handleStartAIJobSearch}
            className="mt-12 inline-flex min-h-12 items-center justify-center rounded-[8px] border-b-4 border-b-black bg-[#ff4c00] px-8 text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
          >
            Start AI-Powered Job Search
          </button>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative flex flex-col rounded-3xl border border-[#f1ddd3] bg-white p-7 text-left shadow-[0_4px_14px_rgba(255,76,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ff4c00]/50 hover:shadow-[0_16px_32px_rgba(255,76,0,0.16)]"
              >
                <span className="absolute right-6 top-6 text-2xl font-extrabold text-[#fff0ea] transition-colors duration-300 group-hover:text-[#ffe1d2]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff6f4] text-[#ff4c00] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ff4c00] group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </div>

                <h3 className="mb-2 mt-6 text-base font-extrabold text-black md:text-lg">
                  {item.title}
                </h3>

                <p className="text-sm font-medium leading-6 text-[#777] md:text-[15px]">
                  {item.text}
                </p>

                <span className="mt-5 block h-0.5 w-8 rounded-full bg-[#ff4c00]/20 transition-all duration-300 group-hover:w-12 group-hover:bg-[#ff4c00]" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}