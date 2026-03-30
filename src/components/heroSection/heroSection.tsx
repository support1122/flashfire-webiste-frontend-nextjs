import { HeroSectionData } from "@/src/types/heroSectionData";
import HeroSectionClient from "./heroSectionClient";

type HeroSectionProps = {
  data: HeroSectionData;
};

export default function HeroSection({ data }: HeroSectionProps) {
  return <HeroSectionClient data={data} />;
}
