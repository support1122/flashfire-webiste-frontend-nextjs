"use client";

import { Brain, ClipboardList, TrendingUp, Target, Users, CheckCircle2, ArrowRight, FileText, BarChart3, Award, Clock, Shield } from "lucide-react";
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

export default function AICareerAssessmentPage() {
  const ctaLabel = "Start Assessment";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff7f2] via-[#fff7f2] to-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                AI Career Assessment Test for Skill Gap & Career Path
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-4 leading-relaxed">
                Stop second-guessing your career decisions. Discover your ideal career path, strengths, and missing skills in under 10 minutes.
              </p>
              <p className="text-base text-slate-600 mb-10 max-w-2xl mx-auto">
                Our career assessment test, powered by advanced AI career assessment, analyzes your skills, experience, personality, and market demand to deliver a personalized career roadmap instantly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 max-w-2xl mx-auto">
                {[
                  "Get accurate career recommendations",
                  "Identify your professional strengths",
                  "Detect critical skill gaps",
                  "Make smarter career decisions",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => updateCtaUrl("/ai-career-assessment-skill-gap-analysis", ctaLabel)}
                className="inline-flex items-center rounded-lg bg-[#ff4c00] text-white px-8 py-3.5 text-base font-semibold hover:bg-[#e24400] transition-colors shadow-lg hover:shadow-xl"
              >
                {ctaLabel}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">
                Trusted by Growing Numbers of Professionals
              </p>
              <p className="text-lg md:text-xl text-slate-900 mb-6 font-semibold">
                Join thousands using our intelligent: <span className="text-[#ff4c00]">AI career assessment</span>
              </p>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#ff4c00]" />
                  <span>Used by professionals across industries</span>
                </div>
                <span className="hidden md:inline text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#ff4c00]" />
                  <span>Designed using real hiring data</span>
                </div>
                <span className="hidden md:inline text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#ff4c00]" />
                  <span>Built for modern career decision-making</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Career Decisions Feel Overwhelming */}
        <section className="py-14 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Why Career Decisions Often Feel Overwhelming
              </h2>
              <p className="text-base text-slate-700 mb-5 text-center">
                Choosing the right career path isn't easy. Many professionals struggle with:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {[
                  "Feeling stuck in the wrong role",
                  "Uncertainty about skill development",
                  "Fear of choosing the wrong career",
                  "Confusion about market demand",
                  "Wasting time on ineffective certifications",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-white rounded-lg border border-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] mt-1.5 flex-shrink-0"></div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-5 border border-[#ff4c00]/20">
                <p className="text-sm text-slate-700 mb-2">
                  <span className="font-semibold">Tired of guessing your next move?</span>
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <span className="font-semibold">Unsure if your skills match the job market?</span>
                </p>
                <p className="text-sm text-slate-700 mb-3">
                  <span className="font-semibold">Afraid of investing in the wrong career path?</span>
                </p>
                <p className="text-sm font-semibold text-[#ff4c00]">
                  Our intelligent career quiz eliminates this uncertainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                How Our <span className="text-[#ff4c00]">AI Career Assessment Test Works</span>
              </h2>
              <p className="text-base text-slate-700">
                Finding career clarity should feel simple — and now it is.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Complete Your Profile",
                  desc: "Tell us about yourself.",
                  bullets: [
                    "Education background",
                    "Current skills",
                    "Work experience (if any)",
                    "Career interests & goals",
                  ],
                  note: "This builds the foundation for your career aptitude test.",
                  cta: "Start Your Career Test Now",
                },
                {
                  step: "2",
                  title: "AI Career & Skills Analysis",
                  desc: "Our engine performs a comprehensive:",
                  bullets: [
                    "skills assessment test",
                    "Great skills assessment for jobs",
                    "Strength & capability evaluation",
                    "Personality & preference mapping",
                    "Market-aligned role matching",
                  ],
                },
                {
                  step: "3",
                  title: "Career Aptitude & Interest Mapping",
                  desc: "Unlike generic tools, our system conducts:",
                  bullets: [
                    "Intelligent career aptitude test",
                    "Deep career interest assessment",
                    "personality career test",
                    "Identifies suitable industries",
                    "Suggests ideal career paths",
                    "Aligns skills with hiring demand",
                  ],
                },
                {
                  step: "4",
                  title: "Skill Gap Analysis Report",
                  desc: "Our skill gap analysis tool reveals:",
                  bullets: [
                    "Which skills are holding you back",
                    "Missing competencies",
                    "Growth opportunities",
                    "Highlights critical gaps",
                    "Recommends certifications & training",
                    "Suggests practical improvement paths",
                  ],
                  cta: "Get Your Skill Gap Report",
                },
                {
                  step: "5",
                  title: "Personalized Career Action Plan",
                  desc: "Receive a structured roadmap.",
                  bullets: [
                    "Career growth strategy",
                    "Resume improvement guidance",
                    "Recommended job roles",
                    "Learning & development plan",
                  ],
                  note: "Built for smarter career planning assessment.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white rounded-lg border border-slate-200 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-700 mb-3">{item.desc}</p>
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-2 mb-3">
                          {item.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <p className="text-sm font-medium text-[#ff4c00] mt-2">{item.note}</p>
                      )}
                      {item.cta && (
                        <button
                          type="button"
                          onClick={() => updateCtaUrl("/ai-career-assessment-skill-gap-analysis", item.cta)}
                          className="mt-2 text-sm font-semibold text-[#ff4c00] hover:underline"
                        >
                          {item.cta} →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before vs After */}
        <section className="py-14 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Before vs After Using AI Career Assessment
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  before: "Confused about career direction",
                  after: "Clear roadmap + skill improvement plan",
                },
                {
                  before: "Guessing which skills to learn",
                  after: "Precise skill-gap insights",
                },
                {
                  before: "Uncertain career decisions",
                  after: "Data-backed career clarity",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg border border-slate-200 p-5">
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-500 mb-1.5">Before:</p>
                    <p className="text-sm text-slate-700">{item.before}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs font-semibold text-[#ff4c00] mb-1.5">After:</p>
                    <p className="text-sm font-semibold text-slate-900">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Delivers Better Results */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Why This AI Career Assessment Delivers Better Results
              </h2>
              <p className="text-base text-slate-700 mb-6 text-center">
                Traditional tests give opinions. We deliver actionable intelligence.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Powered by real-time job market data",
                  "Combines aptitude + skill-gap analysis",
                  "Not just personality-based",
                  "Designed for real hiring environments",
                  "Understand true career compatibility",
                  "Know exactly what to improve",
                  "Make confident career decisions",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[#fff7f2] rounded-lg border border-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-14 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Key Benefits at a Glance
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Eliminate Career Confusion",
                  desc: "Clarity backed by AI insights.",
                },
                {
                  title: "Identify Strengths & Weaknesses",
                  desc: "Deep strengths and weaknesses analysis.",
                },
                {
                  title: "Detect Skill Gaps Instantly",
                  desc: "Precision-driven skill gap analysis tool.",
                },
                {
                  title: "Avoid Wasted Learning Effort",
                  desc: "Know what actually matters.",
                },
                {
                  title: "Improve Job Market Alignment",
                  desc: "Market-driven career mapping.",
                },
                {
                  title: "Make Smarter Career Decisions",
                  desc: "",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg border border-slate-200 p-4">
                  <div className="text-xl font-bold text-[#ff4c00] mb-2">{i + 1}</div>
                  <h3 className="text-base font-semibold mb-1.5">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Key Features of Our AI Career Assessment Tool
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "AI-Powered Career Aptitude Test",
                "Advanced Skill Gap Analysis Tool",
                "Personalized Career Path Assessment",
                "Real-Time Skills Assessment for Jobs",
                "Built-In Job Compatibility Test",
                "Learning & Certification Recommendations",
                "Downloadable Career Report",
                "Beginner-Friendly Interface",
                "Results in Under 10 Minutes",
              ].map((feature, i) => (
                <div key={i} className="bg-[#fff7f2] rounded-lg border border-slate-200 p-3">
                  <p className="text-sm font-medium text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-14 bg-[#fff7f2]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              AI Career Assessment vs Traditional Career Tests
            </h2>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#fff7f2]">
                      <th className="text-left p-3 font-semibold text-slate-900 text-sm">Feature</th>
                      <th className="text-left p-3 font-semibold text-slate-900 text-sm">AI Career Assessment</th>
                      <th className="text-left p-3 font-semibold text-slate-900 text-sm">Traditional Career Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: "Personalization",
                        ai: "Dynamic AI-based",
                        traditional: "Generic results",
                      },
                      {
                        feature: "Skill Gap Analysis",
                        ai: "Included",
                        traditional: "Limited",
                      },
                      {
                        feature: "Market Alignment",
                        ai: "Real-time insights",
                        traditional: "Static database",
                      },
                      {
                        feature: "Career Suggestions",
                        ai: "Multiple role matches",
                        traditional: "Limited",
                      },
                      {
                        feature: "Action Plan",
                        ai: "Customized roadmap",
                        traditional: "Basic output",
                      },
                      {
                        feature: "Speed",
                        ai: "Instant results",
                        traditional: "Longer evaluation",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="p-3 font-medium text-slate-700 text-sm">{row.feature}</td>
                        <td className="p-3 text-slate-700 text-sm">{row.ai}</td>
                        <td className="p-3 text-slate-600 text-sm">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600 mt-5">
              Modern decision-making requires smarter systems.
            </p>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Who Can Use This Career Assessment Test?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Students choosing a specialization",
                "Professionals preparing for promotions",
                "International job seekers",
              ].map((item, i) => (
                <div key={i} className="bg-[#fff7f2] rounded-lg border border-slate-200 p-3 text-center">
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-600 mt-5">
              Ideal for anyone seeking structured: <span className="font-semibold text-[#ff4c00]">career evaluation test</span>
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Discover Your Ideal Career Path with AI
            </h2>
            <p className="text-base text-slate-700 mb-6 max-w-2xl mx-auto">
              Stop guessing your future. Identify your strengths. Fix your skill gaps. Move forward with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm text-slate-700">
              <span>Gain instant career clarity</span>
              <span>•</span>
              <span>Detect missing skills</span>
              <span>•</span>
              <span>Build smarter career strategies</span>
              <span>•</span>
              <span>Make confident decisions</span>
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-career-assessment-skill-gap-analysis", ctaLabel)}
              className="inline-flex items-center justify-center rounded-lg bg-[#ff4c00] text-white px-8 py-3 text-base font-semibold hover:bg-[#e24400] transition-colors shadow-lg mb-5"
            >
              {ctaLabel}
              <ArrowRight size={18} className="ml-2" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
              <span>Instant results</span>
              <span>•</span>
              <span>No complex setup</span>
              <span>•</span>
              <span>Secure & confidential</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#f9e8e0]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                FAQs
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "What is an AI career assessment test?",
                  a: "An AI career assessment uses intelligent algorithms to evaluate your skills, strengths, and career compatibility.",
                },
                {
                  q: "How does a skill gap analysis tool work?",
                  a: "A skill gap analysis tool compares your profile with job requirements to identify missing competencies.",
                },
                {
                  q: "Is this career aptitude test accurate?",
                  a: "Yes. Our career aptitude test uses advanced AI models.",
                },
                {
                  q: "How long does the assessment take?",
                  a: "Most users finish the career assessment test in under 10 minutes.",
                },
                {
                  q: "Will I receive a career report?",
                  a: "Yes. Get a structured, downloadable career analysis report.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy & security are core priorities.",
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
