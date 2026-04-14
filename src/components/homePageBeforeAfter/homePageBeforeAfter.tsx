"use client"

import { FaArrowRight, FaCheck, FaTimes } from "react-icons/fa"

export default function BeforeAfterComparison() {
  const comparisonItems = [
    {
      title: "ATS-Friendly Resume Optimization",
      caption:
        "Resumes are tailored to each opportunity with keyword alignment and cleaner structure.",
      before: "Generic resume with weak ATS matching and limited relevance.",
      after: "Role-specific resume optimized for ATS filters and recruiter review.",
    },
    {
      title: "Time Efficiency in Job Search",
      caption:
        "Automation removes repetitive work so candidates can focus on interviews and preparation.",
      before: "Hours spent searching, editing, and applying manually every week.",
      after: "150+ hours saved through structured automation and guided workflows.",
    },
    {
      title: "Accuracy & Attention to Detail",
      caption:
        "Applications stay aligned with each role instead of being rushed or reused blindly.",
      before: "Missed details, inconsistent quality, and rushed submissions.",
      after: "Role-matched applications reviewed with AI support and human oversight.",
    },
    {
      title: "Automated Applications",
      caption: "Application volume grows without sacrificing targeting or quality.",
      before: "Limited manual applications with inconsistent follow-through.",
      after: "1,200+ targeted applications sent strategically, not as spam.",
    },
    {
      title: "Application Tracking & Proof",
      caption: "Progress stays visible, organized, and easier to trust.",
      before: "Scattered updates across tabs, spreadsheets, and inboxes.",
      after: "Real-time tracking, proof of work, and clearer status visibility.",
    },
    {
      title: "Interview Opportunity Rate",
      caption: "Better-fit applications create stronger interview momentum.",
      before: "Low response rates and unclear reasons for rejection.",
      after: "Higher interview conversion rates within weeks of consistent use.",
    },
  ]

  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      <div className="pointer-events-none absolute left-[-10rem] top-12 h-[28rem] w-[28rem] rounded-full bg-[rgba(245,93,29,0.18)] blur-[140px] opacity-90" />
      <div className="pointer-events-none absolute right-[-10rem] top-12 h-[28rem] w-[28rem] rounded-full bg-[rgba(245,93,29,0.18)] blur-[140px] opacity-90" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-[#ece7e4] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="border-b border-[#ece7e4] px-5 py-10 text-center sm:px-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-[#1f2937] sm:text-4xl md:text-[4.1rem]">
                Why Flashfire Is a Smarter AI Job
                <br />
                Matching Platform
              </h2>

              <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.6] text-[#4b5563] sm:text-lg md:text-[1.15rem]">
                We don&apos;t just apply, <span className="font-semibold">we make you get noticed.</span>{" "}
                Flashfire combines <span className="text-[#ff4c00]">AI precision</span> with{" "}
                <span className="text-[#ff4c00]">human insight</span> to get you interviews that actually convert.
              </p>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 md:px-10 md:py-8">
            <div className="hidden grid-cols-[1.1fr_1fr_1fr] items-center gap-6 border-b border-[#e5e7eb] pb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#6b7280] md:grid">
              <div>What changes</div>
              <div className="rounded-full border border-[#ffd9c7] bg-white px-4 py-2 text-center text-[#ff4c00]">
                Before Flashfire
              </div>
              <div className="rounded-full border border-[#ffd9c7] bg-white px-4 py-2 text-center text-[#d64b00]">
                With Flashfire
              </div>
            </div>

            <div className="mt-2 space-y-4 md:mt-0 md:space-y-0">
              {comparisonItems.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-4 border-b border-[#e5e7eb] py-5 last:border-b-0 md:grid-cols-[1.1fr_1fr_1fr] md:gap-6 md:py-6"
                >
                  <div className="md:pr-4">
                    <h3 className="text-lg font-semibold text-[#02060A]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4b5563] sm:text-[15px]">
                      {item.caption}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d1d5db] bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#ff4c00] md:hidden">
                      <FaTimes className="text-xs text-[#ff4c00]" />
                      Before Flashfire
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ffd9c7] bg-white text-[#ff4c00]">
                        <FaTimes className="text-xs" />
                      </div>
                      <p className="text-sm leading-6 text-[#4b5563]">{item.before}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#d1d5db] bg-white p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#d64b00] md:hidden">
                      <FaCheck className="text-xs text-[#d64b00]" />
                      With Flashfire
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ffd9c7] bg-white text-[#d64b00]">
                        <FaCheck className="text-xs" />
                      </div>
                      <p className="text-sm leading-6 text-[#4b5563]">{item.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-8 rounded-[24px] border border-[#ffd9c7] bg-[linear-gradient(135deg,#fff7f3_0%,#fff1ea_100%)] px-5 py-6 sm:px-6 md:mt-10 md:px-8 md:py-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff4c00]">
                    Strategic job search
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-8 text-[#02060A] sm:text-xl">
                    Stop applying blindly. Build a system that gives you better odds at the right interviews.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#ff4c00] px-4 py-2 text-sm font-medium text-white">
                  Smarter applications
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
