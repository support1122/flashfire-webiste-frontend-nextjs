"use client";

import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Mail, BarChart3, PhoneCall, FileText, Rocket } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { trackButtonClick, trackSignupIntent, trackExternalLink } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";

function useInViewOnce() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const differentiators = [
  "Designed for international students: visa-aware matching (OPT, CPT, STEM OPT, H-1B).",
  "Hybrid AI + human review, so your profile is truly hire-ready.",
  "Daily sourcing across boards, company pages, and unlisted recruiter roles.",
  "Full-stack automation: form filling, custom answers, and ATS-tailored resumes.",
  "Transparent dashboard with success probabilities and recruiter response signals.",
  "Built-in interview prep once calls start coming in.",
];

const faqs = [
  {
    q: "Does Flashfire really apply for jobs automatically?",
    a: " Yes. From form filling to resume tailoring, each application is automated and tracked.",
  },
  {
    q: "Will Flashfire help me get interview calls?",
    a: " That is the core purpose of the platform—targeted, optimized applications that convert to interviews.",
  },
  {
    q: "Does Flashfire work for OPT/CPT students?",
    a: " Absolutely. We were built around visa-friendly job matching for OPT, CPT, STEM OPT, and H-1B paths.",
  },
  {
    q: "How fast can I expect interview calls?",
    a: " Most students begin receiving responses within 2–6 weeks, depending on their profile and target roles.",
  },
  {
    q: "Is my data secure?",
    a: " Yes. Your data is encrypted and never shared with third parties.",
  },
  {
    q: "Is Flashfire an AI job application tool or a full platform?",
    a: " Flashfire is a complete AI job application platform that combines an AI job application tool, resume optimization, LinkedIn optimization, and application tracking in one system.",
  },
  {
    q: "How does Flashfire improve interview chances?",
    a: " By using ATS-optimized resumes, targeted applications, and recruiter-aligned keywords, Flashfire increases the chances of getting interview calls, not just submissions.",
  },
];
const steps = [
  {
    heading: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
  },
  {
    heading: "We build your winning profile.",
    description:
      "We create ATS-optimized resumes and optimize LinkedIn profiles so your applications pass filters and rank higher in recruiter searches.",
    image: "/images/step2.png",
  },
  {
    heading: "Flashfire AI Applies for Jobs Automatically on Your Behalf",
    description:
      "Our AI job application tool automatically submits targeted applications to 1000+ curated roles using role-specific resumes and custom answers, no spam, no mass blasting.",
    image: "/images/step3.png",
  },
  {
    heading: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
  },
];



