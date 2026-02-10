"use client";

import { CheckCircle, CheckCircle2, FileText, Sparkles } from "lucide-react";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIResumeBuilderPage() {
  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      

      <main className="mt-0">
       
       {/* HERO */}
       <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center">
  <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT */}
      <div className="max-w-xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900">
          Resumes shouldn’t be generic.
          <span className="block text-[#ff4c00] mt-1">
            Flashfire builds them for the job.
          </span>
        </h1>

        <p className="mt-4 text-sm md:text-base text-slate-700">
          Flashfire’s AI resume builder creates ATS-optimized,
          job-specific resumes by analyzing real job descriptions —
          so your resume gets seen, not skipped.
        </p>

        <div className="mt-6 space-y-3 text-sm">
          {[
            "ATS-friendly structure & formatting",
            "Role-specific keywords and bullet points",
            "Optimized for real job postings",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-resume-builder", "Build Your Resume")}
            className="inline-flex items-center rounded-lg bg-[#ff4c00] px-6 py-3 text-sm font-semibold text-white hover:bg-[#e24400] transition"
          >
            Build Your Resume
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <p className="text-xs font-semibold text-slate-800 mb-3">
            AI Resume Optimization
          </p>

          <div className="rounded-lg bg-[#fff7f2] border border-[#ffd6c2] p-4 mb-4">
            <p className="text-xs font-semibold mb-1">Resume Summary</p>
            <p className="text-xs text-slate-600">
              Frontend Developer with experience in React, JavaScript,
              and modern UI development.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            {[
              ["ATS Compatibility", "Optimized"],
              ["Keyword Match", "Strong"],
              ["Role Relevance", "High"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-600">{label}</span>
                <span className="font-semibold text-[#ff4c00]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    <h2 className="text-2xl md:text-3xl font-bold mb-12">
      Why Flashfire&apos;s <span className="text-[#ff4c00]">AI resume builder</span> works better
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          title: "Built for applicant tracking systems",
          desc: "Your resume is structured so ATS software can correctly read and rank it.",
        },
        {
          title: "Tailored for each job",
          desc: "Role-specific resumes generated from each job description.",
        },
        {
          title: "Fast iterations",
          desc: "Switch roles or industries without rewriting from scratch.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-[#ffd6c2] bg-[#fffaf7] p-6 hover:shadow-md transition"
        >
          <h3 className="font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-slate-700">{item.desc}</p>
        </div>
      ))}

    </div>
  </div>
</section>

<section className="bg-[#fffaf7] py-24">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-16 text-left md:text-left">
      <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#ff4c00]">
        HOW FLASHFIRE BUILDS YOUR RESUME
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
        From a raw profile
        <span className="block text-[#ff4c00]">
          to a recruiter-ready resume
        </span>
      </h2>

      <p className="mt-4 text-slate-700 text-base md:text-lg">
        Flashfire turns your experience, skills, and target role into an ATS-optimized,
        clean resume that hiring managers can scan in seconds.
      </p>
    </div>

    {/* Horizontal Flow */}
    <div className="relative">
      {/* Connector line (desktop only) */}
      <div className="hidden md:block absolute top-10 left-4 right-4 h-[2px] bg-[#ffd6c2]" />

      <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
        {/* STEP 1 */}
        <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
            1
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#ff4c00]" />
              <h3 className="text-lg font-semibold">
                Share your career story
              </h3>
            </div>

            <p className="text-sm text-slate-700">
              Upload your existing resume or quickly enter your roles, skills,
              and the kind of job you&apos;re targeting.
            </p>

            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Work history & key projects</li>
              <li>• Skills, tools, and tech stack</li>
              <li>• Target roles and locations</li>
            </ul>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="relative bg-[#fff7f2] border border-[#ffd6c2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
            2
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#ff4c00]" />
              <h3 className="text-lg font-semibold">
                AI restructures &amp; optimizes
              </h3>
            </div>

            <p className="text-sm text-slate-700">
              Flashfire rewrites bullets, highlights impact, and aligns keywords
              with real job descriptions and ATS rules.
            </p>

            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Strong, impact-focused bullet points</li>
              <li>• Correct section ordering and layout</li>
              <li>• Keywords mapped to each target role</li>
            </ul>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
            3
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
              <h3 className="text-lg font-semibold">
                Export and apply with confidence
              </h3>
            </div>

            <p className="text-sm text-slate-700">
              Download a polished, ATS-ready resume version that&apos;s tailored
              to the opportunity you&apos;re applying for.
            </p>

            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Clean, recruiter-friendly formatting</li>
              <li>• Different versions for different roles</li>
              <li>• Ready to upload on job portals</li>
            </ul>
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

