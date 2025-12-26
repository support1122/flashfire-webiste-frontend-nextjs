"use client";

import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Mail, BarChart3, PhoneCall } from "lucide-react";

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
const ctaButtonClass =
  "inline-block rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#ff4c00] transition-all duration-300 hover:bg-[#222] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const steps = [
  {
    title: "Tell Us Your Goal",
    subtitle: "Takes 60 seconds",
    points: [
      "Share your background, skills, and career interests.",
      "We build a personalized job strategy for US & Canada roles.",
      "Visa-aware: OPT, CPT, STEM OPT, H-1B, sponsorship needs are baked in.",
    ],
    image: "/images/step1.png",
  },
  {
    title: "Your Resume & Profile Get Optimized",
    points: [
      "ATS-optimized resume with keyword-aligned versions.",
      "LinkedIn profile enhancement and skill gap suggestions.",
      "Hybrid model: AI precision + human review so you look hire-ready.",
    ],
    image: "/images/step2.png",
  },
  {
    title: "Flashfire Scans the Market Daily",
    points: [
      "Fresh, high-quality roles that match skills, visa, location, and salary.",
      "Sources: major job boards, company career pages, hidden recruiter roles.",
    ],
    image: "/images/step3.png",
  },
  {
    title: "Smart Apply System Handles Everything",
    points: [
      "Auto-fills forms and writes custom answers.",
      "Tailors your resume for each job with ATS-safe formatting.",
      "Submits applications on your behalf—no more repetitive answers.",
    ],
    image: "/images/step4.png",
  },
  {
    title: "Transparent Application Tracking",
    points: [
      "See jobs applied, status updates, recruiter responses, and predictions.",
      "Success probability for every application so you focus where it matters.",
    ],
    image: "/images/step2.png",
  },

];

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
    a: "Yes. From form filling to resume tailoring, each application is automated and tracked.",
  },
  {
    q: "Will Flashfire help me get interview calls?",
    a: "That is the core purpose of the platform—targeted, optimized applications that convert to interviews.",
  },
  {
    q: "Does Flashfire work for OPT/CPT students?",
    a: "Absolutely. We were built around visa-friendly job matching for OPT, CPT, STEM OPT, and H-1B paths.",
  },
  {
    q: "How fast can I expect interview calls?",
    a: "Most students begin receiving responses within 2–6 weeks, depending on their profile and target roles.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your data is encrypted and never shared with third parties.",
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

  return (
    <div className="bg-[#fff6f4] text-black min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <section className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-orange-100 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            How it works
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
            Your shortcut to interview calls
          </h1>
          <p className="mt-4 text-lg text-gray-700 md:text-xl">
            Flashfire turns your long, exhausting job search into a smooth,
            automated path to interview calls. You set the goal—Flashfire runs
            the entire journey.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleTalkToExpertClick("top_section")}
              className="inline-block rounded-lg bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Started — Start Getting Interview Calls
            </button>
            <p className="text-sm text-gray-600">
              No manual searching. No repetitive answers. Interviews faster.
            </p>
          </div>
        </section>

        <section ref={stepsSectionRef} className="bg-[#fff6f4] py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">

            <h2 className="text-3xl md:text-4xl font-bold text-black">
              How Flashfire Works in 4 Simple Steps
            </h2>

            <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-gray-600">
              The process of finding a job is complicated and time-consuming.
              Flashfire simplifies everything so you get interview calls faster
              with minimum effort.
            </p>



            <div className="relative mt-16 mx-auto max-w-5xl">

              {/* Connector line – perfectly centered */}
              {/* ================= STEPPER ================= */}
              <div className="mt-20 mx-auto max-w-5xl">
                <div className="grid grid-cols-4 items-start text-center">


                  {/* STEP 1 */}
                  <div className="relative flex flex-col items-center">
                    {/* Circle */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-semibold">
                        1
                      </div>
                    </div>

                    {/* Line to step 2 */}
                    <div className="absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />

                    <p className="mt-5 max-w-[200px] text-sm font-medium text-black">
                      Create your profile and upload your CV
                    </p>
                  </div>

                  {/* STEP 2 */}
                  <div className="relative flex flex-col items-center">
                    {/* Circle */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-semibold">
                        2
                      </div>
                    </div>

                    {/* Line to step 3 */}
                    <div className="absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />

                    <p className="mt-5 max-w-[240px] text-sm font-medium text-black">
                      Select your desired job titles, locations and many other optional
                      settings
                    </p>
                  </div>

                  {/* STEP 3 */}
                  <div className="relative flex flex-col items-center">
                    {/* Circle */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-semibold">
                        3
                      </div>
                    </div>

                   
                    <div className="absolute top-[28px] left-1/2 w-full h-px bg-gray-300" />

                    <p className="mt-5 max-w-[240px] text-sm font-medium text-black">
                      Flashfire will search for jobs and either apply on your behalf or give
                      you total control of your applications
                    </p>
                  </div>

                  {/* STEP 4 */}
                  <div className="relative flex flex-col items-center">
                    {/* Circle */}
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white text-sm font-semibold">
                        4
                      </div>
                    </div>

                    <p className="mt-5 max-w-[200px] text-sm font-medium text-black">
                    Start receiving interview calls from relevant job opportunities

                    </p>
                  </div>


                </div>
              </div>


            </div>

            {/* ================= CARDS ================= */}
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">


              {/* Card 1 */}
              <div className="rounded-xl bg-white px-8 py-12 shadow-md">
                <div className="mb-6 flex justify-center">
                  <RefreshCw className="h-7 w-7 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  Automatically apply to jobs
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Flashfire collects new job postings every day and automatically
                  applies using ATS-safe resumes. Prefer control? Apply manually.
                </p>

              </div>

              {/* Card 2 */}
              <div className="rounded-xl bg-white px-8 py-12 shadow-md">
                <div className="mb-6 flex justify-center">
                  <Mail className="h-7 w-7 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  Automatically email recruiters
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  We find recruiter emails and send personalised outreach
                  using proven or custom templates.
                </p>

              </div>

              {/* Card 3 */}
              <div className="rounded-xl bg-white px-8 py-12 shadow-md">
                <div className="mb-6 flex justify-center">
                  <BarChart3 className="h-7 w-7 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  Measure and improve
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Track opens, replies, resume performance and keyword impact
                  to improve interview conversion.
                </p>

              </div>
              {/* Card 4 */}
              <div className="rounded-xl bg-white px-8 py-12 shadow-md">
                <div className="mb-6 flex justify-center">
                  <PhoneCall className="h-7 w-7 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-black">
                  Get Interview Calls
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Start receiving interview invites as we track and optimize every
                  application. You focus on prep, we handle the hustle.
                </p>
              </div>


            </div>
          </div>
        </section>



        <section className="mt-14">
          <div className="rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-orange-100 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                  Demo
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                  Watch Flashfire handle applications end-to-end
                </h3>
                <p className="text-sm text-gray-700">
                  See the actual workflow we use to source, tailor, and submit
                  high-conversion applications for students.
                </p>
              </div>
              <button
                onClick={() => handleTalkToExpertClick("demo_section")}
                className={ctaButtonClass}
              >
                Talk to an expert
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-gray-100">
              <HomePageVideo />
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-gradient-to-br from-[#fff1ec] via-[#fff8f5] to-white p-6 ring-1 ring-orange-100 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-100">
                Why Flashfire works better
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-gray-900 md:text-3xl">
                Purpose-built for students who need interview calls fast
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
                We combine automation with human-quality control so every
                application is targeted, visa-safe, and competitive.
              </p>
            </div>

            <button
              onClick={() => handleTalkToExpertClick("why_flashfire_section")}
              className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(0,0,0,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Talk to an Expert
            </button>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl bg-white/80 p-5 text-sm text-gray-800 shadow-[0_10px_25px_rgba(0,0,0,0.06)] ring-1 ring-orange-100 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#ff4c00] via-[#ff7a45] to-transparent opacity-80" />
                <div className="relative flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#ff4c00] ring-1 ring-orange-100 transition-colors duration-300 group-hover:bg-orange-100">
                    <FaCheck className="text-base" />
                  </span>
                  <p className="leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className={styles.header}>
              <h2>Common questions from students &amp; job seekers</h2>
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

        <section className="mt-14 rounded-3xl bg-black px-6 py-10 text-white md:px-10">
          <h3 className="text-2xl font-semibold leading-snug md:text-3xl">
            Turn your endless job hunt into a structured, automated path to
            interview calls.
          </h3>
          <p className="mt-3 text-gray-200">
            We source, tailor, and submit high-intent applications every day
            while you focus on preparing for interviews.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleTalkToExpertClick("bottom_section")}
              className="inline-block rounded-lg bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Started — Start Getting Interview Calls
            </button>
            <span className="text-sm text-gray-200">
              It starts with a quick onboarding. We handle the rest.
            </span>
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
