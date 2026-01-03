"use client"

import { Calendar, ChevronLeft, FileText } from "lucide-react"
import Link from "next/link"
import { FaShieldAlt } from "react-icons/fa"

export default function PrivacyPolicy() {
  return (
    <div className="bg-orange-50/30 min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
     

      {/* Content */}
      <main className="relative">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 text-slate-600 leading-relaxed space-y-12">
          <div className="space-y-4">
              <div className="max-w-4xl mx-auto ">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#ff4c00] hover:opacity-80 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Privacy Policy
              </h1>
              <div className="flex gap-4 text-sm text-gray-500 pt-2">
                <span className="flex  gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ff4c00]" />
                  Updated January 2025
                </span>

              </div>
            </div>
            {/* 1. Introduction */}
            <section className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest mb-2">
                Scope
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1. Introduction & Scope</h2>
              <div className="space-y-4 text-pretty">
                <p>
                  At Flashfire, safeguarding your privacy is fundamental to how we operate. This Privacy Policy explains
                  how we collect, use, process, store, and protect your personal information when you access or use our
                  AI-powered job application automation platform.
                </p>
                <p>By using Flashfire, you acknowledge and agree to the data practices described in this policy.</p>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2. Information We Collect</h2>
              <p className="text-pretty">
                We collect only the information that is reasonably required to deliver our services efficiently and
                improve your job search outcomes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Full name and contact details",
                      "Educational qualifications",
                      "Resume content and skills",
                      "LinkedIn profile info",
                      "Work authorization status",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Usage & Technical
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Job applications submitted",
                      "Platform usage patterns",
                      "Device and browser info",
                      "IP address logs",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-orange-500 font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Use of Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">3. How We Use Your Information</h2>
              <p>
                Flashfire processes personal data strictly for legitimate business purposes related to service delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Personalized job matches",
                  "Resume optimization",
                  "Automated submissions",
                  "Interview tracking",
                  "Platform reliability",
                  "Customer support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/50 border border-orange-100/50 text-sm font-medium text-slate-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <span className="text-orange-600 text-xs">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">4. Data Security & Protection</h2>
              <div className="bg-[#ff4c00]/10 text-[#ff4c00] p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
                <p className="relative z-10 text-lg leading-relaxed text-pretty">
                  We implement industry-standard security measures including
                  <span className="text-[#ff4c00] font-semibold"> encryption</span>, secure infrastructure, and strict
                  access controls. Personal data is accessible only to authorized personnel on a need-to-know basis.
                </p>
              </div>
            </section>

            {/* 5. Sharing */}
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">5. Information Sharing & Disclosure</h2>
              <p className="text-pretty">
                Flashfire does not sell, rent, or trade your personal data. Information may be disclosed only under the
                following circumstances:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>To employers when submitting job applications</li>
                <li>To trusted third-party service providers</li>
                <li>When required by law or legal process</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            {/* 6. Cookies */}
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">6. Cookies & Tracking Technologies</h2>
              <p className="text-pretty">
                Flashfire uses cookies and similar technologies to improve user experience, analyze usage trends, and
                personalize content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            {/* 7. Retention */}
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">7. Data Retention</h2>
              <p className="text-pretty">
                We retain personal information only for as long as necessary to provide our services, meet legal
                obligations, and maintain platform security.
              </p>
            </section>

            {/* 8. Rights */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">8. Your Rights & Choices</h2>
              <p className="text-pretty">Subject to applicable laws, you may exercise the following rights:</p>
              <ul className="list-disc ml-6 space-y-3">
                <li>Access and review your personal data</li>
                <li>Request corrections or updates</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a portable copy of your data</li>
              </ul>
            </section>

            {/* 9. Compliance */}
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">9. Children’s Privacy</h2>
              <p className="text-pretty">
                Flashfire services are not intended for individuals under the age of 18. We do not knowingly collect
                personal information from minors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">10. International Data Transfers</h2>
              <p className="text-pretty">
                Your information may be processed in countries outside your jurisdiction. All transfers comply with
                applicable data protection regulations and safeguards.
              </p>
            </section>

            {/* 11. Updates */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">11. Policy Updates</h2>
              <p className="text-pretty">
                We may update this Privacy Policy periodically. Any changes will be published on this page along with
                the revised effective date.
              </p>
            </section>

            {/* 12. Contact */}
            <section className="space-y-4 pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">12. Contact Information</h2>
              <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Email Support</p>
                  <p className="text-lg font-semibold text-slate-900">support@flashfirejobs.com</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Official Website</p>
                  <p className="text-lg font-semibold text-slate-900">www.flashfirejobs.com</p>
                </div>
              </div>
            </section>

            {/* Trust Footer */}
            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4 text-orange-500 opacity-50">
                <FaShieldAlt className="w-6 h-6" />
              </div>
              <p className="font-semibold text-slate-900 text-lg">Built on transparency and trust.</p>
              <p className="text-slate-500 mt-1">Your privacy is a responsibility we take seriously.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-10 bg-gradient-to-b from-[#ff4c00] to-[#ff4c00]/60 rounded-full" />
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}