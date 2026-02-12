"use client";

import { CheckCircle, CheckCircle2, FileText, Sparkles, Briefcase } from "lucide-react";
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

export default function AIResumeBuilderPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

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

        {/* USE CASES SECTION */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Perfect For
                <span className="block text-[#ff4c00]">These Situations</span>
              </h2>
              <p className="mt-4 text-slate-600 text-sm md:text-base">
                Whether you&apos;re switching roles or optimizing for ATS, Flashfire adapts.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Career Switchers",
                  desc: "Moving to a new field? Flashfire rewrites your experience to highlight transferable skills and align with your target role.",
                  icon: <Briefcase className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  title: "ATS Optimization",
                  desc: "Your resume keeps getting rejected? Flashfire restructures it so ATS systems can read and rank it correctly.",
                  icon: <FileText className="h-6 w-6 text-[#ff4c00]" />,
                },
                {
                  title: "Multiple Applications",
                  desc: "Applying to different roles? Generate tailored resume versions for each job without rewriting everything.",
                  icon: <Sparkles className="h-6 w-6 text-[#ff4c00]" />,
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
                Resume Builder
                <span className="block text-[#ff4c00]">Questions Answered</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "How does Flashfire optimize for ATS systems?",
                  a: "Flashfire structures your resume with proper headings, keyword placement, and formatting that ATS software can parse. We avoid complex layouts, graphics, and tables that confuse these systems.",
                },
                {
                  q: "Can I customize the generated resume?",
                  a: "Yes. Flashfire generates a tailored resume, but you can edit any section, add details, or adjust the tone. The AI provides a strong foundation you can personalize.",
                },
                {
                  q: "How many resume versions can I create?",
                  a: "As many as you need. Generate a new version for each role you&apos;re applying to. Flashfire saves all versions so you can reuse and modify them.",
                },
                {
                  q: "What file formats can I export?",
                  a: "Flashfire exports resumes in PDF and Word formats, optimized for both ATS systems and human recruiters. PDF is recommended for most job applications.",
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

