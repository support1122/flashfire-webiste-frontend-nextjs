"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
import HomePageJobMatchingSection from "@/src/components/homePageJobMatchingSection/homePageJobMatchingSection";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import Navbar from "@/src/components/navbar/navbar";
import HomePageBeforeAfter from "../../homePageBeforeAfter/homePageBeforeAfter";
import { UK_PREFIX } from "@/src/utils/locale";

export default function UKHome() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when navigating to the UK home page
    const isUKHomePage = pathname === UK_PREFIX;

    if (isUKHomePage) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        // Also scroll after a short delay to catch any late scrolls from browser restoration
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);

        // One more check after layout
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HomePageVideo />
      <HomePageResultStats />
      <HomePageStatsCards />
      <HomePageMilestones />
      <HomePageSteps />
      <HomePageOfferLetters
        heading="60+ Offer letters received"
        enableLoopControls
        buttonOnlyScroll
      />
      <HomePageJobMatchingSection />
      <HomePageBeforeAfter />
      <HomePageWhyChooseFF />
      <HomePageHappyUsers />
      <HomePagePTNote />
      <HomePageFAQ />
      <HomePageDemoCTA />
      <HomePageFoundersNote variant="pricing" />
      <HomePageCareerCTA />
      <Footer />
    </>
  );
}
