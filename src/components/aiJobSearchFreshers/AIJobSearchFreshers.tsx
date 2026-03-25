"use client";

import { GraduationCap, Search, Target, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobSearchFreshersPage() {
  const ctaLabel = "Get Started";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);


  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* HERO - Asymmetric Layout with Soft Gradients */}
        <section className="relative overflow-hidden">
          {/* Soft background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ff4c00]/8 via-[#ff4c00]/4 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#ff4c00]/6 to-transparent rounded-full translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* LEFT - Content takes 7 columns */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00] mb-6">
                  <GraduationCap className="h-4 w-4" />
                  AI Job Search Platform for Freshers
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                  Your first job
                  <span className="block text-[#ff4c00] mt-2">shouldn&apos;t be a guessing game</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Flashfire helps fresh graduates find roles that match their skills,
                  coursework, and interests—without needing years of experience.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
                  {[
                    { icon: GraduationCap, text: "Built for students and recent graduates" },
                    { icon: Search, text: "Find entry‑level and internship roles faster" },
                    { icon: Target, text: "Match to roles where you&apos;re actually a fit" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/60">
                      <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", ctaLabel)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e04400] border border-[#ff4c00] hover:border-[#e04400]"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-slate-500">Free for students</span>
                </div>
              </div>

              {/* RIGHT - Preview Card takes 5 columns */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Decorative dots pattern */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 opacity-30">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#ff4c00" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#dots)" />
                    </svg>
                  </div>

                  <div className="rounded-3xl border border-[#ff4c00]/20 bg-white p-6 shadow-xl shadow-[#ff4c00]/5 relative">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/30"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/20"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/10"></div>
                      <span className="ml-auto text-xs text-slate-400 font-medium">Profile Match</span>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-5 space-y-4 text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-[#ff4c00]" />
                        <span className="font-semibold text-slate-900">B.Tech CS • 0–1 years</span>
                      </div>
                      <p className="leading-relaxed">
                        Skills: React, JavaScript, HTML/CSS, Data Structures, basic Git, problem solving,
                        and hands‑on project experience from internships or college work.
                      </p>
                      <div className="pt-3 border-t border-[#ffd6c2] flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                        <p className="text-slate-600">
                          <span className="font-medium text-slate-900">Recommended roles:</span> Frontend Intern, Junior Web Developer, Graduate Engineer, Product Trainee, Associate Software Engineer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY - Modern Pills Layout */}
        <section className="bg-white py-8 md:py-12 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 text-center">
              <p className="text-sm font-semibold text-[#ff4c00] uppercase tracking-wider">Trusted by thousands</p>
              <div className="h-px w-12 bg-[#ff4c00]/20 hidden md:block"></div>
              <p className="text-base text-slate-600">
                Thousands of profiles created • Millions of listings analyzed • Faster job discovery
              </p>
            </div>
          </div>
        </section>

        {/* WHY TRADITIONAL PORTALS DON'T WORK - Bento Grid Layout */}
        <section className="bg-[#fff7f2] py-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>

          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Why Traditional Job Portals Don&apos;t Work Well for <span className="text-[#ff4c00]">Freshers</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Most job boards are built for experienced candidates.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Problems Grid */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Common Frustrations</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Irrelevant job listings",
                    "Confusing filters",
                    "Experience-heavy roles",
                    "Endless manual searching",
                    "Low response rates",
                    "Application burnout",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-[#fff7f2]/50 border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain Points Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#fffaf7] to-white rounded-3xl border border-[#ff4c00]/15 p-8">
                <div className="w-12 h-12 rounded-2xl bg-[#ff4c00]/10 flex items-center justify-center mb-5">
                  <span className="text-2xl">😤</span>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="font-semibold text-slate-900">Tired of applying to 100+ jobs with no replies?</p>
                  <p className="font-semibold text-slate-900">Frustrated seeing &quot;2–5 years experience required&quot;?</p>
                </div>
                <p className="text-slate-600 mb-4">
                  Finding relevant jobs for fresh graduates becomes slow, stressful, and unpredictable.
                </p>
                <p className="font-semibold text-[#ff4c00] mb-4">
                  Our intelligent platform eliminates this friction.
                </p>
                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", "Create Profile")}
                  className="text-base font-semibold text-[#ff4c00] hover:text-[#e24400] flex items-center gap-1"
                >
                  Create Profile <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS - Bento Grid Cards */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  num: "01",
                  title: "Find Relevant Jobs Faster",
                  desc: "No more sorting through senior-level roles.",
                },
                {
                  num: "02",
                  title: "Get Personalized Job Matches",
                  desc: "Powered by skills-based job recommendations.",
                },
                {
                  num: "03",
                  title: "Eliminate Job Search Confusion",
                  desc: "Clear, structured job discovery.",
                },
                {
                  num: "04",
                  title: "Apply Instantly",
                  desc: "One-click applications.",
                },
                {
                  num: "05",
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  num: "06",
                  title: "Discover Internships & Graduate Roles",
                  desc: "Ideal for internships and jobs for freshers.",
                },
                {
                  num: "07",
                  title: "Access Curated Listings",
                  desc: "From best job sites for freshers.",
                },
                {
                  num: "08",
                  title: "Receive Intelligent Career Guidance",
                  desc: "Career guidance for freshers.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#fffaf7] to-white p-6 hover:border-[#ff4c00]/30 hover:shadow-lg hover:shadow-[#ff4c00]/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ff4c00]/10 border border-[#ff4c00]/20 flex items-center justify-center mb-4">
                    <span className="text-[#ff4c00] font-bold text-sm">{item.num}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Connected Timeline */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Job Search Platform Works</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Finding your first job becomes simple, guided, and efficient.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Create Your Career Profile",
                    desc: "Add your:",
                    bullets: [
                      "Education details",
                      "Skills & certifications",
                      "Internship or project experience",
                      "Preferred roles & locations",
                    ],
                    note: "Designed specifically for fresh graduates.",
                  },
                  {
                    step: "2",
                    title: "AI Analyzes Your Resume",
                    desc: "Our engine extracts:",
                    bullets: [
                      "Skills",
                      "Strengths",
                      "Career alignment signals",
                    ],
                    note: "Automatically identifying relevant fresh graduate jobs.",
                  },
                  {
                    step: "3",
                    title: "Smart Job Matching Algorithm",
                    desc: "Receive instant:",
                    bullets: [
                      "Personalized job recommendations",
                      "Relevant jobs for fresh graduates",
                      "Filtered remote job listings for freshers",
                    ],
                    note: "No manual keyword searching.",
                    cta: "Start Matching",
                  },
                  {
                    step: "4",
                    title: "Optimized Job Applications",
                    desc: "Apply faster using:",
                    bullets: [
                      "One-click apply",
                      "Auto-filled applications",
                      "AI-generated cover letters",
                      "Structured application workflow",
                    ],
                  },
                  {
                    step: "5",
                    title: "Apply Faster & Track Progress",
                    desc: "",
                    bullets: [
                      "Application status tracking",
                      "Interview updates",
                      "Smart job alerts for fresh graduates",
                    ],
                  },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className="relative pl-16 md:pl-20"
                  >
                    {/* Step Number */}
                    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#ff4c00] text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-[#ff4c00]/20 border-4 border-[#fff7f2]">
                      {item.step}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      {item.desc && <p className="text-base text-slate-600 mb-4">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                          {item.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-center gap-2 bg-[#fff7f2] rounded-lg px-3 py-2.5 border border-[#ff4c00]/10">
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4c00] bg-[#fff7f2] px-4 py-2 rounded-lg border border-[#ff4c00]/10">
                          <Sparkles className="h-4 w-4" />
                          {item.note}
                        </div>
                      )}
                      {item.cta && (
                        <button
                          type="button"
                          onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", item.cta)}
                          className="mt-3 text-base font-semibold text-[#ff4c00] hover:text-[#e24400] flex items-center gap-1"
                        >
                          {item.cta} <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS - Feature Grid */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Results
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Why This <span className="text-[#ff4c00]">Fresher Job Search Platform</span> Delivers Better Results
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Traditional portals show listings. We deliver precision & direction. Real-time job discovery from leading online job search platforms and job portals for fresh graduates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[
                "Get matched only with relevant entry-level jobs",
                "Avoid experience-heavy mismatches",
                "Reduce wasted applications",
                "Improve interview probability",
                "Gain clarity & confidence",
                 "Find entry-level roles faster",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[#fffaf7] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#fffaf7] to-white rounded-3xl border border-[#ff4c00]/15 p-8">
              <p className="font-semibold text-slate-900 mb-4 text-lg">Users typically experience:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Faster job discovery",
                  "Better job relevance",
                  "Reduced application fatigue",
                  "Improved recruiter response probability",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#ff4c00]"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES - Compact Card Grid */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Features Designed for <span className="text-[#ff4c00]">Early-Career Success</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "AI-Powered Job Recommendations",
                  desc: "Relevance-driven matching engine.",
                },
                {
                  title: "Entry-Level Job Filtering System",
                  desc: "Built exclusively for entry-level jobs and fresh graduate jobs.",
                },
                {
                  title: "Resume-Based Job Matching",
                  desc: "No guesswork. No manual sorting.",
                },
                {
                  title: "Smart Skill-Gap Analysis",
                  desc: "Know what skills help you land interviews faster.",
                },
                {
                  title: "Job Alerts for Fresh Graduates",
                  desc: "Never miss relevant opportunities.",
                },
                {
                  title: "One-Click Application Process",
                  desc: "Eliminate repetitive form filling.",
                },
                {
                  title: "Built-In Resume & Cover Letter Builder",
                  desc: "Everything in one ecosystem.",
                },
                {
                  title: "Interview Preparation Resources",
                  desc: "Boost confidence before interviews.",
                },
                {
                  title: "Cloud-Based Profile Storage",
                  desc: "Access anytime, anywhere.",
                },
                {
                  title: "Fast Job Discovery Experience",
                  desc: "Quickly find relevant jobs with a streamlined and efficient search experience.",
                },
                {
                  title: "Personalized Career Path Insights",
                  desc: "Discover the right roles based on your skills and goals.",
                },
                {
                  title: "AI Resume Optimization for Job Matching",
                  desc: "Improve resume relevance to match job requirements and increase interview chances.",
                },
                
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md hover:shadow-slate-200/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - Modern Card Style */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Comparison
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                <span className="text-[#ff4c00]">AI Job Search Platform</span> vs Traditional Job Portals
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-[#fff7f2] to-[#fff0e6]">
                    <th className="px-6 py-5 font-semibold text-slate-900 text-left">Feature</th>
                    <th className="px-6 py-5 font-semibold text-[#ff4c00] text-left">AI Job Search for Freshers</th>
                    <th className="px-6 py-5 font-semibold text-slate-500 text-left">Traditional Job Portals</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Job Recommendations",
                      ai: "Personalized with AI",
                      traditional: "Generic listings",
                    },
                    {
                      feature: "Skill Matching",
                      ai: "Resume-based matching",
                      traditional: "Manual filtering",
                    },
                    {
                      feature: "Application Speed",
                      ai: "One-click apply",
                      traditional: "Manual form filling",
                    },
                    {
                      feature: "Entry-Level Focus",
                      ai: "Designed for freshers",
                      traditional: "Mixed experience levels",
                    },
                    {
                      feature: "Alerts",
                      ai: "Smart job alerts",
                      traditional: "Basic notifications",
                    },
                    {
                      feature: "Optimization",
                      ai: "AI-based profile suggestions",
                      traditional: "No optimization",
                    },
                  ].map((row, idx) => (
                    <tr key={row.feature} className={idx % 2 === 0 ? "bg-white" : "bg-[#fffaf7]/50"}>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-6 py-4 text-slate-700">
                        <span className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-[#ff4c00]" />
                          </div>
                          {row.ai}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-base text-slate-600">
              Modern career discovery requires smarter systems.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS - Tag Cloud Style */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Audience
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">AI Job Search Platform</span>?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "College students about to graduate",
                "Entry-level professionals",
                "Career starters with internships only",
                "Career switchers",
                "Remote job seekers",
                "International applicants",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-slate-700 font-medium shadow-sm hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Split Layout */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* LEFT CONTENT */}
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                  Get Started
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Find <span className="text-[#ff4c00]">Entry-Level Jobs</span> Faster with AI
                </h2>

                <p className="text-lg text-slate-600 mb-6">
                  Don&apos;t let your first opportunity take months of guessing. Discover relevant entry-level jobs, access smarter jobs for fresh graduates, apply faster, reduce job search stress, and gain career clarity.
                </p>

                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", ctaLabel)}
                  className="inline-flex items-center gap-2 bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[#ff4c00]/20 hover:shadow-xl hover:shadow-[#ff4c00]/30"
                >
                  {ctaLabel}
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> Instant setup
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> No experience required
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> Secure & private
                  </span>
                </div>
              </div>

              {/* RIGHT FEATURE PANEL */}
              <div className="bg-gradient-to-br from-[#fffaf7] to-white rounded-3xl border border-[#ff4c00]/15 p-8 shadow-xl shadow-[#ff4c00]/5">
                <div className="space-y-5">
                  {[
                    "Discover relevant entry-level jobs",
                    "Apply faster with AI assistance",
                    "Track your application progress",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ff4c00]/20 to-[#ff4c00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-[#ff4c00]" />
                      </div>
                      <p className="font-semibold text-slate-900 text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="bg-[#f9e8e0] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
              {[
                {
                  q: "What is an AI job search for freshers?",
                  a: "An AI job search for freshers uses intelligent algorithms to match fresh graduates with relevant entry-level roles.",
                },
                {
                  q: "How does the fresher job search platform work?",
                  a: "Our fresher job search platform analyzes your profile, resume, and preferences to deliver targeted job matches.",
                },
                {
                  q: "Is this platform suitable for fresh graduates with no experience?",
                  a: "Yes. Designed specifically for early-career candidates.",
                },
                {
                  q: "How accurate are AI job recommendations?",
                  a: "Accuracy improves continuously using skills-based matching.",
                },
                {
                  q: "Can I find jobs from multiple job portals?",
                  a: "Yes. We scan leading job portals for fresh graduates.",
                },
                {
                  q: "Does the platform support internships?",
                  a: "Yes. Ideal for internships and jobs for freshers.",
                },
                {
                  q: "Can I receive job alerts?",
                  a: "Yes. Smart job alerts for fresh graduates are included.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy and security are core priorities.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-b border-slate-100 last:border-b-0 ${
                    activeFaqIndex === i ? "bg-[#fff7f3]" : "bg-white"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fff7f3]/50"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-lg pr-4 ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className={`text-[#ff4c00] shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${activeFaqIndex === i ? "bg-[#ff4c00]/10 border-[#ff4c00]/20" : "border-slate-200"}`}>
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-6 pb-6 text-slate-600">
                      <p className="leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}