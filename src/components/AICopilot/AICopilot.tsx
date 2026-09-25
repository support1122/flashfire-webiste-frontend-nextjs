"use client"
import { Search, FileCheck, Send, MapPin, Briefcase, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import HomePageHappyUsers from "../homePageHappyUsers/homePageHappyUsers";
import { getLocalePrefix } from "@/src/utils/locale";

const dispatchCustomEvent = (eventName: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName));
  }
};

export default function AICopilot() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const prefix = getLocalePrefix(pathname);


  const handleStartApplyingClick = (target: "modal" | "cta" = "modal") => {
    const currentScrollY =
      typeof window !== "undefined" ? window.scrollY : undefined;

    trackButtonClick("Start Applying with AI", "ai_copilot_section", "cta", {
      section: "ai_copilot",
    });
    dispatchCustomEvent("showCalendlyModal");

    if (typeof window !== "undefined") {
      const origin =
        pathname && pathname !== `${prefix}/AI-copilot`
          ? pathname
          : `${prefix}/AI-copilot`;
      sessionStorage.setItem("previousPageBeforeGetMeInterview", origin);
      if (currentScrollY !== undefined) {
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }
    }

    // Change URL without actual navigation
    const newUrl =
      target === "modal"
        ? `${prefix}/AI-copilot/get-me-interview`
        : `${prefix}/AI-copilot/Start-applying-with-AI`;
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleTalkToExpertClick = () => {
    trackButtonClick("Talk to an Expert", "ai_copilot_section", "secondary", {
      section: "ai_copilot",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "ai_copilot_section", {
      link_type: "whatsapp_support",
      component: "ai_copilot",
    });
    if (typeof window !== "undefined") {
      window.open(WHATSAPP_SUPPORT_URL, "_blank");
    }
  };

  return (
    <>
      {/* ================= HERO: match-score mockup ================= */}
      <section className="flex w-full min-h-[calc(100vh-80px)] items-center bg-white py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* LEFT CONTENT */}
            <div className="max-w-[580px]">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#ff4c00]">
                AI Job Application Automation Platform
              </p>

              <h1 className="text-[2.75rem] font-extrabold leading-[1.1] text-black sm:text-[3.5rem] lg:text-[4rem]">
                AI Job Application Automation Software That Applies to Jobs for You
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-xl">
                FlashFire is an AI job search platform that automates job applications, finds relevant roles, optimizes your resume, and submits applications daily to help you get interviews faster.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => handleStartApplyingClick("modal")}
                  className="bg-[#ff4c00] text-white px-6 sm:px-5 py-3 sm:py-4 shadow-[0_3px_0_black] rounded-xl text-lg font-semibold hover:scale-105 transition"
                >
                  Get me interview
                </button>

                <button
                  type="button"
                  onClick={handleTalkToExpertClick}
                  className="text-orange-500 bg-orange-500/10 font-medium py-4 px-6 hover:underline border border-orange-500/20 rounded-xl text-lg font-semibold transition"
                >
                  Talk to an Expert
                  <div className="text-orange-500 hover:text-orange-600" />
                </button>
              </div>
            </div>

            {/* RIGHT: MATCH SCORE VISUAL */}
            <div className="flex justify-center">
              <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

                <div className="px-6 py-5 border-b bg-gray-50 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase size={16} />
                    <span>Data Analyst</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={16} />
                    <span>USA, UK & Canada</span>
                  </div>
                </div>

                {/* Match score ring */}
                <div className="flex items-center gap-5 px-6 py-6 border-b">
                  <div
                    className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "conic-gradient(#ff4c00 94%, #fde8dc 0)" }}
                  >
                    <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white">
                      <span className="text-base font-extrabold text-black">94%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Resume match score</p>
                    <p className="mt-1 text-xs text-gray-500">Optimized against job description keywords</p>
                  </div>
                </div>

                {/* Job rows */}
                <div className="space-y-4 px-6 py-6">
                  <div className="flex items-center justify-between rounded-xl bg-[#fff7f3] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-black">Senior Data Analyst</p>
                      <p className="text-xs text-gray-500">Applied automatically today</p>
                    </div>
                    <span className="rounded-full bg-[#ff4c00] px-2.5 py-1 text-xs font-bold text-white">92%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#fff7f3] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-black">Business Data Analyst</p>
                      <p className="text-xs text-gray-500">Applied automatically today</p>
                    </div>
                    <span className="rounded-full bg-[#ff4c00] px-2.5 py-1 text-xs font-bold text-white">87%</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#fffaf6] border-t text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#ff4c00]" />
                  New applications sent every day
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHAT IS: text + icon-row list ================= */}
      <section className="w-full bg-[#fffaf6] py-28">
        <div className="max-w-[1160px] mx-auto px-6">

          <div className="grid gap-14 lg:grid-cols-[440px_1fr] lg:items-start">
            <div>
              <h2 className="text-[2.4rem] sm:text-[2.9rem] font-extrabold text-black leading-tight">
                What Is <span className="text-[#ff4c00]">AI Job Application Automation?</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                AI job application automation uses intelligent software to search,
                customize, and submit job applications on your behalf — every day —
                without manual effort. We also send follow-up emails to recruiters on your behalf, so your application doesn&apos;t sit unread.
              </p>
              <p className="mt-6 text-base text-gray-600 leading-relaxed">
                Unlike manual applications, AI automation scales your reach without
                sacrificing quality or control.
              </p>
            </div>

            <div className="divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white overflow-hidden">
              {[
                {
                  icon: <Search className="text-[#ff4c00]" size={22} />,
                  title: "Finds relevant jobs",
                  desc: "AI continuously scans job boards and company sites to identify roles that match your skills, experience, and preferences.",
                },
                {
                  icon: <FileCheck className="text-[#ff4c00]" size={22} />,
                  title: "Customizes applications",
                  desc: "Your resume and responses are tailored for each role using job-specific keywords to improve ATS performance.",
                },
                {
                  icon: <Send className="text-[#ff4c00]" size={22} />,
                  title: "Applies automatically",
                  desc: "Applications are submitted daily, consistently, and safely — even while you focus on interview preparation.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 px-7 py-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0e8]">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS: vertical timeline ================= */}
      <section className="w-full bg-white py-28">
        <div className="max-w-[900px] mx-auto px-6">

          <div className="text-center max-w-[680px] mx-auto">
            <h2 className="text-[2.6rem] sm:text-[3.2rem] font-extrabold text-black leading-tight">
              How Our AI Job Application Automation Software Works
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              One simple setup. After that, FlashFire applies to jobs for you
              automatically — every day.
            </p>
          </div>

          <div className="mt-20 relative space-y-4 pl-2">
            <div className="pointer-events-none absolute left-6 top-2 bottom-2 w-px bg-[#ff4c00]/20" />

            {[
              {
                step: "1",
                title: "Define your job preferences",
                desc: "Choose roles, locations, experience level, and preferences using simple filters.",
              },
              {
                step: "2",
                title: "Upload your resume once",
                desc: "Upload your resume and answer a few screening questions just one time.",
              },
              {
                step: "3",
                title: "FlashFire teams up with you to apply every day",
                desc: "Our AI job application automation software finds new roles, optimizes resumes, and applies automatically every day.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6">
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-base font-bold text-white">
                  {item.step}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-[#fff7f3] px-6 py-5">
                  <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXECUTION ENGINE: two-column comparison ================= */}
      <section className="relative w-full bg-[#fffaf6] py-28 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#ff4c00]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#ff4c00]/5 blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-3 mb-6 text-sm font-semibold uppercase tracking-wide text-[#ff4c00]">
              Execution Engine
              <span className="h-[1px] w-12 bg-[#ff4c00]/60" />
            </span>

            <h2 className="text-[2.6rem] sm:text-[3.4rem] leading-[1.08] font-extrabold text-[#2a1208]">
              Execution beats <span className="text-[#ff4c00]">motivation.</span>
            </h2>

            <p className="mt-7 text-lg text-[#6b3b2a] max-w-[520px]">
              FlashFire replaces fragile willpower with a system that executes
              consistently — even when attention, energy, or time runs out.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#ff4c00]/20 bg-white p-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#7a4a38] mb-6">Without FlashFire</h3>
              <div className="space-y-5">
                {[
                  { title: "Manual Effort", desc: "Requires constant focus, energy, and daily motivation." },
                  { title: "Inconsistent Output", desc: "Breaks when schedules get busy." },
                  { title: "Linear Growth", desc: "Effort caps results quickly." },
                ].map((card) => (
                  <div key={card.title} className="border-b border-[#ff4c00]/10 pb-5 last:border-0 last:pb-0">
                    <h4 className="text-base font-semibold text-[#2a1208]">{card.title}</h4>
                    <p className="mt-1.5 text-sm text-[#7a4a38]">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#ff4c00] p-8 text-white shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white/80 mb-6">With FlashFire</h3>
              <div className="space-y-5">
                {[
                  { title: "FlashFire Engine", desc: "Executes automatically once configured." },
                  { title: "Always-On System", desc: "Runs silently in the background." },
                  { title: "Scalable Momentum", desc: "One setup compounds endlessly." },
                ].map((card) => (
                  <div key={card.title} className="border-b border-white/15 pb-5 last:border-0 last:pb-0">
                    <h4 className="text-base font-semibold">{card.title}</h4>
                    <p className="mt-1.5 text-sm text-white/85">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key outcomes strip */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Runs daily without manual effort",
              "Scales execution automatically",
              "Never breaks under pressure",
              "Built for long-term momentum",
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-4 border border-[#ff4c00]/15">
                <div className="h-8 w-8 shrink-0 rounded-xl bg-[#ff4c00]/15 flex items-center justify-center text-[#ff4c00] font-bold text-sm">
                  ✓
                </div>
                <span className="text-sm text-[#2a1208]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SCALE: itemized stat list ================= */}
      <section className="w-full bg-white py-32">
        <div className="max-w-[1000px] mx-auto px-6">

          <div className="max-w-[720px]">
            <h2 className="text-[2.6rem] sm:text-[3.5rem] leading-[1.05] font-extrabold text-black">
              Manual job applications
              <br />
              <span className="text-[#ff4c00]">weren&rsquo;t built for scale.</span>
            </h2>

            <p className="mt-8 text-xl text-gray-600 max-w-[620px]">
              Automatic job application software removes the manual limits
              that slow modern job searches — without sacrificing precision.
            </p>
          </div>

          <div className="mt-20 divide-y divide-gray-200 border-t border-gray-200">
            {[
              {
                title: "Time compounds",
                desc: "Manual applications consume hours that don't scale. Automation turns the same time into exponentially more reach.",
                index: "01",
              },
              {
                title: "Consistency matters",
                desc: "Applying once in a while isn't enough. Software applies every day with the same level of accuracy.",
                index: "02",
              },
              {
                title: "Reach expands",
                desc: "Manual effort caps how many companies you can reach. Automation removes that ceiling entirely.",
                index: "03",
              },
              {
                title: "ATS alignment",
                desc: "Applications are tailored with role-specific language so they survive automated screening systems.",
                index: "04",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group grid grid-cols-1 gap-3 py-8 sm:grid-cols-[100px_1fr] sm:items-baseline sm:gap-8"
              >
                <div className="text-2xl font-extrabold text-[#ff4c00]/30 group-hover:text-[#ff4c00] transition-colors">
                  {item.index}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed max-w-[640px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-[#fff7f3] p-10 max-w-[820px]">
            <p className="text-lg text-gray-700 leading-relaxed">
              FlashFire doesn&rsquo;t automate shortcuts — it automates discipline.
              <span className="text-black font-medium"> You stay intentional.</span>
              <span className="text-[#ff4c00] font-medium"> The system handles execution.</span>
            </p>
          </div>

        </div>
      </section>

      {/* Why Use FlashFire Section: alternating editorial rows */}
      <section className="w-full bg-[#fffaf6] py-28">
        <div className="max-w-[1100px] mx-auto px-6">

          <div className="text-center max-w-[760px] mx-auto">
            <h2 className="text-[2.6rem] sm:text-[3.4rem] font-extrabold text-black">
              Why Use <span className="text-[#ff4c00]">FlashFire?</span>
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              FlashFire is an AI job search platform designed to automate job applications, increase reach, and help job seekers land more interviews.
            </p>
          </div>

          <div className="mt-20 space-y-20">
            {[
              {
                title: "Get More Interviews",
                desc: "Most people need to apply to dozens of jobs to get a single interview. FlashFire applies consistently every day to increase your chances.",
                img: "/images/AIcopilot1.png",
              },
              {
                title: "Never Miss an Opportunity",
                desc: "FlashFire tracks new job postings daily so you never apply late or miss newly opened roles.",
                img: "/images/AIcopilot2.png",
              },
              {
                title: "Auto-Apply to the Right Jobs",
                desc: "Apply only to roles that match your profile. FlashFire tailors your resume automatically for every job.",
                img: "/images/AIcopilot3.png",
              },
              {
                title: "Save Hours Every Week",
                desc: "Stop wasting hours on repetitive applications. FlashFire handles the work so you can focus on interviews and preparation.",
                img: "/images/AIcopilot4.png",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`grid items-center gap-10 sm:grid-cols-2 sm:gap-16 ${
                  i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="bg-white rounded-3xl border border-gray-200 p-6 flex justify-center">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={260}
                    height={260}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4c00]/10 text-[#ff4c00] mb-5">
                    <CheckCircle2 size={18} />
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-[440px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomePageHappyUsers />

      {/* FAQ Section */}
      <section className="ff-faq-section">
        <div className="ff-faq-shell">
          <div className="ff-faq-header">
            <h2>
              FAQs
            </h2>
          </div>

          <div className="ff-faq-list">
            {[
              {
                q: "What is AI job application automation?",
                a: "AI job application automation uses software to find relevant roles, tailor resumes, and automatically submit applications based on your preferences."
              },
              {
                q: "Is FlashFire an AI job search platform?",
                a: "Yes. FlashFire is an AI job search platform that discovers jobs, optimizes applications, and applies automatically every day."
              },
              {
                q: "How does automatic job application software work?",
                a: "Automatic job application software scans listings, matches relevant roles, customizes resumes, and submits applications automatically without manual effort."
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""
                  }`}
              >
                <button
                  className="ff-faq-question"
                  onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                >
                  <span className="ff-faq-question-text">
                    {item.q}
                  </span>
                  <span className="ff-faq-icon">
                    {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>
                {activeFaqIndex === i && (
                  <div className="ff-faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className="w-full bg-[#fffaf6] py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="relative rounded-[40px] bg-white border border-orange-100 px-8 md:px-14 py-14 md:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e8] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                  Start Today
                </span>

                <h2 className="mt-6 text-[2.2rem] md:text-[3rem] font-extrabold text-black leading-tight">
                  Ready to Automate Your Job Applications?
                </h2>

                <p className="mt-4 text-gray-600 text-base md:text-lg max-w-xl">
                  Let AI handle repetitive tasks while you focus on what truly matters.
                </p>

                <div className="mt-9">
                  <button
                    type="button"
                    onClick={() => handleStartApplyingClick("cta")}
                    className="group inline-flex items-center gap-3 bg-[#ff4c00] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_4px_0_black] hover:shadow-[0_6px_0_black] hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-[0_2px_0_black] transition-all duration-200"
                  >
                    Start Applying with AI
                    <span className="group-hover:translate-x-1 transition">
                      <ArrowRight size={20} />
                    </span>
                  </button>
                </div>
              </div>

              <div className="rounded-3xl bg-[#fff7f3] border border-orange-100 p-7">
                <p className="text-sm font-bold uppercase tracking-wide text-[#ff4c00] mb-5">
                  What you get
                </p>
                <div className="space-y-4">
                  {[
                    "Daily automated applications",
                    "ATS-optimized resume for every role",
                    "Real-time tracking & analytics",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                        <CheckCircle2 size={14} />
                      </span>
                      <span className="text-sm font-medium text-gray-800">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}