export default function HowItWorks() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);
  const carouselRef = useInViewOnce();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const autoAdvancePausedRef = useRef(false);
  const stepsSectionRef = useRef<HTMLDivElement>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const autoPlayCompletedRef = useRef(false);
  const scrollAttemptRef = useRef(false);

  const handleTalkToExpertClick = (buttonLocation: string) => {
    // Get UTM parameters from localStorage
    const utmSource = typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "WEBSITE"
      : "WEBSITE";
    const utmMedium = typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || `Website_How_It_Works_${buttonLocation}`
      : `Website_How_It_Works_${buttonLocation}`;
    const utmCampaign = typeof window !== "undefined"
      ? localStorage.getItem("utm_campaign") || "Website"
      : "Website";

    // Track with both GTag and PostHog
    GTagUTM({
      eventName: "whatsapp_support_click",
      label: `How_It_Works_Talk_To_Expert_${buttonLocation}`,
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    // PostHog tracking
    trackButtonClick("Talk to an Expert", "how_it_works_cta", "cta", {
      button_location: `how_it_works_${buttonLocation}`,
      section: "how_it_works"
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "how_it_works_cta", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp",
      source: `how_it_works_${buttonLocation}`,
    });

    // Open WhatsApp in a new tab
    window.open(WHATSAPP_SUPPORT_URL, "_blank");
  };

  // Lock/unlock body scroll
  useEffect(() => {
    if (isScrollLocked) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup: always unlock on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isScrollLocked]);

  // Intersection Observer to detect when steps section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when section is mostly visible (like in photo 2)
          // Check if at least 80% is visible and the section is well-positioned in viewport
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          
          // Check if section is well-positioned (not too high, not too low)
          const isWellPositioned = 
            rect.top >= 0 && 
            rect.top <= viewportHeight * 0.3 && // Top of section is in upper 30% of viewport
            rect.bottom >= viewportHeight * 0.6; // Bottom is at least 60% down
          
          if (
            entry.isIntersecting && 
            entry.intersectionRatio >= 0.8 && 
            isWellPositioned &&
            !autoPlayCompletedRef.current
          ) {
            // Steps section is fully in view and sequence hasn't completed yet
            setIsScrollLocked(true);
            setCurrentStep(0); // Start from step 1 (index 0)
            scrollAttemptRef.current = false;

            // Disconnect observer after first trigger
            observer.disconnect();
          }
        });
      },
      {
        threshold: [0.6, 0.7, 0.8, 0.9], // Multiple thresholds to check
        rootMargin: "0px",
      }
    );

    if (stepsSectionRef.current) {
      observer.observe(stepsSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle scroll attempts to advance steps
  useEffect(() => {
    if (!isScrollLocked) return;

    const advanceStep = () => {
      // Prevent multiple rapid triggers
      if (scrollAttemptRef.current) return;
      scrollAttemptRef.current = true;

      // Advance to next step
      setCurrentStep((prev) => {
        const nextStep = prev + 1;
        
        if (nextStep > 3) {
          // Step 4 (index 3) completed, unlock scrolling
          setIsScrollLocked(false);
          autoPlayCompletedRef.current = true;
          return 3; // Stay on step 4
        }
        
        // Reset the ref after a short delay to allow next scroll attempt
        setTimeout(() => {
          scrollAttemptRef.current = false;
        }, 300);
        
        return nextStep;
      });
    };

    const handleScrollAttempt = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      advanceStep();
    };

    const handleKeyboardScroll = (e: KeyboardEvent) => {
      // Handle arrow keys, page up/down, space
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        (e.key === " " && !e.shiftKey) // Space bar (down)
      ) {
        e.preventDefault();
        e.stopPropagation();
        advanceStep();
      }
    };

    // Listen for wheel (mouse scroll), touch events, and keyboard
    window.addEventListener("wheel", handleScrollAttempt, { passive: false });
    window.addEventListener("touchmove", handleScrollAttempt, { passive: false });
    window.addEventListener("keydown", handleKeyboardScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScrollAttempt);
      window.removeEventListener("touchmove", handleScrollAttempt);
      window.removeEventListener("keydown", handleKeyboardScroll);
    };
  }, [isScrollLocked]);

  // Auto-advance steps every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoAdvancePausedRef.current) {
        setCurrentStep((prev) => {
          // Loop back to step 0 after the last step
          return (prev + 1) % steps.length;
        });
      }
    }, 1500); // 1.5 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  const handleStepClick = (stepIndex: number) => {
    // Disable clicks during scroll-locked sequence
    if (isScrollLocked && !autoPlayCompletedRef.current) {
      return;
    }
    setCurrentStep(stepIndex);
    // Pause auto-advance for 10 seconds after user interaction, then resume
    autoAdvancePausedRef.current = true;
    setTimeout(() => {
      autoAdvancePausedRef.current = false;
    }, 10000);
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.flashfirejobs.com/#organization",
    "name": "Flashfirejobs",
    "url": "https://www.flashfirejobs.com/",
    "logo": "https://www.flashfirejobs.com/favicon.ico",
    "description": "Flashfire is an AI-powered job search platform helping candidates get interview calls faster through intelligent job matching and automation.",
    "sameAs": [
      "https://www.instagram.com/flashfirejobs/",
      "https://www.youtube.com/@flashfireindia",
      "https://www.linkedin.com/company/flashfire-pvt-ltd/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does Flashfire Really Apply For Jobs Automatically?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. From form filling to resume tailoring, each application is automated and tracked."
        }
      },
      {
        "@type": "Question",
        "name": "Will Flashfire Help Me Get Interview Calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "That is the core purpose of the platform—targeted, optimized applications that convert to interviews."
        }
      },
      {
        "@type": "Question",
        "name": "Does Flashfire Work for OPT/CPT Students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We were built around visa-friendly job matching for OPT, CPT, STEM OPT, and H-1B paths."
        }
      },
      {
        "@type": "Question",
        "name": "Is Flashfire an AI job application tool or a full platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flashfire is a complete AI job application platform that combines an AI job application tool, resume optimization, LinkedIn optimization, and application tracking in one system."
        }
      },
      {
        "@type": "Question",
        "name": "How does Flashfire improve interview chances?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By using ATS-optimized resumes, targeted applications, and recruiter-aligned keywords, Flashfire increases the chances of getting interview calls, not just submissions."
        }
      }
    ]
  };

  return (
    <div className="bg-[#fff6f4] text-black min-h-screen"> 
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
        <section className="rounded-3xl bg-gradient-to-br from-white via-white to-orange-50/30 p-8 shadow-lg ring-1 ring-orange-100/50 md:p-12 lg:p-16">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 ring-1 ring-orange-200/50">
              How it works
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              AI Job Application Software That Helps You Apply for Jobs Automatically
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-700 md:text-xl lg:text-xl">
              Flashfire is an AI job application tool that automates job searching, ATS-optimized resumes, and applications, helping students and job seekers apply for jobs automatically and get interview calls faster.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleTalkToExpertClick("top_section")}
                className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00]"
              >
                Get Started — Start Getting Interview Calls
              </button>
              <p className="text-sm font-medium text-gray-600 md:text-base">
                No manual searching. No repetitive answers. Interviews faster.
              </p>
            </div>
          </div>
        </section>

        <section ref={stepsSectionRef} className="mt-16 bg-gradient-to-b from-white to-orange-50/20 py-24 px-6 lg:px-8">
          {/* === Header === */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              How Our AI Job Application Software Helps You Apply for Jobs Automatically
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We turn your endless job hunt into a smooth, automated path to interview calls.
              <span className="text-[#ff4c00] font-semibold"> You set the goal, Flashfire takes care of the journey.</span>
            </p>
          </div>
          
          {/* === Steps Grid === */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-orange-50/40 border border-orange-100 rounded-2xl p-8 flex flex-col justify-between text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-200"
              >
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 pt-8 border border-orange-50">
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#ff4c00] mb-3">
                      STEP {index + 1}
                    </h3>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {step.heading}
                    </h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-8 p-4 bg-white/60 rounded-xl">
                  <Image
                    src={step.image}
                    alt={step.heading}
                    width={240}
                    height={240}
                    className="max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
   



        <section className="mt-16">
          <div className="rounded-3xl bg-gradient-to-br from-white via-white to-orange-50/30 p-6 shadow-lg ring-1 ring-orange-100/50 md:p-10 lg:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 ring-1 ring-orange-200/50">
                  Demo
                </p>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  Watch Flashfire handle AI Job applications end-to-end
                </h3>
                <p className="mt-3 text-base text-gray-700 leading-relaxed">
                  See the actual workflow we use to source, tailor, and submit
                  high-conversion applications for students.
                </p>
              </div>
              <button
                onClick={() => handleTalkToExpertClick("demo_section")}
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_0_#ff4c00] transition-all duration-300 hover:bg-gray-900 hover:-translate-y-0.5 hover:shadow-[0_6px_0_#ff4c00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black shrink-0"
              >
                Talk to an expert
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl ring-2 ring-gray-200/50 shadow-xl">
              <HomePageVideo />
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-[#fff1ec] via-[#fff8f5] to-white p-8 ring-1 ring-orange-100/50 shadow-xl md:p-12 lg:p-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-10">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200/50 shadow-sm">
                Why Flashfire works better
              </p>
              <h3 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                Purpose-built for students who need interview calls fast
              </h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                We combine automation with human-quality control so every
                application is targeted, visa-safe, and competitive.
              </p>
            </div>

            <button
              onClick={() => handleTalkToExpertClick("why_flashfire_section")}
              className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(255,76,0,0.3)] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(255,76,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00] shrink-0"
            >
              Talk to an Expert
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-6 text-base text-gray-800 shadow-lg ring-1 ring-orange-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-orange-200"
              >
                <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#ff4c00] via-[#ff7a45] to-[#ffa784]" />
                <div className="relative flex items-start gap-4 pl-2">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#ff4c00] ring-2 ring-orange-100 transition-all duration-300 group-hover:scale-110 group-hover:ring-orange-200">
                    <FaCheck className="text-lg font-bold" />
                  </span>
                  <p className="leading-relaxed font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="relative py-24 mt-16 overflow-hidden bg-gradient-to-br from-white via-orange-50/20 to-white rounded-3xl shadow-xl ring-1 ring-orange-100/50">
          {/* Gradient Accent */}
          <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-bl from-[#fcc194]/30 via-[#ffa784]/20 to-transparent hidden lg:block" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* LEFT: Content */}
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Who Is This <span className="text-[#ff4c00]">AI Job Application</span><br />
                  Software For?
                </h2>

                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
                  Flashfire is designed for students and job seekers who want to
                  <span className="font-semibold text-gray-900"> apply at scale, save time,&nbsp;</span>
                  and finally get <span className="font-semibold text-gray-900">real interview calls</span>
                  &nbsp; instead of silence or auto-rejections.
                </p>

                <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
                  This isn't another "job board". It's an execution engine for people who want outcomes.
                </p>
              </div>

              {/* RIGHT: Personas */}
              <div className="space-y-5">
                {[
                  { num: "01", title: "International Students", desc: "OPT, CPT, and STEM OPT candidates applying under strict visa timelines." },
                  { num: "02", title: "U.S. & Canada Job Seekers", desc: "Candidates targeting U.S. & Canada-based roles across tech, business, and operations." },
                  { num: "03", title: "Burnt-Out Applicants", desc: "People tired of filling the same forms with zero response." },
                  { num: "04", title: "Results-Driven Users", desc: "Anyone looking for an AI job application tool that actually converts." },
                ].map((persona, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-5 p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-md ring-1 ring-orange-100/50 hover:shadow-xl hover:ring-orange-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center ring-2 ring-orange-100 group-hover:ring-orange-300 transition-all duration-300 group-hover:scale-110 shrink-0">
                      <span className="text-[#ff4c00] font-bold text-lg">{persona.num}</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">
                        {persona.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {persona.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section className="mt-16 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className={`${styles.header} mb-12`}>
              <h2>Frequently Asked Questions About Applying for Jobs Automatically with AI</h2>
              <p>
                Ask us anything—here are the essentials to get you started.
              </p>
            </div>

            <div className={`${styles.faqContainer} w-full`}>
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""
                  }`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <span>{faq.q}</span>
                    <span className={styles.icon}>
                      {activeFaq === index ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>

                  {activeFaq === index && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 px-8 py-12 text-white md:px-12 lg:px-16 shadow-2xl ring-1 ring-gray-800">
          <div className="max-w-4xl">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Turn your endless job hunt into a structured, automated path to
              interview calls.
            </h3>
            <p className="mt-5 text-lg md:text-xl text-gray-300 leading-relaxed">
              We source, tailor, and submit high-intent applications every day
              while you focus on preparing for interviews.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleTalkToExpertClick("bottom_section")}
                className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00]"
              >
                Get Started — Start Getting Interview Calls
              </button>
              <span className="text-sm md:text-base text-gray-300 font-medium">
                It starts with a quick onboarding. We handle the rest.
              </span>
            </div>
          </div>
        </section>

        <style jsx global>{`
  .step-card {
    opacity: 0;
    transform: translateY(36px);
    transition:
      opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform, opacity;
  }

  .step-card.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`}</style>

      </main>

      <Footer />
      <SalesPopUp />
    </div>
  );
}
