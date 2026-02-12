"use client";

import { Target, Sparkles, Users, CheckCircle, Sliders, UserCheck, TrendingUp } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobMatchingPlatformPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      

      <main className="mt-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center">
  <div className="max-w-6xl  mx-auto px-6 md:px-8 w-full">
    <div className="grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT CONTENT */}
      <div>
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
          Jobs matched to  
          <span className="block text-[#ff4c00]">
            your real profile
          </span>
        </h1>

        {/* Short description */}
        <p className="mt-4 text-base md:text-lg text-slate-700 max-w-md">
          Flashfire analyzes your skills, location, and salary goals to
          prioritize roles where you actually fit — before you apply.
        </p>

        {/* Compact highlights */}
        <div className="mt-6 space-y-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#ff4c00]" />
            <span>AI filters roles before applications</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#ff4c00]" />
            <span>Recommendations improve over time</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#ff4c00]" />
            <span>Focused on US &amp; Canadian jobs</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start AI Job Matching")}
            className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-7 py-3 text-sm md:text-base font-semibold text-white shadow-[0_3px_0_#000] hover:bg-[#e24400] transition"
          >
            Start AI Job Matching
          </button>
        </div>
      </div>

      {/* RIGHT PREVIEW (AIJobAlert style) */}
      <div className="relative">
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">

    <p className="text-sm font-semibold text-slate-800 mb-4">
      AI Matching Analysis
    </p>

    {/* PROFILE SNAPSHOT */}
    <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-4 mb-4">
      <p className="text-xs font-semibold text-slate-700 mb-2">
        Your Profile
      </p>
      <ul className="text-xs text-slate-600 space-y-1">
        <li>• Skills: React, JavaScript, UI</li>
        <li>• Location: United States</li>
        <li>• Salary: $70k–90k</li>
      </ul>
    </div>

    {/* MATCHING SIGNALS */}
    <div className="space-y-3 mb-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">Skill Match</span>
        <span className="font-semibold text-[#ff4c00]">High</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">Location Fit</span>
        <span className="font-semibold text-[#ff4c00]">Yes</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">Salary Alignment</span>
        <span className="font-semibold text-[#ff4c00]">Matched</span>
      </div>
    </div>

    {/* PRIORITY OUTPUT */}
    <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-4">
      <p className="text-xs font-semibold text-slate-700 mb-1">
        Priority Result
      </p>
      <p className="text-sm font-semibold">
        Frontend Developer — High Fit
      </p>
      <span className="inline-block mt-2 text-xs font-semibold text-[#ff4c00]">
        Recommended to apply
      </span>
    </div>

  </div>

  {/* subtle accent */}
  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#ffe7d7] blur-2xl -z-10" />
</div>

    </div>
  </div>
</section>

        {/* How it works */}
       {/* CAPABILITIES */}
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <h2 className="text-2xl md:text-3xl font-bold mb-12">
      What Flashfire&apos;s <span className="text-[#ff4c00]">AI does for you</span>
    </h2>

    <div className="space-y-8">

      <div className="flex gap-6 p-6 rounded-2xl bg-[#fffaf7] border border-slate-200">
        <Target className="h-8 w-8 text-[#ff4c00] shrink-0" />
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Precision role targeting
          </h3>
          <p className="text-slate-700 text-sm md:text-base">
            Your profile is matched against real job requirements so you don’t
            waste time applying to roles that don’t fit.
          </p>
        </div>
      </div>

      <div className="flex gap-6 p-6 rounded-2xl bg-[#fffaf7] border border-slate-200">
        <Sparkles className="h-8 w-8 text-[#ff4c00] shrink-0" />
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Personalized job recommendations
          </h3>
          <p className="text-slate-700 text-sm md:text-base">
            The system learns from your skills, searches, and preferences to
            continuously improve job suggestions.
          </p>
        </div>
      </div>

      <div className="flex gap-6 p-6 rounded-2xl bg-[#fffaf7] border border-slate-200">
        <Users className="h-8 w-8 text-[#ff4c00] shrink-0" />
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Market-aware matching
          </h3>
          <p className="text-slate-700 text-sm md:text-base">
            Flashfire focuses on active roles across US &amp; Canadian markets
            where demand aligns with your experience level.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* HEADING */}
    <div className="max-w-3xl mb-14">
      
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
        How Flashfire&apos;s AI job matching  
        <span className="block text-[#ff4c00]">
          guides your applications
        </span>
      </h2>

      <p className="mt-4 text-slate-700 text-base md:text-lg">
        A simple three-stage process that filters the market and
        helps you focus only on roles that truly fit your profile.
      </p>
    </div>

    {/* FLOW */}
    <div className="relative grid md:grid-cols-[60px_1fr] gap-10">

      {/* LEFT RAIL */}
      <div className="hidden md:flex flex-col items-center">
        <div className="h-full w-[2px] bg-[#ffd6c2]" />
      </div>

      {/* STEPS */}
      <div className="space-y-12">

        {/* STEP 1 */}
        <div className="relative flex gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0">
            <UserCheck size={22} />
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              We understand your profile
            </h3>
            <p className="mt-2 text-slate-700 text-sm md:text-base max-w-2xl">
              Flashfire analyzes your skills, experience level, preferred
              locations, and salary expectations to build a clear matching
              profile.
            </p>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="relative flex gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0">
            <Sliders size={22} />
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              Roles are scanned and filtered
            </h3>
            <p className="mt-2 text-slate-700 text-sm md:text-base max-w-2xl">
              The AI scans job boards and company career pages, filtering
              out roles that don’t align with your profile or goals.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="relative flex gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0">
            <CheckCircle size={22} />
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-900">
              Best matches are prioritized
            </h3>
            <p className="mt-2 text-slate-700 text-sm md:text-base max-w-2xl">
              High-fit opportunities are surfaced first, helping you apply
              where your chances of success are strongest.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

        {/* BENEFITS COMPARISON SECTION */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Why AI Matching
                <span className="block text-[#ff4c00]">Beats Manual Searching</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm md:text-base">
                Stop wasting hours on job boards. Let AI do the filtering.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-10">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <h3 className="font-semibold text-lg mb-6 text-slate-700">
                  Manual Job Search
                </h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Spend hours scrolling through irrelevant listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Apply to roles you&apos;re not qualified for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Miss high-fit opportunities buried in search results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>No feedback on why applications fail</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#fffaf7] rounded-2xl border border-[#ffd6c2] p-8 shadow-md">
                <h3 className="font-semibold text-lg mb-6 text-[#ff4c00]">
                  Flashfire AI Matching
                </h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4c00]">✓</span>
                    <span>See only roles that match your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4c00]">✓</span>
                    <span>Understand your fit score before applying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4c00]">✓</span>
                    <span>Get prioritized recommendations that improve over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ff4c00]">✓</span>
                    <span>Learn which skills increase your match rate</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Frequently Asked
                <span className="block text-[#ff4c00]">Questions</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "How accurate is the matching algorithm?",
                  a: "Flashfire&apos;s AI analyzes your skills semantically, compares them against real job requirements, and considers market demand. Match scores reflect actual fit, not just keyword overlap.",
                },
                {
                  q: "Will I see fewer jobs than on job boards?",
                  a: "You&apos;ll see fewer total jobs, but they&apos;re all relevant. Quality over quantity — every recommendation is worth your time to review and potentially apply to.",
                },
                {
                  q: "Can I adjust my matching preferences?",
                  a: "Yes. Update your skills, location preferences, salary range, or experience level anytime. The system immediately recalculates matches based on your new profile.",
                },
                {
                  q: "How does the system learn and improve?",
                  a: "Flashfire tracks which roles you apply to, which ones lead to interviews, and your feedback. Over time, recommendations become more accurate and aligned with your career goals.",
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

