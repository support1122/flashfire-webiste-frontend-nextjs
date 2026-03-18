"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { captureUTMParams } from "@/src/utils/UTMUtils";
import { loadFormData } from "@/src/utils/LocalStorageUtils";
import dynamic from "next/dynamic";
import * as fbq from "@/lib/metaPixel";
import * as linkedin from "@/lib/linkedinInsightTag";

// Lazy-load all modal components — they're never visible on first paint
const GeoBlockModal = dynamic(() => import("@/src/components/modals/GeoBlockModal"), { ssr: false });
const GeoBypassSuccessModal = dynamic(() => import("@/src/components/modals/GeoBypassSuccessModal"), { ssr: false });
const SignupModal = dynamic(() => import("@/src/components/signupModal/SignupModal"), { ssr: false });
const CalendlyModal = dynamic(() => import("@/src/components/calendlyModal/CalendlyModal"), { ssr: false });
const StrategyCallCard = dynamic(() => import("@/src/components/schedule-call/StrategyCallCard"), { ssr: false });
const MeetingBookedModal = dynamic(() => import("@/src/components/meetingBooked/MeetingBookedModal"), { ssr: false });

function GlobalModalsContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
    const [isFromIndia, setIsFromIndia] = useState(false);
    const [geoLoading, setGeoLoading] = useState(true);

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showCalendlyModal, setShowCalendlyModal] = useState(false);
    const [showStrategyCallCard, setShowStrategyCallCard] = useState(false);
    const [showMeetingBookedModal, setShowMeetingBookedModal] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = showStrategyCallCard ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showStrategyCallCard]);

    // Track button clicks to force show modal
    const [forceShowModal, setForceShowModal] = useState(false);
    const [forceShowCalendlyModal, setForceShowCalendlyModal] = useState(false);

    // Track geo-block bypass state
    const [geoBypassActive, setGeoBypassActive] = useState(false);
    const [showBypassSuccessModal, setShowBypassSuccessModal] = useState(false);

    // Track which route visit we're on and if modals have been dismissed
    const lastRouteWithModalRef = useRef<string | null>(null);
    const modalDismissedForRouteRef = useRef<string | null>(null);
    const pathnameRef = useRef<string>(pathname);

    // Capture UTM params on mount and when searchParams change
    useEffect(() => {
        captureUTMParams();
    }, [searchParams]);

    // Update pathname ref when pathname changes
    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    // Track Meta Pixel PageView on route changes
    useEffect(() => {
        fbq.pageview();
    }, [pathname, searchParams]);

    // Track LinkedIn Insight Tag PageView on route changes
    useEffect(() => {
        linkedin.pageview();
    }, [pathname, searchParams]);

    // Listen for button click events from anywhere in the app
    useEffect(() => {
        const handleButtonClick = () => {

            setForceShowModal(true);
            // Reset dismissed state so modal can show
            modalDismissedForRouteRef.current = null;
        };

        // Listen for geo-block bypass event (triggered by click-and-hold)
        const handleGeoBypass = () => {
            setGeoBypassActive(true);
            setShowGeoBlockModal(false);
            setShowBypassSuccessModal(true);

            // If on /book-now route, also trigger Calendly modal after bypass
            if (pathnameRef.current === '/book-now') {
                setForceShowCalendlyModal(true);
                modalDismissedForRouteRef.current = null;
            }
        };

        // Listen for bypass success modal show event
        const handleShowBypassSuccess = () => {
            setShowBypassSuccessModal(true);
        };

        // Listen for Calendly modal event
        const handleCalendlyModal = () => {
            setForceShowCalendlyModal(true);
            modalDismissedForRouteRef.current = null;
        };

        const handleStrategyCallCard = () => {
            // Skip StrategyCallCard pop-up and go directly to Calendly modal
            // The useEffect will handle geo-blocking logic
            setForceShowCalendlyModal(true);
            setShowStrategyCallCard(false);
        };

        // Listen for custom events
        window.addEventListener('showGetMeInterviewModal', handleButtonClick);
        window.addEventListener('showCalendlyModal', handleCalendlyModal);
        window.addEventListener('bypassGeoBlock', handleGeoBypass);
        window.addEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
        window.addEventListener('showStrategyCallCard', handleStrategyCallCard);

        return () => {
            window.removeEventListener('showGetMeInterviewModal', handleButtonClick);
            window.removeEventListener('showCalendlyModal', handleCalendlyModal);
            window.removeEventListener('bypassGeoBlock', handleGeoBypass);
            window.removeEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
            window.removeEventListener('showStrategyCallCard', handleStrategyCallCard);
        };
    }, [geoLoading, isFromIndia, geoBypassActive]);

    // Close Calendly modal on browser back (popstate) after pushState navigation
    useEffect(() => {
        const handlePopState = () => {
            const currentPath = window.location.pathname;
            // If user pressed back and URL is no longer a modal route, close modals
            if (
                currentPath !== '/book-a-demo' &&
                currentPath !== '/en-ca/book-a-demo' &&
                currentPath !== '/book-now' &&
                currentPath !== '/en-ca/book-now'
            ) {
                setShowCalendlyModal(false);
                setShowSignupModal(false);
                setShowGeoBlockModal(false);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Detect User Country (Client-side fallback logic)
    useEffect(() => {
        const detectCountry = () => {
            try {
                setGeoLoading(true);
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const language = navigator.language || navigator.languages?.[0];

                let isIndiaDetected = false;

                // Check timezone
                if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
                    isIndiaDetected = true;
                }

                // Check language
                if (language.startsWith('hi') || language.startsWith('bn') || language.startsWith('te') ||
                    language.startsWith('ta') || language.startsWith('gu') || language.startsWith('kn') ||
                    language.startsWith('ml') || language.startsWith('pa') || language.startsWith('or')) {
                    isIndiaDetected = true;
                }

                // Check for test param
                const params = new URLSearchParams(window.location.search);
                if (params.get('test_india') === 'true') {
                    isIndiaDetected = true;
                }

                setIsFromIndia(isIndiaDetected);
            } catch (error) {
                console.error("Geo detection failed:", error);
            } finally {
                setGeoLoading(false);
            }
        };

        detectCountry();
    }, []);

    // Handle Route-based Modals & Geo-Blocking
    useEffect(() => {
        // Check if forceShowCalendlyModal is true FIRST (button clicked from any page) - show modal without navigation
        if (forceShowCalendlyModal) {
            setForceShowCalendlyModal(false); // Reset the flag
            modalDismissedForRouteRef.current = null; // Reset dismissed state

            // Save scroll position before opening modal to prevent scroll-to-top
            const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

            // Check if user is from India - show geo-block modal instead
            if (!geoLoading && isFromIndia && !geoBypassActive) {
                setShowGeoBlockModal(true);
                setShowCalendlyModal(false);
                setShowSignupModal(false);
            } else {
                // Show Calendly modal
                setShowCalendlyModal(true);
                setShowSignupModal(false);
                setShowGeoBlockModal(false);
            }

            // Restore scroll position after modal opens to prevent scroll-to-top
            if (typeof window !== 'undefined' && currentScrollY > 0) {
                requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        setTimeout(() => {
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        }, 100);
                    });
                });
            }

            return;
        }

        // Check if forceShowModal is true (button clicked from any page)
        if (forceShowModal) {
            setForceShowModal(false);
            modalDismissedForRouteRef.current = null;

            const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

            if (!geoLoading && isFromIndia && !geoBypassActive) {
                setShowGeoBlockModal(true);
                setShowCalendlyModal(false);
                setShowSignupModal(false);
            } else {
                loadFormData();
                setShowCalendlyModal(true);
                setShowSignupModal(false);
                setShowGeoBlockModal(false);
            }

            if (typeof window !== 'undefined' && currentScrollY > 0) {
                requestAnimationFrame(() => {
                    window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                    requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        setTimeout(() => {
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        }, 100);
                    });
                });
            }

            return;
        }

        // Don't do anything else while loading geo info
        if (geoLoading) {
            return;
        }

        const isGetMeInterview = pathname === '/get-me-interview';
        const isScheduleCareerCall = pathname === '/schedule-a-free-career-call';
        const isBookMyDemoCall = pathname === '/book-my-demo-call';
        const isBookNow = pathname === '/book-now';
        const isSignup = pathname === '/signup' || pathname.includes('/signup');
        const isBookDemo = pathname === '/book-free-demo' || pathname.includes('/book-free-demo');
        const isMeetingBooked = pathname === '/meeting-booked' || pathname === '/en-ca/meeting-booked';

        // Create a unique identifier for this route visit (includes query params)
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        // Handle /book-now route - show Calendly modal with geo-blocking
        if (isBookNow) {

            if (forceShowCalendlyModal) {
                setForceShowCalendlyModal(false);
                modalDismissedForRouteRef.current = null;

                // Check if user is from India - show geo-block modal instead
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowCalendlyModal(false);
                } else {
                    lastRouteWithModalRef.current = currentRouteKey;
                    setShowCalendlyModal(true);
                }
                return;
            }

            if (lastRouteWithModalRef.current !== currentRouteKey) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }

            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;

            if (!wasDismissed) {
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowCalendlyModal(false);
                } else {
                    setShowCalendlyModal(true);
                }
            }
            return;
        }

        // Show meeting-booked modal on its dedicated route
        if (isMeetingBooked) {
            setShowMeetingBookedModal(true);
        } else {
            setShowMeetingBookedModal(false);
        }

        // Logic for restricted actions (Signup / Booking)
        if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup || isBookDemo) {
            // Check if user has already submitted the form
            const hasSubmitted = typeof window !== "undefined" && localStorage.getItem("submitted") === "true";

            // If forceShowModal is true (button was clicked), always show modal
            if (forceShowModal) {
                setForceShowModal(false);
                modalDismissedForRouteRef.current = null;

                const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        const savedFormData = loadFormData();
                        setShowCalendlyModal(true);
                        setShowSignupModal(false);
                    }
                }

                if (typeof window !== 'undefined' && currentScrollY > 0) {
                    requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        requestAnimationFrame(() => {
                            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                            setTimeout(() => {
                                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                            }, 100);
                        });
                    });
                }

                return;
            }

            // For /get-me-interview, /schedule-a-free-career-call, and /book-my-demo-call routes: only show modal automatically if URL has query params
            if ((isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall) && !searchParams.toString()) {
                return;
            }

            if (lastRouteWithModalRef.current !== currentRouteKey) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }

            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;

            if (!wasDismissed) {
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        const savedFormData = loadFormData();
                        setShowCalendlyModal(true);
                        setShowSignupModal(false);
                    }
                }
            }
        } else {
            if (!showGeoBlockModal && !showCalendlyModal && !showSignupModal) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = null;
            }
        }
    }, [pathname, searchParams, isFromIndia, geoLoading, forceShowModal, forceShowCalendlyModal]);

    // Handle modal close - mark as dismissed for current route and clean URL
    const handleGeoBlockModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowGeoBlockModal(false);

        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleCalendlyModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowCalendlyModal(false);

        if (typeof window !== "undefined" && (pathname === '/book-now' || pathname === '/en-ca/book-now')) {
            const previousPage = sessionStorage.getItem('previousPageBeforeBookNow');
            if (previousPage) {
                sessionStorage.removeItem('previousPageBeforeBookNow');
                router.push(previousPage);
                return;
            }
        }

        if ((pathname === '/book-now' || pathname === '/en-ca/book-now') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleSignupModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowSignupModal(false);

        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    // Only render modals that are actually visible — avoids mounting hidden modal DOM
    const anyModalVisible = showGeoBlockModal || showBypassSuccessModal || showSignupModal || showCalendlyModal || showStrategyCallCard || showMeetingBookedModal;
    if (!anyModalVisible) return null;

    return (
        <>
            {showGeoBlockModal && (
                <GeoBlockModal
                    isVisible={showGeoBlockModal}
                    onClose={handleGeoBlockModalClose}
                    onProvideAnyway={handleGeoBlockModalClose}
                />
            )}
            {showBypassSuccessModal && (
                <GeoBypassSuccessModal
                    isVisible={showBypassSuccessModal}
                    onClose={() => setShowBypassSuccessModal(false)}
                />
            )}
            {showSignupModal && (
                <SignupModal
                    isOpen={showSignupModal}
                    onClose={handleSignupModalClose}
                />
            )}
            {showCalendlyModal && (
                <CalendlyModal
                    isVisible={showCalendlyModal}
                    onClose={handleCalendlyModalClose}
                    user={(() => {
                        if (typeof window !== "undefined") {
                            const savedFormData = loadFormData();
                            return {
                                fullName: savedFormData.fullName || "",
                                email: savedFormData.email || "",
                                phone: savedFormData.phone || "",
                                countryCode: savedFormData.countryCode || "",
                            };
                        }
                        return {
                            fullName: "",
                            email: "",
                            phone: "",
                            countryCode: "",
                        };
                    })()}
                />
            )}
            {showStrategyCallCard && (
                <div
                    className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-8"
                    onClick={() => setShowStrategyCallCard(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <StrategyCallCard onClose={() => setShowStrategyCallCard(false)} />
                    </div>
                </div>
            )}
            {showMeetingBookedModal && (
                <MeetingBookedModal onClose={() => setShowMeetingBookedModal(false)} />
            )}
        </>
    );
}

export default function GlobalModals() {
    return (
        <Suspense fallback={null}>
            <GlobalModalsContent />
        </Suspense>
    );
}
