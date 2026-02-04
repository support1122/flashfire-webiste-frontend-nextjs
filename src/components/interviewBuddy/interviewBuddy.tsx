"use client";

import { useState } from "react";
import { Star, Mic, MessageSquare, Sparkles, FileText } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import HomePageHappyUsers from "../homePageHappyUsers/homePageHappyUsers";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

export default function InterviewBuddy() {
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // Bypass will be handled by the event listener
        },
    });
    const pushCustomUrl = (path?: string) => {
            if (typeof window === "undefined" || !path) return;
            const isCanada = window.location.pathname.startsWith("/en-ca");
            const normalized = path.startsWith("/en-ca")
              ? path
              : isCanada
              ? `/en-ca${path}`
              : path;
            window.history.pushState({}, "", normalized);
          };
    return (
        <div className="w-full bg-white  pt-[120px] md:pt-[100px]">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff1ea] via-white to-[#ffe5d8]" />

                <div className="relative max-w-[1200px] mx-auto px-6 py-28 text-center">
                    {/* Rating */}
                    <div className="flex justify-center items-center gap-2 mb-4 text-sm text-gray-600">
                        <span className="font-semibold">Excellent</span>
                        <div className="flex text-[#ff4c00]">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <span className="opacity-70">Trusted by job seekers</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        AI Interview Assistant for Real-Time Interview Support
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Flashfire is a real-time AI interview assistant that acts as your interview copilot, providing instant answers, structured responses, and live guidance while you speak during interviews.
                    </p>

                    <div className="mt-10 flex justify-center items-center gap-6">
                        <button {...getButtonProps()} 
                        onClick={() => {
                            const utmSource = typeof window !== "undefined"
                                ? localStorage.getItem("utm_source") || "WEBSITE"
                                : "WEBSITE";
                            const utmMedium = typeof window !== "undefined"
                                ? localStorage.getItem("utm_medium") || "Interview_Buddy_Page"
                                : "Interview_Buddy_Page";
                            GTagUTM({
                                eventName: "sign_up_click",
                                label: "Interview_Buddy_Get_Me_Interview_Button",
                                utmParams: {
                                    utm_source: utmSource,
                                    utm_medium: utmMedium,
                                    utm_campaign: typeof window !== "undefined"
                                        ? localStorage.getItem("utm_campaign") || "Website"
                                        : "Website",
                                    },
                            });
                            trackButtonClick("Get me interview", "interview_buddy_cta", "cta", {
                                button_location: "interview_buddy_hero_section",
                                section: "interview_buddy_hero"
                            });
                            trackSignupIntent("interview_buddy_cta", {
                                signup_source: "interview_buddy_hero_button",
                                funnel_stage: "signup_intent"
                            });

                            if (typeof window !== "undefined") {
                                window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
                            }
                            pushCustomUrl("/interview-buddy/Start-free");
                        }}
                        className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-semibold shadow-[0_3px_0_black] hover:opacity-90">
                            Start free
                        </button>

                        <div className="flex items-center justify-center gap-2.5 mb-1 max-[768px]:mb-8 max-[768px]:gap-2 max-[480px]:mb-6 max-[480px]:flex-col max-[480px]:gap-2">
                            <div className="flex items-center">
                                {[
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                                    "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
                                ].map((url, i) => (
                                    <div
                                        key={i}
                                        className={`relative w-[2.2rem] h-[2.2rem] rounded-full border-2 border-white overflow-hidden -ml-3.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] max-[768px]:w-[2rem] max-[768px]:h-[2rem] max-[768px]:-ml-3 max-[480px]:w-[1.8rem] max-[480px]:h-[1.8rem] max-[480px]:-ml-2.5 ${i === 0 ? "ml-0" : ""
                                            }`}
                                    >
                                        <Image
                                            src={url}
                                            alt={`User ${i + 1}`}
                                            fill
                                            sizes="2.2rem"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>

                            <p className="text-base text-black font-medium max-[768px]:text-sm max-[480px]:text-xs max-[480px]:text-center max-[480px]:px-2">Loved by 1000+ users</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES SECTION ================= */}
            <section className="max-w-[1200px] mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold">
                        Everything you need to ace interviews
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Our AI-powered interview assistant provides real-time support to help you think clearly, respond confidently, and perform better in live interviews.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    {/* Feature Card 1 */}
                    <FeatureCard
                        title="Real-Time AI Interview Helper During Live Interviews"
                        desc="Get instant AI suggestions when questions get tough. Stay calm and respond clearly without pauses."
                        icon={<Sparkles size={28} />}
                        mock={
                            <MockAnswerCard />
                        }
                    />

                    {/* Feature Card 2 */}
                    <FeatureCard
                        title="Accurate real-time transcripts"
                        desc="Track the conversation live, capture key points, and respond with clarity and confidence."
                        icon={<Mic size={28} />}
                        mock={
                            <MockTranscriptCard />
                        }
                    />

                    {/* Feature Card 3 */}
                    <FeatureCard
                        title="Instant answers to interview questions"
                        desc="Our interview AI assistant delivers instant, role-specific answers in real time, helping you stay confident and respond without hesitation during interviews."
                        icon={<MessageSquare size={28} />}
                        mock={
                            <MockInstantAnswer />
                        }
                    />

                    {/* Feature Card 4 */}
                    <FeatureCard
                        title="Highlight relevant experience instantly"
                        desc="Your AI interview copilot automatically surfaces the most relevant achievements from your resume exactly when interviewers ask."
                        icon={<FileText size={28} />}
                        mock={
                            <MockResumeHighlight />
                        }
                    />

                </div>
            </section>

            <HomePageHappyUsers />

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.header}>
                    <h2>FAQs About Our AI Interview Assistant</h2>
                    <p>
                        Get answers to common questions about using our real-time AI interview assistant.
                    </p>
                </div>

                <div className={styles.faqContainer}>
                    {[
                        {
                            question: "What is an AI interview assistant?",
                            answer: "An AI interview assistant provides real-time support during live interviews by suggesting answers, structuring responses, and highlighting relevant experience as you speak."
                        },
                        {
                            question: "How does a real-time AI interview assistant work?",
                            answer: "A real-time AI interview assistant listens to interview questions, generates structured responses instantly, and acts as a live interview copilot without interrupting your flow."
                        },
                        {
                            question: "Is Flashfire an AI interview copilot or interview practice tool?",
                            answer: "Flashfire is an AI interview copilot designed for live interviews—not just practice. It supports you in real time with instant answers and guidance."
                        },
                        {
                            question: "Can an AI interview helper improve interview performance?",
                            answer: "Yes. An AI interview helper improves confidence, reduces pauses, and helps candidates deliver clear, role-specific answers during interviews."
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
                                        button_location: "interview_buddy_faq_section",
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
            </section>
        </div>
    );
}

/* ================= REUSABLE COMPONENTS ================= */

function FeatureCard({
    title,
    desc,
    icon,
    mock,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    mock: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-3 text-[#ff4c00]">
                {icon}
                <h3 className="font-bold text-xl text-black">{title}</h3>
            </div>

            <p className="text-gray-600 mb-6">{desc}</p>

            <div className="rounded-3xl bg-gradient-to-br from-[#ff7a3d] via-[#ff4c00] to-[#ff2e00] p-[1px]">
                <div className="bg-white rounded-3xl p-6">
                    {mock}
                </div>
            </div>
        </div>
    );
}

/* ================= UI MOCKS ================= */

function MockAnswerCard() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5">
            <p className="text-xs text-[#ff4c00] font-semibold mb-2">
                SUGGESTED ANSWER
            </p>
            <p className="text-gray-700 text-sm">
                “I led a cross-functional project where we launched a new feature
                that improved user engagement by 30%…”
            </p>
        </div>
    );
}

function MockTranscriptCard() {
    return (
        <div className="space-y-3">
            <div className="bg-[#fff7f3] rounded-xl p-3 text-sm">
                <strong>Interviewer:</strong> Tell me about your experience.
            </div>
            <div className="bg-[#ff4c00]/10 rounded-xl p-3 text-sm">
                <strong>You:</strong> I recently worked on a project where…
            </div>
        </div>
    );
}

function MockInstantAnswer() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm text-gray-700">
            Press <span className="font-semibold text-[#ff4c00]">Space</span> to get an
            AI-generated answer instantly during the interview.
        </div>
    );
}

function MockResumeHighlight() {
    return (
        <div className="bg-[#fff7f3] rounded-2xl p-5 text-sm">
            <p className="font-semibold mb-2">Highlighted Experience</p>
            <div className="h-3 bg-[#ff4c00]/20 rounded w-3/4 mb-2" />
            <div className="h-3 bg-[#ff4c00]/10 rounded w-2/3" />
        </div>
    );
}
