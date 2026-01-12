"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Search, FileText, Send, ShieldCheck, Zap, Eye, Lock } from "lucide-react";
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
            window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"));
        }

        pushCustomUrl(targetPath);
    };

    return (
        <>
            <section className="bg-white pt-[120px] md:pt-[100px]">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT: VISUAL STACK */}
                    <div className="relative flex justify-center">
                        {/* Background card */}
                        <div className="absolute -top-8 -left-6 w-[85%] h-[90%] rounded-3xl bg-[rgba(251,240,235,1)]" />

                        {/* Main image */}
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/heroResultImage.jpg"
                                alt="FlashFire applying to jobs"
                                width={420}
                                height={520}
                                className="object-cover"
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
                                className={`absolute z-20 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3
                                    ${idx === 0 && "-left-10 top-16"}
                                    ${idx === 1 && "-left-16 top-40"}
                                    ${idx === 2 && "-left-6 bottom-24"}
                                    ${idx === 3 && "-left-10 top-72"}
                                `}
                                                >
                                <div className="h-8 w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">
                                        {item.role}
                                    </div>
                                    <div className="text-xs text-slate-600 flex items-center gap-1">
                                        Applied
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: CONTENT */}
                    <div>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-[rgba(251,240,235,1)] text-[#ff4c00]">
                            AI Job Search Assistant
                        </span>

                        <h1 className="mt-8 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            Cast a wider net —
                            <br />
                            <span className="text-[#ff4c00]">10× your job applications</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-700 max-w-xl">
                            FlashFire continuously finds and applies to relevant job openings
                            on your behalf — so you can focus on interviews, not applications.
                        </p>

                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Get Started", "recent_jobs_hero", "/recent-job-openings/Get-started")}
                            className="mt-10 inline-flex items-center shadow-[0_3px_0_black] gap-2 px-8 py-4 bg-[#ff4c00] text-white rounded-2xl font-semibold hover:bg-[#e64500]">
                            Get Started
                            <ArrowUpRight className="h-5 w-5" />
                        </button>
                    </div>

                </div>
            </section>
            <section className="bg-[rgba(251,240,235,1)] py-28">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Heading */}
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            How FlashFire works behind the scenes
                        </h2>
                        <p className="mt-6 text-lg text-slate-700">
                            FlashFire automates your entire job search — from finding roles to
                            submitting applications — without compromising quality.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="mt-20 grid md:grid-cols-3 gap-12">

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <Search className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                Finds relevant jobs
                            </h3>
                            <p className="mt-3 text-slate-700 leading-relaxed">
                                FlashFire continuously scans thousands of job listings across
                                platforms and filters opportunities that match your role, skills,
                                experience level, and preferences.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <FileText className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                Tailors your resume
                            </h3>
                            <p className="mt-3 text-slate-700 leading-relaxed">
                                Each application is customized with role-specific keywords and
                                responsibilities, improving ATS match and recruiter visibility.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                <Send className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                Applies automatically
                            </h3>
                            <p className="mt-3 text-slate-700 leading-relaxed">
                                FlashFire submits applications on your behalf every day, so you
                                never miss opportunities — even while you sleep.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-white py-28">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

                    {/* LEFT: TEXT */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            Built for trust, safety, and results
                        </h2>

                        <p className="mt-6 text-lg text-slate-700">
                            FlashFire is designed to help you apply faster — without risking
                            your privacy, professionalism, or job prospects.
                        </p>

                        <div className="mt-12 space-y-8">

                            {/* Point 1 */}
                            <div className="flex gap-5">
                                <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Safe & controlled applications
                                    </h4>
                                    <p className="mt-1 text-slate-700">
                                        FlashFire only applies to roles aligned with your profile and
                                        preferences. You stay in full control.
                                    </p>
                                </div>
                            </div>

                            {/* Point 2 */}
                            <div className="flex gap-5">
                                <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Transparent tracking
                                    </h4>
                                    <p className="mt-1 text-slate-700">
                                        See exactly where your applications are sent and track progress
                                        from one clean dashboard.
                                    </p>
                                </div>
                            </div>

                            {/* Point 3 */}
                            <div className="flex gap-5">
                                <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center">
                                    <Zap className="h-6 w-6 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Built for speed & scale
                                    </h4>
                                    <p className="mt-1 text-slate-700">
                                        Apply to significantly more roles without burnout or manual effort.
                                    </p>
                                </div>
                            </div>

                            {/* Point 4 */}
                            <div className="flex gap-5">
                                <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center">
                                    <Lock className="h-6 w-6 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                        Privacy-first by design
                                    </h4>
                                    <p className="mt-1 text-slate-700">
                                        Your data is encrypted and never shared beyond job applications.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: VISUAL PLACEHOLDER */}


                    <div className="bg-[rgba(251,240,235,1)] rounded-3xl p-10 shadow-sm flex items-center justify-center">
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
            <section className="py-28 bg-[rgba(251,240,235,1)]">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h2 className="text-4xl font-extrabold text-slate-900">
      Ready to stop applying manually?
    </h2>

    <p className="mt-6 text-lg text-slate-700">
      Let FlashFire handle job applications while you focus
      on preparing for interviews.
    </p>

    <button
      {...getButtonProps()}
      onClick={() => handleCTAClick("Start with FlashFire", "recent_jobs_bottom", "/recent-job-openings/Start-with-Flashfire")}
      className="mt-10 px-8 py-6 bg-[#ff4c00] text-white rounded-2xl font-semibold hover:bg-[#e64500]">
      Start with FlashFire
    </button>
  </div>
</section>

        </>
    );
}
