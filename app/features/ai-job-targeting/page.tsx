"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { Target, Search, Filter, Zap, CheckCircle, TrendingUp, ArrowRight, Users, Briefcase, Award, Clock, XCircle, CheckCircle2, BarChart3, Sparkles } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { motion } from "framer-motion";

export default function PrecisionTargetingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => {} });

  useEffect(() => { setIsMounted(true); }, []);

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_source") || "WEBSITE" : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_medium") || "Precision_Targeting_Page" : "Precision_Targeting_Page";
      try {
        GTagUTM({ eventName: "sign_up_click", label: "Precision_Targeting_Get_Me_Interview_Button", utmParams: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_campaign") || "Website" : "Website" } });
      } catch (gtagError) { console.warn('GTagUTM error:', gtagError); }
      try {
        trackButtonClick("Get Me Interview", "precision_targeting_cta", "cta", { button_location: "precision_targeting_hero_section", section: "precision_targeting_hero" });
        trackSignupIntent("precision_targeting_cta", { signup_source: "precision_targeting_hero_button", funnel_stage: "signup_intent" });
      } catch (trackError) { console.warn('Tracking error:', trackError); }

      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const normalizedPath = currentPath.split('?')[0];
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' || normalizedPath === '/en-ca/get-me-interview';
      const isOnPrecisionTargetingPage = normalizedPath === '/features/precision-targeting' || normalizedPath === '/en-ca/features/precision-targeting' || normalizedPath === '/features/ai-job-targeting' || normalizedPath === '/en-ca/features/ai-job-targeting';

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }));
        return;
      }
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      if (isOnPrecisionTargetingPage) {
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

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const stats = [
    { value: "3×", label: "Higher Interview Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "70%", label: "Fewer Rejections", icon: <Filter className="w-5 h-5" /> },
    { value: "90%", label: "ATS Match Accuracy", icon: <Target className="w-5 h-5" /> },
    { value: "10×", label: "Time Saved", icon: <Clock className="w-5 h-5" /> },
  ];

  const targetAudience = [
    { title: "International Students", desc: "Apply only to companies that sponsor or consider visa holders.", icon: <Users className="w-6 h-6" /> },
    { title: "Career Switchers", desc: "Target roles where your transferable skills matter.", icon: <Briefcase className="w-6 h-6" /> },
    { title: "Experienced Professionals", desc: "Avoid junior roles and low-growth companies.", icon: <Award className="w-6 h-6" /> },
  ];

  const howItWorksSteps = [
    { step: "01", title: "Understand your profile", desc: "We analyze your resume, experience, skills, and past roles to identify where you truly fit.", icon: <Search className="w-5 h-5" /> },
    { step: "02", title: "Filter high-fit jobs", desc: "Jobs are filtered based on ATS score, skill match, role relevance, and hiring patterns.", icon: <Filter className="w-5 h-5" /> },
    { step: "03", title: "Apply with intent", desc: "Applications are sent only to roles where your profile ranks competitively.", icon: <Target className="w-5 h-5" /> },
    { step: "04", title: "Improve continuously", desc: "Feedback, rejections, and responses are used to refine targeting every week.", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const comparisonData = {
    massApplying: ["Low ATS match", "High rejection rate", "Time wasted on poor-fit roles", "No learning or feedback loop"],
    precisionTargeting: ["High skill & ATS match", "Better interview conversion", "Focused, quality applications", "Continuous optimization"]
  };

  const valuePills = ["High ATS Match", "Skill-Based Filtering", "Role Relevance Scoring", "Fewer Rejections"];

  if (!isMounted) {
    return (<><Navbar /><div className="min-h-screen bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white"><section className="py-24 flex items-center justify-center"><div className="animate-pulse text-center"><div className="h-16 w-96 bg-gray-200 rounded-lg mb-4 mx-auto" /><div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto" /></div></section></div><Footer /></>);
  }

  const productSchema = { "@context": "https://schema.org/", "@type": "Product", "name": "AI Job Targeting", "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png", "description": "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.", "brand": { "@type": "Brand", "name": "FlashFire" }, "offers": { "@type": "Offer", "url": "https://flashfirejobs.com/features/ai-job-targeting", "priceCurrency": "USD", "price": "0" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "478" } };

  return (
    <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} /><Navbar /><main className="min-h-screen bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white">
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ffd6c4] mb-8">
            <Sparkles className="w-4 h-4 text-[#ff4c00]" />
            <span className="text-sm font-semibold text-[#ff4c00] tracking-wide uppercase">Precision Targeting</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0b1220] mb-6">
            Apply to Jobs That <br /><span className="text-[#ff4c00]\">Actually Match</span> Your Profile
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-[#5b6475] max-w-3xl mx-auto leading-relaxed mb-10">
            Stop wasting applications on low-fit roles. FlashFire's AI targets jobs where your skills, experience, and ATS score give you the highest chance of interviews.
          </motion.p>

          <div  className="flex flex-wrap justify-center gap-3 mb-12">
            {valuePills.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ffd6c4] text-[#0b1220] text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-[#ff4c00]" />{item}
              </span>
            ))}
          </div>

          <div  className="flex flex-col sm:flex-row justify-center gap-4">
            <button {...getButtonProps()} onClick={handleGetMeInterview} className="group bg-[#ff4c00] text-white px-8 py-4 font-bold text-lg hover:bg-[#e04400] transition-all rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-[#ff4c00]/20">
              Get Me Interview<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleHowItWorks} className="border-2 border-[#0b1220] text-[#0b1220] bg-transparent hover:bg-[#0b1220] hover:text-white px-8 py-4 font-semibold text-lg transition-all rounded-xl inline-flex items-center justify-center gap-2">
              How It Works
            </button>
          </div>
        </div>
      </section>

     

      {/* Who Is This For Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div  className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#ff4c00] text-sm font-semibold mb-4 border border-[#ffd6c4]">Built For You</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1220]">Who Is Precision Targeting <span className="text-[#ff4c00]\">For?</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {targetAudience.map((item, index) => (
              <div key={item.title}  className="bg-white rounded-2xl p-8 border border-[#ffd6c4] hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#fff7f2] flex items-center justify-center text-[#ff4c00] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">{item.title}</h3>
                <p className="text-[#5b6475] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div  className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1220] mb-4">Precision AI Job Targeting vs <span className="text-[#ff4c00]\">Mass Applying</span></h2>
            <p className="text-lg text-[#5b6475] max-w-2xl mx-auto">See why targeted applications outperform spray-and-pray approaches</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div  className="bg-[#fff7f2] rounded-2xl p-8 border border-[#ffd6c4]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><XCircle className="w-5 h-5 text-red-500" /></div>
                <h3 className="text-xl font-bold text-red-600">Mass Applying</h3>
              </div>
              <ul className="space-y-4">
                {comparisonData.massApplying.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#5b6475]"><XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>

            <div  className="bg-white rounded-2xl p-8 border-2 border-[#ff4c00]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#fff7f2] flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#ff4c00]" /></div>
                <h3 className="text-xl font-bold text-[#ff4c00]">Precision Targeting</h3>
              </div>
              <ul className="space-y-4">
                {comparisonData.precisionTargeting.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#0b1220] font-medium"><CheckCircle2 className="w-5 h-5 text-[#ff4c00] flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-[#fff7f2]">
        <div className="max-w-6xl mx-auto px-6">
          <div  className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-[#ff4c00] text-sm font-semibold mb-4 border border-[#ffd6c4]">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1220] mb-4">Precision targeting, <span className="text-[#ff4c00]\">done right</span></h2>
            <p className="text-lg text-[#5b6475] max-w-2xl mx-auto">We don't apply everywhere. We apply where you actually have a chance.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {howItWorksSteps.map((item, index) => (
              <div key={item.step}  className="bg-white rounded-2xl p-8 border border-[#ffd6c4] hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff4c00] text-white font-bold flex items-center justify-center flex-shrink-0">{item.step}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-2"><span className="text-[#ff4c00]">{item.icon}</span><h3 className="text-xl font-bold text-[#0b1220]">{item.title}</h3></div>
                    <p className="text-[#5b6475] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div  className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b1220] mb-4">Real Results from <span className="text-[#ff4c00]\">Precision Targeting</span></h2>
            <p className="text-lg text-[#5b6475] max-w-3xl mx-auto">Our AI-driven targeting strategy focuses your effort where it matters most</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label}  className="bg-[#fff7f2] rounded-2xl p-8 text-center border border-[#ffd6c4] hover:border-[#ff4c00]/30 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-extrabold text-[#ff4c00] mb-2">{stat.value}</p>
                <p className="text-sm text-[#5b6475] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#fff7f2]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div  className="bg-white rounded-3xl p-12 md:p-16 border border-[#ffd6c4] shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#fff7f2] flex items-center justify-center text-[#ff4c00] mx-auto mb-6"><Zap className="w-8 h-8" /></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] mb-4">Ready to Target Smarter?</h2>
            <p className="text-lg text-[#5b6475] mb-8 max-w-2xl mx-auto">Join thousands of job seekers who stopped mass applying and started getting interviews.</p>
            <button {...getButtonProps()} onClick={handleGetMeInterview} className="bg-[#ff4c00] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#e04400] transition-colors shadow-lg shadow-[#ff4c00]/20 inline-flex items-center gap-2">
              Get Me Interview<ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-sm text-[#5b6475]">No credit card required • Setup in 5 minutes</p>
          </div>
        </div>
      </section>

    </main><Footer /></>
  );
}