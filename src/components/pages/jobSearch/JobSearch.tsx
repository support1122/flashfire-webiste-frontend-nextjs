"use client";

import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { Target, Rocket, Handshake, Trophy, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Share Your Goals & Location",
    description: "We learn your job preferences, skills, and where you want to work.",
    icon: Target,
  },
  {
    id: 2,
    title: "We Scan Matching Jobs",
    description: "Flashfire filters roles near you that match your skills, visa status, salary expectations, and more.",
    icon: Rocket,
  },
  {
    id: 3,
    title: "Our Team Applies for You",
    description: "A dedicated team of 4-5 trained professionals applies manually to each role.",
    icon: Handshake,
  },
  {
    id: 4,
    title: "You Get Updates",
    description: "You see where applications are sent and how they perform - without doing it yourself.",
    icon: Trophy,
  },
];

const benefits = [
  "Flashfire scans job listings near your location",
  "Our team applies to matched roles for you",
  "You get updates without lifting a finger"
];

const jobSearchFaqs = [
  {
    question: "How is Flashfire different from a normal job search?",
    answer:
      "A normal job search means hours spent scrolling through job boards, retyping the same details into dozens of application forms, and losing track of which roles you've already applied to. Flashfire replaces that manual grind with a dedicated team that searches, filters, and applies to matching roles on your behalf, so your time goes into interview prep instead of data entry.",
  },
  {
    question: "Do real people apply to jobs, or is it fully automated?",
    answer:
      "It's human-powered automation. A trained team of 4-5 specialists reviews each opening, checks it against your goals, skills, visa status, and salary expectations, and submits a tailored application. Software helps us scan listings faster, but a person makes the final call on every submission.",
  },
  {
    question: "What information does Flashfire use to find matching jobs?",
    answer:
      "We start with your target roles, preferred locations, salary range, work authorization status, and core skills. From there, we continuously scan job listings across company career pages and major job boards, filtering out roles that don't fit so you only see progress on opportunities that actually match your profile.",
  },
  {
    question: "How will I know which jobs have been applied to?",
    answer:
      "Every application is logged and visible from your dashboard in real time. You'll see the company, role, and application status without having to ask for updates or dig through your inbox for confirmation emails.",
  },
  {
    question: "Is this job search service suitable for career changers and recent graduates?",
    answer:
      "Yes. Whether you're pivoting industries, graduating and applying for your first full-time role, or a working professional looking for your next step, the underlying process is the same: define your goals, let the team find and apply to matching roles, and review progress from one place instead of managing it all yourself.",
  },
];

