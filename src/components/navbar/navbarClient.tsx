// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import styles from "./navbar.module.css";
// import type { NavLink, NavbarCTA } from "../../types/navbarData";
// import { trackButtonClick, trackModalOpen } from "@/src/utils/PostHogTracking";
// import { GTagUTM } from "@/src/utils/GTagUTM";
// import { useRouter } from "next/navigation";
// import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

// type Props = {
//   links: NavLink[];
//   ctas: NavbarCTA;
// };

// export default function NavbarClient({ links, ctas }: Props) {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const pathname = usePathname();
//   const isCanadaContext = pathname.startsWith("/en-ca");
//   const prefix = isCanadaContext ? "/en-ca" : "";
  
//   const isBookPage = pathname === "/schedule-a-free-career-call" || pathname === "/en-ca/schedule-a-free-career-call";
  
//   const isExternalHref = (href: string) => href.startsWith("http");
//   const primaryIsExternal = isExternalHref(ctas.primary.href);
//   const secondaryIsExternal = isExternalHref(ctas.secondary.href);
  
//   const getHref = (href: string) => {
//     if (isExternalHref(href) || href.startsWith("#")) {
//       return href;
//     }
//     return `${prefix}${href}`;
//   };

//   // Countdown timer - Set end date (November 28, 2025 11:59 PM)
//   useEffect(() => {
//     // Only run on client side
//     if (typeof window === "undefined") return;

//     // Set the target date: November 28, 2025 at 11:59:59 PM
//     const targetDate = new Date(2025, 10, 28, 23, 59, 59); // Month is 0-indexed, so 10 = November

//     const calculateTimeLeft = () => {
//       const now = new Date().getTime();
//       const endDate = targetDate.getTime();
//       const difference = endDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//         );
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60),
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setTimeLeft({ days, hours, minutes, seconds });
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       }
//     };

//     // Calculate immediately
//     calculateTimeLeft();

//     // Update every second
//     const interval = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const openCalendly = () => {
//     const utmSource = typeof window !== "undefined"
//       ? localStorage.getItem("utm_source") || "WEBSITE"
//       : "WEBSITE";
//     const utmMedium = typeof window !== "undefined"
//       ? localStorage.getItem("utm_medium") || "Navigation_Banner"
//       : "Navigation_Banner";
    
//     // GTag tracking
//     GTagUTM({
//       eventName: "calendly_modal_open",
//       label: "Book_Now_Banner_Button",
//       utmParams: {
//         utm_source: utmSource,
//         utm_medium: utmMedium,
//         utm_campaign: typeof window !== "undefined"
//           ? localStorage.getItem("utm_campaign") || "Website"
//           : "Website",
//       },
//     });
    
//     // PostHog tracking (automatically includes UTM via getUTMContext)
//     trackButtonClick("Book Now", "navigation_banner", "cta", {
//       button_location: "banner",
//       navigation_type: "banner_cta",
//     });
    
//     // Navigate to /book-now with preserved UTM params
//     const utmParams = getCurrentUTMParams();
//     const targetPath = utmParams ? `/book-now?${utmParams}` : '/book-now';
    
//     // Dispatch custom event to force show modal (even if already on the route)
//     if (typeof window !== 'undefined') {
//       window.dispatchEvent(new CustomEvent('showCalendlyModal'));
//     }
    
//     router.push(targetPath);
//   };

//   return (
//     <>
//       {/* Sticky Container for Navbar and Banner */}
//       <div className="sticky top-0 z-50">
//         <nav 
//           className={styles.navContainer}
//           style={{
//             backdropFilter: 'blur(120px)',
//             WebkitBackdropFilter: 'blur(120px)',
//           }}
//         >
//       <div className={styles.navInner}>
//         {/* Left Section: Logo */}
//         <div className={styles.navLeft}>
//           <Link href={isCanadaContext ? "/en-ca" : "/"} className={styles.navLogoText}>
//             FLASHFIRE
//           </Link>
//         </div>

//         {/* Center Section: Links (Desktop) */}
//         <ul className={styles.navLinks}>
//           {links.map((link) => (
//             <li key={link.href} className={styles.navLinkItem}>
//               <a 
//                 href={getHref(link.href)} 
//                 className={styles.navLinkText}
//                 target={link.target}
//                 rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Right Section: CTAs (Desktop) */}
//         <div className={styles.navRight}>
//           {secondaryIsExternal ? (
//             <a
//               href={ctas.secondary.href}
//               className={styles.navSecondaryButton}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </a>
//           ) : (
//             <Link
//               href={ctas.secondary.href}
//               className={styles.navSecondaryButton}
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </Link>
//           )}
//           {primaryIsExternal ? (
//             <a
//               href={ctas.primary.href}
//               className={styles.navPrimaryButton}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </a>
//           ) : (
//             <Link
//               href={ctas.primary.href}
//               className={styles.navPrimaryButton}
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           className={styles.navMenuIcon}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <div
//             className={isMenuOpen ? styles.iconClose : styles.iconHamburger}
//           />
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isMenuOpen && (
//         <div className={styles.navMobileMenu}>
//           <ul className={styles.navMobileLinks}>
//             {links.map((link) => (
//               <li key={link.href}>
//                 <a 
//                   href={getHref(link.href)} 
//                   className={styles.navMobileLink}
//                   target={link.target}
//                   rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <div className={styles.navMobileButtons}>
//             <a
//               href={ctas.secondary.href}
//               className={styles.navMobileSecondary}
//               target={secondaryIsExternal ? "_blank" : undefined}
//               rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_mobile",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </a>
//             <a
//               href={ctas.primary.href}
//               className={styles.navMobilePrimary}
//               target={primaryIsExternal ? "_blank" : undefined}
//               rel={primaryIsExternal ? "noopener noreferrer" : undefined}
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_mobile",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_mobile_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>

//     {/* Black Friday Sale Banner - Below Navbar */}
//     <div className="w-full bg-[#f5f5f0] border-t border-[rgba(241,241,241,0.2)] py-0.5 px-4 flex items-center justify-center max-[900px]:py-0.5 max-[900px]:px-3 font-['Space_Grotesk',sans-serif]">
//       <div className="flex items-center justify-center gap-2 flex-wrap max-w-[1400px] w-full max-[900px]:gap-1.5 max-[600px]:flex-col max-[600px]:gap-2">
//         {/* Text part - stays in one line on mobile */}
//         <div className="flex items-center gap-2 max-[600px]:gap-1.5 max-[600px]:flex-nowrap max-[600px]:w-full max-[600px]:justify-center">
//           <span className="font-bold text-[1.1rem] text-black tracking-[0.02em] uppercase max-[900px]:text-[0.85rem] max-[600px]:text-[0.75rem] whitespace-nowrap">
//             BLACK FRIDAY SALE
//           </span>
//           <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
//             ✱
//           </span>
//           <span className="text-[0.85rem] text-black font-medium max-[900px]:text-[0.75rem] max-[600px]:text-[0.7rem] whitespace-nowrap">
//             Get flat $20 discount on all plans
//           </span>
//           <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
//             ✱
//           </span>
//         </div>
//         <div className="flex gap-1 items-center max-[600px]:gap-0.5">
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.days).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Days
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.hours).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Hrs
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.minutes).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Mins
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.seconds).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Secs
//             </div>
//           </div>
//           <button
//             onClick={openCalendly}
//             className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 text-base sm:text-lg ml-3 max-[600px]:ml-2"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import styles from "./navbar.module.css";
// import type { NavLink, NavbarCTA } from "../../types/navbarData";
// import { trackButtonClick, trackModalOpen } from "@/src/utils/PostHogTracking";
// import { GTagUTM } from "@/src/utils/GTagUTM";
// import { useRouter } from "next/navigation";
// import { getCurrentUTMParams } from "@/src/utils/UTMUtils";

