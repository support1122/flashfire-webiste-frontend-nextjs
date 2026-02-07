"use client";
import { Brain, Target, Sparkles, Rocket } from "lucide-react";
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
    <section className="relative w-full bg-[#fff5ef] py-28 px-6 md:px-12 overflow-hidden">
    {/* Background accents */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,76,0,0.12),transparent_45%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.06),transparent_45%)]" />
  
    <div className="relative max-w-6xl mx-auto">
  
      {/* Badge */}
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4c00] bg-[#ff4c00]/10 px-4 py-1.5 rounded-full mb-6">
        AI-Powered Matching
      </span>
  
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight max-w-4xl">
        What Makes Flashfire a <br />
        <span className="text-[#ff4c00]">True AI Job Matching Platform</span>
      </h2>
  
      {/* Description */}
      <p className="mt-6 text-lg text-black/75 max-w-3xl">
        Flashfire doesn’t mass-apply. It intelligently aligns your skills,
        experience, and intent with roles where you genuinely stand a chance —
        before you apply.
      </p>
  
      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Intelligent Skill Matching",
            text: "Understands real skills beyond keywords to surface highly relevant opportunities.",
            icon: Brain
          },
          {
            title: "Precision Job Discovery",
            text: "Filters out noise so you focus only on roles aligned with your career direction.",
            icon: Target
          },
          {
            title: "Adaptive Personalization",
            text: "Your job feed evolves with your experience, interests, and long-term goals.",
            icon: Sparkles
          },
          {
            title: "Confidence-First Applications",
            text: "Apply where you’re a strong match — increasing interviews and response rates.",
            icon: Rocket
          }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 border border-black/5
                         transition-all duration-300
                         hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-[#ff4c00] rounded-full transition-all duration-300 group-hover:w-full" />
  
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl
                              bg-[#ff4c00]/10 text-[#ff4c00] mb-5">
                <Icon size={22} strokeWidth={2.2} />
              </div>
  
              <h3 className="text-xl font-semibold text-black mb-3">
                {item.title}
              </h3>
  
              <p className="text-black/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
  
      {/* CTA */}
      <div className="mt-20">
        <button
          {...getButtonProps()}
          onClick={handleStartAIJobSearch}
          className="group inline-flex items-center gap-3 bg-black text-white
                     px-10 py-4 rounded-xl font-semibold text-lg
                     transition-all duration-300
                     hover:bg-[#ff4c00] hover:text-black
                     hover:shadow-xl hover:shadow-[#ff4c00]/30"
        >
          Start AI-Powered Job Search
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
  
    </div>
  </section>
  
  
  );
}
