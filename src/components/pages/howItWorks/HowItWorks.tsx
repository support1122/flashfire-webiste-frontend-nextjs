"use client";

import Image from "next/image";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import { useState } from "react";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { FaCheck, FaPlus, FaTimes, FaArrowRight, FaClock, FaUsers, FaRobot, FaBriefcase, FaPhoneAlt } from "react-icons/fa";

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
  {
    q: "Is Flashfire an AI job application tool or a full platform?",
    a: "Flashfire is a complete AI job application platform that combines an AI job application tool, resume optimization, LinkedIn optimization, and application tracking in one system.",
  },
  {
    q: "How does Flashfire improve interview chances?",
    a: "By using ATS-optimized resumes, targeted applications, and recruiter-aligned keywords, Flashfire increases the chances of getting interview calls, not just submissions.",
  },
];

const steps = [
  {
    heading: "You share your goals.",
    description: "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
    icon: FaUsers,
  },
  {
    heading: "We build your winning profile.",
    description: "We create ATS-optimized resumes and optimize LinkedIn profiles so your applications pass filters and rank higher in recruiter searches.",
    image: "/images/step2.png",
    icon: FaBriefcase,
  },
  {
    heading: "Flashfire AI Applies for Jobs Automatically on Your Behalf",
    description: "Our AI job application tool automatically submits targeted applications to 1000+ curated roles using role-specific resumes and custom answers, no spam, no mass blasting.",
    image: "/images/step3.png",
    icon: FaRobot,
  },
  {
    heading: "You start getting interview calls.",
    description: "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
    icon: FaPhoneAlt,
  },
];

const personas = [
  { num: "01", title: "International Students", desc: "OPT, CPT, and STEM OPT candidates applying under strict visa timelines." },
  { num: "02", title: "U.S. & Canada Job Seekers", desc: "Candidates targeting U.S. & Canada-based roles across tech, business, and operations." },
  { num: "03", title: "Burnt-Out Applicants", desc: "People tired of filling the same forms with zero response." },
  { num: "04", title: "Results-Driven Users", desc: "Anyone looking for an AI job application tool that actually converts." },
];

