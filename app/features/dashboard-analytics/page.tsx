"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { BarChart, TrendingUp, PieChart, Activity, Target, Award } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

export default function DashboardAnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const dashboardAnalyticsFAQs = [
    {
      question: "What is job search analytics?",
      answer: "Job search analytics helps you analyze job application data such as response rates, interview conversions, and company performance. FlashFire's job search analytics dashboard turns this data into actionable insights."
    },
    {
      question: "How does job application tracking improve interview rates?",
      answer: "Job application tracking helps you see which roles and companies respond best. FlashFire combines job application tracking with analytics to help you focus on what works and improve interview rates."
    },
    {
      question: "Is a job search dashboard better than using spreadsheets?",
      answer: "Yes. A job search dashboard automatically tracks applications, analyzes performance, and surfaces insights that spreadsheets can't provide."
    }
  ];

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "Dashboard_Analytics_Page"
        : "Dashboard_Analytics_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Dashboard_Analytics_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
          },
        });
      } catch (gtagError) {
        console.warn('GTagUTM error:', gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "dashboard_analytics_cta", "cta", {
          button_location: "dashboard_analytics_hero_section",
          section: "dashboard_analytics_hero"
        });
        trackSignupIntent("dashboard_analytics_cta", {
          signup_source: "dashboard_analytics_hero_button",
          funnel_stage: "signup_intent"
        });
      } catch (trackError) {
        console.warn('Tracking error:', trackError);
      }

      // Check current path first
      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const normalizedPath = currentPath.split('?')[0];
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
        normalizedPath === '/en-ca/get-me-interview';
      const isOnDashboardAnalyticsPage = normalizedPath === '/features/dashboard-analytics' ||
        normalizedPath === '/en-ca/features/dashboard-analytics';

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      }

      // If on dashboard analytics features page, change URL but keep page content visible
      if (isOnDashboardAnalyticsPage) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        
        // Update URL for tracking without navigation
        if (typeof window !== 'undefined') {
          const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
          window.history.pushState({}, '', targetPath);
        }
        
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            }, 50);
          });
        });
        
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
        
        const targetPath = '/get-me-interview';
        window.history.pushState({}, '', targetPath);
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview';
      router.push(targetPath);
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error);
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works")
    if (!section) return
  
    const yOffset = -80 // adjust if navbar height changes
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset
  
    window.scrollTo({ top: y, behavior: "smooth" })
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white py-12 sm:py-20 lg:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

    {/* Eyebrow */}
    <div className="inline-flex items-center gap-2 mb-6">
      <span className="h-2 w-2 rounded-full bg-[#ff4c00]" />
      <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
        DASHBOARD & ANALYTICS
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-[#0b1220] mb-6 sm:mb-8">
      Job Search Analytics Dashboard for <br className="hidden sm:block" />
      <span className="text-[#ff4c00]">Smarter Job Application Tracking</span>
    </h1>

    {/* Subheading */}
    <p className="text-base sm:text-lg md:text-xl text-[#5b6475] max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-1">
      FlashFire's job search analytics dashboard helps you track job applications, analyze response rates, and monitor interview conversions so you can optimize your job search using real data.
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button
        {...getButtonProps()}
        onClick={handleGetMeInterview}
        className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center gap-2"
        style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
      >
        Get Me Interview →
      </button>
      <button
        onClick={handleHowItWorks}
        className="border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center gap-2"
      >
        How Our Job Search Analytics Dashboard Works
      </button>
    </div>
  </div>
</section>
<section className="py-12 sm:py-20 lg:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="text-center mb-10 sm:mb-16 lg:mb-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b1220]">
        Everything You Need to <span className="text-[#ff4c00]">Track</span>
      </h2>
      <p className="mt-4 text-base sm:text-lg text-[#5b6475] max-w-3xl mx-auto px-1">
        FlashFire combines job application tracking and job search analytics to give you a complete view of your job search performance, from applications to interviews.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
      {[
        {
          title: "Application Performance",
          desc: "Monitor job application tracking metrics, including how many applications you submit and how many receive responses.",
        },
        {
          title: "Interview Conversion",
          desc: "Understand interview conversion rates using job search analytics to see which job applications lead to interviews and offers.",
        },
        {
          title: "Company & Role Insights",
          desc: "See which roles, companies, and industries respond best to you.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[#fff7f2] rounded-2xl p-10 border border-[#ffd6c4] hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-4 text-[#0b1220]">
            {item.title}
          </h3>
          <p className="text-[#5b6475] text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
<section id="how-it-works" className="py-32 bg-[#fff7f2]">
  <div className="max-w-7xl mx-auto px-6">

    {/* ===== Header ===== */}
    <div className="text-center mb-24">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1220] mb-6">
        How Job Search Analytics <span className="text-[#ff4c00]">Improves Your Job Application Results</span>
      </h2>
      <p className="text-lg text-[#5b6475] max-w-3xl mx-auto">
        Turn raw application data into clear insights that help you
        refine strategy, reduce waste, and land interviews faster.
      </p>
    </div>

    {/* ===== Steps ===== */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
      {[
        {
          step: "01",
          title: "Track",
          desc: "See exactly what you’re applying to and which applications get responses.",
        },
        {
          step: "02",
          title: "Analyze",
          desc: "Identify patterns across interviews, rejections, and company types.",
        },
        {
          step: "03",
          title: "Optimize",
          desc: "Refine targeting, resume versions, and role selection using insights.",
        },
        {
          step: "04",
          title: "Improve",
          desc: "Increase interview rate and reduce rejections with each iteration.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 sm:p-6 lg:p-10 border border-[#ffd6c4] text-center hover:shadow-lg transition"
        >
          {/* Step Badge */}
          <div className="w-14 h-14 mx-auto mb-4 sm:mb-6 rounded-full bg-[#fff1ea] flex items-center justify-center text-[#ff4c00] font-extrabold text-lg">
            {item.step}
          </div>

          <h3 className="font-bold text-xl mb-3 text-[#0b1220]">
            {item.title}
          </h3>

          <p className="text-sm text-[#5b6475] leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ================= WHO IS THIS FOR ================= */}
{/* ================= WHO IS THIS FOR (PREMIUM) ================= */}
<section className="py-36 bg-[#fff7f2] relative overflow-hidden">

  {/* Soft ambient background */}
  <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[#ffe3d4] rounded-full blur-3xl opacity-50" />
  <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#fff0e6] rounded-full blur-3xl opacity-60" />

  <div className="relative max-w-7xl mx-auto px-6">

    {/* Outer Frame */}
    <div className="bg-white border border-[#ffd6c4] rounded-[32px] p-10 md:p-14 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-start">

        {/* LEFT — CONTENT */}
        <div>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ff4c00]" />
            <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
              WHO THIS IS BUILT FOR
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0b1220]">
            Designed for Job Seekers <br className="hidden sm:block" />
            Who Want{" "}
            <span className="text-[#ff4c00]">
              Measurable Progress
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg text-[#5b6475] leading-relaxed max-w-xl">
            FlashFire’s job search analytics dashboard is built for candidates
            who want visibility into their job application tracking and
            real improvement in interview outcomes.
          </p>

          <p className="mt-4 text-[#5b6475] leading-relaxed max-w-xl">
            Instead of guessing, you see clear signals — what converts,
            what doesn’t, and where to focus next.
          </p>

          {/* Insight Strip */}
          <div className="mt-6 sm:mt-10 flex flex-wrap gap-4 sm:gap-6">
            {[
              { label: "Applications", value: "Tracked" },
              { label: "Interview Rate", value: "Visible" },
              { label: "Decisions", value: "Data-Driven" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#fff7f2] border border-[#ffd6c4] rounded-xl px-5 py-4"
              >
                <div className="text-sm font-semibold text-[#0b1220]">
                  {item.value}
                </div>
                <div className="text-xs text-[#5b6475]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — PERSONA STACK */}
        <div className="relative">

          {/* Accent rail */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[#ff4c00] via-[#ff9b66] to-transparent" />

          <div className="space-y-7 pl-10">

            {[
              {
                title: "High-Volume Applicants",
                desc: "Candidates applying to many roles who need clarity on what actually converts into interviews.",
              },
              {
                title: "International Candidates",
                desc: "Track visa-friendly companies, regions, and interview success patterns in one place.",
              },
              {
                title: "Optimization-Focused Professionals",
                desc: "People continuously refining resumes, roles, and targeting using real performance data.",
              },
              {
                title: "Data-Driven Job Seekers",
                desc: "Anyone serious about improving interview outcomes with measurable insights.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-[#fff7f2] border border-[#ffd6c4] rounded-2xl p-6 hover:bg-white hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff4c00]" />
                  <h3 className="text-lg font-extrabold text-[#0b1220]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[#5b6475] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  </div>
</section>



<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-extrabold">
        Who Benefits Most From <span className="text-[#ff4c00]">Analytics?</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "High-Volume Applicants",
          desc: "Understand what’s working when applying at scale.",
        },
        {
          title: "International Candidates",
          desc: "Track visa-friendly companies and interview trends.",
        },
        {
          title: "Career Optimizers",
          desc: "Continuously improve strategy using real data.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[#fff7f2] rounded-2xl p-5 sm:p-6 lg:p-10 border border-[#ffd6c4] hover:shadow-lg transition"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#0b1220]">
            {item.title}
          </h3>
          <p className="text-[#5b6475] text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* ================= FAQ ================= */}
        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, job search analytics can sound complex. Here's everything
              explained, plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {dashboardAnalyticsFAQs.map((faq, index) => (
              <div
                key={index}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button
                  className={faqStyles.faqQuestion}
                  onClick={() => handleFaqToggle(index)}
                >
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

      </div>
    
      <Footer />
    </>
  );
}

