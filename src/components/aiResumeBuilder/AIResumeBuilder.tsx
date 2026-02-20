"use client";

import { CheckCircle, FileText, Sparkles, Briefcase, Target, TrendingUp, Award, BarChart3, Users } from "lucide-react";
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

export default function AIResumeBuilderPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      

      <main className="mt-0">
       
       {/* HERO */}
       <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
          AI Resume Builder for Job Seekers
        </h1>

        <div className="space-y-4">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            Stop wasting hours writing resumes that never get responses.
          </p>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            With our AI resume builder, you can create a recruiter-ready, ATS-optimized resume in minutes — even if you have zero writing experience.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {[
            "Get noticed by recruiters faster",
            "Improve your ATS match score instantly",
            "Turn your experience into powerful achievements",
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
            onClick={() => updateCtaUrl("/ai-resume-builder", "It's Free to Start")}
            className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4c00]"
          >
            It's Free to Start
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative">
        <div className="rounded-3xl border-2 border-slate-200/50 bg-white p-6 md:p-8 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              AI Resume Optimization
            </p>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#fff7f2] to-orange-50 border-2 border-[#ffd6c2] p-5 mb-6 shadow-sm">
            <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">Resume Summary</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Frontend Developer with experience in React, JavaScript,
              and modern UI development.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ["ATS Compatibility", "Optimized"],
              ["Keyword Match", "Strong"],
              ["Role Relevance", "High"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="text-sm font-medium text-slate-600">{label}</span>
                <span className="px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-orange-200/30 rounded-full blur-2xl"></div>
      </div>

    </div>
  </div>
</section>
<section className="bg-white py-20">
  <div className="max-w-6xl mx-auto px-4 md:px-6">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
        Why Job Seekers Switch to Our <span className="text-[#ff4c00]">AI Resume Builder</span>
      </h2>
      <p className="text-lg text-slate-700">
        Tired of sending applications and hearing nothing back?
      </p>
    </div>

    <div className="mb-12">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Most resumes fail because they are:</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          "Poorly formatted",
          "Missing critical keywords",
          "Too generic",
          "Weakly written",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-lg">
            <span className="text-red-500 font-bold">×</span>
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Our resume builder with AI solves these problems automatically:</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "No guesswork",
            desc: "AI analyzes job descriptions and optimizes your resume automatically.",
          },
          {
            title: "No formatting stress",
            desc: "Professional templates that are ATS-friendly and recruiter-ready.",
          },
          {
            title: "No writing struggle",
            desc: "AI writes powerful achievement-driven bullet points for you.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-[#ffd6c2] bg-[#fffaf7] p-6 hover:shadow-lg transition"
          >
            <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
            <p className="text-sm text-slate-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="bg-[#fffaf7] py-24">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-16 text-center mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-slate-900 mb-4">
        How Our <span className="text-[#ff4c00]">AI Resume Builder</span> Works
      </h2>
      <p className="text-lg text-slate-700">
        Creating a job-winning resume has never been this simple.
      </p>
    </div>

    {/* Steps Flow */}
    <div className="relative">
      {/* Connector line (desktop only) */}
      <div className="hidden md:block absolute top-12 left-8 right-8 h-[2px] bg-gradient-to-r from-[#ff4c00] via-[#ff7a45] to-[#ff4c00]" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 relative">
        {/* STEP 1 */}
        <div className="relative bg-white border-2 border-[#ff4c00] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            1
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Enter Your Basic Details</h3>
            <p className="text-sm text-slate-700 mb-3">Add your:</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• Education</li>
              <li>• Experience</li>
              <li>• Skills</li>
              <li>• Certifications</li>
            </ul>
            <p className="text-xs text-slate-500 italic mt-2">No complicated forms. No confusion.</p>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="relative bg-[#fff7f2] border-2 border-[#ffd6c2] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            2
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">AI Analyzes Your Target Job</h3>
            <p className="text-sm text-slate-700 mb-3">Our smart job description analysis engine scans the role you're applying for. It identifies:</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• Critical career skills/keywords</li>
              <li>• Missing ATS signals</li>
              <li>• Optimization opportunities</li>
            </ul>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="relative bg-white border-2 border-[#ff4c00] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            3
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">AI Writes Your Resume Content</h3>
            <p className="text-sm text-slate-700 mb-3">Struggling to write strong bullet points?</p>
            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-2">
              <p className="text-slate-500 line-through">"Responsible for managing projects."</p>
              <p className="text-[#ff4c00] font-semibold">"Led cross-functional projects improving delivery efficiency by 35%."</p>
            </div>
            <p className="text-xs text-slate-500 italic mt-2">That's the power of an AI resume generator.</p>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="relative bg-[#fff7f2] border-2 border-[#ffd6c2] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            4
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Instant ATS-Optimized Formatting</h3>
            <p className="text-sm text-slate-700 mb-3">Your resume is automatically structured using professional resume templates. Every resume is built for:</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li>• ATS optimization (applicant tracking system)</li>
              <li>• Clean recruiter readability</li>
              <li>• Modern hiring standards</li>
            </ul>
          </div>
        </div>

        {/* STEP 5 */}
        <div className="relative bg-white border-2 border-[#ff4c00] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
            5
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Download & Apply Immediately</h3>
            <p className="text-sm text-slate-700">Export your polished ATS-friendly resume and start applying.</p>
            <p className="text-xs text-slate-500 italic mt-2">No design fixes. No formatting headaches.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

        {/* Real-Time Resume Score Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Real-Time Resume Score & <span className="text-[#ff4c00]">Improvements</span>
              </h2>
              <p className="text-lg text-slate-700">
                Our system continuously evaluates your resume.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Resume strength scoring",
                  desc: "Get instant feedback on your resume's overall quality and competitiveness.",
                  icon: <BarChart3 className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Keyword effectiveness analysis",
                  desc: "See how well your resume matches job descriptions and ATS requirements.",
                  icon: <Target className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Optimization suggestions",
                  desc: "Receive actionable recommendations to improve your resume's performance.",
                  icon: <TrendingUp className="h-8 w-8 text-[#ff4c00]" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-white to-orange-50 border-2 border-[#ffd6c2] rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-700">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-600 font-medium">
              Helping you compete with top candidates.
            </p>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="bg-gradient-to-br from-[#fff7f2] to-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Outcomes You Can <span className="text-[#ff4c00]">Expect</span>
              </h2>
              <p className="text-lg text-slate-700">
                This isn't just another resume maker online.
              </p>
              <p className="text-base text-slate-600 mt-2">
                Job seekers use our professional resume builder to achieve real results:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Create resumes 80% faster",
                "Improve ATS match instantly",
                "Increase recruiter visibility",
                "Reduce resume rejection risk",
                "Apply with confidence",
              ].map((outcome) => (
                <div
                  key={outcome}
                  className="bg-white border-2 border-[#ff4c00] rounded-xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="font-semibold text-slate-900">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Key Benefits of Our <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "Get More Interview Calls",
                  desc: "Optimized resumes rank higher in recruiter searches.",
                },
                {
                  num: "2",
                  title: "Eliminate Resume Guesswork",
                  desc: "AI-driven keyword & content optimization.",
                },
                {
                  num: "3",
                  title: "Write Like a Professional — Instantly",
                  desc: "No writing expertise required.",
                },
                {
                  num: "4",
                  title: "Pass Applicant Tracking Systems",
                  desc: "Built-in ATS optimization (applicant tracking system).",
                },
                {
                  num: "5",
                  title: "Stand Out From Generic Applicants",
                  desc: "Create a tailored resume/resume tailoring for every job.",
                },
                {
                  num: "6",
                  title: "Save Hours of Resume Editing",
                  desc: "Smart automation handles formatting & structure.",
                },
                {
                  num: "7",
                  title: "Boost Resume Confidence",
                  desc: "Know that your resume is competitive before applying.",
                },
              ].map((benefit) => (
                <div
                  key={benefit.num}
                  className="relative bg-gradient-to-br from-[#fffaf7] to-white border-2 border-[#ffd6c2] rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {benefit.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-700">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#fffaf7] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Features Designed for <span className="text-[#ff4c00]">Modern Job Seekers</span>
              </h2>
              <p className="text-lg text-slate-700">
                Our AI resume builder combines intelligence with simplicity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "ATS-friendly formatting",
                "AI-generated bullet points",
                "Smart keyword optimization",
                "Modern resume templates",
                "Resume tailoring engine",
                "Built-in cover letter generator",
                "Cloud storage & editing",
                "Resume creation in under 10 minutes",
              ].map((feature) => (
                <div
                  key={feature}
                  className="bg-white border border-[#ffd6c2] rounded-xl p-5 hover:shadow-md transition flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Social Proof & <span className="text-[#ff4c00]">Trust Signals</span>
              </h2>
              <p className="text-lg text-slate-700">
                Thousands of job seekers already use our resume builder online.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Trusted by growing numbers of candidates",
                  icon: <Users className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Used across multiple industries",
                  icon: <Briefcase className="h-8 w-8 text-[#ff4c00]" />,
                },
                {
                  title: "Designed for modern hiring systems",
                  icon: <Award className="h-8 w-8 text-[#ff4c00]" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-orange-50 to-white border-2 border-[#ffd6c2] rounded-2xl p-8 text-center hover:shadow-lg transition"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-2xl p-8 text-white text-center">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">Job seekers trust us</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">90%</div>
                  <div className="text-sm opacity-90">Users finish resumes under 10 minutes</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Proven</div>
                  <div className="text-sm opacity-90">ATS optimization engine</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-[#fffaf7] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                AI Resume Builder vs <span className="text-[#ff4c00]">Traditional Resume Makers</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#ffd6c2]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-left font-bold">Traditional Resume Tools</th>
                      <th className="px-6 py-4 text-left font-bold">Our AI Resume Builder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        feature: "Content Creation",
                        traditional: "Manual writing required",
                        ai: "AI-generated content",
                      },
                      {
                        feature: "Bullet Points",
                        traditional: "Generic bullet points",
                        ai: "Achievement-driven statements",
                      },
                      {
                        feature: "Templates",
                        traditional: "Static templates",
                        ai: "Dynamic keyword optimization",
                      },
                      {
                        feature: "Formatting",
                        traditional: "Basic formatting",
                        ai: "ATS-friendly resume structure",
                      },
                      {
                        feature: "Editing",
                        traditional: "Time-consuming editing",
                        ai: "Automated improvements",
                      },
                      {
                        feature: "Job Targeting",
                        traditional: "One resume for all jobs",
                        ai: "Tailored resumes for each job",
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
            <p className="text-center mt-6 text-lg font-semibold text-slate-700">
              Modern hiring requires smarter tools.
            </p>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Who Is This <span className="text-[#ff4c00]">ATS-Friendly Resume Builder</span> For?
              </h2>
              <p className="text-lg text-slate-700">
                Our resume builder for job seekers works for:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Freelancers & remote job seekers",
                "Executives & senior professionals",
                "International applicants",
              ].map((persona) => (
                <div
                  key={persona}
                  className="bg-gradient-to-br from-[#fffaf7] to-white border-2 border-[#ffd6c2] rounded-xl p-6 text-center hover:shadow-lg transition hover:-translate-y-1"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{persona}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-slate-600 font-medium">
              No writing skills required.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-br from-[#fff7f2] via-[#fff7f2] to-white py-20 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl text-slate-900 lg:text-5xl font-extrabold mb-6">
              Build Your Resume Smarter with <span className="text-[#ff4c00]">AI</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 mb-8">
              Stop struggling with formatting, rewriting, and keyword guessing.
            </p>
            <p className="text-base md:text-lg text-slate-700 mb-8">
              With our AI resume builder, you can:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
              {[
                "Create ATS-optimized resumes",
                "Generate powerful achievements",
                "Improve recruiter visibility",
                "Apply faster & smarter",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => updateCtaUrl("/ai-resume-builder", "Create Your Resume Now")}
              className="inline-flex items-center rounded-xl bg-[#ff4c00] px-10 py-5 text-lg font-semibold text-white hover:bg-[#e24400] transition-all shadow-2xl hover:shadow-[#ff4c00]/50 hover:scale-105"
            >
              Create Your Resume Now
            </button>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="bg-[#f9e8e0] py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                Resume Builder
                <span className="block text-[#ff4c00]">Questions Answered</span>
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {[
                {
                  q: "What is an AI resume builder?",
                  a: "An AI resume builder uses artificial intelligence to automatically write, optimize, and format resumes.",
                },
                {
                  q: "How does an ATS-friendly resume builder work?",
                  a: "An ATS friendly resume builder structures resumes to pass applicant tracking systems using optimized formatting and keywords.",
                },
                {
                  q: "Is an AI resume generator better than manual writing?",
                  a: "Yes. An AI resume generator improves clarity, keyword relevance, and recruiter appeal.",
                },
                {
                  q: "Can I customize my AI-generated resume?",
                  a: "Absolutely. You can edit templates, layout, content, and sections.",
                },
                {
                  q: "Is this resume builder suitable for freshers?",
                  a: "Yes. Perfect for candidates with limited experience, freshers, and those who have just graduated, who are new to the job market.",
                },
                {
                  q: "Does this resume maker online support all industries?",
                  a: "Yes. Our resume maker online works across all sectors.",
                },
                {
                  q: "How long does it take to create a resume?",
                  a: "Most users finish within 10 minutes.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. We use secure cloud infrastructure and privacy protection.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border-b border-slate-200 transition-all ${
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