// type Props = {
//   links: NavLink[];
//   ctas: NavbarCTA;
// };

// export default function NavbarClient({ links, ctas }: Props) {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const pathname = usePathname();
//   const isCanadaContext = pathname.startsWith("/en-ca");
//   const prefix = isCanadaContext ? "/en-ca" : "";
  
//   const isBookPage = pathname === "/schedule-a-free-career-call" || pathname === "/en-ca/schedule-a-free-career-call";
  
//   const isExternalHref = (href: string) => href.startsWith("http");
//   const primaryIsExternal = isExternalHref(ctas.primary.href);
//   const secondaryIsExternal = isExternalHref(ctas.secondary.href);
  
//   const getHref = (href: string) => {
//     if (isExternalHref(href) || href.startsWith("#")) {
//       return href;
//     }
//     return `${prefix}${href}`;
//   };

//   // Countdown timer - Set end date (November 28, 2025 11:59 PM)
//   useEffect(() => {
//     // Only run on client side
//     if (typeof window === "undefined") return;

//     // Set the target date: November 28, 2025 at 11:59:59 PM
//     const targetDate = new Date(2025, 10, 28, 23, 59, 59); // Month is 0-indexed, so 10 = November

//     const calculateTimeLeft = () => {
//       const now = new Date().getTime();
//       const endDate = targetDate.getTime();
//       const difference = endDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor(
//           (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//         );
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60),
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setTimeLeft({ days, hours, minutes, seconds });
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       }
//     };

//     // Calculate immediately
//     calculateTimeLeft();

//     // Update every second
//     const interval = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const openCalendly = () => {
//     const utmSource = typeof window !== "undefined"
//       ? localStorage.getItem("utm_source") || "WEBSITE"
//       : "WEBSITE";
//     const utmMedium = typeof window !== "undefined"
//       ? localStorage.getItem("utm_medium") || "Navigation_Banner"
//       : "Navigation_Banner";
    
//     // GTag tracking
//     GTagUTM({
//       eventName: "calendly_modal_open",
//       label: "Book_Now_Banner_Button",
//       utmParams: {
//         utm_source: utmSource,
//         utm_medium: utmMedium,
//         utm_campaign: typeof window !== "undefined"
//           ? localStorage.getItem("utm_campaign") || "Website"
//           : "Website",
//       },
//     });
    
//     // PostHog tracking (automatically includes UTM via getUTMContext)
//     trackButtonClick("Book Now", "navigation_banner", "cta", {
//       button_location: "banner",
//       navigation_type: "banner_cta",
//     });
    
//     // Navigate to /book-now with preserved UTM params
//     const utmParams = getCurrentUTMParams();
//     const targetPath = utmParams ? `/book-now?${utmParams}` : '/book-now';
    
//     // Dispatch custom event to force show modal (even if already on the route)
//     if (typeof window !== 'undefined') {
//       window.dispatchEvent(new CustomEvent('showCalendlyModal'));
//     }
    
//     router.push(targetPath);
//   };

//   return (
//     <>
//       {/* Sticky Container for Navbar and Banner */}
//       <div className="sticky top-0 z-50">
//         <nav 
//           className={styles.navContainer}
//           style={{
//             backdropFilter: 'blur(120px)',
//             WebkitBackdropFilter: 'blur(120px)',
//           }}
//         >
//       <div className={styles.navInner}>
//         {/* Left Section: Logo */}
//         <div className={styles.navLeft}>
//           <Link href={isCanadaContext ? "/en-ca" : "/"} className={styles.navLogoText}>
//             FLASHFIRE
//           </Link>
//         </div>

