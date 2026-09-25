"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import {
  Target,
  Rocket,
  Handshake,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { stripLocalePrefix, localizeHref } from "@/src/utils/locale";

const steps = [
  {
    id: 1,
    title: "Share Your Goals & Location",
    description: "We learn your job preferences, skills, and where you want to work.",
    icon: Target,
  },
  {
    id: 2,
    title: "We Scan Matching Jobs",
    description: "Flashfire filters roles near you that match your skills, visa status, salary expectations, and more.",
    icon: Rocket,
  },
  {
    id: 3,
    title: "Our Team Applies for You",
    description: "A dedicated team of 4-5 trained professionals applies manually to each role.",
    icon: Handshake,
  },
  {
    id: 4,
    title: "You Get Updates",
    description: "You see where applications are sent and how they perform - without doing it yourself.",
    icon: Trophy,
  },
];

const benefits = [
  "Flashfire scans job listings near your location",
  "Our team applies to matched roles for you",
  "You get updates without lifting a finger"
];

const liveApplications = [
  { role: "Software Engineer", company: "Google", location: "Mountain View, CA", status: "Applied" },
  { role: "Product Manager", company: "Meta", location: "Menlo Park, CA", status: "Applied" },
  { role: "Data Scientist", company: "Netflix", location: "Los Gatos, CA", status: "Scanning" },
];

const jobSearchFaqs = [
  {
    question: "How is Flashfire different from a normal job search?",
    answer:
      "A normal job search means hours spent scrolling through job boards, retyping the same details into dozens of application forms, and losing track of which roles you've already applied to. Flashfire replaces that manual grind with a dedicated team that searches, filters, and applies to matching roles on your behalf, so your time goes into interview prep instead of data entry.",
  },
  {
    question: "Do real people apply to jobs, or is it fully automated?",
    answer:
      "It's human-powered automation. A trained team of 4-5 specialists reviews each opening, checks it against your goals, skills, visa status, and salary expectations, and submits a tailored application. Software helps us scan listings faster, but a person makes the final call on every submission.",
  },
  {
    question: "What information does Flashfire use to find matching jobs?",
    answer:
      "We start with your target roles, preferred locations, salary range, work authorization status, and core skills. From there, we continuously scan job listings across company career pages and major job boards, filtering out roles that don't fit so you only see progress on opportunities that actually match your profile.",
  },
  {
    question: "How will I know which jobs have been applied to?",
    answer:
      "Every application is logged and visible from your dashboard in real time. You'll see the company, role, and application status without having to ask for updates or dig through your inbox for confirmation emails.",
  },
  {
    question: "Is this job search service suitable for career changers and recent graduates?",
    answer:
      "Yes. Whether you're pivoting industries, graduating and applying for your first full-time role, or a working professional looking for your next step, the underlying process is the same: define your goals, let the team find and apply to matching roles, and review progress from one place instead of managing it all yourself.",
  },
];

