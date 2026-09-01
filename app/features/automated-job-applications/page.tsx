"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCrosshairs,
  FaExclamationTriangle,
  FaFileAlt,
  FaGlobe,
  FaPlus,
  FaRocket,
  FaTimes,
} from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { localizeHref, stripLocalePrefix } from "@/src/utils/locale";

const stats = [
  { value: "1,200+", label: "Applications Automated" },
  { value: "75%", label: "ATS Pass Rate" },
  { value: "24/7", label: "Active Monitoring" },
  { value: "3x", label: "Faster Response" },
];

const features = [
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Find Matching Jobs",
    desc: "FlashFire continuously searches for relevant jobs based on your experience, skills, preferred locations, and career goals.",
  },
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Optimize Every Application",
    desc: "Your resume is tailored with relevant keywords and ATS-friendly improvements before applications are submitted.",
  },
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Apply Automatically",
    desc: "FlashFire submits applications consistently throughout the week so you never miss relevant opportunities.",
  },
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Track Progress",
    desc: "Monitor applications, interview updates, recruiter responses, and overall job search performance from one dashboard.",
  },
];

const audienceGroups = [
  {
    title: "Active Job Seekers",
    desc: "Applying regularly but struggling to keep up with hundreds of opportunities.",
    icon: <FaFileAlt className="h-5 w-5" />,
  },
  {
    title: "Busy Professionals",
    desc: "Don't have hours every day to search and apply.",
    icon: <FaBolt className="h-5 w-5" />,
  },
  {
    title: "ATS-Rejected Candidates",
    desc: "Need better keyword optimization to pass ATS screening.",
    icon: <FaCrosshairs className="h-5 w-5" />,
  },
  {
    title: "Career Switchers",
    desc: "Applying across industries and roles.",
    icon: <FaFileAlt className="h-5 w-5" />,
  },
  {
    title: "International Applicants",
    desc: "Need consistent, high-volume applications in competitive markets.",
    icon: <FaGlobe className="h-5 w-5" />,
  },
  {
    title: "Fresh Graduates",
    desc: "Applying to many entry-level opportunities with limited experience.",
    icon: <FaRocket className="h-5 w-5" />,
  },
];

const comparisonData = [
  {
    title: "Application Process",
    caption:
      "Manual: Searching, tailoring, applying one by one | FlashFire: Automatically finds and submits high-quality applications",
  },
  {
    title: "Resume Optimization",
    caption:
      "Manual: Same resume for every application | FlashFire: Tailors resumes with ATS-friendly keywords",
  },
  {
    title: "Time Saved",
    caption: "Manual: 3-5 hours daily | FlashFire: Minutes to review, AI handles the rest",
  },
  {
    title: "Application Volume",
    caption:
      "Manual: 10-20 applications weekly | FlashFire: 100+ targeted applications every week",
  },
  {
    title: "Tracking",
    caption:
      "Manual: Messy spreadsheets | FlashFire: Centralized dashboard with application tracking",
  },
  {
    title: "Interview Opportunities",
    caption:
      "Manual: Inconsistent | FlashFire: Higher application consistency leads to more interview opportunities",
  },
];

const manualProblems = [
  "Misses early applications",
  "Time-consuming",
  "Same resume everywhere",
  "Difficult to stay consistent",
  "Hard to track progress",
];

const aiSolutions = [
  "Applies quickly after jobs are posted",
  "Saves hours every week",
  "ATS-optimized applications",
  "Automated daily applications",
  "Central dashboard and analytics",
];

