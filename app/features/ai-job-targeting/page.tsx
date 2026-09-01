"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Check,
  CheckCircle,
  Clock,
  Filter,
  GraduationCap,
  Globe,
  Search,
  Shield,
  Target,
  Trophy,
  Users,
  X,
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

export default function PrecisionTargetingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => {} });
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
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
          ? localStorage.getItem("utm_medium") || "Precision_Targeting_Page"
          : "Precision_Targeting_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Precision_Targeting_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "precision_targeting_cta", "cta", {
          button_location: "precision_targeting_hero_section",
          section: "precision_targeting_hero",
        });
        trackSignupIntent("precision_targeting_cta", {
          signup_source: "precision_targeting_hero_button",
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
      const isOnPrecisionTargetingPage =
        stripLocalePrefix(normalizedPath) === "/features/precision-targeting" ||
        stripLocalePrefix(normalizedPath) === "/features/ai-job-targeting";

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

      if (isOnPrecisionTargetingPage) {
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

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const targetAudience = [
    {
      title: "International Students",
      desc: "Target employers more likely to sponsor international candidates.",
      icon: Users,
    },
    {
      title: "Career Switchers",
      desc: "Focus on roles where your transferable skills are valued.",
      icon: Briefcase,
    },
    {
      title: "Experienced Professionals",
      desc: "Prioritize senior roles that match your expertise.",
      icon: Trophy,
    },
    {
      title: "Fresh Graduates",
      desc: "Discover entry-level opportunities that fit your education and skills.",
      icon: GraduationCap,
    },
    {
      title: "Remote Job Seekers",
      desc: "Find remote jobs that align with your experience.",
      icon: Globe,
    },
    {
      title: "Professionals Seeking Faster Interviews",
      desc: "Spend less time applying and more time preparing for interviews.",
      icon: Clock,
    },
  ];

  const howItWorksSteps = [
    {
      title: "Analyze Your Experience",
      desc: "We review your resume, work history, skills, and career preferences to understand which roles fit your background.",
      icon: Search,
    },
    {
      title: "Identify High-Match Opportunities",
      desc: "Relevant jobs are shortlisted based on your experience, resume alignment, skills, and hiring requirements.",
      icon: Filter,
    },
    {
      title: "Focus Your Applications",
      desc: "Apply only to opportunities where your qualifications closely match employer expectations.",
      icon: Target,
    },
    {
      title: "Continuously Improve Your Results",
      desc: "Application outcomes help refine future recommendations so your job search becomes more effective over time.",
      icon: BarChart3,
    },
  ];

  const stats = [
    { label: "Apply to Better-Fit Roles" },
    { label: "Higher Resume Match" },
    { label: "Save Hours Every Week" },
    { label: "More Interview Opportunities" },
  ];

  const problemComparison = [
    ["Apply everywhere", "Focus on high-match jobs"],
    ["Generic applications", "Relevant opportunities"],
    ["Low interview rates", "Better interview potential"],
    ["Time-consuming search", "Smarter applications"],
    ["No clear strategy", "Data-backed recommendations"],
  ];

  const benefitCards = [
    {
      title: "Find Better Opportunities",
      desc: "Discover jobs aligned with your skills and experience.",
      icon: Search,
    },
    {
      title: "Avoid Low-Match Roles",
      desc: "Stop wasting time on opportunities that don't fit your profile.",
      icon: X,
    },
    {
      title: "Improve Interview Chances",
      desc: "Focus on applications with stronger alignment to employer requirements.",
      icon: CheckCircle,
    },
    {
      title: "Save Time Every Week",
      desc: "Spend less time searching and more time preparing for interviews.",
      icon: Clock,
    },
  ];

  const jobTargetingFAQs = [
    {
      question: "What is precision job targeting?",
      answer:
        "Precision job targeting is an approach that focuses your applications on roles that closely match your skills, experience, and career goals, instead of applying to every available opening.",
    },
    {
      question: "How does FlashFire identify the best jobs for me?",
      answer:
        "FlashFire reviews your resume, work history, skills, and career preferences, then shortlists roles based on how closely they align with your background and hiring requirements.",
    },
    {
      question: "Why is targeted job searching better than mass applying?",
      answer:
        "Targeted applications focus your effort on roles where your profile is genuinely competitive, which can lead to better resume alignment and stronger interview potential than sending out applications indiscriminately.",
    },
    {
      question: "Can FlashFire help improve my interview rate?",
      answer:
        "By focusing your applications on higher-match opportunities, FlashFire helps you apply where your qualifications align more closely with employer expectations, which can improve your interview potential.",
    },
    {
      question: "Does FlashFire consider my resume and work experience?",
      answer:
        "Yes. Your resume, work history, and skills are core inputs FlashFire uses to determine which roles are the best fit for your profile.",
    },
    {
      question: "Can I target remote jobs?",
      answer:
        "Yes, FlashFire can help you find remote opportunities that align with your experience and preferences.",
    },
    {
      question: "Is precision targeting suitable for career switchers?",
      answer:
        "Yes. FlashFire helps career switchers focus on roles where their transferable skills are valued, rather than applying broadly across unrelated positions.",
    },
    {
      question: "Can international students use FlashFire?",
      answer:
        "Yes, FlashFire helps international students target employers who are more likely to sponsor or consider visa holders.",
    },
    {
      question: "How often are job recommendations updated?",
      answer:
        "Job recommendations are refreshed regularly as new opportunities become available and as your application outcomes help refine future matches.",
    },
    {
      question: "Does FlashFire help optimize my resume for better matches?",
      answer:
        "FlashFire looks at your resume alignment with each role and helps highlight where adjustments could improve your match to a given opportunity.",
    },
    {
      question: "Can I customize the types of jobs I want to target?",
      answer:
        "Yes, your career preferences, role interests, and priorities help shape which opportunities are shortlisted for you.",
    },
    {
      question: "How does FlashFire improve my job search over time?",
      answer:
        "Application outcomes, including responses and rejections, are used to refine future recommendations so your job search becomes more effective over time.",
    },
  ];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "AI Job Targeting",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    description:
      "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.",
    brand: { "@type": "Brand", name: "FlashFire" },
    offers: {
      "@type": "Offer",
      url: "https://flashfirejobs.com/features/ai-job-targeting",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "478" },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Job Targeting",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/ai-job-targeting",
    description: "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "478" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "AI Job Targeting", item: "https://www.flashfirejobs.com/features/ai-job-targeting" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jobTargetingFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative min-h-[510px] overflow-hidden bg-[#fffaf7] px-4 pt-[92px]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
            style={{
              background:
                "radial-gradient(60% 90% at 50% 0%, rgba(255,76,0,0.08) 0%, rgba(255,76,0,0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(17,24,39,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div className="relative mx-auto max-w-[1180px]">
            <HeroFloatingPill className="left-[122px] top-[155px] hidden lg:flex" label="Works with free LinkedIn" />
            <HeroFloatingPill className="left-[52px] top-[219px] hidden lg:flex" label="No login required" />
            <HeroFloatingPill className="right-[92px] top-[207px] hidden lg:flex" label="Works with free LinkedIn" />
            <HeroFloatingPill className="right-[181px] top-[270px] hidden lg:flex" label="No login required" />

            <div className="mx-auto max-w-[640px] text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#ff4c00]">
                <Target size={13} />
                Higher Match Job Applications
              </span>
              <h1 className="text-[34px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px]">
                Apply to Jobs You&apos;re Most
                <br className="hidden sm:block" />
                Likely to Get Interviewed For
              </h1>
              <p className="mx-auto mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#596273]">
                FlashFire identifies the jobs that best match your skills, experience, resume, and
                career goals, helping you focus your applications on opportunities with a higher
                likelihood of interview calls.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-7 text-[13px] font-extrabold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-black sm:w-auto sm:min-w-[168px]"
                >
                  Find My Best-Match Jobs
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleHowItWorks}
                  className="inline-flex h-[46px] w-full items-center justify-center rounded-full border border-black/10 bg-white px-7 text-[13px] font-extrabold text-[#111827] transition duration-300 hover:-translate-y-0.5 hover:border-[#ff4c00]/40 hover:text-[#ff4c00] sm:w-auto sm:min-w-[128px]"
                >
                  How It Works
                </button>
              </div>

              <div className="mt-7 flex items-center justify-center gap-6 text-[11px] font-semibold text-[#4b5565]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#ff4c00]" />
                  No signup required
                </span>
                <span className="inline-flex items-center gap-2">
                  <Shield size={14} className="text-[#ff4c00]" />
                  100% secure
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Most Job Seekers Don&apos;t
                <br />
                Get Enough Interviews
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-medium text-[#6b7280]">
                Many applicants spend hours applying to every available role without knowing whether
                they&apos;re actually a good match. The result is more rejections, wasted time, and
                fewer interview opportunities.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-[#f9fafb] p-6 sm:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#6b7280]">
                  <Zap size={14} className="text-[#9ca3af]" />
                  Without FlashFire
                </div>
                <ul className="space-y-4">
                  {problemComparison.map(([without]) => (
                    <li key={without} className="flex items-start gap-3 text-[15px] font-medium text-[#6b7280]">
                      <X size={18} className="mt-0.5 flex-shrink-0 text-[#d1d5db]" />
                      {without}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#ff4c00]/15 bg-[#fff3ee] p-6 shadow-[0_16px_32px_rgba(255,76,0,0.08)] sm:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                  <Check size={14} strokeWidth={3} />
                  With FlashFire
                </div>
                <ul className="space-y-4">
                  {problemComparison.map(([without, withFlashFire]) => (
                    <li key={without} className="flex items-start gap-3 text-[15px] font-semibold text-[#111827]">
                      <Check size={18} strokeWidth={3} className="mt-0.5 flex-shrink-0 text-[#ff4c00]" />
                      {withFlashFire}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf7] px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Targeted Job Applications
                <br />
                Beat Mass Applying
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-medium text-[#6b7280]">
                Sending hundreds of applications doesn&apos;t guarantee interviews. Applying
                strategically to the right opportunities delivers better results with less effort.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-[#f9fafb] p-6 sm:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#6b7280]">
                  <Zap size={14} className="text-[#9ca3af]" />
                  Mass Applying
                </div>
                <ul className="space-y-4">
                  {[
                    "Apply to every opening",
                    "Low resume relevance",
                    "High rejection rate",
                    "Time-consuming",
                    "No clear strategy",
                    "Repetitive applications",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-[#6b7280]">
                      <X size={18} className="mt-0.5 flex-shrink-0 text-[#d1d5db]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#ff4c00]/15 bg-[#fff3ee] p-6 shadow-[0_16px_32px_rgba(255,76,0,0.08)] sm:p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                  <Check size={14} strokeWidth={3} />
                  FlashFire&apos;s Precision Targeting
                </div>
                <ul className="space-y-4">
                  {[
                    "Focus on high-match opportunities",
                    "Better resume and role alignment",
                    "Higher interview potential",
                    "Faster, more efficient job search",
                    "Data-driven targeting",
                    "Quality over quantity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-semibold text-[#111827]">
                      <Check size={18} strokeWidth={3} className="mt-0.5 flex-shrink-0 text-[#ff4c00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Who Benefits From Precision Job Targeting?
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-medium text-[#6b7280]">
                Whether you&apos;re applying for your first job or your next leadership role,
                FlashFire helps you focus on opportunities that match your background and career
                goals.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-5 md:grid-cols-3">
              {targetAudience.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group h-full min-h-[160px] min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-[16px] font-extrabold text-[#111827]">{item.title}</h3>
                    <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#fffaf7] px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[760px]">
            <div className="mb-12 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                How FlashFire Finds Your Best Job Matches
              </h2>
              <p className="mt-6 text-[15px] font-medium text-[#6b7280]">
                Every recommendation is designed to help you spend less time searching and more time
                interviewing.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
              {howItWorksSteps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="relative h-full min-h-[135px] min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white px-7 py-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <span className="pointer-events-none absolute right-5 top-5 text-3xl font-black leading-none text-[#ff4c00]/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00]">
                      <Icon size={20} />
                    </span>
                    <h3 className="relative text-[19px] font-extrabold leading-tight text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-[13px] font-medium leading-5 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[960px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Job Seekers Choose Precision Targeting
              </h2>
              <p className="mt-6 text-[16px] font-medium text-[#6b7280]">
                Applying to better-matched opportunities can improve interview rates while reducing
                unnecessary applications.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="flex h-full min-w-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-black/10 bg-[#fffaf7] px-8 py-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff0e9] text-[#ff4c00]">
                    <CheckCircle size={24} />
                  </span>
                  <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#6b7280]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf7] px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Precision Job Targeting Works
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-medium text-[#6b7280]">
                Applying to fewer, better-matched jobs often produces stronger results than sending
                hundreds of applications.
              </p>
            </div>
            <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
              {benefitCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group h-full min-h-[160px] min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-[16px] font-extrabold text-[#111827]">{item.title}</h3>
                    <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Frequently Asked Questions About Precision Job Targeting</h2>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobTargetingFAQs.map((faq, index) => (
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

        <section className="relative overflow-hidden bg-[#fffaf7] px-4 py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4c00]/12 blur-[120px]" />
            <Target className="absolute -right-6 -top-6 h-40 w-40 text-[#ff4c00]/[0.06] sm:h-56 sm:w-56" />
          </div>
          <div className="relative mx-auto max-w-[760px] text-center">
            <h2 className="text-[34px] font-extrabold leading-tight text-[#111827]">
              Ready to Focus on the Right Opportunities?
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-medium leading-7 text-[#596273]">
              Instead of sending hundreds of applications, start applying to jobs that better match
              your skills, experience, and career goals.
            </p>
            <button
              {...getButtonProps()}
              onClick={handleGetMeInterview}
              className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#ff4c00] px-8 text-[15px] font-extrabold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Find My Best-Match Jobs
              <ArrowRight size={17} />
            </button>
            <p className="mt-5 text-[13px] font-medium text-[#6b7280]">
              No credit card required. Setup in 5 minutes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroFloatingPill({ className, label }: { className: string; label: string }) {
  return (
    <div
      className={`absolute h-[38px] w-[140px] items-center justify-center rounded-full border border-black/5 bg-white text-center text-[10px] font-extrabold leading-none text-[#596273] shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      {label}
    </div>
  );
}