export default function HowItWorks() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleTalkToExpertClick = (buttonLocation: string) => {
    const utmSource = typeof window !== "undefined" ? localStorage.getItem("utm_source") || "WEBSITE" : "WEBSITE";
    const utmMedium = typeof window !== "undefined" ? localStorage.getItem("utm_medium") || `Website_How_It_Works_${buttonLocation}` : `Website_How_It_Works_${buttonLocation}`;
    const utmCampaign = typeof window !== "undefined" ? localStorage.getItem("utm_campaign") || "Website" : "Website";

    GTagUTM({
      eventName: "whatsapp_support_click",
      label: `How_It_Works_Talk_To_Expert_${buttonLocation}`,
      utmParams: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign },
    });

    trackButtonClick("Talk to an Expert", "how_it_works_cta", "cta", {
      button_location: `how_it_works_${buttonLocation}`,
      section: "how_it_works"
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "how_it_works_cta", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp",
      source: `how_it_works_${buttonLocation}`,
    });

    window.open(WHATSAPP_SUPPORT_URL, "_blank");
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
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. From form filling to resume tailoring, each application is automated and tracked." }
      },
      {
        "@type": "Question",
        "name": "Will Flashfire Help Me Get Interview Calls?",
        "acceptedAnswer": { "@type": "Answer", "text": "That is the core purpose of the platform—targeted, optimized applications that convert to interviews." }
      },
      {
        "@type": "Question",
        "name": "Does Flashfire Work for OPT/CPT Students?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We were built around visa-friendly job matching for OPT, CPT, STEM OPT, and H-1B paths." }
      },
      {
        "@type": "Question",
        "name": "Is Flashfire an AI job application tool or a full platform?",
        "acceptedAnswer": { "@type": "Answer", "text": "Flashfire is a complete AI job application platform that combines an AI job application tool, resume optimization, LinkedIn optimization, and application tracking in one system." }
      },
      {
        "@type": "Question",
        "name": "How does Flashfire improve interview chances?",
        "acceptedAnswer": { "@type": "Answer", "text": "By using ATS-optimized resumes, targeted applications, and recruiter-aligned keywords, Flashfire increases the chances of getting interview calls, not just submissions." }
      }
    ]
  };

  return (
    <div className="bg-[#fff6f4] text-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* HERO SECTION - Professional Split Layout */}
        <section className="rounded-3xl bg-white p-8 md:p-12 lg:p-16 shadow-xl ring-1 ring-orange-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#ff4c00] ring-1 ring-orange-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ff4c00]"></span>
                How it works
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-6">
                AI Job Application Software That Helps You{" "}
                <span className="text-[#ff4c00]">Apply Automatically</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                Flashfire automates job searching, ATS-optimized resumes, and applications—helping students and job seekers get interview calls faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleTalkToExpertClick("hero")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-[#e64400] hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
                >
                  Get Started
                  <FaArrowRight className="text-sm" />
                </button>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  No manual searching. No repetitive forms.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-100 rounded-3xl transform rotate-3 opacity-50"></div>

                <div className="relative bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border border-orange-100 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">

                    {/* Metric 1 */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-50">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                        <FaBriefcase className="text-[#ff4c00]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">300K+</div>
                      <div className="text-sm text-gray-500">Jobs Applied</div>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-50">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                        <FaUsers className="text-[#ff4c00]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">95%</div>
                      <div className="text-sm text-gray-500">Users Receive Interviews</div>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-50">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                        <FaPhoneAlt className="text-[#ff4c00]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">7–10</div>
                      <div className="text-sm text-gray-500">Avg Interview Calls</div>
                    </div>

                    {/* Metric 4 */}
                    <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-50">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                        <FaClock className="text-[#ff4c00]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">1 Week</div>
                      <div className="text-sm text-gray-500">To First Interview</div>
                    </div>
                    s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* STEPS SECTION - Modern Timeline Design */}
        <section className="mt-32 px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="inline-block text-sm font-bold tracking-widest text-[#ff4c00] uppercase mb-4">
              The Process
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How Our AI Job Application Software Works
            </h2>

            <p className="text-lg text-gray-600">
              From profile setup to interview calls — four simple steps to your dream job.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">

            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff4c00] via-orange-300 to-orange-100"></div>

            <div className="space-y-15">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="relative md:grid md:grid-cols-2 md:gap-24 md:items-center"
                  >
                    {/* Timeline circle */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-[#ff4c00] rounded-full items-center justify-center text-white font-bold text-lg shadow-xl z-10">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div
                      className={`${isEven
                          ? "md:pr-32 md:text-right"
                          : "md:col-start-2 md:pl-32"
                        }`}
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-xl ring-1 ring-orange-100 hover:shadow-2xl transition duration-300">

                        <div
                          className={`inline-flex items-center gap-3 mb-5 ${isEven ? "md:flex-row-reverse" : ""
                            }`}
                        >
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Icon className="text-[#ff4c00] text-xl" />
                          </div>

                          {/* Mobile step number */}
                          <span className="md:hidden w-8 h-8 bg-[#ff4c00] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                          {step.heading}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      className={`${isEven
                          ? "md:col-start-2 md:pl-24"
                          : "md:col-start-1 md:row-start-1 md:pr-24"
                        } flex justify-center`}
                    >
                      <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 border border-orange-100 shadow-md">
                        <Image
                          src={step.image}
                          alt={step.heading}
                          width={300}
                          height={300}
                          className="w-full max-w-[300px] h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DEMO SECTION - Card with Video */}
        <section className="mt-24">
          <div className="relative bg-gradient-to-br from-orange-50 to-white rounded-3xl px-8 py-16 md:px-12 lg:px-20 text-gray-900 shadow-xl ring-1 ring-orange-100 overflow-hidden">


            {/* Background Glow */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-[500px] h-[500px] bg-[#ff4c00] opacity-10 blur-3xl rounded-full"></div>
            </div>

            <div className="relative max-w-5xl mx-auto text-center">

              <span className="inline-block text-sm font-bold tracking-widest text-[#ff4c00] uppercase mb-4">
                Live Demo
              </span>

              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Watch Flashfire in Action
              </h3>

              <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                See how our AI handles end-to-end job applications—from sourcing to submission.
              </p>

              {/* Video */}
              <div className="rounded-2xl overflow-hidden ring-4 ring-orange-100 shadow-2xl bg-white mb-10">
                <HomePageVideo />
              </div>

              {/* CTA */}
              <button
                onClick={() => handleTalkToExpertClick("demo")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-[#e64400] hover:-translate-y-0.5"
              >
                Talk to an Expert
                <FaArrowRight className="text-sm" />
              </button>

            </div>


          </div>
        </section>


        {/* WHY FLASHFIRE - Bento Grid Layout */}
        <section className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm font-bold tracking-widest text-[#ff4c00] uppercase mb-4">Why Choose Us</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Built for Results, Not Just Applications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md ring-1 ring-orange-100 hover:shadow-xl hover:ring-orange-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaCheck className="text-[#ff4c00] text-lg" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleTalkToExpertClick("why_flashfire")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-[#e64400] hover:shadow-xl"
            >
              Talk to an Expert
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </section>

        {/* WHO IS THIS FOR - Modern Cards */}
        <section className="mt-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl ring-1 ring-orange-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block text-sm font-bold tracking-widest text-[#ff4c00] uppercase mb-4">Who It's For</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Who Is This AI Job Application Software For?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Flashfire is designed for students and job seekers who want to{" "}
                  <span className="font-semibold text-gray-900">apply at scale, save time,</span>{" "}
                  and finally get{" "}
                  <span className="font-semibold text-gray-900">real interview calls</span>{" "}
                  instead of silence.
                </p>
                <p className="text-gray-500">
                  This isn't another job board. It's an execution engine for people who want outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personas.map((persona, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-orange-200 mb-3 group-hover:text-[#ff4c00] transition-colors duration-300">
                      {persona.num}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{persona.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{persona.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="mt-20 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className={`${styles.header} mb-12 text-center`}>
              <span className="inline-block text-sm font-bold tracking-widest text-[#ff4c00] uppercase mb-4">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked Questions About Applying for Jobs Automatically with AI
              </h2>
              <p className="mt-4 text-gray-600">
                Ask us anything—here are the essentials to get you started.
              </p>
            </div>

            <div className={`${styles.faqContainer} w-full`}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""}`}
                >
                  <button
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
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

        {/* FINAL CTA - Full Width Impact */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-[#ff4c00] to-orange-600 rounded-3xl p-8 md:p-12 lg:p-16 text-white shadow-2xl text-center">
            <h3 className="text-2xl md:text3xl lg:text-4xl font-bold mb-6 max-w-4xl mx-auto">
              Ready to Turn Your Job Hunt Into Interview Calls?
            </h3>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who automated their applications and landed their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleTalkToExpertClick("bottom_cta")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#ff4c00] px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Started Now
                <FaArrowRight />
              </button>
            </div>
            <p className="mt-6 text-sm text-orange-200">
              Quick onboarding. We handle the rest.
            </p>
          </div>
        </section>

      </main>

      <Footer />
      <SalesPopUp />
    </div>
  );
}