const problemSolutionPairs = [
  {
    problem: "Misses early applications",
    detail: "Hundreds of candidates can apply within hours of a role going live.",
    solution: "Applies quickly after jobs are posted",
    result: "FlashFire applies as soon as new roles go live, keeping you ahead of the crowd.",
  },
  {
    problem: "Time-consuming",
    detail: "Searching, tailoring, and applying manually eats hours every day.",
    solution: "Saves hours every week",
    result: "FlashFire automates repetitive tasks so you get your time back.",
  },
  {
    problem: "Same resume everywhere",
    detail: "Using one resume for every role limits your chances with ATS.",
    solution: "ATS-optimized applications",
    result: "FlashFire tailors your resume with relevant keywords for each job.",
  },
  {
    problem: "Difficult to stay consistent",
    detail: "Manual applications often slow down or stop altogether over time.",
    solution: "Automated daily applications",
    result: "FlashFire keeps applying consistently, day after day.",
  },
  {
    problem: "Hard to track progress",
    detail: "Spreadsheets make it difficult to see what's working.",
    solution: "Central dashboard and analytics",
    result: "FlashFire gives you one dashboard to track every application and outcome.",
  },
];

const jobAutomationFAQs = [
  {
    question: "What is job application automation and how can it help me apply to more jobs?",
    answer:
      " Job application automation uses AI to apply to jobs automatically on your behalf. Flashfire's job application automation tool helps you automate job applications, tailor resumes for ATS systems, and apply faster than manual job searches.",
  },
  {
    question: "How does automating job applications increase my chances of landing interviews?",
    answer:
      " Automating job applications ensures speed, consistency, and keyword optimization. Flashfire's AI job application tool submits ATS-optimized applications instantly, improving visibility and interview conversion rates.",
  },
  {
    question: "Can job application automation help me land my dream job faster?",
    answer:
      " By applying to high-fit roles consistently and quickly, you're more likely to land interviews and offers in less time.",
  },
  {
    question: "How do I optimise my LinkedIn profile to improve automated job application results?",
    answer:
      " Make sure your profile matches your target job title, keywords, and skills. FlashFire's team also does this manually for you.",
  },
  {
    question: "What is an ATS resume, and why is it important for automated job applications?",
    answer:
      " An ATS resume is optimized to pass recruiter filters and software systems, which improves shortlisting odds. FlashFire tailors yours for each job.",
  },
  {
    question: "How does AI for job search integrate with job application automation tools?",
    answer:
      " Our AI scans job descriptions, extracts key requirements, and inserts them into your resume before our team submits each application.",
  },
  {
    question: "Does FlashFireJobs act as an AI job board with built-in automation features?",
    answer:
      " It combines AI resume matching + human-powered application submission, unlike traditional job boards.",
  },
  {
    question: "What are the best practices for job application automation to avoid common pitfalls?",
    answer:
      " Avoid mass-blind applications. Instead, target fresh, relevant roles with optimized resumes - which FlashFire does manually for each job.",
  },
  {
    question: "Can I customize applications while using automation?",
    answer:
      "Yes. Flashfire combines automated job applications with role-specific customization, ensuring every application is optimized without manual effort.",
  },
  {
    question: "How does automating job applications work with AI-powered job matching and alerts?",
    answer:
      " We use AI to match jobs based on your preferences, optimize your resume, then apply - while keeping you updated via WhatsApp.",
  },
  {
    question: "What is AI job application automation?",
    answer:
      " AI job application automation uses artificial intelligence to find relevant job openings, tailor your resume for each role, and submit applications on your behalf, saving you hours of manual work every week.",
  },
  {
    question: "How does FlashFire automatically apply for jobs?",
    answer:
      " FlashFire matches your profile with relevant job postings, optimizes your resume for each role, and submits the application for you, keeping you updated every step of the way.",
  },
  {
    question: "Is job application automation safe?",
    answer:
      " Yes. FlashFire only applies to genuine, relevant job openings using your real resume and profile details, and every application is reviewed for quality before it's sent.",
  },
  {
    question: "Can I review applications before they are submitted?",
    answer:
      " Yes, you can set your preferences upfront and review your resume and application details, so every submission reflects roles you actually want.",
  },
  {
    question: "How many jobs can FlashFire apply to each week?",
    answer:
      " FlashFire can submit 100+ targeted applications every week, depending on your job preferences and the number of matching roles available.",
  },
  {
    question: "Does FlashFire optimize my resume for every application?",
    answer:
      " Yes. FlashFire tailors your resume with relevant, ATS-friendly keywords for each job description before the application is submitted.",
  },
  {
    question: "Does FlashFire support LinkedIn Easy Apply jobs?",
    answer:
      " Yes, FlashFire supports LinkedIn Easy Apply roles along with applications on company career pages and other major job boards.",
  },
  {
    question: "Can I customize job preferences?",
    answer:
      " Yes, you can set preferences like job title, location, experience level, and industry, and FlashFire will apply only to roles that match your criteria.",
  },
  {
    question: "How does FlashFire improve interview chances?",
    answer:
      " By applying earlier, more consistently, and with ATS-optimized resumes, FlashFire increases your visibility to recruiters and improves your chances of getting interview calls.",
  },
  {
    question: "Can FlashFire help fresh graduates find jobs?",
    answer:
      " Yes, FlashFire helps fresh graduates apply to a high volume of entry-level opportunities while optimizing resumes to stand out with limited experience.",
  },
  {
    question: "Is FlashFire suitable for experienced professionals?",
    answer:
      " Yes, FlashFire works for professionals at every level, tailoring applications to highlight relevant experience and achievements for each role.",
  },
  {
    question: "How is FlashFire different from other AI job application tools?",
    answer:
      " FlashFire combines AI-powered automation with resume optimization and human oversight, ensuring every application is both fast and high-quality, not just mass-submitted.",
  },
];

