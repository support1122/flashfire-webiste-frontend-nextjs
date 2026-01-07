"use client";

import Navbar from "@/src/components/navbar/navbar";
import React, { useMemo, useState, useCallback } from "react";
import Footer from "@/src/components/footer/footer";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import { Users, Zap, TrendingUp, Briefcase, Brain, MessageSquareText, CheckCircle2 } from "lucide-react";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";

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
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

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
      window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
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
              Practice interviews with the
              <span className="text-[#ff4c00]"> FlashFire</span> edge
            </h1>

            <p className="mt-4 text-lg text-slate-700">
              Train with realistic interview questions, instant feedback, and
              sample answers tailored for real jobs.
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
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">
                Question {index + 1} of {QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-600">{progress}%</span>
            </div>

            <div className="mt-3 h-2 bg-[#ff4c00]/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff4c00]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold">{qa.q}</h2>

            <textarea
              className="mt-4 w-full min-h-[130px] rounded-2xl border border-[#ff4c00]/30 p-4 focus:ring-2 focus:ring-[#ff4c00]/30"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setChecked(true);
                  setShowSample(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#ff4c00] text-white hover:bg-[#e64500]"
              >
                Check Answer
              </button>

              <button
                onClick={() => {
                  setShowSample(true);
                  setChecked(false);
                }}
                className="px-4 py-2 rounded-xl border border-[#ff4c00]/40"
              >
                Show Sample
              </button>

              <div className="ml-auto flex gap-2">
                <button
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                  className="px-3 py-2 border border-[#ff4c00]/40 rounded-xl disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  disabled={index === QUESTIONS.length - 1}
                  onClick={() => setIndex(index + 1)}
                  className="px-3 py-2 border border-[#ff4c00]/40 rounded-xl disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            {checked && (
              <div className="mt-5 rounded-2xl bg-[rgba(251,240,235,1)] border border-[#ff4c00]/30 p-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Feedback</span>
                  <span className="text-[#ff4c00] font-semibold">
                    {result.label} · {result.score}/10
                  </span>
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
                  {qa.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {showSample && (
              <div className="mt-5 rounded-2xl border border-[#ff4c00]/30 p-4">
                <h3 className="font-semibold">Sample Answer</h3>
                <p className="mt-2 text-sm text-slate-700">{qa.a}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <section className="py-20 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        How FlashFire AI improves your interview answers
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
          title: "Understands the question deeply",
          desc: "FlashFire analyzes the intent behind each question so your answer stays focused on what interviewers actually want.",
        },
        {
          icon: MessageSquareText,
          title: "Guides your response structure",
          desc: "Get feedback on clarity, flow, and structure using proven frameworks like STAR and impact-driven storytelling.",
        },
        {
          icon: CheckCircle2,
          title: "Highlights what to improve",
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

      <HomePageHappyUsers />
    <HomePageFAQ />
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
