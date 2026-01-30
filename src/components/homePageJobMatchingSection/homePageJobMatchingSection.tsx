"use client";

import { useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
export default function JobMatchingSection() {
  const router = useRouter();
  const { isHolding, holdProgress, getButtonProps, stopHold } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });
  const handleStartAIJobSearch = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "Job_Matching_Section"
        : "Job_Matching_Section";
      GTagUTM({
        eventName: "sign_up_click",
        label: "Job_Matching_Start_AI_Job_Search_Button",
        utmParams: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: typeof window !== "undefined" && window.localStorage
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
      sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
      router.push("/start-ai-powered-job-search");
      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
    } catch (error) {
      console.error("Error starting AI job search:", error);
    } finally {
      stopHold();
    }
  };
  return (
    <section className="w-full bg-[#f9ece5] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-5 leading-snug">
          What Makes Flashfire an{" "}
          <span className="text-[#ff4c00]">
            AI Job Matching Platform
          </span>
        </h2>

        {/* Description */}
        <p className="text-black/80 text-lg max-w-3xl mb-14">
          Flashfire is not just an AI job application tool. It is a
          <span className="text-[#ff4c00] font-medium">
            {" "}complete AI-powered job matching platform
          </span>{" "}
          that aligns your skills, experience, and career goals with the right
          opportunities—before you apply.
        </p>
     
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {[
            {
              title: "Intelligent Skill Matching",
              text: "Flashfire understands your real skills and experience instead of relying only on keywords, resulting in more accurate matches."
            },
            {
              title: "Smarter AI-Powered Job Search",
              text: "Focus only on roles that genuinely align with your profile and career direction."
            },
            {
              title: "Personalized Recommendations",
              text: "Your job feed adapts to your experience level, interests, and long-term goals."
            },
            {
              title: "Apply With Confidence",
              text: "Apply only where you are a strong match, improving response rates and interview success."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group border border-black/10 rounded-xl p-6 transition-all duration-200
                         hover:border-[#ff4c00] hover:-translate-y-1
                         hover:shadow-lg hover:shadow-black/10 bg-[#f9e8e0]"
            >
              <h3 className="text-lg font-medium text-black mb-2 transition-colors group-hover:text-[#ff4c00]">
                {item.title}
              </h3>
              <p className="text-black/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-16">
          <button {...getButtonProps()} onClick={handleStartAIJobSearch} className="bg-black text-white px-8 py-3 rounded-md font-medium shadow-[0_3px_0_[#ff4c00]]
                             transition-all duration-200
                             hover:bg-[#ff4c00] hover:text-black
                             hover:shadow-lg hover:shadow-[0_4px_0_black]">
            Start AI-Powered Job Search
          </button>
        </div>

      </div>
    </section>
  );
}
