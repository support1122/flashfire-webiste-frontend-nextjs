"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle,
  FileText,
  Shield,
  Sparkles,
  Target,
  XCircle,
  Zap,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function CoverLetterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const coverLetterFAQs = [
    {
      question: "How does FlashFire personalize each cover letter?",
      answer:
        "FlashFire reviews your resume and the job description together, then writes a cover letter that highlights the experience and skills most relevant to that specific role.",
    },
    {
      question: "Can I edit the generated cover letter?",
      answer:
        "Yes. Every generated cover letter is fully editable, so you can adjust tone, wording, and formatting before you apply.",
    },
    {
      question: "Will my cover letter match the job description?",
      answer:
        "Yes. FlashFire aligns your cover letter with the language and requirements in the job description to improve keyword and role relevance.",
    },
    {
      question: "Is the cover letter ATS-friendly?",
      answer:
        "Yes. Every cover letter uses clean, ATS-friendly formatting so it can be parsed correctly by applicant tracking systems.",
    },
    {
      question: "Can I generate unlimited cover letters?",
      answer: "Yes. You can create a new, tailored cover letter for as many job applications as you need.",
    },
    {
      question: "Can I use my existing resume?",
      answer: "Yes. Upload your existing resume and FlashFire will use it as the foundation for your cover letter.",
    },
    {
      question: "How long does it take to create a cover letter?",
      answer:
        "Most cover letters are ready to review within minutes of uploading your resume and the job description.",
    },
    {
      question: "Can I create cover letters for different industries?",
      answer:
        "Yes. FlashFire tailors each cover letter to the role and industry you're applying to, not a single generic template.",
    },
    {
      question: "Does FlashFire save my cover letters?",
      answer: "Yes. Your cover letters are saved to your account so you can revisit, reuse, or edit them anytime.",
    },
    {
      question: "Can fresh graduates use this tool?",
      answer:
        "Yes. Fresh graduates can use FlashFire to build a strong, professional cover letter even without prior work experience.",
    },
  ];

  const benefitCards = [
    {
      title: "Personalized for Every Job",
      desc:
        "Generate unique cover letters based on your resume and the job description instead of using generic templates.",
      icon: Sparkles,
    },
    {
      title: "Optimized for Recruiters",
      desc:
        "Use clean formatting and relevant keywords that help your application pass ATS screening and remain easy for recruiters to read.",
      icon: Target,
    },
    {
      title: "Create Cover Letters Faster",
      desc:
        "Build professional cover letters in minutes, edit them anytime, and reuse your best content across applications.",
      icon: Zap,
    },
  ];

  const builderSteps = [
    {
      eyebrow: "UPLOAD RESUME",
      title: "Upload Your Resume",
      desc: "We'll identify your experience, skills, and achievements.",
      visual: "upload",
    },
    {
      eyebrow: "PASTE JOB DESCRIPTION",
      title: "Paste the Job Description",
      desc: "We compare your background with the role to identify the most relevant experience.",
      visual: "match",
    },
    {
      eyebrow: "GENERATE & PERSONALIZE",
      title: "Generate & Personalize",
      desc: "Receive a professionally written cover letter that you can edit before applying.",
      visual: "generate",
    },
  ];

  const whyFlashfireCards = [
    { title: "Write Faster", desc: "Generate personalized cover letters within minutes.", icon: Zap },
    { title: "Tailor Every Application", desc: "Match every cover letter to the specific job.", icon: Target },
    { title: "Increase ATS Compatibility", desc: "Improve keyword relevance and application quality.", icon: CheckCircle },
    { title: "Edit Anytime", desc: "Customize every section before sending.", icon: Sparkles },
  ];

  const audienceLabels = [
    "Fresh Graduates",
    "Career Switchers",
    "Experienced Professionals",
    "International Candidates",
    "High-Volume Job Seekers",
    "Anyone tired of writing cover letters from scratch",
  ];

  const comparisonRows = [
    { generic: "Same content for every job", flashfire: "Personalized for every application" },
    { generic: "Manual editing", flashfire: "Faster customization" },
    { generic: "Limited keyword relevance", flashfire: "Better job-specific matching" },
    { generic: "Difficult to maintain", flashfire: "Easy to reuse and update" },
    { generic: "Generic structure", flashfire: "Professional formatting" },
  ];

  const audience = [
    {
      title: "Job Seekers Applying to Multiple Roles",
      desc: "Create customized cover letters for every application without rewriting from scratch.",
    },
    {
      title: "Fresh Graduates & Early-Career Professionals",
      desc: "Build professional cover letters even if you're applying for your first job.",
    },
    {
      title: "Experienced Professionals",
      desc: "Save time by generating tailored cover letters for different companies and positions.",
    },
    {
      title: "Anyone Looking to Write Better Cover Letters",
      desc: "Create personalized, recruiter-ready cover letters in minutes.",
    },
    {
      title: "Candidates Looking to Improve ATS Compatibility",
      desc: "Include relevant job-specific keywords and improve the quality of every application.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Cover_Letter_Page"
          : "Cover_Letter_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Cover_Letter_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "cover_letter_cta", "cta", {
          button_location: "cover_letter_hero_section",
          section: "cover_letter_hero",
        });
        trackSignupIntent("cover_letter_cta", {
          signup_source: "cover_letter_hero_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      const currentPath =
        pathname || (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        stripLocalePrefix(normalizedPath) === "/get-me-interview";
      const isOnCoverLetterPage =
        stripLocalePrefix(normalizedPath) === "/features/cover-letter" ||
        stripLocalePrefix(normalizedPath) === "/features/ai-cover-letter-generator";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnCoverLetterPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            localizeHref("/get-me-interview", normalizedPath)
          );
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
        window.history.pushState({}, "", "/get-me-interview");
      }

      router.push("/get-me-interview");
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error);
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "AI Cover Letter Generator",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/cover-letter.png",
    description:
      "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    brand: {
      "@type": "Brand",
      name: "FlashFire",
    },
    offers: {
      "@type": "Offer",
      url: "https://flashfirejobs.com/features/ai-cover-letter-generator",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "68",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Cover Letter Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
    description: "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "68" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: coverLetterFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "AI Cover Letter Generator", item: "https://www.flashfirejobs.com/features/ai-cover-letter-generator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        {/* Hero */}
        <section className="bg-[#fff8f2] px-4 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
                <Sparkles size={12} />
                Personalized Cover Letters
              </span>
              <h1 className="mt-6 text-[32px] font-extrabold leading-[1.15] text-[#111827] sm:text-[46px] sm:leading-[1.12]">
                Create Job-Specific Cover Letters That Improve Interview Chances
              </h1>
              <p className="mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#596273] sm:text-[16px]">
                Create personalized cover letters tailored to every job description. Highlight
                your most relevant skills, improve keyword matching, and send applications with
                confidence.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-7 text-[13px] font-extrabold text-white shadow-[0_10px_30px_rgba(255,76,0,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-black"
                >
                  Create My Cover Letter
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="mt-9 grid max-w-[480px] grid-cols-2 gap-x-4 gap-y-3 text-[12px] font-semibold text-[#4b5565]">
                {[
                  "Personalized for every job",
                  "ATS-friendly formatting",
                  "Professional writing in minutes",
                  "Easy to edit and customize",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Shield size={13} className="shrink-0 text-[#ff4c00]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <HeroLetterMockup />
          </div>
        </section>

        {/* Everything you need */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-10 max-w-[600px] text-center">
              <span className="inline-flex rounded-full border border-black/10 bg-[#f9fafb] px-4 py-1 text-[11px] font-bold text-[#ff4c00]">
                How it works
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Everything You Need to Write Better Cover Letters
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                Create professional cover letters that match every job application without
                starting from scratch each time.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {benefitCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-[17px] font-extrabold leading-tight text-[#111827]">{item.title}</h3>
                    <p className="mt-3 text-[14px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why cover letters fail vs FlashFire */}
        <section className="bg-[#f9fafb] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-10 max-w-[600px] text-center">
              <span className="inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-[11px] font-bold uppercase text-[#ff4c00]">
                The problem with modern job search
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Why Most Cover Letters Don&apos;t Get Responses
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-7 sm:p-9">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#f9fafb] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#9ca3af]">
                  <XCircle size={14} />
                  Generic Cover Letters
                </div>
                <ul className="space-y-4">
                  {[
                    "Generic cover letters look identical.",
                    "Important skills are often missing.",
                    "Every application takes too long to customize.",
                    "Recruiters quickly recognize copied content.",
                    "Valuable opportunities get missed.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-medium leading-6 text-[#6b7280]">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-[#d1d5db]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-l-4 border-black/10 border-l-[#ff4c00] bg-white p-7 shadow-sm sm:p-9">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00]">
                  <Check size={14} strokeWidth={3} />
                  With FlashFire
                </div>
                <ul className="space-y-4">
                  {[
                    "Personalized for every application",
                    "Highlights your most relevant experience",
                    "Matches job descriptions naturally",
                    "Saves hours of manual editing",
                    "Helps create stronger first impressions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-semibold leading-6 text-[#111827]">
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#ff4c00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3 simple steps — split layout with mockups */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto mb-14 max-w-[600px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Create a Personalized Cover Letter in 3 Simple Steps
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-7 text-[#596273]">
                ATS-friendly, recruiter-ready, and focused on real improvements that get results.
              </p>
            </div>

            <div className="space-y-14 sm:space-y-20">
              {builderSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12"
                >
                  <div className={index % 2 === 1 ? "sm:order-2" : ""}>
                    <span className="text-[13px] font-bold text-[#ff4c00]">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#9ca3af]">{step.eyebrow}</p>
                    <h3 className="mt-3 text-[22px] font-extrabold leading-tight text-[#111827]">{step.title}</h3>
                    <p className="mt-3 max-w-[420px] text-[15px] font-medium leading-7 text-[#6b7280]">{step.desc}</p>
                  </div>
                  <div className={index % 2 === 1 ? "sm:order-1" : ""}>
                    <StepVisual type={step.visual} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why job seekers use FlashFire */}
        <section className="bg-[#fff8f2] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto mb-12 max-w-[560px] text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Why Job Seekers Use FlashFire
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyFlashfireCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group flex flex-col items-center rounded-2xl border border-black/10 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.08)]"
                  >
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-[15px] font-extrabold leading-tight text-[#111827]">{item.title}</h3>
                    <p className="mt-2 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Who is this for */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[860px] text-center">
            <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
              Who Is This Cover Letter Builder For?
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[14px] font-medium leading-6 text-[#7a8290]">
              Whether you&apos;re applying for your first job or your next leadership role,
              FlashFire helps you write stronger cover letters with less effort.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {audienceLabels.map((item) => (
                <span
                  key={item}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-[13px] font-bold text-[#111827] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff4c00]/40 hover:shadow-[0_10px_24px_rgba(255,76,0,0.1)]"
                >
                  <CheckCircle size={14} strokeWidth={2.5} className="text-[#ff4c00]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-[#f9fafb] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <h2 className="mb-10 text-center text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
              FlashFire vs Generic Cover Letter Templates
            </h2>
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
              <div className="grid grid-cols-2 border-b border-black/10 bg-[#f9fafb]">
                <div className="border-r border-black/10 p-3 text-center text-[11px] font-extrabold uppercase tracking-wide text-[#9ca3af] sm:p-5 sm:text-[12px]">
                  Generic Templates
                </div>
                <div className="p-3 text-center text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00] sm:p-5 sm:text-[12px]">
                  FlashFire
                </div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.generic}
                  className={`grid grid-cols-2 ${index !== comparisonRows.length - 1 ? "border-b border-black/10" : ""}`}
                >
                  <div className="flex items-start gap-2 border-r border-black/10 p-3 text-[12px] font-medium leading-5 text-[#6b7280] sm:items-center sm:p-5 sm:text-[13px]">
                    <XCircle size={16} className="mt-0.5 shrink-0 text-[#d1d5db] sm:mt-0" />
                    {row.generic}
                  </div>
                  <div className="flex items-start gap-2 p-3 text-[12px] font-extrabold leading-5 text-[#111827] sm:items-center sm:p-5 sm:text-[13px]">
                    <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#ff4c00] sm:mt-0" />
                    {row.flashfire}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience detail list */}
        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1080px] gap-10 md:grid-cols-[1fr_1.15fr] md:items-start">
            <div className="text-center">
              <h2 className="text-[28px] font-extrabold leading-[1.15] text-[#111827] sm:text-[38px]">
                Create Better Cover Letters
                <span className="text-[#ff4c00]"> in 3 Simple Steps</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[420px] text-[15px] font-medium leading-7 text-[#6b7280]">
                Create personalized, job-specific cover letters in minutes. Simply upload your
                resume, add the job description, and let FlashFire help you write a stronger
                application.
              </p>
            </div>

            <div className="space-y-3">
              {audience.map((item) => (
                <article
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(255,76,0,0.08)]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00]">
                    <CheckCircle size={16} />
                  </span>
                  <div>
                    <p className="text-[14px] font-extrabold leading-5 text-[#111827] sm:text-[15px]">{item.title}</p>
                    <p className="mt-1 text-[13px] font-medium leading-5 text-[#6b7280]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#fff8f2] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="relative overflow-hidden rounded-[28px] bg-[#ff4c00] px-6 py-14 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-0">
                <Sparkles className="absolute -right-6 -top-6 h-40 w-40 text-white/10 sm:h-56 sm:w-56" />
              </div>
              <div className="relative mx-auto max-w-[620px]">
                <h2 className="text-[28px] font-extrabold leading-[1.2] text-white sm:text-[38px]">
                  Ready to Create Better Cover Letters?
                </h2>
                <p className="mx-auto mt-5 max-w-[480px] text-[15px] font-medium leading-7 text-white/85">
                  Build personalized cover letters for every application, save hours of manual
                  writing, and apply with confidence.
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    {...getButtonProps()}
                    onClick={handleGetMeInterview}
                    className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-white px-8 text-[13px] font-extrabold text-[#ff4c00] transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:text-white"
                  >
                    Create My Cover Letter
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Cover Letter Builder</h2>
            <p>
              We get it, cover letter writing can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {coverLetterFAQs.map((faq, index) => (
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
      </main>
      <Footer />
    </>
  );
}

function HeroLetterMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 40%, rgba(255,76,0,0.1) 0%, rgba(255,76,0,0) 70%)",
        }}
      />
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(17,24,39,0.1)] sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00]">
            <FileText size={18} />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0e9] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ff4c00]">
            <Sparkles size={10} />
            AI Generated
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="h-3 w-2/3 rounded bg-[#e5e8ee]" />
          <div className="h-3 w-1/2 rounded bg-[#e5e8ee]" />
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-2.5 rounded bg-[#eef0f3]" />
          <div className="h-2.5 rounded bg-[#eef0f3]" />
          <div className="h-2.5 w-4/5 rounded bg-[#eef0f3]" />
        </div>
        <div className="mt-4 rounded-lg border border-[#ff4c00]/15 bg-[#fff0e9] px-3 py-2.5">
          <div className="h-2.5 w-3/4 rounded bg-[#ff4c00]/25" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 rounded bg-[#eef0f3]" />
          <div className="h-2.5 w-5/6 rounded bg-[#eef0f3]" />
        </div>
        <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-5">
          <CheckCircle size={14} className="text-[#ff4c00]" />
          <span className="text-[11px] font-semibold text-[#6b7280]">Matched to job description</span>
        </div>
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  if (type === "match") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
          <Target size={14} />
          Matching your background
        </div>
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-[#eef0f3]" />
          <div className="h-3 w-5/6 rounded bg-[#eef0f3]" />
          <div className="h-3 w-full rounded bg-[#eef0f3]" />
          <div className="flex items-center gap-2 rounded-lg border border-[#ff4c00]/15 bg-[#fff0e9] px-3 py-3">
            <CheckCircle size={16} className="shrink-0 text-[#ff4c00]" />
            <div className="h-2.5 w-2/3 rounded bg-[#ff4c00]/25" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "generate") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
          <Sparkles size={14} />
          Final cover letter
        </div>
        <div className="mb-4 h-3.5 w-32 rounded bg-[#dfe3ea] sm:w-40" />
        <div className="space-y-2">
          <div className="h-2.5 rounded bg-[#eef0f3]" />
          <div className="h-2.5 w-11/12 rounded bg-[#eef0f3]" />
          <div className="h-2.5 rounded bg-[#eef0f3]" />
          <div className="h-2.5 w-4/5 rounded bg-[#eef0f3]" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] sm:h-12 sm:w-12">
          <FileText size={22} />
        </div>
        <div className="flex-1">
          <div className="mb-2.5 h-3 w-28 rounded bg-[#dfe3ea]" />
          <div className="h-3 w-20 rounded bg-[#dfe3ea]" />
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-dashed border-black/15 bg-[#f9fafb] px-4 py-6 text-center text-[11px] font-semibold text-[#9ca3af]">
        Drop your resume here
      </div>
    </div>
  );
}
