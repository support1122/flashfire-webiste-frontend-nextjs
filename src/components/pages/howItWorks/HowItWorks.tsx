"use client";

import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import { useCallback, useState } from "react";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackExternalLink, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  CreditCard,
  FileText,
  MapPin,
  Minus,
  PhoneCall,
  Plus,
  SquarePen,
  Target,
  User,
  X,
} from "lucide-react";

const steps = [
  {
    tag: "Setup",
    heading: "Tell us about your ideal job",
    description:
      "Choose your target role, preferred locations, salary expectations, and experience level so we can focus on opportunities that match your goals.",
    icon: Target,
  },
  {
    tag: "Optimize",
    heading: "Optimize Your Resume & LinkedIn",
    description:
      "We improve your resume for ATS systems and strengthen your LinkedIn profile to increase recruiter visibility.",
    icon: SquarePen,
  },
  {
    tag: "Apply",
    heading: "We Apply to the Right Jobs for You",
    description:
      "Your applications are customized, targeted, and submitted automatically using optimized resumes and tailored responses. We also email recruiters and hiring managers on your behalf to follow up on your applications.",
    icon: MapPin,
  },
  {
    tag: "Track",
    heading: "Start Receiving Interview Calls",
    description:
      "Track every application, monitor recruiter responses, and continue improving your job search while preparing for interviews.",
    icon: PhoneCall,
  },
];

const differentiators = [
  {
    num: "01",
    title: "Visa-Aware Job Matching",
    desc: "Visa-aware matching for international students on OPT, CPT, STEM OPT, and H-1B timelines.",
    icon: CreditCard,
  },
  {
    num: "02",
    title: "Automated Applications",
    desc: "Full-stack automation handles form filling, custom answers, and ATS-tailored resumes.",
    icon: SquarePen,
  },
  {
    num: "03",
    title: "Human + Technology",
    desc: "Hybrid AI and human review so your profile is truly hire-ready.",
    icon: User,
  },
  {
    num: "04",
    title: "Complete Job Search Dashboard",
    desc: "Transparent dashboard with success probabilities and recruiter response signals.",
    icon: FileText,
  },
  {
    num: "05",
    title: "Daily Job Discovery",
    desc: "Daily sourcing across boards, company pages, and unlisted recruiter roles.",
    icon: Clock3,
  },
  {
    num: "06",
    title: "Interview Preparation Included",
    desc: "Built-in interview prep once calls start coming in.",
    icon: PhoneCall,
  },
];

const personas = [
  {
    num: "01",
    title: "International Students (OPT, CPT & H-1B)",
    desc: "Visa-aware matching for OPT, CPT, STEM OPT, and H-1B timelines, so every application is one you can actually accept.",
  },
  {
    num: "02",
    title: "Professionals Seeking New Opportunities",
    desc: "Candidates targeting new roles across tech, business, and operations.",
  },
  {
    num: "03",
    title: "Busy Professionals",
    desc: "People juggling a job search around a demanding schedule who need help staying consistent.",
  },
  {
    num: "04",
    title: "Career Switchers",
    desc: "Anyone repositioning their experience for a new role, industry, or career path.",
  },
  {
    num: "05",
    title: "Fresh Graduates",
    desc: "Graduates entering the job market who want a structured, guided application process.",
  },
  {
    num: "06",
    title: "Tech Professionals",
    desc: "Engineers and technical candidates targeting roles that match their specific skill set.",
  },
];

const comparisonRows = [
  { alone: "Search manually", flashfire: "Daily job discovery" },
  { alone: "Generic resume", flashfire: "ATS-optimized resume" },
  { alone: "Apply individually", flashfire: "Automated targeted applications" },
  { alone: "Difficult tracking", flashfire: "Centralized dashboard" },
  { alone: "No interview preparation", flashfire: "Built-in interview preparation" },
  { alone: "Time-consuming", flashfire: "Save hours every week" },
];

const resultsStats = [
  { tag: "Volume", value: "300K+", label: "Applications Submitted", type: "spark" as const },
  { tag: "Outcome", value: "50K+", label: "Interview Calls Generated", type: "spark" as const },
  { tag: "Efficiency", value: "10+", label: "Hours Saved Every Week", type: "ring" as const, percent: 62, note: "per user, avg" },
  { tag: "Quality", value: "95%", label: "Resume Match Score", type: "ring" as const, percent: 95 },
];

