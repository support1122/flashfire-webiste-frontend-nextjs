"use client";

import {
  Brain,
  ClipboardList,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  FileText,
  BarChart3,
  Award,
  Clock,
  Shield,
  AlertCircle,
  Sparkles,
  Zap,
  GraduationCap,
  RefreshCw,
  Globe,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import { getLocalePrefix } from "@/src/utils/locale";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const normalizedBase = `${getLocalePrefix(window.location.pathname)}${basePath}`;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

const heroStats = [
  { icon: Target, value: "10 min", label: "Quick Assessment" },
  { icon: BarChart3, value: "AI", label: "Powered Analysis" },
  { icon: FileText, value: "PDF", label: "Detailed Report" },
  { icon: Award, value: "100%", label: "Personalized" },
];

const painPoints = [
  { text: "Feeling stuck in the wrong role", icon: AlertCircle },
  { text: "Uncertainty about skill development", icon: BarChart3 },
  { text: "Fear of choosing the wrong career", icon: AlertCircle },
  { text: "Confusion about market demand", icon: TrendingUp },
  { text: "Wasting time on ineffective certifications", icon: Clock },
  { text: "Struggling to align your passion with a practical career", icon: Target },
];

const stuckQuestions = [
  "Tired of guessing your next move?",
  "Unsure if your skills match the job market?",
  "Afraid of investing in the wrong career path?",
];

const timelineSteps = [
  {
    step: "1",
    icon: ClipboardList,
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
    icon: Brain,
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
    icon: Target,
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
    icon: FileText,
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
    icon: TrendingUp,
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
];

const beforeAfter = [
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
];

const betterReasons = [
  { text: "Powered by real-time job market data", icon: Target },
  { text: "Combines aptitude + skill-gap analysis", icon: Zap },
  { text: "Not just personality-based", icon: BarChart3 },
  { text: "Designed for real hiring environments", icon: Shield },
  { text: "Understand true career compatibility", icon: CheckCircle2 },
  { text: "Know exactly what to improve", icon: Sparkles },
  { text: "Make confident career decisions", icon: TrendingUp },
  { text: "Get personalized career paths tailored to your profile", icon: Award },
  { text: "Receive actionable next steps, not just insights", icon: FileText },
];

const keyBenefits = [
  { num: "01", title: "Eliminate Career Confusion", desc: "Clarity backed by AI insights." },
  { num: "02", title: "Identify Strengths & Weaknesses", desc: "Deep strengths and weaknesses analysis." },
  { num: "03", title: "Detect Skill Gaps Instantly", desc: "Precision-driven skill gap analysis tool." },
  { num: "04", title: "Avoid Wasted Learning Effort", desc: "Know what actually matters." },
  { num: "05", title: "Improve Job Market Alignment", desc: "Market-driven career mapping." },
  { num: "06", title: "Make Smarter Career Decisions", desc: "" },
];

const keyFeatures = [
  { title: "AI-Powered Career Aptitude Test", desc: "" },
  { title: "Advanced Skill Gap Analysis Tool", desc: "" },
  { title: "Personalized Career Path Assessment", desc: "" },
  { title: "Real-Time Skills Assessment for Jobs", desc: "" },
  { title: "Built-In Job Compatibility Test", desc: "" },
  { title: "Learning & Certification Recommendations", desc: "" },
  { title: "Downloadable Career Report", desc: "" },
  { title: "Beginner-Friendly Interface", desc: "" },
  { title: "Results in Under 10 Minutes", desc: "" },
];

const comparisonRows = [
  { feature: "Personalization", ai: "Dynamic AI-based", traditional: "Generic results" },
  { feature: "Skill Gap Analysis", ai: "Included", traditional: "Limited" },
  { feature: "Market Alignment", ai: "Real-time insights", traditional: "Static database" },
  { feature: "Career Suggestions", ai: "Multiple role matches", traditional: "Limited" },
  { feature: "Action Plan", ai: "Customized roadmap", traditional: "Basic output" },
  { feature: "Speed", ai: "Instant results", traditional: "Longer evaluation" },
];

const whoCanUse = [
  { label: "Fresh graduates", icon: GraduationCap },
  { label: "Entry-level professionals", icon: Users },
  { label: "Mid-career professionals", icon: Award },
  { label: "Career switchers", icon: RefreshCw },
  { label: "Students choosing a specialization", icon: GraduationCap },
  { label: "Professionals preparing for promotions", icon: TrendingUp },
  { label: "International job seekers", icon: Globe },
  { label: "Professionals returning after a career break", icon: RefreshCw },
];

const finalCtaPills = [
  "Gain instant career clarity",
  "Detect missing skills",
  "Build smarter career strategies",
  "Make confident decisions",
];

const faqs = [
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
];

export default function AICareerAssessmentPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const startAssessment = () =>
    updateCtaUrl("/ai-career-assessment-skill-gap-analysis", "Start Assessment");

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* HERO - Enhanced Professional Layout */}
        <section className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ff4c00]/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[#ff4c00]/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT - Content */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00] mb-6">
                  <Brain className="h-4 w-4" />
                  AI-Powered Career Intelligence
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
                  AI Career Assessment Test
                  <span className="block text-[#ff4c00] mt-2">for Skill Gap &amp; Career Path</span>
                </h1>

                <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Stop second-guessing your career decisions. Our AI analyzes your skills,
                  experience, and market demand to reveal your ideal career path and
                  missing skills in under 10 minutes.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {heroStats.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                      <div className="w-7 h-7 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-3.5 w-3.5 text-[#ff4c00]" />
                      </div>
                      <span className="text-slate-900 font-semibold text-sm">{item.value}</span>
                      <span className="text-slate-500 text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={startAssessment}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white hover:bg-[#e04400] border-2 border-[#ff4c00] hover:border-[#e04400] w-full sm:w-auto"
                  >
                    Start Assessment
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-slate-500 font-medium">Free &amp; takes under 10 minutes</span>
                </div>
              </div>

              {/* RIGHT - Preview Card */}
              <div className="order-1 lg:order-2">
                <div className="relative max-w-md mx-auto lg:max-w-none">
                  <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <pattern id="dots-hero-career" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#ff4c00" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#dots-hero-career)" />
                    </svg>
                  </div>

                  <div className="rounded-2xl border border-[#ff4c00]/20 bg-white p-5 sm:p-6 shadow-lg relative">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/30"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/20"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ff4c00]/10"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Career snapshot</span>
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-100">
                          AI-Powered
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {heroStats.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-4 flex justify-between items-center gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#ff4c00]/20 flex items-center justify-center flex-shrink-0">
                              <item.icon className="h-4 w-4 text-[#ff4c00]" />
                            </div>
                            <p className="text-xs text-slate-500">{item.label}</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4c00]/10 text-xs font-semibold text-[#ff4c00] border border-[#ff4c00]/20">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-5 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                      Our AI analyzes your skills, experience, personality, and market demand to
                      deliver a personalized career roadmap instantly.
                    </p>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100 z-20 hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                        <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">10 min</p>
                        <p className="text-xs text-slate-500">Quick Assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY - Clean Professional Bar */}
        <section className="bg-white py-8 md:py-10 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 md:gap-8 text-center">
              <p className="text-sm font-bold text-[#ff4c00] uppercase tracking-wider">
                Trusted by Growing Numbers of Professionals
              </p>
              <div className="hidden md:block h-px w-16 bg-[#ff4c00]/20"></div>
              <p className="text-base text-slate-600">
                Join thousands using our intelligent AI career assessment — used by professionals across industries • designed using real hiring data • built for modern career decision-making
              </p>
            </div>
          </div>
        </section>

        {/* WHY CAREER DECISIONS FEEL OVERWHELMING - Enhanced Bento Grid */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Problem
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Why Career Decisions Often Feel <span className="text-[#ff4c00]">Overwhelming</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Choosing the right career path isn&apos;t easy.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Problems Grid - Takes 3 columns */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-[#ff4c00]" />
                  </span>
                  Many professionals struggle with:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {painPoints.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#fff7f2] border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#ff4c00]/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <span className="text-slate-800 font-semibold text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Card - Takes 2 columns */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#ff4c00] to-[#ff6b2c] rounded-2xl p-6 md:p-8 text-white shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-3 mb-6">
                  <p className="font-bold text-lg">Feeling Stuck in Your Career Path?</p>
                  {stuckQuestions.map((q, i) => (
                    <p key={i} className="font-bold text-lg">{q}</p>
                  ))}
                </div>
                <p className="font-bold text-white">
                  Our intelligent career quiz eliminates this uncertainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Clean Timeline */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff7f2] border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Process
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Career Assessment Test Works</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Finding career clarity should feel simple — and now it is.
              </p>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6 md:space-y-8">
                {timelineSteps.map((item) => (
                  <div key={item.step} className="relative md:pl-20">
                    <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-2xl bg-[#ff4c00] text-white items-center justify-center text-xl font-bold shadow-lg border-4 border-white">
                      {item.step}
                    </div>
                    <div className="md:hidden w-12 h-12 rounded-xl bg-[#ff4c00] text-white flex items-center justify-center text-lg font-bold mb-4">
                      {item.step}
                    </div>

                    <div className="bg-[#fff7f2] rounded-2xl border border-slate-200 p-5 md:p-8 shadow-sm">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      {item.desc && <p className="text-base text-slate-600 mb-4">{item.desc}</p>}
                      {item.bullets && (
                        <div className="grid sm:grid-cols-2 gap-2 mb-4">
                          {item.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex items-center gap-2 rounded-lg px-3 py-2.5 bg-white border border-[#ff4c00]/10"
                            >
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-3">
                        {item.note && (
                          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#ff4c00] bg-white px-4 py-2 rounded-lg border border-[#ff4c00]/10">
                            <Sparkles className="h-4 w-4" />
                            {item.note}
                          </div>
                        )}
                        {item.cta && (
                          <button
                            type="button"
                            onClick={() =>
                              updateCtaUrl("/ai-career-assessment-skill-gap-analysis", item.cta as string)
                            }
                            className="inline-flex items-center gap-1 text-sm font-bold text-[#ff4c00] hover:text-[#e04400]"
                          >
                            {item.cta}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Transformation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Before vs After Using <span className="text-[#ff4c00]">AI Career Assessment</span>
              </h2>
            </div>

            <div className="space-y-4">
              {beforeAfter.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-4">
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Before
                    </span>
                    <p className="mt-1 text-sm sm:text-base text-slate-500">{item.before}</p>
                  </div>

                  <div className="flex items-center justify-center flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-[#ff4c00] flex items-center justify-center rotate-90 sm:rotate-0">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 rounded-xl border border-[#ff4c00]/20 bg-white p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ff4c00]">
                      After
                    </span>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-slate-900">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY THIS DELIVERS BETTER RESULTS - Feature Grid */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff7f2] border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                The Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Why This <span className="text-[#ff4c00]">AI Career Assessment</span> Delivers Better Results
              </h2>
              <p className="mt-4 text-base md:text-lg text-slate-600">
                Traditional tests give opinions. We deliver actionable intelligence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {betterReasons.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#fff7f2] border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY BENEFITS - Professional Card Grid */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Benefits
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {keyBenefits.map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 border border-[#ff4c00]/20 flex items-center justify-center mb-4">
                    <span className="text-[#ff4c00] font-bold text-sm">{item.num}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  {item.desc && <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES - Compact Card Grid */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff7f2] border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Features
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Key Features of Our <span className="text-[#ff4c00]">AI Career Assessment Tool</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {keyFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-[#fff7f2] p-5 md:p-6 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-5 w-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  {item.desc && <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - Modern Card Style */}
        <section className="bg-[#fff7f2] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                <span className="text-[#ff4c00]">AI Career Assessment</span> vs Traditional Career Tests
              </h2>
            </div>

            {/* Desktop / tablet table */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-base min-w-[600px]">
                  <thead>
                    <tr className="bg-[#fff7f2]">
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-900 text-left">Feature</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-[#ff4c00] text-left">AI Career Assessment</th>
                      <th className="px-4 md:px-6 py-4 md:py-5 font-bold text-slate-500 text-left">Traditional Career Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, idx) => (
                      <tr key={row.feature} className={idx % 2 === 0 ? "bg-white" : "bg-[#fffaf7]/50"}>
                        <td className="px-4 md:px-6 py-3 md:py-4 font-semibold text-slate-700">{row.feature}</td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-700">
                          <span className="inline-flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="h-3 w-3 text-[#ff4c00]" />
                            </div>
                            {row.ai}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-slate-500">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile stacked cards */}
            <div className="md:hidden space-y-4">
              {comparisonRows.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="font-bold text-slate-900 mb-3">{row.feature}</p>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-md uppercase tracking-wide flex-shrink-0">
                      AI Assessment
                    </span>
                    <p className="text-sm text-slate-700 font-medium text-right flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#ff4c00] flex-shrink-0" />
                      {row.ai}
                    </p>
                  </div>
                  <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wide flex-shrink-0">
                      Traditional
                    </span>
                    <p className="text-sm text-slate-500 text-right">{row.traditional}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-base text-slate-600">
              Modern decision-making requires smarter systems.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS - Tag Cloud Style */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff7f2] border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                For Everyone
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">Career Assessment Test</span>?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {whoCanUse.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-slate-700 font-semibold shadow-sm hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  <item.icon className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-base text-slate-600">
              Ideal for anyone seeking structured <span className="font-semibold text-[#ff4c00]">career evaluation test</span>.
            </p>
          </div>
        </section>

        {/* FINAL CTA - Split Layout */}
        <section className="relative py-16 md:py-24 bg-[#fff7f2] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT CONTENT */}
              <div className="text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                  Get Started
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Discover Your <span className="text-[#ff4c00]">Ideal Career Path</span> with AI
                </h2>

                <p className="text-base md:text-lg text-slate-600 mb-6">
                  Stop guessing your future. Identify your strengths. Fix your skill gaps.
                  Move forward with confidence.
                </p>

                <button
                  type="button"
                  onClick={startAssessment}
                  className="inline-flex items-center justify-center gap-2 bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#e04400] w-full sm:w-auto"
                >
                  Start Assessment
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                    <Clock className="h-4 w-4 text-[#ff4c00]" /> Instant results
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> No complex setup
                  </span>
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100">
                    <Shield className="h-4 w-4 text-[#ff4c00]" /> Secure &amp; confidential
                  </span>
                </div>
              </div>

              {/* RIGHT FEATURE PANEL */}
              <div className="bg-gradient-to-br from-white to-[#fffaf7] rounded-2xl border border-[#ff4c00]/15 p-6 md:p-8 shadow-lg">
                <div className="space-y-4">
                  {finalCtaPills.map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ff4c00]/20 to-[#ff4c00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-[#ff4c00]" />
                      </div>
                      <p className="font-bold text-slate-900 text-base md:text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-bold text-[#ff4c00] mb-4 uppercase tracking-wide">
                FAQ
              </span>
              <h2>
                Frequently Asked Questions
              </h2>
              <p>Everything you need to know about our AI career assessment</p>
            </div>

            <div className="ff-faq-list">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""}`}
                >
                  <button
                    className="ff-faq-question"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className="ff-faq-question-text">
                      {item.q}
                    </span>
                    <span className="ff-faq-icon">
                      {activeFaqIndex === i ? <X size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="ff-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
