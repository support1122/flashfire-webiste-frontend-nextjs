"use client"

import { FaTimes, FaCheck } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const comparisonItems = [
    {
      title: "ATS-Friendly Resume Optimization",
      caption:
        "Resumes tailored to each job description with ATS-friendly keywords",
    },
    {
      title: "Time Efficiency in Job Search",
      caption: "150+ hours saved through AI-powered automation",
    },
    {
      title: "Accuracy & Attention to Detail",
      caption: "Role-matched applications reviewed by AI + humans",
    },
    {
      title: "Automated Applications",
      caption: "1,200+ smart applications sent strategically — not spam",
    },
    {
      title: "Application Tracking & Proof",
      caption: "Real-time tracking with visible proof and updates",
    },
    {
      title: "Interview Opportunity Rate",
      caption: "Higher interview conversion rates within weeks",
    },
  ]

  return (
    <section
      className="py-20 md:py-28 bg-white"
     
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20 max-w-4xl mx-auto">
          <span className="inline-block rounded-full bg-[#fff0ea] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#ff4c00]">
            Before &amp; After
          </span>

          <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-bold text-black leading-tight">
            Why Flashfire Is a Smarter AI Job Matching Platform
          </h2>

          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-[#555] leading-relaxed">
            Compare how <span className="font-semibold text-black">AI-powered job applications</span>{" "}
            help you get <span className="text-[#ff4c00] font-medium">more interviews.</span>
          </p>
        </div>

        {/* Comparison Card */}
        <div className="rounded-2xl border border-[#f1ddd3] bg-white/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(255,76,0,0.06)] px-5 py-4 sm:px-8 sm:py-6 md:px-10">

          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-3 pb-6 border-b border-[#f1ddd3] text-sm font-semibold">
            <div></div>
            <div className="flex justify-center">
              <span className="rounded-full bg-[#fff0ea] px-4 py-1.5 text-[#ff4c00]">
                Before Flashfire
              </span>
            </div>
            <div className="flex justify-center">
              <span className="rounded-full bg-black px-4 py-1.5 text-white">
                After Flashfire
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#f1ddd3]">

            {comparisonItems.map((item, index) => (
              <div
                key={index}
                className="py-8 md:py-10 transition-colors rounded-xl md:hover:bg-[#fff9f7] md:px-4 md:-mx-4"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-3 items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#555]">
                      {item.caption}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#fff0ea] border border-[#ffcbb3] flex items-center justify-center">
                      <FaTimes className="text-[#ff4c00] text-sm" />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                  <h3 className="text-base font-semibold text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#555]">
                    {item.caption}
                  </p>

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center justify-between bg-[#fff0ea] border border-[#ffcbb3] rounded-md px-4 py-3">
                      <div className="flex items-center gap-2 text-[#ff4c00] text-sm">
                        <FaTimes />
                        <span className="font-medium">Before Flashfire</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-black rounded-md px-4 py-3">
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <FaCheck />
                        <span>With Flashfire</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-black">
            Stop applying blindly. Start getting interviews strategically.
          </p>
        </div>

      </div>
    </section>
  )
}
