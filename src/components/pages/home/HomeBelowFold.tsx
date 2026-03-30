import dynamic from "next/dynamic";
import LazySection from "@/src/components/LazySection";
import ContentVisibilitySection from "@/src/components/ContentVisibilitySection";

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
      <ContentVisibilitySection intrinsicSize="760px">
        <HomePageSteps />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="900px">
        <HomePageJobMatchingSection />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="680px">
        <HomePageCareerCTA />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="880px">
        <HomePageBeforeAfter />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="780px">
        <HomePageResultStats />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="980px">
        <HomePageOfferLetters />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="900px">
        <HomePageMilestones />
      </ContentVisibilitySection>

      {/* Video is heavy (18MB) — lazy-load with generous preload margin */}
      <LazySection minHeight="400px" rootMargin="600px">
        <HomePageVideo />
      </LazySection>

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
      <ContentVisibilitySection intrinsicSize="720px">
        <YouTubeVideo />
      </ContentVisibilitySection>
      <ContentVisibilitySection intrinsicSize="680px">
        <HomePageDemoCTA />
      </ContentVisibilitySection>
    </>
  );
}
