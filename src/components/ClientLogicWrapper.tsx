"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { captureUTMParams } from "@/src/utils/UTMUtils";
import GeoBlockModal from "@/src/components/modals/GeoBlockModal";
import GeoBypassSuccessModal from "@/src/components/modals/GeoBypassSuccessModal";
import SignupModal from "@/src/components/signupModal/SignupModal";
import CalendlyModal from "@/src/components/calendlyModal/CalendlyModal";
import { loadFormData } from "@/src/utils/LocalStorageUtils";
import { scrollToTopInstant } from "@/src/utils/scrollToTop";

function ClientLogicWrapperContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
    const [isFromIndia, setIsFromIndia] = useState(false);
    const [geoLoading, setGeoLoading] = useState(true);

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showCalendlyModal, setShowCalendlyModal] = useState(false);
    
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
    const previousPathnameRef = useRef<string>(pathname);

    // Capture UTM params on mount and when searchParams change
    useEffect(() => {
        captureUTMParams();
    }, [searchParams]);

    // Update pathname ref when pathname changes
    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    // Scroll to top on route change (except for routes that preserve scroll position)
    useEffect(() => {
        // Skip scroll-to-top on initial mount (when previousPathnameRef equals current pathname)
        const isInitialMount = previousPathnameRef.current === pathname;
        
        if (isInitialMount) {
            // Still update the ref for future comparisons
            previousPathnameRef.current = pathname;
            return;
        }

        // Routes where we want to preserve scroll position (e.g., book-now with modal)
        const preserveScrollRoutes = [
            '/book-now', 
            '/en-ca/book-now',
            '/get-me-interview',
            '/en-ca/get-me-interview'
        ];
        const isPreserveScrollRoute = preserveScrollRoutes.some(route => 
            pathname === route || previousPathnameRef.current === route
        );

        // Check if we're preserving scroll position from sessionStorage
        const preserveScrollPosition = typeof window !== 'undefined' && 
            sessionStorage.getItem('preserveScrollPosition');

        // Only scroll to top if:
        // 1. Pathname actually changed (not initial mount)
        // 2. Not a preserve-scroll route
        // 3. No scroll position preservation in sessionStorage
        if (!isPreserveScrollRoute && !preserveScrollPosition) {
            // Scroll to absolute top immediately to ensure promotional banner is fully visible
            scrollToTopInstant();
        } else if (preserveScrollPosition) {
            // If we have a preserved scroll position, we're navigating away from a modal route
            // Clear it so future navigations scroll to top properly
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('preserveScrollPosition');
            }
        }

        // Update previous pathname for next comparison
        previousPathnameRef.current = pathname;
    }, [pathname]);

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

        // Listen for custom events
        window.addEventListener('showGetMeInterviewModal', handleButtonClick);
        window.addEventListener('showCalendlyModal', handleCalendlyModal);
        window.addEventListener('bypassGeoBlock', handleGeoBypass);
        window.addEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
        
        return () => {
            window.removeEventListener('showGetMeInterviewModal', handleButtonClick);
            window.removeEventListener('showCalendlyModal', handleCalendlyModal);
            window.removeEventListener('bypassGeoBlock', handleGeoBypass);
            window.removeEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
        };
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
        // This allows modal to show on features/pricing/how-it-works pages while keeping that page visible
        // IMPORTANT: Check this BEFORE geoLoading check so modal can show immediately
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
            
            return; // Don't process route-based logic when showing modal from button click
        }

        // Check if forceShowModal is true (button clicked from any page) - show modal without navigation
        // This allows modal to show on testimonials page while keeping that page visible
        // IMPORTANT: Check this BEFORE geoLoading check so modal can show immediately
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
            
            // Show modal if it hasn't been dismissed (works for both direct visits and button clicks)
            // This allows the modal to open when visiting /book-now directly from email links
            if (!wasDismissed) {
                // Check if user is from India - show geo-block modal instead
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowCalendlyModal(false);
                } else {
                    setShowCalendlyModal(true);
                }
            }
            return;
        }

        // Logic for restricted actions (Signup / Booking)
        if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup || isBookDemo) {
            // Check if user has already submitted the form
            const hasSubmitted = typeof window !== "undefined" && localStorage.getItem("submitted") === "true";
            
            // If forceShowModal is true (button was clicked), always show modal
            if (forceShowModal) {
                setForceShowModal(false); // Reset the flag
                modalDismissedForRouteRef.current = null; // Reset dismissed state
                
                // Save scroll position before opening modal to prevent scroll-to-top
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
            
            // For /get-me-interview, /schedule-a-free-career-call, and /book-my-demo-call routes: only show modal automatically if URL has query params
            // This prevents modal from showing on refresh when URL is clean (no query params)
            if ((isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall) && !searchParams.toString()) {
                return;
            }
            
            // If navigating to a new route visit (different from last), reset dismissed state
            // This handles the case where user clicks button again after navigating away
            if (lastRouteWithModalRef.current !== currentRouteKey) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }

            // Check if modal was already dismissed for this route visit
            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;

            // Only show modal if it hasn't been dismissed for this route visit
            if (!wasDismissed) {
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    // If not from India, show the appropriate modal for the route
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        const savedFormData = loadFormData();
                        setShowCalendlyModal(true);
                        setShowSignupModal(false);
                    }
                    // Note: Booking modal logic could be added here if needed
                }
            }
        } else {
            // Don't close modals when on other routes - modals can be opened from any page via button click
            // Only reset dismissed state if modals aren't showing (they'll close themselves when user clicks close)
            // This allows modals to stay open when opened from non-modal routes like /image-testimonials
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
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleCalendlyModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowCalendlyModal(false);
        
        // If we came from a specific page (features, pricing, etc.), navigate back to it
        if (typeof window !== "undefined" && (pathname === '/book-now' || pathname === '/en-ca/book-now')) {
            const previousPage = sessionStorage.getItem('previousPageBeforeBookNow');
            if (previousPage) {
                // Clear the stored previous page
                sessionStorage.removeItem('previousPageBeforeBookNow');
                
                // Navigate back to the previous page
                router.push(previousPage);
                return;
            }
        }
        
        // Clean URL by removing query params when on /book-now
        if ((pathname === '/book-now' || pathname === '/en-ca/book-now') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleSignupModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowSignupModal(false);
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };


    return (
        <>
            {children}
            <GeoBlockModal
                isVisible={showGeoBlockModal}
                onClose={handleGeoBlockModalClose}
                onProvideAnyway={handleGeoBlockModalClose}
            />
            <GeoBypassSuccessModal
                isVisible={showBypassSuccessModal}
                onClose={() => setShowBypassSuccessModal(false)}
            />
            <SignupModal
                isOpen={showSignupModal}
                onClose={handleSignupModalClose}
            />
            <CalendlyModal
                isVisible={showCalendlyModal}
                onClose={handleCalendlyModalClose}
                user={(() => {
                    // Load user data from localStorage if available
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
        </>
    );
}

export default function ClientLogicWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<>{children}</>}>
            <ClientLogicWrapperContent>{children}</ClientLogicWrapperContent>
        </Suspense>
    );
}
