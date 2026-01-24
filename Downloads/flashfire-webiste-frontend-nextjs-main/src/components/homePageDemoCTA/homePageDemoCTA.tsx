"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./homePageDemoCTA.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function HomePageDemoCTA() {
  const router = useRouter();
  const pathname = usePathname();
  const [emailCopied, setEmailCopied] = useState(false);
  const { isHolding, holdProgress, getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleCopyEmail = async () => {
    const email = "support@flashfirejobs.com";
    
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setEmailCopied(true);
        setTimeout(() => {
          setEmailCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy email:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <section className={styles.demoSectionOuter}>
      <div className={styles.demoSection}>
        <h5 className={styles.demoSubheading}>
          GOT FURTHER QUESTIONS? LET&rsquo;S TALK!
        </h5>

        <h2 
          className={styles.demoHeading}
        >
          BOOK A DEMO{" "}
          <span
            className={styles.fireIcon}
          >
            <Image
              src="/images/character.png"
              alt="Flashfire mascot"
              width={96}
              height={96}
              className="w-20 h-20 max-[600px]:w-16 max-[600px]:h-16"
            />
          </span>{" "}
          CALL
        </h2>

        <p className={styles.demoText}>
          We get it, <em>finding the right job isn&apos;t easy.</em> Book a quick
          chat with our founder and see how Flashfire can help you land
          interviews faster.
        </p>

        <button 
          {...getButtonProps()}
          className={styles.demoButton}
          onClick={(e) => {
            try {
              e.preventDefault();
              e.stopPropagation();
            } catch (err) {
              // Ignore cross-origin errors on event methods
            }
            try {
              const utmSource = typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";
              const utmMedium = typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_medium") || "Demo_CTA_Section"
                : "Demo_CTA_Section";
              
              try {
                GTagUTM({
                  eventName: "sign_up_click",
                  label: "Schedule_ACareer_Call_CTA_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website",
                  },
                });
              } catch (gtagError) {
                console.warn('GTagUTM error:', gtagError);
              }
              
              try {
                trackButtonClick("Schedule a Free Career Call", "demo_cta", "cta", {
                  button_location: "demo_cta_button",
                  section: "demo_cta",
                  target_url: "/schedule-a-free-career-call"
                });
                trackSignupIntent("demo_cta", {
                  signup_source: "demo_cta_button",
                  funnel_stage: "signup_intent",
                  target_url: "/schedule-a-free-career-call"
                });
              } catch (trackError) {
                console.warn('Tracking error:', trackError);
              }
            } catch (error) {
              console.warn('Error in button click handler:', error);
            }
            
            // Dispatch custom event to force show StrategyCallCard modal first
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('showCalendlyModal'));
            }
            
            // Check current path
            const currentPath = pathname;
            const isImageTestimonialsPage = currentPath === '/testimonials' || currentPath === '/en-ca/testimonials' || currentPath === '/image-testimonials' || currentPath === '/en-ca/image-testimonials';
            const isAboutUsPage = currentPath === '/about-us' || currentPath === '/en-ca/about-us';
            const isAlreadyOnScheduleACareerCall = currentPath === '/schedule-a-free-career-call' || currentPath === '/en-ca/schedule-a-free-career-call';
            const isOnHomePage = currentPath === '/' || currentPath === '/en-ca' || currentPath === '';
            
            console.log('Button clicked - currentPath:', currentPath, 'isOnHomePage:', isOnHomePage);
            
            // If on home page, just show modal without navigating
            if (isOnHomePage) {
              // Clear any old sessionStorage values to prevent showing wrong page
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('previousPageBeforeScheduleACareerCall');
                sessionStorage.removeItem('preserveScrollPosition');
              }
              // Just trigger the modal, don't navigate - stay on home page
              return;
            }
            
            // If on image-testimonials page, change URL but keep page content visible
            if (isImageTestimonialsPage) {
              // Change URL to /schedule-a-free-career-call without navigating (keep testimonials page visible)
              const targetPath = currentPath.startsWith('/en-ca') ? '/en-ca/schedule-a-free-career-call' : '/schedule-a-free-career-call';
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', targetPath);
              }
              // Just trigger the modal, don't navigate
              return;
            }
            
            // If on about-us page, change URL but keep page content visible
            if (isAboutUsPage) {
              // Save the previous page path to sessionStorage
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('previousPageBeforeScheduleACareerCall', currentPath);
              }
              
              // Save current scroll position before modal opens
              const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
              }
              
              // Change URL to /schedule-a-free-career-call using pushState only (don't use router to prevent scroll)
              const targetPath = currentPath.startsWith('/en-ca') ? '/en-ca/schedule-a-free-career-call' : '/schedule-a-free-career-call';
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', targetPath);
              }
              
              // Dispatch custom event to force show StrategyCallCard modal FIRST
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('showCalendlyModal'));
              }
              
              // Don't use router.replace - it causes scroll to top
              // Just change URL with pushState and show modal, page stays in place
              
              return;
            }
            
            // If already on schedule-a-free-career-call route, just show modal
            if (isAlreadyOnScheduleACareerCall) {
              console.log('Already on schedule-a-free-career-call route, showing modal only');
              // Just trigger the modal, don't navigate
              return;
            }
            
            // Navigate to /schedule-a-free-career-call for other pages
            const targetPath = '/schedule-a-free-career-call';
            
            // Save current scroll position to sessionStorage before navigation
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
            }
            
            router.push(targetPath);
          }}
        >
          Schedule a Free Career Call 
        </button>

        <p className={styles.demoNote}>
          Limited slots available. Book your call now!
        </p>

        <div className={styles.demoEmailContainer}>
          <span className={styles.demoEmailLabel}>Or email us at</span>
          <div className={styles.emailCopyWrapper}>
            <input
              type="text"
              readOnly
              value="support@flashfirejobs.com"
              className={styles.emailInput}
            />
            <button
              onClick={handleCopyEmail}
              className={styles.copyButton}
              aria-label="Copy email to clipboard"
            >
              {emailCopied ? (
                <Check className={styles.copyIcon} size={16} />
              ) : (
                <Copy className={styles.copyIcon} size={16} />
              )}
            </button>
            {emailCopied && (
              <div className={styles.copiedTooltip}>
                Copied
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
