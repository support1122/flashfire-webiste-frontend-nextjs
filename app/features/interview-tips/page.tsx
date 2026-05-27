"use client";

import Navbar from "@/src/components/navbar/navbar";
import React, { useMemo, useState, useCallback } from "react";
import Footer from "@/src/components/footer/footer";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import { Users, Zap, TrendingUp, Briefcase, Brain, MessageSquareText, CheckCircle2 } from "lucide-react";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import {
  User,
  GraduationCap,
  RefreshCw,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

type QA = { q: string; a: string; tips: string[] };

const QUESTIONS: QA[] = [
  {
    q: "Can you describe your experience with managing schedules and organizing meetings?",
    a: "I managed calendars across multiple stakeholders, resolved conflicts proactively, and ensured agendas and follow-ups were shared on time. This improved meeting efficiency and reduced rescheduling.",
    tips: [
      "Mention tools you used",
      "Explain prioritization logic",
      "Add measurable outcome",
    ],
  },
  {
    q: "Tell me about a time you handled a difficult stakeholder.",
    a: "I listened carefully to understand concerns, aligned on goals, and proposed clear options with trade-offs. This helped us reach agreement faster.",
    tips: ["Use STAR method", "Show communication skill", "Mention result"],
  },
  {
    q: "How do you prioritize tasks when everything is urgent?",
    a: "I assess impact vs urgency, clarify expectations with stakeholders, and focus on top priorities while communicating timelines clearly.",
    tips: ["Impact > urgency", "Clear communication", "Execution discipline"],
  },
];

function scoreAnswer(text: string) {
  const keywords = ["impact", "result", "stakeholder", "priority", "tool", "metric"];
  const hits = keywords.filter((k) => text.toLowerCase().includes(k)).length;
  const lengthScore = Math.min(3, Math.floor(text.length / 120));
  const score = Math.min(10, hits + lengthScore);

  let label = "Needs improvement";
  if (score >= 8) label = "Excellent";
  else if (score >= 6) label = "Strong";
  else if (score >= 4) label = "Good";

  return { score, label };
}

export default function FlashFireInterview() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const interviewFAQs = [
    {
      question: "What is AI interview practice, and how does it work?",
      answer: "AI interview practice uses artificial intelligence to simulate real interview questions and provide instant feedback. FlashFire's AI interview tool helps candidates practice mock interviews and prepare confidently for real interviews."
    },
    {
      question: "Is this an AI mock interview or real interview questions?",
      answer: "FlashFire offers AI mock interviews built from real job descriptions, allowing users to practice interview questions they are likely to face in actual interviews."
    },
    {
      question: "How does AI interview preparation help improve confidence?",
      answer: "AI interview preparation helps candidates practice repeatedly, receive instant feedback, and improve structure and clarity, leading to more confident interview performance."
    }
  ];

  const handleCTAClick = useCallback((label: string, location: string) => {
    const getLocal = (key: string, fallback: string) =>
      typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

    const utmSource = getLocal("utm_source", "WEBSITE");
    const utmMedium = getLocal("utm_medium", "Interview_Tips_Page");
    const utmCampaign = getLocal("utm_campaign", "Website");

    GTagUTM({
      eventName: "sign_up_click",
      label: `${location}_${label.replace(/\s+/g, "_")}`,
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    trackButtonClick(label, `${location}_cta`, "cta", {
      button_location: location,
      section: "interview_tips_page",
    });

    trackSignupIntent(`${location}_cta`, {
      signup_source: location,
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
    }
  }, []);

  const qa = QUESTIONS[index];
  const progress = Math.round(((index + 1) / QUESTIONS.length) * 100);
  const result = useMemo(() => scoreAnswer(answer), [answer]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[rgba(251,240,235,1)] px-4 py-14 text-slate-900">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ff4c00]/40 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#ff4c00]" />
              FlashFire AI Interview
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              AI Interview Practice Tool for <br />
              <span className="text-[#ff4c00]">Realistic Mock Interviews</span>
            </h1>

            <p className="mt-4 text-lg text-slate-700">
              FlashFire is an AI-powered interview tool that helps job seekers practice mock interviews, get instant feedback, and improve interview performance. Our AI interview preparation platform uses real interview questions to build confidence and clarity before the real interview.
            </p>

            <div className="mt-6 grid gap-4">
              {[
                "Answer real interview questions",
                "Get instant AI feedback",
                "Improve confidence & clarity",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#ff4c00]/30 bg-white p-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT MOCK BOX */}
          <div className="rounded-3xl border border-[#ff4c00]/40 bg-white p-6 shadow-sm">
  {/* Header */}
  <div className="flex justify-between items-center">
    <h3 className="text-lg font-bold text-slate-900">
      Interview Readiness Overview
    </h3>
    <span className="text-sm font-semibold text-[#ff4c00]">
      AI Assessment
    </span>
  </div>
  <p className="mt-3 text-sm text-slate-600">
    Get a real-time interview readiness score using our AI interview practice tool to identify strengths and improvement areas before your interview.
  </p>

  {/* Progress */}
  <div className="mt-5">
    <div className="flex justify-between text-sm text-slate-600">
      <span>Overall readiness</span>
      <span>72%</span>
    </div>
    <div className="mt-2 h-2 rounded-full bg-[#ff4c00]/15 overflow-hidden">
      <div className="h-full w-[72%] bg-[#ff4c00]" />
    </div>
  </div>

  {/* Skill Areas */}
  <div className="mt-6 grid grid-cols-2 gap-4">
    {[
      { label: "Communication", value: "Strong" },
      { label: "Problem Solving", value: "Good" },
      { label: "Confidence", value: "Average" },
      { label: "Structure", value: "Needs work" },
    ].map((item) => (
      <div
        key={item.label}
        className="rounded-2xl border border-[#ff4c00]/20 bg-[rgba(251,240,235,1)] p-4"
      >
        <p className="text-sm text-slate-600">{item.label}</p>
        <p className="mt-1 font-semibold text-slate-900">
          {item.value}
        </p>
      </div>
    ))}
  </div>

  {/* Insight */}
  <div className="mt-6 rounded-2xl bg-white border border-[#ff4c00]/30 p-4">
    <p className="text-sm text-slate-700">
      💡 <span className="font-semibold">AI Insight:</span>  
      Your answers are clear, but adding more real-world examples and metrics
      will significantly improve interview performance.
    </p>
  </div>
</div>

        </div>
      </div>

      
      <section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        How Our AI Interview Tool Improves Mock Interview Performance
      </h2>
      <p className="mt-4 text-slate-700 text-lg">
        Practice isn’t just about answering questions — it’s about refining
        how you think, structure, and communicate under pressure.
      </p>
    </div>

    {/* Steps */}
    <div className="mt-14 grid md:grid-cols-3 gap-8">
      {[
        {
          icon: Brain,
          title: "Understands Real Interview Questions Using AI",
          desc: "FlashFire analyzes the intent behind each question so your answer stays focused on what interviewers actually want.",
        },
        {
          icon: MessageSquareText,
          title: "Structures Answers for Mock Interviews Using Proven Frameworks",
          desc: "Get feedback on clarity, flow, and structure using proven frameworks like STAR and impact-driven storytelling.",
        },
        {
          icon: CheckCircle2,
          title: "AI Feedback to Improve Mock Interview Answers",
          desc: "Instantly see what’s missing — metrics, examples, or clarity — and improve before the real interview.",
        },
      ].map(({ icon: Icon, title, desc }, idx) => (
        <div
          key={title}
          className="relative rounded-3xl border border-[#ff4c00]/30 bg-[rgba(251,240,235,1)] p-8 shadow-sm hover:shadow-md transition"
        >
          {/* Step number */}
          <div className="absolute -top-4 -left-4 h-10 w-10 rounded-xl bg-[#ff4c00] text-white flex items-center justify-center font-bold shadow">
            {idx + 1}
          </div>

          {/* Icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00]/15">
            <Icon className="h-6 w-6 text-[#ff4c00]" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-slate-900">
            {title}
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
   {/* TRUSTED BY – DETAILED ICON CARDS */}
<section className="py-16 px-4 bg-[rgba(251,240,235,1)]">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Trusted by job seekers worldwide
      </h2>
      <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
        FlashFire’s AI interview practice helps candidates prepare smarter,
        improve faster, and perform better in real interviews.
      </p>
    </div>

    {/* Stats Cards */}
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: Users,
          value: "1.1M+",
          label: "Answers practiced",
          desc: [
            "Real interview-style questions",
            "Practiced across roles & levels",
            "Built from real job descriptions",
          ],
        },
        {
          icon: TrendingUp,
          value: "92%",
          label: "Confidence boost",
          desc: [
            "Clear structure & guidance",
            "Reduced interview anxiety",
            "More confident responses",
          ],
        },
        {
          icon: Zap,
          value: "3×",
          label: "Faster preparation",
          desc: [
            "No guesswork in answers",
            "Instant feedback after each response",
            "Focused improvement areas",
          ],
        },
        {
          icon: Briefcase,
          value: "50+",
          label: "Job roles covered",
          desc: [
            "Tech, product & analytics",
            "Business & operations roles",
            "Entry to experienced levels",
          ],
        },
      ].map(({ icon: Icon, value, label, desc }) => (
        <div
        key={label}
        className="rounded-3xl bg-white border border-[#ff4c00]/30 p-6 shadow-sm hover:shadow-md transition text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00]/10">
          <Icon className="h-6 w-6 text-[#ff4c00]" />
        </div>
      
        {/* Stat */}
        <div className="text-3xl font-extrabold text-slate-900">
          {value}
        </div>
      
        {/* Heading */}
        <div className="mt-1 text-sm font-semibold text-slate-700">
          {label}
        </div>
      
        {/* Description */}
        <ul className="mt-4 space-y-2 text-sm text-slate-700 text-left">
          {desc.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff4c00]" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      
      ))}
    </div>
  </div>
    
</section>
 
<section className="relative py-16 sm:py-20 bg-[#fff8f5] overflow-hidden">
      {/* subtle background accent */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#ffe7de] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex px-4 py-1.5 rounded-full 
            bg-white border border-[#ffd6c6] text-[#c2410c] text-sm font-semibold">
            AI Interview Practice
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Who Is This AI Interview Practice Tool For?
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-700">
            FlashFire is built for people who want structured interview practice,
            instant AI feedback, and confidence before real interviews.
          </p>
        </div>

        {/* Feature list */}
        <div className="space-y-6">

          {/* Active Job Seekers */}
          <div className="flex gap-5 rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-[#fff1ea] border border-[#ffd6c6]
                flex items-center justify-center text-[#f97316]">
                <User size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Active Job Seekers
              </h3>
              <p className="mt-1 text-gray-600">
                Practice interviews regularly with focused questions and actionable AI feedback.
              </p>
            </div>
          </div>

          {/* Freshers */}
          <div className="flex gap-5 rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-[#fff1ea] border border-[#ffd6c6]
                flex items-center justify-center text-[#f97316]">
                <GraduationCap size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Freshers & Students
              </h3>
              <p className="mt-1 text-gray-600">
                Learn how to answer confidently and professionally in your first interviews.
              </p>
            </div>
          </div>

          {/* Career Switchers */}
          <div className="flex gap-5 rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-[#fff1ea] border border-[#ffd6c6]
                flex items-center justify-center text-[#f97316]">
                <RefreshCw size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Career Switchers
              </h3>
              <p className="mt-1 text-gray-600">
                Prepare for new roles or industries with role-specific interview practice.
              </p>
            </div>
          </div>

          {/* Confidence Builders */}
          <div className="flex gap-5 rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-[#fff1ea] border border-[#ffd6c6]
                flex items-center justify-center text-[#f97316]">
                <MessageCircle size={20} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confidence Builders
              </h3>
              <p className="mt-1 text-gray-600">
                Improve clarity, structure, and confidence before high-pressure interviews.
              </p>
            </div>
          </div>

          {/* Highlight */}
          <div className="rounded-2xl bg-gradient-to-r from-[#fff1ea] to-white
            border border-[#ffd6c6] p-7">
            <div className="flex items-center gap-3 mb-2 text-[#f97316]">
              <Sparkles size={20} />
              <h3 className="text-xl font-bold text-gray-900">
                Anyone serious about interview success
              </h3>
            </div>
            <p className="text-gray-700">
              Ideal for candidates who want realistic mock interviews, instant insights,
              and measurable improvement — all in one place.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-14 text-center">
          <p className="text-sm font-semibold text-[#c2410c]">
            Practice smarter. Improve faster. Perform better.
          </p>
        </div>

      </div>
    </section>

      <HomePageHappyUsers />
      
      {/* ================= FAQ ================= */}
      <section id="faq" className={faqStyles.faqSection}>
        <div id="faq-header" className={faqStyles.header}>
          <h2>FAQs About Our AI Interview Practice & Mock Interview Tool</h2>
          <p>
            We get it, AI interview practice can sound complex. Here's everything
            explained, plain and simple.
          </p>
        </div>

        <div className={faqStyles.faqContainer}>
          {interviewFAQs.map((faq, index) => (
            <div
              key={index}
              className={`${faqStyles.faqItem} ${
                activeFaqIndex === index ? faqStyles.active : ""
              }`}
            >
              <button
                className={faqStyles.faqQuestion}
                onClick={() => handleFaqToggle(index)}
              >
                <span>{faq.question}</span>
                <span className={faqStyles.icon}>
                  {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                </span>
              </button>

              {activeFaqIndex === index && (
                <div className={faqStyles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* MID PAGE CTA */}
      <section className="bg-[#fcf7f4] text-slate-900 py-18 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Ready to practice like it’s game day?
          </h2>
          <p className="mt-2 text-slate-700">
            Start a mock interview now and refine your answers instantly.
          </p>
          <button
            {...getButtonProps()}
            onClick={() => handleCTAClick("Start Free Practice", "interview_tips_mid_cta")}
            className="mt-5 px-6 py-3 bg-[#ff4c00] text-white shadow-[0_3px_0_black] font-semibold rounded-xl hover:bg-[#e64500]">
            Start Free Practice
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
