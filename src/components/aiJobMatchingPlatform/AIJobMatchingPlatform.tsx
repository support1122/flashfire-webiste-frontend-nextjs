"use client";

import { Target, Sparkles, Users, CheckCircle, Sliders, UserCheck, TrendingUp, FileText, Brain, Zap, Shield, Clock, BarChart3, Search, Filter, AlertCircle, ArrowRight, X } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobMatchingPlatformPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      

      <main className="mt-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT CONTENT */}
      <div className="space-y-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
          AI Job Matching Platform for Personalized Job Recommendations
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
          Stop wasting hours scrolling through irrelevant job listings.
        </p>
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
          Our AI job matching platform uses an advanced job matching algorithm powered by machine learning matching to instantly connect your resume with the most relevant opportunities.
        </p>

        {/* Highlights */}
        <div className="space-y-3 pt-2">
          {[
            "Get real-time personalized job recommendations",
            "Eliminate mismatched applications",
            "Discover better-fit roles faster",
            "Improve interview success probability",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
              </div>
              <span className="text-base md:text-lg text-slate-700 font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
            className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00]"
          >
            Start Matching Jobs Now — Get Instant Results
          </button>
        </div>
      </div>

      {/* RIGHT PREVIEW */}
      <div className="relative">
        <div className="rounded-3xl border-2 border-slate-200/50 bg-white p-6 md:p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              AI Matching Analysis
            </p>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>

          {/* PROFILE SNAPSHOT */}
          <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] p-5 mb-6 shadow-sm">
            <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
              Your Profile
            </p>
            <ul className="text-sm text-slate-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="text-[#ff4c00]">•</span>
                <span>Skills: React, JavaScript, UI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#ff4c00]">•</span>
                <span>Location: United States</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#ff4c00]">•</span>
                <span>Salary: $70k–90k</span>
              </li>
            </ul>
          </div>

          {/* MATCHING SIGNALS */}
          <div className="space-y-3 mb-6">
            {[
              ["Skill Match", "High"],
              ["Location Fit", "Yes"],
              ["Salary Alignment", "Matched"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="text-sm font-medium text-slate-600">{label}</span>
                <span className="px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>

          {/* PRIORITY OUTPUT */}
          <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] p-5">
            <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
              Priority Result
            </p>
            <p className="text-base font-bold text-slate-900 mb-2">
              Frontend Developer — High Fit
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-xs font-bold">
              Recommended to apply
            </span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-orange-200/30 rounded-full blur-2xl"></div>
      </div>

    </div>
  </div>
</section>

        {/* Why Job Seekers Are Frustrated */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Why Job Seekers Are Frustrated with <span className="text-[#ff4c00]">Traditional Job Boards</span>
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                Most job platforms rely on manual keyword searches.
              </p>
              <p className="text-base text-slate-600">
                This leads to:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Hundreds of irrelevant listings",
                "Endless filtering & sorting",
                "Resume-job mismatches",
                "Missed high-fit opportunities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
                  <X className="h-5 w-5 text-red-500 shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] rounded-2xl p-6 border-2 border-[#ffd6c2] text-center">
              <p className="text-base md:text-lg text-slate-700 font-medium">
                In fact, many candidates spend <span className="font-bold text-[#ff4c00]">10+ hours per week</span> searching for jobs with low response rates.
              </p>
              <p className="mt-3 text-base md:text-lg text-slate-700">
                Our <span className="font-semibold text-[#ff4c00]">AI powered job matching platform</span> eliminates this inefficiency using intelligent semantic matching.
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits at a Glance */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Reduce Job Search Time",
                  desc: "Stop manually filtering irrelevant jobs.",
                },
                {
                  title: "Receive Highly Relevant Matches",
                  desc: "Powered by intelligent candidate-job matching",
                },
                {
                  title: "Improve Resume-Job Alignment",
                  desc: "Automatic resume-job alignment optimization.",
                },
                {
                  title: "Eliminate Application Burnout",
                  desc: "Apply only to high-fit roles.",
                },
                {
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  title: "Discover Hidden Opportunities",
                  desc: "AI detects keyword searches miss.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-600">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Our AI Job Matching Platform Works */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                How Our <span className="text-[#ff4c00]">AI Job Matching Platform</span> Works
              </h2>
              <p className="text-lg md:text-xl text-slate-700">
                Finding the right job should feel effortless — and now it does.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {/* STEP 1 */}
              <div className="relative flex gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0 shadow-lg">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    Upload Your Resume or Build Your Profile
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 mb-4">
                    Simply upload your resume or create your career profile.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>No lengthy forms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>No manual data entry stress</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Works seamlessly with your resume builder output</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="relative flex gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0 shadow-lg">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    AI Analyzes Your Skills & Experience
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 mb-4">
                    Our AI job matching system evaluates:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Technical skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Experience depth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Career trajectory</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Role preferences</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-base text-slate-700 font-medium">
                    Delivering deeper resume-job alignment.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="relative flex gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0 shadow-lg">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    AI Scans Thousands of Job Descriptions
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 mb-4">
                    The platform continuously processes listings using:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Semantic matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Skills-based matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Context-aware recruitment</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-base text-slate-700 font-medium">
                    Far beyond static keyword filters.
                  </p>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="relative flex gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0 shadow-lg">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    AI Matches Resume to Job Description
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 mb-4">
                    Our engine performs intelligently: <span className="font-semibold text-[#ff4c00]">AI match resume to a job description</span>
                  </p>
                  <p className="text-base text-slate-700 mb-4">
                    Unlike traditional tools, we leverage:
                  </p>
                  <ul className="space-y-2 text-slate-600 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Semantic matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>AI talent matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Machine learning matching</span>
                    </li>
                  </ul>
                  <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] rounded-lg p-4 border border-[#ffd6c2]">
                    <p className="text-base text-slate-700 font-semibold">
                      This is why users consider it the: <span className="text-[#ff4c00]">Best AI to match a resume to a job description</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 5 */}
              <div className="relative flex gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff4c00] text-white shrink-0 shadow-lg">
                  <span className="text-xl font-bold">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    Get Instant Personalized Job Matches
                  </h3>
                  <p className="text-base md:text-lg text-slate-700 mb-4">
                    Receive real-time:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>AI job recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>High-fit opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                      <span>Smart role prioritization</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-base text-slate-700 font-medium">
                    Powered by predictive job recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Smart Opportunity Ranking */}
            <div className="mt-16 bg-gradient-to-br from-[#fff7f2] to-white rounded-2xl p-8 border-2 border-[#ffd6c2]">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Smart Opportunity Ranking
              </h3>
              <p className="text-lg text-slate-700">
                Each role receives a <span className="font-semibold text-[#ff4c00]">candidate suitability score</span>
              </p>
              <p className="text-base text-slate-600 mt-2">
                Helping you focus on jobs with the highest success probability.
              </p>
            </div>

            {/* Continuous Learning */}
            <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Continuous Learning for Higher Accuracy
              </h3>
              <p className="text-lg text-slate-700 mb-4">
                Our AI job matching engine continuously improves.
              </p>
              <ul className="space-y-2">
                {["Learns preferences", "Refines matching patterns", "Increases relevance"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why This AI Job Matching Platform Delivers Better Results */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Why This AI Job Matching Platform <span className="text-[#ff4c00]">Delivers Better Results</span>
              </h2>
              <p className="text-lg text-slate-700 mb-4">
                Traditional job boards show listings.
              </p>
              <p className="text-lg text-slate-700 font-semibold">
                We deliver intelligent alignment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Understand real job fit — not just keywords",
                "Prioritize roles based on compatibility",
                "Reduce irrelevant applications",
                "Improve decision confidence",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-[#ffd6c2]">
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Users typically experience:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">Faster</div>
                  <div className="text-sm opacity-90">Job discovery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Better</div>
                  <div className="text-sm opacity-90">Candidate-job matching accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Stronger</div>
                  <div className="text-sm opacity-90">Interview alignment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-gradient-to-b from-white via-[#fff7f2] to-white py-24 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Matching Platform</span>
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced AI Job Matching Engine",
                  desc: "Powered by intelligent AI job matching models.",
                  
                },
                {
                  title: "Deep Semantic Resume Analysis",
                  desc: "Leverages semantic matching for contextual understanding.",
                  bullets: [
                    "Detects skill relationships",
                    "Identifies role compatibility",
                    "Eliminates keyword dependency",
                  ],
                  
                },
                {
                  title: "Skills & Experience-Based Matching",
                  desc: "Combines:",
                  bullets: [
                    "Skills-based matching",
                    "Experience depth evaluation",
                    "Career trajectory logic",
                  ],
                  
                },
                {
                  title: "Candidate-Job Compatibility Score",
                  desc: "Each opportunity receives a:",
                  highlight: "candidate suitability score",
                  
                },
                {
                  title: "Intelligent Resume-Job Alignment",
                  desc: "Improves your resume-job alignment automatically.",
                  
                },
                {
                  title: "Real-Time AI Job Recommendations",
                  desc: "Dynamic AI job recommendations updates.",
                  
                },
                {
                  title: "Smart Filters & Personalization",
                  desc: "Refine matches by:",
                  bullets: [
                    "Industry",
                    "Location",
                    "Salary",
                    "Career goals",
                  ],
                  
                },
                {
                  title: "Resume Optimization Insights",
                  desc: "Improve matching strength instantly.",
                  
                },
                {
                  title: "High-Match Opportunity Alerts",
                  desc: "Never miss relevant roles again.",
                  
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-[#ffd6c2] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-[#ff4c00] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Orange accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff4c00] via-[#ff7a45] to-[#ff4c00] rounded-t-2xl"></div>

                 

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Content area - flex-grow to push footer down */}
                  <div className="flex-grow flex flex-col">
                    {/* Description */}
                    <p className="text-sm md:text-base text-slate-700 mb-3 leading-relaxed">
                      {feature.desc}
                    </p>

                    {/* Highlight text */}
                    {feature.highlight && (
                      <div className="mt-2 mb-3 p-3 rounded-lg bg-gradient-to-r from-[#fff7f2] to-orange-50 border border-[#ffd6c2]">
                        <p className="text-sm md:text-base font-semibold text-[#ff4c00]">
                          {feature.highlight}
                        </p>
                      </div>
                    )}

                    {/* Bullets */}
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
          </div>
        </section>


        {/* Why Job Seekers Choose Section */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why Job Seekers Choose Our <span className="text-[#ff4c00]">AI Job Matcher</span>
              </h2>
              <p className="text-lg text-slate-700">
                Job seekers want outcomes — not endless searching.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Save hours of manual filtering",
                "Receive true personalized job recommendations",
                "Reduce irrelevant applications",
                "Improve interview chances",
                "Discover hidden opportunities",
                "Simple, beginner-friendly platform",
                "Secure & confidential resume handling",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-5 flex items-center gap-3 hover:shadow-lg transition"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                AI Job Matching vs <span className="text-[#ff4c00]">Traditional Job Boards</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#ffd6c2]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-left font-bold">Traditional Job Boards</th>
                      <th className="px-6 py-4 text-left font-bold">AI-Powered Job Matching Platform</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        feature: "Search Method",
                        traditional: "Manual keyword search",
                        ai: "Intelligent job matching algorithm",
                      },
                      {
                        feature: "Listings",
                        traditional: "Generic listings",
                        ai: "Personalized job recommendations",
                      },
                      {
                        feature: "Resume Alignment",
                        traditional: "No resume alignment",
                        ai: "AI match resume to a job description",
                      },
                      {
                        feature: "Filtering",
                        traditional: "Time-consuming filtering",
                        ai: "Smart suitability ranking",
                      },
                      {
                        feature: "Personalization",
                        traditional: "Same results for everyone",
                        ai: "Customized AI job recommendations",
                      },
                      {
                        feature: "Relevance",
                        traditional: "Limited relevance scoring",
                        ai: "Context-aware AI-powered job matching",
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                        <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                        <td className="px-6 py-4 text-slate-600">{row.traditional}</td>
                        <td className="px-6 py-4 text-[#ff4c00] font-semibold">{row.ai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use Section */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Who Can Use This <span className="text-[#ff4c00]">AI Job Matching Platform?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Tech specialists",
                "Remote job seekers",
                "Executives & leaders",
                "International applicants",
              ].map((persona) => (
                <div
                  key={persona}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-6 text-center hover:shadow-lg transition hover:-translate-y-1"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{persona}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-br from-[#fff7f2] via-[#fff7f2] to-white py-20 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl text-slate-900 lg:text-5xl font-extrabold mb-6">
              Find the Right Job Faster with <span className="text-[#ff4c00]">AI-Powered Job Matching</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 mb-8">
              Stop relying on outdated job search methods.
            </p>
            <p className="text-base md:text-lg text-slate-700 mb-8">
              With our AI job matching platform, you can:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
              {[
                "Access smarter AI job recommendations",
                "Improve resume-job alignment",
                "Prioritize high-fit opportunities",
                "Reduce job search time dramatically",
                "Apply with confidence",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
              className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-5 text-lg font-semibold text-white hover:bg-[#e24400] transition-all shadow-2xl hover:shadow-[#ff4c00]/50 hover:scale-105 mb-6"
            >
              Start Matching Jobs Now
            </button>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-700">
              <span>• Instant matches</span>
              <span>• No complicated setup</span>
              <span>• Secure & confidential</span>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Frequently Asked
                <span className="block text-[#ff4c00]">Questions</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "What is AI job matching?",
                  a: "AI job matching uses machine learning to intelligently connect candidates with relevant job opportunities.",
                },
                {
                  q: "How does an AI job matching platform work?",
                  a: "An AI job matching platform analyzes resumes and job descriptions to generate personalized matches.",
                },
                {
                  q: "What is a job matching algorithm?",
                  a: "A job matching algorithm evaluates compatibility between candidate profiles and job requirements.",
                },
                {
                  q: "Can AI match my resume accurately?",
                  a: "Yes. Our engine uses semantic matching and machine learning matching.",
                },
                {
                  q: "Is AI job matching better than traditional job boards?",
                  a: "For relevance, efficiency, and alignment — absolutely.",
                },
                {
                  q: "How accurate are personalized job recommendations?",
                  a: "Accuracy improves continuously through machine learning matching.",
                },
                {
                  q: "Is my resume data secure?",
                  a: "Yes. Security and confidentiality are core priorities.",
                },
                {
                  q: "Who should use an AI-powered job matching platform?",
                  a: "Any job seeker who wants faster, smarter, high-relevance job discovery.",
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

