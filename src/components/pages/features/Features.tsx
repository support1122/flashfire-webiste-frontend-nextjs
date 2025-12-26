"use client"

import { useState, memo, useMemo } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FaPlus, FaTimes, FaWhatsapp, FaBrain, FaFileAlt, FaLinkedin, FaBullseye, FaBolt, FaChartBar } from "react-icons/fa"
import { questionsData } from "@/src/data/questionsData"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import FlashfireLogo from "@/src/components/FlashfireLogo"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"
import { GTagUTM } from "@/src/utils/GTagUTM"

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "For each and every application, your base resume is automatically optimized to the job description with ATS-friendly keywords and skills.",
    icon: FaBrain,
  },
  {
    title: "Dynamic Resume Optimization",
    description:
      "We build your base resume from scratch and tailor it for each job, making it ATS-friendly and recruiter-visible.",
    icon: FaFileAlt,
  },
  {
    title: "LinkedIn Profile Optimization",
    description:
      "We professionally optimize your LinkedIn profile to boost recruiter visibility and align with your job search goals.",
    icon: FaLinkedin,
  },
  {
    title: "Precision Targeting",
    description:
      "We only apply to jobs that fit your pay, location, company size, and career goals — and only to jobs posted in the last 24–48 hours.",
    icon: FaBullseye,
  },
  {
    title: "Lightning Fast Applications",
    description:
      "A dedicated team of 4–5 people handles your job hunt, applying to 1200+ roles in 6–7 weeks. We'll keep you posted with every update in a WhatsApp group made just for you.",
    icon: FaBolt,
  },
  {
    title: "Dashboard & Analytics",
    description:
      "Access a personalized dashboard to track applications, monitor success rates, and get real-time insights to improve your job search strategy.",
    icon: FaChartBar,
  },
]

const steps = [
  {
    id: 1,
    title: "STEP 1",
    subtitle: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
    position: "right",
  },
  {
    id: 2,
    title: "STEP 2",
    subtitle: "We build your winning profile.",
    description:
      "We make your resume from scratch and optimize LinkedIn to match top U.S. recruiter searches. Your profile starts showing up where it matters, on the right screens.",
    image: "/images/step2.png",
    position: "left",
  },
  {
    id: 3,
    title: "STEP 3",
    subtitle: "Flashfire AI applies for you.",
    description:
      "We apply to 1000+ curated roles for you, based on your goals and visa needs. No spam, no mass blasts, only smart, targeted applications.",
    image: "/images/step3.png",
    position: "right",
  },
  {
    id: 4,
    title: "STEP 4",
    subtitle: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
    position: "left",
  },
]

