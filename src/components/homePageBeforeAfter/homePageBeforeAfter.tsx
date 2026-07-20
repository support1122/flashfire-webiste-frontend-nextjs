"use client"

import { FaTimes, FaCheck } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const comparisonItems = [
    {
      title: "Recruiter-Ready Resume",
      caption:
        "Your resume is tailored for every role to improve ATS and recruiter visibility.",
    },
    {
      title: "Save Time",
      caption: "Spend less time applying and more time preparing for interviews.",
    },
    {
      title: "Expert Review",
      caption: "Every application is reviewed to ensure it matches your skills and career goals.",
    },
    {
      title: "Strategic Applications",
      caption: "We apply to 1,200+ carefully selected jobs, not random listings.",
    },
    {
      title: "Complete Application Tracking",
      caption: "Monitor every application with real-time updates and transparent progress.",
    },
    {
      title: "More Interview Opportunities",
      caption: "A smarter job search strategy helps you get interview calls faster.",
    },
  ]

  return (
    <section
      className="py-20 md:py-28 bg-white"
      style={{
        fontFamily: "var(--font-space-grotesk)",
        backgroundImage: "radial-gradient(#d9d9d9 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Job Seekers Choose Flashfire
          </h2>

          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            See how <span className="font-semibold">expert guidance and smart technology</span>{" "}
            help you land <span className="text-[#ff4c00] font-medium">more interviews, faster.</span>
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-3 pb-6 border-b border-gray-300 text-sm font-semibold text-gray-600">
          <div></div>
          <div className="text-center text-[#ff4c00]">
            Without Flashfire
          </div>
          <div className="text-center text-gray-900">
            With Flashfire
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-300">

          {comparisonItems.map((item, index) => (
            <div
              key={index}
              className="py-8 md:py-10"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-3 items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.caption}
                  </p>
                </div>

                <div className="flex justify-center">
                  <FaTimes className="text-[#ff4c00] text-lg" />
                </div>

                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center">
                    <FaCheck className="text-gray-900 text-sm" />
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {item.caption}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3">
                    <div className="flex items-center gap-2 text-[#ff4c00] text-sm">
                      <FaTimes />
                      <span className="font-medium">Without Flashfire</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border border-gray-900 rounded-md px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-900 text-sm font-medium">
                      <FaCheck />
                      <span>With Flashfire</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Line */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
            Stop applying blindly. Start getting interviews strategically.
          </p>
        </div>

      </div>
    </section>
  )
}