const faqs = [
  {
    q: "Does Flashfire really apply for jobs automatically?",
    a: "Yes. Flashfire handles sourcing, tailoring, form filling, submission, tracking, and follow-up workflows.",
  },
  {
    q: "Will Flashfire help me get interview calls?",
    a: "That is the core goal: targeted, optimized applications that are built to convert into recruiter conversations.",
  },
  {
    q: "Does Flashfire work for OPT/CPT students?",
    a: "Yes. Flashfire is built around visa-friendly matching for OPT, CPT, STEM OPT, and H-1B paths.",
  },
  {
    q: "How fast can I expect interview calls?",
    a: "Most students begin receiving responses within 2-6 weeks, depending on their profile, target roles, and market timing.",
  },
  {
    q: "Is Flashfire an AI job application tool or a full platform?",
    a: "It is a complete platform that combines job automation, resume optimization, LinkedIn optimization, and application tracking.",
  },
  {
    q: "How does FlashFire choose which jobs to apply for?",
    a: "FlashFire matches roles to your target title, location, experience level, and visa requirements, then ranks them by fit before applying.",
  },
  {
    q: "Can I customize my job preferences?",
    a: "Yes. You can update your target role, locations, salary expectations, and experience level at any time.",
  },
  {
    q: "Does FlashFire optimize my resume for every application?",
    a: "Yes. Each application uses a resume tailored and ATS-optimized for that specific role.",
  },
  {
    q: "Can I track every job application?",
    a: "Yes. Every application is logged in a centralized dashboard so you can see its status at a glance.",
  },
  {
    q: "Does FlashFire support international students?",
    a: "Yes. FlashFire is built around visa-aware matching for OPT, CPT, STEM OPT, and H-1B candidates.",
  },
  {
    q: "Can I use FlashFire if I already have a resume?",
    a: "Yes. We optimize your existing resume for ATS systems and tailor it further for each application.",
  },
  {
    q: "How quickly can I start getting interview calls?",
    a: "Most users start seeing interview calls within one to two weeks, depending on their profile and target roles.",
  },
  {
    q: "Does FlashFire help with interview preparation?",
    a: "Yes. Once interview calls start coming in, FlashFire includes built-in interview preparation support.",
  },
  {
    q: "Can I pause or update my applications anytime?",
    a: "Yes. You can pause, resume, or update your job preferences and applications whenever you need to.",
  },
  {
    q: "Is FlashFire suitable for experienced professionals?",
    a: "Yes. Experienced professionals and career switchers use FlashFire to target roles that match their background.",
  },
];