export default function JobSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetStarted = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Search_Page"
          : "Job_Search_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Search_Get_Started_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Get Started With Flashfire", "job_search_cta", "cta", {
          button_location: "job_search_cta_section",
          section: "job_search_cta",
        });
        trackSignupIntent("job_search_cta", {
          signup_source: "job_search_cta_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      // Check current path first
      const currentPath =
        pathname ||
        (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/get-me-interview" ||
        normalizedPath === "/en-ca/get-me-interview";
      const isOnJobSearchPage =
        normalizedPath === "/job-search" ||
        normalizedPath === "/en-ca/job-search";

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY =
          typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      // If on job search page, change URL but keep page content visible
      if (isOnJobSearchPage) {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem(
            "previousPageBeforeGetMeInterview",
            normalizedPath
          );
          sessionStorage.setItem(
            "preserveScrollPosition",
            currentScrollY.toString()
          );
        }

        const targetPath = normalizedPath.startsWith("/en-ca")
          ? "/en-ca/get-me-interview"
          : "/get-me-interview";
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }

      // Only navigate if NOT already on the page
      const targetPath = "/get-me-interview";
      router.push(targetPath);
    } catch (error) {
      console.warn("Error in Get Started handler:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf7f4]">
      

      {/* Hero Section - Two Column Layout */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div>
             

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6">
                Find Jobs Faster With{" "}
                <span className="text-[#ff4c00]">Human-Powered</span>{" "}
                Automation
              </h1>

              <p className="text-lg text-black/70 mb-8 leading-relaxed max-w-lg">
                Flashfire applies to relevant jobs on your behalf so you don&apos;t have to search manually.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#ff4c00] rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-black font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                {...getButtonProps()}
                onClick={handleGetStarted}
                className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e64400] transition-colors inline-flex items-center gap-2"
              >
                Get Started With Flashfire
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-[#ff4c00]/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs text-gray-400">Flashfire Dashboard</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#fff0e6] rounded-lg p-4 border-l-4 border-[#ff4c00]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-black">Software Engineer</span>
                      <span className="text-xs text-[#ff4c00] font-medium">Applied</span>
                    </div>
                    <span className="text-sm text-black/60">Google • Mountain View, CA</span>
                  </div>

                  <div className="bg-[#fff0e6] rounded-lg p-4 border-l-4 border-[#ff4c00]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-black">Product Manager</span>
                      <span className="text-xs text-[#ff4c00] font-medium">Applied</span>
                    </div>
                    <span className="text-sm text-black/60">Meta • Menlo Park, CA</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-black">Data Scientist</span>
                      <span className="text-xs text-gray-500 font-medium">Scanning...</span>
                    </div>
                    <span className="text-sm text-black/60">Netflix • Los Gatos, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Layout */}
      <section className="  bg-[#fff7f2]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
        How It Works
      </h2>
      <p className="text-black/60 text-lg">
        Your job search, automated in four simple steps
      </p>
    </div>

    {/* Grid */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => {
        const IconComponent = step.icon;

        return (
          <div
            key={step.id}
            className="relative group bg-white rounded-2xl p-6 shadow-sm border border-[#ff4c00]/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            
            {/* Background Number */}
            <span className="absolute top-4 right-4 text-6xl font-bold text-[#ff4c00]/10 group-hover:text-[#ff4c00]/20 transition">
              {step.id}
            </span>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff4c00]/0 via-[#ff4c00]/5 to-[#ff4c00]/10 opacity-0 group-hover:opacity-100 transition"></div>

            {/* Icon */}
            <div className="w-12 h-12 bg-[#ff4c00] rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition">
              <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-black mb-2 relative z-10">
              {step.title}
            </h3>

            <p className="text-black/70 text-sm leading-relaxed relative z-10">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>

    {/* Bottom Flow Line (visual connection) */}
    <div className="hidden lg:flex justify-between items-center mt-12 px-10">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex-1 h-[2px] bg-gradient-to-r from-[#ff4c00]/30 to-transparent"></div>
      ))}
    </div>

  </div>
</section>

      {/* Why Choose Flashfire Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 text-center">
            Why Job Seekers Choose Flashfire
          </h2>
          <div className="space-y-4 text-black/70 text-lg leading-relaxed">
            <p>
              Searching for a job while working full-time, studying, or managing a career transition is exhausting.
              Most job seekers spend more time filling out repetitive application forms than actually preparing for
              interviews. Flashfire was built to fix that imbalance by taking the manual, repetitive part of the
              job search off your plate.
            </p>
            <p>
              Instead of relying on generic keyword matching, our team looks at your specific goals — the roles
              you want, the industries you're targeting, your location preferences, and your visa or work
              authorization status — before applying to a single job. That means the applications going out under
              your name are relevant, not just high in volume.
            </p>
            <p>
              This approach works well for people who already know what they want but don't have the bandwidth to
              apply consistently, as well as for people who are new to the job market and unsure where to start.
              Either way, you keep full visibility into every application through your dashboard, so you're never
              left wondering what's happening with your job search.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fff7f2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {jobSearchFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#ff4c00]/10"
              >
                <h3 className="text-lg font-bold text-black mb-2">{faq.question}</h3>
                <p className="text-black/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Ready to Let Flashfire Search & Apply for You?
          </h2>
          <p className="text-lg text-black/60 mb-8">
            Set the goal. Flashfire runs the system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              {...getButtonProps()}
              onClick={handleGetStarted}
              className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e64400] transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started With Flashfire
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-6 text-sm text-black/50">
            No credit card required • Setup takes 2 minutes
          </p>
        </div>
      </section>

     
    </div>
  );
}