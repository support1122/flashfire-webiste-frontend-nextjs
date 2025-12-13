"use client"

import { useState } from "react"
import { FaTimes, FaCheck, FaFileAlt, FaClock, FaCubes, FaThumbsUp, FaShieldAlt } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const [hoveredSide, setHoveredSide] = useState<"before" | "after" | null>(null)

  const beforeItems = [
    {
      icon: FaFileAlt,
      title: "Rejection",
      description: "Non-compliant resumes lead to rejections",
    },
    {
      icon: FaClock,
      title: "Time Wasted",
      description: "Job searching is a time-consuming task",
    },
    {
      icon: FaCubes,
      title: "Fragmented Tools",
      description: "Switching between multiple tools is stressful",
    },
  ]

  const afterItems = [
    {
      icon: FaThumbsUp,
      title: "No More Rejections",
      description: "Instantly create ATS-friendly resumes",
    },
    {
      icon: FaClock,
      title: "Save Time",
      description: "Flashfire's AI tools simplify your job search",
    },
    {
      icon: FaShieldAlt,
      title: "All in One Solution",
      description: "Manage your entire job search in one platform",
    },
  ]

  return (
    <section className="relative bg-white overflow-visible">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-2 text-balance tracking-tight">
            Say goodbye to{" "}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 animate-text-shimmer bg-[length:200%_auto]">
              job search frustration
            </span>
          </h2>
          <p className="text-sm md:text-base text-neutral-600 leading-snug max-w-2xl mx-auto text-pretty">
            Transform your approach from constant rejections to landing opportunities
          </p>
        </div>

        {/* Split Screen Comparison */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-1 rounded-3xl overflow-visible border border-neutral-200 bg-neutral-50/50 backdrop-blur-sm shadow-2xl">
            {/* BEFORE Section */}
            <div
              className={`relative p-4 lg:p-6 transition-all duration-500 ${
                hoveredSide === "after" ? "opacity-40 scale-95" : "opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredSide("before")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent transition-opacity duration-500 ${hoveredSide === "before" ? "opacity-100" : "opacity-0"}`}
              />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-semibold text-rose-600 tracking-wider uppercase">Before</span>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-2 text-balance">The Struggle</h3>
                <p className="text-neutral-600 text-xs mb-4 leading-snug">
                  Navigating the job market without proper tools
                </p>

                {/* Pain Points */}
                <div className="space-y-2.5">
                  {beforeItems.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-white border border-rose-100 rounded-xl p-4 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                          <item.icon className="text-rose-500 text-lg" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-neutral-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-neutral-600 leading-snug">{item.description}</p>
                        </div>
                      </div>

                      {/* Decorative X icon */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-rose-500/50">
                        <FaTimes className="text-white text-[10px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             {/* Center Arrow */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
               <div className="flex items-center justify-center">
                 <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M0 10 L30 10 M30 10 L20 5 M30 10 L20 15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
             </div>

            {/* AFTER Section */}
            <div
              className={`relative p-4 lg:p-6 transition-all duration-500 ${
                hoveredSide === "before" ? "opacity-40 scale-95" : "opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredSide("after")}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-bl from-emerald-50 to-transparent transition-opacity duration-500 ${hoveredSide === "after" ? "opacity-100" : "opacity-0"}`}
              />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">After</span>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-2 text-balance">The Solution</h3>
                <p className="text-neutral-600 text-xs mb-4 leading-snug">
                  AI-powered tools that transform your search
                </p>

                {/* Benefits */}
                <div className="space-y-2.5">
                  {afterItems.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-white border border-emerald-100 rounded-xl p-4 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-x-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                          <item.icon className="text-emerald-600 text-lg" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-neutral-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-neutral-600 leading-snug">{item.description}</p>
                        </div>
                      </div>

                      {/* Decorative Check icon */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-emerald-500/50">
                        <FaCheck className="text-white text-[10px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes text-shimmer {
          to {
            background-position: 200% center;
          }
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-text-shimmer {
          animation: text-shimmer 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
