"use client";

import { Globe2, Laptop, Wifi, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* HERO SECTION - Split Layout with Glassmorphism */}
        <section className="bg-gradient-to-br from-[#fff0e6] via-[#fff7f2] to-white min-h-[85vh] flex items-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#ff4c00]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ff4c00]/3 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left Content - 3 columns */}
              <div className="lg:col-span-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#ff4c00]/20 px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#ff4c00] animate-pulse" />
                  <span className="text-sm font-semibold text-[#ff4c00]">
                    AI Remote Job Search Platform
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  Find remote roles
                  <span className="block text-[#ff4c00] mt-2">that match your time zone and skills</span>
                </h1>
                
                <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
                  Flashfire surfaces high‑quality remote opportunities across global markets,
                  filtered by your location, experience level, and salary expectations.
                </p>

                <div className="mt-8 grid sm:grid-cols-1 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#ff4c00]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] shadow-lg shadow-[#ff4c00]/20">
                      <Globe2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Global Markets</span>
                      <span className="text-sm text-slate-600">Remote roles across US, Canada, and global markets</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#ff4c00]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] shadow-lg shadow-[#ff4c00]/20">
                      <Laptop className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Tech & Business</span>
                      <span className="text-sm text-slate-600">Tech, product, and business roles that support remote work</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#ff4c00]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] shadow-lg shadow-[#ff4c00]/20">
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block">Time Zone Match</span>
                      <span className="text-sm text-slate-600">Filtered by time zone and work‑overlap preferences</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                    className="group inline-flex items-center rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#ff4c00]/30 hover:bg-[#e24400] hover:shadow-2xl hover:shadow-[#ff4c00]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00] transition-all duration-200"
                  >
                    {ctaLabel}
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Content - 2 columns - Floating Job Cards */}
              <div className="lg:col-span-2 relative">
                <div className="relative">
                  {/* Main Card */}
                  <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 p-6 shadow-2xl shadow-slate-200/50 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-[#ff4c00] uppercase tracking-wider">
                        Remote job highlights
                      </p>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        Live
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="rounded-xl bg-gradient-to-r from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:border-[#ff4c00]/50 transition-colors cursor-pointer">
                        <div>
                          <p className="font-bold text-slate-900">Senior Frontend Engineer</p>
                          <p className="text-xs text-slate-500 mt-1">US‑based • Fully Remote • EST overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff4c00]/10 text-xs font-semibold text-[#ff4c00] self-start sm:self-auto">
                          <MapPin className="h-3 w-3" />
                          High Match
                        </span>
                      </div>
                      
                      <div className="rounded-xl bg-gradient-to-r from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:border-[#ff4c00]/50 transition-colors cursor-pointer">
                        <div>
                          <p className="font-bold text-slate-900">Product Designer</p>
                          <p className="text-xs text-slate-500 mt-1">Canada • Remote Friendly • PST overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-xs font-semibold text-blue-600 self-start sm:self-auto">
                          <MapPin className="h-3 w-3" />
                          Time‑zone Fit
                        </span>
                      </div>
                      
                      <div className="rounded-xl bg-gradient-to-r from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:border-[#ff4c00]/50 transition-colors cursor-pointer">
                        <div>
                          <p className="font-bold text-slate-900">DevOps Engineer</p>
                          <p className="text-xs text-slate-500 mt-1">Europe • Fully Remote • CET overlap</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-xs font-semibold text-purple-600 self-start sm:self-auto">
                          <MapPin className="h-3 w-3" />
                          New
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-4 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                      These are examples of how Flashfire prioritizes remote roles that not only match
                      your skills, but also work with your schedule and region.
                    </p>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-xl border border-slate-100 z-20 hidden sm:block">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">2,500+</p>
                        <p className="text-[10px] text-slate-500">Active Jobs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY - Minimal Bar */}
        <section className="bg-white py-6 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4c00]/20 to-[#ff4c00]/5 border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">Trusted by remote professionals worldwide</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-sm text-slate-600">Used across industries • Leading remote job boards • Modern remote work careers</span>
            </div>
          </div>
        </section>

        {/* WHY REMOTE JOB SEARCHING FEELS FRUSTRATING - Bento Grid */}
        <section className="bg-[#fff7f2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                The Problem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Why Remote Job Searching Feels <span className="text-[#ff4c00]">Frustrating</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Searching manually across multiple online job search platforms is exhausting.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { title: "Irrelevant listings", desc: "Wasting time on mismatched roles", icon: "❌" },
                { title: "Endless filtering", desc: "Hours spent on manual searches", icon: "🔍" },
                { title: "Location restrictions", desc: "Geographic barriers limit options", icon: "🌍" },
                { title: "Time-zone mismatches", desc: "Scheduling conflicts with teams", icon: "⏰" },
                { title: "Low recruiter response rates", desc: "Applications go unanswered", icon: "📧" },
                { title: "Application burnout", desc: "Repetitive forms drain energy", icon: "😫" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#ff4c00]/30 hover:shadow-lg hover:shadow-[#ff4c00]/5 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution Card */}
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] p-1 shadow-xl shadow-[#ff4c00]/20">
                <div className="rounded-xl bg-white p-6 sm:p-8">
                  <div className="space-y-3 mb-6">
                    <p className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">?</span>
                      Tired of applying and getting ghosted?
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">?</span>
                      Overwhelmed, juggling multiple remote job boards?
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">?</span>
                      Unsure which roles truly fit your skills?
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-base sm:text-lg font-bold text-[#ff4c00] flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Our intelligent platform eliminates this friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Vertical Timeline */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                The Process
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                How Our <span className="text-[#ff4c00]">AI Remote Job Finder Works</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Finding the right remote role should feel simple — and now it is.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/50 to-[#ff4c00]/20" />
                
                {[
                  {
                    step: "1",
                    title: "Create Your Profile",
                    desc: "Tell us about yourself.",
                    bullets: [
                      "Add skills, education & experience",
                      "Specify preferred time zones",
                      "Select remote work type:",
                      "• Full-time",
                      "• Freelance",
                      "• Contract",
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
                      "Our AI remote job finder scans thousands of telecommute job listings from leading remote job boards.",
                      "Precision remote job matching",
                      "Personalized work from home jobs, AI recommendations",
                      "Intelligent filtering by:",
                      "• Country",
                      "• Salary",
                      "• Timezone",
                      "• Industry",
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
                      "No repetitive forms",
                      "No manual re-entry",
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
                  <div key={item.step} className="relative pl-12 sm:pl-20 pb-8 sm:pb-12 last:pb-0">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 sm:left-4 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-[#ff4c00]/30 z-10">
                      {item.step}
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-[#fffaf7] rounded-2xl p-5 sm:p-6 border border-[#ff4c00]/10 hover:border-[#ff4c00]/30 transition-colors">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">
                        {item.title}
                      </h3>
                      {item.desc && <p className="text-sm sm:text-base text-slate-600 mb-4">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid sm:grid-cols-2 gap-2">
                          {item.bullets.map((bullet, i) => (
                            <div key={i} className={`flex items-center gap-2 ${bullet.startsWith('•') ? 'pl-4' : ''}`}>
                              {!bullet.startsWith('•') && (
                                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]" />
                              )}
                              <span className={`text-sm sm:text-base ${bullet.startsWith('•') ? 'text-slate-500' : 'text-slate-700'}`}>
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="mt-4 pt-4 border-t border-[#ff4c00]/10">
                          <p className="text-sm font-semibold text-[#ff4c00] flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            {item.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS - Feature Cards */}
        <section className="bg-[#fff7f2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                The Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Why This <span className="text-[#ff4c00]">AI Remote Job Finder</span> Delivers Better Results
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Traditional job boards show listings. We deliver precision & efficiency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { title: "Eliminate irrelevant applications", icon: "🎯" },
                { title: "Reduce wasted browsing time", icon: "⚡" },
                { title: "Improve resume-job alignment", icon: "📄" },
                { title: "Discover better-fit opportunities", icon: "✨" },
                { title: "Apply faster than competitors", icon: "🚀" },
                { title: "Make data-driven job search decisions", icon: "📊" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 hover:border-[#ff4c00]/30 hover:shadow-lg transition-all flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-900 mb-4 text-lg">Users typically experience:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Faster job discovery",
                    "Better job relevance",
                    "Reduced application fatigue",
                    "Improved response probability",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#fffaf7]">
                      <CheckCircle2 className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS - Numbered Grid */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Save Hours of Manual Searching",
                  desc: "Automation replaces endless browsing.",
                },
                {
                  num: "02",
                  title: "Discover Verified Global Remote Jobs",
                  desc: "Curated listings worldwide.",
                },
                {
                  num: "03",
                  title: "Apply Faster Than Other Candidates",
                  desc: "Early-application advantage.",
                },
                {
                  num: "04",
                  title: "Eliminate Guesswork & Filtering Fatigue",
                  desc: "Precision AI matching.",
                },
                {
                  num: "05",
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  num: "06",
                  title: "Build Smarter Remote Work Careers",
                  desc: "Long-term career growth support.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group relative bg-[#fffaf7] rounded-2xl p-6 border border-transparent hover:border-[#ff4c00]/20 hover:bg-white hover:shadow-xl transition-all duration-200"
                >
                  <span className="absolute top-4 right-4 text-4xl font-black text-[#ff4c00]/10 group-hover:text-[#ff4c00]/20 transition-colors">
                    {item.num}
                  </span>
                  <div className="relative">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 pr-8">{item.title}</h3>
                    {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES - Tag Cloud Style */}
        <section className="bg-[#fff7f2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                Features
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Key Features Designed for <span className="text-[#ff4c00]">Remote Job Efficiency</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { title: "AI-Powered Remote Job Matching", desc: "No manual keyword filtering", featured: true },
                { title: "Verified Global Remote Jobs Database", featured: false },
                { title: "Real-Time Remote Job Alerts", featured: false },
                { title: "Resume-Based Job Recommendations", featured: false },
                { title: "Skill-Gap Analysis for Remote Roles", featured: false },
                { title: "Time-Zone-Based Job Filtering", featured: false },
                { title: "Built-In Resume & Cover Letter Builder", featured: false },
                { title: "Application Tracking Dashboard", featured: false },
                { title: "Fast Job Discovery Experience", featured: false },
                { title: "Supports part-time and full-time remote jobs", featured: false },
                { title: "Works across multiple industries", featured: false },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`group rounded-xl px-5 py-3 border transition-all duration-200 cursor-default ${
                    item.featured 
                      ? 'bg-[#ff4c00] text-white border-[#ff4c00] shadow-lg shadow-[#ff4c00]/30' 
                      : 'bg-white border-slate-200 hover:border-[#ff4c00]/50 hover:shadow-md'
                  }`}
                >
                  <p className={`font-semibold text-sm sm:text-base ${item.featured ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className={`text-xs mt-1 ${item.featured ? 'text-white/80' : 'text-slate-500'}`}>
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - Modern Cards */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="text-[#ff4c00]">AI Remote Job Finder</span> vs Traditional Job Boards
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-[#fff7f2] rounded-2xl p-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 gap-px bg-slate-100">
                    {/* Header */}
                    <div className="bg-[#fff7f2] p-4 sm:p-6 font-bold text-slate-900 text-sm sm:text-base">Feature</div>
                    <div className="bg-[#ff4c00] p-4 sm:p-6 font-bold text-white text-sm sm:text-base text-center">AI Remote Job Finder</div>
                    <div className="bg-slate-100 p-4 sm:p-6 font-bold text-slate-700 text-sm sm:text-base text-center">Traditional Job Boards</div>
                    
                    {/* Rows */}
                    {[
                      { feature: "Job Matching", ai: "AI-based remote job matching", traditional: "Manual search" },
                      { feature: "Personalization", ai: "Resume-based recommendations", traditional: "Generic listings" },
                      { feature: "Global Access", ai: "Verified global remote jobs", traditional: "Limited filtering" },
                      { feature: "Application Speed", ai: "One-click apply", traditional: "Manual forms" },
                      { feature: "Alerts", ai: "Smart real-time alerts", traditional: "Basic notifications" },
                      { feature: "Optimization", ai: "AI improvement insights", traditional: "Not available" },
                    ].map((row, i) => (
                      <div key={i} className="contents">
                        <div className="bg-white p-4 sm:p-6 font-medium text-slate-900 text-sm sm:text-base border-b border-slate-50">{row.feature}</div>
                        <div className="bg-[#fffaf7] p-4 sm:p-6 text-[#ff4c00] font-semibold text-sm sm:text-base text-center border-b border-[#ff4c00]/5">{row.ai}</div>
                        <div className="bg-white p-4 sm:p-6 text-slate-500 text-sm sm:text-base text-center border-b border-slate-50">{row.traditional}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="mt-6 text-center text-sm sm:text-base text-slate-600">
                Modern remote job search requires intelligent systems.
              </p>
            </div>
          </div>
        </section>

        {/* WHO CAN USE THIS - Tag Pills */}
        <section className="bg-[#fff7f2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                For Everyone
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
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
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm border border-slate-100 hover:border-[#ff4c00]/30 hover:text-[#ff4c00] transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Gradient Card */}
        <section className="bg-gradient-to-b from-white to-[#fff7f2] py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-[#ff4c00]/20 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                  Find <span className="text-white/90">Global Remote Jobs</span> Smarter with AI
                </h2>
                <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Stop manually juggling multiple remote job boards. Simplify your remote job search, get precision matching, discover verified global remote jobs, apply faster, and reduce job search stress.
                </p>
                <button
                  type="button"
                  onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                  className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-base font-bold text-[#ff4c00] shadow-xl hover:bg-slate-50 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                >
                  {ctaLabel}
                  <ArrowRight size={20} className="ml-2" />
                </button>
                <p className="mt-6 text-sm text-white/80">
                  Instant setup • No complex learning curve • Secure & private
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-[#fff7f2] rounded-2xl p-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
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
                      activeFaqIndex === i ? "bg-[#fffaf7]" : "bg-white"
                    }`}
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#fffaf7] transition-colors"
                      onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                    >
                      <span className={`font-bold text-base sm:text-lg pr-4 ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                        {item.q}
                      </span>
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        activeFaqIndex === i ? "bg-[#ff4c00] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {activeFaqIndex === i ? <FaTimes size={14} /> : <FaPlus size={14} />}
                      </span>
                    </button>
                    {activeFaqIndex === i && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}