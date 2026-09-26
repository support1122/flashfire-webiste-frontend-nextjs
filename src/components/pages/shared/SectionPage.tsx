"use client";

import { usePathname } from "next/navigation";
import HomePage from "../home/Home";
import CanadaHome from "../../countries/ca/Home";
import UKHome from "../../countries/uk/Home";
import AustraliaHome from "../../countries/au/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";
import { getLocale } from "@/src/utils/locale";

interface SectionPageProps {
  sectionId: string;
}

export default function SectionPage({ sectionId }: SectionPageProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const HomeComponent =
    locale === "uk"
      ? UKHome
      : locale === "ca"
        ? CanadaHome
        : locale === "au"
          ? AustraliaHome
          : HomePage;

  return (
    <>
      <HomeComponent />
      <ScrollToSection targetId={sectionId} />
    </>
  );
}

