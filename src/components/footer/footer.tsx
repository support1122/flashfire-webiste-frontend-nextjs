"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { smoothScrollToElement, smoothScrollTo } from "@/src/utils/smoothScroll";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";

  const getHref = (href: string) => {
    if (href.startsWith("http")) return href;
    return `${prefix}${href}`;
  };

  // Map route paths to their anchor IDs for PRODUCT links
  const productLinkAnchors: Record<string, string> = {
    "/features/resume-optimizer": "resume-optimizer",
    "/features/job-automation": "job-automation",
    "/features/linkedin-profile-optimization": "linkedin-profile-optimization",
    "/features/job-tracker": "job-tracker",
    "/features/cover-letter": "cover-letter",
    "/features/precision-targeting": "precision-targeting",
    "/features/dashboard-analytics": "dashboard-analytics",
    "/career-advisor": "career-advisor",
    "/interview-buddy": "interview-buddy",
  };

  // Handle PRODUCT link clicks with smooth scroll and hash removal
  const handleProductLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    anchorId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fullHref = getHref(href);
    
    // Store anchor ID in sessionStorage so template can use it without hash in URL
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pendingScrollAnchor', anchorId);
    }
    
    // Add fade-out effect to current page (very quick)
    const pageContainer = document.querySelector('[class*="min-h-screen"]') || 
                         document.querySelector('main') || 
                         document.body;
    if (pageContainer) {
      pageContainer.classList.add('page-transition-out');
    }
    
    // Navigate immediately without scrolling current page
    // The new page will handle scrolling smoothly
    setTimeout(() => {
      try {
        router.push(fullHref);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to window.location if router.push fails
        window.location.href = fullHref;
      }
    }, 200); // Short delay just for fade-out effect
  };

  // Get href with hash for PRODUCT links (for hover tooltip)
  const getProductLinkHref = (href: string): string => {
    const anchorId = productLinkAnchors[href];
    if (anchorId) {
      return `${getHref(href)}#${anchorId}`;
    }
    return getHref(href);
  };

  const handleFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isHome =
      pathname === "/" || pathname === "/en-ca" || pathname === `${prefix}/`;

    if (isHome) {
      setTimeout(() => {
        smoothScrollToElement("faq", {
          duration: 800,
          easing: "easeInOutCubic",
        });
      }, 100);
    } else {
      router.push(getHref("/"));
      setTimeout(() => {
        const tryScroll = (count = 0) => {
          if (document.getElementById("faq")) {
            smoothScrollToElement("faq", {
              duration: 800,
              easing: "easeInOutCubic",
            });
          } else if (count < 10) {
            setTimeout(() => tryScroll(count + 1), 200);
          }
        };
        tryScroll();
      }, 300);
    }
  };

  const linkClass =
    "text-white text-[0.9rem] underline underline-offset-4 hover:opacity-80 transition max-[480px]:text-[0.85rem]";

  return (
    <footer className="bg-[#f55d1d] text-white px-8 pt-12 pb-6 max-[768px]:px-6 max-[480px]:px-4">

      {/* TOP SECTION: LOGO + LINKS (SAME ROW) */}
      <div className="flex flex-col max-[768px]:flex-col justify-between border-b border-white pb-8 mb-6 max-[768px]:pb-6 max-[768px]:mb-4">

        {/* LOGO BLOCK */}
        <div className="flex items-center gap-3 mb-8 max-[768px]:mb-6 max-[768px]:justify-center max-[480px]:mb-4">
        <img
          src="/images/flashfire-logo-white.png"
          alt="Flashfire Logo"
            className="w-10 h-10 object-contain max-[480px]:w-8 max-[480px]:h-8"
        />
          <span className="text-lg font-bold tracking-wide max-[480px]:text-base">
            FLASHFIRE
          </span>
      </div>

          {/* LINKS GRID */}
          <div
            className="
            grid grid-cols-4 gap-8 max-[1024px]:gap-6
              max-[1024px]:grid-cols-2
              max-[768px]:grid-cols-2 max-[768px]:gap-6 max-[768px]:gap-y-8
              max-[480px]:grid-cols-1 max-[480px]:gap-6
            "
          >
            {/* QUICK ACCESS */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                QUICK ACCESS
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/job-search")} className={linkClass}>Job Search</Link>
                <Link href={getHref("/features")} className={linkClass}>Features</Link>
                <Link href={getHref("/testimonials")} className={linkClass}>Testimonials</Link>
                <Link href={getHref("/pricing")} className={linkClass}>Pricing</Link>
                <Link href={getHref("/faq")} className={linkClass} onClick={handleFAQClick}>FAQ</Link>
                <Link href={getHref("/blog")} className={linkClass}>Blog</Link>
                <Link href={getHref("/about-us")} className={linkClass}>About Us</Link>
                <Link href={getHref("/contact-us")} className={linkClass}>Contact Us</Link>
              </div>
            </div>

            {/* PRODUCT */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                PRODUCT
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link 
                  href={getProductLinkHref("/features/resume-optimizer")}
                  onClick={(e) => handleProductLinkClick(e, "/features/resume-optimizer", "resume-optimizer")}
                  className={linkClass}
                >
                  Resume Optimizer
                </Link>
                <Link 
                  href={getProductLinkHref("/features/job-automation")}
                  onClick={(e) => handleProductLinkClick(e, "/features/job-automation", "job-automation")}
                  className={linkClass}
                >
                  Job Automation
                </Link>
                <Link
                  href={getProductLinkHref("/features/linkedin-profile-optimization")}
                  onClick={(e) => handleProductLinkClick(e, "/features/linkedin-profile-optimization", "linkedin-profile-optimization")}
                  className={linkClass}
                >
                  LinkedIn Optimization
                </Link>
                <Link 
                  href={getProductLinkHref("/features/job-tracker")}
                  onClick={(e) => handleProductLinkClick(e, "/features/job-tracker", "job-tracker")}
                  className={linkClass}
                >
                  Job Tracker
                </Link>
                <Link 
                  href={getProductLinkHref("/features/cover-letter")}
                  onClick={(e) => handleProductLinkClick(e, "/features/cover-letter", "cover-letter")}
                  className={linkClass}
                >
                  Cover Letter Builder
                </Link>
                <Link 
                  href={getProductLinkHref("/features/precision-targeting")}
                  onClick={(e) => handleProductLinkClick(e, "/features/precision-targeting", "precision-targeting")}
                  className={linkClass}
                >
                Precision Targeting
                </Link>
                <Link 
                  href={getProductLinkHref("/features/dashboard-analytics")}
                  onClick={(e) => handleProductLinkClick(e, "/features/dashboard-analytics", "dashboard-analytics")}
                  className={linkClass}
                >
                Dashboard & Analytics
                </Link>

                <Link 
                  href={getHref("/career-advisor")}
                  onClick={(e) => handleProductLinkClick(e, "/career-advisor", "career-advisor")}
                  className={linkClass}
                >
                Career Advisor
                </Link>
                <Link 
                  href={getHref("/interview-buddy")}
                  onClick={(e) => handleProductLinkClick(e, "/interview-buddy", "interview-buddy")}
                  className={linkClass}
                >
                Interview Buddy
                </Link>
              </div>
            </div>

            {/* COMPANY */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                COMPANY
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/refund-policy")} className={linkClass} target="_blank">
                  Refund Policy
                </Link>
                <Link href={getHref("/privacy-policy")} className={linkClass} target="_blank">
                  Privacy Policy
                </Link>
                <Link href={getHref("/payment-policy")} className={linkClass} target="_blank">
                  Payment Policy
                </Link>
                <Link href={getHref("/terms-of-service")} className={linkClass} target="_blank">
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* FOLLOW US */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3 max-[480px]:gap-4">
                <Link
                  href="https://www.linkedin.com/company/flashfire-pvt-ltd/"
                  target="_blank"
                  className="text-xl hover:scale-110 transition max-[480px]:text-lg"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href="https://www.instagram.com/flashfirejobs/"
                  target="_blank"
                  className="text-xl hover:scale-110 transition max-[480px]:text-lg"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://www.youtube.com/@flashfireindia"
                  target="_blank"
                  className="text-xl hover:scale-110 transition max-[480px]:text-lg"
                >
                  <FaYoutube />
                </Link>
              </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex justify-between text-sm opacity-90 max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:items-center max-[480px]:text-xs max-[480px]:text-center">
        <p className="max-[480px]:mb-1">© Flashfire 2025. All Rights Reserved.</p>
        <p>Flashfire Pvt. Ltd.</p>
      </div>

    </footer>
  );
}
