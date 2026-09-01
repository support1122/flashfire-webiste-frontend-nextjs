"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  ClipboardList,
  FileText,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function JobTrackerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const jobTrackerFAQs = [
    {
      question: "Why should I use a job application tracker?",
      answer:
        "A job application tracker keeps every job application, recruiter conversation, and interview organized in one place, so you always know what to do next in your job search.",
    },
    {
      question: "How does FlashFire help organize my job search?",
      answer:
        "FlashFire centralizes saved jobs, application stages, recruiter contacts, and interview notes into one dashboard, replacing scattered spreadsheets and notes.",
    },
    {
      question: "Can I import jobs from LinkedIn and Indeed?",
      answer:
        "Yes. FlashFire's browser extension lets you save jobs from LinkedIn, Indeed, Wellfound, Google Jobs, and company career pages with one click.",
    },
    {
      question: "Can I track interviews and recruiter conversations?",
      answer:
        "Yes. You can store recruiter contacts, interview notes, and follow-up reminders alongside every application you track.",
    },
    {
      question: "Does FlashFire replace spreadsheets?",
      answer:
        "Yes. FlashFire is built specifically for job searching, offering features like status tracking, recruiter management, and analytics that spreadsheets can't provide.",
    },
    {
      question: "Can I customize application stages?",
      answer:
        "Yes. You can move applications through stages like Wishlist, Applied, Interview, Offer, or Rejected to match how you run your job search.",
    },
    {
      question: "Does FlashFire send reminders for follow-ups?",
      answer:
        "Yes. FlashFire lets you set follow-up reminders so you never miss a recruiter response or interview deadline.",
    },
    {
      question: "Can I store resumes and interview notes?",
      answer:
        "Yes. You can attach documents and notes to each application, keeping resumes, cover letters, and interview notes organized in one place.",
    },
    {
      question: "How does FlashFire help me stay organized?",
      answer:
        "By combining job saving, application tracking, recruiter management, and progress insights in a single dashboard, FlashFire keeps your entire job search organized in one place.",
    },
    {
      question: "Is FlashFire suitable for fresh graduates?",
      answer:
        "Yes. Fresh graduates can use FlashFire to organize campus placements and entry-level applications alongside recruiter and interview details.",
    },
    {
      question: "Can experienced professionals use FlashFire?",
      answer:
        "Yes. Busy professionals can track multiple applications, recruiter conversations, and interviews without relying on spreadsheets.",
    },
    {
      question: "Can I track remote job applications?",
      answer:
        "Yes. FlashFire helps you manage applications across multiple job boards, making it easy to track remote opportunities in one place.",
    },
    {
      question: "Is my job search data secure?",
      answer:
        "Yes. Your job search data is stored securely within your FlashFire account and is never shared without your permission.",
    },
  ];

  const comparisonRows = [
    { spreadsheet: "Manual updates", flashfire: "One-click job saving" },
    { spreadsheet: "Separate notes", flashfire: "Recruiters, notes, and documents together" },
    { spreadsheet: "Hard to filter", flashfire: "Smart search and filters" },
    { spreadsheet: "No analytics", flashfire: "Application insights and reports" },
    { spreadsheet: "Easy to forget follow-ups", flashfire: "Built-in reminders" },
    { spreadsheet: "Difficult to scale", flashfire: "Designed for active job searches" },
  ];

  const problemRows = [
    { without: "Multiple spreadsheets", with: "One centralized dashboard" },
    { without: "Lost recruiter emails", with: "Contact management" },
    { without: "Missed interview updates", with: "Organized interview tracking" },
    { without: "No performance visibility", with: "Job search analytics" },
    { without: "Forgotten follow-ups", with: "Notes and reminders" },
  ];

  const standOutCards = [
    {
      icon: Sparkles,
      title: "Save Jobs Instantly",
      copy:
        "Import jobs from LinkedIn, Indeed, Wellfound, and company career pages with one click using the FlashFire browser extension.",
    },
    {
      icon: Target,
      title: "Track Your Progress",
      copy:
        "Monitor applications, interviews, offers, and rejection rates to understand what's working and improve your job search.",
    },
    {
      icon: Zap,
      title: "Manage Recruiter Relationships",
      copy:
        "Store recruiter contacts, interview notes, referrals, and follow-up reminders alongside every application.",
    },
  ];

  const workflowCards = [
    {
      title: "Save jobs instantly",
      copy:
        "Save interesting job opportunities directly from LinkedIn, Indeed, Wellfound, and company career pages with one click.",
    },
    {
      title: "Organize by status",
      copy:
        "Move applications through custom stages like Wishlist, Applied, Interview, Offer, or Rejected to stay organized.",
    },
    {
      title: "Track application progress",
      copy:
        "Measure how your applications convert into interviews and offers so you can improve your job search strategy.",
    },
    {
      title: "Manage recruiters",
      copy:
        "Keep recruiter contacts, interview notes, follow-up reminders, and documents connected to every application.",
    },
  ];

  const audienceItems = [
    {
      title: "Active Job Seekers",
      description: "Applying to multiple opportunities every week.",
    },
    {
      title: "Busy Professionals",
      description: "Need to manage applications without spreadsheets.",
    },
    {
      title: "Career Switchers",
      description: "Track opportunities across different industries and roles.",
    },
    {
      title: "Fresh Graduates",
      description: "Organize campus placements and entry-level applications.",
    },
    {
      title: "Remote Job Seekers",
      description: "Manage applications across multiple job boards.",
    },
    {
      title: "Interviewing Candidates",
      description: "Keep recruiter conversations and interview schedules organized.",
    },
  ];

  const useSteps = [
    {
      eyebrow: "SAVE JOBS",
      title: "Save Job Opportunities",
      copy:
        "Save jobs from LinkedIn, Indeed, Wellfound, Google Jobs, and company career pages in one click.",
      visual: "source",
      reverse: false,
    },
    {
      eyebrow: "ORGANIZE APPLICATIONS",
      title: "Track Every Application",
      copy:
        "Categorize applications by stage, add notes, set reminders, and never lose track of where you've applied.",
      visual: "board",
      reverse: true,
    },
    {
      eyebrow: "JOB INSIGHTS",
      title: "Measure Your Results",
      copy:
        "Track interview rates, application performance, and offers to identify what helps you land more interviews.",
      visual: "chart",
      reverse: false,
    },
    {
      eyebrow: "TRACK CONTACTS",
      title: "Manage Recruiters & Interviews",
      copy:
        "Keep recruiter contacts, interview schedules, follow-ups, and documents organized for every opportunity.",
      visual: "contacts",
      reverse: true,
    },
  ];

  const heroChecklist = [
    "Centralized job tracking",
    "One-click job saving",
    "Recruiter & interview tracking",
    "Actionable job search insights",
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Tracker_Page"
          : "Job_Tracker_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Tracker_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_tracker_cta", "cta", {
          button_location: "job_tracker_hero_section",
          section: "job_tracker_hero",
        });
        trackSignupIntent("job_tracker_cta", {
          signup_source: "job_tracker_hero_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      const currentPath =
        pathname || (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        stripLocalePrefix(normalizedPath) === "/get-me-interview";
      const isOnJobTrackerPage =
        stripLocalePrefix(normalizedPath) === "/features/job-tracker" ||
        stripLocalePrefix(normalizedPath) === "/features/job-application-tracker";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

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

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnJobTrackerPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          const targetPath = localizeHref("/get-me-interview", normalizedPath);
          window.history.pushState({}, "", targetPath);
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

      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString());
        window.history.pushState({}, "", "/get-me-interview");
      }

      router.push("/get-me-interview");
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error);
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Job Application Tracker",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    description:
      "Job application tracker that helps you monitor, manage, and follow up on every application in one place. Stay organized and never miss updates-try Flashfire free.",
    brand: {
      "@type": "Brand",
      name: "FlashFireJobs",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/job-application-tracker",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "55",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jobTrackerFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Job Application Tracker",
        item: "https://www.flashfirejobs.com/features/job-application-tracker",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        {/* Hero */}
        <section className="bg-[#fff8f2] px-4 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
                <ClipboardList size={12} />
                Job Application Tracker
              </span>
              <h1 className="mt-6 text-[32px] font-extrabold leading-[1.15] text-[#111827] sm:text-[46px] sm:leading-[1.12]">
                Track Every Job Application in One Organized Dashboard
              </h1>
              <p className="mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#596273] sm:text-[16px]">
                FlashFire helps you organize every stage of your job search, from saving job
                opportunities and tracking applications to managing recruiter conversations and
                interview progress, all in one centralized dashboard.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-7 text-[13px] font-extrabold text-white shadow-[0_10px_30px_rgba(255,76,0,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-black"
                >
                  Get Me Interview
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleHowItWorks}
                  className="inline-flex h-[48px] items-center justify-center rounded-full border border-black/10 bg-white px-7 text-[13px] font-bold text-[#111827] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff4c00]/40 hover:text-[#ff4c00]"
                >
                  How It Works
                </button>
              </div>

              <div className="mt-9 grid max-w-[480px] grid-cols-1 gap-x-4 gap-y-3 text-[12px] font-semibold text-[#4b5565] sm:grid-cols-2">
                {heroChecklist.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <CheckCircle size={13} className="shrink-0 text-[#ff4c00]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <HeroTrackerMockup onAdd={handleGetMeInterview} />
          </div>
        </section>

        {/* Everything you need */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-10 max-w-[620px] text-center">
              <span className="inline-flex rounded-full border border-black/10 bg-[#f9fafb] px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
                What you get
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Everything You Need to Organize Your Job Search
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                Keep every job application, recruiter conversation, interview, and follow-up
                organized in one place so you always know what to do next.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {standOutCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="group rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-[17px] font-extrabold leading-tight text-[#111827]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#6b7280]">{card.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-[#fff8f2] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-10 max-w-[620px] text-center">
              <span className="inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
                Built for your job search
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Stay Organized From Your First Application to Your Job Offer
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                FlashFire keeps every opportunity, application, recruiter, and interview organized
                so nothing gets missed during your job search.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {workflowCards.map((card) => (
                <article
                  key={card.title}
                  className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                    <FileText size={20} />
                  </span>
                  <h3 className="text-[16px] font-extrabold leading-tight text-[#111827]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-[1fr_1.15fr] md:items-start">
            <div className="text-center md:text-left">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Who Benefits From FlashFire&apos;s Job Tracker?
              </h2>
              <p className="mx-auto mt-5 max-w-[420px] text-[15px] font-medium leading-7 text-[#6b7280] md:mx-0">
                Whether you&apos;re applying to a few roles or hundreds, FlashFire helps you stay
                organized throughout your job search.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {audienceItems.map((item) => (
                <article
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(255,76,0,0.08)]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00]">
                    <CheckCircle size={16} />
                  </span>
                  <div>
                    <p className="text-[14px] font-extrabold leading-5 text-[#111827] sm:text-[15px]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[13px] font-medium leading-5 text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — split steps */}
        <section id="how-it-works" className="bg-[#fff8f2] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[620px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Organize Your Job Search in 4 Simple Steps
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                Save opportunities, organize applications, monitor your progress, and manage
                recruiter conversations, all from one dashboard.
              </p>
            </div>

            <div className="space-y-14 sm:space-y-20">
              {useSteps.map((step, index) => (
                <div key={step.title} className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
                  <div className={step.reverse ? "sm:order-2" : ""}>
                    <span className="text-[13px] font-bold text-[#ff4c00]">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#9ca3af]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-3 text-[22px] font-extrabold leading-tight text-[#111827]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[420px] text-[15px] font-medium leading-7 text-[#6b7280]">
                      {step.copy}
                    </p>
                  </div>
                  <div className={step.reverse ? "sm:order-1" : ""}>
                    <StepVisual type={step.visual} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spreadsheet comparison */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mx-auto mb-10 max-w-[620px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Why FlashFire Beats Tracking Job Applications in Spreadsheets
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                Spreadsheets become difficult to maintain as your job search grows. FlashFire
                keeps everything organized automatically.
              </p>
            </div>

            <ComparisonTable
              leftLabel="Spreadsheet"
              rightLabel="FlashFire"
              rows={comparisonRows.map((row) => ({ left: row.spreadsheet, right: row.flashfire }))}
            />
          </div>
        </section>

        {/* Problem vs solution */}
        <section className="bg-[#f9fafb] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mx-auto mb-10 max-w-[620px] text-center">
              <span className="inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
                The problem with modern job search
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Why Most Job Searches Become Disorganized
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                As applications increase, it&apos;s easy to lose track of interviews, recruiter
                conversations, and follow-ups.
              </p>
            </div>

            <ComparisonTable
              leftLabel="Without FlashFire"
              rightLabel="With FlashFire"
              rows={problemRows.map((row) => ({ left: row.without, right: row.with }))}
            />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#fff8f2] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="relative overflow-hidden rounded-[28px] bg-[#ff4c00] px-6 py-14 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-0">
                <Sparkles className="absolute -right-6 -top-6 h-40 w-40 text-white/10 sm:h-56 sm:w-56" />
              </div>
              <div className="relative mx-auto max-w-[620px]">
                <h2 className="text-[28px] font-extrabold leading-[1.2] text-white sm:text-[38px]">
                  Ready to Organize Your Job Search?
                </h2>
                <p className="mx-auto mt-5 max-w-[480px] text-[15px] font-medium leading-7 text-white/85">
                  Save jobs in one click, track every application, and keep recruiters and
                  interviews organized in a single dashboard.
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    {...getButtonProps()}
                    onClick={handleGetMeInterview}
                    className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 text-[13px] font-extrabold text-[#ff4c00] transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
                  >
                    Get Me Interview
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Job Application Tracking</h2>
            <p>
              We get it, job application tracking can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobTrackerFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ComparisonTable({
  leftLabel,
  rightLabel,
  rows,
}: {
  leftLabel: string;
  rightLabel: string;
  rows: { left: string; right: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="grid grid-cols-2 border-b border-black/10 bg-[#f9fafb]">
        <div className="border-r border-black/10 p-3 text-center text-[11px] font-extrabold uppercase tracking-wide text-[#9ca3af] sm:p-5 sm:text-[12px]">
          {leftLabel}
        </div>
        <div className="p-3 text-center text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00] sm:p-5 sm:text-[12px]">
          {rightLabel}
        </div>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.left}
          className={`grid grid-cols-2 ${
            index !== rows.length - 1 ? "border-b border-black/10" : ""
          }`}
        >
          <div className="flex items-start gap-2 border-r border-black/10 p-3 text-[12px] font-medium leading-5 text-[#6b7280] sm:items-center sm:p-5 sm:text-[13px]">
            <XCircle size={16} className="mt-0.5 shrink-0 text-[#d1d5db] sm:mt-0" />
            {row.left}
          </div>
          <div className="flex items-start gap-2 p-3 text-[12px] font-extrabold leading-5 text-[#111827] sm:items-center sm:p-5 sm:text-[13px]">
            <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#ff4c00] sm:mt-0" />
            {row.right}
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroTrackerMockup({ onAdd }: { onAdd: () => void }) {
  const columns = [
    { title: "Wishlist", count: 10 },
    { title: "Applied", count: 5 },
    { title: "Interview", count: 2 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(255,76,0,0.1) 0%, rgba(255,76,0,0) 70%)",
        }}
      />
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(17,24,39,0.1)] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[14px] font-extrabold text-[#111827]">My job search</h3>
            <p className="text-[11px] font-semibold text-[#7a8290]">Track everything in one place</p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="shrink-0 rounded-full bg-[#ff4c00] px-4 py-2 text-[11px] font-bold text-white transition hover:bg-black"
          >
            Add More
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {columns.map((column) => (
            <div
              key={column.title}
              className="min-w-0 rounded-xl border border-[#ff4c00]/15 bg-[#fff0e9] p-2.5 sm:p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-1 text-[9px] font-extrabold text-[#111827] sm:text-[10px]">
                <span className="truncate">{column.title}</span>
                <span className="text-[#ff4c00]">{column.count}</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-7 rounded-md border border-[#ff4c00]/10 bg-white"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-5">
          <CheckCircle size={14} className="text-[#ff4c00]" />
          <span className="text-[11px] font-semibold text-[#6b7280]">
            Applications, recruiters, and interviews in sync
          </span>
        </div>
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  if (type === "source") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
          <Target size={14} />
          Save from anywhere
        </div>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5">
          <div className="grid grid-cols-2 gap-2 sm:block sm:w-[38%] sm:space-y-2.5">
            {["LinkedIn", "Wellfound", "Google", "Indeed"].map((item) => (
              <div
                key={item}
                className="rounded-full border border-[#ff4c00]/15 bg-[#fff0e9] px-3 py-2 text-center text-[11px] font-bold text-[#111827] sm:text-left"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-3 w-24 max-w-full rounded bg-[#eef0f3]" />
            <div className="h-3 w-40 max-w-full rounded bg-[#eef0f3]" />
            <div className="flex items-center gap-2 rounded-lg border border-[#ff4c00]/15 bg-[#fff0e9] px-3 py-3">
              <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
              <div className="h-2.5 w-2/3 rounded bg-[#ff4c00]/25" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
          <ClipboardList size={14} />
          Organized by stage
        </div>
        <div className="grid min-w-0 grid-cols-3 gap-2.5 sm:gap-3">
          {["Wishlist", "Applied", "Interview"].map((item) => (
            <div key={item} className="min-w-0 rounded-xl border border-[#ff4c00]/15 bg-[#fff0e9] p-2.5 sm:p-3">
              <div className="mb-3 truncate text-[9px] font-extrabold text-[#111827] sm:text-[10px]">
                {item}
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="h-7 rounded-md border border-[#ff4c00]/10 bg-white" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
          <BarChart3 size={14} />
          Job search summary
        </div>
        <div className="space-y-3">
          {[
            { label: "Applied", value: 50, width: "w-[88%]" },
            { label: "Interview", value: 8, width: "w-[62%]" },
            { label: "Accepted", value: 2, width: "w-[44%]" },
            { label: "Rejected", value: 15, width: "w-[32%]" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 text-[11px] font-bold text-[#111827]">
              <span className="w-16 shrink-0 sm:w-20">{item.label}</span>
              <span className="h-3 flex-1 rounded bg-[#eef0f3]">
                <span className={`block h-3 rounded bg-[#ff4c00]/25 ${item.width}`} />
              </span>
              <span className="w-8 shrink-0 text-right text-[#6b7280]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
        <FileText size={14} />
        Manage contacts
      </div>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="grid grid-cols-2 gap-2 sm:block sm:w-[38%] sm:space-y-2.5">
          {["Notes", "Contacts", "Docs", "History"].map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#ff4c00]/15 bg-[#fff0e9] px-3 py-2 text-center text-[11px] font-bold text-[#111827] sm:text-left"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-3 h-3 w-28 max-w-full rounded bg-[#dfe3ea]" />
          <div className="h-12 rounded-lg bg-[#f0f1f4]" />
          <div className="mt-3 h-16 rounded-lg border border-[#ff4c00]/15 bg-[#fff0e9]" />
        </div>
      </div>
    </div>
  );
}
