"use client"

import Link from "next/link"
import { FileText, ChevronLeft, Calendar, CheckCircle2 } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen  mt-10 pb-16">
     
      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white border border-[#ff4c00]/20 shadow-xl shadow-[#ff4c00]/10 rounded-2xl">
          <div className="p-6 md:p-10 space-y-10 text-gray-700 leading-relaxed">
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
                Terms of Service
              </h1>
              <div className="flex gap-4 text-sm text-gray-500 pt-2">
                <span className="flex  gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ff4c00]" />
                  Updated January 2025
                </span>

              </div>
            </div>
            {/* Intro */}
            <section>
              <p className="text-base leading-7">
                These Terms of Service ("Terms") govern your access to and use of Flashfire's AI-powered job application
                automation platform, services, and website. By accessing or using Flashfire, you agree to be bound by
                these Terms.
              </p>
            </section>

            {/* Service Description */}
            <section className="space-y-4">
              <SectionHeader title="1. Service Description" />
              <p>
                Flashfire provides automated job application services, resume optimization, and job search assistance
                using artificial intelligence. While we aim to improve job search efficiency, we do not guarantee
                interviews, job offers, or employment outcomes.
              </p>
            </section>

            {/* Eligibility */}
            <section className="space-y-4">
              <SectionHeader title="2. Eligibility" />
              <p>
                You must be at least 18 years old to use Flashfire. By using our services, you confirm that the
                information you provide is accurate and that you are legally permitted to apply for jobs in the regions
                you target.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="space-y-4">
              <SectionHeader title="3. User Responsibilities" />
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                  <span>Provide truthful, accurate, and up-to-date information</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                  <span>Maintain the confidentiality of your account credentials</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                  <span>Use Flashfire only for lawful job search purposes</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4c00] flex-shrink-0 mt-0.5" />
                  <span>Avoid misuse, abuse, or exploitation of automation features</span>
                </div>
              </div>
            </section>

            {/* Account Access */}
            <section className="space-y-4">
              <SectionHeader title="4. Account Access & Termination" />
              <div className="bg-[#ff4c00]/10 border border-[#ff4c00]/30 p-6 rounded-xl">
                <p>
                  Flashfire reserves the right to suspend or terminate accounts that violate these Terms, misuse the
                  platform, or engage in fraudulent or harmful activity, with or without prior notice.
                </p>
              </div>
            </section>

            {/* Payments */}
            <section className="space-y-4">
              <SectionHeader title="5. Payments & Fees" />
              <p>
                All payments for Flashfire services are governed by our Payment Policy. By purchasing any plan, you
                agree to the pricing, billing, and payment obligations outlined therein.
              </p>
            </section>

            {/* Refunds */}
            <section className="space-y-4">
              <SectionHeader title="6. Refund Policy" />
              <p>
                Flashfire does not offer monetary refunds. All refund-related terms are governed by our Refund Policy,
                which focuses on service value rather than financial reimbursement.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <SectionHeader title="7. Intellectual Property" />
              <p>
                All content, branding, software, and intellectual property associated with Flashfire remain the
                exclusive property of Flashfire. You may not copy, distribute, or reverse-engineer any part of the
                platform without written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <SectionHeader title="8. Limitation of Liability" />
              <p>
                Flashfire shall not be liable for indirect, incidental, consequential, or special damages arising from
                your use of the platform, including loss of employment opportunities or data.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="space-y-4">
              <SectionHeader title="9. Disclaimer of Warranties" />
              <p>
                Flashfire services are provided "as is" and "as available" without warranties of any kind, either
                express or implied.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <SectionHeader title="10. Governing Law" />
              <p>
                These Terms shall be governed and interpreted in accordance with the laws of the United States, without
                regard to conflict of law principles.
              </p>
            </section>

            {/* Changes */}
            <section className="space-y-6">
              <SectionHeader title="11. Changes to These Terms" />
              <p>
                Flashfire reserves the right to update these Terms at any time. Continued use of the platform
                constitutes acceptance of the revised Terms.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-10 text-center border-t border-[#ff4c00]/20">
              <p className="text-sm italic text-gray-600 mb-4">Questions about our terms? We're here to help.</p>
              <p className="font-semibold text-gray-900">support@flashfirejobs.com</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

/* Section Header Component */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-10 bg-gradient-to-b from-[#ff4c00] to-[#ff4c00]/60 rounded-full" />
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}
