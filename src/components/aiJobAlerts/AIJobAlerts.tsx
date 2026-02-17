"use client";
import { Briefcase, Sparkles, ArrowRight, BellRing, BarChart3, Send, UserPlus, BrainCircuit, UserCircle, Layers, Cpu, SendHorizonal, ChevronRight, Target, User, Brain, Zap, CheckCircle, Clock, Filter, Mail, Smartphone, Bell, TrendingUp, AlertCircle, FileText, Search, Settings, Globe, Shield, X, Check } from "lucide-react";
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
  const ctaLabel = "Get Instant Job Alerts Now";
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
                  title: "Apply Before the Crowd",
                  desc: "Receive opportunities within seconds.",
                  icon: <Zap className="h-8 w-8" />,
                },
                {
                  title: "Never Miss Relevant Jobs",
                  desc: "Precision-based matching engine.",
                  icon: <Target className="h-8 w-8" />,
                },
                {
                  title: "Eliminate Irrelevant Listings",
                  desc: "AI-driven filtering logic.",
                  icon: <Filter className="h-8 w-8" />,
                },
                {
                  title: "Reduce Weekly Job Search Time",
                  desc: "Automation replaces manual browsing.",
                  icon: <Clock className="h-8 w-8" />,
                },
                {
                  title: "Avoid Application Fatigue",
                  desc: "Apply only to high-fit roles.",
                  icon: <TrendingUp className="h-8 w-8" />,
                },
                {
                  title: "Smarter Career Discovery",
                  desc: "Powered by AI-powered career alerts.",
                  icon: <Brain className="h-8 w-8" />,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#ffd6c2] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#ff4c00] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] flex items-center justify-center text-white mb-4 shadow-md">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-slate-700">
                    {benefit.desc}
                  </p>
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
                How Our <span className="text-[#ff4c00]">AI Job Alerts System Works</span>
              </h2>
              <p className="text-lg text-slate-700">
                Setting up your alerts takes less than 2 minutes.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Create Your Career Profile",
                  desc: "Enter your:",
                  bullets: [
                    "Skills",
                    "Experience",
                    "Preferred roles",
                    "Location preferences",
                  ],
                  note: "This allows our system to generate personalized job recommendations.",
                  icon: <User className="h-8 w-8" />,
                },
                {
                  step: "2",
                  title: "AI Analyzes Your Profile",
                  desc: "Our engine uses intelligent AI job matching to understand:",
                  bullets: [
                    "Your expertise",
                    "Career direction",
                    "Role suitability",
                  ],
                  note: "Delivering smarter, higher-quality matches.",
                  icon: <Brain className="h-8 w-8" />,
                },
                {
                  step: "3",
                  title: "Smart Matching Algorithm Filters Jobs",
                  desc: "Unlike basic alerts, our platform applies:",
                  bullets: [
                    "Skills-based filtering",
                    "Experience alignment",
                    "Location relevance",
                    "Context-aware matching",
                    "Personalized job recommendations",
                  ],
                  note: "Ensuring precision targeting.",
                  icon: <Filter className="h-8 w-8" />,
                },
                {
                  step: "4",
                  title: "Receive Instant Job Alerts",
                  desc: "Jobs are delivered via:",
                  bullets: [
                    "App notifications",
                    "Email alerts",
                    "SMS alerts (optional)",
                  ],
                  note: "These instant job alerts arrive within seconds.",
                  icon: <Bell className="h-8 w-8" />,
                },
                {
                  step: "5",
                  title: "Apply Immediately",
                  desc: "Early applicants often gain a measurable advantage.",
                  bullets: [
                    "Apply before listings get crowded",
                    "Increase interview probability",
                    "Reduce missed opportunities",
                  ],
                  icon: <Send className="h-8 w-8" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8 bg-gradient-to-r from-white to-[#fff7f2] rounded-2xl border-2 border-[#ffd6c2] hover:border-[#ff4c00] transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] flex items-center justify-center text-white shadow-lg">
                      {item.icon}
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-block bg-[#ff4c00] text-white text-sm font-bold px-4 py-1 rounded-full">
                        STEP {item.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-700 mb-3">
                      {item.desc}
                    </p>
                    {item.bullets && (
                      <ul className="space-y-2 mb-3">
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center mt-0.5">
                              <span className="text-[#ff4c00] font-bold text-xs">●</span>
                            </div>
                            <span className="text-base text-slate-700">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.note && (
                      <p className="text-base font-medium text-[#ff4c00] mt-3">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Continuous Real-Time Job Tracking */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-white border-2 border-[#ff4c00] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Continuous Real-Time Job Tracking
              </h3>
              <p className="text-lg text-slate-700 mb-6">
                Our platform scans listings using:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Real-time job updates",
                  "Automated job alerts",
                  "Cross-platform monitoring",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-[#fff7f2] border border-[#ffd6c2]">
                    <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                    <span className="text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Flexible Notification Controls & Continuous AI Learning */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Settings className="h-7 w-7 text-[#ff4c00]" />
                  Flexible Notification Controls
                </h3>
                <p className="text-base text-slate-700 mb-4">Choose your preference:</p>
                <ul className="space-y-3">
                  {[
                    "Daily job notifications",
                    "Real-time alerts",
                    "Hybrid mode",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-base text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Brain className="h-7 w-7 text-[#ff4c00]" />
                  Continuous AI Learning
                </h3>
                <ul className="space-y-3">
                  {[
                    "Learns preferences",
                    "Refines recommendations",
                    "Improves relevance",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                      <span className="text-base text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Our AI Job Alerts Deliver Better Results */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why Our <span className="text-[#ff4c00]">AI Job Alerts Deliver Better Results</span>
              </h2>
              <p className="text-lg text-slate-700">
                Traditional alerts send listings. We deliver a timely competitive advantage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Understand real job relevance",
                "Prioritize speed & accuracy",
                "Eliminate manual filtering",
                "Reduce wasted applications",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-[#ffd6c2] hover:border-[#ff4c00] transition-colors">
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] flex-shrink-0" />
                  <span className="text-base text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-2xl p-8 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Users typically experience:</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Faster job discovery",
                  "Better job relevance",
                  "Reduced job search time",
                  "Higher early-application success",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-base font-medium">{item}</span>
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
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Notification App</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-Time AI Job Alerts",
                  desc: "Receive jobs the moment they go live.",
                  icon: <Bell className="h-8 w-8" />,
                },
                {
                  title: "Smart Job Matching Algorithm",
                  desc: "Precision-based filtering engine.",
                  icon: <Target className="h-8 w-8" />,
                },
                {
                  title: "Instant Job Alerts Within Seconds",
                  desc: "Eliminate traditional delays.",
                  icon: <Zap className="h-8 w-8" />,
                },
                {
                  title: "Personalized Job Recommendations",
                  desc: "Driven by intelligent AI models.",
                  icon: <Brain className="h-8 w-8" />,
                },
                {
                  title: "Advanced Filtering Controls",
                  desc: "Refine alerts by:",
                  bullets: [
                    "Location",
                    "Salary",
                    "Remote roles",
                    "Industry",
                  ],
                  icon: <Filter className="h-8 w-8" />,
                },
                {
                  title: "Multi-Channel Notification Support",
                  desc: "",
                  bullets: [
                    "Push notifications",
                    "Email alerts",
                    "SMS alerts",
                  ],
                  icon: <Smartphone className="h-8 w-8" />,
                },
                {
                  title: "Save Jobs & Track Applications",
                  desc: "Stay organized effortlessly.",
                  icon: <FileText className="h-8 w-8" />,
                },
                {
                  title: "One-Click Apply Integration",
                  desc: "Apply faster with minimal friction.",
                  icon: <Send className="h-8 w-8" />,
                },
                {
                  title: "Dashboard to Manage Alerts",
                  desc: "Full control over preferences.",
                  icon: <BarChart3 className="h-8 w-8" />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-[#ffd6c2] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-[#ff4c00] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff4c00] via-[#ff7a45] to-[#ff4c00] rounded-t-2xl"></div>

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  <div className="flex-grow flex flex-col">
                    {feature.desc && (
                      <p className="text-sm md:text-base text-slate-700 mb-3 leading-relaxed">
                        {feature.desc}
                      </p>
                    )}

                    {feature.bullets && (
                      <ul className="space-y-2.5 mt-2">
                        {feature.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center mt-0.5">
                              <span className="text-[#ff4c00] font-bold text-xs">●</span>
                            </div>
                            <span className="text-sm md:text-base text-slate-700 leading-relaxed flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-slate-700">
                Optimized as one of the Most Efficient AI job search tools
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                AI Job Alerts vs <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
            </div>

            <div className="bg-white border-2 border-[#ffd6c2] rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] text-white">
                      <th className="px-6 py-4 text-left font-bold text-lg">Traditional Job Alerts</th>
                      <th className="px-6 py-4 text-left font-bold text-lg">AI Job Alerts Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Generic email blasts", "Personalized job recommendations"],
                      ["Delayed notifications", "Instant job alerts"],
                      ["Manual filtering required", "AI-powered job matching"],
                      ["Limited customization", "Smart preference learning"],
                      ["High irrelevant listings", "Precision-based targeting"],
                      ["Static filters", "Adaptive AI matching"],
                    ].map(([traditional, ai], index) => (
                      <tr
                        key={index}
                        className={`border-b border-[#ffd6c2] ${index % 2 === 0 ? "bg-white" : "bg-[#fff7f2]"}`}
                      >
                        <td className="px-6 py-4 text-base text-slate-700">
                          <div className="flex items-center gap-3">
                            <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <span>{traditional}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base text-slate-700">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                            <span className="font-medium">{ai}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#fff7f2] border-t-2 border-[#ffd6c2] p-6">
                <p className="text-lg font-bold text-slate-900 text-center">
                  Modern job search requires intelligent automation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Who Can Use This <span className="text-[#ff4c00]">Job Notification App?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-[#ffd6c2] hover:border-[#ff4c00] transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                  <span className="text-base text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Get Instant AI Job Alerts Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Stop missing opportunities. Stop wasting hours searching manually.
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              With our AI job alerts, you can:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {[
                "Discover jobs faster",
                "Apply earlier",
                "Reduce job search fatigue",
                "Gain a competitive advantage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 justify-center">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-base text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
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

