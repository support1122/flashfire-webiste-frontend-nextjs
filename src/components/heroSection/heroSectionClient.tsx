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

      {/* Mobile-only hero section */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden bg-[#f7e6df] px-4 pb-7 pt-9 text-center">
          <Image
            key={`mobile-top-plane-${planeAnimationKey}`}
            src="/images/element2.png"
            alt=""
            width={394}
            height={296}
            priority
            className="hero-plane-top-flow pointer-events-none absolute right-[-48px] top-[14px] z-10 h-auto w-[142px] select-none"
          />
          <Image
            src="/images/element1.png"
            alt=""
            width={83}
            height={99}
            priority
            className="pointer-events-none absolute left-[22%] top-[585px] z-10 h-auto w-[36px] select-none"
          />
          <Image
            src="/images/element3.png"
            alt=""
            width={207}
            height={213}
            priority
            className="pointer-events-none absolute bottom-[230px] left-[10%] z-10 h-auto w-[34px] select-none"
          />
          <Image
            src="/images/element3.png"
            alt=""
            width={207}
            height={213}
            className="pointer-events-none absolute right-[10%] top-[575px] z-10 h-auto w-[34px] select-none"
          />

          <div className="relative z-20 mx-auto max-w-[430px]">
            <div className="mb-4 inline-flex h-[25px] max-w-full items-center justify-center rounded-full bg-white px-3.5 text-[10px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
              {data.badges[0]}
            </div>

            <h1 className="mx-auto max-w-[360px] text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-black min-[420px]:max-w-[410px] min-[420px]:text-[38px]">
              <span className="block">Land Interview</span>
              <span className="-mt-2 block">
                Calls Faster with
                <FlashfireLogo
                  width={58}
                  height={58}
                  className="-ml-1 inline-block h-[1.28em] w-auto translate-y-[0.24em] align-baseline"
                />
              </span>
              <span className="block text-[#f55d1d]">Flashfire AI Copilot</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[390px] font-['Satoshi',sans-serif] text-[14px] font-medium leading-[1.55] text-[#262626]">
              {data.description}
            </p>

            <button
              type="button"
              {...getButtonProps()}
              onClick={handleGetStartedClick}
              className="mt-6 inline-flex h-[50px] min-w-[160px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff5a1f] px-6 text-[16px] font-bold text-white shadow-[-7px_7px_0_#3b3b3b] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
            >
              {data.cta.label}
            </button>

            <div className="mx-auto mt-8 grid w-full max-w-[360px] grid-cols-1 gap-2 min-[520px]:max-w-[600px] min-[520px]:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.value}
                  className="flex min-h-[46px] items-center rounded-[5px] bg-white px-3 py-2 text-left shadow-[0_6px_18px_rgba(64,31,18,0.08)]"
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

          <div className="relative z-20 mx-auto mt-5 min-h-[280px] w-full max-w-[520px]">
            <Image
              src="/images/firefly.png"
              alt="Students celebrating career success with Flashfire"
              fill
              priority
              sizes="96vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="relative z-30 overflow-visible bg-white px-4 py-9 text-center">
          <Image
            key={`mobile-lower-plane-${planeAnimationKey}`}
            src="/images/element2.png"
            alt=""
            width={394}
            height={296}
            className="hero-plane-lower-flow pointer-events-none absolute left-[-12px] top-[-12px] z-50 h-auto w-[112px] select-none"
          />
          <p className="mx-auto max-w-[340px] font-['Satoshi',sans-serif] text-[15px] font-medium leading-[1.4] text-[#9d9d9d]">
            {data.universityHeading}
          </p>

          <div className="mt-6 flex gap-7 overflow-x-auto px-1 pb-2 text-[#a7a7a7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {trustedUniversities.map((university) => (
              <div
                key={university}
                className="flex min-h-[42px] min-w-max items-center justify-center whitespace-nowrap font-serif text-[18px] font-semibold leading-tight opacity-80"
              >
                {university}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative isolate hidden overflow-visible lg:block">
        <div className="relative z-0 min-h-[650px] bg-[#f7e6df]">
        <Image
          key={`top-plane-${planeAnimationKey}`}
          src="/images/element2.png"
          alt=""
          width={394}
          height={296}
          priority
          className="hero-plane-top-flow pointer-events-none absolute right-[-8px] top-[44px] z-10 h-auto w-[224px] select-none xl:right-[-6px] xl:top-[46px] xl:w-[230px]"
        />
        <Image
          src="/images/element1.png"
          alt=""
          width={83}
          height={99}
          priority
          className="pointer-events-none absolute left-[51.6%] top-[178px] z-10 h-auto w-[44px] select-none xl:left-[51.4%] xl:top-[184px]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          priority
          className="pointer-events-none absolute bottom-[82px] left-[48.8%] z-10 h-auto w-[46px] select-none xl:bottom-[88px] xl:left-[48.8%]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          className="pointer-events-none absolute right-[18.2%] top-[302px] z-10 h-auto w-[44px] select-none xl:right-[18.5%] xl:top-[308px]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          className="pointer-events-none absolute right-[23.5%] top-[230px] z-10 h-auto w-[38px] select-none xl:right-[23.8%] xl:top-[236px]"
        />

        <div className="relative z-20 mx-auto flex min-h-[650px] w-full max-w-[1536px] flex-row items-center px-[5.4vw] pb-0 pt-10">
          <div className="relative z-20 max-w-[560px] text-left lg:w-[47%] lg:pt-2">
            <div className="mb-4 inline-flex h-[26px] items-center justify-center rounded-full bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
              {data.badges[0]}
            </div>

            <h1 className="text-[46px] font-bold leading-[1.08] tracking-[-0.02em] text-black xl:text-[49px]">
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

            <p className="mt-5 max-w-[530px] font-['Satoshi',sans-serif] text-[17px] font-medium leading-[1.55] text-[#262626]">
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

            <div className="mt-10 grid w-full max-w-[600px] grid-cols-3 gap-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.value}
                  className="flex min-h-[46px] items-center rounded-[5px] bg-white px-3 py-2 text-left shadow-[0_6px_18px_rgba(64,31,18,0.08)] sm:min-h-[48px]"
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

          <div className="absolute bottom-0 right-[1.5vw] h-[590px] w-[58vw] xl:h-[610px] xl:w-[60vw]">
            <Image
              src="/images/firefly.png"
              alt="Students celebrating career success with Flashfire"
              fill
              priority
              sizes="58vw"
              className="object-contain object-right-bottom"
            />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1536px] overflow-visible px-[5.4vw] py-[52px] text-center">
        <Image
          key={`lower-plane-${planeAnimationKey}`}
          src="/images/element2.png"
          alt=""
          width={394}
          height={296}
          className="hero-plane-lower-flow pointer-events-none absolute left-[-34px] top-[6px] z-50 h-auto w-[150px] select-none"
        />
        <p className="font-['Satoshi',sans-serif] text-[20px] font-medium leading-[1.4] text-[#9d9d9d]">
          {data.universityHeading}
        </p>

        <div className="mt-7 grid grid-cols-5 items-center gap-x-10 gap-y-6 text-[#a7a7a7]">
          {trustedUniversities.map((university) => (
            <div
              key={university}
              className="flex min-h-[48px] items-center justify-center whitespace-nowrap font-serif text-[18px] font-semibold leading-tight opacity-80 xl:text-[20px]"
            >
              {university}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
