"use client";

import { Globe2, Laptop, Wifi, MapPin } from "lucide-react";

export default function AIRemoteJobSearchPage() {
  const ctaLabel = "Start Remote Job Search";

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
                  AI Remote Job Search Platform
                </span>
                <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                  Find remote roles
                  <span className="block text-[#ff4c00]">that match your time zone and skills</span>
                </h1>
                <p className="mt-4 text-sm md:text-base text-slate-700">
                  Flashfire surfaces high‑quality remote opportunities across global markets,
                  filtered by your location, experience level, and salary expectations.
                </p>

                <div className="mt-6 space-y-2 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-[#ff4c00]" />
                    <span>Remote roles across US, Canada, and global markets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-[#ff4c00]" />
                    <span>Tech, product, and business roles that support remote work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-[#ff4c00]" />
                    <span>Filtered by time zone and work‑overlap preferences</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-remote-job-search-platform", ctaLabel)}
                    className="inline-flex items-center rounded-lg bg-[#ff4c00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e24400] transition"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-md">
                  <p className="text-xs font-semibold text-slate-800 mb-3">
                    Remote job highlights
                  </p>
                  <div className="space-y-4 text-xs text-slate-700">
                    <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Senior Frontend Engineer</p>
                        <p className="text-[11px] text-slate-600">US‑based • Fully Remote • EST overlap</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#ff4c00]">
                        <MapPin className="h-3 w-3" />
                        High Match
                      </span>
                    </div>
                    <div className="rounded-xl bg-[#fff7f2] border border-[#ffd6c2] p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Product Designer</p>
                        <p className="text-[11px] text-slate-600">Canada • Remote Friendly • PST overlap</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#ff4c00]">
                        <MapPin className="h-3 w-3" />
                        Time‑zone Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
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
        {/* REMOTE JOB SEARCH DIFFERENCE */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold">
        Remote Job Search
        <span className="block text-[#ff4c00]">Is Not Just Regular Job Search</span>
      </h2>
      <p className="mt-4 text-slate-600 text-sm md:text-base">
        Different rules. Different filters. Different strategy.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-2 gap-10">

      {/* Traditional */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <h3 className="font-semibold text-lg mb-6 text-slate-700">
          Traditional Job Boards
        </h3>
        <ul className="space-y-4 text-sm text-slate-600">
          <li>• “Remote” but location restricted</li>
          <li>• No time-zone compatibility filtering</li>
          <li>• Salary often unclear</li>
          <li>• Hundreds of irrelevant listings</li>
        </ul>
      </div>

      {/* Flashfire */}
      <div className="rounded-2xl border border-[#ffd6c2] bg-[#fffaf7] p-8 shadow-md">
        <h3 className="font-semibold text-lg mb-6 text-[#ff4c00]">
          Flashfire Remote Filtering
        </h3>
        <ul className="space-y-4 text-sm text-slate-700">
          <li>✓ Time-zone overlap filtering</li>
          <li>✓ Skill + experience matching</li>
          <li>✓ Salary expectation alignment</li>
          <li>✓ Prioritized high-fit opportunities</li>
        </ul>
      </div>

    </div>

  </div>
</section>
{/* HOW FLASHFIRE FILTERS */}
<section className="py-24 bg-[#fff7f2]">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold">
        How Flashfire Filters
        <span className="block text-[#ff4c00]">Remote Roles For You</span>
      </h2>
      <p className="mt-4 text-slate-600 text-sm md:text-base">
        Smart filtering powered by profile data — not keyword guessing.
      </p>
    </div>

    <div className="mt-16 space-y-10">

      {/* Filter Block 1 */}
      <div className="relative bg-white rounded-3xl border border-[#ffd6c2] p-10 shadow-sm hover:shadow-lg transition">
        <div className="absolute -left-5 top-10 h-10 w-10 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
          1
        </div>
        <h3 className="text-xl font-semibold">
          Location & Time-Zone Sync
        </h3>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl">
          We prioritize roles that match your working hours and required team overlap,
          so you don’t apply to jobs you can’t realistically support.
        </p>
      </div>

      {/* Filter Block 2 */}
      <div className="relative bg-white rounded-3xl border border-[#ffd6c2] p-10 shadow-sm hover:shadow-lg transition">
        <div className="absolute -left-5 top-10 h-10 w-10 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
          2
        </div>
        <h3 className="text-xl font-semibold">
          Skill & Experience Matching
        </h3>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl">
          AI compares your skills, tools, and seniority level with job requirements
          to surface only relevant listings.
        </p>
      </div>

      {/* Filter Block 3 */}
      <div className="relative bg-white rounded-3xl border border-[#ffd6c2] p-10 shadow-sm hover:shadow-lg transition">
        <div className="absolute -left-5 top-10 h-10 w-10 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
          3
        </div>
        <h3 className="text-xl font-semibold">
          Compensation Alignment
        </h3>
        <p className="mt-3 text-sm text-slate-600 max-w-2xl">
          Filter roles within your target salary range so you don’t waste time
          on underpaid opportunities.
        </p>
      </div>

    </div>

  </div>
</section>

      </main>
    </div>
  );
}

