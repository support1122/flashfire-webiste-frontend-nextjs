"use client"

import Image from "next/image"

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "For each and every application, your base resume is automatically optimized to the job description with ATS-friendly keywords and skills.",
  },
  {
    title: "Dynamic Resume Optimization",
    description:
      "We build your base resume from scratch and tailor it for each job, making it ATS-friendly and recruiter-visible.",
  },
  {
    title: "LinkedIn Profile Optimization",
    description:
      "We professionally optimize your LinkedIn profile to boost recruiter visibility and align with your job search goals.",
  },
  {
    title: "Precision Targeting",
    description:
      "We only apply to jobs that fit your pay, location, company size, and career goals — and only to jobs posted in the last 24–48 hours.",
  },
  {
    title: "Lightning Fast Applications",
    description:
      "A dedicated team of 4–5 people handles your job hunt, applying to 1200+ roles in 6–7 weeks. We'll keep you posted with every update in a WhatsApp group made just for you.",
  },
  {
    title: "Dashboard & Analytics",
    description:
      "Access a personalized dashboard to track applications, monitor success rates, and get real-time insights to improve your job search strategy.",
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

export default function Features() {
  const handleGetStarted = () => {
    // You can add navigation or modal trigger here
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showGetMeInterviewModal"))
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Orange Header Bar */}
     

    <section
      id="feature"
        className="relative overflow-hidden bg-[#fffefb] py-16 px-4 font-['Space_Grotesk',sans-serif] sm:px-6 lg:px-8 md:py-24"
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
          {/* Orange gradient backgrounds - positioned relative to this section */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] bg-gradient-to-br from-orange-700/40 via-orange-600/30 to-orange-500/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[40rem] w-[40rem] bg-gradient-to-tr from-orange-700/40 via-orange-600/30 to-orange-500/20 blur-3xl rounded-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {features.map((feature, index) => (
              <article
                key={index}
                className="bg-white border border-orange-200 border-b-4 border-b-orange-500 rounded-lg p-6 text-left shadow-sm"
              >
                <h3 className="mb-3 text-xl font-bold text-[#ff4c00] md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  {feature.description}
            </p>
          </article>
            ))}
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

        {/* CTA Footer */}
        <div className="relative overflow-visible">
          {/* Orange gradient circles at bottom - left and right */}
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[40rem] w-[40rem] bg-gradient-to-tr from-orange-700/40 via-orange-600/30 to-orange-500/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] bg-gradient-to-br from-orange-700/40 via-orange-600/30 to-orange-500/20 blur-3xl rounded-full" />
          
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
