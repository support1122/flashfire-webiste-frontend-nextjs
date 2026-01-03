"use client"

import Link from "next/link"
import { RotateCcw, ChevronLeft, Calendar, FileText, CheckCircle2 } from "lucide-react"

export default function RefundPolicy() {
  return (
    <div className="bg-white min-h-screen  mt-10 pb-16">
           
      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white border border-[#ff4c00]/20 shadow-xl shadow-[#ff4c00]/10 rounded-2xl">
          <div className="p-6 md:p-10 space-y-12 text-gray-700 leading-relaxed">
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
                Refund Policy
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
                At Flashfire, we are committed to your satisfaction and success in finding your dream job. This Refund
                Policy explains our approach to ensuring you receive maximum value from our AI-powered job application
                automation services.
              </p>
            </section>

            {/* No Refund Policy */}
            <section className="space-y-5">
              <SectionHeader title="No Refund Policy" />

              <div className="bg-[#ff4c00]/10 border border-[#ff4c00]/30 p-6 rounded-xl">
                <p>
                  <strong>Important:</strong> Flashfire does not offer monetary refunds for its services. Instead of
                  refunds, we focus on delivering measurable value through high-volume, targeted job applications.
                </p>
              </div>
            </section>

            {/* Premium Plan Guarantee */}
            <section className="space-y-5">
              <SectionHeader title="Premium Plan Guarantee" />

              <div className="bg-[#ff4c00]/10 border border-[#ff4c00]/30 p-6 rounded-xl">
                <p>
                  <strong>Exclusive to Premium Plan users:</strong> If you do not receive any interview calls by the end
                  of your plan period, Flashfire will send an additional 100+ job applications and provide a
                  complimentary resume update at no extra cost.
                </p>
              </div>
            </section>

            {/* Value Guarantee */}
            <section className="space-y-5">
              <SectionHeader title="Value Guarantee" />

              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#ff4c00]" />
                150–200+ Job Applications
              </h3>

              <p>
                In place of refunds, Flashfire guarantees exceptional value through a comprehensive job application
                service that includes:
              </p>

              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="text-[#ff4c00] font-bold">•</span>
                  <span>150–200+ targeted job applications aligned to your profile</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff4c00] font-bold">•</span>
                  <span>Resume optimization and customization for each application</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff4c00] font-bold">•</span>
                  <span>LinkedIn profile enhancement and optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff4c00] font-bold">•</span>
                  <span>Application tracking and progress monitoring</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#ff4c00] font-bold">•</span>
                  <span>Ongoing support throughout your job search journey</span>
                </li>
              </ul>
            </section>

            {/* Service Commitment */}
            <section className="space-y-5">
              <SectionHeader title="Service Commitment" />

              <p>
                Flashfire is committed to delivering maximum value for your investment. Our team carefully crafts and
                submits each application to ensure alignment with your skills, experience, and career goals, maximizing
                your chances of receiving interview opportunities.
              </p>
            </section>

            {/* Policy Modifications */}
            <section className="space-y-5">
              <SectionHeader title="Modifications to This Policy" />

              <p>
                Flashfire reserves the right to modify this Refund Policy at any time. Any updates will be published on
                our website and apply to future transactions. Existing customers will be notified of significant changes
                via email where applicable.
              </p>
            </section>

            {/* Support */}
            <section className="pt-8 text-center border-t border-[#ff4c00]/20">
              <p className="text-sm italic text-gray-600 mb-4">Questions about our services? We're here to help.</p>
              <p className="font-semibold text-gray-900">support@flashfirejobs.com</p>
              <p className="text-sm text-gray-600 mt-2">Response Time: Within 24 business hours</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ✅ Section Header */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-10 bg-gradient-to-b from-[#ff4c00] to-[#ff4c00]/60 rounded-full" />
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}
