"use client";

import { usePathname } from "next/navigation";
import { heroSectionData, heroSectionDataAU, heroSectionDataCA, heroSectionDataUK } from "@/src/data/herosection";
import HeroSectionClient from "./heroSectionClient";
import { getLocale, type Locale } from "@/src/utils/locale";

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
          : heroSectionData;
  const heroImageSrc = "/images/landingpageImg.png";

  return (
    <HeroSectionClient
      data={data}
      heroImageSrc={heroImageSrc}
      shiftHeroImageLeft={false}
    />
  );
}
