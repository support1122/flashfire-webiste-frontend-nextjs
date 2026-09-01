"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function DashboardAnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeDesignedForIndex, setActiveDesignedForIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const dashboardAnalyticsFAQs = [
    {
      question: "What is job search analytics?",
      answer:
        "Job search analytics turns your application activity into measurable insights, showing you response rates, interview conversions, and which strategies are actually working.",
    },
    {
      question: "How does FlashFire track my job applications?",
      answer:
        "FlashFire automatically logs every application, interview, and recruiter interaction in one dashboard so you always have an up-to-date view of your job search.",
    },
    {
      question: "How can analytics improve my interview rate?",
      answer:
        "By showing which resumes, roles, and companies generate the most responses, analytics helps you focus your effort on what's actually converting into interviews.",
    },
    {
      question: "What metrics does FlashFire track?",
      answer:
        "FlashFire tracks jobs applied, response rates, interview rates, and performance across companies, roles, and resume versions.",
    },
    {
      question: "Can I measure response and interview rates?",
      answer:
        "Yes. FlashFire calculates your response and interview rates automatically as you log applications, so you can see your progress in real time.",
    },
    {
      question: "How does FlashFire compare with spreadsheets?",
      answer:
        "Unlike spreadsheets, FlashFire updates automatically, analyzes your results, and surfaces trends you'd otherwise have to calculate by hand.",
    },
    {
      question: "Can I track multiple resume versions?",
      answer:
        "Yes. You can track outcomes by resume version to see which one performs best for different roles and companies.",
    },
    {
      question: "Does FlashFire help identify the best-performing job applications?",
      answer:
        "FlashFire highlights which applications, companies, and job titles produce the strongest response and interview rates.",
    },
    {
      question: "Is job search analytics useful for fresh graduates?",
      answer:
        "Yes. Fresh graduates can use analytics to measure early application progress and quickly identify what improves their interview chances.",
    },
    {
      question: "Can international candidates track visa-friendly employers?",
      answer:
        "Yes. International candidates can monitor visa-friendly employers and compare outcomes to focus their search where it counts.",
    },
    {
      question: "How does FlashFire help improve my job search strategy?",
      answer:
        "FlashFire turns your application data into clear signals, helping you adjust targeting, resumes, and outreach based on what's actually working.",
    },
    {
      question: "Is my application data secure?",
      answer:
        "Yes. Your application and job search data is kept private and secure within your FlashFire account.",
    },
  ];

  const featureCards = [
    {
      title: "Track Application Activity",
      desc:
        "See how many jobs you've applied for, how many received responses, and where every application stands.",
    },
    {
      title: "Measure Interview Success",
      desc:
        "Understand which applications lead to interviews and identify the strategies that deliver better results.",
    },
    {
      title: "Discover Your Best Opportunities",
      desc: "Identify which companies, job titles, and industries respond best to your profile.",
    },
  ];

  const benefitCards = [
    {
      title: "Track Applications",
      desc: "Keep every application, interview, and recruiter response organized in one dashboard.",
    },
    {
      title: "Identify Trends",
      desc: "Discover patterns across industries, companies, resume versions, and job titles.",
    },
    {
      title: "Improve Your Strategy",
      desc: "Learn which approaches generate interviews so you can focus on what works.",
    },
    {
      title: "Increase Interview Opportunities",
      desc: "Use insights from previous applications to continuously improve your job search.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Track Every Application",
      desc: "Monitor applications, interviews, recruiter conversations, and follow-ups in one place.",
    },
    {
      number: "02",
      title: "Analyze Your Results",
      desc: "See interview rates, response rates, and application performance across different companies and roles.",
    },
    {
      number: "03",
      title: "Identify What's Working",
      desc: "Discover which resumes, job titles, and industries generate the most interviews.",
    },
    {
      number: "04",
      title: "Optimize Your Strategy",
      desc: "Adjust your job search based on real performance data to improve future results.",
    },
  ];

  const audienceCards = [
    {
      title: "High-Volume Job Seekers",
      desc: "Track large numbers of applications without losing visibility.",
    },
    {
      title: "International Candidates",
      desc: "Monitor visa-friendly employers and application outcomes.",
    },
    {
      title: "Career Growth Professionals",
      desc: "Understand which opportunities generate the strongest response.",
    },
    {
      title: "Fresh Graduates",
      desc: "Measure application progress and improve interview performance.",
    },
    {
      title: "Career Switchers",
      desc: "Compare results across industries and job titles.",
    },
    {
      title: "Data-Driven Job Seekers",
      desc: "Use measurable insights to make smarter application decisions.",
    },
  ];

  const comparisonRows = [
    { spreadsheet: "Manual updates", flashfire: "Automatic tracking" },
    { spreadsheet: "Basic records", flashfire: "Performance insights" },
    { spreadsheet: "No interview analysis", flashfire: "Interview conversion tracking" },
    { spreadsheet: "Difficult to identify trends", flashfire: "Smart analytics" },
    { spreadsheet: "Separate notes", flashfire: "Everything in one dashboard" },
    { spreadsheet: "No optimization", flashfire: "Continuous improvement" },
  ];

  const problemRows = [
    { without: "Guess what works", withFlashfire: "Measure everything" },
    { without: "No performance insights", withFlashfire: "Clear application analytics" },
    { without: "Random improvements", withFlashfire: "Data-backed decisions" },
    { without: "Missed opportunities", withFlashfire: "Better optimization" },
    { without: "Manual tracking", withFlashfire: "Centralized dashboard" },
  ];

  const resultMetrics = ["Jobs Tracked", "Interview Rate", "Response Rate", "Strategy Improvements"];

  const designedFor = [
    {
      number: "01",
      title: "High-Volume Applicants",
      desc: "See which application sources, companies, and role types produce the strongest response rates.",
    },
    {
      number: "02",
      title: "International Candidates",
      desc: "Track visa-friendly companies, regions, and interview success patterns in one place.",
    },
    {
      number: "03",
      title: "Optimization-Focused Professionals",
      desc: "Use analytics to refine targeting, resume versions, and follow-up strategy.",
    },
    {
      number: "04",
      title: "Data-Driven Job Seekers",
      desc: "Replace guessing with clear signals about what converts and what does not.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleDesignedForToggle = (index: number) => {
    setActiveDesignedForIndex(activeDesignedForIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Dashboard_Analytics_Page"
          : "Dashboard_Analytics_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Dashboard_Analytics_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "dashboard_analytics_cta", "cta", {
          button_location: "dashboard_analytics_hero_section",
          section: "dashboard_analytics_hero",
        });
        trackSignupIntent("dashboard_analytics_cta", {
          signup_source: "dashboard_analytics_hero_button",
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
      const isOnDashboardAnalyticsPage =
        stripLocalePrefix(normalizedPath) === "/features/dashboard-analytics";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnDashboardAnalyticsPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            localizeHref("/get-me-interview", normalizedPath)
          );
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
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

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire Job Search Analytics Dashboard",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/dashboard-analytics",
    description: "Use FlashFire's job search analytics dashboard to track job applications, response rates, and interview conversions. Optimize your job search with data.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "62" },
  };

  const faqSchemaDashboard = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dashboardAnalyticsFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Dashboard & Analytics", item: "https://www.flashfirejobs.com/features/dashboard-analytics" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaDashboard) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="relative min-h-screen overflow-x-hidden bg-[#fbf9f6] text-[#111827]">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="absolute top-1/4 -right-28 h-[30rem] w-[30rem] rounded-full bg-amber-100/60 blur-3xl" />
          <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-rose-100/40 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />
        </div>

        <section className="relative bg-gradient-to-b from-orange-50/70 via-transparent to-transparent px-4 py-20 sm:py-28">
          <div className="relative mx-auto max-w-[1180px] text-center">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00] shadow-sm backdrop-blur-md">
              Job Search Analytics
            </span>
            <h1 className="mx-auto max-w-[850px] text-[36px] font-extrabold leading-[1.14] tracking-normal text-gray-900 sm:text-[54px] sm:leading-[1.14]">
              Track Your Job Search Performance in One Dashboard
            </h1>
            <p className="mx-auto mt-6 max-w-[650px] text-[17px] font-medium leading-8 text-gray-600">
              FlashFire gives you a complete view of your job search by tracking applications,
              interviews, response rates, and recruiter activity so you can make smarter decisions
              and improve your interview chances.
            </p>

            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="inline-flex min-h-[50px] w-full max-w-[292px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-gradient-to-r from-[#ff4c00]/95 to-[#ff7a33]/95 px-7 text-[14px] font-bold text-white shadow-lg shadow-orange-300/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-orange-300/50 hover:-translate-y-0.5 sm:h-[50px] sm:w-auto sm:max-w-full sm:min-w-[180px]"
              >
                Track My Job Search
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={handleHowItWorks}
                className="inline-flex min-h-[50px] w-full max-w-[292px] items-center justify-center rounded-full border border-white/70 bg-white/50 px-4 py-3 text-center text-[14px] font-bold leading-6 text-gray-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/70 hover:-translate-y-0.5 hover:shadow-md sm:h-[50px] sm:w-auto sm:max-w-full sm:min-w-[365px] sm:px-7 sm:py-0"
              >
                How Our Job Search Analytics Dashboard Works
              </button>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-sky-50/60 via-transparent to-transparent px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-16 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.1] text-gray-900 sm:text-[46px]">
                Everything You Need to Measure Your Job Search
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] text-[19px] font-medium leading-8 text-gray-600">
                Monitor every application, interview, recruiter interaction, and response so you
                always know what&apos;s working and where to improve.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
              {featureCards.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[185px] min-w-0 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(255,124,0,0.15)] sm:p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-white shadow-md shadow-orange-200/60 backdrop-blur-md">
                    <CheckCircle size={20} strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-extrabold leading-tight text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-[14px] font-medium leading-7 text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-emerald-50/50 via-transparent to-transparent px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-16 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.1] text-gray-900 sm:text-[46px]">
                Turn Job Search Data Into Better Decisions
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] text-[19px] font-medium leading-8 text-gray-600">
                Stop guessing what works. Use real job search insights to refine your strategy and
                increase your chances of getting interviews.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
              {benefitCards.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[150px] min-w-0 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(255,124,0,0.15)] sm:p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-white shadow-md shadow-orange-200/60 backdrop-blur-md">
                    <CheckCircle size={20} strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 text-[16px] font-extrabold leading-tight text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-[14px] font-medium leading-7 text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-amber-50/60 via-transparent to-transparent px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-8 text-center sm:mb-9">
              <h2 className="text-[30px] font-extrabold leading-[1.08] text-gray-900 sm:text-[36px]">
                Who Benefits From Job Search Analytics?
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Whether you&apos;re applying to ten jobs or hundreds, FlashFire helps you
                understand your progress and improve your job search with real insights.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audienceCards.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full min-h-[146px] min-w-0 flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/50 px-6 py-6 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(255,124,0,0.15)] sm:px-7"
                >
                  <span className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-white shadow-sm shadow-orange-200/60 backdrop-blur-md">
                    <CheckCircle size={16} strokeWidth={3} />
                  </span>
                  <p className="text-[15px] font-extrabold leading-6 text-gray-900">{item.title}</p>
                  <p className="mt-2 text-[13px] font-medium leading-6 text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="relative bg-gradient-to-b from-rose-50/50 via-transparent to-transparent px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-12 text-center">
              <h2 className="text-[31px] font-extrabold leading-[1.12] text-gray-900 sm:text-[40px] sm:leading-tight">
                Improve Your Job Search in 4 Simple Steps
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Track your progress, understand your results, and continuously improve every
                stage of your job search.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <article
                  key={step.title}
                  className="h-full min-h-[170px] min-w-0 overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-5 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(255,124,0,0.15)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-[12px] font-extrabold text-white shadow-sm shadow-orange-200/60 backdrop-blur-md">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-[15px] font-extrabold leading-tight text-gray-900">{step.title}</h3>
                  <p className="mt-4 text-[13px] font-medium leading-6 text-gray-600">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-indigo-50/40 via-transparent to-transparent px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <div className="mb-10 text-center">
              <h2 className="text-[30px] font-extrabold leading-tight text-gray-900 sm:text-[32px]">
                Why Job Search Analytics Beats Tracking Applications in Spreadsheets
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Spreadsheets help you record applications. FlashFire helps you understand what&apos;s
                actually working.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl">
              <div className="grid grid-cols-2 border-b border-white/60 bg-white/40">
                <div className="border-r border-white/60 p-4 text-center text-[14px] font-extrabold text-gray-500">
                  Spreadsheet
                </div>
                <div className="p-4 text-center text-[14px] font-extrabold text-[#ff4c00]">FlashFire</div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.spreadsheet}
                  className={`grid grid-cols-2 border-b border-white/50 transition-colors last:border-b-0 hover:bg-white/50 ${
                    index % 2 === 0 ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 border-r border-white/50 p-4 text-[13px] font-medium text-gray-600">
                    <XCircle size={16} className="shrink-0 text-gray-300" />
                    {row.spreadsheet}
                  </div>
                  <div className="flex items-center gap-2 p-4 text-[13px] font-extrabold text-gray-900">
                    <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
                    {row.flashfire}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-orange-50/50 via-transparent to-transparent px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <div className="mb-10 text-center">
              <h2 className="text-[30px] font-extrabold leading-tight text-gray-900 sm:text-[32px]">
                Why Most Job Seekers Don&apos;t Know What&apos;s Working
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-gray-600">
                Many job seekers send dozens of applications without understanding why some
                receive interviews while others don&apos;t.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl">
              <div className="grid grid-cols-2 border-b border-white/60 bg-white/40">
                <div className="border-r border-white/60 p-4 text-center text-[14px] font-extrabold text-gray-500">
                  Without FlashFire
                </div>
                <div className="p-4 text-center text-[14px] font-extrabold text-[#ff4c00]">With FlashFire</div>
              </div>
              {problemRows.map((row, index) => (
                <div
                  key={row.without}
                  className={`grid grid-cols-2 border-b border-white/50 transition-colors last:border-b-0 hover:bg-white/50 ${
                    index % 2 === 0 ? "bg-white/20" : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 border-r border-white/50 p-4 text-[13px] font-medium text-gray-600">
                    <XCircle size={16} className="shrink-0 text-gray-300" />
                    {row.without}
                  </div>
                  <div className="flex items-center gap-2 p-4 text-[13px] font-extrabold text-gray-900">
                    <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
                    {row.withFlashfire}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-teal-50/50 via-transparent to-transparent px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-16 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.1] text-gray-900 sm:text-[46px]">
                See Your Job Search Progress Clearly
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] text-[19px] font-medium leading-8 text-gray-600">
                Track meaningful metrics that help you improve your job search instead of simply
                counting applications.
              </p>
            </div>

            <div className="grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-4">
              {resultMetrics.map((label) => (
                <article
                  key={label}
                  className="flex h-full min-h-[146px] min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/50 px-4 py-6 text-center shadow-[0_8px_32px_rgba(31,38,135,0.08)] backdrop-blur-xl transition-all duration-300 hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(255,124,0,0.15)]"
                >
                  <span className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-white shadow-md shadow-orange-200/60 backdrop-blur-md">
                    <CheckCircle size={19} strokeWidth={3} />
                  </span>
                  <p className="text-[15px] font-extrabold leading-6 text-gray-900">
                    {label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-violet-50/40 via-transparent to-transparent px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[420px_1fr] lg:items-start">
            <div>
              <h2 className="max-w-[390px] text-[32px] font-extrabold leading-[1.35] tracking-normal text-gray-900 sm:text-[36px]">
                Designed for Job Seekers Who Want Measurable Progress?
              </h2>
              <p className="mt-7 max-w-[390px] text-[13px] font-medium leading-6 text-gray-600">
                FlashFire&apos;s job search analytics dashboard is built for candidates who want
                visibility into their job application tracking and real improvement in interview
                outcomes.
              </p>
              <p className="mt-6 max-w-[390px] text-[13px] font-medium leading-6 text-gray-600">
                Instead of guessing, you see clear signals - what converts, what doesn&apos;t, and
                where to focus next.
              </p>
            </div>

            <div className="space-y-3">
              {designedFor.map((item, index) => {
                const isOpen = activeDesignedForIndex === index;

                return (
                  <article
                    key={item.number}
                    className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                      isOpen
                        ? "border-white/70 bg-white/70 shadow-[0_8px_32px_rgba(255,124,0,0.15)]"
                        : "border-white/60 bg-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.08)] hover:bg-white/55"
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => handleDesignedForToggle(index)}
                      className="flex min-h-[48px] w-full items-center justify-between gap-4 px-4 py-4 text-left text-gray-900 sm:px-5"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[14px] font-extrabold backdrop-blur-md ${
                            isOpen
                              ? "border-white/70 bg-gradient-to-br from-[#ff4c00]/90 to-[#ff7a33]/90 text-white shadow-sm shadow-orange-200/60"
                              : "border-white/60 bg-white/50 text-[#ff4c00]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="text-[13px] font-extrabold leading-tight sm:text-[14px]">
                          {item.title}
                        </span>
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/50 text-[18px] leading-none text-gray-500 backdrop-blur-md">
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-5 text-[12px] font-medium leading-6 text-gray-600 sm:px-5">
                        {item.desc}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-orange-50/70 via-transparent to-transparent px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[31px] font-extrabold leading-[1.15] text-gray-900 sm:text-[42px]">
              Ready to Improve Your
              <br className="hidden sm:block" />
              <span className="text-[#ff4c00]">Job Search?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[15px] font-medium leading-7 text-gray-600">
              Track your applications, measure your progress, and use real insights to make every
              job application more effective.
            </p>
            <button
              {...getButtonProps()}
              onClick={handleGetMeInterview}
              className="mt-9 inline-flex h-[44px] min-w-[190px] items-center justify-center rounded-full border border-white/40 bg-gradient-to-r from-[#ff4c00]/95 to-[#ff7a33]/95 px-7 text-[13px] font-bold text-white shadow-lg shadow-orange-300/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-orange-300/50 hover:-translate-y-0.5"
            >
              Track My Job Search
              <ArrowRight className="ml-1 inline" size={14} />
            </button>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Job Search Analytics</h2>
            <p>
              We get it, job search analytics can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {dashboardAnalyticsFAQs.map((faq, index) => (
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
