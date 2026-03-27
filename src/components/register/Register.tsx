"use client";

import { CheckCircle, Sparkles, Zap, Target, Award, Briefcase, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import FlashfireLogo from "@/src/components/FlashfireLogo";

export default function RegisterPage() {
  const router = useRouter();

  const person = {
    name: "Neha",
    company: "Deloitte",
    linkedinUrl: "https://www.linkedin.com/in/neha-senapati/",
    imagePath: "/images/neha_offer.png",
    profileImagePath:
      "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/neha.png",
  };

  const features = [
    { icon: Target, text: "Precision Targeting" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Award, text: "Proven Results" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-2 bg-[#fff8f5] font-['Space_Grotesk'] overflow-hidden">

      {/* BACKGROUND FLASHFIRE LOGO WATERMARK */}
      <div className="absolute inset-0 flex justify-end pr-20 pt-27  pointer-events-none select-none overflow-hidden">
        <div className="opacity-[0.06] scale-[2.5]">
          <FlashfireLogo className="w-[600px] h-[600px]" />
        </div>
      </div>

      {/* SUBTLE GRADIENT ORBS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#ff4c00]/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#ff6b33]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff4c00]/4 rounded-full blur-3xl"></div>

      {/* LEFT SECTION - Success Story */}
      <div className="flex items-center justify-center px-6 md:px-12 py-8 md:py-0 relative z-10 order-2 md:order-1">

        <div className="w-full max-w-md">

          {/* HEADER BADGE */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center mt-6 gap-2 bg-gradient-to-r from-[#ff4c00]/15 to-[#ff6b33]/10 text-[#ff4c00] px-4 py-2.5 rounded-full text-sm font-bold tracking-wide border border-[#ff4c00]/20">
              <Sparkles className="w-4 h-4" />
              30+ Offer Letters Received
            </div>
          </div>

          {/* SUCCESS CARD */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#ffd7c4] rounded-3xl p-6 shadow-[0_8px_32px_rgba(255,76,0,0.08)] relative overflow-hidden">

            {/* Card decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff4c00] via-[#ff6b33] to-[#ff4c00]"></div>

            {/* USER PROFILE */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#ff4c00]/20 relative flex-shrink-0 shadow-lg">
                  <Image
                    src={person.profileImagePath}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#ff4c00] rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold text-gray-800">
                  {person.name}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#ff4c00]" />
                  Job seeker → Offer cracked
                </p>
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#ff4c00] font-semibold hover:text-[#e63d00] mt-1 inline-flex items-center gap-1 transition-colors"
                >
                  View LinkedIn 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* OFFER IMAGE */}
            <div className="rounded-2xl overflow-hidden border border-[#ffe8e0] mb-4 shadow-sm">
              <Image
                src={person.imagePath}
                alt={`${person.name}'s offer letter from ${person.company}`}
                width={400}
                height={240}
                className="w-full h-44 object-cover"
              />
            </div>

            {/* RESULT HIGHLIGHT */}
            {/* <div className="bg-gradient-to-br from-[#fff5f0] to-[#ffefe8] border border-[#ffd7c4] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ff4c00]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-[#ff4c00]" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-800">
                    Hired at {person.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    Through structured follow-ups
                  </p>
                </div>
              </div>
            </div> */}

            {/* Mini stats row */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#ffe8e0]">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <feature.icon className="w-3.5 h-3.5 text-[#ff4c00]" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust indicators below card */}
          {/* <div className="flex items-center justify-center gap-6 mt-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-4 h-4 text-[#ff4c00]" />
                    <span className="font-medium">500+ Job Seekers</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Award className="w-4 h-4 text-[#ff4c00]" />
                    <span className="font-medium">95% Success Rate</span>
               </div>
          </div> */}
        </div>
      </div>

      {/* RIGHT SECTION - CTA */}
      <div className="flex items-center justify-center px-6 md:px-12 py-8 md:py-0 relative z-10 order-1 md:order-2">

        <div className="w-full max-w-lg">

        <h1 className="text-3xl md:text-[2.4rem] font-bold text-gray-900 text-center leading-[1.15] tracking-tight">

           
            <span className="block  text-center w-full m-0 p-0">
            Land 15+ Interview Calls <span className="inline">with</span>
            </span>

            
            <span className="block text-center w-full m-0 p-0 flex items-center justify-center flex-wrap gap-3 -mt-4 max-[768px]:flex-nowrap max-[768px]:gap-0 max-[768px]:-mt-1 max-[480px]:gap-0">

            <span> Flashfire</span>

            <span className="inline-flex items-center max-[768px]:origin-center max-[768px]:mx-[-0.05rem]">
                        <FlashfireLogo
                        width={0}
                        height={0}
                        className="inline-block align-middle h-[2.4em] w-auto leading-none flex-shrink-0 object-contain -mx-8 max-[768px]:h-11 max-[768px]:w-auto max-[768px]:mx-0"
                        />
                    </span>

            <span>AI Copilot</span>

            </span>

            </h1>
            <p className="text-gray-600 text-center mt-4 text-base leading-relaxed max-w-sm mx-auto">
            We apply to <span className="font-semibold text-[#ff4c00]">1200+ USA job applications</span> & track everything while you focus on winning the interview.
            </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                const utmSource =
                  localStorage.getItem("utm_source") || "WEBSITE";
                const utmMedium =
                  localStorage.getItem("utm_medium") || "Hero_Section";

                GTagUTM({
                  eventName: "sign_up_click",
                  label: "Hero_Start_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign:
                      localStorage.getItem("utm_campaign") || "Website",
                  },
                });

                trackButtonClick("Book a Free Demo", "hero_cta", "cta", {
                  button_location: "hero_main_cta",
                  section: "hero_landing",
                });

                trackSignupIntent("hero_cta", {
                  signup_source: "hero_main_button",
                  funnel_stage: "signup_intent",
                });

                router.push("/register/book-a-free-demo", { scroll: false });
                window.dispatchEvent(new CustomEvent("showCalendlyModal"));
              }
            }}
            className="mt-6 w-full bg-gradient-to-r from-[#ff4c00] to-[#ff6b33] hover:from-[#e63d00] hover:to-[#ff5a20] text-white py-4 px-6 rounded-xl font-bold text-base shadow-[0_8px_24px_rgba(255,76,0,0.25)] hover:shadow-[0_12px_32px_rgba(255,76,0,0.35)] transition-all border border-[#ff4c00]/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Book a Free Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* TRUST BADGES */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No spam
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No random applies
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Targeted results
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}