export default function JobSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
        stripLocalePrefix(normalizedPath) === "/get-me-interview";
      const isOnJobSearchPage =
        stripLocalePrefix(normalizedPath) === "/job-search";

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

        const targetPath = localizeHref("/get-me-interview", normalizedPath);
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
    <div className="min-h-screen w-full bg-white font-['Space_Grotesk',sans-serif] text-black">

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-[#f7e6df] px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 lg:pt-24">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-32 h-72 w-72 rounded-full bg-[#f55d1d] opacity-25 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-5 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#f55d1d] shadow-sm">
              Human-powered automation
            </span>

            <h1 className="font-['Satoshi',sans-serif] text-[2.4rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#02060A] sm:text-5xl lg:text-[3.4rem]">
              Find Jobs Faster With{" "}
              <span className="text-[#ff4c00]">Human-Powered</span>{" "}
              Automation
            </h1>

            <p className="mt-5 max-w-lg font-['Satoshi',sans-serif] text-[16px] font-medium leading-[1.6] text-[#3a3a3a]">
              Flashfire applies to relevant jobs on your behalf so you don&apos;t have to search manually. We also send follow-up emails to recruiters on your behalf, so your application doesn&apos;t sit unread.
            </p>

            <ul className="mt-7 space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4c00]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="font-['Satoshi',sans-serif] font-medium text-[#02060A]">{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              {...getButtonProps()}
              onClick={handleGetStarted}
              className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_6px_0_#000] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
            >
              Get Started With Flashfire
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dashboard mock */}
          <div className="relative">
            <div className="rounded-2xl border border-[#94959a] bg-[#fffdfc] p-5 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-[#9d9d9d]">Flashfire Dashboard</span>
              </div>
              <div className="space-y-3">
                {liveApplications.map((app) => {
                  const scanning = app.status === "Scanning";
                  return (
                    <div key={app.role} className="rounded-[0.4rem] border border-[#e7ddd6] bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-[#111]">{app.role}</p>
                        <span
                          className={`flex-none rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                            scanning
                              ? "animate-pulse bg-[#f1ece8] text-[#8a8078]"
                              : "bg-[#ff4c00]/10 text-[#ff4c00]"
                          }`}
                        >
                          {scanning ? "Scanning…" : "Applied"}
                        </span>
                      </div>
                      <p className="mt-1 font-['Satoshi',sans-serif] text-sm text-[#78716d]">
                        {app.company} • {app.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.03em] text-[#02060A] sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 font-['Satoshi',sans-serif] text-lg font-medium text-[#3a3a3a]">
              Your job search, automated in four simple steps
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="flex flex-col rounded-[0.3rem] border border-[#94959a] bg-[#fffdfc] p-6 shadow-[0_2px_6px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#ff4c00] text-white shadow-[0_4px_0_#000]">
                    <IconComponent className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <span className="mt-5 text-sm font-bold text-[#ff4c00]">Step 0{step.id}</span>
                  <h3 className="mt-1 text-lg font-bold text-[#111]">{step.title}</h3>
                  <p className="mt-2 font-['Satoshi',sans-serif] text-sm leading-[1.5] text-[#333]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Why Choose ===== */}
      <section className="relative overflow-hidden bg-[#f7e6df] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#f55d1d] opacity-20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-16 h-72 w-72 rounded-full bg-[#f55d1d] opacity-20 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="text-center font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.03em] text-[#02060A] sm:text-4xl">
            Why Job Seekers Choose Flashfire
          </h2>
          <div className="mt-8 space-y-5 font-['Satoshi',sans-serif] text-[17px] leading-[1.7] text-[#3a3a3a]">
            <p>
              Searching for a job while working full-time, studying, or managing a career transition is exhausting.
              Most job seekers spend more time filling out repetitive application forms than actually preparing for
              interviews. Flashfire was built to fix that imbalance by taking the manual, repetitive part of the
              job search off your plate.
            </p>
            <p>
              Instead of relying on generic keyword matching, our team looks at your specific goals — the roles
              you want, the industries you're targeting, your location preferences, and your visa or work
              authorization status — before applying to a single job. That means the applications going out under
              your name are relevant, not just high in volume.
            </p>
            <p>
              This approach works well for people who already know what they want but don't have the bandwidth to
              apply consistently, as well as for people who are new to the job market and unsure where to start.
              Either way, you keep full visibility into every application through your dashboard, so you're never
              left wondering what's happening with your job search.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="ff-faq-section">
        <div className="ff-faq-shell">
          <div className="ff-faq-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="ff-faq-list">
            {jobSearchFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`ff-faq-item ${isOpen ? "is-active" : ""}`}>
                  <button
                    type="button"
                    className="ff-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="ff-faq-question-text">{faq.question}</span>
                    <span className="ff-faq-icon">{isOpen ? <FaTimes /> : <FaPlus />}</span>
                  </button>

                  {isOpen && (
                    <div className="ff-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#fdeee6] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-['Satoshi',sans-serif] text-3xl font-bold tracking-[-0.02em] text-[#02060A] sm:text-[2.6rem]">
            Ready to Let Flashfire Search &amp; Apply for You?
          </h2>
          <p className="mt-4 font-['Satoshi',sans-serif] text-lg font-medium text-[#3a3a3a]">
            Set the goal. Flashfire runs the system.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              {...getButtonProps()}
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#ff4c00] px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_6px_0_#000] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f]"
            >
              Get Started With Flashfire
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-6 text-sm text-[#6b6b6b]">
            No credit card required • Setup takes 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
}