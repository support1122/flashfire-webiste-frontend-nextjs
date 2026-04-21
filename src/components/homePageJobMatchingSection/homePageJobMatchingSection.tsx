"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

const features = [
  {
    title: "Intelligent Skill Matching",
    text: "Flashfire understands your real skills and experience instead of relying only on keywords, resulting in more accurate matches.",
  },
  {
    title: "Smarter AI-Powered Job Search",
    text: "Focus only on roles that genuinely align with your profile and career direction.",
  },
  {
    title: "Personalized Recommendations",
    text: "Your job feed adapts to your experience level, interests, and long-term goals.",
  },
  {
    title: "Apply With Confidence",
    text: "Apply only where you are a strong match, improving response rates and interview success.",
  },
] as const;

function OverlapCard({
  item,
  index,
  progress,
}: {
  item: (typeof features)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const totalSteps = features.length - 1;
  const start = index === 0 ? 0 : (index - 1) / totalSteps;
  const end = index === 0 ? 0.0001 : index / totalSteps;
  const y = index === 0 ? 0 : useTransform(progress, [start, end], ["100%", "0%"]);

  return (
    <motion.div
      style={{
        y,
        zIndex: index + 1,
      }}
      className="absolute inset-0 flex h-full flex-col rounded-[1.8rem] border border-black/8 bg-[linear-gradient(180deg,#fff7f2_0%,#f9ece4_100%)] p-7 shadow-[0_20px_45px_rgba(17,17,17,0.08)]"
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/8 pb-5">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4c00] text-base font-bold text-white shadow-[0_10px_20px_rgba(255,76,0,0.25)]">
            0{index + 1}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-black md:text-[1.7rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[26rem] text-sm leading-7 text-black/70 md:text-[15px]">
              {item.text}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <div className="rounded-[1.5rem] border border-black/8 bg-white/70 p-5">
          <p className="text-sm font-medium text-black/80">
            {item.text}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.35rem] border border-black/8 bg-[#fff0e8] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b94b1b]">
              AI Job Matching
            </p>
            <p className="mt-3 text-sm leading-6 text-black/70">
              Your profile is evaluated for stronger-fit opportunities before you apply.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-black/8 bg-[#1e1714] p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb08b]">
              Flashfire Benefit
            </p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Better alignment can help improve application quality and interview chances.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function JobMatchingSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress;
  const introY = useTransform(progress, [0, 1], [0, -36]);
  const introOpacity = useTransform(progress, [0, 0.8], [1, 0.78]);
  const cardHeights = `${features.length * 100}vh`;

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

      sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
      router.push("/start-ai-powered-job-search");
      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
    } catch (error) {
      console.error("Error starting AI job search:", error);
    } finally {
      stopHold();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[linear-gradient(180deg,#f9ece5_0%,#f6e5db_55%,#f1ddd1_100%)] px-4 py-16 sm:px-6 md:px-12 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <motion.div
          style={{ y: introY, opacity: introOpacity }}
          className="md:sticky md:top-24 md:self-start"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#b94b1b]">
            Scroll to see the match engine work
          </p>
          <h2 className="text-3xl font-semibold leading-snug text-black md:text-5xl">
            What Makes Flashfire an <span className="text-[#ff4c00]">AI Job Matching Platform</span>
          </h2>

          <p className="mt-6 max-w-xl text-base text-black/80 md:text-lg">
            Flashfire is not just an AI job application tool. It is a
            <span className="font-medium text-[#ff4c00]"> complete AI-powered job matching platform</span>
            {" "}
            that aligns your skills, experience, and career goals with the right opportunities before you apply.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button
              {...getButtonProps()}
              onClick={handleStartAIJobSearch}
              className="rounded-xl bg-black px-7 py-3 font-medium text-white shadow-[0_3px_0_#ff4c00] transition-all duration-200 hover:bg-[#ff4c00] hover:text-black hover:shadow-[0_4px_0_black]"
            >
              Start AI-Powered Job Search
            </button>
          </div>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block" style={{ height: cardHeights }}>
            <div className="sticky top-20 h-[34rem] overflow-hidden rounded-[2rem] border border-black/10 bg-[#f8e9e1]/70 p-4 shadow-[0_30px_80px_rgba(17,17,17,0.08)] backdrop-blur">
              <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-[#f4e2d8]">
                {features.map((item, index) => (
                  <OverlapCard
                    key={item.title}
                    item={item}
                    index={index}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            {features.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.4rem] border border-black/10 bg-[#fff7f2] p-5 shadow-[0_12px_30px_rgba(17,17,17,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ff4c00] text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/70">{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
