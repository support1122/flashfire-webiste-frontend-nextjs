"use client";

import { usePathname } from "next/navigation";
import { heroSectionData, heroSectionDataCA } from "@/src/data/herosection";
import HeroSectionClient from "./heroSectionClient";

export default function HeroSection() {
  const pathname = usePathname();
  const isCanadaContext = pathname?.startsWith("/en-ca") || false;
  const data = isCanadaContext ? heroSectionDataCA : heroSectionData;
  
  return <HeroSectionClient data={data} />;
}
