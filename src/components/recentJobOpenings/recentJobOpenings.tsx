"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Search, FileText, Send, ShieldCheck, Zap, Eye, Lock, User, Code, Shuffle, BatteryCharging, Battery, Repeat, Code2, Briefcase } from "lucide-react";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

export default function RecentJobOpenings() {
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        },
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
        const utmMedium = getLocal("utm_medium", "Recent_Job_Openings_Page");
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
            section: "recent_job_openings",
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
        <>
            <section className="bg-white pt-20 md:pt-[100px]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 md:gap-20 items-center">

                    {/* LEFT: VISUAL STACK */}
                    <div className="relative flex justify-center mb-8 md:mb-0">
                        {/* Background card */}
                        <div className="absolute -top-4 md:-top-8 -left-2 md:-left-6 w-[85%] h-[90%] rounded-2xl md:rounded-3xl bg-[rgba(251,240,235,1)]" />

                        {/* Main image */}
                        <div className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg w-full max-w-[320px] md:max-w-none">
                            <Image
                                src="/images/heroResultImage.jpg"
                                alt="FlashFire applying to jobs"
                                width={420}
                                height={520}
                                className="object-cover w-full h-auto"
                            />
                        </div>

                        {/* Floating job cards */}
                        {[
                            { role: "Data Analyst", company: "Google" },
                            { role: "Software Engineer", company: "Amazon" },
                            { role: "Product Manager", company: "Spotify" },
                            { role: "Marketing Manager", company: "Apple" },
                        ].map((item, idx) => (
                            <div
                                key={item.role}
                                className={`absolute z-20 bg-white rounded-lg md:rounded-xl shadow-md px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3 text-xs md:text-sm
                                    ${idx === 0 && "left-2 md:-left-10 top-8 md:top-16"}
                                    ${idx === 1 && "left-0 md:-left-16 top-20 md:top-40"}
                                    ${idx === 2 && "left-4 md:-left-6 bottom-16 md:bottom-24"}
                                    ${idx === 3 && "left-2 md:-left-10 top-48 md:top-72"}
                                `}
                            >
                                <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 md:h-4 md:w-4 text-[#ff4c00]" />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-slate-900 truncate">
                                        {item.role}
                                    </div>
                                    <div className="text-slate-600 flex items-center gap-1">
                                        Applied
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: CONTENT */}
                    <div className="text-center md:text-left">
                        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-full bg-[rgba(251,240,235,1)] text-[#ff4c00]">
                            AI Job Search Assistant
                        </span>

                        <h1 className="mt-6 md:mt-8 text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                            AI Job Search Assistant That Automates Job Applications for You
                        </h1>

                        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-700 max-w-xl mx-auto md:mx-0">
                            FlashFire is an AI job search assistant and job application automation software that finds relevant roles, tailors your resume, and automatically submits applications to help you apply faster.
                        </p>

                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Get Started", "recent_jobs_hero", "/recent-job-openings/Get-started")}
                            className="mt-8 md:mt-10 inline-flex items-center shadow-[0_3px_0_black] gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#ff4c00] text-white rounded-xl md:rounded-2xl font-semibold hover:bg-[#e64500] text-sm md:text-base">
                            Get Started
                            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </div>

                </div>
            </section>
            <section className="bg-[rgba(251,240,235,1)] py-12 md:py-20 lg:py-28">
                <div className="max-w-6xl mx-auto px-4 md:px-6">

                    {/* Heading */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">
                            How Our AI Job Application Automation Software Works
                        </h2>
                        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-700">
                            FlashFire automates your entire job search — from finding roles to
                            submitting applications — without compromising quality.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="mt-12 md:mt-16 lg:mt-20 grid md:grid-cols-3 gap-8 md:gap-12">

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <Search className="h-6 w-6 md:h-7 md:w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-slate-900">
                                Finds relevant jobs
                            </h3>
                            <p className="mt-2 md:mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                                FlashFire acts as an AI job finder that scans thousands of listings daily to match your skills, experience, and preferences.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <FileText className="h-6 w-6 md:h-7 md:w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-slate-900">
                                Tailors your resume
                            </h3>
                            <p className="mt-2 md:mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                                Our AI career assistant customizes every application with optimized keywords to improve ATS matching and recruiter visibility.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <Send className="h-6 w-6 md:h-7 md:w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-4 md:mt-6 text-lg md:text-xl font-semibold text-slate-900">
                                Applies automatically
                            </h3>
                            <p className="mt-2 md:mt-3 text-sm md:text-base text-slate-700 leading-relaxed">
                                Our job application automation software submits applications daily, helping you scale job searches without manual effort.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="relative bg-[#fff5f0] py-12 md:py-20 lg:py-28 overflow-hidden">
                {/* ambient background */}
                <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 h-[240px] md:h-[480px] w-[240px] md:w-[480px] rounded-full bg-[#ff4c00]/10 blur-[70px] md:blur-[140px]" />
                <div className="absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 h-[240px] md:h-[480px] w-[240px] md:w-[480px] rounded-full bg-[#ff4c00]/10 blur-[70px] md:blur-[140px]" />

                <div className="relative max-w-7xl mx-auto px-4 md:px-8">

                    {/* HEADER */}
                    <div className="max-w-3xl mb-12 md:mb-16 lg:mb-20">
                        <span className="text-xs md:text-sm font-semibold tracking-wide text-[#ff4c00]">
                            TARGET USERS
                        </span>

                        <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                            Built for serious job seekers
                        </h2>

                        <p className="mt-3 md:mt-5 text-base md:text-lg text-slate-700">
                            FlashFire is designed for people who care about speed,
                            accuracy, and real hiring results.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                        {[
                            {
                                icon: Briefcase,
                                title: "Active job seekers",
                                desc: "Candidates applying consistently and losing hours to repetitive workflows."
                            },
                            {
                                icon: Code2,
                                title: "Technology professionals",
                                desc: "Engineers and developers targeting high-quality roles efficiently."
                            },
                            {
                                icon: Repeat,
                                title: "Career switchers",
                                desc: "Professionals moving between domains needing ATS-optimized applications."
                            },
                            {
                                icon: Battery,
                                title: "Burned-out candidates",
                                desc: "Job seekers exhausted by slow, manual, and error-prone processes."
                            }
                        ].map(({ icon: Icon, title, desc }, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-xl md:rounded-2xl bg-white/70 border border-[#ff4c00]/40 backdrop-blur-xl p-5 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#ff4c00]/10"                            >
                                {/* subtle hover glow */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#ff4c00]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative flex gap-4 md:gap-6 items-start">
                                    {/* ICON */}
                                    <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-[#ff6b2b] to-[#ff4c00]/30 shadow-lg shadow-[#ff4c00]/30 transition-transform duration-300 group-hover:-translate-y-1 flex-shrink-0">
                                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />

                                        {/* soft icon glow */}
                                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-[#ff4c00]/40 blur-xl opacity-40 -z-10" />
                                    </div>

                                    {/* TEXT */}
                                    <div className="transition-transform duration-300 group-hover:translate-x-0.5 min-w-0">
                                        <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-sm md:text-base text-slate-700 leading-relaxed">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>



            <section className="bg-white py-12 md:py-20 lg:py-28">
                <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

                    {/* LEFT: TEXT */}
                    <div className="order-2 md:order-1">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">
                            Built for trust, safety, and results
                        </h2>

                        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-700">
                            FlashFire works as a secure job search AI tool designed to automate applications without risking privacy or professionalism.
                        </p>

                        <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">

                            {/* Point 1 */}
                            <div className="flex gap-4 md:gap-5">
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-[#ff4c00]" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                        Safe & controlled applications
                                    </h4>
                                    <p className="mt-1 text-sm md:text-base text-slate-700">
                                        FlashFire only applies to roles aligned with your profile and
                                        preferences. You stay in full control.
                                    </p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div className="flex gap-4 md:gap-5">
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                    <Eye className="h-5 w-5 md:h-6 md:w-6 text-[#ff4c00]" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                        Transparent tracking
                                    </h4>
                                    <p className="mt-1 text-sm md:text-base text-slate-700">
                                        See exactly where your applications are sent and track progress
                                        from one clean dashboard.
                                    </p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div className="flex gap-4 md:gap-5">
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-[#ff4c00]" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                        Built for speed & scale
                                    </h4>
                                    <p className="mt-1 text-sm md:text-base text-slate-700">
                                        Apply to significantly more roles without burnout or manual effort.
                                    </p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div className="flex gap-4 md:gap-5">
                                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                    <Lock className="h-5 w-5 md:h-6 md:w-6 text-[#ff4c00]" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                        Privacy-first by design
                                    </h4>
                                    <p className="mt-1 text-sm md:text-base text-slate-700">
                                        Your data is encrypted and never shared beyond job applications.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: VISUAL PLACEHOLDER */}


                    <div className="bg-[rgba(251,240,235,1)] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm flex items-center justify-center order-1 md:order-2">
                        <Image
                            src="/images/recentJobOpening.png"
                            alt="Recent Job Openings"
                            width={520}
                            height={420}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>


                </div>
            </section>
            <section className="py-12 md:py-20 lg:py-32 bg-[rgba(251,240,235,1)]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

                        {/* LEFT */}
                        <div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                Why automation beats manual job applications
                            </h2>

                            <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-700 max-w-xl">
                                Manual applications limit how many opportunities you can reach.
                                FlashFire removes that limit — without compromising quality.
                            </p>

                            <div className="mt-8 md:mt-12 lg:mt-14 space-y-6 md:space-y-8">
                                {[
                                    {
                                        title: "Apply 10× faster",
                                        desc: "Reach more companies daily without increasing effort.",
                                    },
                                    {
                                        title: "ATS-optimized every time",
                                        desc: "Each application is tailored to pass automated filters.",
                                    },
                                    {
                                        title: "Consistent quality",
                                        desc: "No missed fields, no rushed mistakes, no burnout.",
                                    },
                                    {
                                        title: "Works while you sleep",
                                        desc: "FlashFire applies continuously in the background.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-4 md:gap-5">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg md:rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                                            <Zap className="h-5 w-5 md:h-6 md:w-6 text-[#ff4c00]" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-base md:text-lg font-semibold text-slate-900">
                                                {item.title}
                                            </h4>
                                            <p className="mt-1 text-sm md:text-base text-slate-700">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT – DECISION CARD */}
                        <div className="relative mt-8 lg:mt-0">
                            <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-full h-full rounded-2xl md:rounded-3xl bg-[#ff4c00]/20" />
                            <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-slate-200">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-6 md:mb-8">
                                    Manual vs AI-powered applications
                                </h3>

                                <div className="space-y-3 md:space-y-5 text-sm md:text-base text-slate-700">
                                    <p>❌ Manual: Slow and repetitive</p>
                                    <p>❌ Manual: Limited daily reach</p>
                                    <p>❌ Manual: Inconsistent quality</p>

                                    <div className="pt-4 md:pt-6 border-t">
                                        <p className="font-semibold text-slate-900">
                                            ✅ AI-powered: Fast, scalable, ATS-ready
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 lg:py-28 bg-[#fff6f1]">
                <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">
                        Ready to stop applying manually?
                    </h2>

                    <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-700">
                        Let FlashFire handle job applications while you focus
                        on preparing for interviews.
                    </p>

                    <button
                        {...getButtonProps()}
                        onClick={() => handleCTAClick("Start with FlashFire", "recent_jobs_bottom", "/recent-job-openings/Start-with-Flashfire")}
                        className="mt-8 md:mt-10 px-6 md:px-8 py-4 md:py-6 bg-[#ff4c00] text-white rounded-xl md:rounded-2xl font-semibold hover:bg-[#e64500] text-sm md:text-base">
                        Start with FlashFire
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-12 md:py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-slate-600">
                            Get answers about our AI job search assistant and job application automation.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                question: "What is an AI job search assistant?",
                                answer: "An AI job search assistant helps automate job discovery, resume optimization, and application submission to improve efficiency and interview opportunities."
                            },
                            {
                                question: "How does job application automation software work?",
                                answer: "Job application automation software scans listings, matches relevant roles, customizes applications, and submits them automatically based on your preferences."
                            },
                            {
                                question: "Is FlashFire an AI career assistant?",
                                answer: "Yes. FlashFire functions as an AI career assistant by helping you find jobs, optimize resumes, track applications, and prepare for interviews."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-[rgba(251,240,235,1)] rounded-xl p-6 border border-[#ff4c00]/30">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-slate-700 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}
