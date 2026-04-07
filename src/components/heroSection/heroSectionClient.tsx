"use client";

import Image from "next/image";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

// Use Google Favicons as primary - more reliable
const getUniversityLogo = (domain: string, name: string) => {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};

type Props = {
  data: HeroSectionData;
};

export default function HeroSectionClient({ data }: Props) {
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  return (
    <section className="bg-[#f8ebe5] text-center p-2 pb-1 pt-2 font-['Space_Grotesk',sans-serif] overflow-x-hidden w-full max-w-full box-border max-[1024px]:p-6 max-[768px]:p-4 max-[768px]:pb-10 max-[768px]:pt-6 max-[480px]:p-3 max-[480px]:pb-8 max-[480px]:pt-4">
      {/* === Main Two Column Layout === */}
      <div className="max-w-[1080px] mx-auto flex flex-row items-center justify-between gap-6 mb-4 max-[1024px]:flex-col max-[1024px]:gap-6 max-[1024px]:mb-8">
        
        {/* === Left Column - Content === */}
        <div className="flex-1 text-left max-[1024px]:text-center max-[1024px]:w-full hidden md:block">
          {/* === Top Badge === */}
          <div className="inline-flex items-center gap-2 border border-[#e0d5cf] rounded-full px-3 py-1.5 mb-4 bg-white/50 max-[768px]:mb-4 max-[480px]:px-3 max-[480px]:py-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#ff4c00]">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#ff4c00] text-xs font-medium max-[480px]:text-xs">
              {data.badges[0] || "AI - Powerd Job Applications"}
            </span>
          </div>

          {/* === Headline === */}
          <h1 className="text-[2.6rem] leading-[1.1] font-bold text-black mb-1 max-[1200px]:text-[2.4rem] max-[968px]:text-[2rem] max-[768px]:text-[1.8rem] max-[768px]:leading-[1.15] max-[480px]:text-[1.6rem]">
            <span className="block">{data.headlineMain}</span>
            <span className="block -mt-3">
              <span className="text-black">{data.headlineHighlight}</span>
              <span className="inline-flex items-center mx-1 align-middle">
                <FlashfireLogo
                  width={0}
                  height={0}
                  className="h-[5.5rem] w-auto inline-block max-[768px]:h-[1.8rem] max-[480px]:h-[1.6rem] -mr-5 -ml-5"
                />
              </span>
              <span>{data.headlineSuffix}</span>
            </span>
          </h1>

          {/* === Description === */}
          <p className="font-['Satoshi',sans-serif] text-base font-medium leading-[1.5] text-[#555] max-w-[420px] mb-6  max-[1024px]:mx-auto max-[768px]:text-sm max-[768px]:mb-4 max-[480px]:text-xs max-[480px]:px-2">
            {data.description}
          </p>

          {/* === CTA Button === */}
          <button
            {...getButtonProps()}
            onClick={() => {
              if (typeof window !== "undefined") {
                const utmSource = typeof window !== "undefined"
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined"
                  ? localStorage.getItem("utm_medium") || "Hero_Section"
                  : "Hero_Section";
                GTagUTM({
                  eventName: "sign_up_click",
                  label: "Hero_Start_Free_Trial_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: typeof window !== "undefined"
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website",
                  },
                });
                trackButtonClick("Get Started", "hero_cta", "cta", {
                  button_location: "hero_main_cta",
                  section: "hero_landing",
                  target_url: "/Get-Started"
                });
                trackSignupIntent("hero_cta", {
                  signup_source: "hero_main_button",
                  funnel_stage: "signup_intent",
                  target_url: "/Get-Started"
                });
                sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
                window.history.pushState({}, '', '/Get-Started');
                window.dispatchEvent(new CustomEvent("showCalendlyModal"));
              }
            }}
            className="inline-block bg-[#ff4c00] text-white py-3 px-4 rounded-lg font-semibold no-underline mb-4 shadow-[0_3px_0_black] border-none cursor-pointer text-sm font-inherit hover:bg-black hover:-translate-y-0.5 active:translate-y-0 max-[768px]:py-3 max-[768px]:px-5 max-[768px]:text-[0.9rem] max-[768px]:mb-4 max-[480px]:py-2.5 max-[480px]:px-4 max-[480px]:text-xs max-[480px]:mb-3 max-[480px]:w-full max-[480px]:max-w-[260px]"
          >
            {data.cta.label}
          </button>
          {/* Trusted users text below image */}
          {/* <div className="flex items-center justify-center gap-2 -mt-12 max-[1024px]:mt-1">
            <div className="flex -space-x-2">
              {[
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
              ].map((url, i) => (
                <div
                  key={i}
                  className={`relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm ${i === 0 ? "" : "-ml-2"}`}
                >
                  <Image
                    src={url}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-black font-medium ml-1 max-[480px]:text-xs">{data.trustText}</p>
          </div> */}
        </div>

        {/* === Mobile Left Section === */}
        <div className="flex md:hidden flex-col items-center pt-20 text-center w-full px-4">
          {/* Badge */}
          <div className="flex items-center gap-2 border border-[#e0d5cf] rounded-full px-3 py-1.5 mb-3 bg-white/60">
            <div className="w-2 h-2 bg-[#ff4c00] rounded-full"></div>
            <span className="text-[#ff4c00] text-xs font-medium">
              {data.badges[0] || "AI Powered"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[1.6rem] font-semibold leading-tight mb-2">
            {data.headlineMain}
          </h1>

          <h2 className="text-[1.6rem] font-semibold leading-tight -mt-2 mb-2">
            <span className="text-[#ff4c00]">
              {data.headlineHighlight}
            </span>{" "}
            {data.headlineSuffix}
          </h2>

          {/* Description */}
          <p className="text-xs text-[#555] mb-4 px-2 leading-relaxed">
            {data.description}
          </p>

          {/* CTA */}
          <button
            {...getButtonProps()}
            className="w-full max-w-[260px] bg-black text-white py-2.5 rounded-lg font-semibold text-sm"
          >
            {data.cta.label}
          </button>
          {/* Trusted users text below image */}
          {/* <div className="flex items-center justify-center gap-2 -mt-10 max-[1024px]:mt-1">
            <div className="flex -space-x-2">
              {[
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/amit%20(1).jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aman.jpg",
                "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/akrati.jpeg",
              ].map((url, i) => (
                <div
                  key={i}
                  className={`relative w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm ${i === 0 ? "" : "-ml-2"}`}
                >
                  <Image
                    src={url}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-black font-medium ml-1 max-[480px]:text-xs">{data.trustText}</p>
          </div> */}
        </div>

        {/* === Right Column - Hero Image === */}
        <div className="flex-1 -mb-10 mt-6 relative max-[1024px]:w-full max-[1024px]:max-w-[450px] max-[1024px]:mx-auto">
          <div className="relative w-full aspect-square max-w-[420px] mx-auto">
            {/* Background decorative circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4c00]/10 to-[#ff4c00]/5 rounded-full blur-3xl transform scale-90"></div>
            
            <div className="relative z-10 w-full h-[240px] sm:w-[500px] sm:h-[330px]   overflow-hidden">
                {/* Student Image */}
  <Image
    src="/images/students.png"
    alt="Woman holding laptop"
    fill
    className="object-cover"
    priority
  />

  {/* Job Cards Overlay */}
  <Image
    src="/images/Job-titles.png" // <-- your uploaded image
    alt="Job cards"
    width={400}
    height={120}
    className="
      absolute 
      -top-12 sm:-top-10 
      left-1/2 -translate-x-1/2 
      z-20 
      w-[90%] sm:w-[380px]
      drop-shadow-xl
    "
  />
              </div>
            {/* Floating stats card */}
            <div className="absolute bottom-20 left-0 z-20 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 max-[480px]:px-2.5 max-[480px]:py-1.5 max-[480px]:bottom-26">
              <div>
                <p className="text-[#ff4c00] font-bold text-xs  leading-tight max-[480px]:text-[0.65rem]">50+ USERS LANDED JOB</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* === Universities Section === */}
      <div className="w-[65%] mx-auto mb-6 mt-5 flex flex-col gap-[0.05rem] items-center justify-center max-[768px]:w-full max-[768px]:p-2 max-[768px]:mb-4 max-[480px]:mb-3">
        {/* Heading in separate box */}
        <div className="bg-white rounded-none py-3 px-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-[90%] max-w-[90%] mx-auto mb-0 max-[768px]:w-[95%] max-[768px]:py-2.5 max-[768px]:px-4 max-[480px]:w-full max-[480px]:py-2 max-[480px]:px-3">
          <p className="text-[0.8rem] font-normal uppercase text-[#555] tracking-[0.05em] m-0 max-[768px]:text-[0.75rem] max-[480px]:text-[0.7rem]">{data.universityHeading}</p>
        </div>

        {/* University logos below */}
        <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden relative p-0 rounded-none w-[100%] max-w-[100%] mx-auto mt-0 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-[768px]:max-w-[95%] max-[480px]:w-full max-[480px]:max-w-full">
          <div className="flex items-center justify-start gap-[0.05rem] flex-nowrap w-max pl-2 pr-2 max-[480px]:pl-1 max-[480px]:pr-1">
            {data.universities.map((uni, index) => {
              const logoSrc = getUniversityLogo(uni.domain, uni.name);

              return (
                <div
                  key={index}
                  className="flex-none bg-white border border-gray-200 rounded-md p-2 w-[180px] h-16 flex flex-row items-center justify-start gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)] snap-start max-[768px]:w-[160px] max-[768px]:h-14 max-[768px]:p-1.5 max-[480px]:w-[140px] max-[480px]:h-12 max-[480px]:p-1 max-[480px]:gap-1.5"
                >
                  <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg max-[768px]:w-9 max-[768px]:h-9 max-[480px]:w-7 max-[480px]:h-7">
                    <Image
                      src={logoSrc}
                      alt={uni.name}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="object-contain w-full h-full p-1"
                      loading="lazy"
                      unoptimized={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  <p className="text-black text-[0.75rem] font-medium text-left leading-[1.3] m-0 p-0 flex-1 max-[768px]:text-[0.7rem] max-[480px]:text-[0.65rem] max-[480px]:leading-[1.2] line-clamp-2">
                    {uni.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}