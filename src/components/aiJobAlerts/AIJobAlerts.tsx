"use client";
import { 
  Sparkles, ArrowRight, CheckCircle, X, Check, Zap, Target, Clock, Filter, BellRing, Mail, Award
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

// Custom hook for scroll-triggered animations
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

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

  // Scroll animation refs
  const [problemRef, problemVisible] = useScrollAnimation();
  const [benefitsRef, benefitsVisible] = useScrollAnimation();
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [comparisonRef, comparisonVisible] = useScrollAnimation();
  const [whoCanUseRef, whoCanUseVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen font-sans">
      <main className="mt-0">
        {/* Compact Hero - Fits in 90% viewport */}
        <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-[#fff0e6] via-[#fff7f2] to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* LEFT - Compact Content */}
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] font-semibold text-sm">
                  <Sparkles size={14} />
                  AI Job Alerts & Smart Job Notification App
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                  Stop refreshing job boards and{" "}
                  <span className="text-[#ff4c00]">missing opportunities</span>
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed">
                  With our AI job alerts, you receive instant job alerts the moment relevant roles are posted — allowing you to apply before most candidates even see the listing.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Discover jobs faster",
                    "Apply earlier than competitors",
                    "Eliminate irrelevant alerts",
                    "Reduce job search stress",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-[#ff4c00]" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#e04400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5"
                  >
                    {ctaLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                  
                </div>
              </div>

              {/* RIGHT - Compact Visual */}
              <div className="relative lg:pl-8">
                <div className="relative rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                        <BellRing className="w-4 h-4 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Live Job Alerts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { role: "Frontend Engineer — React", score: "94%", time: "2m ago" },
                      { role: "Software Intern — Remote", score: "89%", time: "5m ago" },
                      { role: "Product Manager — AI Team", score: "96%", time: "12m ago" },
                    ].map((job, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2]"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-slate-800">{job.role}</p>
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">NEW</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#ff4c00]">Match: {job.score}</span>
                          <span className="text-xs text-slate-500">{job.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-center">
                    <div>
                      <p className="text-xl font-bold text-slate-900">2.4k</p>
                      <p className="text-xs text-slate-500">Jobs Today</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-[#ff4c00]">98%</p>
                      <p className="text-xs text-slate-500">Match Rate</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">&lt;3s</p>
                      <p className="text-xs text-slate-500">Alert Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section - Scroll Triggered */}
        <section ref={problemRef} className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Why Job Seekers Struggle with <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
              <p className="text-lg text-slate-600 mt-4">
                Most job alert systems are slow, generic, and overloaded with irrelevant listings.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
              <div className={`space-y-4 transition-all duration-700 delay-100 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-lg text-slate-700 font-medium">This leads to:</p>
                <div className="grid gap-3">
                  {[
                    "Delayed notifications",
                    "Spam job emails",
                    "Missed high-fit roles",
                    "Endless filtering",
                    "Application burnout",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-red-50/50 border border-red-100">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`space-y-4 transition-all duration-700 delay-200 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-gradient-to-br from-orange-50 to-[#fff7f2] border-l-4 border-[#ff4c00] p-6 rounded-xl">
                  <p className="text-lg font-semibold text-slate-900 mb-2">
                    Tired of refreshing LinkedIn every hour?
                  </p>
                  <p className="text-slate-700 mb-2">
                    Frustrated to see "500+ applicants" have already applied?
                  </p>
                  <p className="text-slate-600 text-sm">
                    By the time traditional alerts arrive, the opportunity may already be saturated.
                  </p>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                  <p className="font-bold mb-1">The Solution</p>
                  <p className="text-slate-300 text-sm">
                    Our AI job alerts platform solves this using real-time job updates and intelligent filtering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Scroll Triggered */}
        <section ref={benefitsRef} className="bg-[#fff7f2] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Key Benefits <span className="text-[#ff4c00]">at a Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Apply Before the Crowd", desc: "Receive opportunities within seconds." },
                { title: "Never Miss Relevant Jobs", desc: "Precision-based matching engine." },
                { title: "Eliminate Irrelevant Listings", desc: "AI-driven filtering logic." },
                { title: "Reduce Weekly Job Search Time", desc: "Automation replaces manual browsing." },
                { title: "Avoid Application Fatigue", desc: "Apply only to high-fit roles." },
                { title: "Smarter Career Discovery", desc: "Powered by AI-powered career alerts." },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 border border-slate-200 hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-[#ff4c00] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Scroll Triggered */}
        <section ref={howItWorksRef} className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                How Our <span className="text-[#ff4c00]">AI Job Alerts System Works</span>
              </h2>
              <p className="text-slate-600">
                Setting up your alerts takes less than 2 minutes.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: "1", title: "Create Your Career Profile", desc: "Enter your skills, experience, preferred roles, and location preferences." },
                { step: "2", title: "AI Analyzes Your Profile", desc: "Our engine uses intelligent AI job matching to understand your expertise, career direction, and role suitability." },
                { step: "3", title: "Smart Matching Algorithm Filters Jobs", desc: "Applies skills-based filtering, experience alignment, location relevance, and context-aware matching." },
                { step: "4", title: "Receive Instant Job Alerts", desc: "Jobs are delivered via app notifications, email alerts, and SMS alerts (optional) within seconds." },
                { step: "5", title: "Apply Immediately", desc: "Apply before listings get crowded, increase interview probability, and reduce missed opportunities." },
              ].map((item, idx) => (
                <div 
                  key={item.step} 
                  className={`flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ff4c00]/30 transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#ff4c00] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
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

        {/* Features Section - Scroll Triggered */}
        <section ref={featuresRef} className="bg-[#fff7f2] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Notification App</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Real-Time AI Job Alerts",
                "Smart Job Matching Algorithm", 
                "Instant Job Alerts Within Seconds",
                "Personalized Job Recommendations",
                "Advanced Filtering Controls",
                "Multi-Channel Notification Support",
                "Save Jobs & Track Applications",
                "One-Click Apply Integration",
                "Dashboard to Manage Alerts",
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white border border-slate-200 rounded-lg p-5 hover:border-[#ff4c00]/30 hover:shadow-md transition-all duration-500 ${featuresVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <h3 className="text-base font-bold text-slate-900 mb-1 hover:text-[#ff4c00] transition-colors">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table - Scroll Triggered */}
        <section ref={comparisonRef} className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                AI Job Alerts vs <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
            </div>

            <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Traditional */}
              <div className="bg-white rounded-2xl p-6 border-2 border-red-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-red-100">
                  Traditional Job Alerts
                </h3>
                <ul className="space-y-3">
                  {[
                    "Generic email blasts",
                    "Delayed notifications",
                    "Manual filtering required",
                    "Limited customization",
                    "High irrelevant listings",
                    "Static filters",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Job Alerts */}
              <div className="bg-slate-900 rounded-2xl p-6 border-2 border-[#ff4c00] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#ff4c00] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  RECOMMENDED
                </div>
                <h3 className="text-lg font-bold text-white mb-4 pb-3 border-b border-white/20">
                  AI Job Alerts Platform
                </h3>
                <ul className="space-y-3">
                  {[
                    "Personalized job recommendations",
                    "Instant job alerts",
                    "AI-powered job matching",
                    "Smart preference learning",
                    "Precision-based targeting",
                    "Adaptive AI matching",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-white/90">
                      <Check className="h-4 w-4 text-[#ff4c00] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Simple */}
        <section className="bg-[#ff4c00] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">50k+</p>
                <p className="text-white/80 text-sm">Active Users</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">1M+</p>
                <p className="text-white/80 text-sm">Jobs Matched</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">94%</p>
                <p className="text-white/80 text-sm">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">&lt;3s</p>
                <p className="text-white/80 text-sm">Avg. Alert Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use - Scroll Triggered */}
        <section ref={whoCanUseRef} className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${whoCanUseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Who Can Use This <span className="text-[#ff4c00]">Job Notification App?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
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
              ].map((item, idx) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 hover:border-[#ff4c00]/30 transition-all duration-500 ${whoCanUseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Scroll Triggered */}
        <section ref={faqRef} className="bg-[#f9e8e0] py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-10 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-700 delay-200 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {[
                { q: "What are AI job alerts?", a: "AI job alerts use intelligent algorithms to notify you about relevant job openings instantly." },
                { q: "How does a job notification app work?", a: "A job notification app analyzes your skills and preferences to deliver targeted alerts." },
                { q: "Are instant job alerts truly real-time?", a: "Yes. Our instant job alerts trigger immediately after job postings go live." },
                { q: "How accurate are AI job recommendations?", a: "Accuracy improves continuously using AI job matching." },
                { q: "Can I customize my alerts?", a: "Absolutely. Filter by location, salary, remote jobs, and more." },
                { q: "Is this AI job alerts app free to use?", a: "Yes. Flexible access options available." },
                { q: "How quickly will I receive notifications?", a: "Real-time alerts and daily job notifications are available." },
                { q: "Is my data secure?", a: "Yes. Privacy and security are core priorities." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-b border-slate-100 last:border-b-0 transition-colors ${activeFaqIndex === i ? "bg-[#fff7f3]" : "hover:bg-slate-50"}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className={`font-semibold text-base pr-4 ${activeFaqIndex === i ? "text-[#ff4c00]" : "text-slate-900"}`}>
                      {item.q}
                    </span>
                    <span className="text-[#ff4c00] shrink-0">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="px-5 pb-5 text-slate-600 text-sm animate-fadeIn">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#ff4c00] via-[#ff5a1a] to-[#ff7a45] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Get Instant Job Alerts?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Stop missing opportunities. Start applying before the crowd.
            </p>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
              className="inline-flex items-center justify-center rounded-xl bg-white text-[#ff4c00] px-10 py-4 text-base font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg mb-4"
            >
              {ctaLabel}
              <ArrowRight size={18} className="ml-2" />
            </button>
            <p className="text-sm text-white/80">
              Instant setup • No credit card required • Free to start
            </p>
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