//         {/* Center Section: Links (Desktop) */}
//         <ul className={styles.navLinks}>
//           {links.map((link) => (
//             <li key={link.href} className={styles.navLinkItem}>
//               <a 
//                 href={getHref(link.href)} 
//                 className={styles.navLinkText}
//                 target={link.target}
//                 rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Right Section: CTAs (Desktop) */}
//         <div className={styles.navRight}>
//           {secondaryIsExternal ? (
//             <a
//               href={ctas.secondary.href}
//               className={styles.navSecondaryButton}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </a>
//           ) : (
//             <Link
//               href={ctas.secondary.href}
//               className={styles.navSecondaryButton}
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </Link>
//           )}
//           {primaryIsExternal ? (
//             <a
//               href={ctas.primary.href}
//               className={styles.navPrimaryButton}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </a>
//           ) : (
//             <Link
//               href={ctas.primary.href}
//               className={styles.navPrimaryButton}
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_desktop",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           className={styles.navMenuIcon}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <div
//             className={isMenuOpen ? styles.iconClose : styles.iconHamburger}
//           />
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {isMenuOpen && (
//         <div className={styles.navMobileMenu}>
//           <ul className={styles.navMobileLinks}>
//             {links.map((link) => (
//               <li key={link.href}>
//                 <a 
//                   href={getHref(link.href)} 
//                   className={styles.navMobileLink}
//                   target={link.target}
//                   rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
//                 >
//                   {link.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <div className={styles.navMobileButtons}>
//             <a
//               href={ctas.secondary.href}
//               className={styles.navMobileSecondary}
//               target={secondaryIsExternal ? "_blank" : undefined}
//               rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
//               onClick={() => {
//                 trackButtonClick(ctas.secondary.label, "navigation", "secondary", {
//                   button_location: "navbar_mobile",
//                   navigation_type: "secondary_cta"
//                 });
//               }}
//             >
//               {ctas.secondary.label}
//             </a>
//             <a
//               href={ctas.primary.href}
//               className={styles.navMobilePrimary}
//               target={primaryIsExternal ? "_blank" : undefined}
//               rel={primaryIsExternal ? "noopener noreferrer" : undefined}
//               onClick={() => {
//                 trackButtonClick(ctas.primary.label, "navigation", "cta", {
//                   button_location: "navbar_mobile",
//                   navigation_type: "primary_cta"
//                 });
//                 if (ctas.primary.href.includes("calendly")) {
//                   trackModalOpen("calendly_modal", "navigation_button", {
//                     trigger_source: "navbar_mobile_cta"
//                   });
//                 }
//               }}
//             >
//               {ctas.primary.label}
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>

//     {/* Black Friday Sale Banner - Below Navbar */}
//     <div className="w-full bg-[#f5f5f0] border-t border-[rgba(241,241,241,0.2)] py-0.5 px-4 flex items-center justify-center max-[900px]:py-0.5 max-[900px]:px-3 font-['Space_Grotesk',sans-serif]">
//       <div className="flex items-center justify-center gap-2 flex-wrap max-w-[1400px] w-full max-[900px]:gap-1.5 max-[600px]:flex-col max-[600px]:gap-2">
//         {/* Text part - stays in one line on mobile */}
//         <div className="flex items-center gap-2 max-[600px]:gap-1.5 max-[600px]:flex-nowrap max-[600px]:w-full max-[600px]:justify-center">
//           <span className="font-bold text-[1.1rem] text-black tracking-[0.02em] uppercase max-[900px]:text-[0.85rem] max-[600px]:text-[0.75rem] whitespace-nowrap">
//             BLACK FRIDAY SALE
//           </span>
//           <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
//             ✱
//           </span>
//           <span className="text-[0.85rem] text-black font-medium max-[900px]:text-[0.75rem] max-[600px]:text-[0.7rem] whitespace-nowrap">
//             Get flat $20 discount on all plans
//           </span>
//           <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
//             ✱
//           </span>
//         </div>
//         <div className="flex gap-1 items-center max-[600px]:gap-0.5">
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.days).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Days
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.hours).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Hrs
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.minutes).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Mins
//             </div>
//           </div>
//           <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
//             <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
//               {String(timeLeft.seconds).padStart(2, "0")}
//             </div>
//             <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
//               Secs
//             </div>
//           </div>
//           <button
//             onClick={openCalendly}
//             className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 text-base sm:text-lg ml-3 max-[600px]:ml-2"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./navbar.module.css";
import type { NavLink, NavbarCTA } from "../../types/navbarData";
import { trackButtonClick, trackModalOpen } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useRouter } from "next/navigation";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { smoothScrollToElement, smoothScrollTo } from "@/src/utils/smoothScroll";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import { trackExternalLink } from "@/src/utils/PostHogTracking";

type Props = {
  links: NavLink[];
  ctas: NavbarCTA;
};

