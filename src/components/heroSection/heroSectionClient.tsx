"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
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

/** Splits "… with" into two lines so layout stays stable at any zoom (no reliance on soft wrap). */
function splitHeadlineMain(headlineMain: string): { first: string; mid: string | null } {
  const trimmed = headlineMain.trimEnd();
  const m = trimmed.match(/^(.*?)\s+with$/i);
  if (m) {
    return { first: m[1].trimEnd(), mid: "with" };
  }
  return { first: headlineMain, mid: null };
}

export default function HeroSectionClient({ data }: Props) {
  const { first: headlineFirst, mid: headlineMid } = splitHeadlineMain(data.headlineMain);

  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });

  const handleGetStartedClick = (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
    } catch {
      // ignore cross-origin or non-cancelable events
    }
    if (typeof window === "undefined") return;

    const utmSource = localStorage.getItem("utm_source") || "WEBSITE";
    const utmMedium = localStorage.getItem("utm_medium") || "Hero_Section";
    GTagUTM({
      eventName: "sign_up_click",
      label: "Hero_Start_Free_Trial_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: localStorage.getItem("utm_campaign") || "Website",
      },
    });
    trackButtonClick("Get Started", "hero_cta", "cta", {
      button_location: "hero_main_cta",
      section: "hero_landing",
      target_url: "/Get-Started",
    });
    trackSignupIntent("hero_cta", {
      signup_source: "hero_main_button",
      funnel_stage: "signup_intent",
      target_url: "/Get-Started",
    });
    sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
    window.history.pushState({}, "", "/Get-Started");
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  return (
    <section className="min-h-[100vh] bg-[#f8ebe5] py-2 md:py-8 text-center font-['Space_Grotesk',sans-serif] overflow-x-hidden w-full max-w-full box-border flex flex-col justify-center">
      {/* === Main Two Column Layout === */}
      <div className="relative w-full px-4 md:px-10 xl:px-20 flex flex-row items-center justify-between gap-8 mb-6 max-[1024px]:flex-col max-[1024px]:gap-10 max-[1024px]:mb-8">
        
        {/* === Left Column - Content === */}
        <div className="hidden md:block flex-1 max-w-[40rem] text-left max-[1024px]:text-center max-[1024px]:w-full max-[1024px]:max-w-[44rem]">
          {/* === Top Badge === */}
          <div className="inline-flex items-center gap-2 border border-[#d7c8c1] rounded-full px-4 py-2.5 mb-6 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#ff4c00]">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#ff4c00] text-sm font-medium">
              {data.badges[0] || "AI - Powerd Job Applications"}
            </span>
          </div>

          {/* === Headline === */}
          <h1 className="text-[3rem] leading-[0.98] font-bold text-black  max-[1400px]:text-[3.75rem] max-[1200px]:text-[3.2rem] max-[1024px]:text-center max-[1024px]:text-[3rem]">
            <span className="block max-[1024px]:whitespace-nowrap max-[1024px]:[font-size:min(3rem,calc(1rem+3.6vw))] max-[1024px]:[line-height:1.04]">
              {headlineFirst}
            </span>
            {headlineMid ? (
              <span className="block max-[1024px]:[font-size:min(3rem,calc(1rem+3.6vw))]">{headlineMid}</span>
            ) : null}
            <span className="block -mt-2 max-[1024px]:whitespace-nowrap max-[1024px]:[font-size:min(3rem,calc(1rem+3.6vw))]">
              <span className="text-black">{data.headlineHighlight}</span>
              <span className="inline-flex items-center align-middle">
                <FlashfireLogo
                  width={0}
                  height={0}
                  className="h-[6rem] -ml-3 -mr-3 w-auto inline-block "
                />
              </span>
              <span>{data.headlineSuffix}</span>
            </span>
          </h1>

          {/* === Description === */}
          <p className="font-['Satoshi',sans-serif] text-[1.1rem] font-medium leading-[1.6] text-[#555] max-w-[35rem] mb-8 max-[1024px]:mx-auto max-[1024px]:text-center">
            {data.description}
          </p>

          {/* === CTA Button === */}
          <button
            type="button"
            {...getButtonProps()}
            onClick={handleGetStartedClick}
            className="relative z-[1] touch-manipulation inline-flex items-center justify-center bg-[#ff4c00] text-white py-4 px-9 rounded-full font-semibold no-underline mb-6 shadow-[0_7px_0_#111111] border border-black/10 cursor-pointer text-lg font-inherit outline-none transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_11px_0_#111111] active:translate-y-0 active:shadow-[0_4px_0_#111111] focus-visible:ring-2 focus-visible:ring-[#ff4c00] focus-visible:ring-offset-2"
          >
            {data.cta.label}
          </button>
          <p className="py-1 text-base text-gray-500">
            Join <span className="font-semibold text-black">600+ graduates</span> who landed interviews at top companies.
          </p>
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
        {/* z-30 so taps aren’t stolen by the hero job-cards image (absolute, z-20, -top) overlapping this column */}
        <div className="relative z-30 flex md:hidden flex-col items-center pt-25 text-center w-full px-1 shrink-0">
         

          {/* Badge */}
          <div className="flex items-center gap-2 border border-[#d7c8c1] rounded-full px-3.5 py-2 mb-3 bg-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="w-2 h-2 bg-[#ff4c00] rounded-full"></div>
            <span className="text-[#ff4c00] text-xs font-medium">
              {data.badges[0] || "AI Powered"}
            </span>
          </div>

          {/* Heading — three fixed lines on mobile: (1) full phrase (2) with (3) Flashfire + logo + suffix */}
          <h1 className="w-full max-w-[24rem] text-[3.1rem] leading-[1.04] font-bold text-black mb-3 max-[480px]:max-w-[20rem] max-[480px]:text-[1.95rem]">
            <span className="block whitespace-nowrap [font-size:min(1.9rem,calc(0.45rem+5vw))] [line-height:1.08]">
              {headlineFirst}
            </span>
            {headlineMid ? (
              <span className="block [font-size:min(1.9rem,calc(0.45rem+5vw))]">{headlineMid}</span>
            ) : null}
            <span className="block -mt-2 whitespace-nowrap [font-size:min(1.9rem,calc(0.45rem+5vw))]">
              <span className="text-black">{data.headlineHighlight}</span>
              <span className="inline-flex items-center -mx-2 align-middle">
                <FlashfireLogo
                  width={0}
                  height={0}
                  className="h-[4.6rem] w-auto inline-block max-[480px]:h-[3.25rem]"
                />
              </span>
              <span>{data.headlineSuffix}</span>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-[22rem] text-sm text-[#555] mb-5 px-2 leading-relaxed">
            {data.description}
          </p>

          {/* CTA */}
          <button
            type="button"
            {...getButtonProps()}
            onClick={handleGetStartedClick}
            className="relative z-[1] touch-manipulation inline-flex min-w-[12.5rem] items-center justify-center bg-[#ff4c00] text-white py-3.5 px-7 rounded-full font-semibold no-underline mb-4 shadow-[0_6px_0_#111111] border border-black/10 cursor-pointer text-base font-inherit outline-none transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_9px_0_#111111] active:translate-y-0 active:shadow-[0_4px_0_#111111] focus-visible:ring-2 focus-visible:ring-[#ff4c00] focus-visible:ring-offset-2"
          >
            {data.cta.label}
          </button>
          <p className=" py-1 text-sm text-gray-500 ">
            Join <span className="font-semibold text-black">600+ graduates</span> who landed interviews at top companies.
          </p>
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
        <div className="relative z-0 flex-1 mt-2 md:mt-0 w-full max-[1024px]:max-w-[720px] max-[1024px]:mx-auto">
          <div className="relative w-full max-w-[52rem] mx-auto">
            <div className="pointer-events-none absolute inset-x-[8%] top-[18%] h-[58%] rounded-[50%] bg-white/45 blur-[70px] max-[767px]:inset-x-[18%] max-[767px]:top-[20%] max-[767px]:h-[46%] max-[767px]:blur-[42px]" />
            <div className="pointer-events-none absolute left-[16%] bottom-[10%] h-32 w-32 rounded-full bg-[#ff4c00]/10 blur-3xl max-[767px]:left-[10%] max-[767px]:bottom-[16%] max-[767px]:h-20 max-[767px]:w-20 max-[767px]:blur-2xl" />

            <div className="relative z-10 mx-auto aspect-[1.12/1] w-full max-w-[50rem] max-[767px]:aspect-[1/1.02] max-[767px]:max-w-[23rem]">
              <div className="absolute left-[8%] top-[44%] hidden md:block h-10 w-10 rounded-full border-2 border-dashed border-black/20" />
              <div className="absolute right-[6%] top-[30%] hidden md:block text-[3rem] text-black/15">✈</div>

              <Image
                src="/images/women-with-laptop.png"
                alt="Woman working on laptop"
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-contain object-center max-[767px]:scale-[1.03]"
                priority
              />
            </div>
          </div>

          
        </div>
      </div>

      {/* === Universities Section === */}
      <div className="max-w-[990px] mx-auto mb-7 mt-1 flex flex-col gap-[0.05rem] items-center justify-center max-[768px]:w-full max-[768px]:p-2 max-[768px]:mb-4 max-[480px]:mb-3">
        {/* Heading in separate box */}
        <div className="bg-white rounded-none py-3.5 px-[1.375rem] text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-full mx-auto mb-0 max-[768px]:w-[95%] max-[768px]:py-2.5 max-[768px]:px-4 max-[480px]:w-full max-[480px]:py-2 max-[480px]:px-3">
          <p className="text-[0.88rem] font-normal uppercase text-[#555] tracking-[0.05em] m-0 max-[768px]:text-[0.825rem] max-[480px]:text-[0.77rem]">{data.universityHeading}</p>
        </div>

        {/* University logos below */}
        <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden relative p-0 rounded-none w-full mx-auto  scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-[768px]:max-w-[95%] max-[480px]:w-full max-[480px]:max-w-full">
          <div className="flex items-center justify-start gap-[0.05rem] flex-nowrap w-max pl-2 pr-2 max-[480px]:pl-1 max-[480px]:pr-1">
            {data.universities.map((uni, index) => {
              const logoSrc = getUniversityLogo(uni.domain, uni.name);

              return (
                <div
                  key={index}
                  className="flex-none bg-white border border-gray-200  p-2.5 w-[198px] h-[4.4rem] flex flex-row items-center justify-start gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)] snap-start max-[768px]:w-[176px] max-[768px]:h-[3.85rem] max-[768px]:p-1.5 max-[480px]:w-[154px] max-[480px]:h-[3.3rem] max-[480px]:p-1 max-[480px]:gap-1.5"
                >
                  <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg max-[768px]:w-10 max-[768px]:h-10 max-[480px]:w-8 max-[480px]:h-8">
                    <Image
                      src={logoSrc}
                      alt={uni.name}
                      width={44}
                      height={44}
                      sizes="44px"
                      className="object-contain w-full h-full p-1"
                      loading="lazy"
                      unoptimized={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  <p className="text-black text-[0.825rem] font-medium text-left leading-[1.3] m-0 p-0 flex-1 max-[768px]:text-[0.77rem] max-[480px]:text-[0.715rem] max-[480px]:leading-[1.2] line-clamp-2">
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
