"use client";

import { GraduationCap, Search, Target, Sparkles, Award, ArrowRight, CheckCircle2, Users, FileText, Bell, Zap } from "lucide-react";
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
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[70vh] flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center rounded-full bg-[#ffe7d7] px-4 py-1 text-xs md:text-sm font-semibold text-[#ff4c00]">
                  AI Job Search Platform for Freshers
                </span>
                <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                  Your first job
                  <span className="block text-[#ff4c00]">shouldn&apos;t be a guessing game</span>
                </h1>
                <p className="mt-4 text-sm md:text-base text-slate-700">
                  Flashfire helps fresh graduates find roles that match their skills,
                  coursework, and interests—without needing years of experience.
                </p>

                <div className="mt-6 space-y-2 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#ff4c00]" />
                    <span>Built for students and recent graduates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-[#ff4c00]" />
                    <span>Find entry‑level and internship roles faster</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#ff4c00]" />
                    <span>Match to roles where you&apos;re actually a fit</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", ctaLabel)}
                    className="inline-flex items-center rounded-lg bg-[#ff4c00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e24400] transition"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-md">
                  <p className="text-xs font-semibold text-slate-800 mb-3">
                    Example fresher profile match
                  </p>
                  <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-5 space-y-3 text-xs text-slate-700">
                    <p className="font-semibold flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-[#ff4c00]" />
                      B.Tech CS • 0–1 years
                    </p>
                    <p>
                      Skills: React, JavaScript, HTML/CSS, Data Structures, basic Git, problem solving,
                      and hands‑on project experience from internships or college work.
                    </p>
                    <p className="flex items-center gap-1 text-slate-800">
                      <Sparkles className="h-3 w-3 text-[#ff4c00]" />
                      Recommended roles: Frontend Intern, Junior Web Developer, Graduate Engineer, Product Trainee,
                      Associate Software Engineer
                    </p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#ffe7d7] blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>
        {/* TRUSTED BY */}
        <section className="bg-white py-12 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-4">
                Trusted by Thousands of Fresh Graduates
              </p>
              <p className="text-lg text-slate-900 mb-5 font-semibold">
                Join a growing community of early-career professionals using our:{" "}
                <span className="text-[#ff4c00]">fresher job search platform</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#ff4c00]" />
                <span>Thousands of profiles created</span>
              </div>
              <span className="hidden md:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#ff4c00]" />
                <span>Millions of listings analyzed</span>
              </div>
              <span className="hidden md:inline text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#ff4c00]" />
                <span>Faster job discovery experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TRADITIONAL PORTALS DON'T WORK */}
        <section className="bg-[#fff7f2] py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Why Traditional Job Portals Don't Work Well for <span className="text-[#ff4c00]">Freshers</span>
              </h2>
              <p className="text-base text-slate-700">
                Most job boards are built for experienced candidates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {[
                "Irrelevant job listings",
                "Confusing filters",
                "Experience-heavy roles",
                "Endless manual searching",
                "Low response rates",
                "Application burnout",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-[#ff4c00]/20 p-5 text-sm text-slate-700">
              <p className="mb-2">
                <span className="font-semibold">Tired of applying to 100+ jobs with no replies?</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Frustrated seeing "2–5 years experience required"?</span>
              </p>
              <p className="mb-3">
                Finding relevant jobs for fresh graduates becomes slow, stressful, and unpredictable.
              </p>
              <p className="text-sm font-semibold text-[#ff4c00]">
                Our intelligent platform eliminates this friction.
              </p>
              <button
                type="button"
                onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", "Create Profile")}
                className="mt-3 text-xs font-semibold text-[#ff4c00] hover:underline"
              >
                Create Profile →
              </button>
            </div>
          </div>
        </section>
        {/* KEY BENEFITS */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  num: "1",
                  title: "Find Relevant Jobs Faster",
                  desc: "No more sorting through senior-level roles.",
                },
                {
                  num: "2",
                  title: "Get Personalized Job Matches",
                  desc: "Powered by skills-based job recommendations.",
                },
                {
                  num: "3",
                  title: "Eliminate Job Search Confusion",
                  desc: "Clear, structured job discovery.",
                },
                {
                  num: "4",
                  title: "Apply Instantly",
                  desc: "One-click applications.",
                },
                {
                  num: "5",
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  num: "6",
                  title: "Discover Internships & Graduate Roles",
                  desc: "Ideal for internships and jobs for freshers.",
                },
                {
                  num: "7",
                  title: "Access Curated Listings",
                  desc: "From best job sites for freshers.",
                },
                {
                  num: "8",
                  title: "Receive Intelligent Career Guidance",
                  desc: "Career guidance for freshers.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-lg border border-slate-200 bg-[#fffaf7] p-4"
                >
                  <div className="text-xl font-bold text-[#ff4c00] mb-2">{item.num}</div>
                  <h3 className="text-sm font-semibold mb-1.5 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#fff7f2] py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How Our <span className="text-[#ff4c00]">AI Job Search Platform Works</span>
              </h2>
              <p className="text-base text-slate-700">
                Finding your first job becomes simple, guided, and efficient.
              </p>
            </div>

            <div className="space-y-4">
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
                    "personalized job recommendations",
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
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4c00] text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-slate-900">
                        {item.title}
                      </h3>
                      {item.desc && <p className="text-sm text-slate-700 mb-3">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-2 mb-3">
                          {item.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <p className="text-sm font-medium text-[#ff4c00]">
                          {item.note}
                        </p>
                      )}
                      {item.cta && (
                        <button
                          type="button"
                          onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", item.cta)}
                          className="mt-2 text-sm font-semibold text-[#ff4c00] hover:underline"
                        >
                          {item.cta} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REAL-TIME JOB DISCOVERY */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Real-Time <span className="text-[#ff4c00]">Job Discovery</span> Engine
              </h2>
              <p className="text-sm text-slate-700">
                Continuously updated listings from leading:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#fffaf7] rounded-lg border border-slate-200 p-4 text-center">
                <p className="text-sm font-medium text-slate-700">online job search platforms</p>
              </div>
              <div className="bg-[#fffaf7] rounded-lg border border-slate-200 p-4 text-center">
                <p className="text-sm font-medium text-slate-700">job portals for fresh graduates</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS */}
        <section className="bg-[#fff7f2] py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Why This <span className="text-[#ff4c00]">Fresher Job Search Platform</span> Delivers Better Results
              </h2>
              <p className="text-base text-slate-700 mb-6 text-center">
                Traditional portals show listings. We deliver precision & direction.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {[
                  "Get matched only with relevant entry-level jobs",
                  "Avoid experience-heavy mismatches",
                  "Reduce wasted applications",
                  "Improve interview probability",
                  "Gain clarity & confidence",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-white rounded-lg border border-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-5 text-sm text-slate-700">
                <p className="font-semibold mb-2 text-slate-900">Users typically experience:</p>
                <ul className="space-y-1">
                  <li>• Faster job discovery</li>
                  <li>• Better job relevance</li>
                  <li>• Reduced application fatigue</li>
                  <li>• Improved recruiter response probability</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">
                Key Features Designed for <span className="text-[#ff4c00]">Early-Career Success</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  desc: "",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-[#fffaf7] p-4"
                >
                  <h3 className="text-sm font-semibold mb-1.5 text-slate-900">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="bg-[#fff7f2] py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-[#ff4c00]">AI Job Search Platform</span> vs Traditional Job Portals
              </h2>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#fff7f2] text-left">
                    <th className="px-4 py-3 font-semibold text-slate-900 text-sm">Feature</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 text-sm">AI Job Search for Freshers</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 text-sm">Traditional Job Portals</th>
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
                  ].map((row) => (
                    <tr key={row.feature} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-700 text-sm">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-slate-700 text-sm">{row.ai}</td>
                      <td className="px-4 py-3 text-slate-600 text-sm">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-center text-sm text-slate-600">
              Modern career discovery requires smarter systems.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">
                Who Can Use This <span className="text-[#ff4c00]">AI Job Search Platform</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className="rounded-lg border border-slate-200 bg-[#fffaf7] px-4 py-2.5 text-center text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
              Find <span className="text-[#ff4c00]">Entry-Level Jobs</span> Faster with AI
            </h2>
            <p className="text-base text-slate-700 mb-4">
              Don't let your first opportunity take months of guessing.
            </p>
            <p className="text-base text-slate-700 mb-6">
              With our AI job search for freshers, you can:
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-3 text-sm text-slate-700">
              <span>Discover relevant entry-level jobs</span>
              <span>•</span>
              <span>Access smarter jobs for fresh graduates</span>
              <span>•</span>
              <span>Apply faster & easier</span>
              <span>•</span>
              <span>Reduce job search stress</span>
              <span>•</span>
              <span>Gain career clarity</span>
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-job-search-platform-for-freshers", ctaLabel)}
              className="inline-flex items-center rounded-lg bg-[#ff4c00] px-8 py-3 text-base font-semibold text-white hover:bg-[#e24400] transition-colors shadow-lg mb-5"
            >
              {ctaLabel}
              <ArrowRight size={18} className="ml-2" />
            </button>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600">
              <span>Instant setup</span>
              <span>•</span>
              <span>No experience required</span>
              <span>•</span>
              <span>Secure & private</span>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                FAQs
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                  className={`border-b border-gray-200 transition-all ${
                    activeFaqIndex === i ? "bg-[#fff7f3] border-l-4 border-l-[#ff4c00]" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fff7f3] transition-colors"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-lg ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className="text-[#ff4c00] shrink-0 ml-4">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-6 pb-6 text-slate-600 animate-fadeIn">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}} />
    </div>
  );
}

