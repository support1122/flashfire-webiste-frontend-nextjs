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
      className="relative bg-white py-20 overflow-hidden"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] max-md:opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 space-y-5 sm:space-y-6 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Why Flashfire Is a Smarter AI Job Search Platform
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2 sm:px-0">
            Experience how FLASHFIRE's advanced AI automation platforms reconstruct your job search by effectively targeting the right jobs and converting applications into real interview opportunities.
          </p>
        </div>

        {/* ======================= */}
        {/* TABLE - DESKTOP & MOBILE */}
        {/* ======================= */}
        <div className="w-full overflow-x-auto px-4 sm:px-0">
          <div className="max-w-6xl mx-auto bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 md:py-5 px-2 md:px-6 text-left text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 w-[50%] sm:w-auto" />
                  <th className="py-2 md:py-5 px-1.5 md:px-6 text-center text-[9px] sm:text-xs md:text-lg font-semibold text-[#ff4c00] border-l border-gray-200 whitespace-nowrap">
                    <span className="hidden sm:inline">Before FLASHFIRE</span>
                    <span className="sm:hidden">Before</span>
                  </th>
                  <th className="py-2 md:py-5 px-1.5 md:px-6 text-center text-[9px] sm:text-xs md:text-lg font-semibold text-green-600 border-l border-gray-200 whitespace-nowrap">
                    <span className="hidden sm:inline">After FLASHFIRE</span>
                    <span className="sm:hidden">After</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200"
                  >
                    {/* Feature */}
                    <td className="py-2 md:py-5 px-2 md:px-6">
                      <div className="text-[11px] sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                        {item.title}
                      </div>
                      <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs md:text-sm text-gray-500 leading-snug">
                        {item.caption}
                      </div>
                    </td>

                    {/* Before */}
                    <td className="py-2 md:py-5 px-1.5 md:px-6 text-center border-l border-gray-200">
                      <FaTimes className="text-[#ff4c00] text-sm sm:text-lg md:text-xl mx-auto" />
                    </td>

                    {/* After */}
                    <td className="py-2 md:py-5 px-1.5 md:px-6 text-center border-l border-gray-200">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto rounded-full bg-green-600 flex items-center justify-center">
                        <FaCheck className="text-white text-[8px] sm:text-xs md:text-sm" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          <div className="mt-6 md:mt-12 text-center max-w-3xl mx-auto px-4">
            <p className="text-xs sm:text-sm md:text-base sm:text-lg font-semibold text-gray-900">
              Stop applying blindly. Start getting interviews strategically.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
