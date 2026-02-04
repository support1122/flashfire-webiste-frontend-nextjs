"use client";

import { useState } from "react";
import {
    Award,
    DollarSign,
    Shield,
    ThumbsUpIcon,
    TrendingUp,
    UsersIcon,
    AlertTriangle,
    BarChart3,
    MessageCircle,
    Check
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

export default function SalaryNegotiationUI() {
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        }
    });

    const pushCustomUrl = (path?: string) => {
        if (typeof window === "undefined" || !path) return;
        const isCanada = window.location.pathname.startsWith("/en-ca");
        const normalized = path.startsWith("/en-ca")
            ? path
            : isCanada ? `/en-ca${path}` : path;
        window.history.pushState({}, "", normalized);
    };

    const handleCTAClick = (label: string, location: string, targetPath?: string) => {
        const getLocal = (key: string, fallback: string) =>
            typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

        const utmSource = getLocal("utm_source", "WEBSITE");
        const utmMedium = getLocal("utm_medium", "Offer_Salary_Page");
        const utmCampaign = getLocal("utm_campaign", "Website");

        GTagUTM({
            eventName: "sign_up_click",
            label: `${location}_${label.replace(/\s+/g, "_")}`,
            utmParams: {
                utm_source: utmSource,
                utm_medium: utmMedium,
                utm_campaign: utmCampaign,
            },
        });
          
        trackButtonClick(label, `${location}_cta`, "cta", {
            button_location: location,
            section: "offer_and_salary",
        });

        trackSignupIntent(`${location}_cta`, {
            signup_source: location,
            funnel_stage: "signup_intent",
        });

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        pushCustomUrl(targetPath);
    };

    return (
        <div className="bg-[rgba(251,240,235,1)] text-slate-900 pt-[120px] md:pt-[100px]">

            <section className="py-24 bg-[rgba(251,240,235,1)]">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-white border border-[#ff4c00]/30 text-[#ff4c00]">
                        Offer & Salary Negotiation Advisor
                    </span>

                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                        Negotiate Salary Offer With a Proven Strategy
                    </h1>

                    <p className="mt-4 text-lg text-slate-700">
                        FlashFire helps you negotiate salary offers using a clear salary negotiation strategy backed by market data, role-specific scripts, and professional guidance.
                    </p>

                    <button
                        {...getButtonProps()}
                        onClick={() => handleCTAClick("Analyze My Offer", "offer_salary_hero", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                        className="mt-8 px-8 py-4 rounded-2xl bg-[#ff4c00] shadow-[0_3px_0_black] text-white text-lg font-semibold hover:bg-[#e64500]">
                        Analyze My Offer
                    </button>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Heading */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            Most candidates don’t negotiate — and lose money
                        </h2>
                        <p className="mt-4 text-lg text-slate-700">
                            Without a clear salary negotiation strategy, many candidates accept offers below market value even when negotiation is expected.
                        </p>
                    </div>

                    {/* Insight Blocks */}
                    <div className="mt-16 space-y-8">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Offers are rarely final",
                                desc: "Most companies expect negotiation. Candidates who ask professionally often receive better compensation without risking the offer.",
                            },
                            {
                                icon: BarChart3,
                                title: "Market data changes everything",
                                desc: "Knowing how similar roles are paid gives you confidence and removes guesswork from the conversation.",
                            },
                            {
                                icon: MessageCircle,
                                title: "The right words matter",
                                desc: "How you ask is as important as what you ask. Clear, respectful language improves outcomes.",
                            },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="flex gap-6 items-start rounded-2xl border border-[#ff4c00]/30 bg-[rgba(251,240,235,1)] p-6"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-[#ff4c00]/10 flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-[#ff4c00]" />
                                </div>

                                {/* Accent bar */}
                                <div className="w-1 rounded-full bg-[#ff4c00]" />

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-slate-700 leading-relaxed max-w-3xl">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== BENEFITS GRID ====== */}
            <section className="py-14 px-6 lg:px-0 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold">
                        What You Get to Negotiate Your Salary Offer Successfully
                    </h2>
                    <p className="mt-2 text-slate-700">
                        Actionable insights, negotiation scripts and confidence boosters that matter.
                    </p>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            icon: TrendingUp,
                            title: "Market Salary Insights",
                            desc: "Know where your offer stands in the real world with our market salary insights.",
                        },
                        {
                            icon: Shield,
                            title: "Confident Strategy",
                            desc: "Use a proven salary negotiation strategy to approach discussions with clarity, confidence, and a higher chance of improving your final offer.",
                        },
                        {
                            icon: UsersIcon,
                            title: "Role-specific Scripts",
                            desc: "Negotiation messages tailored to your role with our role-specific scripts.",
                        },
                        {
                            icon: Award,
                            title: "Maximize Compensation",
                            desc: "A strong salary negotiation strategy helps you negotiate your salary offer beyond base pay, including bonuses, equity, and benefits.",
                        },
                        {
                            icon: ThumbsUpIcon,
                            title: "Acceptance Probability",
                            desc: "Know how likely your counter-offer will be accepted with our acceptance probability analysis.",
                        },
                        {
                            icon: DollarSign,
                            title: "Total Compensation Breakdown",
                            desc: "Understand every dollar in your offer package with our total compensation breakdown.",
                        },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="border border-[#ff4c00]/30 rounded-2xl p-6 bg-[rgba(251,240,235,1)] shadow-sm hover:shadow-md transition"
                        >
                            <div className="p-3 rounded-lg bg-[#ff4c00]/10 w-fit">
                                <Icon className="h-6 w-6 text-[#ff4c00]" />
                            </div>
                            <h4 className="mt-3 font-semibold text-lg text-slate-900">
                                {title}
                            </h4>
                            <p className="mt-1 text-slate-700 text-sm">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>


<section className="bg-[rgba(251,240,235,1)] py-20">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    
    {/* LEFT: TEXT */}
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Strategic Salary Negotiation Guidance
      </h2>

      <ul className="mt-8 space-y-5 text-slate-800">
        {[
          "Receive personalized strategies tailored to your role and industry",
          "Learn how to clearly articulate your value to justify higher compensation",
          "Get guidance on the right timing to negotiate for maximum impact",
        ].map((text) => (
          <li key={text} className="flex items-start gap-4">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15">
              <Check className="h-4 w-4 text-[#ff4c00]" />
            </span>
            <span className="text-lg leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT: ILLUSTRATION CONTAINER */}
    <div className="bg-white rounded-3xl p-10 shadow-sm">
      <img
        src="/images/offer&salary1.png"
        alt="Salary negotiation guidance"
        className="w-full h-auto"
      />
    </div>

  </div>
</section>
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT: ILLUSTRATION */}
    <div className="bg-[rgba(251,240,235,1)] rounded-3xl p-10 shadow-sm">
      <img
        src="/images/offer&salary2.png"
        alt="Offer analysis"
        className="w-full h-auto"
      />
    </div>

    {/* RIGHT: TEXT */}
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
        Comprehensive Offer Analysis
      </h2>

      <ul className="mt-8 space-y-5 text-slate-800">
        {[
          "Compare your offer against industry benchmarks and market standards",
          "Understand the full value of your compensation, including bonuses and benefits",
          "Identify key leverage points to negotiate a stronger offer",
        ].map((text) => (
          <li key={text} className="flex items-start gap-4">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15">
              <Check className="h-4 w-4 text-[#ff4c00]" />
            </span>
            <span className="text-lg leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </div>

  </div>
</section>

            {/* FAQ Section */}
            <section className="bg-[rgba(251,240,235,1)] py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className={styles.header}>
                        <h2>Frequently Asked Questions About Salary Negotiation</h2>
                        <p>
                            Get answers to common questions about negotiating your job offer professionally.
                        </p>
                    </div>

                    <div className={styles.faqContainer}>
                        {[
                            {
                                question: "How do I negotiate a salary offer professionally?",
                                answer: "To negotiate a salary offer professionally, you need a clear salary negotiation strategy based on market data, timing, and role-specific language. Flashfire provides structured guidance and scripts to help you ask confidently."
                            },
                            {
                                question: "What is the best salary negotiation strategy?",
                                answer: "The best salary negotiation strategy combines market benchmarks, clear justification of your value, and professional communication. Flashfire analyzes your offer and helps you apply the right strategy for your role and industry."
                            },
                            {
                                question: "Can negotiating a salary offer risk my job offer?",
                                answer: "When done professionally, negotiating a salary offer rarely risks the offer. Employers often expect negotiation, especially when supported by a clear strategy and market data."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className={`${styles.faqItem} ${
                                    activeFaqIndex === index ? styles.active : ""
                                }`}
                            >
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => {
                                        setActiveFaqIndex(activeFaqIndex === index ? null : index);
                                        trackButtonClick(`FAQ ${index + 1}`, "faq_item", "link", {
                                            button_location: "offer_salary_faq_section",
                                            faq_question: faq.question,
                                            faq_index: index + 1
                                        });
                                    }}
                                >
                                    <span>{faq.question}</span>
                                    <span className={styles.icon}>
                                        {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                                    </span>
                                </button>

                                {activeFaqIndex === index && (
                                    <div className={styles.faqAnswer}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
