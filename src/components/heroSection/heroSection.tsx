"use client";

import { usePathname } from "next/navigation";
import { heroSectionData, heroSectionDataAU, heroSectionDataCA, heroSectionDataEU, heroSectionDataUK } from "@/src/data/herosection";
import HeroSectionClient from "./heroSectionClient";
import { getEUCountryName, getLocale, type Locale } from "@/src/utils/locale";
import { europeanUniversities } from "@/src/data/europeUniversities";

type Props = {
  country?: Locale;
};

export default function HeroSection({ country }: Props) {
  const pathname = usePathname();
  // An explicit `country` prop wins; otherwise infer it from the route.
  const locale: Locale = country ?? getLocale(pathname);
  const data =
    locale === "uk"
      ? heroSectionDataUK
      : locale === "ca"
        ? heroSectionDataCA
        : locale === "au"
          ? heroSectionDataAU
          : locale === "eu"
            ? heroSectionDataEU
            : heroSectionData;
  // EU trees name their own country ("1200 France job applications").
  const euCountry = locale === "eu" ? getEUCountryName(pathname) : null;
  const heroData = euCountry
    ? {
        ...data,
        universities:
          europeanUniversities[pathname?.slice(4, 6).toUpperCase() ?? ""] ?? data.universities,
        description: [
          `A dedicated team of real people applies to 1,200 ${euCountry} jobs for you in 60 days, with your resume tailored to every role.`,
        ],
      }
    : data;
  const heroImageSrc = "/images/landingpageImg.png";

  return (
    <HeroSectionClient
      data={heroData}
      heroImageSrc={heroImageSrc}
      shiftHeroImageLeft={false}
    />
  );
}
