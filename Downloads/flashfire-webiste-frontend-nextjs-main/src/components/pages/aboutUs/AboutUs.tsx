"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function AboutUs() {
  const router = useRouter();
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  // Scroll to top when navigating to about-us page (same pattern as pricing page)
  useEffect(() => {
    // Only scroll to top on initial mount (when navigating TO about-us page from another page)
    // Re-clicks are handled by navbar which prevents navigation
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      
      // Scroll to top when navigating to about-us page
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
  }, []);

  return (
    <div className="bg-[#f9e8e0] min-h-screen font-['Space_Grotesk',sans-serif] relative overflow-hidden">
      {/* === HERO SECTION === */}

      {/* Orange top bar */}


      {/* Gradient background */}
      <div className="bg-[#f9e8e0] py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="border-2 border-black px-4 py-2 bg-[#f9e8e0]">
              <p className="text-[#F55D1D] font-bold text-sm uppercase">LAND INTERVIEW IN 1 WEEK</p>
            </div>
            <div className="border-2 border-black px-4 py-2 bg-[#f9e8e0]">
              <p className="text-[#F55D1D] font-bold text-sm uppercase">50 USERS LANDED JOB</p>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 text-[#F55D1D] leading-tight px-2">
            FLASHFIRE WAS BUILT TO FIX<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>A BROKEN HIRING SYSTEM
          </h1>

          {/* Supporting Text with Mascot */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 px-2">
            <div className="text-center md:text-left">
              <p className="text-base sm:text-lg text-gray-900 mb-2">
                Hiring today rewards <span className="text-[#F55D1D] font-bold">speed, volume, and precision.</span>
              </p>
              <p className="text-base sm:text-lg text-gray-900">
                Yet candidates are still expected to do everything manually.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/flashfire-logo.png"
                alt="Flashfire Mascot"
                width={80}
                height={80}
                className="object-contain w-16 h-16 sm:w-20 sm:h-20"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center px-2">
            <button
              {...getButtonProps()}
              className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg w-full sm:w-auto max-w-xs sm:max-w-none"
              style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
              onClick={() => {
                const utmSource = typeof window !== "undefined"
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined"
                  ? localStorage.getItem("utm_medium") || "About_Us_Page"
                  : "About_Us_Page";

                try {
                  GTagUTM({
                    eventName: "sign_up_click",
                    label: "About_Us_Get_Me_Interview_Button",
                    utmParams: {
                      utm_source: utmSource,
                      utm_medium: utmMedium,
                      utm_campaign: typeof window !== "undefined"
                        ? localStorage.getItem("utm_campaign") || "Website"
                        : "Website",
                    },
                  });
                } catch (gtagError) {
                  console.warn('GTagUTM error:', gtagError);
                }

                try {
                  trackButtonClick("Get Me Interview", "about_us_cta", "cta", {
                    button_location: "about_us_hero_section",
                    section: "about_us_hero"
                  });
                  trackSignupIntent("about_us_cta", {
                    signup_source: "about_us_hero_button",
                    funnel_stage: "signup_intent"
                  });
                } catch (trackError) {
                  console.warn('Tracking error:', trackError);
                }

                // Check current path first
                const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
                const normalizedPath = currentPath.split('?')[0]; // Remove query params
                const isAboutUsPage = normalizedPath === '/about-us' || normalizedPath === '/en-ca/about-us';
                const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
                  normalizedPath === '/en-ca/get-me-interview';

                // If already on the route, save scroll position and prevent navigation
                if (isAlreadyOnGetMeInterview) {
                  // Save current scroll position before modal opens
                  const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

                  // Dispatch custom event to force show modal
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('showCalendlyModal'));
                  }

                  // Restore scroll position immediately after modal opens
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      setTimeout(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      }, 50);
                    });
                  });

                  // Just trigger the modal, don't navigate or scroll
                  return;
                }

                // If on about-us page, change URL but keep page content visible
                if (isAboutUsPage) {
                  // Save the previous page path to sessionStorage
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('previousPageBeforeGetMeInterview', normalizedPath);
                  }

                  // Save current scroll position before modal opens
                  const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                  }

                  // Change URL to /get-me-interview using pushState
                  const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', targetPath);
                  }

                  // Dispatch custom event to force show modal FIRST
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('showCalendlyModal'));
                  }

                  // Use router.replace to update Next.js state
                  router.replace(targetPath);

                  // Restore scroll position immediately after modal opens
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      setTimeout(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                      }, 50);
                    });
                  });

                  return;
                }

                // Dispatch custom event to force show modal FIRST
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('showCalendlyModal'));
                }

                // Save current scroll position before navigation to preserve it
                if (typeof window !== 'undefined') {
                  const currentScrollY = window.scrollY;
                  sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                }

                // Only navigate if NOT already on the page
                const targetPath = '/get-me-interview';
                router.push(targetPath);
              }}
            >
              Get Me Interview
            </button>
          </div>
        </div>
      </div>


      {/* === OUR FOUNDERS SECTION === */}
      <section className="bg-[#F55D1D] py-8 sm:py-10 mb-8 sm:mb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-xl sm:rounded-2xl max-w-5xl mx-auto my-4 sm:my-8 border-2 sm:border-4 border-[#F55D1D] z-10">
        {/* Wavy dotted lines background - diagonal */}
        <div className="absolute inset-0 opacity-20 rounded-2xl">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* First diagonal wavy dotted line */}
            <path
              d="M 0 30 Q 150 100, 300 170 Q 450 240, 600 310 T 900 450 T 1200 590 T 1500 730"
              stroke="#ffaa8e"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            {/* Second diagonal wavy dotted line */}
            <path
              d="M 0 350 Q 200 420, 400 490 Q 600 560, 800 630 T 1200 770 T 1600 910 T 2000 1050"
              stroke="#ffaa8e"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            {/* Third diagonal wavy dotted line */}
            <path
              d="M 0 670 Q 250 740, 500 810 Q 750 880, 1000 950 T 1500 1110 T 2000 1270 T 2500 1430"
              stroke="#ffaa8e"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-white px-2" style={{ textShadow: '3px 3px 0px rgba(0, 0, 0, 1), 1.5px 1.5px 0px rgba(0, 0, 0, 1)' }}>
            OUR FOUNDERS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            {/* Pranjal Tripathi Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border-4 sm:border-6 border-[#F55D1D] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 h-full flex flex-col mb-6 sm:mb-8" style={{ boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.3), 0 0 40px 10px rgba(0, 0, 0, 0.15)' }}>
              <div className="mb-4 overflow-hidden rounded-lg border-2 border-[#F55D1D] h-48 sm:h-60 md:h-72 flex-shrink-0 bg-[#f9e8e0] p-1">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/pranjal_cto.png"
                  alt="Pranjal Tripathi"
                  width={200}
                  height={288}
                  className="w-full h-full object-cover grayscale"
                  priority
                  unoptimized
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#F55D1D] mb-1 text-center">Pranjal Tripathi</h3>
                <p className="text-gray-600 mb-3 text-xs sm:text-sm text-center">CTO, Flashfire</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 italic leading-relaxed text-center">
                  &quot;Every line of code we write is to help someone hear back - finally.&quot;
                </p>
              </div>
            </div>

            {/* Adit Jain Card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border-4 sm:border-6 border-[#F55D1D] transform rotate-[2deg] hover:rotate-0 transition-transform duration-300 h-full flex flex-col mt-6 sm:mt-8 mb-6 sm:mb-8" style={{ boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.3), 0 0 40px 10px rgba(0, 0, 0, 0.15)' }}>
              <div className="mb-4 overflow-hidden rounded-lg border-2 border-[#F55D1D] h-48 sm:h-60 md:h-72 flex-shrink-0 bg-[#f9e8e0] p-1">
                <Image
                  src="/images/adit-jain-2.png"
                  alt="Adit Jain"
                  width={200}
                  height={288}
                  className="w-full h-full object-cover "
                  priority
                  unoptimized
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-[#F55D1D] mb-1 text-center">Adit Jain</h3>
                <p className="text-gray-600 mb-3 text-xs sm:text-sm text-center">Partner, Flashfire</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 italic leading-relaxed text-center">
                  &quot;I&apos;ve seen brilliant people lose hope. Flashfire exists so they don&apos;t have to.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === THE STORY SECTION === */}
      <section className="bg-[#f9e8e0] border-t-2 border-b-2 border-black relative overflow-hidden z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-0 items-stretch relative z-10">
          {/* Left Side - Text */}
          <div className="text-gray-900 border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-black pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 py-6 sm:py-8 flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#F55D1D]" style={{ textShadow: '3px 3px 0px rgba(0, 0, 0, 1), 1.5px 1.5px 0px rgba(0, 0, 0, 1)' }}>THE STORY</h2>
            <p className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              To Every Job Seeker Who&apos;s Ready to Move Forward,
            </p>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base font-semibold leading-relaxed">
              <p>
                I know how exhausting the job search can be. You keep sending out applications, waiting for replies, and start to wonder if it&apos;s you. Especially in the U.S., where hundreds apply for the same role, even the most talented people begin to lose hope.
              </p>
              <p>
                Flashfire was born from that same feeling. I watched my sister—smart, capable, and hardworking—apply to hundreds of roles and still get no response. It wasn&apos;t her fault. The system had stopped seeing people for who they are.
              </p>
              <blockquote className="font-medium italic text-gray-900 border-l-4 border-[#F55D1D] pl-4 my-6 leading-relaxed">
                The problem was never the people. It was the process.
              </blockquote>
              <p>
                That&apos;s when Pranjal joined. He&apos;d been through the same struggle—brilliant, qualified, but invisible to the system. We realized the failures weren&apos;t about talent or effort. They were about a process that had stopped working for people.
              </p>
              <p>
                Together, we started building Flashfire with belief, empathy, and persistence. What began as a way to help one person is now helping hundreds find their &apos;yes.&apos;
              </p>
            </div>
          </div>

          {/* Right Side - Character Image */}
          <div className="bg-[#F55D1D] flex items-center justify-center h-64 sm:h-80 lg:h-full min-h-full">
            <div className="flex items-center justify-center w-full h-full p-4">
              <Image
                src="/images/character.png"
                alt="Flashfire Character"
                width={300}
                height={300}
                className="object-contain max-w-full max-h-full w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* === OUR MISSION & VISION SECTION === */}
      <section className="bg-[#f9e8e0] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-white rounded-xl border-2 border-black overflow-hidden mt-4 ml-4" style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Mission Section */}
              <div className="p-6 sm:p-8 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F55D1D] mb-3 sm:mb-4 uppercase" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 1)' }}>OUR MISSION</h3>
                <p className="text-black leading-relaxed text-base sm:text-lg">
                  To help job seekers land more interviews by automating applications and optimizing visibility using AI.
                </p>
              </div>

              {/* Vision Section */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F55D1D] mb-3 sm:mb-4 uppercase" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 1)' }}>OUR VISION</h3>
                <p className="text-black leading-relaxed text-base sm:text-lg">
                  To become the world&apos;s fastest and most intelligent job application engine, enabling anyone to apply to over 1,200 targeted roles and land interviews ten times faster all without wasting time or effort.                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === HOW FLASHFIRE WORKS FOR YOU SECTION === */}
      <section className="bg-[#f9e8e0] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 text-[#F55D1D] px-2">
            How Flashfire Works for You
          </h2>
          <p className="text-center text-base sm:text-lg text-gray-700 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            We don&apos;t just apply, <span className="font-bold">we make you get noticed.</span> Flashfire combines <span className="text-[#F55D1D] font-bold">AI precision</span> with <span className="text-[#F55D1D] font-bold">human insight</span> to get you interviews that actually convert.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Feature items with lightning bolt icons */}
            {[
              "AI-Powered Matching",
              "LinkedIn Profile Optimization",
              "Lightning Fast Applications",
              "Dynamic Resume Optimization",
              "Precision Targeting",
              "Dashboard & Analytics"
            ].map((feature, index) => (
              <div key={index} className={`flex items-center gap-0 ${index % 2 === 0 ? 'md:ml-4' : ''}`}>
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    src="/images/flashfire-logo.png"
                    alt="Flashfire Logo"
                    width={50}
                    height={50}
                    className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
                </div>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === THE FLASHFIRE STORY TIMELINE SECTION === */}
      <section className="bg-[#f9e8e0] pt-8 pb-16 relative border-t-4 border-black overflow-hidden z-10">
        <div className="w-full relative z-10">
          {/* Title and Text Content with Logo */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 px-4 sm:px-8 md:px-16 lg:px-24">
            {/* Text Content */}
            <div className="flex-1">
              {/* Title */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F55D1D] uppercase" style={{ textShadow: '3px 3px 0px rgba(0, 0, 0, 1), 1.5px 1.5px 0px rgba(0, 0, 0, 1)' }}>
                  THE FLASHFIRE STORY
                </h2>
              </div>

              {/* Introductory Paragraph */}
              <div>
                <p className="text-sm sm:text-base text-black mb-12 leading-relaxed">
                  Flashfire began in April 2024 with a simple insight: most candidates lose opportunities before they&apos;re even seen. Built to match the speed and precision of modern hiring, Flashfire helps candidates apply at scale across U.S. and Canadian job markets with ATS-optimized applications.
                </p>
              </div>
            </div>

            {/* Logo positioned on the right */}
            <div className="flex-shrink-0 -mt-8 sm:-mt-12 md:-mt-16">
              <Image
                src="/images/flashfire-logo.png"
                alt="Flashfire Logo"
                width={400}
                height={400}
                className="object-contain w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
                style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3))' }}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Timeline - Zigzag Layout */}
          <div className="space-y-0 w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24">
            {/* Entry 1: April 2024 - Orange Left, White Right */}
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] border-2 border-black">
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">April 2024</div>
                  <div className="text-sm sm:text-base">(Founded)</div>
                </div>
                <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[48px] border-l-[#F55D1D] z-10"></div>
              </div>
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  Flashfire was officially founded with a mission to simplify the job application process and remove inefficiencies from large-scale job searching.
                </p>
              </div>
            </div>

            {/* Entry 2: May-June 2024 - White Left, Orange Right */}
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] border-2 border-t-0 border-black">
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black order-2 md:order-1">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  Core workflows were built to automate job discovery, resume alignment, and application submission while maintaining human oversight for relevance and accuracy.
                </p>
              </div>
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative order-1 md:order-2">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">May-June 2024</div>
                  <div className="text-sm sm:text-base">(Platform Development)</div>
                </div>
                <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[48px] border-r-[#F55D1D] z-10"></div>
              </div>
            </div>

            {/* Entry 3: July-Aug 2024 - Orange Left, White Right */}
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] border-2 border-t-0 border-black">
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">July-Aug 2024</div>
                  <div className="text-sm sm:text-base">(Early Validation)</div>
                </div>
                <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[48px] border-l-[#F55D1D] z-10"></div>
              </div>
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  Flashfire onboarded early users and validated its system by helping candidates apply to 400-1,200+ relevant job opportunities, significantly reducing manual effort and application fatigue.
                </p>
              </div>
            </div>

            {/* Entry 4: Sept-Dec 2024 - White Left, Orange Right */}
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] border-2 border-t-0 border-black">
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black order-2 md:order-1">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  By the end of 2024, Flashfire had helped over 500+ candidates streamline their job search, refine their application strategy, and apply to roles more efficiently.
                </p>
              </div>
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative order-1 md:order-2">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Sept-Dec 2024</div>
                  <div className="text-sm sm:text-base">(Helping 500+ Candidates)</div>
                </div>
                <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[48px] border-r-[#F55D1D] z-10"></div>
              </div>
            </div>

            {/* Entry 5: Jan-Feb 2025 - Orange Left, White Right */}
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] border-2 border-t-0 border-black">
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Jan-Feb 2025</div>
                  <div className="text-sm sm:text-base">(USA & Canada Expansion)</div>
                </div>
                <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[48px] border-l-[#F55D1D] z-10"></div>
              </div>
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  Flashfire expanded its services across the United States and Canada, operating with timezone-agnostic execution aligned with North American hiring cycles and ATS systems.
                </p>
              </div>
            </div>

            {/* Entry 6: Mar 2025-Present - White Left, Orange Right */}
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] border-2 border-t-0 border-black">
              <div className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-black order-2 md:order-1">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                  Today, Flashfire continues to support candidates globally, with a strong focus on US and Canadian job applications, optimizing continuously for interview outcomes rather than vanity application counts.
                </p>
              </div>
              <div className="bg-[#F55D1D] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center relative order-1 md:order-2">
                <div className="text-white text-center">
                  <div className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Mar 2025-Present</div>
                  <div className="text-sm sm:text-base">(Scaling with focus)</div>
                </div>
                <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 rotate-[25deg] w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[48px] border-r-[#F55D1D] z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === DEMO CTA SECTION === */}
      <HomePageDemoCTA />
    </div>
  );
}

