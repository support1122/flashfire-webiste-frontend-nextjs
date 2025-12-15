"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import { useEffect, useRef, useState } from "react";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { FaPlus, FaTimes } from "react-icons/fa";

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
  const [currentStep, setCurrentStep] = useState(0);
  const carouselRef = useInViewOnce();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const listener = (evt: WheelEvent) => handleWheel(evt);
    node.addEventListener("wheel", listener, { passive: false });

    return () => {
      node.removeEventListener("wheel", listener);
    };
  }, []);

  const handleWheel = (event: WheelEvent | React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 320) return; // throttle quick scrolls

    // prevent page scroll while interacting with steps
    event.preventDefault();
    event.stopPropagation();

    if (event.deltaY < -10) {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    } else if (event.deltaY > 10) {
      setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    }
    lastScrollTimeRef.current = now;
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
            <Link
              href="/talk-to-an-expert"
              className="inline-block rounded-lg bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Started — Start Getting Interview Calls
            </Link>
            <p className="text-sm text-gray-600">
              No manual searching. No repetitive answers. Interviews faster.
            </p>
          </div>
        </section>

        <section className="mt-12 md:mt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1 max-w-xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Path to success
              </p>
              <h2 className="text-[2.8rem] leading-[1.1] font-bold text-black max-[1024px]:text-[2.4rem]">
                From searching to interviewing, just 4 simple steps.
              </h2>
              <div className="space-y-3 text-lg text-[#111]">
                {["You share your goals", "We build your winning profile", "Flashfire applies while you chill", "You start getting interview calls"].map(
                  (item, idx) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black text-base font-semibold">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/talk-to-an-expert"
                  className="inline-flex items-center justify-center rounded-lg border border-black bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_3px_0_#ff4c00] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#ff4c00]"
                >
                  See Flashfire in Action →
                </Link>
                <Link href="/talk-to-an-expert" className={ctaButtonClass}>
                  Get Me Interview →
                </Link>
              </div>
            </div>

            <div className="flex-1" ref={carouselRef}>
              <div
                className="relative min-h-[540px] steps-carousel"
                role="presentation"
                onWheel={handleWheel}
              >
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  return (
                    <div
                      key={step.title}
                      className={`step-card absolute inset-0 bg-gradient-to-br from-[#f9e8dc] via-[#fdf5f0] to-[#f6d7c6] rounded-[1.1rem] p-1 border border-[#f5cdb7] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-opacity duration-500 ease-out ${
                        isActive ? "in-view" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white rounded-[0.9rem] p-6 shadow-sm h-full flex flex-col">
                        <div>
                          <h3 className="text-[2.4rem] font-bold tracking-[0.08em] mb-2 bg-gradient-to-r from-[rgba(245,93,29,1)] to-[rgba(0,0,0,1)] text-transparent bg-clip-text">
                            \\ STEP {index + 1}
                          </h3>

                          <h4 className="text-[1.6rem] font-bold text-[#111] mb-3">
                            {step.title}
                          </h4>

                          <div className="text-[1.05rem] text-[#333] leading-[1.6] space-y-2">
                            {step.points.map((point) => (
                              <p key={point}>{point}</p>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center items-center mt-6">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={220}
                            height={220}
                            className="max-w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              <Link
                href="/talk-to-an-expert"
                className={ctaButtonClass}
              >
                Talk to an expert
              </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-gray-100">
              <HomePageVideo />
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-2xl bg-orange-50 p-6 ring-1 ring-orange-100 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                Why Flashfire works better
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                Purpose-built for students who need interview calls fast
              </h3>
              <p className="mt-3 text-gray-700">
                We combine automation with human-quality control so every
                application is targeted, visa-safe, and competitive.
              </p>
            </div>
            <Link
              href="/talk-to-an-expert"
              className="inline-block rounded-lg bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"

            >
              Talk to an Expert
            </Link>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white p-4 text-sm text-gray-800 shadow-sm ring-1 ring-orange-100"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                <p>{item}</p>
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
                  className={`${styles.faqItem} ${
                    activeFaq === index ? styles.active : ""
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
            <Link
              href="/talk-to-an-expert"
              className="inline-block rounded-lg bg-[#ff4c00] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_3px_0_#000] transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"

            >
              Get Started — Start Getting Interview Calls
            </Link>
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
