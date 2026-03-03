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
      className="py-28 bg-[#f5f5f4]"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Flashfire Is a Smarter AI Job Matching Platform
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We don’t just apply, we <span className="font-semibold">make you get noticed</span>. 
            Flashfire combines <span className="text-[#ff4c00] font-medium">AI precision</span> 
            with <span className="text-[#ff4c00] font-medium">human insight</span> 
            to get you interviews that actually convert.
          </p>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-3 pb-6 border-b border-gray-300 text-sm font-semibold text-gray-600">
          <div></div>
          <div className="text-center text-[#ff4c00]">
            Before Flashfire
          </div>
          <div className="text-center text-gray-900">
            After Flashfire
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="divide-y divide-gray-300">

          {comparisonItems.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 py-10 items-center"
            >
              {/* Feature */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              {/* Before */}
              <div className="flex justify-center">
                <FaTimes className="text-[#ff4c00] text-lg" />
              </div>

              {/* After */}
              <div className="flex justify-center">
                <div className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center">
                  <FaCheck className="text-gray-900 text-sm" />
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Statement */}
        <div className="text-center mt-24">
          <p className="text-xl font-semibold text-gray-900">
            Stop applying blindly. Start getting interviews strategically.
          </p>
        </div>

      </div>
    </section>
  )
}