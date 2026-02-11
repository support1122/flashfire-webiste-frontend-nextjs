"use client";

import { GraduationCap, Search, Target, Sparkles } from "lucide-react";

export default function AIJobSearchFreshersPage() {
  const ctaLabel = "Start Fresher Job Search";

  const updateCtaUrl = (basePath: string, label: string) => {
    if (typeof window === "undefined") return;
    const slug = label.trim().replace(/\s+/g, "-");
    const isCanada = window.location.pathname.startsWith("/en-ca");
    const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
    const newUrl = `${normalizedBase}/${slug}`;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
  };

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
        {/* WHY FRESHERS STRUGGLE */}
<section className="bg-white py-24">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold">
        Starting Your Career
        <span className="block text-[#ff4c00]">Is Harder Than It Should Be</span>
      </h2>
      <p className="mt-4 text-slate-600 text-sm md:text-base">
        Most graduates don’t lack talent — they lack direction.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-2 gap-10">

      {/* Problems */}
      <div className="rounded-2xl bg-[#fff4ec] border border-[#ffd6c2] p-8">
        <h3 className="font-semibold text-lg mb-6 text-[#ff4c00]">
          What Freshers Face
        </h3>
        <ul className="space-y-4 text-sm text-slate-700">
          <li>• Applying to 100+ jobs with no response</li>
          <li>• Unsure which roles truly match your skills</li>
          <li>• Feeling underqualified because of “experience required”</li>
          <li>• No clear roadmap after graduation</li>
        </ul>
      </div>

      {/* Solutions */}
      <div className="rounded-2xl bg-[#fffaf7] border border-[#ffd6c2] p-8 shadow-sm">
        <h3 className="font-semibold text-lg mb-6 text-slate-900">
          How Flashfire Helps
        </h3>
        <ul className="space-y-4 text-sm text-slate-700">
          <li>✓ Identify roles aligned with your real strengths</li>
          <li>✓ Suggest internships and entry-level roles you can actually get</li>
          <li>✓ Map your coursework to industry requirements</li>
          <li>✓ Provide a clear next-step action plan</li>
        </ul>
      </div>

    </div>
  </div>
</section>
{/* HOW FLASHFIRE GUIDES YOU */}
<section className="bg-[#fff7f2] py-24">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold">
        From Graduate
        <span className="block text-[#ff4c00]">To Job-Ready Candidate</span>
      </h2>
      <p className="mt-4 text-slate-600 text-sm md:text-base">
        Structured guidance instead of random applications.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-4 gap-6">

      {/* Step 1 */}
      <div className="rounded-2xl bg-white border border-[#ffd6c2] p-6 hover:shadow-lg transition">
        <div className="text-xs font-bold text-[#ff4c00] mb-3">
          STEP 1
        </div>
        <h3 className="font-semibold">
          Skill Evaluation
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Analyze your projects, tools, and coursework.
        </p>
      </div>

      {/* Step 2 */}
      <div className="rounded-2xl bg-white border border-[#ffd6c2] p-6 hover:shadow-lg transition">
        <div className="text-xs font-bold text-[#ff4c00] mb-3">
          STEP 2
        </div>
        <h3 className="font-semibold">
          Role Matching
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Recommend realistic entry-level roles.
        </p>
      </div>

      {/* Step 3 */}
      <div className="rounded-2xl bg-white border border-[#ffd6c2] p-6 hover:shadow-lg transition">
        <div className="text-xs font-bold text-[#ff4c00] mb-3">
          STEP 3
        </div>
        <h3 className="font-semibold">
          Resume Alignment
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Highlight the right skills for each job.
        </p>
      </div>

      {/* Step 4 */}
      <div className="rounded-2xl bg-white border border-[#ffd6c2] p-6 hover:shadow-lg transition">
        <div className="text-xs font-bold text-[#ff4c00] mb-3">
          STEP 4
        </div>
        <h3 className="font-semibold">
          Confident Applications
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Apply strategically — not blindly.
        </p>
      </div>

    </div>

  </div>
</section>

      </main>
    </div>
  );
}

