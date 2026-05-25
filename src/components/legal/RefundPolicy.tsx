"use client";

import Link from "next/link";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <article className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-white px-6 py-10 shadow-[-26px_0_46px_rgba(249,115,22,0.18),0_10px_36px_rgba(15,23,42,0.05)] sm:px-10 lg:px-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[length:520px_auto] bg-center bg-no-repeat opacity-[0.075] bg-[url('/images/character-shape.png')]"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <Link
            href="/"
            className="mb-8 inline-flex text-base font-semibold text-slate-700 transition-colors duration-200 hover:text-black"
          >
            &larr; Back to Home
          </Link>

          <header className="mb-10">
            <h1 className="text-4xl font-black leading-tight text-black sm:text-5xl">
              Refund Policy
            </h1>
            <p className="mt-8 text-xl font-medium text-slate-600">
              Last updated: July 2025
            </p>
          </header>

          <div className="max-w-6xl text-[17px] leading-8 text-black sm:text-[18px] sm:leading-9">
            <p className="mb-10">
              At Flashfire, we are committed to your satisfaction and success in
              finding your dream job. This policy outlines our approach to
              ensuring you receive maximum value from our AI-powered job
              application automation services.
            </p>

            <section className="mb-10">
              <h2 className="mb-5 text-3xl font-black leading-tight text-black">
                No Refund Policy
              </h2>

              <div className="mb-7 border-l-4 border-slate-300 bg-slate-50 px-5 py-4">
                <p>
                  <strong>Important:</strong> We do not offer refunds for our
                  services. However, we ensure you receive exceptional value by
                  providing 150-200+ job applications as part of our commitment
                  to your success.
                </p>
              </div>

              <h3 className="mb-3 text-2xl font-black text-black">
                Premium Plan Guarantee
              </h3>
              <div className="border-l-4 border-slate-300 bg-slate-50 px-5 py-4">
                <p>
                  <strong>Exclusive to Premium Plan users:</strong> If you
                  don&rsquo;t receive any interview calls by the end of your
                  plan period, we will send 100+ additional applications and
                  provide a free resume update at no extra cost.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-3xl font-black leading-tight text-black">
                Value Guarantee
              </h2>

              <h3 className="mb-3 text-2xl font-black text-black">
                150-200+ Job Applications
              </h3>
              <p className="mb-5">
                Instead of refunds, we guarantee that you will receive
                exceptional value through our comprehensive job application
                service:
              </p>
              <ul className="mb-8 list-disc space-y-2 pl-8">
                <li>
                  150-200+ targeted job applications tailored to your profile
                </li>
                <li>
                  Resume optimization and customization for each application
                </li>
                <li>LinkedIn profile enhancement and optimization</li>
                <li>Application tracking and progress monitoring</li>
                <li>Ongoing support throughout your job search journey</li>
              </ul>

              <h3 className="mb-3 text-2xl font-black text-black">
                Service Commitment
              </h3>
              <p>
                We are committed to delivering maximum value for your
                investment. Our team works diligently to ensure you receive
                high-quality, targeted job applications that match your skills,
                experience, and career goals. Every application is carefully
                crafted and submitted to maximize your chances of landing
                interviews.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-3xl font-black leading-tight text-black">
                Modifications to This Policy
              </h2>
              <p>
                Flashfire reserves the right to modify this Refund Policy at any
                time. Changes will be posted on our website and will apply to
                future transactions. Existing customers will be notified of
                significant changes via email.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-3xl font-black leading-tight text-black">
                Contact Information
              </h2>
              <p className="mb-5">
                For questions about our services or this policy, please contact
                us:
              </p>
              <div className="rounded-lg bg-slate-50 px-5 py-4">
                <p>
                  <strong>Email:</strong> support@Flashfirejobs.com
                </p>
                <p>
                  <strong>Response Time:</strong> Within 24 hours during
                  business days
                </p>
              </div>
            </section>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                We value your trust in Flashfire and are committed to ensuring
                your success in finding your dream job. Our focus is on
                delivering exceptional value through our comprehensive job
                application service, ensuring you receive 150-200+ high-quality
                applications tailored to your career goals.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
