"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

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

  return (
    <section className="h-screen grid md:grid-cols-2 bg-[#fff6f4] font-['Space_Grotesk'] overflow-hidden">

<div className="flex items-center justify-center p-6">

  <div className="w-full max-w-xs bg-white border border-[#ffe1d6] rounded-2xl p-4 shadow-sm">

    {/* USER HEADER */}
    <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ffd7c4] relative">
  <Image
    src={person.profileImagePath}
    alt="profile"
    fill
    className="object-cover"
  />
</div>

      <div>
        <p className="text-sm font-semibold text-black">{person.name}</p>
        <p className="text-[11px] text-gray-500">
          Job seeker → Offer cracked
        </p>
      </div>
    </div>

    {/* FLOW */}
    <div className="space-y-3">

     

      <div className="bg-white border border-[#ffe1d6] rounded-lg p-2">
        <p className="text-[11px] text-gray-500 mb-1">Interview → Offer</p>
        <Image
          src={person.imagePath}
          alt="offer"
          width={220}
          height={200}
          className="rounded-md w-full h-[140px] object-cover"
        />
      </div>

      <div className="bg-[#fff7f4] border border-[#ffe1d6] rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-black">
          Hired at {person.company}
        </p>
        <p className="text-[11px] text-gray-500">
          Structured follow-ups
        </p>
      </div>
    </div>

    {/* STATS */}
    <div className="mt-4 flex justify-between text-center">
      <div>
        <p className="text-sm font-bold text-[#ff4c00]">1200+</p>
        <p className="text-[10px] text-gray-500">Offers</p>
      </div>
      <div>
        <p className="text-sm font-bold text-[#ff4c00]">3x</p>
        <p className="text-[10px] text-gray-500">Faster</p>
      </div>
      <div>
        <p className="text-sm font-bold text-[#ff4c00]">0</p>
        <p className="text-[10px] text-gray-500">Missed</p>
      </div>
    </div>

  </div>
</div>
  
    {/* ================= RIGHT (CONVERSION UI 🔥) ================= */}
    <div className="flex items-center justify-center px-8">
  
      <div className="w-full max-w-md">
  
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
          Get your first offer  
          <span className="block text-[#ff4c00]">
            faster & smarter
          </span>
        </h1>
  
        <p className="text-gray-600 mb-6 text-sm">
          Track, improve, and win your job search with clarity.
        </p>
  
        {/* Benefits */}
        <div className="space-y-3 mb-8">
          {[
            "Track all applications in one place",
            "Never miss follow-ups",
            "Know exactly what to improve",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-xs font-bold">
                ✓
              </div>
              <p className="text-gray-800 text-sm">{item}</p>
            </div>
          ))}
        </div>
  
        {/* CTA */}
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
          
              trackButtonClick("Get Started", "hero_cta", "cta", {
                button_location: "hero_main_cta",
                section: "hero_landing",
              });
          
              trackSignupIntent("hero_cta", {
                signup_source: "hero_main_button",
                funnel_stage: "signup_intent",
              });
          
              // 👉 change URL WITHOUT scroll/navigation feel
              router.push("/register/Get-Started", { scroll: false });
          
              // 👉 open modal
              window.dispatchEvent(new CustomEvent("showCalendlyModal"));
            }
          }}
          className="w-full bg-[#ff4c00] hover:bg-black text-white py-3 rounded-xl font-semibold shadow-md transition hover:-translate-y-0.5"
        >
          Get Started
        </button>
  
        <p className="text-xs text-gray-500 mt-3 text-center">
          Free • No credit card needed
        </p>
      </div>
    </div>
  </section>
  );
}