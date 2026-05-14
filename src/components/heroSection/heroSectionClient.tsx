"use client";

import Image from "next/image";
import { useRef, type SyntheticEvent } from "react";
import FlashfireLogo from "@/src/components/FlashfireLogo";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import styles from "./heroSection.module.css";

type Props = {
  data: HeroSectionData;
  heroImageSrc?: string;
  shiftHeroImageLeft?: boolean;
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
    label: "Landed their first job",
  },
];

const trustedUniversities = [
  {
    name: "Harvard University",
    domain: "harvard.edu",
    wordmark: ["HARVARD", "UNIVERSITY"],
    color: "#a7a7a7",
  },
  {
    name: "Stanford University",
    domain: "stanford.edu",
    wordmark: ["Stanford", "University"],
    color: "#8c1515",
  },
  {
    name: "University of Michigan",
    domain: "umich.edu",
    wordmark: ["UNIVERSITY OF", "MICHIGAN"],
    color: "#00274c",
  },
  {
    name: "Berkeley",
    domain: "berkeley.edu",
    wordmark: ["Berkeley", "UNIVERSITY OF CALIFORNIA"],
    color: "#003262",
  },
  {
    name: "Carnegie Mellon University",
    domain: "cmu.edu",
    wordmark: ["Carnegie", "Mellon", "University"],
    color: "#e1bfc4",
  },
];

const getUniversityLogo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const getUniversityLineClass = (universityName: string, lineIndex: number) => {
  if (universityName === "Berkeley" && lineIndex === 1) {
    return "text-[7px] font-bold leading-none tracking-[0.02em]";
  }

  if (universityName === "University of Michigan" && lineIndex === 0) {
    return "text-[8px] font-bold leading-none tracking-[0.03em]";
  }

  return "text-[20px] font-bold leading-[0.9] tracking-[-0.025em] xl:text-[22px]";
};

function PlaneTrailScene({
  priority = false,
  position = "topRight",
}: {
  priority?: boolean;
  position?: "topRight" | "bottomLeft";
}) {
  const isBottomLeft = position === "bottomLeft";

  return (
    <div
      className={`absolute inset-0 h-[200px] w-[200px] origin-center ${
        isBottomLeft ? "rotate-180" : ""
      }`}
    >
      <Image
        src="/images/element4.png"
        alt=""
        width={117}
        height={90}
        priority={priority}
        className={`absolute h-auto w-[300px] ${
          isBottomLeft ? "left-[0px] top-[10px]" : "left-0 top-0"
        }`}
      />
    </div>
  );
}

