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
const ctaButtonClass =
  "inline-block rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#ff4c00] transition-all duration-300 hover:bg-[#222] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

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

      <main className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <section className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-orange-100 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            How it works
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
            AI Job Application Software That Helps You Apply for Jobs Automatically
          </h1>
          <p className="mt-4 text-lg text-gray-700 md:text-xl">
            Flashfire is an AI job application tool that automates job searching, ATS-optimized resumes, and applications, helping students and job seekers apply for jobs automatically and get interview calls faster.
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

            <section className="bg-white py-20 px-6 text-center font-['Space_Grotesk',sans-serif]">
      {/* === Header === */}
      <div className="w-[90%] mx-auto mb-16">
        <h2 className="w-[65%] mx-auto mb-4 text-[2.8rem] font-bold text-[#111] leading-[1.3] max-[1024px]:w-[80%] max-[1024px]:text-[2.2rem] max-[768px]:w-full max-[768px]:text-[1.8rem] max-[480px]:text-[1.6rem]">
          How Our AI Job Application Software Helps You Apply for Jobs Automatically
          
        
       </h2>
         <p className="w-[60%] mx-auto text-[1.15rem] text-[#444] leading-[1.6] max-[1024px]:w-[75%] max-[1024px]:text-[1rem] max-[768px]:w-[95%] max-[768px]:text-[1rem] max-[480px]:text-[0.9rem]">          We turn your endless job hunt into a smooth, automated path to
           interview calls.
           <span className="text-[#ff4c00] font-medium">
             You set the goal, Flashfire takes care of the journey.
           </span>
         </p>
       </div>
       {/* === Steps Grid === */}
       <div className="grid grid-cols-2 gap-6 justify-center items-stretch w-[85%] mx-auto max-[1024px]:w-[90%] max-[768px]:grid-cols-1 max-[768px]:w-[95%]">
         {steps.map((step, index) => (
           <div
             key={index}
             className="bg-[#faf1ed] border border-[#f1e1d8] rounded-[0.6rem] p-6 flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
           >
             <div className="bg-white rounded-[0.3rem] p-5 pb-0">
               <h3 className="text-[2.6rem] font-bold tracking-[0.08em] mb-2 max-[768px]:text-[2.2rem] bg-gradient-to-r from-[rgba(245,93,29,1)] to-[rgba(0,0,0,1)] text-transparent bg-clip-text">
                 \\STEP {index + 1}
               </h3>
               <h4 className="text-[1.8rem] font-bold text-[#111] mb-3 max-[1024px]:text-[1.5rem] max-[768px]:text-[1.3rem]">
                 {step.heading}
               </h4>
               <p className="text-[1.1rem] text-[#333] leading-[1.6] max-[768px]:text-[0.95rem]">
                 {step.description}
               </p>
             </div>
             <div className="flex justify-center items-center mt-6">
               <Image
                 src={step.image}
                 alt={step.heading}
                 width={200}
                 height={200}
                 className="max-w-full h-auto object-contain"
               />
             </div>
           </div>
         ))}
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
                  Watch Flashfire handle AI Job applications end-to-end
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
        <section className="relative py-24 mt-14 overflow-hidden bg-white rounded-3xl">
  {/* Gradient Accent */}                                                         
  <div className="absolute right-0 top-0 h-full w-[40%] bg-gradient-to-bl from-[#fcc194] via-[#ffa784] to-transparent hidden lg:block" />

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* LEFT: Content */}
      <div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          Who Is This <span className="text-[#ff4c00]">AI Job Application</span><br />
          Software For?
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Flashfire is designed for students and job seekers who want to
          <span className="font-semibold text-gray-900"> apply at scale, save time,&nbsp;</span>
          and finally get <span className="font-semibold text-gray-900">real interview calls</span>
           &nbsp; instead of silence or auto-rejections.
        </p>

        <p className="mt-4 text-gray-600">
          This isn’t another “job board”. It’s an execution engine for people who want outcomes.
        </p>
      </div>

      {/* RIGHT: Personas */}
      <div className="space-y-6">

        <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-[#ff4c00] font-bold">01</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              International Students
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              OPT, CPT, and STEM OPT candidates applying under strict visa timelines.
            </p>
          </div>
        </div>

        <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-[#ff4c00] font-bold">02</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              U.S. & Canada Job Seekers
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Candidates targeting U.S. & Canada-based roles across tech, business, and operations.
            </p>
          </div>
        </div>

        <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-[#ff4c00] font-bold">03</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Burnt-Out Applicants
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              People tired of filling the same forms with zero response.
            </p>
          </div>
        </div>

        <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-lg transition">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-[#ff4c00] font-bold">04</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Results-Driven Users
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Anyone looking for an AI job application tool that actually converts.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


        <section className="mt-14 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className={styles.header}>
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
