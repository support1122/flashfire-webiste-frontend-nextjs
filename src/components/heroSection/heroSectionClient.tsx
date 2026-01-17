"use client";

import Image from "next/image";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import StrategyCallCard from "@/src/components/schedule-call/StrategyCallCard";
const UNIVERSITY_LOGOS: Record<string, string> = {
  "Harvard University": "https://logo.clearbit.com/harvard.edu",
  "Stanford University": "https://logo.clearbit.com/stanford.edu",
  "UC Berkeley": "https://logo.clearbit.com/berkeley.edu",
  "Carnegie Mellon University": "https://logo.clearbit.com/cmu.edu",
  "University of Michigan": "https://logo.clearbit.com/umich.edu",
  "Princeton University": "https://logo.clearbit.com/princeton.edu",
  "Yale University": "https://logo.clearbit.com/yale.edu",
  "Columbia University": "https://logo.clearbit.com/columbia.edu",
  "Cornell University": "https://logo.clearbit.com/cornell.edu",
  "University of Pennsylvania": "https://logo.clearbit.com/upenn.edu",
  "Duke University": "https://logo.clearbit.com/duke.edu",
  "Northwestern University": "https://logo.clearbit.com/northwestern.edu",
  "University of Chicago": "https://logo.clearbit.com/uchicago.edu",
  "Caltech": "https://logo.clearbit.com/caltech.edu",
};


type Props = {
  data: HeroSectionData;
};