export default function HeroSectionClient({
  data,
  heroImageSrc = "/images/firefly.png",
  shiftHeroImageLeft = false,
}: Props) {
  const mobileHeroFrameClass = shiftHeroImageLeft
    ? "w-full max-w-[620px]"
    : "w-[118vw] max-w-[680px]";
  const mobileHeroHeightClass = shiftHeroImageLeft ? "h-[560px]" : "h-[460px]";
  const mobileHeroOffsetClass = shiftHeroImageLeft ? "-mt-24" : "-mt-10";
  const mobileHeroImageClass = shiftHeroImageLeft
    ? "origin-bottom scale-135 -translate-x-8"
    : "scale-125";
  const desktopHeroBottomClass = shiftHeroImageLeft ? "bottom-14" : "bottom-0";
  const desktopHeroImagePositionClass = shiftHeroImageLeft
    ? "right-[0vw] w-[59vw] xl:right-[1vw] xl:w-[63vw]"
    : "right-[-18vw] w-[72vw] xl:right-[-13vw] xl:w-[76vw]";
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
      }
    },
  });
  const lastHeroCtaActivationRef = useRef(0);

  const handleGetStartedClick = (e?: SyntheticEvent<HTMLButtonElement>) => {
    try {
      e?.preventDefault();
      e?.stopPropagation();
    } catch {
      // Some browser-generated events cannot be cancelled.
    }

    if (typeof window === "undefined") return;

    const now = Date.now();
    if (now - lastHeroCtaActivationRef.current < 700) return;
    lastHeroCtaActivationRef.current = now;

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
      className="relative w-full overflow-hidden bg-white font-['Space_Grotesk',sans-serif] text-black"
    >
      {/* Mobile-only hero section */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden bg-[#f7e6df] px-6 pb-0 pt-6 text-left">
          <Image
            src="/images/element1.png"
            alt=""
            width={83}
            height={99}
            priority
            className="pointer-events-none absolute left-[10%] top-[490px] z-10 h-auto w-[34px] select-none"
          />
          <Image
            src="/images/element3.png"
            alt=""
            width={207}
            height={213}
            priority
            className="pointer-events-none absolute right-[29%] top-[548px] z-10 h-auto w-[40px] select-none"
          />
          <Image
            src="/images/element3.png"
            alt=""
            width={207}
            height={213}
            className="pointer-events-none absolute right-[25%] top-[609px] z-10 h-auto w-[22px] select-none"
          />

          <div className="relative z-20 mx-auto max-w-[430px]">
            <div className="mb-5 inline-flex h-[28px] max-w-full items-center justify-center rounded-full bg-white px-3.5 text-[9px] font-bold uppercase leading-none tracking-[0.08em] text-[#f55d1d] shadow-sm">
              {data.badges[0]}
            </div>

            <h1 className="max-w-[340px] text-[33px] font-bold leading-[1.08] tracking-[-0.02em] text-black min-[390px]:text-[35px]">
              <span className="block">Land Interview</span>
              <span className="-mt-1 block whitespace-nowrap">
                Calls Faster with
                <FlashfireLogo
                  width={58}
                  height={58}
                  className="-ml-1 inline-block h-[1.2em] w-auto translate-y-[0.2em] align-baseline"
                />
              </span>
              <span className="block text-[#f55d1d]">Flashfire AI Copilot</span>
            </h1>

            <p className="mt-4 max-w-[338px] font-['Satoshi',sans-serif] text-[15.5px] font-medium leading-[1.55] text-[#262626]">
              {data.description}
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                {...getButtonProps()}
                onPointerUp={handleGetStartedClick}
                onClick={handleGetStartedClick}
                className="inline-flex h-[46px] w-full max-w-[283px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-6 text-[16px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
              >
                Get Started →
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-34px] top-[430px] z-10 aspect-[394/296] w-[190px] origin-center select-none">
            <PlaneTrailScene priority />
          </div>

          <div className={`pointer-events-none relative left-1/2 z-10 -translate-x-1/2 ${mobileHeroHeightClass} ${mobileHeroOffsetClass} ${mobileHeroFrameClass}`}>
            <Image
              src={heroImageSrc}
              alt="Students celebrating career success with Flashfire"
              fill
              priority
              sizes="96vw"
              className={`${mobileHeroImageClass} object-contain object-right-bottom`}
            />
          </div>
        </div>

        <div className="relative z-30 overflow-visible bg-white px-6 pb-10 pt-9 text-center">
          <div className="mx-auto grid w-full max-w-[340px] grid-cols-1 gap-5">
            {heroStats.map((stat) => (
              <div
                key={stat.value}
                className="flex min-h-[68px] items-center rounded-[8px] bg-white px-4 py-3 text-left shadow-[0_4px_18px_rgba(245,93,29,0.12)]"
              >
                <strong className="w-[74px] shrink-0 text-[24px] font-bold leading-none text-black">
                  {stat.value}
                </strong>
                <span className="mr-4 h-7 w-px shrink-0 bg-[#ddd8d5]" />
                <span className="font-['Satoshi',sans-serif] text-[11px] font-medium leading-[1.25] text-[#777]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute left-[-24px] top-[-48px] z-50 hidden aspect-[394/296] w-[180px] origin-center select-none">
            <PlaneTrailScene position="bottomLeft" />
          </div>
          <p className="mx-auto mt-16 max-w-[290px] font-['Satoshi',sans-serif] text-[14px] font-medium leading-[1.45] text-[#9d9d9d]">
            {data.universityHeading}
          </p>

          <div className="mx-auto mt-8 grid max-w-[300px] grid-cols-2 items-center gap-x-8 gap-y-8 text-[#a7a7a7]">
            {trustedUniversities.map((university) => (
              <div
                key={university.name}
                className="flex min-h-[34px] min-w-0 items-center justify-center gap-2 whitespace-nowrap opacity-90 last:col-span-2 last:justify-self-center"
                style={{ color: university.color }}
              >
                <Image
                  src={getUniversityLogo(university.domain)}
                  alt=""
                  width={28}
                  height={28}
                  className="h-6 w-6 object-contain opacity-90"
                  unoptimized
                />
                <span className="flex flex-col items-start font-serif">
                  {university.wordmark.map((line, lineIndex) => (
                    <span
                      key={line}
                      className={
                        university.name === "Berkeley" && lineIndex === 1
                          ? "text-[6px] font-bold leading-none tracking-[0.02em]"
                          : university.name === "University of Michigan" &&
                              lineIndex === 0
                            ? "text-[7px] font-bold leading-none tracking-[0.03em]"
                            : "text-[16px] font-bold leading-[0.9] tracking-[-0.02em]"
                      }
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative isolate hidden overflow-visible lg:block">
        <div className="relative z-0 min-h-[720px] overflow-hidden bg-[#f7e6df]">
        <div className="pointer-events-none absolute right-[-15vw] top-[-19px] z-10 aspect-[394/296] w-[310px] origin-center select-none xl:right-[-11vw] xl:top-[-12px] xl:w-[326px]">
          <PlaneTrailScene priority />
        </div>
        <Image
          src="/images/element1.png"
          alt=""
          width={83}
          height={99}
          priority
          className="pointer-events-none absolute left-[55.5%] top-[105px] z-30 h-auto w-[60px] select-none xl:left-[55.5%] xl:top-[140px]"
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
          className="pointer-events-none absolute right-[18.2%] top-[432px] z-10 h-auto w-[44px] select-none xl:right-[18.5%] xl:top-[150px]"
        />
        <Image
          src="/images/element3.png"
          alt=""
          width={207}
          height={213}
          className="pointer-events-none absolute right-[23.5%] top-[230px] z-10 h-auto w-[38px] select-none xl:right-[23.8%] xl:top-[236px]"
        />

        <div className="relative z-20 mx-auto flex min-h-[720px] w-full max-w-[1536px] flex-row items-center px-[5.4vw] pb-0 pt-4">
          <div className="relative z-20 max-w-[740px] text-left lg:w-[50%] lg:-translate-y-6 lg:pt-2">
            <div className="mb-4 inline-flex h-[26px] items-center justify-center rounded-full bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.06em] text-[#f55d1d] shadow-sm">
              {data.badges[0]}
            </div>

            <h1 className="text-[54px] font-bold leading-[1.05] tracking-[-0.02em] text-black xl:text-[64px]">
              <span className="block">Land Interview</span>
              <span className="block -mt-5 whitespace-nowrap">
                Calls Faster with
                <FlashfireLogo
                  width={58}
                  height={58}
                  className="-ml-2 inline-block h-[1.3em] w-auto translate-y-[0.28em] align-baseline"
                />
              </span>
              <span className="block whitespace-nowrap text-[#f55d1d]">
                Flashfire AI Copilot
              </span>
            </h1>

            <p className="mt-5 max-w-[540px] font-['Satoshi',sans-serif] text-[20px] font-medium leading-[1.55] text-[#262626]">
              {data.description}
            </p>

            <button
              type="button"
              {...getButtonProps()}
              onClick={handleGetStartedClick}
              className="mt-7 inline-flex h-[54px] min-w-[174px] touch-manipulation items-center justify-center rounded-[10px] bg-[#ff4c00] px-7 text-[18px] font-bold text-white shadow-[0_6px_0_#000] outline-none transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5a1f] hover:shadow-[0_6px_0_#000] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
            >
              Get Started →
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

          <div className={`${styles.desktopFireflyImage} absolute h-[700px] xl:h-[720px] ${desktopHeroBottomClass} ${desktopHeroImagePositionClass}`}>
            <Image
              src={heroImageSrc}
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
        <div className="pointer-events-none absolute left-[12px] top-[-104px] z-50 aspect-[394/296] w-[292px] origin-center select-none">
          <PlaneTrailScene position="bottomLeft" />
        </div>
        <p className="font-['Satoshi',sans-serif] text-[20px] font-medium leading-[1.4] text-[#9d9d9d]">
          {data.universityHeading}
        </p>

        <div className="mt-7 grid grid-cols-5 items-center gap-x-10 gap-y-6 text-[#a7a7a7]">
          {trustedUniversities.map((university) => (
            <div
              key={university.name}
              className="flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap opacity-90"
              style={{ color: university.color }}
            >
              <Image
                src={getUniversityLogo(university.domain)}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain opacity-90"
                unoptimized
              />
              <span className="flex flex-col items-start font-serif">
                {university.wordmark.map((line, lineIndex) => (
                  <span
                    key={line}
                    className={getUniversityLineClass(
                      university.name,
                      lineIndex
                    )}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
