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
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[70vh] flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center rounded-full bg-[#ffe7d7] px-4 py-1.5 text-sm font-semibold text-[#ff4c00] ring-1 ring-[#ff4c00]/10">
                  AI Remote Job Search Platform
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Find remote roles
                  <span className="block text-[#ff4c00]">that match your time zone and skills</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-slate-700">
                  Flashfire surfaces high‑quality remote opportunities across global markets,
                  filtered by your location, experience level, and salary expectations.
                </p>

                <div className="mt-6 space-y-3 text-base md:text-lg">
                  <div className="flex items-center gap-3 rounded-lg py-2 pr-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff4c00]/10">
                      <Globe2 className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span>Remote roles across US, Canada, and global markets</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg py-2 pr-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff4c00]/10">
                      <Laptop className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span>Tech, product, and business roles that support remote work</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg py-2 pr-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff4c00]/10">
                      <Wifi className="h-4 w-4 text-[#ff4c00]" />
                    </div>
                    <span>Filtered by time zone and work‑overlap preferences</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                    className="inline-flex items-center rounded-xl bg-[#ff4c00] px-6 py-3 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] hover:shadow-lg hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00] transition-all duration-300"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-300">
                  <p className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider text-slate-600">
                    Remote job highlights
                  </p>
                  <div className="space-y-4 text-sm text-slate-700">
                    <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50/50 border border-[#ffd6c2]/80 p-4 flex justify-between items-center hover:border-[#ffd6c2] transition-colors duration-200">
                      <div>
                        <p className="font-semibold">Senior Frontend Engineer</p>
                        <p className="text-xs text-slate-600">US‑based • Fully Remote • EST overlap</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-[#ff4c00]">
                        <MapPin className="h-3 w-3" />
                        High Match
                      </span>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50/50 border border-[#ffd6c2]/80 p-4 flex justify-between items-center hover:border-[#ffd6c2] transition-colors duration-200">
                      <div>
                        <p className="font-semibold">Product Designer</p>
                        <p className="text-xs text-slate-600">Canada • Remote Friendly • PST overlap</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-[#ff4c00]">
                        <MapPin className="h-3 w-3" />
                        Time‑zone Fit
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      These are examples of how Flashfire prioritizes remote roles that not only match
                      your skills, but also work with your schedule and region.
                    </p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#ffe7d7] blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>
        {/* TRUSTED BY */}
        <section className="bg-white py-8 md:py-10 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-8 text-center md:text-left">
              <p className="text-base text-slate-700">
                <span className="font-semibold text-slate-900">Trusted by remote professionals worldwide.</span>{" "}
                Used across industries • Leading remote job boards • Modern remote work careers
              </p>
            </div>
          </div>
        </section>

        {/* WHY REMOTE JOB SEARCHING FEELS FRUSTRATING */}
        <section className="bg-[#fff7f2] py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Why Remote Job Searching Feels <span className="text-[#ff4c00]">Frustrating</span>
              </h2>
              <p className="text-lg text-slate-700">
                Searching manually across multiple online job search platforms is exhausting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
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
                  className="flex items-center gap-2 text-base text-slate-700"
                >
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#ff4c00]/80" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl bg-white p-6 md:p-8 text-base text-slate-700 shadow-md border-l-4 border-[#ff4c00] hover:shadow-lg transition-all duration-300">
                <p className="mb-2 font-semibold text-slate-900">Tired of applying and getting ghosted?</p>
                <p className="mb-2 font-semibold text-slate-900">Overwhelmed, juggling multiple remote job boards?</p>
                <p className="mb-4 font-semibold text-slate-900">Unsure which roles truly fit your skills?</p>
                <p className="font-semibold text-[#ff4c00]">
                  Our intelligent platform eliminates this friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                How Our <span className="text-[#ff4c00]">AI Remote Job Finder Works</span>
              </h2>
              <p className="text-lg text-slate-700">
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
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl bg-[#fffaf7] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c00] text-sm font-bold text-white shadow-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-slate-900">
                        {item.title}
                      </h3>
                      {item.desc && <p className="text-base text-slate-700 mb-3">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-2 mb-3">
                          {item.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]/90"></div>
                              <span className="text-base text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <p className="text-base font-medium text-[#ff4c00]">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS */}
        <section className="bg-[#fff7f2] py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Why This <span className="text-[#ff4c00]">AI Remote Job Finder</span> Delivers Better Results
              </h2>
              <p className="text-lg text-slate-700">
                Traditional job boards show listings. We deliver precision & efficiency.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Eliminate irrelevant applications",
                "Reduce wasted browsing time",
                "Improve resume-job alignment",
                "Discover better-fit opportunities",
                "Apply faster than competitors",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                  <span className="text-base text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white p-6 text-base text-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="font-semibold mb-3 text-slate-900">Users typically experience:</p>
              <ul className="space-y-2 text-slate-600">
                <li>• Faster job discovery</li>
                <li>• Better job relevance</li>
                <li>• Reduced application fatigue</li>
                <li>• Improved response probability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="rounded-xl bg-[#fffaf7] p-5 space-y-3 hover:bg-[#fff7f2] hover:shadow-md transition-all duration-300"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff4c00]/10 text-base font-bold text-[#ff4c00]">{item.num}</span>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  {item.desc && <p className="text-slate-600 leading-relaxed">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="bg-[#fff7f2] py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Key Features Designed for <span className="text-[#ff4c00]">Remote Job Efficiency</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "AI-Powered Remote Job Matching",
                  desc: "No manual keyword filtering.",
                },
                {
                  title: "Verified Global Remote Jobs Database",
                  desc: "",
                },
                {
                  title: "Real-Time Remote Job Alerts",
                  desc: "",
                },
                {
                  title: "Resume-Based Job Recommendations",
                  desc: "",
                },
                {
                  title: "Skill-Gap Analysis for Remote Roles",
                  desc: "",
                },
                {
                  title: "Time-Zone-Based Job Filtering",
                  desc: "",
                },
                {
                  title: "Built-In Resume & Cover Letter Builder",
                  desc: "",
                },
                {
                  title: "Application Tracking Dashboard",
                  desc: "",
                },
                {
                  title: "Fast Job Discovery Experience",
                  desc: "",
                },
                {
                  title: "Supports part-time and full-time remote jobs",
                  desc: "",
                },
                {
                  title: "Works across multiple industries",
                  desc: "",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <p className="font-medium text-slate-900">{item.title}</p>
                  {item.desc && <p className="mt-1 text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-[#ff4c00]">AI Remote Job Finder</span> vs Traditional Job Boards
              </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="min-w-full text-base">
                <thead>
                  <tr className="bg-[#fff7f2] text-left">
                    <th className="px-4 py-3 font-semibold text-slate-900 text-base">Feature</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 text-base">AI Remote Job Finder</th>
                    <th className="px-4 py-3 font-semibold text-slate-900 text-base">Traditional Job Boards</th>
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
                    <tr key={row.feature} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="px-4 py-3 font-medium text-slate-700 text-base">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-slate-700 text-base">{row.ai}</td>
                      <td className="px-4 py-3 text-slate-600 text-base">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-center text-base text-slate-600">
              Modern remote job search requires intelligent systems.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS */}
        <section className="bg-[#fff7f2] py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold">
                Who Can Use This <span className="text-[#ff4c00]">AI Remote Job Finder</span>?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
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
                  className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:shadow-md hover:bg-[#fff7f2] transition-all duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
          <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
              Find <span className="text-[#ff4c00]">Global Remote Jobs</span> Smarter with AI
            </h2>
            <p className="text-lg text-slate-700 mb-6">
              Stop manually juggling multiple remote job boards. Simplify your remote job search, get precision matching, discover verified global remote jobs, apply faster, and reduce job search stress.
            </p>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
              className="inline-flex items-center rounded-xl bg-[#ff4c00] px-8 py-3 text-base font-semibold text-white hover:bg-[#e24400] hover:shadow-xl hover:shadow-[#ff4c00]/30 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00] transition-all duration-300"
            >
              {ctaLabel}
              <ArrowRight size={18} className="ml-2" />
            </button>
            <p className="mt-4 text-sm text-slate-500">
              Instant setup • No complex learning curve • Secure & private
            </p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#fff7f2] py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                FAQs
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl mx-auto">
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
                  className={`border-b border-gray-200 transition-all duration-200 ${
                    activeFaqIndex === i ? "bg-[#fff7f3] border-l-4 border-l-[#ff4c00]" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fff7f3] transition-colors duration-200"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-lg md:text-xl ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className="text-[#ff4c00] shrink-0 ml-4">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-6 pb-6 text-slate-600 text-base animate-fadeIn">
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

