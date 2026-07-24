"use client";

import Image from "next/image";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";

const steps = [
  {
    number: 1,
    title: "We Understand Your Career Goals",
    detail:
      "We learn about your experience, target roles, visa requirements, salary expectations, and career goals before creating a strategy.",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step1.png",
  },
  {
    number: 2,
    title: "We Build a Recruiter-Ready Profile",
    detail:
      "Our resume experts optimize your resume and LinkedIn profile so recruiters immediately see your strengths. AI helps tailor every application, but every profile is reviewed for quality.",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step2.png",
  },
  {
    number: 3,
    title: "We Apply to the Right Jobs",
    detail:
      "Instead of applying everywhere, our team carefully targets roles that match your background and career goals. Every application is optimized before it's submitted.",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step3.png",
  },
  {
    number: 4,
    title: "We Stay With You Until Interviews",
    detail:
      "You receive regular updates, application tracking, interview support, and ongoing guidance throughout your job search.",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/step4.png",
  },
];

export default function HomePageSteps() {
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    trackSignupIntent("homepage_steps_cta", {
      button_location: "homepage_steps_section",
      section: "homepage_steps",
    });
    trackButtonClick("Get Started", "homepage_steps_cta", "cta", {
      button_location: "homepage_steps_section",
      section: "homepage_steps",
      destination: "/Get-Started",
    });
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/Get-Started");
      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
    }
  };

  return (
    <section className="bg-[#fffbf9] py-14 font-['Space_Grotesk',sans-serif] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1350px] px-5 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-14">
          <h2 className="mx-auto max-w-[700px] text-[30px] font-extrabold leading-[1.08] text-[#080b10] md:text-[42px]">
            How Our Team Helps You Land Interviews Faster
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[12px] font-bold leading-[1.55] text-[#545b65] md:text-[13px]">
            Our team helps optimize your profile, apply to the right jobs, and track every application, so you can focus on interviews.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-7 inline-flex items-center gap-2 bg-[#ff5a1f] px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#e04d18]"
          >
            Get Started
            <span className="text-[18px] leading-none" aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* 2×2 Steps Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex min-h-[330px] flex-col border-[6px] border-[#f8f0eb] bg-[#f8f0eb]"
            >
              <div className="bg-white px-5 pb-5 pt-5 md:px-6 md:pb-6">
                <p className="mb-4 text-[26px] font-extrabold leading-none md:text-[32px]">
                  <span className="bg-gradient-to-r from-[#d84a22] via-[#f05a23] to-[#ff7a2a] bg-clip-text text-transparent">
                    \\ STEP {step.number}
                  </span>
                </p>
                <h3 className="mb-2 text-[20px] font-extrabold leading-[1.08] text-[#24272d] md:text-[24px]">
                  {step.title}
                </h3>
                <p className="max-w-[420px] text-[12px] font-bold leading-[1.42] text-[#232933] md:text-[13px]">
                  {step.detail}
                </p>
              </div>

              <div className="flex flex-1 items-center justify-center bg-[#f8f0eb] px-6 py-9">
                <Image
                  src={step.image}
                  alt={`Step ${step.number}`}
                  width={130}
                  height={130}
                  className="h-[92px] w-auto object-contain md:h-[112px]"
                />
              </div>
            </div>

))}
        </div>
      </div>
    </section>
  );
}
