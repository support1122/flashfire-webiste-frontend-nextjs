"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { smoothScrollToElement } from "@/src/utils/smoothScroll";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";

  const getHref = (href: string) => {
    if (href.startsWith("http")) return href;
    return `${prefix}${href}`;
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
    "text-white text-[0.9rem] underline underline-offset-4 hover:opacity-80 transition";

  return (
    <footer className="bg-[#f55d1d] text-white px-8 pt-12 pb-6 max-[768px]:px-6 max-[480px]:px-4">

      {/* TOP SECTION: LOGO + LINKS (SAME ROW) */}
      <div className="flex justify-between border-b border-white pb-8 mb-6">

        {/* LOGO BLOCK */}
        <div className="flex items-center -mt-36 gap-3 w-[260px] shrink-0">
          <img
            src="/images/flashfire-logo-white.png"
            alt="Flashfire Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-bold tracking-wide">
            FLASHFIRE
          </span>
        </div>

        {/* LINKS GRID */}
        <div
          className="
            grid grid-cols-4 gap-12
            max-[1024px]:grid-cols-2
            max-[768px]:grid-cols-1
            max-[768px]:mt-8
          "
        >
          {/* QUICK ACCESS */}
          <div>
            <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4]">
              QUICK ACCESS
            </h4>
            <div className="flex flex-col gap-1.5">
              <Link href={getHref("/features")} className={linkClass}>Features</Link>
              <Link href={getHref("/testimonials")} className={linkClass}>Testimonials</Link>
              <Link href={getHref("/pricing")} className={linkClass}>Pricing</Link>
              <Link href={getHref("/faq")} className={linkClass} onClick={handleFAQClick}>FAQ</Link>
              <Link href={getHref("/blog")} className={linkClass}>Blog</Link>
              <Link href={getHref("/about-us")} className={linkClass}>About Us</Link>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4]">
              PRODUCT
            </h4>
            <div className="flex flex-col gap-1.5">
              <Link href={getHref("/features/resume-optimizer")} className={linkClass}>
                Resume Optimizer
              </Link>
              <Link href={getHref("/features/job-automation")} className={linkClass}>
                Job Automation
              </Link>
              <Link
                href={getHref("/features/linkedin-profile-optimization")}
                className={linkClass}
              >
                LinkedIn Optimization
              </Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4]">
              COMPANY
            </h4>
            <div className="flex flex-col gap-1.5">
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
          <div>
            <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4]">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/flashfire-pvt-ltd/"
                target="_blank"
                className="text-xl hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                href="https://www.instagram.com/flashfirejobs/"
                target="_blank"
                className="text-xl hover:scale-110 transition"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://www.youtube.com/@flashfireindia"
                target="_blank"
                className="text-xl hover:scale-110 transition"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex justify-between text-sm opacity-90 max-[768px]:flex-col gap-2">
        <p>© Flashfire 2025. All Rights Reserved.</p>
        <p>Flashfire Pvt. Ltd.</p>
      </div>

    </footer>
  );
}
