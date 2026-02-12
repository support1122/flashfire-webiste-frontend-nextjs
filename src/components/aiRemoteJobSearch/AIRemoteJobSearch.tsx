"use client";

import { Globe2, Laptop, Wifi, MapPin, CheckCircle2 } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function AIRemoteJobSearchPage() {
  const ctaLabel = "Start Remote Job Search";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

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

        {/* BENEFITS SECTION */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Why Remote Job Search
                <span className="block text-[#ff4c00]">Needs Special Handling</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm md:text-base">
                Remote roles have unique requirements that traditional job boards ignore.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Time-Zone Compatibility",
                  desc: "Work with teams across time zones? Flashfire filters roles that match your availability and required overlap hours.",
                  icon: <Globe2 className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  title: "Location Flexibility",
                  desc: "Some &quot;remote&quot; roles still require specific states or countries. We filter by actual location requirements.",
                  icon: <MapPin className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  title: "Remote-First Culture",
                  desc: "Find companies built for remote work, not just offering it as a temporary option.",
                  icon: <CheckCircle2 className="h-6 w-6 text-[#ff4c00]" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#fffaf7] border border-[#ffd6c2] rounded-2xl p-8 hover:shadow-lg transition"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Remote Job Search
                <span className="block text-[#ff4c00]">Questions Answered</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "How does Flashfire handle time-zone filtering?",
                  a: "You set your preferred working hours and required team overlap. Flashfire then filters roles that match your schedule, so you don&apos;t apply to jobs requiring hours you can&apos;t work.",
                },
                {
                  q: "What if a role says &quot;remote&quot; but has location restrictions?",
                  a: "Flashfire reads the fine print. If a role requires you to be in a specific state or country, we flag that upfront so you don&apos;t waste time applying.",
                },
                {
                  q: "Can I search for remote roles in specific countries?",
                  a: "Yes. Set your preferred countries or regions, and Flashfire will prioritize remote roles that are open to candidates in those locations.",
                },
                {
                  q: "How do I know if a company is truly remote-friendly?",
                  a: "Flashfire analyzes company policies, team distribution, and role descriptions to identify companies that are built for remote work versus those just offering it temporarily.",
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

