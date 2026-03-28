"use client";

import { Globe2, Laptop, Wifi, MapPin, CheckCircle2, ArrowRight, Clock, Shield, Zap, Target, Users, Briefcase } from "lucide-react";
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

export default function AIRemoteJobSearchPage() {
  const ctaLabel = "Get Started";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <main className="mt-0">

        {/* Hero Section - Split Layout with Floating Cards */}
        <section className="relative bg-gradient-to-br from-[#fff7f2] via-white to-[#fff0e6] py-16 md:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#ff4c00_0%,_transparent_60%)]"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold shadow-sm">
                  <Globe2 className="w-4 h-4" />
                  AI Remote Job Search Platform
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-6">
                  Find remote roles
                  <span className="block text-[#ff4c00] mt-2">that match your time zone and skills</span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
                  Flashfire surfaces high‑quality remote opportunities across global markets,
                  filtered by your location, experience level, and salary expectations.
                </p>

                {/* Feature List */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Globe2, text: "Remote roles across US, Canada, and global markets" },
                    { icon: Laptop, text: "Tech, product, and business roles that support remote work" },
                    { icon: Wifi, text: "Filtered by time zone and work‑overlap preferences" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-[#ff4c00]" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                  className="inline-flex items-center justify-center gap-2 bg-[#ff4c00] text-white px-8 py-4 rounded-xl text-base font-semibold shadow-lg hover:bg-[#e24400] transition-colors"
                >
                  {ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Content - Floating Job Cards */}
              <div className="hidden lg:block relative">
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="w-5 h-5 text-[#ff4c00]" />
                      <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Remote Job Highlights</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-[#fff7f2] to-white rounded-xl border border-[#ffd6c2] p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-slate-900">Senior Frontend Engineer</p>
                            <p className="text-xs text-slate-600 mt-1">US‑based • Fully Remote • EST overlap</p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-full">
                            <MapPin className="h-3 w-3" />
                            High Match
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#fff7f2] to-white rounded-xl border border-[#ffd6c2] p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-slate-900">Product Designer</p>
                            <p className="text-xs text-slate-600 mt-1">Canada • Remote Friendly • PST overlap</p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-full">
                            <MapPin className="h-3 w-3" />
                            Time‑zone Fit
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-[#fff7f2] to-white rounded-xl border border-[#ffd6c2] p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-slate-900">DevOps Engineer</p>
                            <p className="text-xs text-slate-600 mt-1">Global • Remote First • Flexible hours</p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-full">
                            <Zap className="h-3 w-3" />
                            New
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                      These are examples of how Flashfire prioritizes remote roles that not only match
                      your skills, but also work with your schedule and region.
                    </p>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <Globe2 className="w-4 h-4 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">50+ Countries</p>
                        <p className="text-[10px] text-slate-500">Global Coverage</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Real-time</p>
                        <p className="text-[10px] text-slate-500">Job Alerts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By - Clean Bar */}
        <section className="bg-white py-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ff4c00]" />
                <span className="font-semibold text-slate-900">Trusted by remote professionals worldwide</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
              <p className="text-sm text-slate-600">
                Used across industries • Leading remote job boards • Modern remote work careers
              </p>
            </div>
          </div>
        </section>

        {/* Why Remote Job Searching Feels Frustrating - Bento Grid */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Why Remote Job Searching Feels <span className="text-[#ff4c00]">Frustrating</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Searching manually across multiple online job search platforms is exhausting.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                "Irrelevant listings",
                "Endless filtering",
                "Location restrictions",
                "Time-zone mismatches",
                "Low recruiter response rates",
                "Application burnout",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ff4c00] font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border-l-4 border-[#ff4c00] shadow-sm">
              <div className="space-y-3 mb-4">
                <p className="text-base font-semibold text-slate-900">Tired of applying and getting ghosted?</p>
                <p className="text-base font-semibold text-slate-900">Overwhelmed, juggling multiple remote job boards?</p>
                <p className="text-base font-semibold text-slate-900">Unsure which roles truly fit your skills?</p>
              </div>
              <p className="text-base font-semibold text-[#ff4c00] pt-4 border-t border-slate-100">
                Our intelligent platform eliminates this friction.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Remote Job Finder Works</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Finding the right remote role should feel simple — and now it is.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  desc: "Tell us about yourself.",
                  bullets: [
                    "Add skills, education & experience",
                    "Specify preferred time zones",
                    "Select remote work type: Full-time, Freelance, Contract",
                  ],
                  note: "Designed for professionals exploring remote work careers.",
                },
                {
                  step: "2",
                  title: "AI Resume & Skill Analysis",
                  desc: "Our AI engine evaluates your profile.",
                  bullets: [
                    "Identifies remote-ready roles",
                    "Extracts core competencies",
                    "Aligns experience with hiring demand",
                    "Detects virtual job opportunities",
                  ],
                },
                {
                  step: "3",
                  title: "Smart Remote Job Matching",
                  desc: "This is where automation changes everything.",
                  bullets: [
                    "Our AI remote job finder scans thousands of telecommute job listings",
                    "Precision remote job matching with personalized recommendations",
                    "Intelligent filtering by Country, Salary, Timezone, Industry",
                    "Discover relevant global remote jobs instantly",
                  ],
                },
                {
                  step: "4",
                  title: "Optimized Job Applications",
                  desc: "Apply faster with built-in AI tools.",
                  bullets: [
                    "Send personalized cover letters in seconds",
                    "Optimize your resume specifically for global remote jobs",
                    "Use a one-click apply workflow",
                    "No repetitive forms or manual re-entry",
                  ],
                },
                {
                  step: "5",
                  title: "Track & Optimize Your Applications",
                  desc: "Stay fully organized.",
                  bullets: [
                    "Remote job application tracker",
                    "Interview reminders",
                    "Smart remote job alerts",
                  ],
                },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Timeline connector */}
                  {index !== 4 && (
                    <div className="absolute left-6 top-20 w-0.5 h-8 bg-[#ff4c00]/20"></div>
                  )}

                  <div className="bg-[#fffaf7] rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {item.step}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                        {item.desc && <p className="text-sm sm:text-base text-slate-600 mb-4">{item.desc}</p>}

                        {item.bullets && (
                          <div className="grid sm:grid-cols-2 gap-2 mb-4">
                            {item.bullets.map((bullet, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
                                <span className="text-sm text-slate-700">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {item.note && (
                          <p className="text-sm font-semibold text-[#ff4c00] bg-white inline-block px-3 py-1 rounded-lg border border-[#ff4c00]/20">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Delivers Better Results */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Why This <span className="text-[#ff4c00]">AI Remote Job Finder</span> Delivers Better Results
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Traditional job boards show listings. We deliver precision & efficiency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                "Eliminate irrelevant applications",
                "Reduce wasted browsing time",
                "Improve resume-job alignment",
                "Discover better-fit opportunities",
                "Apply faster than competitors",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
              <p className="font-semibold mb-4 text-slate-900 text-lg">Users typically experience:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Faster job discovery",
                  "Better job relevance",
                  "Reduced application fatigue",
                  "Improved response probability",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                    <span className="text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits - Grid Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: "1",
                  title: "Save Hours of Manual Searching",
                  desc: "Automation replaces endless browsing.",
                },
                {
                  num: "2",
                  title: "Discover Verified Global Remote Jobs",
                  desc: "Curated listings worldwide.",
                },
                {
                  num: "3",
                  title: "Apply Faster Than Other Candidates",
                  desc: "Early-application advantage.",
                },
                {
                  num: "4",
                  title: "Eliminate Guesswork & Filtering Fatigue",
                  desc: "Precision AI matching.",
                },
                {
                  num: "5",
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  num: "6",
                  title: "Build Smarter Remote Work Careers",
                  desc: "",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-[#fffaf7] rounded-2xl p-6 border border-[#ff4c00]/10 hover:bg-[#fff7f2] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md">
                    {item.num}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features - Card Grid */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Key Features Designed for <span className="text-[#ff4c00]">Remote Job Efficiency</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "AI-Powered Remote Job Matching",
                "Verified Global Remote Jobs Database",
                "Real-Time Remote Job Alerts",
                "Resume-Based Job Recommendations",
                "Skill-Gap Analysis for Remote Roles",
                "Time-Zone-Based Job Filtering",
                "Built-In Resume & Cover Letter Builder",
                "Application Tracking Dashboard",
                "Fast Job Discovery Experience",
                "Supports part-time and full-time remote jobs",
                "Works across multiple industries",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-[#ff4c00]" />
                    </div>
                    <p className="font-medium text-slate-900 text-sm">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table - Enhanced */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                <span className="text-[#ff4c00]">AI Remote Job Finder</span> vs Traditional Job Boards
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-[#fff7f2] to-white">
                      <th className="text-left p-4 font-bold text-slate-900 text-sm sm:text-base w-1/3">Feature</th>
                      <th className="text-left p-4 font-bold text-[#ff4c00] text-sm sm:text-base w-1/3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          AI Remote Job Finder
                        </div>
                      </th>
                      <th className="text-left p-4 font-bold text-slate-500 text-sm sm:text-base w-1/3">Traditional Job Boards</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Job Matching",
                        ai: "AI-based remote job matching",
                        traditional: "Manual search",
                      },
                      {
                        feature: "Personalization",
                        ai: "Resume-based recommendations",
                        traditional: "Generic listings",
                      },
                      {
                        feature: "Global Access",
                        ai: "Verified global remote jobs",
                        traditional: "Limited filtering",
                      },
                      {
                        feature: "Application Speed",
                        ai: "One-click apply",
                        traditional: "Manual forms",
                      },
                      {
                        feature: "Alerts",
                        ai: "Smart real-time alerts",
                        traditional: "Basic notifications",
                      },
                      {
                        feature: "Optimization",
                        ai: "AI improvement insights",
                        traditional: "Not available",
                      },
                    ].map((row) => (
                      <tr key={row.feature} className="border-b border-slate-100 last:border-b-0">
                        <td className="p-4 font-semibold text-slate-700 text-sm sm:text-base">{row.feature}</td>
                        <td className="p-4 text-slate-700 text-sm sm:text-base">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                            {row.ai}
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 text-sm sm:text-base">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-sm sm:text-base text-slate-600 mt-6">
              Modern remote job search requires intelligent systems.
            </p>
          </div>
        </section>

        {/* Who Can Use This - Pills */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">AI Remote Job Finder</span>?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Remote job for beginners",
                "Freelancers",
                "Digital nomads",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "International applicants",
                "Professionals seeking work-from-home jobs",
                "Ideal for discovering virtual job opportunities",
              ].map((item) => (
                <span
                  key={item}
                  className="bg-white px-5 py-2.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Premium Card */}
        <section className="relative py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff4c00] rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ff4c00] rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/90 backdrop-blur-sm border border-slate-100 shadow-2xl rounded-3xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b33] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe2 className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                Find <span className="text-[#ff4c00]">Global Remote Jobs</span> Smarter with AI
              </h2>

              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Stop manually juggling multiple remote job boards. Simplify your remote job search, get precision matching, discover verified global remote jobs, apply faster, and reduce job search stress.
              </p>

              <button
                type="button"
                onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                className="inline-flex items-center justify-center gap-2 bg-[#ff4c00] text-white px-10 py-4 rounded-xl text-base font-semibold shadow-lg hover:bg-[#e24400] transition-colors"
              >
                {ctaLabel}
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="mt-6 text-sm text-slate-500 flex flex-wrap justify-center gap-4">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Instant setup
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> No complex learning curve
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Secure & private
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ - Clean Accordion */}
        <section className="py-16 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-slate-600">Everything you need to know about our AI remote job finder</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
              {[
                {
                  q: "What is an AI remote job finder?",
                  a: "An AI remote job finder uses intelligent algorithms to simplify and automate your remote job search.",
                },
                {
                  q: "How does remote job matching work?",
                  a: "Our engine analyzes your skills, resume, and preferences to deliver precision remote job matching.",
                },
                {
                  q: "Can I find global remote jobs?",
                  a: "Yes. Access thousands of verified global remote jobs worldwide.",
                },
                {
                  q: "Is this platform suitable for beginners?",
                  a: "Absolutely. No prior remote experience required.",
                },
                {
                  q: "How fast can I apply?",
                  a: "Apply instantly using our one-click workflow.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy & security are core priorities.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-b border-slate-100 last:border-b-0 ${
                    activeFaqIndex === i ? "bg-[#fff7f3]" : "bg-white"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#fff7f3] transition-colors"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-base sm:text-lg pr-4 ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className={`text-[#ff4c00] shrink-0 transition-transform ${activeFaqIndex === i ? "rotate-45" : ""}`}>
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base">
                      <p>{item.a}</p>
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