function Features() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  
  // Memoize FAQ data to prevent re-computation
  const faqData = useMemo(() => questionsData.slice(0, 6), [])

  const handleFaqToggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "919817349846"
    const message = encodeURIComponent(
      "Hi! I'm interested in Flashfire's AI-powered job search automation. Can you help me get started?",
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleGetStarted = () => {
    // Track button click
    try {
      trackButtonClick("Get Started Today", "features_cta", "cta", {
        button_location: "features_footer_section",
        section: "features_footer"
      })
      trackSignupIntent("features_cta", {
        signup_source: "features_footer_button",
        funnel_stage: "signup_intent"
      })
    } catch (trackError) {
      console.error('Tracking error:', trackError)
    }

    // Check current path first
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
    const normalizedPath = currentPath.split('?')[0] // Remove query params
    const isOnFeatures = normalizedPath === '/feature' ||
      normalizedPath === '/features' ||
      normalizedPath === '/en-ca/feature' ||
      normalizedPath === '/en-ca/features'
    const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
      normalizedPath === '/en-ca/get-me-interview'

    // If already on the route, save scroll position and prevent navigation
    if (isAlreadyOnGetMeInterview) {
      // Save current scroll position before modal opens
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0

      // Dispatch custom event to force show modal
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'))
      }

      // Restore scroll position immediately after modal opens
      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: 'instant' })
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' })
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' })
          }, 50)
        })
      })

      // Just trigger the modal, don't navigate or scroll
      return
    }

    // Dispatch custom event to force show modal FIRST
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('showGetMeInterviewModal'))
    }

    // If on features page, change URL but keep page content visible
    if (isOnFeatures) {
      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        sessionStorage.setItem('previousPageBeforeGetMeInterview', '/features')
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString())
      }

      // Change URL to /get-me-interview without navigating (keep features page visible)
      const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview'
      router.replace(targetPath)
      // Just trigger the modal, don't navigate
      return
    }

    // Save current scroll position before navigation to preserve it
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY
      sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString())
    }

    // Only navigate if NOT already on the page
    const targetPath = '/get-me-interview'
    router.push(targetPath)
  }

  return (
    <div className="bg-[#f9e8e0] min-h-screen">
      {/* Orange Header Bar */}
      <header className="bg-[#f9e8e0] py-24 mb-24">
  <div className="mx-auto max-w-4xl text-center px-4">

    <h1 className="text-4xl md:text-5xl font-extrabold text-[#ff4c00] mb-6 leading-tight">
      Everything you need to get interviews — automated.
    </h1>

    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
      Flashfire combines{" "}
      <span className="font-semibold text-[#ff4c00]">AI precision</span> and{" "}
      <span className="font-semibold text-[#ff4c00]">human expertise</span>{" "}
      to turn job applications into real interview opportunities.
    </p>

    {/* CTA */}
    <div className="flex justify-center">
      <button
        onClick={() => {
          try {
            const utmSource =
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_source") || "WEBSITE"
                : "WEBSITE";

            const utmMedium =
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_medium") || "LinkedIn_Page"
                : "LinkedIn_Page";

            try {
              GTagUTM({
                eventName: "sign_up_click",
                label: "LinkedIn_Get_Me_Interview_Button",
                utmParams: {
                  utm_source: utmSource,
                  utm_medium: utmMedium,
                  utm_campaign:
                    typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_campaign") || "Website"
                      : "Website",
                },
              });
            } catch {}

            try {
              trackButtonClick("Get Me Interview", "linkedin_cta", "cta", {
                button_location: "features_hero_section",
                section: "features_hero",
              });

              trackSignupIntent("linkedin_cta", {
                signup_source: "features_hero_button",
                funnel_stage: "signup_intent",
              });
            } catch {}

            const currentPath =
              pathname ||
              (typeof window !== "undefined"
                ? window.location.pathname
                : "");

            const normalizedPath = currentPath.split("?")[0];

            if (
              normalizedPath === "/get-me-interview" ||
              normalizedPath === "/en-ca/get-me-interview"
            ) {
              window.dispatchEvent(
                new CustomEvent("showGetMeInterviewModal")
              );
              return;
            }

            // Save current page and scroll position before navigation
            if (typeof window !== "undefined") {
              const currentScrollY = window.scrollY;
              const isOnFeatures = normalizedPath === '/feature' ||
                normalizedPath === '/features' ||
                normalizedPath === '/en-ca/feature' ||
                normalizedPath === '/en-ca/features';
              
              if (isOnFeatures) {
                sessionStorage.setItem('previousPageBeforeGetMeInterview', normalizedPath);
                sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
              }
            }

            window.dispatchEvent(
              new CustomEvent("showGetMeInterviewModal")
            );
            
            const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
            router.push(targetPath);
          } catch {}
        }}
        className="bg-white border-2 border-black px-8 py-4 font-bold text-black text-lg hover:bg-[#f9e8e0] transition-colors rounded-xl inline-flex items-center justify-center"
        style={{ boxShadow: "0 5px 0 0 rgba(245, 93, 29, 1)" }}
      >
        Get Me Interview →
      </button>
    </div>

  </div>
</header>


    <section
      id="feature"
        className="relative overflow-hidden bg-[#f9e8e0] py-16 px-4 font-['Space_Grotesk',sans-serif] sm:px-6 lg:px-8 md:py-24"
      >
        {/* Why Choose Flashfire Section */}
        <header className="relative z-10 mx-auto mb-16 max-w-4xl text-center md:mb-20">
          <h2 className="font-['Satoshi',sans-serif] text-4xl font-extrabold leading-tight tracking-tight text-[#ff4c00] md:text-5xl mb-5">
          Why Choose Flashfire?
        </h2>
          <p className="font-['Satoshi',sans-serif] text-base font-medium leading-relaxed text-gray-700 md:text-xl">
          We don&apos;t just apply, we <strong className="font-bold italic text-gray-900">make you get noticed.</strong>{" "}
            Flashfire combines <span className="text-[#ff4c00] font-semibold">AI precision</span> with{" "}
            <span className="text-[#ff4c00] font-semibold">human insight</span> to get you interviews that actually
          convert.
        </p>
      </header>

        {/* Features Grid - 3 rows x 2 columns */}
        <div className="relative z-10 mx-auto mb-16 max-w-6xl md:mb-20 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <article
                  key={index}
                  className="group bg-white border border-[#ff4c00]/50 border-b-4 border-b-[#ff4c00] rounded-lg p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon Container */}
                  <div className="mb-4 flex items-center justify-start">
                    <div className="bg-gradient-to-br from-[#ff4c00] to-[#ff6b2b] p-3 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                  </div>
                  
                  <h3 className="mb-3 text-xl font-bold text-[#ff4c00] md:text-2xl group-hover:text-[#e24300] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Steps Section - Orange Background */}
        <section className="bg-[#F55E1D] py-16 px-4 sm:px-6 lg:px-8 md:py-24 relative overflow-visible rounded-4xl">
        

          <div className="mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-white text-center mb-4 md:text-5xl">
              From searching to interviewing, just 4 simple steps.
            </h2>
            <p className="text-lg text-white text-center mb-12 md:text-xl max-w-3xl mx-auto">
              We turn your endless job hunt into a smooth, automated path to interview calls. You set the goal, Flashfire takes care of the journey.
            </p>

            <div className="space-y-16 relative overflow-visible">
              {steps.map((step, index) => {
                const nextStep = steps[index + 1]
                // Character center vertical position (mt-6/mt-7 + half character height)
                const charCenterYMobile = 'calc(1.5rem + 32px)' // mt-6 (24px) + half of 64px (32px)
                const charCenterYDesktop = 'calc(1.75rem + 40px)' // mt-7 (28px) + half of 80px (40px)
                
                // Character horizontal positions using exact negative margin values
                // Step 1 & 3: -ml-[62px] means character extends 62px left, center is at -62px + 32px = -30px
                // Step 2 & 4: -mr-[62px] means character extends 62px right, center is at 100% + 62px - 32px = 100% + 30px
                const charLeftPosMobile = '-30px'
                const charLeftPosDesktop = '-40px'
                const charRightPosMobile = 'calc(100% + 30px)'
                const charRightPosDesktop = 'calc(100% + 40px)'
                
                return (
                <div key={step.id} className="relative pb-12 overflow-visible">
                  {/* Connecting lines from current step to next step */}
                  {nextStep && (
                    <>
                      {/* Vertical line down from current character to horizontal connector - Mobile */}
                      <div 
                        className="absolute z-0 max-[768px]:block hidden"
                        style={{
                          left: step.position === "right" ? charLeftPosMobile : charRightPosMobile,
                          top: charCenterYMobile,
                          height: 'calc(100% + 4rem - 3rem - 64px)', // Ends exactly at horizontal line
                          width: '2px',
                          borderLeft: '2px dashed rgba(255, 255, 255, 0.7)',
                        }}
                      />
                      {/* Vertical line down from current character to horizontal connector - Desktop */}
                      <div 
                        className="absolute z-0 hidden md:block"
                        style={{
                          left: step.position === "right" ? charLeftPosDesktop : charRightPosDesktop,
                          top: charCenterYDesktop,
                          height: 'calc(100% + 4rem - 3.5rem - 80px)', // Ends exactly at horizontal line
                          width: '2px',
                          borderLeft: '2px dashed rgba(255, 255, 255, 0.7)',
                        }}
                      />
                      {/* Horizontal connector to next character - Mobile */}
                      {step.position !== nextStep.position && (
                        <div 
                          className="absolute z-0 max-[768px]:block hidden"
                          style={{
                            left: charLeftPosMobile, // Always start from leftmost position
                            width: 'calc(100% + 60px)', // Span from -30px to calc(100% + 30px)
                            top: 'calc(100% + 4rem - 1.5rem - 32px)',
                            height: '2px',
                            borderTop: '2px dashed rgba(255, 255, 255, 0.7)',
                          }}
                        />
                      )}
                      {/* Horizontal connector to next character - Desktop */}
                      {step.position !== nextStep.position && (
                        <div 
                          className="absolute z-0 hidden md:block"
                          style={{
                            left: charLeftPosDesktop, // Always start from leftmost position
                            width: 'calc(100% + 80px)', // Span from -40px to calc(100% + 40px)
                            top: 'calc(100% + 4rem - 1.75rem - 40px)',
                            height: '2px',
                            borderTop: '2px dashed rgba(255, 255, 255, 0.7)',
                          }}
                        />
                      )}
                      {/* Vertical line up from horizontal connector to next character - Mobile */}
                      {step.position !== nextStep.position && (
                        <div 
                          className="absolute z-0 max-[768px]:block hidden"
                          style={{
                            left: nextStep.position === "right" ? charLeftPosMobile : charRightPosMobile,
                            top: 'calc(100% + 4rem - 1.5rem - 32px)',
                            height: 'calc(1.5rem + 32px)', // Up to next character center
                            width: '2px',
                            borderLeft: '2px dashed rgba(255, 255, 255, 0.7)',
                          }}
                        />
                      )}
                      {/* Vertical line up from horizontal connector to next character - Desktop */}
                      {step.position !== nextStep.position && (
                        <div 
                          className="absolute z-0 hidden md:block"
                          style={{
                            left: nextStep.position === "right" ? charLeftPosDesktop : charRightPosDesktop,
                            top: 'calc(100% + 4rem - 1.75rem - 40px)',
                            height: 'calc(1.75rem + 40px)', // Up to next character center
                            width: '2px',
                            borderLeft: '2px dashed rgba(255, 255, 255, 0.7)',
                          }}
                        />
                      )}
                    </>
                  )}
                  <div
                    className={`flex items-center gap-8 ${
                      step.position === "right" ? "flex-row" : "flex-row-reverse"
                    } max-[768px]:flex-col max-[768px]:items-center`}
                  >
                    {/* Text Content */}
                    <div className={`flex-1 text-white ${step.position === "right" ? "text-left" : "text-right"} max-[768px]:text-center max-[768px]:w-full`}>
                      <div className={`flex items-center gap-3 mb-3 ${step.position === "right" ? "justify-start flex-row" : "justify-end flex-row"} max-[768px]:justify-center`}>
                        {step.position === "right" ? (
                          <>
                            {/* Character first for step 1 and 3 */}
                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 mt-6 md:mt-7 -ml-[62px] md:-ml-[80px]">
                              <Image
                                src="/images/character.png"
                                alt="Flashfire character"
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                                loading={index === 0 ? "eager" : "lazy"}
                                priority={index === 0}
                              />
            </div>
                            <h3 className="text-2xl font-bold md:text-3xl">
                              {step.title}
                            </h3>
                          </>
                        ) : (
                          <>
                            {/* Heading first, then character for step 2 and 4 */}
                            <h3 className="text-2xl font-bold md:text-3xl">
                              {step.title}
                            </h3>
                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 mt-6 md:mt-7 -mr-[62px] md:-mr-[80px]">
                              <Image
                                src="/images/character.png"
                                alt="Flashfire character"
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
            </div>
                          </>
                        )}
            </div>
                      <h4 className="text-xl font-semibold mb-4 md:text-2xl">
                        {step.subtitle}
                      </h4>
                      <p className="text-base leading-relaxed md:text-lg">
                        {step.description}
                      </p>
        </div>

                    {/* Icon/Image - Pixel art style with beige background */}
                    <div className="flex-shrink-0">
                      <div className="bg-[#f9f0ec] border border-gray-300 rounded-lg p-4 w-32 h-32 flex items-center justify-center shadow-lg">
                        <Image
                          src={step.image}
                          alt={step.subtitle}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                        />
              </div>
            </div>
              </div>
            </div>
                )
              })}
        </div>
      </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={`${faqStyles.faqSection} relative z-10 py-16 bg-[#f9e8e0]`}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, AI job search can sound complex. Here&apos;s everything explained, plain and simple.
            </p>
          </div>

          <div className={`${faqStyles.faqContainer} text-left !rounded-none`}>
            {faqData.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${activeFaq === index ? faqStyles.active : ""}`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>{activeFaq === index ? <FaTimes /> : <FaPlus />}</span>
                </button>

                {activeFaq === index && (
                  <div className={`${faqStyles.faqAnswer} text-left`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <section className=" mb-20 flex justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-stretch gap-4 bg-[rgba(251,240,235,1)] border border-[#f1e4df] p-3 max-w-[80rem] w-full mx-auto overflow-hidden relative max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:p-8 max-[768px]:p-6 max-[480px]:p-5">
        <div className="flex-1 text-left bg-white p-8 flex flex-col justify-center relative overflow-hidden max-[1024px]:text-center max-[1024px]:p-6 max-[768px]:p-5">
          <h3 className="text-[1.6rem] font-bold text-[#111] mb-3 max-[480px]:text-[1.2rem]">
            Still Confused?
          </h3>
          <p className="text-[#333] text-[1rem] font-bold leading-[1.5] mb-5 max-[480px]:text-[0.9rem]">
            Feel free to post your queries <br /> over our WhatsApp Support.
          </p>
          <button
            type="button"
            className="bg-[#ff4c00] text-white border-0 border-b-[3px] border-b-black py-[0.9rem] px-[1.6rem] font-semibold rounded-[0.5rem] cursor-pointer transition-all duration-300 w-fit z-10 relative shadow-[0_0.2rem_0_#000] hover:bg-[#e24300] hover:border-b-[5px] max-[1024px]:mx-auto"
            onClick={handleWhatsAppClick}
          >
            Connect on WhatsApp
          </button>
          <div className="pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 text-[18rem] text-[rgba(251,240,235,1)] opacity-90 max-[1024px]:hidden">
            <FaWhatsapp />
          </div>
        </div>

        <div className="flex-[1.3] bg-black p-8  flex flex-row justify-between items-start relative overflow-hidden max-[1024px]:w-full max-[1024px]:mt-6 max-[1024px]:text-center max-[768px]:flex-col max-[768px]:items-center max-[768px]:p-6">
          <div className="w-1/2 flex flex-col items-start justify-start text-left max-[1024px]:w-full max-[1024px]:items-center max-[1024px]:text-center">
            <p className="text-[#fffaf8] text-[0.75rem] font-semibold mb-3">
              HELPING 100+ JOB SEEKERS
            </p>
            <blockquote className="text-[1.6rem] font-bold italic text-[#eee] mb-4 leading-tight max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem]">
              "I've seen brilliant people lose hope. Flashfire exists so they
              don't have to."
            </blockquote>
            <div className="flex justify-start items-center gap-4 text-left max-[1024px]:justify-center max-[1024px]:text-center">
              <div>
                <p className="text-[0.95rem] font-semibold text-white">Adit Jain</p>
                <p className="text-[0.8rem] text-[#aaa]">Partner</p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <FlashfireLogo
                    variant="white"
                    width={24}
                    height={24}
                    className="brightness-100"
                  />
                </div>
                <p className="font-semibold text-white">Flashfire</p>
              </div>
            </div>
          </div>

          <div className="relative flex-1 max-w-[60%] h-[13rem] overflow-hidden rounded-[0.5rem] max-[1024px]:static max-[1024px]:w-full max-[1024px]:h-[220px] max-[1024px]:mt-4 max-[1024px]:max-w-full max-[768px]:flex max-[768px]:justify-center max-[768px]:items-center max-[480px]:h-[180px]">
            <Image
              src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/adit-jain.png"
              alt="Adit Jain"
              width={260}
              height={480}
              className="absolute top-[-70%] right-[-9%] h-[300%] w-auto object-contain brightness-100 contrast-105 max-[1024px]:static max-[1024px]:h-full max-[1024px]:w-full max-[1024px]:object-contain max-[1024px]:top-0 max-[1024px]:right-0 max-[768px]:object-cover max-[768px]:scale-110 max-[480px]:object-top"
              loading="lazy"
              unoptimized
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>

        {/* CTA Footer */}
        <div className="relative mt-16 overflow-visible">
          <div className="mx-auto max-w-4xl mt-16 text-center relative z-10">
            <h2 className="text-4xl font-bold text-[#ff4c00] mb-4 md:text-5xl">
              Ready to move from applying to interviewing?
            </h2>
            <p className="text-lg text-gray-700 mb-8 md:text-xl">
              Flashfire bridges the gap with smart automation.
              </p>
              <button
                type="button"
              onClick={handleGetStarted}
              className="bg-white border-t border-l border-r border-black border-b-[4px] border-b-[#ff4c00] rounded-lg px-8 py-4 text-lg font-semibold text-black shadow-[0_3px_0_#000] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#000]"
              >
              Get Started Today
              </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default memo(Features)
