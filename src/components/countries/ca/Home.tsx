import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageCareerCTA from "@/src/components/homePageCareerCTA/homePageCareerCTA";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageMilestones from "@/src/components/homePageMilestones/homePageMilestones";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePagePTNote from "@/src/components/homePagePTNote/homePagePTNote";
import HomePageResultStats from "@/src/components/homePageResultStats/homePageResultStats";
import HomePageStatsCards from "@/src/components/homePageStatsCards/homePageStatsCards";
import HomePageSteps from "@/src/components/homePageSteps/homePageSteps";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";
import HomePageBeforeAfter from "../../homePageBeforeAfter/homePageBeforeAfter";
import HomeScrollToTop from "@/src/components/pages/home/HomeScrollToTop";
import { heroSectionDataCA } from "@/src/data/herosection";
import ContentVisibilitySection from "@/src/components/ContentVisibilitySection";
import LazySection from "@/src/components/LazySection";

export default function CanadaHome() {
  return (
    <>
      <HomeScrollToTop />
      <Navbar />
      <HeroSection data={heroSectionDataCA} />
      <ContentVisibilitySection intrinsicSize="680px">
        <HomePageCareerCTA />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="880px">
        <HomePageBeforeAfter />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="780px">
        <HomePageResultStats />
      </ContentVisibilitySection>
      <HomePageStatsCards />
      <ContentVisibilitySection intrinsicSize="980px">
        <HomePageOfferLetters />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="900px">
        <HomePageMilestones />
      </ContentVisibilitySection>
      <LazySection minHeight="400px" rootMargin="600px">
        <HomePageVideo />
      </LazySection>
      <ContentVisibilitySection intrinsicSize="760px">
        <HomePageSteps />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="880px">
        <HomePageWhyChooseFF />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="1800px">
        <HomePageHappyUsers />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="760px">
        <HomePageFoundersNote />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="740px">
        <HomePagePTNote />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="900px">
        <HomePageFAQ />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="680px">
        <HomePageDemoCTA />
      </ContentVisibilitySection>
      <Footer />
      <SalesPopUp />
    </>
  );
}
