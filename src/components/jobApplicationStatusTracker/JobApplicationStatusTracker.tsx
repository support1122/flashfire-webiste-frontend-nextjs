"use client";

import { ListChecks, CalendarCheck, BarChart3, Send, MessageSquare, CalendarClock, CheckCircle, TrendingUp, ArrowRight, Sparkles, X, FileText, Clock, Filter, Tag, Shield, Smartphone, Zap, Target, Brain, Database, Globe } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react"; 

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function JobApplicationStatusTrackerPage() {
  const ctaLabel = "Start Tracking Your Applications Now";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* LEFT */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm border border-orange-200">
                  <ListChecks size={16} />
                  Job Application Status Tracker & Follow-Up Dashboard
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                  Track every job application in one smart dashboard — and never miss a follow-up again.
                </h1>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                    Our job application status tracker helps you track your job application status, manage recruiter interactions, and stay fully organized using a powerful application status dashboard.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    "Eliminate job search chaos",
                    "Never forget recruiter follow-ups",
                    "Stay ahead of interview deadlines",
                    "Take full control of your job search",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <span className="text-base md:text-lg text-slate-700 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5"
                  >
                    {ctaLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>

              {/* RIGHT – APPLICATION TRACKER PREVIEW */}
              <div className="relative">
                <div className="rounded-3xl border-2 border-orange-200/50 bg-white p-6 md:p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-100">
                    <p className="text-sm font-bold text-orange-900 uppercase tracking-wide">
                      Application Status Dashboard
                    </p>
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00] animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-800">Frontend Developer</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-semibold border border-[#ffd6c2]">Interviewing</span>
                      </div>
                      <p className="text-xs text-slate-600">Stripe • Remote</p>
                      <div className="text-xs text-slate-500 mt-2">Applied 3 days ago</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-800">Software Engineer Intern</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold border border-blue-200">Applied</span>
                      </div>
                      <p className="text-xs text-slate-600">Shopify • Canada</p>
                      <div className="text-xs text-slate-500 mt-2">Applied 1 week ago</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-800">UI Engineer</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 font-semibold border border-yellow-200">Follow-up</span>
                      </div>
                      <p className="text-xs text-slate-600">Airbnb • United States</p>
                      <div className="text-xs text-slate-500 mt-2">Follow-up due tomorrow</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why Job Application Tracking Becomes Frustrating */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why Job Application Tracking <span className="text-[#ff4c00]">Becomes Frustrating</span>
              </h2>
              <p className="text-lg text-slate-700 mt-4">
                Applying to multiple jobs without a system quickly becomes overwhelming.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Applied to 50 jobs and forgot which recruiter replied?",
                  "Can't remember which company scheduled your interview?",
                  "Lost track of follow-up emails?",
                  "Tired of messy spreadsheets?",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-[#fff7f2] border border-[#ffd6c2]">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-lg text-slate-700 mb-6 font-medium">
                Manual tracking often leads to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Forgotten follow-ups",
                  "Missed interview opportunities",
                  "Disorganized notes",
                  "Spreadsheet fatigue",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-[#fff7f2] border border-[#ffd6c2]">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] border-l-4 border-[#ff4c00] p-6 rounded-xl mb-6">
                <p className="text-lg font-semibold text-slate-900 mb-3">
                  Many job seekers struggle to track application progress effectively.
                </p>
                <p className="text-base text-slate-700">
                  Our intelligent job application tracker eliminates this stress instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Key Benefits <span className="text-[#ff4c00]">at a Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Track Every Application Without Confusion",
                  desc: "One centralized system replaces spreadsheets.",
                  icon: <ListChecks className="h-8 w-8" />,
                },
                {
                  title: "Never Miss Critical Follow-Ups",
                  desc: "Automated reminders keep you proactive.",
                  icon: <CalendarClock className="h-8 w-8" />,
                },
                {
                  title: "Take Control of Your Job Search",
                  desc: "Complete visibility across all opportunities.",
                  icon: <Target className="h-8 w-8" />,
                },
                {
                  title: "Reduce Job Search Stress",
                  desc: "Know exactly where every application stands.",
                  icon: <Zap className="h-8 w-8" />,
                },
                {
                  title: "Save Hours of Manual Tracking",
                  desc: "Automation handles updates & reminders.",
                  icon: <Clock className="h-8 w-8" />,
                },
                {
                  title: "Stay Fully Organized",
                  desc: "Built for smarter job search organization.",
                  icon: <BarChart3 className="h-8 w-8" />,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-[#ff4c00] rounded-r-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#ff7a45] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff4c00]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4c00]/20 transition-colors">
                      <div className="text-[#ff4c00]">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-slate-700">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                How Our <span className="text-[#ff4c00]">Job Application Status Tracker Works</span>
              </h2>
              <p className="text-lg text-slate-700">
                Setting up your dashboard takes less than 2 minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Add Your Job Details",
                  desc: "Enter essential information:",
                  bullets: [
                    "Company name",
                    "Role",
                    "Application date",
                    "Source",
                  ],
                  note: "Create a structured job application tracker record instantly.",
                  icon: <FileText className="h-7 w-7" />,
                },
                {
                  step: "2",
                  title: "Update Your Application Stage",
                  desc: "Track statuses like:",
                  bullets: [
                    "Applied",
                    "Interview Scheduled",
                    "Offer Received",
                    "Rejected",
                  ],
                  note: "Easily track your job application status with one-click updates.",
                  icon: <ListChecks className="h-7 w-7" />,
                },
                {
                  step: "3",
                  title: "Automate Your Follow-Ups",
                  desc: "Never forget recruiter communication again.",
                  bullets: [
                    "Smart follow-up reminders",
                    "Recruiter interaction tracking",
                    "Interview preparation alerts",
                  ],
                  note: "Perfect for a job application follow-up tracker workflow.",
                  icon: <CalendarClock className="h-7 w-7" />,
                },
                {
                  step: "4",
                  title: "Track Progress Visually",
                  desc: "Your application status dashboard provides:",
                  bullets: [
                    "Clear application stage visibility",
                    "Prioritized opportunity tracking",
                    "Instant track application progress insights",
                  ],
                  icon: <BarChart3 className="h-7 w-7" />,
                },
                {
                  step: "5",
                  title: "Analyze Outcomes & Optimize",
                  desc: "Make smarter decisions using:",
                  bullets: [
                    "Application metrics",
                    "Interview conversion tracking",
                    "Performance insights",
                  ],
                  icon: <TrendingUp className="h-7 w-7" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white rounded-xl border-t-4 border-[#ff4c00] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
                >
                  {/* Step badge */}
                  <div className="absolute top-4 right-4">
                    {/* <div className="w-10 h-10 rounded-lg bg-[#ff4c00] text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {item.step}
                    </div> */}
                  </div>

                  <div className="p-6 pt-8">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-4 border border-[#ff4c00]/20 group-hover:bg-[#ff4c00]/20 transition-colors">
                      <div className="text-[#ff4c00]">{item.icon}</div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 pr-12">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Bullets */}
                    {item.bullets && (
                      <ul className="space-y-2 mb-4">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-4 h-4 rounded-sm bg-[#ff4c00]/10 flex items-center justify-center mt-0.5 border border-[#ff4c00]/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                            </div>
                            <span className="text-sm text-slate-700 leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Note */}
                    {item.note && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs font-semibold text-[#ff4c00] leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-Time Status Updates & Other Features */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-[#ff4c00] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-[#ff4c00]" />
                  Real-Time Status Updates
                </h3>
                <p className="text-base text-slate-700 mb-4">Stay informed with:</p>
                <ul className="space-y-2">
                  {["Real-time status updates", "Live dashboard refresh", "Instant tracking visibility"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-[#ff4c00] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Database className="h-6 w-6 text-[#ff4c00]" />
                  Centralized Job Search Management
                </h3>
                <p className="text-base text-slate-700 mb-4">Manage everything from one centralized job board:</p>
                <ul className="space-y-2">
                  {["No scattered records", "No lost notes", "No tracking confusion"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-[#ff4c00] rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-[#ff4c00]" />
                  Integrated Job Listing Tracking
                </h3>
                <p className="text-base text-slate-700">
                  Track applications across multiple platforms using integrated job listing tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Why This Job Application Tracker Delivers Better Results */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why This <span className="text-[#ff4c00]">Job Application Tracker Delivers Better Results</span>
              </h2>
              <p className="text-lg text-slate-700">
                Spreadsheets track data. We deliver clarity & control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Understand your entire job search instantly",
                "Prevent missed follow-ups",
                "Eliminate tracking errors",
                "Reduce mental overload",
                "Prioritize high-impact applications",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-[#ffd6c2] hover:border-[#ff4c00] transition-colors">
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] flex-shrink-0" />
                  <span className="text-base text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-[#ff4c00] rounded-xl p-8 md:p-10 shadow-xl">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-[#ff4c00]/20">
                <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                  <TrendingUp className="h-6 w-6 text-[#ff4c00]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Users typically experience:</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Faster job search organization",
                  "Reduced follow-up mistakes",
                  "Improved recruiter response probability",
                  "Better interview preparation timing",
                ].map((item, index) => (
                  <div 
                    key={item} 
                    className="flex items-start gap-3 p-4 rounded-lg bg-[#fff7f2] border-l-4 border-[#ff4c00] hover:bg-orange-50 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#ff4c00] flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base font-semibold text-slate-800 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Key Features Designed for <span className="text-[#ff4c00]">Job Search Control</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Centralized Application Status Dashboard",
                  desc: "Monitor every opportunity from one interface.",
                  icon: <BarChart3 className="h-7 w-7" />,
                },
                {
                  title: "Real-Time Application Tracking",
                  desc: "Know exactly where each application stands.",
                  icon: <Clock className="h-7 w-7" />,
                },
                {
                  title: "Automated Follow-Up Reminders",
                  desc: "Eliminate missed recruiter interactions.",
                  icon: <CalendarClock className="h-7 w-7" />,
                },
                {
                  title: "Smart Priority Tagging System",
                  desc: "Organize using:",
                  bullets: [
                    "Priority tagging",
                    "Custom status labels",
                    "Intelligent workflow categorization",
                  ],
                  icon: <Tag className="h-7 w-7" />,
                },
                {
                  title: "Interview Tracking & Scheduling",
                  desc: "Never miss critical deadlines.",
                  icon: <CalendarCheck className="h-7 w-7" />,
                },
                {
                  title: "Structured Recruiter Notes",
                  desc: "Maintain clean communication records.",
                  icon: <MessageSquare className="h-7 w-7" />,
                },
                {
                  title: "Application Analytics & Insights",
                  desc: "Measure performance using:",
                  bullets: [
                    "Application metrics",
                    "Progress tracking",
                    "Outcome evaluation",
                  ],
                  icon: <TrendingUp className="h-7 w-7" />,
                },
                {
                  title: "Cloud-Based Access",
                  desc: "Desktop + Mobile. Anywhere, anytime.",
                  icon: <Smartphone className="h-7 w-7" />,
                },
                {
                  title: "One-Click Status Updates",
                  desc: "Fast, friction-free updates.",
                  icon: <Zap className="h-7 w-7" />,
                },
                {
                  title: "Secure Data Storage",
                  desc: "Your information remains private.",
                  icon: <Shield className="h-7 w-7" />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white border-l-4 border-[#ff4c00] rounded-r-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  {/* Subtle background accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff4c00]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10">
                    {/* Icon with structured design */}
                    <div className="w-12 h-12 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-4 border border-[#ff4c00]/20 group-hover:bg-[#ff4c00]/20 transition-colors">
                      <div className="text-[#ff4c00]">{feature.icon}</div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-tight">
                      {feature.title}
                    </h3>

                    <div className="flex-grow flex flex-col">
                      {feature.desc && (
                        <p className="text-sm md:text-base text-slate-600 mb-3 leading-relaxed">
                          {feature.desc}
                        </p>
                      )}

                      {feature.bullets && (
                        <ul className="space-y-2 mt-2">
                          {feature.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <div className="flex-shrink-0 w-4 h-4 rounded-sm bg-[#ff4c00]/10 flex items-center justify-center mt-0.5 border border-[#ff4c00]/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                              </div>
                              <span className="text-sm md:text-base text-slate-700 leading-relaxed flex-1">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Job Seekers Choose */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why Job Seekers Choose Our <span className="text-[#ff4c00]">Application Status Dashboard</span>
              </h2>
              <p className="text-lg text-slate-700">
                Job seekers want clarity, efficiency, and control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Stay fully organized",
                "Prevent missed follow-ups",
                "Reduce job search stress",
                "Save hours of tracking work",
                "Gain full visibility",
                "Improve recruiter response probability",
                "Easily manage job applications",
                "Designed for complete job search organization",
                "Beginner-friendly interface",
                "Secure & confidential data handling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#fff7f2] border-2 border-[#ffd6c2] hover:border-[#ff4c00] transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                  <span className="text-base text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900">
                Job Application Status Tracker vs <span className="text-[#ff4c00]">Spreadsheets</span>
              </h2>
              <p className="text-lg text-slate-600">
                See the difference between traditional tracking and our smart dashboard
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                      <th className="px-6 py-5 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <X className="h-5 w-5 text-red-500" />
                          </div>
                          <span className="font-bold text-lg text-slate-900">Traditional Spreadsheet Tracking</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                            <CheckCircle className="h-5 w-5 text-[#ff4c00]" />
                          </div>
                          <span className="font-bold text-lg text-slate-900">Our Application Status Dashboard</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Manual updates required", "One-click status updates"],
                      ["No reminders", "Automated follow-up alerts"],
                      ["Limited visualization", "Interactive dashboard view"],
                      ["Easy to forget follow-ups", "Smart reminder notifications"],
                      ["No analytics", "Application performance insights"],
                      ["Disorganized notes", "Structured recruiter tracking"],
                    ].map(([traditional, ours], index) => (
                      <tr
                        key={index}
                        className={`border-b border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                      >
                        <td className="px-6 py-5 text-base text-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                              <X className="h-4 w-4 text-red-500" />
                            </div>
                            <span>{traditional}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-base text-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                              <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                            </div>
                            <span className="font-semibold">{ours}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-6">
                <div className="flex items-center justify-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#ff4c00]" />
                  <p className="text-lg font-bold text-slate-900">
                    Modern job search requires smarter systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">Job Application Tracker?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Designed for job seekers at every stage of their career
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers managing applications",
                "Executives applying confidentially",
                "International applicants",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border-l-4 border-[#ff4c00] shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20 group-hover:bg-[#ff4c00] transition-colors">
                    <CheckCircle className="h-4 w-4 text-[#ff4c00] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Track Your Job Application Status Smarter
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Stop relying on outdated tracking methods.
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              With our job application status tracker, you can:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
              {[
                "Monitor all applications effortlessly",
                "Never miss follow-ups",
                "Stay fully organized",
                "Reduce job search stress",
                "Make smarter decisions",
                "Take full control of your career search",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-base text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
              className="inline-flex items-center justify-center rounded-xl bg-white text-[#ff4c00] px-10 py-4 text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-6"
            >
              {ctaLabel}
              <ArrowRight size={20} className="ml-2" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Instant setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>No complex learning curve</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Secure & private</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                FAQs
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "What is a job application status tracker?",
                  a: "A job application status tracker helps you monitor, organize, and manage job applications efficiently.",
                },
                {
                  q: "How does an application status dashboard work?",
                  a: "An application status dashboard provides visual tracking and updates across all applications.",
                },
                {
                  q: "Can I automate follow-up reminders?",
                  a: "Yes. Our job application follow-up tracker includes smart reminders.",
                },
                {
                  q: "Is this better than Excel or Google Sheets?",
                  a: "Yes. Automation, reminders, analytics, and visualization offer major advantages.",
                },
                {
                  q: "Can I track unlimited applications?",
                  a: "Absolutely.",
                },
                {
                  q: "Is this suitable for freshers?",
                  a: "Yes. Beginner-friendly and intuitive.",
                },
                {
                  q: "Can I access it on mobile?",
                  a: "Yes. Cloud-based cross-device access.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy and security are core priorities.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-b border-gray-200 transition-all ${
                    activeFaqIndex === i ? "bg-[#fff7f3] border-l-4 border-l-[#ff4c00]" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fff7f3] transition-colors"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-lg ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className="text-[#ff4c00] shrink-0 ml-4">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-6 pb-6 text-slate-600 animate-fadeIn">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}} />
    </div>
  );
}