export default function HeroSectionClient({ data }: Props) {
  const { isHolding, holdProgress, getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }
    },
  });
  return (
    <section className="bg-[#f8ebe5] text-center p-8 pb-16 pt-8 font-['Space_Grotesk',sans-serif] overflow-x-hidden w-full max-w-full box-border max-[768px]:p-4 max-[768px]:pb-10 max-[768px]:pt-6 max-[480px]:p-3 max-[480px]:pb-8 max-[480px]:pt-4">
      {/* === Top Badges === */}
      <div className="flex justify-center gap-2 flex-wrap mb-6 mt-4 max-[768px]:mb-4 max-[768px]:mt-2 max-[480px]:gap-1.5 max-[480px]:mb-3">
        {data.badges.map((badge) => (
          <span key={badge} className="border-[0.5px] border-black text-[#F55D1D] font-['Space_Grotesk',sans-serif] text-xs font-bold leading-tight tracking-[0.72px] text-center uppercase px-3 py-1.5 rounded-none inline-flex items-center justify-center min-h-[27px] whitespace-nowrap opacity-100 max-[768px]:text-[0.65rem] max-[768px]:px-2 max-[768px]:py-1 max-[768px]:min-h-[24px] max-[480px]:text-[0.6rem] max-[480px]:px-1.5 max-[480px]:py-0.5 max-[480px]:min-h-[22px]">
            {badge}
          </span>
        ))}
      </div>

      {/* === Headline === */}
      <h1 className="text-[3.5rem] leading-[0.85] font-bold text-black max-w-[900px] w-full mx-auto mb-2 flex flex-col items-center justify-center text-center break-words px-4 gap-0 max-[1200px]:text-[3rem] max-[1200px]:max-w-[800px] max-[968px]:text-[2.5rem] max-[968px]:max-w-[700px] max-[768px]:text-2xl max-[768px]:leading-[1.05] max-[768px]:max-w-full max-[768px]:w-full max-[768px]:px-3 max-[768px]:mb-4 max-[480px]:text-xl max-[480px]:leading-[1.15] max-[480px]:px-2 max-[480px]:mb-3">
        <span className="block text-center w-full m-0 p-0">{data.headlineMain}</span>
        <span className="block text-center w-full m-0 p-0 flex items-center justify-center flex-wrap gap-3 -mt-4 max-[768px]:flex-nowrap max-[768px]:gap-0 max-[768px]:-mt-1 max-[480px]:gap-0">
          <span className="text-black tracking-[-0.02em] inline-block max-[768px]:-mr-[0.3rem]">{data.headlineHighlight}</span>
          <span className="inline-flex items-center max-[768px]:origin-center max-[768px]:mx-[-0.05rem]">
            <FlashfireLogo
              width={0}
              height={0}
              className="inline-block align-middle h-[2.4em] w-auto leading-none flex-shrink-0 object-contain -mx-8 max-[768px]:h-9 max-[768px]:w-auto max-[768px]:mx-0"
            />
          </span>
          <span className="text-black tracking-[-0.02em] inline-block max-[768px]:-ml-[0.45rem]">{data.headlineSuffix}</span>
        </span>
      </h1>

      {/* === Description === */}
      <p className="font-['Satoshi',sans-serif] text-xl font-medium leading-[1.5] tracking-[-0.4px] text-center text-black max-w-[620px] mx-auto mb-8 px-4 max-[768px]:text-base max-[768px]:leading-[1.6] max-[768px]:mb-6 max-[768px]:px-3 max-[480px]:text-sm max-[480px]:leading-[1.5] max-[480px]:mb-4 max-[480px]:px-2">{data.description}</p>

      {/* === CTA Button === */}
      <button
        {...getButtonProps()}
        // onClick={() => {
        //   const utmSource = typeof window !== "undefined"
        //     ? localStorage.getItem("utm_source") || "WEBSITE"
        //     : "WEBSITE";
        //   const utmMedium = typeof window !== "undefined"
        //     ? localStorage.getItem("utm_medium") || "Website_Front_Page"
        //     : "Website_Front_Page";

        //   GTagUTM({
        //     eventName: "sign_up_click",
        //     label: "Hero_Start_Free_Trial_Button",
        //     utmParams: {
        //       utm_source: utmSource,
        //       utm_medium: utmMedium,
        //       utm_campaign: typeof window !== "undefined"
        //         ? localStorage.getItem("utm_campaign") || "Website"
        //         : "Website",
        //     },
        //   });

        //   // PostHog tracking
        //   trackButtonClick("schedule a free career call", "hero_cta", "cta", {
        //     button_location: "hero_main_cta",
        //     section: "hero_landing",
        //     target_url: "/schedule-a-free-career-call"
        //   });
        //   trackSignupIntent("hero_cta", {
        //     signup_source: "hero_main_button",
        //     funnel_stage: "signup_intent",
        //     target_url: "/schedule-a-free-career-call"
        //   });

        //   // Check current path first
        //   const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
        //   const normalizedPath = currentPath.split('?')[0]; // Remove query params
        //   const isAlreadyOnScheduleACareerCall = normalizedPath === '/schedule-a-free-career-call' ||
        //     normalizedPath === '/en-ca/schedule-a-free-career-call';

        //   // If already on the route, save scroll position and prevent navigation
        //   if (isAlreadyOnScheduleACareerCall) {
        //     // Save current scroll position before modal opens
        //     const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        //     // Dispatch custom event to force show modal
        //     if (typeof window !== 'undefined') {
        //       window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
        //     }

        //     // Restore scroll position immediately after modal opens
        //     requestAnimationFrame(() => {
        //       window.scrollTo({ top: currentScrollY, behavior: 'instant' });
        //       requestAnimationFrame(() => {
        //         window.scrollTo({ top: currentScrollY, behavior: 'instant' });
        //         setTimeout(() => {
        //           window.scrollTo({ top: currentScrollY, behavior: 'instant' });
        //         }, 50);
        //       });
        //     });

        //     // Just trigger the modal, don't navigate or scroll
        //     return;
        //   }

        //   // Dispatch custom event to force show modal FIRST
        //   if (typeof window !== 'undefined') {
        //     window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'));
        //   }

        //   // Save current scroll position before navigation to preserve it
        //   if (typeof window !== 'undefined') {
        //     const currentScrollY = window.scrollY;
        //     sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
        //   }

        //   // Only navigate if NOT already on the page
        //   const targetPath = '/schedule-a-free-career-call';
        //   router.push(targetPath);
        // }}
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
          }
        }}
        className="inline-block bg-[#ff4c00] text-white py-3.5 px-7 rounded-lg font-semibold no-underline mb-6 shadow-[0_3px_0_black] transition-all duration-300 border-none cursor-pointer text-base font-inherit hover:bg-black hover:-translate-y-0.5 active:translate-y-0 max-[768px]:py-3.5 max-[768px]:px-6 max-[768px]:text-[0.95rem] max-[768px]:mb-5 max-[480px]:py-3 max-[480px]:px-5 max-[480px]:text-sm max-[480px]:mb-4 max-[480px]:w-full max-[480px]:max-w-[280px]"
      >
        {data.cta.label}
      </button>

      {/* === Trusted Users === */}
      <div className="flex items-center justify-center gap-2.5 mb-12 max-[768px]:mb-8 max-[768px]:gap-2 max-[480px]:mb-6 max-[480px]:flex-col max-[480px]:gap-2">
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

        <p className="text-base text-black font-medium max-[768px]:text-sm max-[480px]:text-xs max-[480px]:text-center max-[480px]:px-2">{data.trustText}</p>
      </div>


      {/* === Universities Section === */}
      <div className="w-[70%] mx-auto mb-8 flex flex-col gap-[0.05rem] items-center justify-center max-[768px]:w-full max-[768px]:p-2 max-[768px]:mb-6 max-[480px]:mb-4">
        {/* Heading in separate box */}
        <div className="bg-white rounded-none py-4 px-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)] w-[90%] max-w-[90%] mx-auto mb-0 max-[768px]:w-[95%] max-[768px]:py-3 max-[768px]:px-4 max-[480px]:w-full max-[480px]:py-2.5 max-[480px]:px-3">
          <p className="text-[0.9rem] font-normal uppercase text-[#555] tracking-[0.05em] m-0 max-[768px]:text-[0.8rem] max-[480px]:text-[0.75rem]">{data.universityHeading}</p>
        </div>

        {/* University logos below */}
        <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden relative p-0 rounded-none w-[90%] max-w-[90%] mx-auto mt-0 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-[768px]:max-w-[95%] max-[480px]:w-full max-[480px]:max-w-full">
          <div className="flex items-center justify-start gap-[0.05rem] flex-nowrap w-max pl-2 pr-2 max-[480px]:pl-1 max-[480px]:pr-1">
            {data.universities.map((uni, index) => {
              const logoSrc =
                UNIVERSITY_LOGOS[uni.name] ||
                `https://logo.clearbit.com/${uni.domain}`;

              return (
                <div
                  key={index}
                  className="flex-none bg-white border border-gray-200 rounded-md p-2.5 w-[200px] h-20 flex flex-row items-center justify-start gap-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out snap-start max-[768px]:w-[180px] max-[768px]:h-[72px] max-[768px]:p-2 max-[480px]:w-[160px] max-[480px]:h-16 max-[480px]:p-1.5 max-[480px]:gap-2"
                >
                  <Image
                    src={logoSrc}
                    alt={uni.name}
                    width={60}
                    height={40}
                    className="object-contain w-auto max-w-[50px] h-8 max-h-8 flex-shrink-0 max-[768px]:max-w-[45px] max-[768px]:h-7 max-[480px]:max-w-[40px] max-[480px]:h-6"
                    unoptimized
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      let attempts = parseInt(target.getAttribute('data-attempts') || '0');
                      
                      // Fail fast - skip to Google favicons if Clearbit fails
                      if (attempts === 0 && target.src.includes('clearbit.com')) {
                        target.setAttribute('data-attempts', '1');
                        target.src = `https://www.google.com/s2/favicons?domain=${uni.domain}&sz=128`;
                        return;
                      }
                      // Hide logo if all attempts fail
                      if (attempts >= 1) {
                      target.style.opacity = '0.3';
                        target.style.pointerEvents = 'none';
                      }
                    }}
                  />

                  <p className="text-black text-[0.8rem] font-medium text-left leading-[1.3] m-0 p-0 flex-1 max-[768px]:text-[0.75rem] max-[480px]:text-[0.7rem] max-[480px]:leading-[1.2] line-clamp-2">
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
