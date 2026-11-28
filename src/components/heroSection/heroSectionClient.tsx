"use client";

import Image from "next/image";
import { useRef, type SyntheticEvent } from "react";
import { HeroSectionData } from "@/src/types/heroSectionData";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

type Props = {
  data: HeroSectionData;
  heroImageSrc?: string;
  shiftHeroImageLeft?: boolean;
};

const getUniversityLogo = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const getUniversityInitials = (name: string) => {
  const words = name
    .split(/\s+/)
    .filter((word) => !["university", "of", "the", "and", "in", "at"].includes(word.toLowerCase()));
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase() || name.slice(0, 2).toUpperCase();
};

const universityBranding: Record<string, { lines: string[]; color: string }> = {
  "Harvard University": { lines: ["HARVARD", "UNIVERSITY"], color: "#a7a7a7" },
  "Stanford University": { lines: ["Stanford", "University"], color: "#8c1515" },
  "University of Michigan": { lines: ["UNIVERSITY OF", "MICHIGAN"], color: "#00274c" },
  "UC Berkeley": { lines: ["Berkeley", "UNIVERSITY OF CALIFORNIA"], color: "#003262" },
  "Carnegie Mellon University": { lines: ["Carnegie", "Mellon", "University"], color: "#a6192e" },
};

const getUniversityBranding = (name: string, index: number) => {
  const knownBrand = universityBranding[name];
  if (knownBrand) return knownBrand;

  const words = name.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const brandColors = ["#a7a7a7", "#8c1515", "#00274c", "#003262", "#a6192e"];
  return {
    lines: [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")].filter(Boolean),
    color: brandColors[index % brandColors.length],
  };
};

export default function HeroSectionClient({
  data,
}: Props) {
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

    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fffefd] font-['Satoshi',sans-serif] text-[#0b0b0b]">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 pb-12 pt-16 text-center md:pb-16 md:pt-24">
        <div className="inline-flex h-[30px] items-center justify-center rounded-full border border-[#f3eeea] bg-white px-4 text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-[#ff5a1f]">
          {data.badges[0]}
        </div>

        <h1 className="mt-6 font-bold leading-[1.02] tracking-[-0.05em] text-[#0b0b0b] text-[2.5rem] min-[480px]:text-[3.2rem] md:text-[4.75rem] xl:text-[5.75rem]">
          <span className="block">We apply to jobs.</span>
          <span className="block">
            You get the <span className="text-[#ff5a1f]">interviews.</span>
          </span>
        </h1>

        <p className="mt-6 max-w-[680px] text-[15px] font-medium leading-[1.6] text-[#4a4a4a] md:text-[20px]">
          {data.description[0]} You track it all and focus on interviewing.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <button
            type="button"
            {...getButtonProps()}
            onPointerUp={handleGetStartedClick}
            onClick={handleGetStartedClick}
            className="inline-flex h-[56px] min-w-[200px] touch-manipulation items-center justify-center gap-2.5 rounded-full bg-[#f05a20] px-9 text-[17px] font-medium text-white outline-none transition duration-200 hover:bg-[#dd4e16] focus-visible:ring-2 focus-visible:ring-[#ff5a1f] focus-visible:ring-offset-2"
          >
            Book a free call <span aria-hidden>→</span>
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0b0b0b] hover:text-[#ff5a1f]"
          >
            How it works <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1350px] px-5 pb-12 pt-8 text-center md:px-8 md:pb-16 md:pt-10">
        <p className="text-[14px] font-medium leading-[1.4] text-[#9d9d9d] md:text-[18px]">
          {data.universityHeading}
        </p>
        <div className="mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:grid-cols-5">
          {data.universities.slice(0, 5).map((university, index) => {
            const branding = getUniversityBranding(university.name, index);
            return (
            <div
              key={university.name}
              className="flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap opacity-90 last:col-span-2 md:last:col-span-1"
              style={{ color: branding.color }}
            >
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                <Image
                  src={getUniversityLogo(university.domain)}
                  alt=""
                  width={32}
                  height={32}
                  className="relative z-[1] h-7 w-7 object-contain opacity-90"
                  unoptimized
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallback !== "true") {
                      event.currentTarget.dataset.fallback = "true";
                      event.currentTarget.src = `https://icons.duckduckgo.com/ip3/${university.domain}.ico`;
                      return;
                    }
                    event.currentTarget.style.display = "none";
                    const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 hidden items-center justify-center rounded-full bg-[#f7eee9] font-sans text-[9px] font-bold uppercase text-[#545b65]"
                >
                  {getUniversityInitials(university.name)}
                </span>
              </span>
              <span className="flex flex-col items-start font-serif text-[15px] font-bold leading-[0.95] tracking-[-0.025em] md:text-[18px]">
                {branding.lines.map((line, lineIndex) => (
                  <span
                    key={`${line}-${lineIndex}`}
                    className={line.length > 20 ? "text-[7px] font-bold leading-none tracking-[0.02em] md:text-[8px]" : ""}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
