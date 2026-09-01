"use client";

import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { ArrowLeft, ArrowRight, Check, Copy, FileText, Mail } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import demoCtaStyles from "@/src/components/homePageDemoCTA/homePageDemoCTA.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

export default function LinkedInOptimizationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {},
  });

  const handleCopyEmail = async () => {
    const email = "support@flashfirejobs.com";

    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy email:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleScheduleCall = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "LinkedIn_Demo_CTA"
        : "LinkedIn_Demo_CTA";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "LinkedIn_Schedule_Career_Call_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
          },
        });
      } catch (gtagError) {
        console.warn('GTagUTM error:', gtagError);
      }

      try {
        trackButtonClick("Schedule a Free Career Call", "linkedin_demo_cta", "cta", {
          button_location: "linkedin_demo_cta_button",
          section: "linkedin_demo_cta",
          target_url: "/schedule-a-free-career-call"
        });
        trackSignupIntent("linkedin_demo_cta", {
          signup_source: "linkedin_demo_cta_button",
          funnel_stage: "signup_intent",
          target_url: "/schedule-a-free-career-call"
        });
      } catch (trackError) {
        console.warn('Tracking error:', trackError);
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      }

      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const isAlreadyOnScheduleACareerCall = stripLocalePrefix(currentPath) === '/schedule-a-free-career-call';

      if (isAlreadyOnScheduleACareerCall) {
        return;
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
      }

      const targetPath = localizeHref('/schedule-a-free-career-call', currentPath);
      router.push(targetPath);
    } catch (error) {
      console.warn('Error in Schedule Call handler:', error);
    }
  };

  const linkedinOptimizationFAQs = [
    {
      question: "How does Flashfire optimize my LinkedIn profile?",
      answer: " We improve your headline, About section, skills, keywords, and experience to make your profile easier for recruiters to find and understand."
    },
    {
      question: "How does LinkedIn optimization help me get recruiter messages?",
      answer: " A keyword-optimized, well-positioned profile ranks higher in recruiter searches, increasing the number of profile views and recruiter messages you receive."
    },
    {
      question: "Who should use Flashfire's LinkedIn optimization service?",
      answer: " Active job seekers, career switchers, and experienced professionals who want more recruiter visibility and stronger positioning on LinkedIn."
    },
    {
      question: "How often should I optimize my LinkedIn profile?",
      answer: " We recommend revisiting your profile every 2–3 months or whenever your role, skills, or job goals change to keep it aligned with recruiter search trends."
    },
    {
      question: "Should my LinkedIn profile match my resume?",
      answer: " Yes. Keeping your LinkedIn profile and resume consistent in roles, dates, and keywords builds recruiter trust and improves your chances of moving forward."
    },
    {
      question: "How does LinkedIn optimization support my job search?",
      answer: " An optimized profile works alongside your applications, helping recruiters discover you directly and reach out with opportunities you may not have applied to."
    },
    {
      question: "Can Flashfire optimize both my resume and LinkedIn profile?",
      answer: " Yes, Flashfire can optimize your resume and LinkedIn profile together so both are consistent, keyword-aligned, and built to get recruiter attention."
    },
    {
      question: "How long does LinkedIn optimization take?",
      answer: " Most profiles are optimized within a few days, and you can typically expect visible improvements in recruiter activity within 7–14 days."
    },
    {
      question: "Will I receive more recruiter messages after optimization?",
      answer: " While results vary, most optimized profiles see increased profile views and a higher volume of recruiter messages within the first few weeks."
    },
    {
      question: "Does Flashfire rewrite my entire LinkedIn profile?",
      answer: " We rework the key sections that matter most for search visibility and recruiter impact, including your headline, About section, skills, and experience."
    },
    {
      question: "Is LinkedIn optimization useful for experienced professionals?",
      answer: " Yes, experienced professionals often benefit the most, since stronger positioning helps them appear in searches for senior and leadership roles."
    },
    {
      question: "Can fresh graduates benefit from LinkedIn optimization?",
      answer: " Yes, an optimized profile helps fresh graduates highlight relevant skills and projects, improving visibility even with limited work experience."
    }
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works")
    if (!section) return
  
    const yOffset = -80 // adjust if navbar height changes
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset
  
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  const scrollSteps = (direction: "left" | "right") => {
    stepsRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "LinkedIn Profile Optimization Tool",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/linkedin.png",
    "description": "LinkedIn profile optimization tool that helps recruiters find you faster. Optimize headlines, keywords, and summaries to boost profile visibility with FlashfireJobs.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "452"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": linkedinOptimizationFAQs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.trim()
      }
    }))
  }

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire LinkedIn Profile Optimization Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
    description: "LinkedIn profile optimization tool that helps recruiters find you faster. Optimize headlines, keywords, and summaries to boost profile visibility.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "452" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "LinkedIn Profile Optimization Tool", item: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#0b0b0b]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />


      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white py-14 lg:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 lg:min-h-[430px] lg:flex-row lg:justify-between">

          {/* LEFT CONTENT */}
          <div className="hidden min-h-[260px] flex-none lg:block lg:w-[22%]">
            <div className="ml-14 w-40 rounded-2xl border border-orange-100 bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              Works with free LinkedIn
            </div>
            <div className="mt-9 w-48 rounded-2xl border border-orange-100 bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              No login required
            </div>
            <div className="mt-9 ml-36 w-44 rounded-2xl border border-orange-100 bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              Visible results in
              <br />
              7-14 days
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center lg:w-[56%]">
            <p className="mb-6 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#ff4c00]">
              LinkedIn Profile Optimization
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl xl:text-[52px]">
              Optimize Your LinkedIn Profile to Get More Recruiter Messages
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Your LinkedIn profile should do more than look professional.
              FlashFire optimizes your headline, keywords, skills, and
              experience to improve recruiter visibility and increase your
              chances of getting interview opportunities.
            </p>

            <div className="mt-10 flex w-full flex-row flex-nowrap justify-center gap-3 sm:w-auto sm:gap-4">
              <button
                {...getButtonProps()}
                onClick={() => {
                  try {
                    const utmSource = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_source") || "WEBSITE"
                      : "WEBSITE";
                    const utmMedium = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_medium") || "LinkedIn_Page"
                      : "LinkedIn_Page";

                    try {
                      GTagUTM({
                        eventName: "sign_up_click",
                        label: "LinkedIn_Get_Me_Interview_Button",
                        utmParams: {
                          utm_source: utmSource,
                          utm_medium: utmMedium,
                          utm_campaign: typeof window !== "undefined" && window.localStorage
                            ? localStorage.getItem("utm_campaign") || "Website"
                            : "Website",
                        },
                      });
                    } catch (gtagError) {
                      console.warn('GTagUTM error:', gtagError);
                    }

                    try {
                      trackButtonClick("Get Me Interview", "linkedin_cta", "cta", {
                        button_location: "linkedin_hero_section",
                        section: "linkedin_hero"
                      });
                      trackSignupIntent("linkedin_cta", {
                        signup_source: "linkedin_hero_button",
                        funnel_stage: "signup_intent"
                      });
                    } catch (trackError) {
                      console.warn('Tracking error:', trackError);
                    }

                    // Check current path first
                    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
                    const normalizedPath = currentPath.split('?')[0];
                    const isAlreadyOnGetMeInterview = stripLocalePrefix(normalizedPath) === '/get-me-interview';
                    const isOnLinkedInPage = stripLocalePrefix(normalizedPath) === '/linkedin-profile-optimization-services' ||
                      stripLocalePrefix(normalizedPath) === '/features/linkedin-profile-optimization-services' ||
                      stripLocalePrefix(normalizedPath) === '/features/linkedin-profile-optimization' ||
                      stripLocalePrefix(normalizedPath) === '/features/linkedin-profile-optimization-tool';

                    // If already on the route, save scroll position and prevent navigation
                    if (isAlreadyOnGetMeInterview) {
                      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
                      }

                      requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        requestAnimationFrame(() => {
                          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                          setTimeout(() => {
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                          }, 50);
                        });
                      });

                      return;
                    }

                    // Dispatch custom event to force show modal FIRST
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
                    }

                    // If on LinkedIn features page, change URL but keep page content visible
                    if (isOnLinkedInPage) {
                      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
                      
                      // Update URL for tracking without navigation
                      if (typeof window !== 'undefined') {
                        const targetPath = localizeHref('/get-me-interview', normalizedPath);
                        window.history.pushState({}, '', targetPath);
                      }
                      
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        requestAnimationFrame(() => {
                          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                          setTimeout(() => {
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                          }, 50);
                        });
                      });
                      
                      return;
                    }

                    // Save current scroll position before navigation to preserve it
                    if (typeof window !== 'undefined') {
                      const currentScrollY = window.scrollY;
                      sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                      
                      const targetPath = '/get-me-interview';
                      window.history.pushState({}, '', targetPath);
                    }

                    // Only navigate if NOT already on the page
                    const targetPath = '/get-me-interview';
                    router.push(targetPath);
                  } catch (error) {
                    console.warn('Error in Get Me Interview handler:', error);
                  }
                }}
                className="flex-1 sm:flex-none h-14 whitespace-nowrap rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-6 text-[14px] font-bold text-white shadow-lg shadow-orange-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Me Interview <span className="ml-2">&rarr;</span>
              </button>

              <button
                onClick={handleHowItWorks}
                className="flex-1 sm:flex-none h-14 whitespace-nowrap rounded-full border border-orange-200 bg-white px-6 text-[14px] font-bold text-[#ff4c00] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-md"
              >
                How It Works
              </button>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-gray-700 lg:hidden">
              {[
                "Works with free LinkedIn",
                "No login required",
                "Visible results in 7-14 days",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ff4c00] rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL PANEL */}
          <div className="relative hidden min-h-[300px] flex-none lg:block lg:w-[26%]">

            {/* Main Card */}
            <div className="relative ml-auto mt-2 right-10 min-h-[205px] w-[260px] rounded-2xl border border-orange-100 bg-white shadow-md xl:w-[300px]">

              <h3 className="border-b border-orange-100 px-5 py-5 text-[15px] font-extrabold leading-tight text-gray-900">
                What recruiters actually see
              </h3>

              <div className="space-y-3 px-5 py-4 text-[9px] xl:text-[10px]">
                <div className="flex min-h-[28px] items-center justify-between rounded-lg border border-orange-100 bg-orange-50/30 px-3">
                  <span className="font-medium">Profile ranking</span>
                  <span className="font-bold text-[#ff4c00]">Top 7%</span>
                </div>

                <div className="flex min-h-[28px] items-center justify-between rounded-lg border border-orange-100 bg-orange-50/30 px-3">
                  <span className="font-medium">Keyword match</span>
                  <span className="font-bold text-[#ff4c00]">92%</span>
                </div>

                <div className="flex min-h-[28px] items-center justify-between rounded-lg border border-orange-100 bg-orange-50/30 px-3">
                  <span className="font-medium">Recruiter signals</span>
                  <span className="font-bold text-[#ff4c00]">Optimized</span>
                </div>
              </div>

              <div className="absolute -bottom-18 -right-10 w-[285px] rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] px-7 py-5 text-white shadow-xl shadow-orange-200/60 xl:-right-15 xl:w-[325px]">
                <p className="text-[12px] font-medium leading-snug">
                  "Profiles optimized with FlashFire receive significantly more
                  recruiter messages within the first few weeks."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* ================= RESULTS SECTION ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            LinkedIn optimization isn't about rewriting your profile. It's
            about helping recruiters find you and giving them a reason to
            reach out.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            We optimize your LinkedIn profile with recruiter-friendly
            keywords, stronger positioning, and compelling messaging so you
            appear in more searches and attract more recruiter outreach.
          </p>

          <div className="mt-14 grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1,000+", label: "PROFILES OPTIMIZED" },
              { value: "95%", label: "SUCCESS RATE" },
              { value: "14 Days", label: "VISIBILITY BOOST" },
              { value: "2.3x", label: "RECRUITER REPLIES" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white px-8 py-7 text-center shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <h3 className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] bg-clip-text text-4xl font-extrabold text-transparent">
                  {item.value}
                </h3>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ================= STEPS SECTION ================= */}
      <section id="how-it-works" className="overflow-hidden bg-orange-50/40 py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start">
          <div className="lg:w-2/5">
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              How We Optimize Your LinkedIn Profile in 4 Simple Steps
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-gray-600">
              We optimize your LinkedIn profile based on how recruiters
              search, filter, and evaluate candidates, helping you become
              more visible for the roles you want.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => scrollSteps("left")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => scrollSteps("right")}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          <div
            ref={stepsRef}
            className="hide-scrollbar flex items-stretch gap-6 overflow-x-auto pb-4 lg:w-3/5"
          >
            {[
              {
                step: "Step 1",
                title: "Share Your LinkedIn Profile",
                desc: "Paste your LinkedIn profile URL. No login required. We'll analyze your public profile and identify opportunities for improvement.",
              },
              {
                step: "Step 2",
                title: "Optimize Your Profile",
                desc: "We improve your headline, About section, experience, skills, keywords, and profile structure to increase recruiter visibility.",
              },
              {
                step: "Step 3",
                title: "Improve Recruiter Visibility",
                desc: "A stronger, keyword-optimized profile appears in more recruiter searches and attracts more profile views.",
              },
              {
                step: "Step 4",
                title: "Get More Recruiter Conversations",
                desc: "A well-optimized profile helps generate more recruiter messages, interview invitations, and career opportunities.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex min-h-[300px] w-[min(288px,calc(100vw-3rem))] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-5 leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
                <span className="mt-8 inline-flex w-fit rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-5 py-3 text-sm font-extrabold text-white shadow-sm shadow-orange-200">
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO IS THIS FOR ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              Who Can Benefit From
              <br />
              LinkedIn Profile Optimization?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
              Whether you're actively applying or waiting for recruiters to
              discover you, an optimized LinkedIn profile helps you stand out
              in recruiter searches and generate more opportunities.
            </p>
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {[
              {
                title: "Active Job Seekers",
                desc: "Applying for jobs but receiving few interview invitations.",
              },
              {
                title: "Career Switchers",
                desc: "Transitioning into a new industry or role and needing stronger positioning.",
              },
              {
                title: "Mid Senior Professionals",
                desc: "Looking for better opportunities, leadership roles, or higher compensation.",
              },
              {
                title: "Low Recruiter Response",
                desc: "Experienced professionals who aren't receiving recruiter messages despite having strong experience.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                  <Check className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-extrabold text-[#ff4c00]">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-gray-500">
            We don't just rewrite profiles -- we optimize them for how
            recruiters actually search.
          </p>
        </div>
      </section>

      {/* ================= WHY THIS WORKS ================= */}
      <section className="bg-white pt-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            Why LinkedIn Optimization Matters
          </h2>
        </div>

        <div className="mt-16 bg-orange-50/40 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Get Found in Recruiter Searches",
                desc: "Improve keyword relevance so your profile appears for the roles you want.",
              },
              {
                title: "Turn Views Into Conversations",
                desc: "Strong headlines and compelling experience encourage recruiters to contact you.",
              },
              {
                title: "Stand Out From Similar Candidates",
                desc: "Position your experience clearly so recruiters immediately understand your value.",
              },
              {
                title: "More Visibility. More Opportunities.",
                desc: "Better positioning leads to more recruiter messages, profile views, and interview opportunities.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white px-7 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="text-xl font-extrabold text-gray-900">
                  {item.title}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= FAQ ================= */}
      <section id="faq" className={faqStyles.faqSection}>
        <div id="faq-header" className={faqStyles.header}>
          <h2>FAQs About LinkedIn Profile Optimization</h2>
          <p>
            We get it, LinkedIn optimization can sound complex. Here's everything
            explained, plain and simple.
          </p>
        </div>

        <div className={faqStyles.faqContainer}>
          {linkedinOptimizationFAQs.map((faq, index) => (
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

      {/* ================= FINAL CTA ================= */}
      <section className={demoCtaStyles.demoSectionOuter}>
        <div className={demoCtaStyles.demoSection}>
          <div className={demoCtaStyles.dotsPattern} />

          <div className={demoCtaStyles.contentContainer}>
            <div className={demoCtaStyles.leftContent}>
              <h5 className={demoCtaStyles.demoSubheading}>Got Questions?</h5>

              <h2 className={demoCtaStyles.demoHeading}>
                Book a Demo
                <span className={demoCtaStyles.fireIcon}>
                  <Image
                    src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/character.png"
                    alt="Flashfire mascot"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </span>
                Call
              </h2>

              <p className={demoCtaStyles.demoText}>
                Looking for more recruiter visibility? Schedule a free career
                call to learn how LinkedIn optimization can help you attract
                better opportunities and land more interviews.
              </p>

              <div className={demoCtaStyles.ctaArea}>
                <button
                  {...getButtonProps()}
                  className={demoCtaStyles.demoButton}
                  onClick={handleScheduleCall}
                >
                  Schedule a Free Career Call
                </button>

                <p className={demoCtaStyles.demoNote}>
                  Limited slots available. Book your call now!
                </p>
              </div>
            </div>

            <div className={demoCtaStyles.rightContent}>
              <div className={demoCtaStyles.emailCard}>
                <div className={demoCtaStyles.emailHeader}>
                  <Mail className={demoCtaStyles.emailIcon} />
                  <span>Prefer Email?</span>
                </div>

                <div className={demoCtaStyles.emailCopyWrapper}>
                  <input
                    type="text"
                    readOnly
                    value="support@flashfirejobs.com"
                    className={demoCtaStyles.emailInput}
                  />
                  <button
                    onClick={handleCopyEmail}
                    className={demoCtaStyles.copyButton}
                    aria-label="Copy email to clipboard"
                  >
                    {emailCopied ? (
                      <Check className={demoCtaStyles.copyIcon} size={18} />
                    ) : (
                      <Copy className={demoCtaStyles.copyIcon} size={18} />
                    )}
                  </button>
                  {emailCopied && (
                    <div className={demoCtaStyles.copiedTooltip}>Copied!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
