"use client"

import Link from "next/link"
import {
  CreditCard,
  ChevronLeft,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export default function PaymentPolicy() {
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
                Payment Policy
              </h1>
              <div className="flex gap-4 text-sm text-gray-500 pt-2">
                <span className="flex  gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ff4c00]" />
                  Updated July 2025
                </span>

              </div>
            </div>
            
            {/* Intro */}
            <section>
              <p className="text-base leading-7">
                This Payment Policy outlines the terms and conditions for all
                financial transactions related to Flashfire’s AI-powered job
                application automation services. By using our platform, you
                agree to the billing terms specified below.
              </p>
            </section>

            {/* Payment Methods */}
            <section className="space-y-5">
              <SectionHeader title="Payment Methods" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#ff4c00]" />
                    Accepted Methods
                  </h3>
                  <ul className="space-y-2">
                    <li>• Credit & Debit Cards</li>
                    <li>• PayPal & Digital Wallets</li>
                    <li>• Bank Transfers</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#ff4c00]" />
                    Currency
                  </h3>
                  <p>
                    All payments are processed in <strong>USD</strong>.
                    International customers may incur conversion fees from their bank.
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing & Plans */}
            <section className="space-y-5">
              <SectionHeader title="Pricing & Plans" />
              <p>
                Flashfire offers multiple service plans with clearly defined
                application limits, pricing, and deliverables.
              </p>
              <ul className="space-y-2">
                <li>• Ignite Plan – Entry-level automation</li>
                <li>• Professional Plan – Higher application volume</li>
                <li>• Executive Plan – Maximum outreach & priority handling</li>
              </ul>
            </section>

            {/* Free Trial */}
            <section className="space-y-5">
              <SectionHeader title="Free Trial & Conditional Payments" />
              <div className="bg-[#ff4c00]/10 border border-[#ff4c00]/30 p-6 rounded-xl">
                <p>
                  If you receive any interview call during the free trial,
                  you agree to pay a one-time service fee of{" "}
                  <strong>$50 per interview</strong> within 7 days.
                </p>
              </div>
            </section>

            {/* Support */}
            <section className="pt-8 text-center border-t border-[#ff4c00]/20">
              <p className="text-sm italic text-gray-600 mb-4">
                Questions about billing? We’re here to help.
              </p>
              <p className="font-semibold text-gray-900">
                support@flashfirejobs.com
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}

/* ✅ Section Header (defined properly) */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-10 bg-gradient-to-b from-[#ff4c00] to-[#ff4c00]/60 rounded-full" />
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}