export default function NavbarClient({ links, ctas }: Props) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const featureCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const cancelFeatureClose = () => {
    if (featureCloseTimer.current) {
      clearTimeout(featureCloseTimer.current);
      featureCloseTimer.current = null;
    }
  };

  const scheduleFeatureClose = () => {
    cancelFeatureClose();
    featureCloseTimer.current = setTimeout(() => {
      setIsFeatureOpen(false);
    }, 400); // slightly longer delay so users can move into the dropdown
  };
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [slotsRemaining, setSlotsRemaining] = useState(5);
  const pathname = usePathname();
  // Ensure pathname is always a string to prevent hydration mismatches
  const safePathname = pathname || (typeof window !== 'undefined' ? window.location.pathname : '') || '';
  const isCanadaContext = safePathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";
  
  const isBookPage = safePathname === "/schedule-a-free-career-call" || safePathname === "/en-ca/schedule-a-free-career-call";
  const isImageTestimonialsPage = safePathname === "/testimonials" || safePathname === "/en-ca/testimonials" || safePathname === "/image-testimonials" || safePathname === "/en-ca/image-testimonials";
  const isBlogsPage = safePathname.startsWith("/blogs") || safePathname.startsWith("/en-ca/blogs");
  
  // Geo-bypass hook for Book Now button
  const { getButtonProps: getBookNowButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener in ClientLogicWrapper
    },
  });
  
  const isExternalHref = (href: string) => href.startsWith("http");
  const primaryIsExternal = ctas.primary ? isExternalHref(ctas.primary.href) : false;
  const secondaryIsExternal = ctas.secondary ? isExternalHref(ctas.secondary.href) : false;
  
  const getHref = (href: string) => {
    if (isExternalHref(href) || href.startsWith("#")) {
      return href;
    }
    return `${prefix}${href}`;
  };

  // Handle section clicks - jump to section start AND update URL
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, skipNavigation = false) => {
    const sectionMap: { [key: string]: string } = {};

    const sectionId = sectionMap[href];
    
    // Always prevent default for section links
    e.preventDefault();
    
    if (!sectionId) {
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    // Check if already at this section (within 50px tolerance)
    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const stickyNavbar = document.querySelector('.sticky.top-0') || 
                        document.querySelector('nav') ||
                        document.querySelector('[class*="nav"]');
    const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
    const offset = navbarHeight + 20;
    const targetScrollPosition = Math.max(0, elementTop - offset);
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // If already at this section, don't scroll again - just update URL if needed
    if (Math.abs(currentScrollPosition - targetScrollPosition) < 50) {
      // Still update URL if not already set
      const targetUrl = `${prefix}${href}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
      return;
    }
    
    // Update URL to reflect the section (for SEO and shareability) - but only if not skipping navigation
    if (!skipNavigation) {
      const targetUrl = `${prefix}${href}`;
      window.history.pushState({}, '', targetUrl);
    }
    
    // Smooth scroll to section with butter-smooth easing
    smoothScrollToElement(sectionId, {
      duration: 800, // 800ms for smooth feel
      easing: 'easeInOutCubic', // Butter smooth easing
    }).then(() => {
    });
  };

  // Handle browser back/forward buttons for section navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const sectionMap: { [key: string]: string } = {};

      const sectionId = sectionMap[currentPath];
      if (sectionId) {
        setTimeout(() => {
          // Use smooth scroll for browser navigation
          smoothScrollToElement(sectionId, {
            duration: 800,
            easing: 'easeInOutCubic',
          });
        }, 100);
      } else if (currentPath === '/' || currentPath === '/en-ca') {
        // Back to homepage, smooth scroll to top
        smoothScrollTo(0, {
          duration: 600,
          easing: 'easeOutCubic',
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set mounted to true after component mounts to prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown timer - Runs from 1st of month to end of month (30th or 31st)
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      // Get the first day of the current month
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      
      // Get the last day of the current month (day 0 of next month gives us the last day of current month)
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999); // Set to end of day
      
      // Calculate slot count based on current date
      const currentDay = now.getDate();
      let slots = 5;
      if (currentDay >= 1 && currentDay <= 10) {
        slots = 5;
      } else if (currentDay >= 11 && currentDay <= 20) {
        slots = 4;
      } else {
        slots = 3;
      }
      setSlotsRemaining(slots);

      const current = now.getTime();
      const endDate = lastDayOfMonth.getTime();
      const difference = endDate - current;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setSlotsRemaining(0);
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const openCalendly = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default scroll behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const utmSource = typeof window !== "undefined"
      ? localStorage.getItem("utm_source") || "WEBSITE"
      : "WEBSITE";
    const utmMedium = typeof window !== "undefined"
      ? localStorage.getItem("utm_medium") || "Navigation_Banner"
      : "Navigation_Banner";
    
    // GTag tracking
    GTagUTM({
      eventName: "calendly_modal_open",
      label: "Book_Now_Banner_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: typeof window !== "undefined"
          ? localStorage.getItem("utm_campaign") || "Website"
          : "Website",
      },
    });
    
    // PostHog tracking (automatically includes UTM via getUTMContext)
    trackButtonClick("Book Now", "navigation_banner", "cta", {
      button_location: "banner",
      navigation_type: "banner_cta",
    });
    
    // Check current path
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
    const normalizedPath = currentPath.split('?')[0]; // Remove query params
    
    // Pages where we should change URL to /book-now but keep page content
    const stayOnPageRoutes = [
      '/features', '/en-ca/features',
      '/how-it-works', '/en-ca/how-it-works',
      '/how-flashfire-ai-job-automation-platform-works', '/en-ca/how-flashfire-ai-job-automation-platform-works',
      '/pricing', '/en-ca/pricing',
      '/feature', '/en-ca/feature'
    ];
    
    const shouldStayOnPage = stayOnPageRoutes.includes(normalizedPath);
    const isAlreadyOnBookNow = normalizedPath === '/book-now' || normalizedPath === '/en-ca/book-now';
    
    // If we should stay on the current page, change URL but keep content
    if (shouldStayOnPage) {
      // Save the previous page path to sessionStorage so we can navigate back on modal close
      if (typeof window !== "undefined") {
        sessionStorage.setItem('previousPageBeforeBookNow', normalizedPath);
      }
      
      // Save current scroll position
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      if (typeof window !== "undefined") {
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
      }
      
      // Change URL to /book-now using pushState (doesn't reload page)
      const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/book-now' : '/book-now';
      
      // Change URL immediately using pushState (before router.push for instant feedback)
      if (typeof window !== "undefined") {
        window.history.pushState({}, '', targetPath);
      }
      
      // Dispatch custom event to force show modal FIRST (before navigation)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('showCalendlyModal'));
      }
      
      // Use router.push with shallow routing to update Next.js state without full navigation
      // Using replace instead of push to avoid adding to history stack
      router.replace(targetPath);
      
      // Restore scroll position immediately after modal opens
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          }, 50);
        });
      });
      
      return;
    }
    
    // If already on book-now, just show modal
    if (isAlreadyOnBookNow) {
      // Save current scroll position
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      
      // Dispatch custom event to force show modal
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('showCalendlyModal'));
      }
      
      // Restore scroll position immediately after modal opens
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          }, 50);
        });
      });
      
      return;
    }
    
    // Save current scroll position before navigation
    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    if (typeof window !== "undefined") {
      sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
    }
    
    // Navigate to /book-now WITHOUT exposing UTM params in the URL
    const targetPath = '/book-now';
    
    // Dispatch custom event to force show modal (even if already on the route)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('showCalendlyModal'));
      
      // Use window.history.pushState to update URL without scrolling
      window.history.pushState({}, '', targetPath);
      
      // Trigger Next.js router update without scroll
      router.push(targetPath);
      
      // Immediately restore scroll position to prevent scroll to top
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' as ScrollBehavior });
          }, 50);
        });
      });
    } else {
      router.push(targetPath);
    }
  };

  return (
    <>
      {/* Sticky Container for Navbar and Banner */}
      <div className="sticky top-0 z-50">
        <nav 
          className={styles.navContainer}
          style={{
            backdropFilter: 'blur(120px)',
            WebkitBackdropFilter: 'blur(120px)',
          }}
        >
      <div className={styles.navInner}>
        {/* Left Section: Logo */}
        <div className={styles.navLeft}>
          <Link 
            href={isCanadaContext ? "/en-ca" : "/"} 
            className={styles.navLogoText}
            onClick={(e) => {
              // If already on home page, scroll to top
              const currentPath = pathname;
              const isOnHomePage = currentPath === "/" || currentPath === "/en-ca" || currentPath === prefix + "/";
              
              if (isOnHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // If navigating to home, scroll to top after navigation
                const handleScrollToTop = () => {
                  window.scrollTo({ top: 0, behavior: "instant" });
                  // Remove listener after scrolling
                  window.removeEventListener("focus", handleScrollToTop);
                };
                // Scroll after navigation completes
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "instant" });
                }, 100);
              }
            }}
          >
            FLASHFIRE
          </Link>
        </div>

        {/* Center Section: Links (Desktop) */}
        <ul className={styles.navLinks}>
          {links.map((link) => {
            const sectionLinks: string[] = []; // No section links anymore
            const isSectionLink = sectionLinks.includes(link.href);
            const isOnHomePage = pathname === '/' || pathname === '/en-ca' || pathname === prefix + '/';
            const isOnPricingPage = pathname === '/pricing' || pathname === '/en-ca/pricing' || pathname === prefix + '/pricing';
            const isOnSectionPage = pathname === getHref(link.href) || pathname === link.href || pathname === prefix + link.href;
            const isExternal = isExternalHref(link.href) || link.target === "_blank";
            
            const isFeaturesLink = link.name.toLowerCase() === "features";
            
            return (
              <li
                key={link.href}
                className={styles.navLinkItem}
                onMouseEnter={() => {
                  if (isFeaturesLink) {
                    cancelFeatureClose();
                    setIsFeatureOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (isFeaturesLink) {
                    scheduleFeatureClose();
                  }
                }}
              >
                {isFeaturesLink ? (
                  <>
                    <button
                      type="button"
                      className={`${styles.navLinkText} ${styles.featureToggle}`}
                      onClick={() => setIsFeatureOpen((prev) => !prev)}
                      suppressHydrationWarning
                    >
                      {link.name}
                      <span
                        className={`${styles.caret} ${
                          isFeatureOpen ? styles.caretOpen : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {isFeatureOpen && (
                      <div
                        className={styles.featureDropdown}
                        onMouseEnter={cancelFeatureClose}
                        onMouseLeave={scheduleFeatureClose}
                      >
                        <div className={styles.featureDropdownGrid}>
                          <Link
                            href={getHref("/features/ats-resume-optimizer")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Resume Optimizer
                              </span>
                              <span className={styles.featureSub}>
                                Resume score for ATS
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/linkedin-profile-optimization-tool")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 9H2V21H6V9Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="4" cy="4" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                LinkedIn Optimization
                              </span>
                              <span className={styles.featureSub}>
                                Optimize LinkedIn profile
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/automated-job-applications")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Job Automation
                              </span>
                              <span className={styles.featureSub}>
                                Auto apply to roles
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/job-application-tracker")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8V12L15 15" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Job Tracker
                              </span>
                              <span className={styles.featureSub}>
                                Track applications
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/ai-job-targeting")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="6" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Precision Targeting
                              </span>
                              <span className={styles.featureSub}>
                                Smart job matching
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/dashboard-analytics")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3V21H21" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 16L12 11L16 15L21 10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 10V3H14" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Dashboard & Analytics
                              </span>
                              <span className={styles.featureSub}>
                                Performance insights
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/ai-cover-letter-generator")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Cover Letter Builder
                              </span>
                              <span className={styles.featureSub}>
                                AI-powered writing
                              </span>
                            </div>
                          </Link>

                          <Link
                            href={getHref("/features/interview-tips")}
                            className={styles.featureDropdownItem}
                            onClick={() => setIsFeatureOpen(false)}
                          >
                            <div className={styles.featureIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20V16H5.17L4 17.17V4Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 9H16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 13H12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 20L14 16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className={styles.featureTexts}>
                              <span className={styles.featureTitle}>
                                Interview Tips
                              </span>
                              <span className={styles.featureSub}>
                                Real-time AI prep
                              </span>
                            </div>
                          </Link>
                        </div>

                        <Link
                          href={getHref(link.href)}
                          className={styles.featureDropdownFooter}
                          onClick={() => setIsFeatureOpen(false)}
                          prefetch={true}
                        >
                          All Features →
                        </Link>
                      </div>
                    )}
                  </>
                ) : isSectionLink ? (
                  <a 
                    href={`#${link.href.replace('/', '')}`}
                    className={styles.navLinkText}
                    onClick={(e) => {
                      e.preventDefault();
                      // Always navigate to home page if on pricing page
                      if (isOnPricingPage || (!isOnHomePage && !isOnSectionPage)) {
                        // Navigate to home first
                        router.push(prefix + '/');
                        // Wait for navigation to complete and DOM to update
                        const scrollToSectionOnHome = () => {
                          const currentPath = window.location.pathname;
                          const isNowOnHome = currentPath === '/' || currentPath === '/en-ca' || currentPath === prefix + '/';
                          
                          if (isNowOnHome) {
                            // Double check that we're on home page and section exists
                            const sectionId = link.href.replace('/', '');
                            const section = document.getElementById(sectionId);
                            if (section) {
                              handleSectionClick(e, link.href);
                            } else {
                              // Section not found yet, wait a bit more
                              setTimeout(scrollToSectionOnHome, 100);
                            }
                          } else {
                            // Not on home yet, wait a bit more
                            setTimeout(scrollToSectionOnHome, 100);
                          }
                        };
                        
                        // Start checking after a short delay
                        requestAnimationFrame(() => {
                          setTimeout(scrollToSectionOnHome, 300);
                        });
                      } else if (isOnSectionPage && !isOnHomePage) {
                        // If on section page (like /feature), just scroll to section without navigating
                        handleSectionClick(e, link.href, true);
                      } else {
                        // Already on home page, just scroll
                        handleSectionClick(e, link.href);
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ) : isExternal ? (
                  <a 
                    href={getHref(link.href)} 
                    className={styles.navLinkText}
                    target={link.target}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    href={getHref(link.href)} 
                    className={styles.navLinkText}
                    onClick={(e) => {
                      // Special handling for Pricing link - prevent scroll to top when already on pricing page
                      if (link.href === '/pricing' && isOnPricingPage) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Scroll to pricing heading with navbar offset
                        const headingElement = document.getElementById('pricing-heading');
                        if (headingElement) {
                          const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                              document.querySelector('nav') ||
                                              document.querySelector('[class*="nav"]');
                          const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
                          const offset = navbarHeight + 20;
                          
                          const rect = headingElement.getBoundingClientRect();
                          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                          const elementTop = rect.top + scrollTop;
                          const targetScrollPosition = Math.max(0, elementTop - offset);
                          
                          // Only scroll if not already at the correct position
                          const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                          if (Math.abs(currentScrollPosition - targetScrollPosition) > 50) {
                            smoothScrollToElement('pricing-heading', {
                              duration: 800,
                              easing: 'easeInOutCubic',
                            });
                          }
                        }
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Section: CTAs (Desktop) */}
        <div className={styles.navRight}>
          {ctas.primary && primaryIsExternal ? (
            <a
              href={ctas.primary.href}
              className={styles.navPrimaryButton}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackButtonClick(ctas.primary.label, "navigation", "cta", {
                  button_location: "navbar_desktop",
                  navigation_type: "primary_cta"
                });
                if (ctas.primary.href.includes("calendly")) {
                  trackModalOpen("calendly_modal", "navigation_button", {
                    trigger_source: "navbar_cta"
                  });
                }
              }}
            >
              {ctas.primary.label}
            </a>
          ) : ctas.primary && (ctas.primary.href === "/talk-to-an-expert" || ctas.primary.href === "/en-ca/talk-to-an-expert") ? (
            <button
              className={styles.navPrimaryButton}
              onClick={(e) => {
                e.preventDefault();
                // Get UTM parameters from localStorage
                const utmSource = typeof window !== "undefined"
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined"
                  ? localStorage.getItem("utm_medium") || "Navigation_Navbar_Button"
                  : "Navigation_Navbar_Button";
                const utmCampaign = typeof window !== "undefined"
                  ? localStorage.getItem("utm_campaign") || "Website"
                  : "Website";

                // Track with both GTag and PostHog
                GTagUTM({
                  eventName: "whatsapp_support_click",
                  label: "Navbar_Talk_To_Expert_Button",
                  utmParams: {
                    utm_source: utmSource,
                    utm_medium: utmMedium,
                    utm_campaign: utmCampaign,
                  },
                });

                // PostHog tracking
                trackButtonClick("Talk to an Expert", "navigation", "cta", {
                  button_location: "navbar",
                  navigation_type: "primary_cta",
                  page: "talk-to-an-expert",
                });
                trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "navigation", {
                  link_type: "whatsapp_support",
                  contact_method: "whatsapp",
                  source: "navbar_button",
                });

                // Open WhatsApp in a new tab
                window.open(WHATSAPP_SUPPORT_URL, "_blank");
              }}
            >
              {ctas.primary?.label}
            </button>
          ) : ctas.primary ? (
            <Link
              href={ctas.primary.href}
              className={styles.navPrimaryButton}
              onClick={() => {
                trackButtonClick(ctas.primary.label, "navigation", "cta", {
                  button_location: "navbar_desktop",
                  navigation_type: "primary_cta"
                });
                if (ctas.primary.href.includes("calendly")) {
                  trackModalOpen("calendly_modal", "navigation_button", {
                    trigger_source: "navbar_cta"
                  });
                }
              }}
            >
              {ctas.primary.label}
            </Link>
          ) : null}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className={styles.navMenuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={isMenuOpen ? styles.iconClose : styles.iconHamburger}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className={styles.navMobileMenu}>
          <ul className={styles.navMobileLinks}>
            {links.map((link) => {
              const sectionLinks: string[] = []; // No section links anymore
              const isSectionLink = sectionLinks.includes(link.href);
              const isOnHomePage = safePathname === '/' || safePathname === '/en-ca' || safePathname === prefix + '/';
              const isOnPricingPage = safePathname === '/pricing' || safePathname === '/en-ca/pricing' || safePathname === prefix + '/pricing';
              const isOnSectionPage = safePathname === getHref(link.href) || safePathname === link.href || safePathname === prefix + link.href;
              const isExternal = isExternalHref(link.href) || link.target === "_blank";
              const isFeaturesLink = link.name.toLowerCase() === "features";
              
              return (
                <li key={link.href}>
                  {isFeaturesLink ? (
                    <>
                      <button
                        type="button"
                        className={`${styles.navMobileLink} ${styles.featureToggleMobile}`}
                        onClick={() => setIsFeatureOpen((prev) => !prev)}
                        suppressHydrationWarning
                      >
                        {link.name}
                        <span
                          className={`${styles.caret} ${
                            isFeatureOpen ? styles.caretOpen : ""
                          }`}
                        >
                          ▾
                        </span>
                      </button>

                      {isFeatureOpen && (
                        <div className={styles.featureDropdownMobile}>
                          <div className={styles.featureDropdownGridMobile}>
                            <a
                              href={getHref("/features/ats-resume-optimizer")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/ats-resume-optimizer"));
                                trackButtonClick("Resume Optimizer", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/ats-resume-optimizer"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Resume Optimizer
                                </span>
                                <span className={styles.featureSub}>
                                  Resume score for ATS
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/linkedin-profile-optimization-tool")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/linkedin-profile-optimization-tool"));
                                trackButtonClick("LinkedIn Opt.", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/linkedin-profile-optimization-tool"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M6 9H2V21H6V9Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="4" cy="4" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  LinkedIn Opt.
                                </span>
                                <span className={styles.featureSub}>
                                  Optimize LinkedIn profile
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/automated-job-applications")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/automated-job-applications"));
                                trackButtonClick("Job Automation", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/automated-job-applications"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2 17L12 22L22 17" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2 12L12 17L22 12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Job Automation
                                </span>
                                <span className={styles.featureSub}>
                                  Auto apply to roles
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/job-application-tracker")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/job-application-tracker"));
                                trackButtonClick("Job Tracker", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/job-application-tracker"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M12 8V12L15 15" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Job Tracker
                                </span>
                                <span className={styles.featureSub}>
                                  Track applications
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/ai-job-targeting")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/ai-job-targeting"));
                                trackButtonClick("Precision Targeting", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/ai-job-targeting"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="12" r="10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="12" cy="12" r="6" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="12" cy="12" r="2" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Precision Targeting
                                </span>
                                <span className={styles.featureSub}>
                                  Smart job matching
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/dashboard-analytics")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/dashboard-analytics"));
                                trackButtonClick("Dashboard & Analytics", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/dashboard-analytics"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3 3V21H21" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M7 16L12 11L16 15L21 10" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M21 10V3H14" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Dashboard & Analytics
                                </span>
                                <span className={styles.featureSub}>
                                  Performance insights
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/ai-cover-letter-generator")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/ai-cover-letter-generator"));
                                trackButtonClick("Cover Letter Builder", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/ai-cover-letter-generator"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M14 2V8H20" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 13H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M16 17H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M10 9H9H8" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Cover Letter Builder
                                </span>
                                <span className={styles.featureSub}>
                                  AI-powered writing
                                </span>
                              </div>
                            </a>

                            <a
                              href={getHref("/features/interview-tips")}
                              className={styles.featureDropdownItemMobile}
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                setIsFeatureOpen(false);
                                router.push(getHref("/features/interview-tips"));
                                trackButtonClick("Interview Tips", "navigation", "link", {
                                  button_location: "navbar_mobile_features",
                                  navigation_type: "internal_link",
                                  destination: "/features/interview-tips"
                                });
                              }}
                            >
                              <div className={styles.featureIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 4H20V16H5.17L4 17.17V4Z" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M8 9H16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M8 13H12" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M10 20L14 16" stroke="#ff4c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <div className={styles.featureTexts}>
                                <span className={styles.featureTitle}>
                                  Interview Tips
                                </span>
                                <span className={styles.featureSub}>
                                  Real-time AI prep
                                </span>
                              </div>
                            </a>
                          </div>

                          <button
                            type="button"
                            className={styles.featureDropdownFooterMobile}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Close menus
                              setIsMenuOpen(false);
                              setIsFeatureOpen(false);
                              
                              // Track navigation click
                              trackButtonClick("All Features", "navigation", "link", {
                                button_location: "navbar_mobile_features",
                                navigation_type: "internal_link",
                                destination: link.href
                              });
                              
                              // Small delay to ensure menus close before navigation
                              setTimeout(() => {
                                router.push(getHref(link.href));
                              }, 100);
                            }}
                          >
                            All Features →
                          </button>
                        </div>
                      )}
                    </>
                  ) : isSectionLink ? (
                    <a
                      href={`#${link.href.replace('/', '')}`}
                      className={styles.navMobileLink}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        // Always navigate to home page if on pricing page
                        if (isOnPricingPage || (!isOnHomePage && !isOnSectionPage)) {
                          // Navigate to home first
                          router.push(prefix + '/');
                          // Wait for navigation to complete and DOM to update
                          const scrollToSectionOnHome = () => {
                            const currentPath = window.location.pathname;
                            const isNowOnHome = currentPath === '/' || currentPath === '/en-ca' || currentPath === prefix + '/';
                            
                            if (isNowOnHome) {
                              // Double check that we're on home page and section exists
                              const sectionId = link.href.replace('/', '');
                              const section = document.getElementById(sectionId);
                              if (section) {
                                handleSectionClick(e, link.href);
                              } else {
                                // Section not found yet, wait a bit more
                                setTimeout(scrollToSectionOnHome, 100);
                              }
                            } else {
                              // Not on home yet, wait a bit more
                              setTimeout(scrollToSectionOnHome, 100);
                            }
                          };
                          
                          // Start checking after a short delay
                          requestAnimationFrame(() => {
                            setTimeout(scrollToSectionOnHome, 300);
                          });
                        } else if (isOnSectionPage && !isOnHomePage) {
                          // If on section page (like /feature), just scroll to section without navigating
                          handleSectionClick(e, link.href, true);
                        } else {
                          // Already on home page, just scroll
                          handleSectionClick(e, link.href);
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ) : isExternal ? (
                    <a 
                      href={getHref(link.href)} 
                      className={styles.navMobileLink}
                      target={link.target}
                      rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={getHref(link.href)} 
                      className={styles.navMobileLink}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close menu immediately
                        setIsMenuOpen(false);
                        
                        // Track navigation click
                        trackButtonClick(link.name, "navigation", "link", {
                          button_location: "navbar_mobile",
                          navigation_type: "internal_link",
                          destination: link.href
                        });
                        
                        // Special handling for Pricing link - prevent scroll to top when already on pricing page
                        if (link.href === '/pricing' && isOnPricingPage) {
                          // Scroll to pricing heading with navbar offset
                          const headingElement = document.getElementById('pricing-heading');
                          if (headingElement) {
                            const stickyNavbar = document.querySelector('.sticky.top-0') || 
                                                document.querySelector('nav') ||
                                                document.querySelector('[class*="nav"]');
                            const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
                            const offset = navbarHeight + 20;
                            
                            const rect = headingElement.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            const elementTop = rect.top + scrollTop;
                            const targetScrollPosition = Math.max(0, elementTop - offset);
                            
                            // Only scroll if not already at the correct position
                            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                            if (Math.abs(currentScrollPosition - targetScrollPosition) > 50) {
                              smoothScrollToElement('pricing-heading', {
                                duration: 800,
                                easing: 'easeInOutCubic',
                              });
                            }
                          }
                          return;
                        }
                        
                        // Navigate using router.push for better control
                        router.push(getHref(link.href));
                      }}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.navMobileButtons}>
            {ctas.primary && primaryIsExternal ? (
              <a
                href={ctas.primary.href}
                className={styles.navMobilePrimary}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackButtonClick(ctas.primary.label, "navigation", "cta", {
                    button_location: "navbar_mobile",
                    navigation_type: "primary_cta"
                  });
                  if (ctas.primary.href.includes("calendly")) {
                    trackModalOpen("calendly_modal", "navigation_button", {
                      trigger_source: "navbar_mobile_cta"
                    });
                  }
                }}
              >
                {ctas.primary.label}
              </a>
            ) : ctas.primary && (ctas.primary.href === "/talk-to-an-expert" || ctas.primary.href === "/en-ca/talk-to-an-expert") ? (
              <button
                className={styles.navMobilePrimary}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  // Get UTM parameters from localStorage
                  const utmSource = typeof window !== "undefined"
                    ? localStorage.getItem("utm_source") || "WEBSITE"
                    : "WEBSITE";
                  const utmMedium = typeof window !== "undefined"
                    ? localStorage.getItem("utm_medium") || "Navigation_Navbar_Button"
                    : "Navigation_Navbar_Button";
                  const utmCampaign = typeof window !== "undefined"
                    ? localStorage.getItem("utm_campaign") || "Website"
                    : "Website";

                  // Track with both GTag and PostHog
                  GTagUTM({
                    eventName: "whatsapp_support_click",
                    label: "Navbar_Talk_To_Expert_Button_Mobile",
                    utmParams: {
                      utm_source: utmSource,
                      utm_medium: utmMedium,
                      utm_campaign: utmCampaign,
                    },
                  });

                  // PostHog tracking
                  trackButtonClick("Talk to an Expert", "navigation", "cta", {
                    button_location: "navbar_mobile",
                    navigation_type: "primary_cta",
                    page: "talk-to-an-expert",
                  });
                  trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "navigation", {
                    link_type: "whatsapp_support",
                    contact_method: "whatsapp",
                    source: "navbar_mobile_button",
                  });

                  // Open WhatsApp in a new tab
                  window.open(WHATSAPP_SUPPORT_URL, "_blank");
                }}
              >
                {ctas.primary?.label}
              </button>
            ) : ctas.primary ? (
              <Link
                href={ctas.primary.href}
                className={styles.navMobilePrimary}
                onClick={() => {
                  trackButtonClick(ctas.primary.label, "navigation", "cta", {
                    button_location: "navbar_mobile",
                    navigation_type: "primary_cta"
                  });
                  if (ctas.primary.href.includes("calendly")) {
                    trackModalOpen("calendly_modal", "navigation_button", {
                      trigger_source: "navbar_mobile_cta"
                    });
                  }
                }}
              >
                {ctas.primary.label}
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>

    {/* Slots Remaining Banner - Below Navbar */}
    {!isImageTestimonialsPage && !isBlogsPage && (
    <div className="w-full bg-[#f5f5f0] border-t border-[rgba(241,241,241,0.2)] py-0.5 px-4 flex items-center justify-center max-[900px]:py-0.5 max-[900px]:px-3 font-['Space_Grotesk',sans-serif]">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-[1400px] w-full max-[900px]:gap-1.5 max-[600px]:flex-col max-[600px]:gap-2">
        {/* Text part - hidden on mobile */}
        <div className="flex items-center gap-2 max-[600px]:hidden">
          <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
            ✱
          </span>
          <span className="font-bold text-[1.1rem] text-black tracking-[0.02em] uppercase max-[900px]:text-[0.85rem] max-[600px]:text-[0.75rem] whitespace-nowrap">
            Hurry up only {slotsRemaining} slots remaining
          </span>
          <span className="text-[#ff4c00] text-[1rem] font-bold leading-none max-[900px]:text-sm max-[600px]:text-[0.7rem]">
            ✱
          </span>
        </div>
        {/* Mobile text part - visible only on mobile */}
        <div className="hidden max-[600px]:flex items-center justify-center gap-1.5 w-full">
          <span className="text-[#ff4c00] text-[0.7rem] font-bold leading-none">
            ✱
          </span>
          <span className="font-bold text-[0.75rem] text-black tracking-[0.02em] uppercase whitespace-nowrap">
            Hurry up only {slotsRemaining} slots remaining
          </span>
          <span className="text-[#ff4c00] text-[0.7rem] font-bold leading-none">
            ✱
          </span>
        </div>
        <div className="flex gap-1 items-center max-[600px]:gap-0.5">
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Days
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Hrs
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Mins
            </div>
          </div>
          <div className="bg-white border border-black rounded-[0.3rem] py-0.5 px-1.5 min-w-[42px] text-center shadow-[0_1px_3px_rgba(255,76,0,0.2),0_3px_1px_#ff4c00] max-[900px]:min-w-[38px] max-[900px]:py-0.5 max-[900px]:px-1.5 max-[600px]:min-w-[35px] max-[600px]:py-0.5 max-[600px]:px-1">
            <div className="font-extrabold text-[0.9rem] text-black leading-[1.1] mb-[0.05rem] max-[900px]:text-[0.85rem] max-[600px]:text-xs">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-[0.55rem] text-black font-medium uppercase tracking-[0.02em] max-[900px]:text-[0.5rem] max-[600px]:text-[0.45rem]">
              Secs
            </div>
          </div>
          <button
            {...getBookNowButtonProps()}
            onClick={openCalendly}
            className="rounded-lg bg-[#ff4c00]   text-white font-semibold py-1.5 px-4 sm:px-5 border-b-4 border-b-black hover:bg-white hover:text-black hover:border-b-[#ff4c00] transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 text-sm sm:text-base ml-3 max-[500px]:ml-2 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
    )}
      </div>
    </>
  );
}






