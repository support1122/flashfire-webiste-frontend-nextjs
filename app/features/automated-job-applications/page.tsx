"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { FaPlus, FaTimes, FaArrowRight, FaCheck, FaBolt, FaShieldAlt, FaRocket, FaUserCheck, FaGlobe, FaCrosshairs, FaRobot, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";


export default function JobApplicationAutomationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => { } });

  const stats = [
    { value: "1,200+", label: "Applications Automated" },
    { value: "75%", label: "ATS Pass Rate" },
    { value: "24/7", label: "Active Monitoring" },
    { value: "3x", label: "Faster Response" },
  ];

  const jobAutomationFAQs = [
    { question: "What is job application automation and how can it help me apply to more jobs?", answer: " Job application automation uses AI to apply to jobs automatically on your behalf. Flashfire's job application automation tool helps you automate job applications, tailor resumes for ATS systems, and apply faster than manual job searches." },
    { question: "How does automating job applications increase my chances of landing interviews?", answer: " Automating job applications ensures speed, consistency, and keyword optimization. Flashfire's AI job application tool submits ATS-optimized applications instantly, improving visibility and interview conversion rates." },
    { question: "Can job application automation help me land my dream job faster?", answer: " By applying to high-fit roles consistently and quickly, you're more likely to land interviews and offers in less time." },
    { question: "How do I optimise my LinkedIn profile to improve automated job application results?", answer: " Make sure your profile matches your target job title, keywords, and skills. FlashFire's team also does this manually for you." },
    { question: "What is an ATS resume, and why is it important for automated job applications?", answer: " An ATS resume is optimized to pass recruiter filters and software systems, which improves shortlisting odds. FlashFire tailors yours for each job." },
    { question: "How does AI for job search integrate with job application automation tools?", answer: " Our AI scans job descriptions, extracts key requirements, and inserts them into your resume before our team submits each application." },
    { question: "Does FlashFireJobs act as an AI job board with built-in automation features?", answer: " It combines AI resume matching + human-powered application submission, unlike traditional job boards." },
    { question: "What are the best practices for job application automation to avoid common pitfalls?", answer: " Avoid mass-blind applications. Instead, target fresh, relevant roles with optimized resumes — which FlashFire does manually for each job." },
    { question: "Can I customize applications while using automation?", answer: "Yes. Flashfire combines automated job applications with role-specific customization, ensuring every application is optimized without manual effort." },
    { question: "How does automating job applications work with AI-powered job matching and alerts?", answer: " We use AI to match jobs based on your preferences, optimize your resume, then apply — while keeping you updated via WhatsApp." }
  ];

  const features = [
    { icon: <FaBolt className="w-5 h-5" />, title: "Always First to Apply", desc: "Applies within minutes of a role going live, giving you a first-mover advantage." },
    { icon: <FaShieldAlt className="w-5 h-5" />, title: "ATS-Optimized Applications", desc: "Each application is tailored with role-specific keywords to beat ATS filters." },
    { icon: <FaRocket className="w-5 h-5" />, title: "Consistent Weekly Momentum", desc: "Keeps applications flowing so interview chances compound every week." },
  ];

  const audienceGroups = [
    { title: "Active Job Seekers", desc: "Applying daily and want to save time without missing opportunities", icon: <FaUserCheck className="w-6 h-6" /> },
    { title: "High-Volume Applicants", desc: "Applying to dozens of roles weekly and need speed with accuracy", icon: <FaRocket className="w-6 h-6" /> },
    { title: "ATS-Rejected Candidates", desc: "Qualified professionals blocked by automated screening systems", icon: <FaShieldAlt className="w-6 h-6" /> },
    { title: "Automation-First Job Seekers", desc: "Want to automate job applications without losing quality or relevance", icon: <FaRobot className="w-6 h-6" /> },
    { title: "International Applicants", desc: "Applying across countries with different ATS and resume rules", icon: <FaGlobe className="w-6 h-6" /> },
    { title: "Career Changers & Recent Graduates", desc: "Entering new roles or industries and need to scale applications while staying targeted", icon: <FaCrosshairs className="w-6 h-6" /> },
  ];

  const comparisonData = [
    { title: "Application Process", caption: "Manual: Repetitive, time-consuming, inconsistent | Flashfire: AI-driven job application automation at scale" },
    { title: "ATS-Friendly Resume Optimization", caption: "Resumes tailored to each job description with ATS-friendly keywords" },
    { title: "Time Efficiency in Job Search", caption: "150+ hours saved through AI-powered automation" },
    { title: "Accuracy & Attention to Detail", caption: "Role-matched applications reviewed by AI + humans" },
    { title: "Automated Applications", caption: "1,200+ smart applications sent strategically — not spam" },
    { title: "Application Tracking & Proof", caption: "Real-time tracking with visible proof and updates" },
    { title: "Interview Opportunity Rate", caption: "Higher interview conversion rates within weeks" },
  ];

  const handleFaqToggle = (index: number) => setActiveFaqIndex(activeFaqIndex === index ? null : index);

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_source") || "WEBSITE" : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_medium") || "Job_Automation_Page" : "Job_Automation_Page";
      try {
        GTagUTM({ eventName: "sign_up_click", label: "Job_Automation_Get_Me_Interview_Button", utmParams: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_campaign") || "Website" : "Website" } });
      } catch (gtagError) { console.warn('GTagUTM error:', gtagError); }
      try {
        trackButtonClick("Get Me Interview", "job_automation_cta", "cta", { button_location: "job_automation_hero_section", section: "job_automation_hero" });
        trackSignupIntent("job_automation_cta", { signup_source: "job_automation_hero_button", funnel_stage: "signup_intent" });
      } catch (trackError) { console.warn('Tracking error:', trackError); }

      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const normalizedPath = currentPath.split('?')[0];
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' || normalizedPath === '/en-ca/get-me-interview';
      const isOnJobAutomationPage = normalizedPath === '/job-application-automation' || normalizedPath === '/en-ca/job-application-automation' || normalizedPath === '/features/job-automation' || normalizedPath === '/en-ca/features/job-automation' || normalizedPath === '/features/automated-job-applications' || normalizedPath === '/en-ca/features/automated-job-applications';

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }));
        return;
      }
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      if (isOnJobAutomationPage) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        if (typeof window !== 'undefined') window.history.pushState({}, '', normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview');
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }));
        return;
      }
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
        window.history.pushState({}, '', '/get-me-interview');
      }
      router.push('/get-me-interview');
    } catch (error) { console.warn('Error in Get Me Interview handler:', error); }
  };

  if (!isMounted) {
    return (<><Navbar /><main className="min-h-screen bg-[#fff6f4] font-['Space_Grotesk',sans-serif]"><section className="min-h-[95vh] flex items-center justify-center"><div className="animate-pulse text-center"><div className="h-16 w-96 bg-gray-200 rounded-lg mb-4 mx-auto" /><div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto" /></div></section></main><Footer /></>);
  }

  const productSchema = { "@context": "https://schema.org/", "@type": "Product", "name": "Automated Job Applications", "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-automation.png", "description": "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner with FlashfireJobs. Check out now", "brand": { "@type": "Brand", "name": "FlashFire" }, "offers": { "@type": "Offer", "url": "https://www.flashfirejobs.com/features/automated-job-applications", "priceCurrency": "USD", "price": "0" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "95" } };

  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#fff6f4] text-[#0f172a] font-['Space_Grotesk',sans-serif]">

        <section className="min-h-[95vh] bg-[#fff6f4] flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* LEFT CONTENT */}
              <div

                className="flex flex-col justify-center max-w-xl"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ff4c00]/20 mb-6 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4c00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4c00]"></span>
                  </span>
                  <span className="text-sm font-medium text-[#ff4c00]">
                    AI-Powered Job Automation
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0b0b0b] leading-tight tracking-tight">
                  Job Application Automation That Helps You Apply Faster & Get Interviews
                </h1>

                {/* Description */}
                <p className="mt-6 text-lg text-[#6b7280] leading-relaxed">
                  Flashfire is an AI-powered job application automation tool that helps you automate job applications, optimize resumes for ATS, and apply to roles instantly. So you stay ahead in competitive job markets.
                </p>

                {/* Button */}
                <div className="mt-8">
                  <button
                    {...getButtonProps()}
                    onClick={handleGetMeInterview}
                    className="group bg-[#0b0b0b] text-white px-8 py-4 font-bold text-lg hover:bg-[#ff4c00] transition-all duration-300 rounded-lg inline-flex items-center gap-2"
                  >
                    Get Me Interview
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Bottom Points */}
                <div className="mt-10 grid sm:grid-cols-3 gap-4 w-full">
                  {["First to apply wins", "ATS filters reject 75%", "Speed beats volume"].map((item) => (
                    <div
                      key={item}
                      className="bg-white border border-[#ffd7c4] rounded-lg px-4 py-3 text-sm font-semibold text-[#0b0b0b] shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div

                className="relative hidden lg:block"
              >
                <div className="relative w-full h-[500px] lg:h-[600px]">

                  {/* Floating Card */}
                  <div

                    className="absolute top-[30px] right-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs text-gray-400">Live Applications</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        "Software Engineer @ Google",
                        "Product Manager @ Meta",
                        "Data Scientist @ Netflix",
                      ].map((job, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4c00] to-orange-400 flex items-center justify-center text-white text-xs font-bold">
                            {job.split("@")[1]?.trim()[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{job}</p>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <FaCheck className="w-3 h-3" /> Applied 2m ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center Badge */}
                  <div

                    className="absolute top-[380px] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff4c00] text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm"
                  >
                    ⚡ First to Apply = First Interview
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff6f4] to-white" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const StatCard = () => {
                  const count = stat.value;
                  return (
                    <div


                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-extrabold text-[#0b0b0b] mb-2">
                        {count}
                      </div>
                      <div className="text-sm text-[#6b7280] font-medium uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  );
                };
                return <StatCard key={index} />;
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-28 bg-[#fff6f4]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#ff4c00] text-sm font-semibold mb-4 border border-[#ffd7c4]">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b0b0b] mb-4">Flashfire AI Job Application Automation Platform</h2>
              <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">While others manually apply and wait, Flashfire's automated job application system works 24/7</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={feature.title} className="bg-white border border-[#ffd7c4] rounded-2xl p-8 hover:shadow-lg hover:border-[#ff4c00]/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#fff6f4] flex items-center justify-center text-[#ff4c00] mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#0b0b0b] mb-2">{feature.title}</h3>
                  <p className="text-[#6b7280] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b0b0b] mb-4">
                Manual Job Search vs Flashfire Automated Job Application System
              </h2>
              <p className="text-lg text-[#6b7280]">
                See the difference Flashfire makes in your job search journey
              </p>
            </div>


            <div className="w-full">
  <div className="bg-white rounded-2xl border border-[#ffd7c4] overflow-hidden shadow-sm">

    <table className="w-full border-collapse text-left">
      
      {/* Header */}
      <thead>
        <tr className="bg-[#fff6f4]">
          
          <th className="py-2 px-2 md:py-4 md:px-6 text-[10px] sm:text-xs md:text-sm font-semibold text-[#6b7280]">
            Feature
          </th>

          <th className="py-2 px-2 md:py-4 md:px-6 text-center text-[10px] sm:text-xs md:text-sm font-bold text-[#ff4c00] border-l border-[#ffd7c4]">
            Before
          </th>

          <th className="py-2 px-2 md:py-4 md:px-6 text-center text-[10px] sm:text-xs md:text-sm font-bold text-green-600 border-l border-[#ffd7c4]">
            After
          </th>

        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-[#ffd7c4]">
        {comparisonData.map((item, index) => (
          <motion.tr
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-[#fff6f4]/50 transition-colors"
          >

            {/* Feature */}
            <td className="py-2 px-2 md:py-5 md:px-6 align-top">
              <div className="font-semibold text-[#0b0b0b] text-[11px] sm:text-xs md:text-sm leading-tight line-clamp-2">
                {item.title}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs text-[#6b7280] leading-tight line-clamp-2">
                {item.caption}
              </div>
            </td>

            {/* Before */}
            <td className="py-2 px-2 md:py-5 md:px-6 text-center border-l border-[#ffd7c4]">
              <FaTimes className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ff4c00] mx-auto" />
            </td>

            {/* After */}
            <td className="py-2 px-2 md:py-5 md:px-6 text-center border-l border-[#ffd7c4] bg-[#fff6f4]/30">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                <FaCheck className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
            </td>

          </motion.tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

          </div>
        </section>

        {/* Target Audience */}
        <section className="py-24 bg-[#fff6f4]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-widest text-[#ff4c00] bg-white rounded-full border border-[#ffd7c4]">BUILT FOR MODERN JOB SEEKERS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b0b0b]">Who Is This Job Application Automation Tool For?</h2>
              <p className="mt-4 text-lg text-[#6b7280] max-w-2xl mx-auto">Flashfire's job application automation system is built for job seekers who want to apply faster, beat ATS filters, and increase interview chances</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {audienceGroups.map((group, index) => (
                <div key={group.title} className="bg-white border border-[#ffd7c4] rounded-2xl p-6 hover:border-[#ff4c00]/30 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 mb-4 rounded-full bg-[#fff6f4] text-[#ff4c00] flex items-center justify-center">{group.icon}</div>
                  <h4 className="text-lg font-bold text-[#0b0b0b] mb-2">{group.title}</h4>
                  <p className="text-[#6b7280] text-sm leading-relaxed">{group.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem/Solution Section - Light Theme */}
        <section className="py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#fff6f4] text-[#ff4c00] text-sm font-semibold mb-4">THE PROBLEM WITH MODERN JOB SEARCH</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b0b0b]">Why job hunting breaks down<br /><span className="text-[#ff4c00]">and how AI fixes it</span></h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div >
                <h3 className="text-xl font-bold text-[#6b7280] mb-8 flex items-center gap-3"><FaExclamationTriangle className="text-[#ff4c00]" />Why Manual Job Applications Fail</h3>
                <div className="space-y-4">
                  {["Hundreds of candidates apply within hours of posting", "ATS filters reject most resumes before humans see them", "Manual applications can't scale consistently", "There's no feedback loop to improve results"].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#fff6f4] border border-[#ffd7c4]"><span className="mt-1 h-2 w-2 rounded-full bg-[#ff4c00] flex-shrink-0" /><p className="text-[#6b7280]">{item}</p></div>
                  ))}
                </div>
              </div>

              <div >
                <h3 className="text-xl font-bold text-[#ff4c00] mb-8 flex items-center gap-3"><FaCheck className="text-[#ff4c00]" />How AI changes the game</h3>
                <div className="space-y-4">
                  {["Automates job applications instantly when roles go live", "Uses AI to optimize automated job applications for ATS and recruiter keywords", "Scales applications without fatigue or burnout", "Learns from outcomes and continuously improves"].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#fff6f4] border border-[#ff4c00]/30"><span className="mt-1 h-2 w-2 rounded-full bg-[#ff4c00] flex-shrink-0" /><p className="text-[#0b0b0b] font-medium">{item}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Original UI with animations */}
        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Job Application Automation FAQs</h2>
            <p>We get it, job application automation can sound complex. Here's everything explained, plain and simple.</p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobAutomationFAQs.map((faq, index) => (
              <div key={index} className={`${faqStyles.faqItem} ${activeFaqIndex === index ? faqStyles.active : ""}`}>
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>{activeFaqIndex === index ? <FaTimes /> : <FaPlus />}</span>
                </button>
                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-24 bg-[#fff6f4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-12 md:p-16 border border-[#ffd7c4] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b0b0b] mb-4">Ready to Automate Your Job Search?</h2>
            <p className="text-lg text-[#6b7280] mb-8 max-w-2xl mx-auto">Join thousands of job seekers who have transformed their search with Flashfire's AI-powered automation.</p>
            <button {...getButtonProps()} onClick={handleGetMeInterview} className="bg-[#ff4c00] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#e04400] transition-colors shadow-lg shadow-[#ff4c00]/20">Get Started Today →</button>
            <p className="mt-6 text-sm text-[#6b7280]">No credit card required • Setup in 5 minutes</p>
          </div>
        </div>
      </section> */}

      </main><Footer /></>
  );
}