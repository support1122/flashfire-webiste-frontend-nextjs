"use client";

import { ArrowRight, CheckCircle, Check } from "lucide-react";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

export default function CareerAdvisor() {
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const handleGetCareerAdvice = () => {
    const utmSource =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
    const utmMedium =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || "Career_Advisor_Page"
        : "Career_Advisor_Page";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Career_Advisor_Get_Career_Advice_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign:
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "Website"
            : "Website",
      },
    });

    trackButtonClick("Get Career Advice", "career_advisor_cta", "cta", {
      button_location: "career_advisor_hero_section",
      section: "career_advisor_hero",
    });

    trackSignupIntent("career_advisor_cta", {
      signup_source: "career_advisor_hero_button",
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
    }
  };

  return (
    <div className="bg-[#fff7f3] text-[#1a1a1a] pt-[120px] md:pt-[100px]">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-[#ff4c00]/10 text-[#ff4c00] px-4 py-1 rounded-full text-sm font-semibold mb-4">
            AI-Powered Career Guidance
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your personal <span className="text-[#ff4c00]">AI Career Advisor</span><br />
            built for real jobs
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Get clarity on roles, skills, resumes, and job strategies.
            FlashFire analyzes your profile and tells you exactly what to do next.
          </p>

          <div className="mt-8 flex gap-4">
            <button
            {...getButtonProps()}
            onClick={handleGetCareerAdvice}
            className="bg-[#ff4c00] text-white px-6 py-3 shadow-[0_3px_0_black] rounded-xl font-semibold flex items-center gap-2 hover:opacity-90">
              Get Career Advice
              <ArrowRight size={18} />
            </button>

            
          </div>
        </div>

        {/* Right Visual */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#ff4c00]/20">
          <ul className="space-y-5">
            {[
              "Role recommendations based on your profile",
              "Skill gaps + learning roadmap",
              "Resume & ATS improvement suggestions",
              "Job market demand insights",
              "Next 30-60-90 day action plan",
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <CheckCircle className="text-[#ff4c00]" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-20">
  <div className="max-w-[1200px] mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center">
      Career decisions made simple
    </h2>

    <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
      No vague advice. No random guessing. FlashFire gives you clear, data-backed
      guidance tailored to your profile.
    </p>

    <div className="mt-14 grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Role clarity",
          desc: "Understand which roles fit your background today and which ones you should prepare for next.",
        },
        {
          title: "Skill direction",
          desc: "Know exactly which skills are missing and which ones actually matter in the market.",
        },
        {
          title: "Focused action plan",
          desc: "Get a step-by-step plan instead of generic career advice.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-2xl p-8 hover:border-[#ff4c00] transition"
        >
          <h3 className="font-bold text-xl">{item.title}</h3>
          <p className="mt-3 text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

     {/* SECTION 1 */}
     <section className="bg-[#fff7f3] py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">
            A System That Works for You.
            </h2>

            <ul className="mt-8 space-y-5 text-gray-700">
              {[
                "Personalized career path recommendations",
                "Skill gap analysis and learning roadmap",
                "Resume & ATS optimization suggestions",
                "Job market demand insights",
                "Next 30-60-90 day action plan",
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15 text-[#ff4c00]">
                    <Check size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 flex justify-center">
            <Image
              src="/images/career1.png"
              alt="From classroom to career"
              width={420}
              height={320}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="bg-[#fff7f3] rounded-3xl p-10 border border-[#ff4c00]/15 flex justify-center">
            <Image
              src="/images/career2.png"
              alt="Entry level job recommendations"
              width={420}
              height={320}
              className="object-contain"
            />
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">
            Who Is This For?
            </h2>

            <ul className="mt-8 space-y-5 text-gray-700">
              {[
                "Recent graduates looking for career direction",
                "Mid-career professionals seeking new opportunities",
                "Career changers exploring new fields",
                "Students mapping coursework to real industry roles",
                "Job seekers aiming for the top 10% of job market",
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15 text-[#ff4c00]">
                    <Check size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-32 bg-[#fff1ea] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl text-black font-extrabold mb-6">
                Ready to stop manually applying to <span className="text-[#ff4c00]">Get job calls?</span>
              </h2>
              <p className="text-lg text-gray-900 max-w-3xl mx-auto mb-10">
                Join thousands of job seekers who use FlashFire to create compelling 
                cover letters that increase their interview chances.
              </p>
              <button
                {...getButtonProps()}
                onClick={handleGetCareerAdvice}
                className="bg-[#ff4c00] hover:bg-[#e24400] shadow-[0_3px_0_black] text-white px-8 py-4 font-bold text-lg rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Get Career Advice →
              </button>
            </div>
          </div>
        </section>
      

    </div>
  );
}
