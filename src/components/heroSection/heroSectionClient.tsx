"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

type Props = {
  data: HeroSectionData;
};

const heroStats = [
  {
    value: "1200+",
    label: "Applications submitted in the last 2 months",
  },
  {
    value: "15+",
    label: "Average Interview calls",
  },
  {
    value: "50+",
    label: "Land their first job",
  },
];

const trustedUniversities = [
  "HARVARD UNIVERSITY",
  "Stanford University",
  "UNIVERSITY OF MICHIGAN",
  "Berkeley",
  "Carnegie Mellon University",
];

export default function HeroSectionClient({ data }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [planeAnimationKey, setPlaneAnimationKey] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaneAnimationKey((key) => key + 1);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

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
      // Some browser-generated events cannot be cancelled.
    }

    if (typeof window === "undefined") return;

    const utmSource = localStorage.getItem("utm_source") || "WEBSITE";
    const utmMedium = localStorage.getItem("utm_medium") || "Hero_Section";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Hero_Book_A_Demo_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: localStorage.getItem("utm_campaign") || "Website",
      },
    });
    trackButtonClick(data.cta.label, "hero_cta", "cta", {
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
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-white font-['Space_Grotesk',sans-serif] text-black"
    >
      <style jsx global>{`
        @keyframes heroPlaneTopFlow {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 55% 0);
            transform: translate3d(-46px, 42px, 0) rotate(-10deg) scale(0.92);
          }
          42% {
            opacity: 1;
            clip-path: inset(0 28% 18% 0);
            transform: translate3d(-12px, 12px, 0) rotate(5deg) scale(1.02);
          }
          72% {
            clip-path: inset(0 0 0 0);
            transform: translate3d(4px, -3px, 0) rotate(-3deg) scale(1);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes heroPlaneLowerFlow {
          0% {
            opacity: 0;
            clip-path: inset(44% 0 0 100%);
            transform: translate3d(42px, -32px, 0) rotate(170deg) scale(0.9);
          }
          44% {
            opacity: 1;
            clip-path: inset(15% 0 0 34%);
            transform: translate3d(14px, -10px, 0) rotate(187deg) scale(1.02);
          }
          74% {
            clip-path: inset(0 0 0 0);
            transform: translate3d(-5px, 4px, 0) rotate(178deg) scale(1);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translate3d(0, 0, 0) rotate(182deg) scale(1);
          }
        }

        .hero-plane-top-flow {
          animation: heroPlaneTopFlow 1.45s cubic-bezier(0.2, 0.85, 0.2, 1)
            both;
          transform-origin: 18% 12%;
          will-change: transform, clip-path, opacity;
        }

        .hero-plane-lower-flow {
          animation: heroPlaneLowerFlow 1.55s cubic-bezier(0.2, 0.85, 0.2, 1)
            both;
          transform-origin: 68% 18%;
          will-change: transform, clip-path, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-plane-top-flow,
          .hero-plane-lower-flow {
            animation: none;
          }
        }
      `}</style>
      <div className="relative min-h-[600px] bg-[#f7e6df] md:min-h-[640px] lg:min-h-[650px]">
        <Image
          key={`top-plane-${planeAnimationKey}`}
          src="/images/element2.png"
          alt=""
          width={394}
          height={296}
          priority
          className="hero-plane-top-flow pointer-events-none absolute right-[-8px] top-[44px] z-10 hidden h-auto w-[224px] select-none lg:block xl:right-[-6px] xl:top-[46px] xl:w-[230px]"
        />
        <Image
          src="/images/element1.png"
          alt=""
          width={83}
          height={99}
          priority
          className="pointer-events-none absolute z-10 hidden h-auto w-[44px] select-none lg:left-[51.6%] lg:top-[178px] lg:block xl:left-[51.4%] xl:top-[184px]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          priority
          className="pointer-events-none absolute z-10 hidden h-auto w-[46px] select-none lg:bottom-[82px] lg:left-[48.8%] lg:block xl:bottom-[88px] xl:left-[48.8%]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          className="pointer-events-none absolute z-10 hidden h-auto w-[44px] select-none lg:right-[18.2%] lg:top-[302px] lg:block xl:right-[18.5%] xl:top-[308px]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          className="pointer-events-none absolute z-10 hidden h-auto w-[38px] select-none lg:right-[23.5%] lg:top-[230px] lg:block xl:right-[23.8%] xl:top-[236px]"
        />

        <div className="relative z-20 mx-auto flex min-h-[600px] w-full max-w-[1536px] flex-col px-5 pb-7 pt-14 md:min-h-[640px] md:px-[5.4vw] md:pb-0 md:pt-10 lg:min-h-[650px] lg:flex-row lg:items-center">
          <div className="relative z-20 max-w-[560px] text-center lg:w-[47%] lg:pt-2 lg:text-left">
            <div className="mb-4 inline-flex h-[26px] items-center justify-center rounded-full bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
              {data.badges[0]}
            </div>

            <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-black sm:text-[40px] md:text-[46px] xl:text-[49px]">
              <span className="block">Land Interview</span>
              <span className="block -mt-5 whitespace-nowrap">
                Calls Faster with
                <FlashfireLogo
                  width={58}
                  height={58}
                  className="-ml-2 inline-block h-[1.28em] w-auto translate-y-[0.18em] align-baseline"
                />
              </span>
              <span className="block whitespace-nowrap text-[#f55d1d]">
                Flashfire AI Copilot
              </span>
            </h1>

            <p className="mt-5 max-w-[530px] font-['Satoshi',sans-serif] text-[15px] font-medium leading-[1.55] text-[#262626] sm:text-[17px]">
              {data.description}
            </p>

            <button
              type="button"
              {...getButtonProps()}
              onClick={handleGetStartedClick}
              className="mt-7 inline-flex h-[54px] min-w-[174px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff5a1f] px-7 text-[18px] font-bold text-white shadow-[-8px_8px_0_#3b3b3b] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
            >
              {data.cta.label}
            </button>

            <div className="mt-10 grid w-full max-w-[600px] grid-cols-1 gap-2 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.value}
                  className="flex min-h-[48px] items-center rounded-[5px] bg-white px-3 py-2 text-left shadow-[0_6px_18px_rgba(64,31,18,0.08)]"
                >
                  <strong className="shrink-0 text-[20px] font-bold leading-none text-black">
                    {stat.value}
                  </strong>
                  <span className="mx-3 h-7 w-px shrink-0 bg-[#e9d9d1]" />
                  <span className="font-['Satoshi',sans-serif] text-[10px] font-medium leading-[1.25] text-[#6a6765]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 min-h-[390px] lg:absolute lg:bottom-0 lg:right-[1.5vw] lg:mt-0 lg:h-[590px] lg:min-h-0 lg:w-[58vw] xl:h-[610px] xl:w-[60vw]">
            <Image
              src="/images/firefly.png"
              alt="Students celebrating career success with Flashfire"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 58vw"
              className="object-contain object-bottom lg:object-right-bottom"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1536px] px-5 py-10 text-center md:px-[5.4vw] md:py-[52px]">
        <Image
          key={`lower-plane-${planeAnimationKey}`}
          src="/images/element2.png"
          alt=""
          width={394}
          height={296}
          className="hero-plane-lower-flow pointer-events-none absolute left-[-34px] top-[6px] hidden h-auto w-[150px] select-none lg:block"
        />
        <p className="font-['Satoshi',sans-serif] text-[17px] font-medium leading-[1.4] text-[#9d9d9d] md:text-[20px]">
          {data.universityHeading}
        </p>

        <div className="mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-6 text-[#a7a7a7] sm:grid-cols-3 lg:grid-cols-5">
          {trustedUniversities.map((university) => (
            <div
              key={university}
              className="flex min-h-[48px] items-center justify-center font-serif text-[19px] font-semibold leading-tight opacity-80 md:text-[22px]"
            >
              {university}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
