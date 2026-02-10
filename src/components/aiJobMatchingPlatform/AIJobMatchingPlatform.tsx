"use client";

import { Target, Sparkles, Users, CheckCircle, Sliders, UserCheck } from "lucide-react";
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
      </main>

    </div>
  );
}

