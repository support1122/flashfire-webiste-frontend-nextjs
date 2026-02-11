"use client";

import { Brain, ClipboardList, TrendingUp, Target } from "lucide-react";

export default function AICareerAssessmentPage() {
  const ctaLabel = "Start Career Assessment";

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
                  AI Career Assessment &amp; Skill Gap Analysis
                </span>
                <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                  Know exactly
                  <span className="block text-[#ff4c00]">where your career can go next</span>
                </h1>
                <p className="mt-4 text-sm md:text-base text-slate-700">
                  Flashfire&apos;s AI career assessment analyzes your skills, experience, and goals
                  to surface career paths and skill gaps that actually matter for today&apos;s market.
                </p>

                <div className="mt-6 space-y-2 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-[#ff4c00]" />
                    <span>Role and level recommendations based on your profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-[#ff4c00]" />
                    <span>Skill gap analysis mapped to in-demand roles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#ff4c00]" />
                    <span>Clear next‑step plan for learning and applications</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-career-assessment-skill-gap-analysis", ctaLabel)}
                    className="inline-flex items-center rounded-lg bg-[#ff4c00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e24400] transition"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-md">
                  <p className="text-xs font-semibold text-slate-800 mb-3">
                    Snapshot of your assessment
                  </p>
                  <div className="space-y-4 text-xs text-slate-700">
                    <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-4">
                      <p className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-[#ff4c00]" />
                        Recommended focus: Senior Frontend Engineer
                      </p>
                      <p className="mt-1">
                        Strong in React and UI; suggested growth in system design, architecture,
                        and backend collaboration to unlock senior opportunities.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-[#fffaf7] border border-[#ffd6c2] p-4">
                        <p className="text-[11px] text-slate-500">Skill Fit</p>
                        <p className="text-sm font-semibold text-[#ff4c00]">82%</p>
                      </div>
                      <div className="rounded-lg bg-[#fffaf7] border border-[#ffd6c2] p-4">
                        <p className="text-[11px] text-slate-500">Market Demand</p>
                        <p className="text-sm font-semibold text-[#ff4c00]">High</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-[#fffaf7] border border-[#ffd6c2] p-4">
                      <p className="text-[11px] text-slate-500 mb-1">Suggested next steps</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Target senior frontend roles at product-focused companies.</li>
                        <li>Add 1–2 portfolio pieces that showcase architecture decisions.</li>
                        <li>Invest 4–6 weeks in system design and backend fundamentals.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#ffe7d7] blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>
        {/* BENEFITS SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">

            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold">
                Why This Career Assessment
                <span className="block text-[#ff4c00]">Changes Your Direction</span>
              </h2>
              <p className="mt-4 text-sm md:text-base text-slate-600">
                Not generic advice. Not random job suggestions.
                This is structured clarity based on your real profile and market demand.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="group rounded-2xl border border-[#ffe2d3] p-8 bg-[#fffaf7] hover:shadow-lg hover:-translate-y-1 transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#ffe7d7] text-[#ff4c00] font-bold text-lg">
                  01
                </div>
                <h3 className="mt-6 font-semibold text-lg">
                  Precision Career Targeting
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Identify roles aligned with your strengths instead of applying blindly.
                  Save months of wasted effort.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl border border-[#ffe2d3] p-8 bg-[#fffaf7] hover:shadow-lg hover:-translate-y-1 transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#ffe7d7] text-[#ff4c00] font-bold text-lg">
                  02
                </div>
                <h3 className="mt-6 font-semibold text-lg">
                  Clear Skill Gap Roadmap
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Know exactly which skills block your growth and what to learn next
                  for real market impact.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl border border-[#ffe2d3] p-8 bg-[#fffaf7] hover:shadow-lg hover:-translate-y-1 transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#ffe7d7] text-[#ff4c00] font-bold text-lg">
                  03
                </div>
                <h3 className="mt-6 font-semibold text-lg">
                  Strategic Growth Plan
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Get a structured action plan for 30–90 days so your effort
                  translates into interviews and offers.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* HOW IT WORKS SECTION */}
        <section className="py-20 bg-[#fff7f2]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">

            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold">
                How It Works
                <span className="block text-[#ff4c00]">Step by Step</span>
              </h2>
              <p className="mt-4 text-sm md:text-base text-slate-600">
                Simple process. Powerful outcome.
              </p>
            </div>

            <div className="mt-16 relative">

              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#ffd6c2]" />

              <div className="space-y-12">

                {/* Step 1 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-[#ff4c00] text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-lg">
                    Profile & Experience Analysis
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    AI evaluates your skills, tools, experience level, and career goals
                    to understand your real positioning.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-[#ff4c00] text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-lg">
                    Market Alignment Mapping
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Your profile is matched with in-demand roles and current market
                    expectations.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-14">
                  <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-[#ff4c00] text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-lg">
                    Skill Gap + Action Plan
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    You receive a structured growth roadmap with actionable next steps
                    for learning and job applications.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

