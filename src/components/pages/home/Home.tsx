// Above-the-fold: load eagerly for instant display (server-rendered)
import Navbar from "@/src/components/navbar/navbar";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageStatsCards from "@/src/components/homePageStatsCards/homePageStatsCards";
import Footer from "@/src/components/footer/footer";
import HomeScrollToTop from "./HomeScrollToTop";
import HomeBelowFold from "./HomeBelowFold";
import { heroSectionData } from "@/src/data/herosection";

export default function Home() {
  return (
    <>
      <HomeScrollToTop />
      <Navbar />
      <HeroSection data={heroSectionData} />
      <HomePageStatsCards />
      <HomeBelowFold />
      <Footer />
    </>
  );
}
