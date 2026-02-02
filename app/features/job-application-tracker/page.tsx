"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { CheckCircle, Target, BarChart, TrendingUp, Clock, Zap } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function JobTrackerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "Job_Tracker_Page"
        : "Job_Tracker_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Tracker_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_tracker_cta", "cta", {
          button_location: "job_tracker_hero_section",
          section: "job_tracker_hero"
        });
        trackSignupIntent("job_tracker_cta", {
          signup_source: "job_tracker_hero_button",
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
      const isOnJobTrackerPage = normalizedPath === '/features/job-tracker' ||
        normalizedPath === '/en-ca/features/job-tracker' ||
        normalizedPath === '/features/job-application-tracker' ||
        normalizedPath === '/en-ca/features/job-application-tracker';

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

      // If on job tracker features page, change URL but keep page content visible
      if (isOnJobTrackerPage) {
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
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Job Application Tracker",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    "description": "Job application tracker that helps you monitor, manage, and follow up on every application in one place. Stay organized and never miss updates—try Flashfire free.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFireJobs"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/job-application-tracker",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "55"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <div className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

            {/* ================= LEFT ================= */}
            <div>
              {/* Eyebrow */}
              <span className="inline-block mb-5 text-sm font-semibold tracking-wide text-[#ff4c00]">
                JOB TRACKER
              </span>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[54px] xl:text-[64px] font-extrabold leading-[1.05] text-[#0b1220]">
                Track, Organize, and <br />
                <span className="text-[#ff4c00]">Optimize</span> Your Job <br />
                Search
              </h1>

              {/* Subtext */}
              <p className="mt-7 text-lg text-[#5b6475] max-w-xl leading-relaxed">
                Forget spreadsheets and endless bookmarks. Save, apply,
                track, and revisit job applications — all from one clean,
                streamlined FlashFire dashboard.
              </p>

              {/* Feature bullets */}
              <div className="mt-10 grid sm:grid-cols-2 gap-y-5 gap-x-8 text-[15px] font-medium text-[#0b1220]">
                {[
                  "Centralized job tracking",
                  "Actionable job insights",
                  "Track recruiters & contacts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-[#ff4c00] text-[#ff4c00] flex items-center justify-center text-sm">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
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
                  How It Works
                </button>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative max-w-full overflow-hidden mt-8 lg:mt-0">

              {/* Soft background blob - hidden on small screens to avoid overflow */}
              <div className="hidden lg:block absolute -top-10 -right-10 w-[520px] h-[520px] bg-[#fff1ea] rounded-[48px]" />

              {/* Dashboard Card */}
              <div className="relative bg-white rounded-2xl border border-[#ffd6c4] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-4 sm:p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h4 className="font-semibold text-[#0b1220]">
                      My job search
                    </h4>
                    <p className="text-xs text-[#5b6475]">
                      Track everything in one place
                    </p>
                  </div>

                  <button className="text-sm bg-[#ff4c00] text-white px-4 py-2 rounded-lg">
                    Add More
                  </button>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {[
                    { title: "Wishlist", count: 10 },
                    { title: "Applied", count: 5 },
                    { title: "Interview", count: 2 },
                  ].map((col) => (
                    <div
                      key={col.title}
                      className="bg-[#fff1ea] rounded-xl p-3 border border-[#ffd6c4]"
                    >
                      <div className="flex justify-between font-semibold mb-3 text-[#0b1220]">
                        <span>{col.title}</span>
                        <span>{col.count}</span>
                      </div>

                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-9 bg-white rounded-md border border-[#ffd6c4]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
        <section className="bg-[#f9fcff] py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* ================= HEADING ================= */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0b1220]">
                What Makes FlashFire's Job Application <br className="hidden sm:block" />
                <span className="text-[#ff4c00]">Tracker Stand Out?</span>
              </h2>
            </div>

            {/* ================= CARDS ================= */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch">

              {/* ===== CARD 1 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-4 mb-8">
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white rounded-lg px-3 py-2"
                      >
                        <div className="h-3 w-28 bg-gray-200 rounded" />
                        <div className="h-7 w-20 bg-[#ff4c00]/10 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  One-Click Job Import
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Instantly save jobs from LinkedIn, Indeed, and company
                  sites using our Chrome extension — no spreadsheets needed.
                </p>
              </div>

              {/* ===== CARD 2 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-6 mb-8 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute left-6 bottom-6 bg-white px-3 py-1 rounded shadow text-xs font-medium">
                      Applied 50
                    </div>
                    <div className="absolute right-6 top-6 bg-white px-3 py-1 rounded shadow text-xs font-medium">
                      Accepted 2
                    </div>
                    <span className="text-[#ff4c00] font-semibold text-sm">
                      Job Search Insights
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Job Search Insights
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Understand how your applications perform with clear
                  insights into interviews, rejections, and offers.
                </p>
              </div>

              {/* ===== CARD 3 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-4 mb-8 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3 space-y-3 min-w-0">
                    {["Notes", "Contacts", "Docs"].map((item) => (
                      <div
                        key={item}
                        className="bg-white rounded-lg px-3 py-2 text-xs font-medium"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 bg-white rounded-xl p-4 border border-[#ffd6c4]">
                    <p className="text-sm font-semibold mb-3">
                      Skill Match
                    </p>
                    <div className="h-10 bg-[#fff6f1] rounded-lg" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Advanced CRM Tools
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Manage recruiters, notes, documents, and skills — all
                  linked directly to each job application.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="bg-white py-12 sm:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
              <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
                HOW IT WORKS
              </span>

              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b1220]">
                A smarter way to
                <br />
                <span className="text-[#ff4c00]">
                  manage your job search
                </span>
              </h2>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#5b6475]">
                From saving jobs to tracking interviews — everything stays
                organized in one place.
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

              {[
                {
                  step: "01",
                  title: "Save jobs instantly",
                  desc: "Save jobs from LinkedIn, Indeed, or company websites with a single click using FlashFire.",
                },
                {
                  step: "02",
                  title: "Organize by status",
                  desc: "Categorize jobs as Wishlist, Applied, Interview, or Offer so nothing slips through.",
                },
                {
                  step: "03",
                  title: "Track progress",
                  desc: "Visual insights show how many applications convert into interviews and offers.",
                },
                {
                  step: "04",
                  title: "Manage recruiters",
                  desc: "Store recruiter contacts, notes, and follow-ups linked to each application.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#fff7f2] border border-[#ffd6c4] rounded-2xl p-1 hover:-translate-y-1 transition"
                >
                    <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#ff4c00] text-white font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0b1220]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[#5b6475] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ================= WHO IS THIS FOR ================= */}
        <section className="relative py-16 sm:py-24 lg:py-32 bg-[#fff7f2] overflow-hidden">

          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] bg-[#ffe2d4] rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 w-[160px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[320px] lg:h-[320px] bg-[#ffd6c4] rounded-full blur-3xl opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

            {/* ===== Header ===== */}
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-24">
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#ff4c00]">
                <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                WHO THIS IS BUILT FOR
              </span>

              <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0b1220] leading-tight">
                Built for Job Seekers Who <br className="hidden sm:block" />
                <span className="text-[#ff4c00]">Track Everything</span>
              </h2>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#5b6475] max-w-2xl mx-auto px-1">
                FlashFire’s Job Tracker is built for candidates who want clarity,
                structure, and momentum — not scattered notes and missed follow-ups.
              </p>
            </div>

            {/* ===== Main Content ===== */}
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-start">

              {/* LEFT — Capability Panels (CENTERED) */}
              <div className="flex flex-col  mt-8 space-y-8">

                {[
                  {
                    title: "Complete Application Visibility",
                    desc: "View every job you’ve saved, applied to, interviewed for, or followed up on — all in one organized system."
                  },
                  {
                    title: "Never Miss a Follow-Up",
                    desc: "Track recruiter conversations, interview timelines, reminders, and next steps without manual effort."
                  },
                  {
                    title: "Actionable Search Insights",
                    desc: "Understand which roles progress and which stall, so you can focus on applications that actually convert."
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group bg-white/80 backdrop-blur rounded-2xl border border-[#ffd6c4]
                     p-8 shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                     hover:shadow-[0_28px_60px_rgba(0,0,0,0.12)]
                     transition-shadow
                     max-w-xl w-full text-center"
                  >
                    <h3 className="text-xl font-extrabold text-[#0b1220] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#5b6475] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}

              </div>

              {/* RIGHT — Persona Stack */}
              <div className="space-y-6">

                {[
                  {
                    title: "High-Volume Applicants",
                    desc: "People applying to many roles who need a reliable system to track statuses and outcomes."
                  },
                  {
                    title: "International Job Seekers",
                    desc: "Candidates managing regions, visa considerations, and longer interview cycles."
                  },
                  {
                    title: "Career Switchers",
                    desc: "Professionals testing multiple roles or industries to identify what converts."
                  },
                  {
                    title: "Process-Driven Candidates",
                    desc: "Job seekers who optimize their search using structure and data — not guesswork."
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative bg-[#fff1ea] rounded-2xl border border-[#ffd6c4] p-7"
                  >
                    {/* Accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4c00] rounded-l-2xl" />

                    <h4 className="text-lg font-extrabold text-[#0b1220]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-[#5b6475] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-hidden">
            {/* ===== Heading ===== */}
            <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0b1220]">
                How to Use FlashFire’s <br />
                <span className="text-[#ff4c00]">Job Application Tracker</span>
              </h2>
            </div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {/* ================= ROW 1 ================= */}
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    SAVE JOBS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Save Jobs <span className="text-[#ff4c00]">Effortlessly</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Use the browser extension to save job postings directly from any website.
                    No spreadsheets, no copying links.
                  </p>


                </div>

                {/* Right visual */}
                <div className="relative min-w-0">
                  <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#ffd6c4] shadow-sm p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/3 space-y-2 min-w-0">
                          {["LinkedIn", "Wellfound", "Google", "Indeed", "Others"].map((x) => (
                            <div
                              key={x}
                              className="bg-[#fff1ea] border border-[#ffd6c4] text-xs font-semibold text-[#0b1220] rounded-full px-3 py-2"
                            >
                              {x}
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 border border-[#ffd6c4] rounded-xl p-4">
                          <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
                          <div className="h-3 w-44 bg-gray-200 rounded mb-5" />
                          <div className="h-16 bg-[#fff1ea] rounded-lg border border-[#ffd6c4]" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 2 ================= */}
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
                {/* Left visual */}
                <div className="relative order-2 lg:order-1 min-w-0">
                  <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#fff7f2] to-[#fff1ea] border border-[#ffd6c4] p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#ffd6c4] shadow-sm p-4 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {["Wishlist", "Applied", "Interview"].map((t) => (
                          <div key={t} className="bg-[#fff1ea] border border-[#ffd6c4] rounded-xl p-3">
                            <div className="flex justify-between text-xs font-semibold text-[#0b1220] mb-2">
                              <span>{t}</span>
                              <span>0{t === "Wishlist" ? 9 : t === "Applied" ? 5 : 2}</span>
                            </div>
                            <div className="space-y-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="h-9 bg-white border border-[#ffd6c4] rounded-lg" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right text */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    ORGANIZE APPLICATIONS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Organize Your <span className="text-[#ff4c00]">Applications</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Label and categorize saved applications with statuses, tags, and notes
                    so your job search stays structured.
                  </p>


                </div>
              </div>

              {/* ================= ROW 3 ================= */}
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    JOB INSIGHTS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Analyze <span className="text-[#ff4c00]">Your Progress</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Track trends, see conversion from applied → interview → offer,
                    and improve what’s working to land interviews faster.
                  </p>


                </div>

                {/* Right visual */}
                <div className="relative min-w-0">
                  <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#ffd6c4] shadow-sm p-4 sm:p-6">
                      <div className="text-sm font-semibold text-[#0b1220] mb-4">
                        Job Search Summary ✨
                      </div>

                      {/* simple "flow" mock */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Applied</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/20" />
                          <div className="w-10 text-xs text-[#5b6475]">50</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Interview</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/15" />
                          <div className="w-10 text-xs text-[#5b6475]">8</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Accepted</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/10" />
                          <div className="w-10 text-xs text-[#5b6475]">2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Rejected</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/10" />
                          <div className="w-10 text-xs text-[#5b6475]">15</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 4 ================= */}
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
                {/* Left visual */}
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#fff7f2] to-[#fff1ea] border border-[#ffd6c4] p-4 sm:p-6 lg:p-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-[#ffd6c4] shadow-sm p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/3 space-y-2 min-w-0">
                          {["Notes", "Contacts", "Docs", "History"].map((t) => (
                            <div
                              key={t}
                              className="bg-[#fff1ea] border border-[#ffd6c4] rounded-full px-3 py-2 text-xs font-semibold text-[#0b1220]"
                            >
                              {t}
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 border border-[#ffd6c4] rounded-xl p-4">
                          <div className="text-sm font-semibold text-[#0b1220] mb-3">
                            Manage Contact
                          </div>
                          <div className="h-10 bg-gray-100 rounded-lg mb-3" />
                          <div className="h-16 bg-[#fff1ea] border border-[#ffd6c4] rounded-lg" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right text */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    TRACK CONTACTS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Manage Contacts <span className="text-[#ff4c00]">and Interviews</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Store recruiter details, referrals, and interview notes for every
                    application so you’re always ready.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
      <Footer />
    </>
  );
}

