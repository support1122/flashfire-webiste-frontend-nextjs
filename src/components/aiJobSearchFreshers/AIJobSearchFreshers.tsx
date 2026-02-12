"use client";

import { GraduationCap, Search, Target, Sparkles, Award } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function AIJobSearchFreshersPage() {
  const ctaLabel = "Start Fresher Job Search";
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

        {/* SUCCESS STORIES SECTION */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                How Freshers
                <span className="block text-[#ff4c00]">Land Their First Jobs</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm md:text-base">
                Real graduates. Real results. Real direction.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Computer Science Graduate",
                  outcome: "Found Frontend Intern role in 3 weeks",
                  quote: "Flashfire showed me which skills actually mattered and matched me to roles I could actually get.",
                  icon: <Award className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  name: "Recent Engineering Grad",
                  outcome: "Landed Junior Developer position",
                  quote: "Instead of applying blindly, I focused on roles where my coursework and projects aligned.",
                  icon: <Target className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  name: "New Graduate",
                  outcome: "Got Product Trainee offer",
                  quote: "The platform helped me understand what entry-level really means and where I fit.",
                  icon: <Sparkles className="h-6 w-6 text-[#ff4c00]" />,
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="bg-[#fffaf7] border border-[#ffd6c2] rounded-2xl p-6 hover:shadow-lg transition"
                >
                  <div className="mb-4">{item.icon}</div>
                  <p className="text-xs font-semibold text-[#ff4c00] mb-2">{item.outcome}</p>
                  <p className="text-sm text-slate-700 italic mb-3">&quot;{item.quote}&quot;</p>
                  <p className="text-xs text-slate-600">— {item.name}</p>
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
                Common Questions
                <span className="block text-[#ff4c00]">From Freshers</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "I have no work experience. Can Flashfire still help?",
                  a: "Absolutely. Flashfire evaluates your coursework, projects, internships, and skills — not just paid work. Many entry-level roles value academic projects and relevant coursework.",
                },
                {
                  q: "How do I know which roles are realistic for me?",
                  a: "Flashfire matches your actual skills and experience level to roles that are actively hiring freshers. You&apos;ll see match scores that indicate how well you fit each role.",
                },
                {
                  q: "What if I&apos;m not sure what career path to follow?",
                  a: "Start by entering your skills and interests. Flashfire will suggest multiple career paths that align with your background, helping you explore options before committing.",
                },
                {
                  q: "Can I use this for internship searches too?",
                  a: "Yes. Flashfire includes internships, co-ops, and entry-level roles. The platform helps you find opportunities that match your current skill level, whether that&apos;s an internship or a full-time role.",
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