function Sparkline({ color = "#ff4c00" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 36" className="mt-2 h-9 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points="0,32 18,26 34,28 50,16 66,19 82,7 100,4"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RingStat({ percent, color = "#ff4c00" }: { percent: number; color?: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="mt-1" aria-hidden="true">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#eee1da" strokeWidth="5" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent / 100)}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
      />
    </svg>
  );
}

export default function HowItWorks() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePersona, setActivePersona] = useState<number>(0);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const handleGetStarted = useCallback((location: string) => {
    const getLocal = (key: string, fallback: string) =>
      typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

    const utmSource = getLocal("utm_source", "WEBSITE");
    const utmMedium = getLocal("utm_medium", "How_It_Works_Page");
    const utmCampaign = getLocal("utm_campaign", "Website");

    GTagUTM({
      eventName: "sign_up_click",
      label: `${location}_Get_Started_Free`,
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    trackButtonClick("Get Started Free", `${location}_cta`, "cta", {
      button_location: location,
      section: "how_it_works_page",
    });

    trackSignupIntent(`${location}_cta`, {
      signup_source: location,
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
    }
  }, []);

  const handleTalkToExpertClick = (buttonLocation: string) => {
    const utmSource =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
    const utmMedium =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || `Website_How_It_Works_${buttonLocation}`
        : `Website_How_It_Works_${buttonLocation}`;
    const utmCampaign =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_campaign") || "Website"
        : "Website";

    GTagUTM({
      eventName: "whatsapp_support_click",
      label: `How_It_Works_Talk_To_Expert_${buttonLocation}`,
      utmParams: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign },
    });

    trackButtonClick("Talk to an Expert", "how_it_works_cta", "cta", {
      button_location: `how_it_works_${buttonLocation}`,
      section: "how_it_works",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "how_it_works_cta", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp",
      source: `how_it_works_${buttonLocation}`,
    });

    window.open(WHATSAPP_SUPPORT_URL, "_blank");
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#fff6f1] text-[#080706]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="w-full overflow-hidden pb-9 lg:pb-14">
        <section className="overflow-hidden rounded-[13px] bg-[#fbe4da] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:flex lg:min-h-[720px] lg:items-center lg:px-[54px] lg:py-24 xl:min-h-[780px]">
          <div className="grid w-full gap-9 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="min-w-0">
              <h1 className="max-w-[540px] text-[2.1rem] font-extrabold leading-[1.08] text-[#111827] sm:text-[2.5rem] lg:text-[3.4rem]">
                Land More Interview
                <br />
                Without Spending Hours
                <br />
                <span className="text-[#ff4c00]">Applying</span>
              </h1>
              <p className="mt-4 max-w-[540px] text-[0.95rem] font-semibold leading-6 text-[#4f596a]">
                FlashFire helps you find relevant jobs, optimize your resume, submit high-quality
                applications, and track every opportunity, so you spend less time applying and more
                time preparing for interviews.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  {...getButtonProps()}
                  onClick={() => handleGetStarted("hero_primary")}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#ff4c00] px-6 text-sm font-extrabold text-white shadow-[0_12px_20px_rgba(255,76,0,0.22)] transition hover:bg-[#e84400] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2 sm:min-h-[50px] sm:w-auto sm:px-7 sm:text-base"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => handleTalkToExpertClick("hero_secondary")}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[8px] bg-white px-6 text-sm font-extrabold text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition hover:bg-[#fff2ea] sm:min-h-[50px] sm:w-auto sm:px-7 sm:text-base"
                >
                  Book a Free Career Call
                </button>
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative mx-auto aspect-[4/3.2] w-full max-w-[430px] overflow-hidden rounded-[22px] border border-[#f6c9a8] bg-gradient-to-b from-[#ffc79b] via-[#fff2e8] to-white p-5 shadow-[0_18px_40px_rgba(255,76,0,0.14)] lg:max-w-[480px]">
                <span className="text-[11px] font-semibold text-[#4b4541]">Application flow</span>

                <span
                  className="absolute -translate-x-1/2 text-[10px] font-bold uppercase tracking-wide text-[#9a938c]"
                  style={{ left: "82%", top: "4%" }}
                >
                  Live
                </span>
                <span
                  className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-[#ffb020]"
                  style={{ left: "82%", top: "15%" }}
                />

                <svg
                  viewBox="0 0 400 260"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 44 202.8 C 50 199.77, 58 187.63, 80 184.6 C 102 181.57, 146.67 186.77, 176 184.6 C 205.33 182.43, 236 191.1, 256 171.6 C 272 130, 292 90, 296 67.6 C 300 50, 316 42, 328 39"
                    fill="none"
                    stroke="#ffb18a"
                    strokeWidth="2.5"
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                  />
                </svg>

                <span
                  className="absolute h-2 w-2 -translate-x-1/2 rounded-full bg-[#aca39c]"
                  style={{ left: "11%", top: "78%" }}
                />

                <span
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ff4c00]"
                  style={{ left: "20%", top: "71%" }}
                />
                <div
                  className="absolute w-[80px] -translate-x-1/2 text-center text-[11px] font-bold leading-tight text-[#111827]"
                  style={{ left: "20%", top: "50%" }}
                >
                  300K+
                  <br />
                  Applied
                </div>

                <span
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ff4c00]"
                  style={{ left: "44%", top: "71%" }}
                />
                <div
                  className="absolute w-[80px] -translate-x-1/2 text-center text-[11px] font-bold leading-tight text-[#111827]"
                  style={{ left: "44%", top: "50%" }}
                >
                  AI
                  <br />
                  Matched
                </div>

                <span
                  className="absolute h-2.5 w-2.5 rounded-full bg-[#ff4c00]"
                  style={{ left: "63%", top: "65%" }}
                />
                <div
                  className="absolute w-[70px] text-[11px] font-bold leading-tight text-[#111827]"
                  style={{ left: "67%", top: "59%" }}
                >
                  95%
                  <br />
                  Called
                </div>

                <div
                  className="absolute w-[80px] text-[11px] font-bold leading-tight text-[#111827]"
                  style={{ left: "80%", top: "59%" }}
                >
                  1wk
                  <br />
                  Interview
                </div>

                <span
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ff4c00]"
                  style={{ left: "74%", top: "26%" }}
                />
              </div>

              <p className="mx-auto mt-5 max-w-[430px] text-xs font-bold text-[#8b94a3]">
                No manual searching. No repetitive forms.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-white px-4 py-12 sm:px-5 md:py-14">
          <div className="mx-auto max-w-[750px] text-center">
            <h2 className="text-[2rem] font-extrabold leading-[1.1] text-[#111827] sm:text-[2.4rem] md:text-[3rem]">
              How FlashFire Helps
              <br />
              You Land Interviews
            </h2>
            <p className="mx-auto mt-4 max-w-[380px] text-[0.85rem] font-medium leading-[1.3] text-[#596273] sm:max-w-[480px] sm:text-[1.05rem] sm:leading-[1.2]">
              Your dedicated job search workflow, from resume optimization to interview calls, all
              managed in one place.
            </p>
          </div>

          <div className="relative mx-auto mt-9 max-w-[1000px] sm:mt-[64px]">
            <div
              className="absolute left-[27px] top-2 bottom-2 w-px bg-[#f3c7ae] sm:left-[35px]"
              aria-hidden="true"
            />
            <div className="space-y-5 sm:space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.heading} className="relative flex items-stretch gap-4 sm:gap-7">
                    <div className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center self-center rounded-[10px] bg-gradient-to-br from-[#ff7a3d] to-[#ff4c00] text-lg font-extrabold text-white shadow-[0_8px_16px_rgba(255,76,0,0.28)] sm:h-[70px] sm:w-[70px] sm:rounded-[14px] sm:text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex min-h-[110px] flex-1 items-center justify-between gap-4 rounded-[10px] border border-[#f6c9a8] bg-[#fbe4da] px-5 py-5 shadow-[0_4px_14px_rgba(255,108,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(255,76,0,0.14)] sm:min-h-[132px] sm:px-8">
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[#ff4c00] sm:text-[0.72rem]">
                          Step {index + 1} &middot; {step.tag}
                        </p>
                        <h3 className="mt-1.5 text-[0.92rem] font-extrabold leading-[1.15] text-[#111827] sm:text-[1.2rem]">
                          {step.heading}
                        </h3>
                        <p className="mt-2 max-w-[600px] text-[0.72rem] font-medium leading-[1.35] text-[#596273] sm:text-[0.9rem]">
                          {step.description}
                        </p>
                      </div>
                      <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_14px_rgba(255,76,0,0.15)] sm:flex">
                        <Icon className="h-8 w-8 text-[#ff4c00]" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-10 text-center sm:px-5 md:px-8 md:py-[78px]">
          <h2 className="text-[1.85rem] font-extrabold leading-tight text-[#111827] sm:text-[2.15rem] md:text-[3rem]">
            See Your Entire Job Search Automated
          </h2>
          <p className="mx-auto mt-4 max-w-[330px] text-[0.86rem] font-semibold leading-[1.4] text-[#596273] sm:max-w-[540px] sm:text-[1rem]">
            Watch how FlashFire finds jobs, customizes applications, submits them automatically,
            and tracks every opportunity.
          </p>
          <button
            onClick={() => handleTalkToExpertClick("demo_cta")}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#ff4c00] px-6 text-sm font-extrabold text-white shadow-[0_12px_20px_rgba(255,76,0,0.22)] transition hover:bg-[#e84400] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2 sm:mt-7 sm:min-h-[54px] sm:gap-3 sm:rounded-[9px] sm:px-8 sm:text-base sm:shadow-[0_14px_24px_rgba(255,76,0,0.24)]"
          >
            Talk to an Expert
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="mx-auto mt-8 max-w-[1135px] rounded-[16px] bg-[#ff5018] px-3 py-3 shadow-[0_24px_60px_rgba(255,76,0,0.22)] sm:px-6 sm:py-6 md:mt-10 md:px-[54px] md:py-[48px]">
            <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <video
                className="block aspect-video w-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/ii.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 md:px-8 md:py-[120px]">
          <h2 className="mx-auto max-w-[500px] text-center text-[2rem] font-extrabold leading-[1.12] text-[#111827] sm:max-w-none sm:text-[2.45rem] md:text-[3.45rem]">
            Everything You Need to Land More Interviews
          </h2>

          <div className="mx-auto mt-8 max-w-[1052px] overflow-hidden rounded-[14px] border border-[#e5dcd6] bg-white shadow-[0_16px_40px_rgba(17,24,39,0.06)] sm:mt-14">
            <div className="grid sm:grid-cols-3">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                const isLastCol = (index + 1) % 3 === 0;
                const isLastRow = index >= differentiators.length - 3;

                return (
                  <div
                    key={item.title}
                    className={`border-b border-[#e5dcd6] px-6 py-7 transition-colors duration-300 hover:bg-[#fff8f5] sm:px-8 sm:py-9 ${
                      !isLastCol ? "sm:border-r" : ""
                    } ${isLastRow ? "sm:border-b-0" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#fff1e8]">
                      <Icon className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
                    </div>
                    <p className="mt-4 text-[0.85rem] font-extrabold text-[#ff4c00]">{item.num}</p>
                    <p className="mt-1 text-[1rem] font-extrabold leading-[1.25] text-[#1f2a44] sm:text-[1.1rem]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.82rem] font-medium leading-[1.4] text-[#596273] sm:text-[0.9rem]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleTalkToExpertClick("why_flashfire")}
              className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[9px] bg-[#ff4c00] px-8 text-base font-extrabold text-white shadow-[0_14px_24px_rgba(255,76,0,0.24)] transition hover:bg-[#e84400] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
            >
              Talk to an Expert
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#fffaf7] px-5 py-14 md:px-8 md:py-[100px]">
          <div
            className="pointer-events-none absolute -top-16 left-[-60px] h-[300px] w-[300px] rounded-full bg-[#ffd9b8]/40 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-[-40px] h-[280px] w-[280px] rounded-full bg-[#ffe1cf]/60 blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[640px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffcdad] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#ff4c00] shadow-[0_4px_12px_rgba(255,76,0,0.08)] sm:text-[11px]">
              Why FlashFire
            </span>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.12] text-[#111827] sm:text-[2.3rem] md:text-[3.1rem]">
              Why Job Seekers Choose FlashFire
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9rem] font-medium leading-6 text-[#596273] sm:text-[1rem]">
              Four ways FlashFire replaces the busywork of a job search with a system that
              actually gets you interviews.
            </p>
          </div>

          <div className="relative mx-auto mt-9 grid max-w-[1220px] gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group flex flex-col rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(17,24,39,0.06)] ring-1 ring-[#f0e4dc] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(255,76,0,0.14)] hover:ring-[#ffcdad]">
              <div className="h-1 w-10 rounded-full bg-[#ff4c00]" />
              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fff1e8] transition-colors duration-300 group-hover:bg-[#ffe1d1]">
                <Clock3 className="h-5 w-5 text-[#ff4c00]" strokeWidth={2} />
              </div>
              <div className="mb-2 mt-6 space-y-3">
                <div>
                  <span className="text-[10px] font-semibold text-[#b3aca7]">Manual</span>
                  <div className="mt-1 h-2 w-full rounded-full bg-[#e9e4e0]">
                    <div className="h-2 w-[85%] rounded-full bg-[#c9c2bc]" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#ff4c00]">Flashfire</span>
                  <div className="mt-1 h-2 w-full rounded-full bg-[#ffe1d1]">
                    <div className="h-2 w-[35%] rounded-full bg-[#ff4c00]" />
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-[16px] font-extrabold leading-6 text-[#111827]">
                Save hours every week
              </h3>
              <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">
                Stop searching and applying manually, we run the repetitive work in the background.
              </p>
            </div>

            <div className="group flex flex-col rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(17,24,39,0.06)] ring-1 ring-[#f0e4dc] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(255,76,0,0.14)] hover:ring-[#ffcdad]">
              <div className="h-1 w-10 rounded-full bg-[#ff4c00]" />
              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fff1e8] transition-colors duration-300 group-hover:bg-[#ffe1d1]">
                <Target className="h-5 w-5 text-[#ff4c00]" strokeWidth={2} />
              </div>
              <div className="mb-2 mt-6 flex items-center gap-1">
                <RingStat percent={55} color="#d9d2cc" />
                <RingStat percent={80} color="#ff4c00" />
              </div>
              <h3 className="mt-3 text-[16px] font-extrabold leading-6 text-[#111827]">
                Better Quality Applications
              </h3>
              <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">
                Every application is optimized for the role, not a generic resume blasted everywhere.
              </p>
            </div>

            <div className="group flex flex-col rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(17,24,39,0.06)] ring-1 ring-[#f0e4dc] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(255,76,0,0.14)] hover:ring-[#ffcdad]">
              <div className="h-1 w-10 rounded-full bg-[#ff4c00]" />
              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fff1e8] transition-colors duration-300 group-hover:bg-[#ffe1d1]">
                <FileText className="h-5 w-5 text-[#ff4c00]" strokeWidth={2} />
              </div>
              <div className="mb-2 mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Applied", h: "70%" },
                  { label: "Review", h: "42%" },
                  { label: "Interview", h: "88%" },
                ].map((b) => (
                  <div key={b.label}>
                    <span className="text-[9px] font-semibold text-[#b3aca7]">{b.label}</span>
                    <div className="mt-2 flex h-14 items-end rounded-md bg-[#faf1ec] p-1">
                      <div
                        className="w-full rounded bg-[#ff4c00]"
                        style={{ height: b.h }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="mt-3 text-[16px] font-extrabold leading-6 text-[#111827]">Stay organized</h3>
              <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">
                Track every application in one dashboard, sorted by stage, never lose track of a lead.
              </p>
            </div>

            <div className="group flex flex-col rounded-[16px] bg-white p-6 shadow-[0_8px_24px_rgba(17,24,39,0.06)] ring-1 ring-[#f0e4dc] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(255,76,0,0.14)] hover:ring-[#ffcdad]">
              <div className="h-1 w-10 rounded-full bg-[#ff4c00]" />
              <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fff1e8] transition-colors duration-300 group-hover:bg-[#ffe1d1]">
                <PhoneCall className="h-5 w-5 text-[#ff4c00]" strokeWidth={2} />
              </div>
              <div className="mb-2 mt-6 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-[3px] bg-[#ff4c00]" />
                  <span className="h-2 flex-1 rounded-full bg-[#ffd9c2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-[3px] bg-[#ff4c00]" />
                  <span className="h-2 flex-1 rounded-full bg-[#ffd9c2]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-[3px] bg-[#e9e4e0]" />
                  <span className="h-2 flex-1 rounded-full bg-[#efe9e4]" />
                </div>
              </div>
              <h3 className="mt-3 text-[16px] font-extrabold leading-6 text-[#111827]">Interview ready</h3>
              <p className="mt-3 text-[13px] font-medium leading-6 text-[#6b7280]">
                Resume optimization, applications, tracking, and interview prep, all in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fff3f1] px-5 py-[50px] md:px-12 lg:px-[60px]">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="max-w-[520px] text-[2.25rem] font-extrabold leading-[1.12] text-[#111827] md:text-[3rem]">
                <span className="text-[#ff4c00]">Who</span> Can Benefit From FlashFire?
              </h2>
              <p className="mt-7 max-w-[530px] text-[1.05rem] font-medium leading-[1.55] text-[#777171]">
                Whether you&apos;re applying for your first job or your next leadership role,
                FlashFire helps you{" "}
                <span className="font-extrabold text-[#111827]">apply smarter</span> and get{" "}
                <span className="font-extrabold text-[#111827]">more interviews</span>.
              </p>
              <p className="mt-1 max-w-[530px] text-[1.05rem] font-medium leading-[1.55] text-[#777171]">
                This isn&apos;t another job board. It&apos;s an execution engine for
                people who want outcomes.
              </p>

              <div className="mt-8 rounded-[12px] bg-gradient-to-br from-[#ff7a3d] to-[#ff5018] p-6 text-white shadow-[0_18px_36px_rgba(255,80,24,0.3)] sm:p-8">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[5px] bg-white/15 text-sm font-extrabold">
                  {personas[activePersona].num}
                </span>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-tight sm:text-[1.25rem]">
                  {personas[activePersona].title}
                </h3>
                <p className="mt-2 text-[0.85rem] font-medium leading-[1.45] text-white/90 sm:text-[0.92rem]">
                  {personas[activePersona].desc}
                </p>
              </div>
            </div>

            <div className="w-full space-y-[10px]">
              {personas.map((persona, index) => {
                const isActive = activePersona === index;

                return (
                  <button
                    key={persona.num}
                    type="button"
                    className={`flex min-h-[59px] w-full items-center gap-4 rounded-[8px] border px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-[#ff4c00] bg-[#fff3ee] shadow-[0_8px_20px_rgba(255,76,0,0.12)]"
                        : "border-[#e5dcd6] bg-white hover:border-[#ffcdbd] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                    }`}
                    onClick={() => setActivePersona(index)}
                    aria-pressed={isActive}
                  >
                    <span
                      className={`text-[0.95rem] font-extrabold ${
                        isActive ? "text-[#ff4c00]" : "text-[#b3aca7]"
                      }`}
                    >
                      {persona.num}
                    </span>
                    <span
                      className={`min-w-0 flex-1 text-[0.9rem] font-extrabold ${
                        isActive ? "text-[#111827]" : "text-[#4b5563]"
                      }`}
                    >
                      {persona.title}
                    </span>
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                      <ArrowDown className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 md:px-8 md:py-[90px]">
          <h2 className="mx-auto max-w-[600px] text-center text-[2rem] font-extrabold leading-[1.1] text-[#111827] sm:text-[2.4rem] md:text-[3rem]">
            Applying on Your Own vs FlashFire
          </h2>
          <div className="mx-auto mt-9 max-w-[900px] sm:mt-12">
            <div className="mb-3 grid grid-cols-[1fr_36px_1fr] items-center gap-2 sm:grid-cols-[1fr_48px_1fr] sm:gap-3">
              <div className="text-center text-[11px] font-extrabold text-[#6b7280] sm:text-[14px]">
                Applying Alone
              </div>
              <div />
              <div className="text-center text-[11px] font-extrabold text-[#ff4c00] sm:text-[14px]">
                FlashFire
              </div>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {comparisonRows.map((row) => (
                <div
                  key={row.alone}
                  className="grid grid-cols-[1fr_36px_1fr] items-center gap-2 sm:grid-cols-[1fr_48px_1fr] sm:gap-3"
                >
                  <div className="flex items-center gap-1.5 rounded-[8px] border border-[#f0d9cc] bg-[#fdf1ea] px-3 py-3 text-[11px] font-medium leading-snug text-[#9a938c] sm:gap-2 sm:px-5 sm:text-[13px]">
                    <X size={14} className="shrink-0 text-[#b3aca7]" />
                    {row.alone}
                  </div>
                  <span className="mx-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-white shadow-[0_4px_10px_rgba(255,76,0,0.3)] sm:h-8 sm:w-8">
                    <ArrowRight size={14} />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-[8px] border border-[#f7c9ab] bg-[#fff1e4] px-3 py-3 text-[11px] font-semibold leading-snug text-[#111827] shadow-[0_4px_12px_rgba(255,76,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(255,76,0,0.14)] sm:gap-2 sm:px-5 sm:text-[13px]">
                    <span className="min-w-0 flex-1">{row.flashfire}</span>
                    <Check size={14} className="shrink-0 text-[#ff4c00]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff3f1] px-4 py-14 sm:px-5 md:py-[90px]">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ffcdad] bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#ff4c00] shadow-[0_4px_12px_rgba(255,76,0,0.08)] sm:text-[11px]">
                Real Results
              </span>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.1] text-[#111827] sm:text-[2.4rem] md:text-[3rem]">
                Helping Job Seekers Get More Interviews
              </h2>
            </div>

            <div className="mt-9 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {resultsStats.map((stat, index) => {
                const icons = [FileText, PhoneCall, Clock3, Target];
                const Icon = icons[index % icons.length];

                return (
                  <div
                    key={stat.label}
                    className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#e5dcd6] bg-white p-6 shadow-[0_10px_26px_rgba(17,24,39,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffcdad] hover:shadow-[0_18px_36px_rgba(255,76,0,0.14)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#fff1e8] transition-colors duration-300 group-hover:bg-[#ff4c00]">
                        <Icon className="h-5 w-5 text-[#ff4c00] transition-colors duration-300 group-hover:text-white" strokeWidth={2} />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#b3aca7]">
                        {stat.tag}
                      </p>
                    </div>

                    <div className="mt-6 text-[2.1rem] font-extrabold leading-none text-[#111827] sm:text-[2.3rem]">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[13px] font-semibold leading-4 text-[#737987]">
                      {stat.label}
                    </div>

                    <div className="mt-5 flex items-center gap-2 border-t border-[#f0e4dc] pt-4">
                      {stat.type === "spark" ? (
                        <Sparkline />
                      ) : (
                        <>
                          <RingStat percent={stat.percent} />
                          {stat.note && (
                            <span className="text-[10px] font-medium text-[#b3aca7]">{stat.note}</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <HomePageHappyUsers
          variant="pricing"
          heading="See How Job Seekers Landed More Interviews"
          headingClassName="mb-[560px] max-w-[430px] text-[38px] font-black leading-[1.1] tracking-[-0.02em] text-white max-[1024px]:mb-[420px] max-[1024px]:text-[32px] max-[768px]:mb-4 max-[768px]:max-w-[360px] max-[768px]:text-[28px] max-[480px]:text-[24px]"
          ctaLabel="Start Your Job Search"
        />

        <section id="faq" className={`${styles.faqSection} !bg-[#fdeee6]`}>
          <div className="mx-auto max-w-[820px] text-center">
            <h2 className="text-[1.65rem] font-extrabold leading-[1.15] text-[#111827] sm:text-[2.2rem] md:text-[2.7rem]">
              FAQs About Our <span className="text-[#ff4c00]">AI Job Application</span>
              <br className="hidden sm:block" /> Platform &amp; Auto-Apply Features
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[0.85rem] font-medium leading-[1.4] text-[#596273] sm:text-[0.98rem]">
              We get it, AI job search can sound complex. Here&apos;s everything explained, plain
              and simple.
            </p>
          </div>

          <div className={`${styles.faqContainer} mt-9 sm:mt-12`}>
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <div
                  key={faq.q}
                  className={`${styles.faqItem} ${isActive ? styles.active : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(isActive ? null : index)}
                    aria-expanded={isActive}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.icon}>
                      {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isActive && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#fff6f1] px-5 py-16 md:px-8 md:py-24">
          <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-[24px] bg-[#ff4c00] px-6 py-12 text-center shadow-[0_30px_70px_rgba(255,76,0,0.22)] md:px-14 md:py-16">
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-[220px] w-[220px] rounded-full border border-white/15"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-10 h-[180px] w-[180px] rounded-full border border-white/10"
              aria-hidden="true"
            />

            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
              Start Today
            </span>
            <h2 className="relative mx-auto mt-5 max-w-[560px] text-[1.9rem] font-extrabold leading-[1.1] text-white md:text-[3rem]">
              Ready to Land More Interviews?
            </h2>
            <p className="relative mx-auto mt-4 max-w-[500px] text-[0.92rem] font-medium leading-6 text-white/80 sm:text-base">
              Optimize your resume, automate job applications, track every opportunity, and
              prepare for interviews, all from one platform.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                {...getButtonProps()}
                onClick={() => handleGetStarted("final_cta")}
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[8px] bg-white px-7 text-sm font-extrabold text-[#ff4c00] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition hover:bg-[#fff1e4] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#ff4c00] sm:min-h-[54px] sm:w-auto sm:px-8 sm:text-base"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => handleTalkToExpertClick("final_cta")}
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[8px] border border-white/40 bg-transparent px-7 text-sm font-extrabold text-white transition hover:bg-white/10 sm:min-h-[54px] sm:w-auto sm:px-8 sm:text-base"
              >
                Talk to an Expert
              </button>
            </div>

            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {["No credit card required", "Free to start", "Quick onboarding"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/85"
                >
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
