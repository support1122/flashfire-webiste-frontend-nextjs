"use client";
import { Briefcase, Sparkles, ArrowRight, BellRing, BarChart3, Send, UserPlus, BrainCircuit, UserCircle, Layers, Cpu, SendHorizonal, ChevronRight, Target, User, Brain, Zap, CheckCircle, Clock, Filter, Mail, Smartphone, Bell, TrendingUp, AlertCircle, FileText, Search, Settings, Globe, Shield, X, Check, Award } from "lucide-react";
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

export default function AIJobAlertsPage() {
  const ctaLabel = "Get Started";
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                  <Sparkles size={16} />
                  AI Job Alerts & Smart Job Notification App
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                  Stop refreshing job boards and missing opportunities.
                </h1>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                    With our AI job alerts, you receive instant job alerts the moment relevant roles are posted — allowing you to apply before most candidates even see the listing.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    "Discover jobs faster",
                    "Apply earlier than competitors",
                    "Eliminate irrelevant alerts",
                    "Reduce job search stress",
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
                    onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5"
                  >
                    {ctaLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>

              {/* RIGHT – UNIQUE VISUAL */}
              <div className="relative">
                <div className="rounded-3xl border-2 border-slate-200/50 bg-white p-6 md:p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Live Job Alerts
                    </p>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-800">Frontend Engineer — React</p>
                        <span className="text-xs text-green-600 font-semibold">NEW</span>
                      </div>
                      <div className="text-sm text-orange-600 font-semibold">
                        Match Score: 94%
                      </div>
                      <div className="text-xs text-slate-600 mt-2">Posted 2 minutes ago</div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-slate-800">Software Intern — Remote</p>
                        <span className="text-xs text-green-600 font-semibold">NEW</span>
                      </div>
                      <div className="text-sm text-orange-600 font-semibold">
                        Match Score: 89%
                      </div>
                      <div className="text-xs text-slate-600 mt-2">Posted 5 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Why Job Seekers Struggle */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why Job Seekers Struggle with <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
              <p className="text-lg text-slate-700 mt-4">
                Most job alert systems are slow, generic, and overloaded with irrelevant listings.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-slate-700 mb-6">
                This leads to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Delayed notifications",
                  "Spam job emails",
                  "Missed high-fit roles",
                  "Endless filtering",
                  "Application burnout",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-[#fff7f2] border border-[#ffd6c2]">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] border-l-4 border-[#ff4c00] p-6 rounded-xl mb-6">
                <p className="text-lg font-semibold text-slate-900 mb-3">
                  Tired of refreshing LinkedIn every hour?
                </p>
                <p className="text-base text-slate-700 mb-3">
                  Frustrated to see &quot;500+ applicants&quot; have already applied?
                </p>
                <p className="text-base text-slate-700">
                  By the time traditional alerts arrive, the opportunity may already be saturated.
                </p>
              </div>

              <div className="bg-white border-2 border-[#ff4c00] rounded-xl p-6">
                <p className="text-lg font-bold text-slate-900">
                  Our AI job alerts platform solves this using real-time job updates and intelligent filtering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Key Benefits <span className="text-[#ff4c00]">at a Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Apply Before the Crowd",
                  desc: "Receive opportunities within seconds.",
                },
                {
                  title: "Never Miss Relevant Jobs",
                  desc: "Precision-based matching engine.",
                },
                {
                  title: "Eliminate Irrelevant Listings",
                  desc: "AI-driven filtering logic.",
                },
                {
                  title: "Reduce Weekly Job Search Time",
                  desc: "Automation replaces manual browsing.",
                },
                {
                  title: "Avoid Application Fatigue",
                  desc: "Apply only to high-fit roles.",
                },
                {
                  title: "Smarter Career Discovery",
                  desc: "Powered by AI-powered career alerts.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-5 hover:border-[#ff4c00] transition-colors"
                >
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                How Our <span className="text-[#ff4c00]">AI Job Alerts System Works</span>
              </h2>
              <p className="text-sm text-slate-600">
                Setting up your alerts takes less than 2 minutes.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Create Your Career Profile",
                  desc: "Enter your skills, experience, preferred roles, and location preferences.",
                },
                {
                  step: "2",
                  title: "AI Analyzes Your Profile",
                  desc: "Our engine uses intelligent AI job matching to understand your expertise, career direction, and role suitability.",
                },
                {
                  step: "3",
                  title: "Smart Matching Algorithm Filters Jobs",
                  desc: "Applies skills-based filtering, experience alignment, location relevance, and context-aware matching.",
                },
                {
                  step: "4",
                  title: "Receive Instant Job Alerts",
                  desc: "Jobs are delivered via app notifications, email alerts, and SMS alerts (optional) within seconds.",
                },
                {
                  step: "5",
                  title: "Apply Immediately",
                  desc: "Apply before listings get crowded, increase interview probability, and reduce missed opportunities.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 bg-white border border-slate-200 rounded-lg p-5"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#ff4c00] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Continuous Real-Time Job Tracking */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="bg-[#fff7f2] border border-[#ff4c00] rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Continuous Real-Time Job Tracking
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Our platform scans listings using:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  "Real-time job updates",
                  "Automated job alerts",
                  "Cross-platform monitoring",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1 h-1 rounded-full bg-[#ff4c00]"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Notification Controls & Continuous AI Learning */}
        <section className="bg-[#fff7f2] py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Flexible Notification Controls
                </h3>
                <p className="text-sm text-slate-600 mb-3">Choose your preference:</p>
                <ul className="space-y-2">
                  {[
                    "Daily job notifications",
                    "Real-time alerts",
                    "Hybrid mode",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Continuous AI Learning
                </h3>
                <ul className="space-y-2">
                  {[
                    "Learns preferences",
                    "Refines recommendations",
                    "Improves relevance",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Our AI Job Alerts Deliver Better Results */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Why Our <span className="text-[#ff4c00]">AI Job Alerts Deliver Better Results</span>
              </h2>
              <p className="text-sm text-slate-600">
                Traditional alerts send listings. We deliver a timely competitive advantage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Understand real job relevance",
                "Prioritize speed & accuracy",
                "Eliminate manual filtering",
                "Reduce wasted applications",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#ff4c00] rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Users typically experience:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Faster job discovery",
                  "Better job relevance",
                  "Reduced job search time",
                  "Higher early-application success",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Notification App</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Real-Time AI Job Alerts",
                  desc: "Receive jobs the moment they go live.",
                },
                {
                  title: "Smart Job Matching Algorithm",
                  desc: "Precision-based filtering engine.",
                },
                {
                  title: "Instant Job Alerts Within Seconds",
                  desc: "Eliminate traditional delays.",
                },
                {
                  title: "Personalized Job Recommendations",
                  desc: "Driven by intelligent AI models.",
                },
                {
                  title: "Advanced Filtering Controls",
                  desc: "Refine alerts by location, salary, remote roles, and industry.",
                },
                {
                  title: "Multi-Channel Notification Support",
                  desc: "Push notifications, email alerts, and SMS alerts.",
                },
                {
                  title: "Save Jobs & Track Applications",
                  desc: "Stay organized effortlessly.",
                },
                {
                  title: "One-Click Apply Integration",
                  desc: "Apply faster with minimal friction.",
                },
                {
                  title: "Dashboard to Manage Alerts",
                  desc: "Full control over preferences.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:border-[#ff4c00] transition-colors"
                >
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                AI Job Alerts vs <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Traditional Job Alerts Column */}
              <div className="bg-white border border-red-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b border-red-100">
                  Traditional Job Alerts
                </h3>
                <ul className="space-y-2">
                  {[
                    "Generic email blasts",
                    "Delayed notifications",
                    "Manual filtering required",
                    "Limited customization",
                    "High irrelevant listings",
                    "Static filters",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Job Alerts Column */}
              <div className="bg-white border-2 border-[#ff4c00] rounded-lg p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-3 border-b border-[#ff4c00]/20">
                  AI Job Alerts Platform
                </h3>
                <ul className="space-y-2">
                  {[
                    "Personalized job recommendations",
                    "Instant job alerts",
                    "AI-powered job matching",
                    "Smart preference learning",
                    "Precision-based targeting",
                    "Adaptive AI matching",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00] mt-1.5"></div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-base font-semibold text-slate-900">
                Modern job search requires intelligent automation.
              </p>
            </div>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">Job Notification App?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers & contractors",
                "Executives & senior professionals",
                "International applicants",
                "Tech & non-tech professionals",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#ff4c00] via-[#ff5a1a] to-[#ff7a45] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to Get Instant Job Alerts?
            </h2>
            <p className="text-base text-white/90 mb-8 max-w-xl mx-auto">
              Stop missing opportunities. Start applying before the crowd.
            </p>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
              className="inline-flex items-center justify-center rounded-lg bg-white text-[#ff4c00] px-10 py-4 text-base font-semibold hover:bg-gray-50 transition-colors shadow-lg mb-6"
            >
              {ctaLabel}
              <ArrowRight size={18} className="ml-2" />
            </button>
            <p className="text-sm text-white/80">
              Instant setup • No credit card required • Free to start
            </p>
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
                  q: "What are AI job alerts?",
                  a: "AI job alerts use intelligent algorithms to notify you about relevant job openings instantly.",
                },
                {
                  q: "How does a job notification app work?",
                  a: "A job notification app analyzes your skills and preferences to deliver targeted alerts.",
                },
                {
                  q: "Are instant job alerts truly real-time?",
                  a: "Yes. Our instant job alerts trigger immediately after job postings go live.",
                },
                {
                  q: "How accurate are AI job recommendations?",
                  a: "Accuracy improves continuously using AI job matching.",
                },
                {
                  q: "Can I customize my alerts?",
                  a: "Absolutely. Filter by location, salary, remote jobs, and more.",
                },
                {
                  q: "Is this AI job alerts app free to use?",
                  a: "Yes. Flexible access options available.",
                },
                {
                  q: "How quickly will I receive notifications?",
                  a: "Real-time alerts and daily job notifications are available.",
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

