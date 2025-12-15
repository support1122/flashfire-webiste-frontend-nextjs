"use client"

import { FaTimes, FaCheck } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const comparisonItems = [
    "ATS-Friendly Resume Optimization",
    "Time Efficiency in Job Search",
    "Accuracy & Attention to Detail",
    "Automated Applications",
    "Application Tracking & Proof",
    "Interview Opportunity Rate",
  ]

  return (
<section className="relative bg-white py-20 font-sans overflow-hidden">
{/* Background grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center font-space-grotesk mb-16 space-y-6 max-w-4xl mx-auto">


          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Transform Your Job Search
            <span className="block mt-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              With Intelligent Automation
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how FLASHFIRE revolutionizes your job application process with
            advanced automation that maximizes interview opportunities.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] w-[85%] mx-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md mb-10 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-4 text-left text-base font-medium text-gray-900 border-r border-gray-300" />
                  <th className="py-4 px-5 text-center text-xl font-semibold text-orange-600 border-r border-gray-300">
                    Before FLASHFIRE
                  </th>
                  <th className="py-4 px-5 text-center text-xl font-semibold text-green-600">
                    After FLASHFIRE
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } border-t border-gray-200`}
                  >
                    <td className="py-4 px-4 text-base font-medium text-gray-900 border-r border-gray-300">
                      {item}
                    </td>

                    <td className="py-4 px-5 text-center border-r border-gray-300">
                      <FaTimes className="text-orange-600 text-2xl mx-auto" />
                    </td>

                    <td className="py-4 px-5 text-center">
                      <div className="w-8 h-8 mx-auto rounded-full bg-green-600 flex items-center justify-center">
                        <FaCheck className="text-white text-sm" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
