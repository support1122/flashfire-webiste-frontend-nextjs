"use client";
import { Briefcase, Sparkles, ArrowRight, BellRing, BarChart3, Send, UserPlus, BrainCircuit, UserCircle, Layers, Cpu, SendHorizonal, ChevronRight, Target, User, Brain, Zap } from "lucide-react";
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
  const ctaLabel = "Start Matching";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* Hero */}

        <section className="bg-orange-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                <Sparkles size={16} />
                AI Job Intelligence Platform
              </div>

              <h1 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
                Precision Job Matching
                <span className="block text-orange-600">
                  Powered by Real AI
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Stop applying blindly. Our system understands your skills,
                compares market demand, and delivers jobs where you actually fit.
              </p>

              <button
                type="button"
                onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
                className="mt-10 inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
              >
                {ctaLabel}
                <ArrowRight size={18} />
              </button>
            </div>

            {/* RIGHT – UNIQUE VISUAL */}
            <div className="relative">
              <div className="rounded-3xl border border-orange-200 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3 text-orange-600 font-semibold">
                  <Briefcase size={20} />
                  Live Match Engine
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                    Frontend Engineer — React
                    <div className="text-sm text-orange-600 font-semibold">
                      Match Score: 94%
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                    Software Intern — Remote
                    <div className="text-sm text-orange-600 font-semibold">
                      Match Score: 89%
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* Benefits */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-3xl font-bold text-gray-900 text-center">
              What Makes This Platform Different
            </h2>

            <div className="mt-16 grid md:grid-cols-3 gap-10">

              {/* CARD */}
              <div className="p-8 border-l-4 border-orange-600 rounded-xl bg-orange-50">
                <Cpu className="text-orange-600" size={32} />
                <h3 className="mt-6 text-xl font-semibold">
                  Skill-Based AI Engine
                </h3>
                <p className="mt-3 text-gray-600">
                  Our AI reads your skills semantically, not just keywords,
                  ensuring higher relevance and fewer rejections.
                </p>
              </div>

              <div className="p-8 border-l-4 border-orange-600 rounded-xl bg-orange-50">
                <BellRing className="text-orange-600" size={32} />
                <h3 className="mt-6 text-xl font-semibold">
                  Real-Time Opportunity Alerts
                </h3>
                <p className="mt-3 text-gray-600">
                  Immediate notifications for roles that cross your
                  compatibility threshold.
                </p>
              </div>

              <div className="p-8 border-l-4 border-orange-600 rounded-xl bg-orange-50">
                <BarChart3 className="text-orange-600" size={32} />
                <h3 className="mt-6 text-xl font-semibold">
                  Market Intelligence
                </h3>
                <p className="mt-3 text-gray-600">
                  Visual insights into salary ranges, trending skills,
                  and role demand.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-orange-50 py-32">
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADING + CONTEXT */}
    <div className="max-w-3xl">
      
      <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        An AI System That Turns  
        <span className="block text-orange-600">
          Your Skills Into the Right Job
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Instead of applying everywhere, our platform understands who you are,
        evaluates real market demand, and shows you opportunities where you
        actually stand a chance.
      </p>
    </div>

    {/* FLOW CONTENT */}
    <div className="mt-20 space-y-14">

      {/* ITEM 1 */}
      <div className="flex items-start gap-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-600 text-white shrink-0">
          <User size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            You define your profile once
          </h3>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Share your skills, experience level, and job preferences.
            No repetitive forms — the system keeps learning as you grow.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-orange-200" />

      {/* ITEM 2 */}
      <div className="flex items-start gap-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-600 text-white shrink-0">
          <Brain size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            The AI evaluates real job requirements
          </h3>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Your profile is compared against live job data, required skills,
            and hiring patterns — not just keywords.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-orange-200" />

      {/* ITEM 3 */}
      <div className="flex items-start gap-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-600 text-white shrink-0">
          <Target size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            You apply where your chances are higher
          </h3>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Jobs are ranked by relevance and fit, helping you focus only on
            opportunities that make sense for your profile.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

        {/* HOW IT WORKS SECTION */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How Flashfire&apos;s
                <span className="block text-orange-600">Job Alerts Work</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Set it once. Get matched forever.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "1",
                  title: "Set Your Profile",
                  desc: "Define your skills, experience level, location preferences, and salary range. The system learns your preferences.",
                  icon: <User size={32} className="text-orange-600" />,
                },
                {
                  step: "2",
                  title: "AI Scans Continuously",
                  desc: "Our engine monitors job boards, company sites, and hiring platforms 24/7, matching roles to your profile.",
                  icon: <Brain size={32} className="text-orange-600" />,
                },
                {
                  step: "3",
                  title: "Get Instant Alerts",
                  desc: "When a high-fit role appears, you receive an immediate notification with match score and role details.",
                  icon: <Zap size={32} className="text-orange-600" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative bg-orange-50 rounded-2xl p-8 border-l-4 border-orange-600"
                >
                  <div className="absolute -top-4 left-6 bg-orange-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                    STEP {item.step}
                  </div>
                  <div className="mt-6 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Common Questions
                <span className="block text-[#ff4c00]">About Job Alerts</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "How often will I receive alerts?",
                  a: "You&apos;ll only get alerts for roles that match your profile above a certain threshold. Most users receive 2–5 high-quality alerts per week, depending on their field and market demand.",
                },
                {
                  q: "Can I adjust my alert preferences?",
                  a: "Yes. Update your skills, location, salary range, or experience level anytime. The system immediately adjusts your alerts to match your new preferences.",
                },
                {
                  q: "What makes these alerts different from job board emails?",
                  a: "Flashfire uses semantic AI to understand your skills deeply, not just keywords. You get fewer alerts, but they&apos;re highly relevant and actually worth applying to.",
                },
                {
                  q: "Do I need to pay to receive alerts?",
                  a: "Job alerts are part of Flashfire&apos;s platform. You can set up your profile and start receiving matched opportunities as part of your subscription.",
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

