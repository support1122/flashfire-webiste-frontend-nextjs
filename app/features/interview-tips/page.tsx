"use client";

import React, { useCallback, useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  MessageSquareText,
  Shield,
  Target,
  Users,
  Zap,
  X,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function FlashFireInterview() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const interviewFAQs = [
    {
      question: "What is AI interview practice, and how does it work?",
      answer:
        "AI interview practice uses artificial intelligence to simulate real interview questions and provide instant feedback. FlashFire's AI interview tool helps candidates practice mock interviews and prepare confidently for real interviews.",
    },
    {
      question: "Is this an AI mock interview or real interview questions?",
      answer:
        "FlashFire offers AI mock interviews built from real job descriptions, allowing users to practice interview questions they are likely to face in actual interviews.",
    },
    {
      question: "How does AI interview preparation help improve confidence?",
      answer:
        "AI interview preparation helps candidates practice repeatedly, receive instant feedback, and improve structure and clarity, leading to more confident interview performance.",
    },
    {
      question: "How does FlashFire personalize interview questions?",
      answer:
        "FlashFire generates questions based on your job title, experience level, and target position, so every practice session matches the interviews you're actually preparing for.",
    },
    {
      question: "Can I practice interviews for different job roles?",
      answer:
        "Yes. You can switch between roles, industries, and experience levels, and FlashFire will adjust the questions to match each target position.",
    },
    {
      question: "Will I receive feedback after every answer?",
      answer:
        "Yes. FlashFire gives instant feedback after each answer, highlighting what worked well and what to improve before your next attempt.",
    },
    {
      question: "Can I practice behavioral and technical interviews?",
      answer:
        "Yes. FlashFire supports both behavioral questions using frameworks like STAR and technical questions specific to your role.",
    },
    {
      question: "Does FlashFire help improve communication skills?",
      answer:
        "Yes. Feedback covers clarity, structure, and delivery, helping you communicate your answers more confidently and effectively.",
    },
    {
      question: "How do interview readiness scores work?",
      answer:
        "Your readiness score is based on your communication, confidence, and answer quality across practice sessions, so you can track how prepared you are over time.",
    },
    {
      question: "Can fresh graduates use FlashFire?",
      answer:
        "Yes. FlashFire is built for fresh graduates as well as experienced professionals, adjusting question difficulty to your experience level.",
    },
    {
      question: "Can I practice unlimited interviews?",
      answer:
        "Yes. You can run as many practice sessions as you need until you feel confident and ready for the real interview.",
    },
    {
      question: "Can I track my improvement over time?",
      answer:
        "Yes. FlashFire tracks your performance across sessions so you can see how your communication, confidence, and answer quality improve.",
    },
    {
      question: "Is FlashFire suitable for experienced professionals?",
      answer:
        "Yes. Experienced professionals and management candidates can use FlashFire to prepare for leadership and senior-level interview questions.",
    },
  ];

  const featureCards = [
    {
      icon: Brain,
      title: "Practice Questions That Match Your Role",
      desc:
        "Get interview questions based on your job title, experience level, and target position.",
    },
    {
      icon: MessageSquareText,
      title: "Build Better Interview Answers",
      desc:
        "Improve answer structure using frameworks like STAR while keeping your responses natural and relevant.",
    },
    {
      icon: CheckCircle,
      title: "Instant Feedback After Every Answer",
      desc:
        "Discover where you need stronger examples, clearer communication, or better storytelling before the real interview.",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Practice Anytime",
      desc: "Prepare before interviews whenever you want.",
    },
    {
      icon: MessageSquareText,
      title: "Improve Answer Quality",
      desc: "Learn how to communicate clearly and confidently.",
    },
    {
      icon: Shield,
      title: "Reduce Interview Anxiety",
      desc: "Practice repeatedly until your answers feel natural.",
    },
    {
      icon: Target,
      title: "Track Progress",
      desc: "See how your interview performance improves over time.",
    },
  ];

  const comparisonRows = [
    { alone: "No structured feedback", flashfire: "Instant answer feedback" },
    { alone: "Unsure if answers are good", flashfire: "Clear improvement suggestions" },
    { alone: "Hard to measure progress", flashfire: "Interview readiness tracking" },
    { alone: "Generic preparation", flashfire: "Role-specific interview questions" },
    { alone: "Limited practice", flashfire: "Unlimited interview sessions" },
  ];

  const howItWorksSteps = [
    {
      icon: Target,
      title: "Choose Your Job Role",
      desc: "Select your target position and experience level.",
    },
    {
      icon: MessageSquareText,
      title: "Practice Interview Questions",
      desc: "Answer realistic interview questions based on your role.",
    },
    {
      icon: CheckCircle,
      title: "Review Feedback & Improve",
      desc: "Receive actionable suggestions and continue practicing until you're confident.",
    },
  ];

  const stats = [
    {
      value: "1.1M+",
      label: "QUESTIONS PRACTICED",
      bullets: ["Real interview-style questions", "Practiced across roles & levels", "Built from real job descriptions"],
    },
    {
      value: "92%",
      label: "INTERVIEW READINESS SCORE",
      bullets: ["Clear structure & guidance", "Reduced interview anxiety", "More confident responses"],
    },
    {
      value: "50+",
      label: "PRACTICE SESSIONS COMPLETED",
      bullets: ["No guesswork in answers", "Instant feedback after each response", "Focused improvement areas"],
    },
    {
      value: "3x",
      label: "CONFIDENCE IMPROVEMENT",
      bullets: ["Tech, product & analytics", "Business & operations roles", "Entry to experienced levels"],
    },
  ];

  const audience = [
    {
      title: "Fresh Graduates",
      desc: "Learn how to answer confidently and professionally in your first interviews.",
    },
    {
      title: "Career Switchers",
      desc: "Reposition your experience and practice answering questions for a new role or industry.",
    },
    {
      title: "Experienced Professionals",
      desc: "Sharpen your answers for senior-level and leadership interview questions.",
    },
    {
      title: "Technical Candidates",
      desc: "Practice technical and behavioral questions specific to your domain.",
    },
    {
      title: "Management Professionals",
      desc: "Prepare for leadership, strategy, and people-management interview questions.",
    },
    {
      title: "Anyone Preparing for Interviews",
      desc: "Build confidence and clarity before any interview, at any career stage.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

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

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Interview Practice Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/interview-tips",
    description: "Practice mock interviews with FlashFire's AI interview tool. Get instant feedback, improve answers, and prepare confidently for real interviews.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "74" },
  };

  const faqSchemaInterview = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: interviewFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "AI Interview Practice", item: "https://www.flashfirejobs.com/features/interview-tips" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaInterview) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-gradient-to-b from-orange-50 via-white to-white px-4 py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1220px] items-center gap-8 lg:grid-cols-[250px_minmax(0,1fr)_270px]">
            <div className="order-2 grid gap-2 sm:grid-cols-2 lg:order-1 lg:block lg:space-y-6">
              {[
                { label: "Practice role-specific interview questions", offset: "lg:ml-10" },
                { label: "Instant answer feedback", offset: "lg:ml-0" },
                { label: "Improve communication & confidence", offset: "lg:ml-14" },
                { label: "Track interview readiness", offset: "lg:ml-4" },
              ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex min-h-[42px] w-full items-center justify-center rounded-full border border-gray-100 bg-white px-4 text-center text-[15px] font-extrabold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:w-fit lg:min-w-[176px] ${item.offset}`}
                  >
                    {item.label}
                  </div>
                ))}
            </div>

            <div className="order-1 text-center lg:order-2">
              <span className="mb-5 inline-flex rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
                # Personalized Interview Practice
              </span>
              <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-normal text-gray-900 sm:text-[43px]">
                Practice Real Interview Questions
                <br />
                and Perform With Confidence
              </h1>
              <p className="mx-auto mt-6 max-w-[680px] text-[17px] font-medium leading-8 text-gray-600">
                Practice interview questions tailored to your target role, receive instant feedback
                on your answers, and improve your communication, structure, and confidence before
                every interview.
              </p>
              <button
                {...getButtonProps()}
                onClick={() => handleCTAClick("Start Interview Practice", "interview_tips_hero")}
                className="mt-8 inline-flex h-[46px] min-w-[210px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-7 text-[14px] font-bold text-white shadow-lg shadow-orange-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start Interview Practice
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="order-3">
              <ReadinessCard />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[980px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
                Everything You Need to Prepare for Interviews
              </h2>
              <p className="mx-auto mt-5 max-w-[660px] text-[15px] font-medium leading-7 text-gray-600">
                Practice realistic interview questions, improve your answers with actionable
                feedback, and walk into every interview with greater confidence.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-9 md:grid-cols-3">
              {featureCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="h-full min-h-[210px] min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                      <Icon size={21} />
                    </span>
                    <h3 className="text-[16px] font-extrabold leading-6 text-gray-900">{item.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-gray-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-orange-50/40 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
                Helping Job Seekers Prepare for Better Interviews
              </h2>
              <p className="mt-6 text-[16px] font-medium text-gray-600">
                Practice consistently and track real improvement in every interview session
              </p>
            </div>

            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={`${stat.value}-${stat.label}`}
                  className="h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white px-7 py-7 shadow-md transition-shadow hover:shadow-lg"
                >
                  <p className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] bg-clip-text text-center text-[36px] font-extrabold leading-none text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-center text-[10px] font-extrabold uppercase text-gray-600">
                    {stat.label}
                  </p>
                  <ul className="mt-5 space-y-2 text-[12px] font-medium leading-5 text-gray-600">
                    {stat.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff4c00]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[960px]">
            <div className="mb-12 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
                Who Can Benefit From Interview Practice?
              </h2>
              <p className="mx-auto mt-5 max-w-[660px] text-[15px] font-medium leading-7 text-gray-600">
                Whether you&apos;re preparing for your first interview or your next leadership
                role, FlashFire helps you practice smarter and improve every answer.
              </p>
            </div>

            <div className="mx-auto grid max-w-[940px] auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {audience.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[128px] min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white px-7 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                    <Users size={22} strokeWidth={2.5} />
                  </span>
                  <h3 className="text-[17px] font-extrabold leading-tight text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-6 text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-orange-50/40 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[980px]">
            <h2 className="mb-14 text-center text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
              Why Job Seekers Practice With FlashFire
            </h2>
            <div className="grid auto-rows-fr gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                      <Icon size={21} />
                    </span>
                    <h3 className="text-[16px] font-extrabold leading-6 text-gray-900">{item.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-gray-600">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <h2 className="mb-14 text-center text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
              FlashFire vs Practicing Alone
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 bg-gradient-to-r from-[#ff4c00] to-[#ff7a33]">
                <div className="border-r border-white/20 px-2 py-3 text-center text-[11px] font-extrabold text-white sm:px-6 sm:py-4 sm:text-[14px]">
                  Practicing Alone
                </div>
                <div className="px-2 py-3 text-center text-[11px] font-extrabold text-white sm:px-6 sm:py-4 sm:text-[14px]">
                  FlashFire
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {comparisonRows.map((row, index) => (
                  <div
                    key={row.alone}
                    className={`grid grid-cols-2 transition-colors hover:bg-orange-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    <div className="flex items-start gap-1.5 border-r border-gray-200 px-2 py-3 text-[11px] font-medium leading-snug text-gray-600 sm:items-center sm:gap-2 sm:px-6 sm:py-4 sm:text-[13px]">
                      <X size={14} className="mt-0.5 shrink-0 text-red-500 sm:mt-0 sm:h-4 sm:w-4" />
                      {row.alone}
                    </div>
                    <div className="flex items-start gap-1.5 px-2 py-3 text-[11px] font-medium leading-snug text-gray-900 sm:items-center sm:gap-2 sm:px-6 sm:py-4 sm:text-[13px]">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#ff4c00] sm:mt-0 sm:h-4 sm:w-4" />
                      {row.flashfire}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-orange-50/40 px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[980px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-gray-900 sm:text-[42px]">
                Practice Interviews in 3 Simple Steps
              </h2>
              <p className="mx-auto mt-5 max-w-[660px] text-[15px] font-medium leading-7 text-gray-600">
                Choose your target role, answer interview questions, receive feedback, and keep
                improving until you&apos;re interview-ready.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-9 md:grid-cols-3">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                      <Icon size={21} />
                    </span>
                    <p className="mb-2 text-[11px] font-extrabold uppercase text-[#ff4c00]">
                      Step {index + 1}
                    </p>
                    <h3 className="text-[16px] font-extrabold leading-6 text-gray-900">{step.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-gray-600">{step.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <TestimonialVideoSection />

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Interview Practice</h2>
            <p>
              We get it, AI interview practice can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {interviewFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
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

        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[34px] font-extrabold leading-tight text-gray-900">
              Ready for Your Next Interview?
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-medium leading-7 text-gray-600">
              Practice real interview questions, improve every answer with instant feedback, and
              walk into interviews with confidence.
            </p>
            <button
              {...getButtonProps()}
              onClick={() => handleCTAClick("Start Free Interview Practice", "interview_tips_final_cta")}
              className="mt-8 inline-flex h-[46px] min-w-[190px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-7 text-[14px] font-bold text-white shadow-lg shadow-orange-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start Free Interview Practice
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ReadinessCard() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-extrabold text-gray-900">Track Your Interview Progress</h3>
        <span className="text-[8px] font-extrabold text-[#ff4c00]">AI Assessment</span>
      </div>
      <p className="text-[8px] font-medium leading-4 text-gray-600">
        Monitor your communication, confidence, answer quality, and interview readiness after
        every practice session.
      </p>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-[8px] font-medium text-gray-600">
          <span>Overall readiness</span>
          <span>72%</span>
        </div>
        <div className="h-1.5 rounded-full bg-orange-100">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33]" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Communication", "Strong"],
          ["Problem Solving", "Good"],
          ["Confidence", "Average"],
          ["Structure", "Needs work"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-orange-100 bg-orange-50 p-3">
            <p className="text-[8px] font-medium text-gray-600">{label}</p>
            <p className="mt-1 text-[8px] font-extrabold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-orange-100 bg-white p-3">
        <p className="text-[8px] font-medium leading-4 text-gray-600">
          <strong className="text-[#ff4c00]">AI Insight:</strong> Add more examples and metrics to
          improve interview performance.
        </p>
      </div>
    </div>
  );
}

function TestimonialVideoSection() {
  return (
    <>
      <HomePageHappyUsers
        variant="pricing"
        heading="See How Job Seekers Improved Their Interview Performance"
        headingClassName="mb-[560px] max-w-[430px] text-[38px] font-black leading-[1.1] tracking-[-0.02em] text-white max-[1024px]:mb-[420px] max-[1024px]:text-[32px] max-[768px]:mb-4 max-[768px]:max-w-[360px] max-[768px]:text-[28px] max-[480px]:text-[24px]"
        ctaLabel="Start Practicing Free"
      />
      <HomePageHappyUsers variant="pricingVideos" />
    </>
  );
}
