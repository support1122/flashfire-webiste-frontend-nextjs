import dynamic from "next/dynamic";
import LazySection from "@/src/components/LazySection";

// SSR-enabled dynamic imports: full HTML is server-rendered for instant visibility.
// JS chunks are code-split and hydrate progressively — no blank gaps on fast scroll.
// Only the video section uses LazySection since it loads a heavy 18MB video asset.
const HomePageSteps = dynamic(() => import("@/src/components/homePageSteps/homePageSteps"));
const HomePageJobMatchingSection = dynamic(() => import("@/src/components/homePageJobMatchingSection/homePageJobMatchingSection"));
const HomePageCareerCTA = dynamic(() => import("@/src/components/homePageCareerCTA/homePageCareerCTA"));
const HomePageBeforeAfter = dynamic(() => import("../../homePageBeforeAfter/homePageBeforeAfter"));
const HomePageResultStats = dynamic(() => import("@/src/components/homePageResultStats/homePageResultStats"));
const HomePageOfferLetters = dynamic(() => import("@/src/components/homePageOfferLetters/homePageOfferLetters"));
const HomePageMilestones = dynamic(() => import("@/src/components/homePageMilestones/homePageMilestones"));
const HomePageVideo = dynamic(() => import("@/src/components/homePageVideo/homePageVideo"));
const HomePageWhyChooseFF = dynamic(() => import("@/src/components/homePageWhyChooseFF/homePageWhyChooseFF"));
const HomePageHappyUsers = dynamic(() => import("@/src/components/homePageHappyUsers/homePageHappyUsers"));
const HomePageFoundersNote = dynamic(() => import("@/src/components/homePageFoundersNote/homePageFoundersNote"));
const HomePagePTNote = dynamic(() => import("@/src/components/homePagePTNote/homePagePTNote"));
const HomePageFAQ = dynamic(() => import("@/src/components/homePageFAQ/homePageFAQ"));
const YouTubeVideo = dynamic(() => import("../../youtubeVideo/youtubeVideo"));
const HomePageDemoCTA = dynamic(() => import("@/src/components/homePageDemoCTA/homePageDemoCTA"));

export default function HomeBelowFold() {
  return (
    <>
      <HomePageSteps />
      <HomePageJobMatchingSection />
      <HomePageCareerCTA />
      <HomePageBeforeAfter />
      <HomePageResultStats />
      <HomePageOfferLetters />
      <HomePageMilestones />

      {/* Video is heavy (18MB) — lazy-load with generous preload margin */}
      <LazySection minHeight="400px" rootMargin="600px">
        <HomePageVideo />
      </LazySection>

      <HomePageWhyChooseFF />
      <HomePageHappyUsers />
      <HomePageFoundersNote />
      <HomePagePTNote />
      <HomePageFAQ />
      <YouTubeVideo />
      <HomePageDemoCTA />
    </>
  );
}