export default function JobApplicationAutomationPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => {} });

  const handleFaqToggle = (index: number) =>
    setActiveFaqIndex(activeFaqIndex === index ? null : index);

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Automation_Page"
          : "Job_Automation_Page";
      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Automation_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_automation_cta", "cta", {
          button_location: "job_automation_hero_section",
          section: "job_automation_hero",
        });
        trackSignupIntent("job_automation_cta", {
          signup_source: "job_automation_hero_button",
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
      const isOnJobAutomationPage =
        stripLocalePrefix(normalizedPath) === "/job-application-automation" ||
        stripLocalePrefix(normalizedPath) === "/features/job-automation" ||
        stripLocalePrefix(normalizedPath) === "/features/automated-job-applications";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() =>
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
        );
        return;
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }
      if (isOnJobAutomationPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            localizeHref("/get-me-interview", normalizedPath)
          );
        }
        requestAnimationFrame(() =>
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
        );
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
    name: "Automated Job Applications",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-automation.png",
    description:
      "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner with FlashfireJobs. Check out now",
    brand: { "@type": "Brand", name: "FlashFire" },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/automated-job-applications",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "95",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire Automated Job Applications",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/automated-job-applications",
    description: "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "95" },
  };

  const faqSchemaAutomation = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jobAutomationFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Automated Job Applications", item: "https://www.flashfirejobs.com/features/automated-job-applications" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaAutomation) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-white font-['Space_Grotesk',sans-serif] text-[#111827]">
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white py-16 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1180px] px-5">
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex max-w-full items-center rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#ff4c00] sm:px-4 sm:text-[11px]">
                # AI Job Search Assistant
              </div>
              <h1 className="mx-auto max-w-[760px] text-[31px] font-extrabold leading-[1.12] tracking-normal text-gray-900 sm:text-5xl lg:text-[54px]">
                Automate Your Job Applications &amp; Land More Interviews
              </h1>
              <p className="mx-auto mt-5 max-w-[700px] text-sm font-medium leading-6 text-gray-600 sm:mt-7 sm:text-base sm:leading-7">
                FlashFire automates your job search by finding relevant jobs,
                optimizing applications for ATS, and submitting high-quality
                applications faster, helping you apply earlier, save time, and
                increase your chances of getting interview calls.
              </p>
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mt-8 inline-flex w-full max-w-[250px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:mt-10 sm:w-auto sm:max-w-none sm:px-8 sm:py-4 sm:text-base"
              >
                Get Me Interview <FaArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="pointer-events-none absolute left-[6%] top-[38%] hidden w-[190px] rounded-2xl border border-gray-100 bg-white/90 p-3 shadow-xl backdrop-blur-sm lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-end justify-center rounded-lg border border-[#cbd5e1] px-1.5 pb-1">
                  <span className="mr-0.5 h-2 w-1 rounded bg-[#111827]" />
                  <span className="mr-0.5 h-4 w-1 rounded bg-[#111827]" />
                  <span className="h-6 w-1 rounded bg-[#111827]" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#111827]">
                    Resume Strength
                  </p>
                  <p className="text-[10px] font-medium text-[#7b8191]">
                    James Steele - Product Engineer
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute left-[15%] top-[54%] hidden w-[110px] rounded-2xl border border-gray-100 bg-white/90 p-4 text-center shadow-xl backdrop-blur-sm md:block">
              <p className="text-[10px] font-bold uppercase text-[#7b8191]">Score</p>
              <p className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] bg-clip-text text-3xl font-extrabold leading-none text-transparent">82</p>
              <p className="mt-1 text-[10px] font-extrabold text-[#111827]">
                ATS Compatibility
              </p>
            </div>

            <div className="pointer-events-none absolute right-[2%] top-[43%] hidden w-[300px] rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-xl backdrop-blur-sm lg:block">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5c5c]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffc328]" />
                  <span className="h-3 w-3 rounded-full bg-[#19c463]" />
                </div>
                <span className="text-[10px] font-medium text-[#a0a7b5]">
                  Live Applications
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Software Engineer @ Google",
                  "Product Manager @ Meta",
                  "Data Scientist @ Netflix",
                ].map((job) => (
                  <div key={job} className="rounded-xl bg-[#f8fafc] p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-xs font-bold text-white shadow-md shadow-orange-200">
                        {job.charAt(0)}
                      </span>
                      <div>
                        <p className="text-[11px] font-extrabold text-[#111827]">
                          {job}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-[#18b85f]">
                          <FaCheck className="h-2.5 w-2.5" /> Applied 2m ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-[850px] grid-cols-2 gap-4 px-5 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-100 bg-white px-3 py-5 text-center shadow-md transition-shadow hover:shadow-lg sm:px-8 sm:py-7"
              >
                <p className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] bg-clip-text text-[28px] font-extrabold leading-none text-transparent sm:text-[34px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] font-extrabold uppercase leading-tight tracking-[0.06em] text-gray-600 sm:mt-3 sm:text-[11px] sm:tracking-[0.08em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-orange-50/40 py-16 sm:py-24">
          <div className="mx-auto max-w-[960px] px-5">
            <SectionHeader
              badge="How It Works"
              title="How FlashFire Automates Your Job Search in 4 Simple Steps"
              description="From finding matching jobs to submitting optimized applications, FlashFire automates repetitive tasks so you can spend more time preparing for interviews."
            />
            <div className="mt-10 grid auto-rows-fr gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200 sm:mb-7">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-extrabold leading-tight text-gray-900 sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[900px] px-5">
            <SectionHeader
              badge="How It Works"
              title="Why Job Seekers Choose FlashFire Over Manual Applications"
              description="Manual applications consume hours every week. FlashFire helps you apply earlier, more consistently, and more strategically."
            />
            <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:mt-20">
              <div className="h-9 bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] sm:h-12" />
              {comparisonData.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`grid grid-cols-[minmax(0,1fr)_38px_38px] items-center border-t border-gray-200 px-3 py-4 transition-colors hover:bg-orange-50/40 sm:grid-cols-[1fr_76px_76px] sm:px-4 sm:py-5 ${
                    index % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="break-words text-xs font-extrabold text-gray-900 sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 break-words text-[10px] font-medium leading-tight text-gray-600 sm:text-xs">
                      {item.caption}
                    </p>
                  </div>
                  <FaTimes className="mx-auto h-3.5 w-3.5 text-[#ff4c00] sm:h-4 sm:w-4" />
                  <span className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#18c45f] text-white sm:h-5 sm:w-5">
                    <FaCheck className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[900px] px-5">
            <SectionHeader
              badge="Built For Modern Job Seekers"
              title="Who Benefits From Job Application Automation?"
              description="Whether you're applying every day or struggling to stay consistent, FlashFire helps automate repetitive work so you can focus on interviews instead."
            />
            <div className="mt-10 grid auto-rows-fr gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {audienceGroups.map((group) => (
                <div
                  key={group.title}
                  className="h-full min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-white shadow-md shadow-orange-200 sm:mb-6">
                    {group.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 sm:text-xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
                    {group.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-24">
          <div className="mx-auto max-w-[760px] px-5">
            <div className="mx-auto text-center">
              <span className="inline-flex max-w-full items-center rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide leading-tight text-[#ff4c00]">
                The Problem With Modern Job Search
              </span>
              <h2 className="mx-auto mt-5 max-w-[620px] text-[33px] font-extrabold leading-[1.04] tracking-normal text-gray-900 sm:mt-7 sm:text-[42px]">
                Why Modern Job Search Needs Automation
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-sm font-medium leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-7">
                Finding the right job today isn&apos;t just about qualifications.
                Speed, consistency, and optimized applications make all the
                difference.
              </p>
            </div>
            <div className="mt-9 space-y-4 md:hidden">
              {problemSolutionPairs.map((item, index) => (
                <div
                  key={item.problem}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-100 bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase text-[#ff4c00]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4c00] to-[#ff7a33] text-xs text-white shadow-md shadow-orange-200">
                        {index + 1}
                      </span>
                      Problem
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-gray-900">
                      {item.problem}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                      {item.detail}
                    </p>
                  </div>
                  <div className="bg-orange-50/40 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase text-[#15803d]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18c45f] text-white">
                        <FaCheck className="h-3.5 w-3.5" />
                      </span>
                      AI Fix
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-gray-900">
                      {item.solution}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
                      {item.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:mt-20 md:block">
              <div className="grid grid-cols-2">
                <div className="bg-gray-50 px-4 py-4 text-xs font-extrabold text-gray-900 sm:px-5 sm:text-base">
                  <FaExclamationTriangle className="mr-2 inline h-4 w-4 text-[#ff4c00]" />
                  Why Manual Job applications Fail?
                </div>
                <div className="border-l border-gray-200 bg-gradient-to-r from-[#ff4c00] to-[#ff7a33] px-4 py-4 text-xs font-extrabold text-white sm:px-5 sm:text-base">
                  <FaCheck className="mr-2 inline h-4 w-4" />
                  How AI changes the game
                </div>
              </div>
              {manualProblems.map((problem, index) => {
                const solution = aiSolutions[index];

                return (
                  <div key={problem} className="grid grid-cols-2">
                    <div className="flex min-h-[82px] items-center border-t border-gray-200 px-4 py-4 text-xs font-medium leading-5 text-gray-600 sm:px-5 sm:py-5 sm:text-sm">
                      {problem}
                    </div>
                    <div className="flex min-h-[82px] items-center border-l border-t border-gray-200 bg-orange-50/40 px-4 py-4 text-xs font-extrabold leading-5 text-gray-900 sm:px-5 sm:py-5 sm:text-sm">
                      <FaCheck className="mr-2 inline h-4 w-4 text-[#ff4c00]" />
                      {solution}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>FAQs About AI Job Application Automation</h2>
            <p>
              We get it, job application automation can sound complex. Here&apos;s
              everything explained, plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobAutomationFAQs.map((faq, index) => (
              <div
                key={faq.question}
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
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto text-center">
      <span className="inline-flex max-w-full items-center rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-center text-[9px] font-bold uppercase tracking-wide leading-tight text-[#ff4c00] sm:text-[10px]">
        {badge}
      </span>
      <h2 className="mx-auto mt-5 max-w-[720px] text-[28px] font-extrabold leading-[1.08] tracking-normal text-gray-900 sm:mt-7 sm:text-[50px]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-[600px] text-sm font-medium leading-6 text-gray-600 sm:mt-6 sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
