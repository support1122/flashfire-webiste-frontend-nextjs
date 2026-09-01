"use client"

import { memo, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { IconType } from "react-icons"
import {
  FaBolt,
  FaBrain,
  FaBullseye,
  FaChartBar,
  FaFileAlt,
  FaLinkedin,
  FaPlus,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa"
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Flame,
  Globe,
  GraduationCap,
  Phone,
  Rocket,
  Target,
  Users,
} from "lucide-react"
import { questionsData } from "@/src/data/questionsData"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import FlashfireLogo from "@/src/components/FlashfireLogo"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"
import { getLocalePrefix, stripLocalePrefix, localizeHref } from "@/src/utils/locale";

type FeatureItem = {
  title: string
  description: string
  icon: IconType
  href: string
}

const features: FeatureItem[] = [
  {
    title: "AI-Powered Matching",
    description:
      "For each and every application, your base resume is automatically optimized to the job description with ATS-friendly keywords and skills.",
    icon: FaBrain,
    href: "/features/automated-job-applications",
  },
  {
    title: "Dynamic Resume Optimization",
    description:
      "We build your base resume from scratch and tailor it for each job, making it ATS-friendly and recruiter-visible.we also provide you with a personalized job strategy for US, Canada & UK roles.",
    icon: FaFileAlt,
    href: "/features/ats-resume-optimizer",
  },
  {
    title: "LinkedIn Profile Optimization",
    description:
      "We professionally optimize your LinkedIn profile to boost recruiter visibility and align with your job search goals.it also includes a personalized job strategy for US, Canada & UK roles.",
    icon: FaLinkedin,
    href: "/features/linkedin-profile-optimization-tool",
  },
  {
    title: "Precision Targeting",
    description:
      "We only apply to jobs that fit your pay, location, company size, and career goals - and only to jobs posted in the last 24-48 hours.",
    icon: FaBullseye,
    href: "/features/ai-job-targeting",
  },
  {
    title: "Lightning Fast Applications",
    description:
      "A dedicated team of 4-5 people handles your job hunt, applying to 1200+ roles in 6-7 weeks. We'll keep you posted with every update in a WhatsApp group made just for you.",
    icon: FaBolt,
    href: "/features/job-application-tracker",
  },
  {
    title: "Dashboard & Analytics",
    description:
      "Access a personalized dashboard to track applications, monitor success rates, and get real-time insights to improve your job search strategy.",
    icon: FaChartBar,
    href: "/features/dashboard-analytics",
  },
]

const steps = [
  {
    id: 1,
    subtitle: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
    icon: Users,
  },
  {
    id: 2,
    subtitle: "We build your winning profile.",
    description:
      "We create ATS-optimized resumes and optimize LinkedIn profiles so your applications pass filters and rank higher in recruiter searches.",
    image: "/images/step2.png",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    subtitle: "Flashfire AI Applies for Jobs Automatically on Your Behalf",
    description:
      "Our AI job application tool automatically submits targeted applications to 1000+ curated roles using role-specific resumes and custom answers.",
    image: "/images/step3.png",
    icon: Bot,
  },
  {
    id: 4,
    subtitle: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
    icon: Phone,
  },
]

const personas = [
  {
    title: "International Students",
    desc: "Students and new graduates who need a faster way to reach relevant companies without spending every night filling out forms.",
  },
  {
    title: "U.S. & Canada Job Seekers",
    desc: "Candidates targeting U.S. & Canada-based roles across tech, business, and operations.",
  },
  {
    title: "Burnt-Out Applicants",
    desc: "Job seekers tired of manual applications, repeated resume edits, and low response rates.",
  },
  {
    title: "Results-Driven Users",
    desc: "People who want a focused job application system built around interview calls, not vanity activity.",
  },
]

const personaIcons = [GraduationCap, Globe, Flame, Target]

function Features() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const prefix = getLocalePrefix(pathname)

  const getHref = (href: string) => {
    if (href.startsWith("http")) return href
    return `${prefix}${href}`
  }

  const faqData = useMemo(() => questionsData.slice(0, 6), [])

  const handleFaqToggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "919817349846"
    const message = encodeURIComponent(
      "Hi! I'm interested in Flashfire's AI-powered job search automation. Can you help me get started?",
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleGetStarted = () => {
    try {
      trackButtonClick("Get Started Today", "features_cta", "cta", {
        button_location: "features_footer_section",
        section: "features_footer",
      })
      trackSignupIntent("features_cta", {
        signup_source: "features_footer_button",
        funnel_stage: "signup_intent",
      })
    } catch (trackError) {
      console.error("Tracking error:", trackError)
    }

    const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "")
    const normalizedPath = currentPath.split("?")[0]
    const basePath = stripLocalePrefix(normalizedPath)
    const isOnFeatures = basePath === "/feature" || basePath === "/features"
    const isAlreadyOnGetMeInterview =
      stripLocalePrefix(normalizedPath) === "/get-me-interview"

    if (isAlreadyOnGetMeInterview) {
      const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"))
      }

      requestAnimationFrame(() => {
        window.scrollTo({ top: currentScrollY, behavior: "instant" })
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
          setTimeout(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" })
          }, 50)
        })
      })

      return
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"))
    }

    if (isOnFeatures) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("previousPageBeforeGetMeInterview", "/features")
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString())
      }

      const targetPath = localizeHref("/get-me-interview", normalizedPath)
      router.replace(targetPath)
      return
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString())
    }

    router.push("/get-me-interview")
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.flashfirejobs.com/#organization",
    name: "Flashfirejobs",
    url: "https://www.flashfirejobs.com/",
    logo: "https://www.flashfirejobs.com/favicon.ico",
    description:
      "Flashfire is an AI-powered job search platform helping candidates get interview calls faster through intelligent job matching and automation.",
    sameAs: [
      "https://www.instagram.com/flashfirejobs/",
      "https://www.youtube.com/@flashfireindia",
      "https://www.linkedin.com/company/flashfire-pvt-ltd/",
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why Are We The Best Job Hunting Site To Find Opportunities Quickly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because we don't just show jobs, we apply to them for you. You skip browsing, resume editing, and forms. We do it all.",
        },
      },
      {
        "@type": "Question",
        name: "How Does AI Job Search Improve My Chances Of Finding Relevant Positions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI scans thousands of listings and matches them to your profile. It also optimizes your resume with keywords hiring managers and ATS systems are looking for.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI Job Application Tools Help Me Apply For Jobs Faster?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI job application tools automate form filling, resume tailoring, and submission, letting you apply to hundreds of jobs in the time it takes to manually apply to one.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="relative isolate overflow-hidden border-b border-black/5 bg-white px-4 py-14 font-['Space_Grotesk',sans-serif] sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-2 text-xs font-extrabold text-[#ff4c00]">
              <Rocket className="h-3.5 w-3.5" />
              AI-Powered Job Automation Platform
            </span>
            <h1 className="mt-6 text-3xl font-black leading-[1.05] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              AI-Powered Job Search & Job Search Automation That Gets Interviews
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-7 text-[#384154] md:text-lg lg:mx-0">
              Flashfire is an AI-powered job search platform that automates your entire job search, from resume optimization to intelligent job applications-helping job seekers apply smarter and get interview calls faster.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-8 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black"
            >
              Get Me Interview {"->"}
            </button>
          </div>

          <div className="relative mx-auto hidden h-[340px] w-full max-w-md lg:block">
            {steps.slice(0, 3).map((step, index) => {
              const placements = [
                "left-0 top-2 -rotate-6",
                "right-0 top-24 rotate-3",
                "left-16 bottom-0 rotate-1",
              ]
              return (
                <div
                  key={step.id}
                  className={`absolute w-56 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.12)] ${placements[index]}`}
                >
                  <Image
                    src={step.image}
                    alt=""
                    width={200}
                    height={200}
                    className="h-24 w-full object-contain"
                  />
                  <p className="mt-2 text-xs font-black text-[#ff4c00]">
                    Step {String(step.id).padStart(2, "0")}
                  </p>
                  <p className="text-xs font-semibold leading-snug text-[#111827]">{step.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </header>

      <div className="font-['Space_Grotesk',sans-serif]">
        <section id="feature" className="bg-white px-4 py-14 sm:px-6 md:py-24 lg:px-8">
          <header className="mx-auto mb-14 max-w-4xl text-center">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl md:text-5xl">
              Why Choose Flashfire AI Powered Job Search Tools?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-7 text-[#4b5565] md:text-lg">
              Flashfire combines an AI-powered job search with intelligent job search automation to help you apply only to the most relevant roles and convert applications into real interview calls.
            </p>
          </header>

          <div className="mx-auto max-w-5xl divide-y divide-black/10 border-y border-black/10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={getHref(feature.href)}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4c00]"
                >
                  <article className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:gap-6 sm:py-8">
                    <span className="text-2xl font-black text-black/10 transition group-hover:text-[#ff4c00] sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0e9] text-[#ff4c00] transition group-hover:bg-[#ff4c00] group-hover:text-white">
                      <IconComponent className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-black leading-tight text-[#111827] sm:text-xl">
                        {feature.title}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-[#4b5565]">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-[#ff4c00] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
                  </article>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="bg-[#fffaf7] px-4 py-14 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black leading-tight tracking-tight text-[#172031] sm:text-4xl md:text-5xl">
                How Our AI Job Application Software Works
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-5 text-[#677083]">
                From profile setup to interview calls - four simple steps to your dream job.
              </p>
            </div>

            <div className="mx-auto mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => {
                const StepIcon = step.icon
                return (
                  <article
                    key={step.id}
                    className="relative flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)]"
                  >
                    <Image
                      src={step.image}
                      alt=""
                      width={44}
                      height={44}
                      className="absolute right-5 top-5 h-9 w-9 object-contain opacity-80"
                    />
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff0e9] text-[#ff4c00]">
                      <StepIcon className="h-5 w-5" strokeWidth={2.4} />
                    </div>
                    <h3 className="mt-4 text-base font-black leading-tight text-[#111827]">
                      {step.subtitle}
                    </h3>
                    <p className="mt-2 text-xs font-medium leading-5 text-[#4b5565]">
                      {step.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 md:px-12 md:py-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-72"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(255,76,0,0.06) 0%, rgba(255,76,0,0) 70%)",
            }}
          />
          <div className="relative mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ff4c00]">
                Built For You
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#111827] sm:text-4xl md:text-5xl">
                <span className="text-[#ff4c00]">Who</span> Is This AI Job Application Software For?
              </h2>
              <p className="mt-5 text-sm font-medium leading-7 text-black/60 sm:text-base">
                Flashfire is designed for students and job seekers who want to apply at scale, save time, and finally get real interview calls instead of silence.
                This isn&apos;t another job board. It&apos;s an execution engine for people who want outcomes.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
              {personas.map((item, index) => {
                const PersonaIcon = personaIcons[index]
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ff4c00]/30 hover:shadow-[0_16px_32px_rgba(255,76,0,0.1)] sm:p-7"
                  >
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#ff4c00] transition duration-300 group-hover:bg-[#ff4c00] group-hover:text-white">
                      <PersonaIcon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-4 text-lg font-black leading-tight text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm font-medium leading-6 text-black/60">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="h-14 bg-white md:h-32" aria-hidden="true" />

        <section id="faq" className={`${faqStyles.faqSection} relative z-10 bg-[#f9e8e0] py-16`}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it,  job search can sound complex. Here&apos;s everything explained, plain and simple.
            </p>
          </div>

          <div className={`${faqStyles.faqContainer} text-left !rounded-none`}>
            {faqData.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${activeFaq === index ? faqStyles.active : ""}`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaq === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaq === index && (
                  <div className={`${faqStyles.faqAnswer} text-left`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 flex justify-center px-4 py-12 sm:px-6 md:mb-20 md:py-16 lg:px-8">
          <div className="mx-auto flex w-full max-w-[80rem] items-stretch justify-between gap-4 overflow-hidden border border-[#f1e4df] bg-[rgba(251,240,235,1)] p-3 max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:p-8 max-[768px]:p-6 max-[480px]:p-5">
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-white p-8 text-left max-[1024px]:p-6 max-[1024px]:text-center max-[768px]:p-5">
              <h3 className="mb-3 text-[1.6rem] font-bold text-[#111] max-[480px]:text-[1.2rem]">
                Still Confused?
              </h3>
              <p className="mb-5 text-[1rem] font-bold leading-[1.5] text-[#333] max-[480px]:text-[0.9rem]">
                Feel free to post your queries <br /> over our WhatsApp Support.
              </p>
              <button
                type="button"
                className="relative z-10 w-fit cursor-pointer rounded-[0.5rem] border-0 border-b-[3px] border-b-black bg-[#ff4c00] px-[1.6rem] py-[0.9rem] font-semibold text-white shadow-[0_0.2rem_0_#000] transition-all duration-300 hover:border-b-[5px] hover:bg-[#e24300] max-[1024px]:mx-auto"
                onClick={handleWhatsAppClick}
              >
                Connect on WhatsApp
              </button>
              <div className="pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 text-[18rem] text-[rgba(251,240,235,1)] opacity-90 max-[1024px]:hidden">
                <FaWhatsapp />
              </div>
            </div>

            <div className="relative flex flex-[1.3] items-center overflow-hidden bg-black p-8 max-[1024px]:mt-6 max-[1024px]:w-full max-[1024px]:text-center max-[768px]:flex-col max-[768px]:items-center max-[768px]:p-6">
              <div className="relative z-10 flex w-[65%] flex-col items-start justify-start text-left max-[1024px]:w-full max-[1024px]:items-center max-[1024px]:text-center">
                <p className="mb-3 text-[0.75rem] font-semibold text-[#fffaf8]">
                  HELPING 1000+ JOB SEEKERS
                </p>
                <blockquote className="mb-4 text-[1.6rem] font-bold italic leading-tight text-[#eee] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem]">
                  &quot;I&apos;ve seen brilliant people lose hope. Flashfire exists so they
                  don&apos;t have to.&quot;
                </blockquote>
                <div className="flex items-center justify-start gap-4 text-left max-[1024px]:justify-center max-[1024px]:text-center">
                  <div>
                    <p className="text-[0.95rem] font-semibold text-white">Adit Jain</p>
                    <p className="text-[0.8rem] text-[#aaa]">Partner</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlashfireLogo
                      variant="white"
                      width={24}
                      height={24}
                      className="brightness-100"
                    />
                    <p className="font-semibold text-white">Flashfire</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-4 flex w-[34%] items-start justify-center overflow-hidden max-[1024px]:relative max-[1024px]:inset-auto max-[1024px]:mx-auto max-[1024px]:mt-5 max-[1024px]:h-[360px] max-[1024px]:w-full max-[1024px]:items-start max-[1024px]:justify-center max-[480px]:h-[320px]">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/adit-jain.png"
                  alt="Adit Jain"
                  width={260}
                  height={480}
                  className="mx-auto h-[140%] w-auto max-w-none -translate-y-16 object-contain object-top brightness-100 contrast-105 max-[1024px]:h-[165%] max-[1024px]:max-w-none max-[1024px]:-translate-y-28 max-[480px]:h-[185%] max-[480px]:-translate-y-24"
                  loading="lazy"
                  unoptimized
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <div className="relative mt-8 overflow-hidden bg-[#fffaf7] px-4 py-16 md:mt-16 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4c00]/12 blur-[120px]" />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(17,24,39,0.08) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <Rocket className="absolute -right-6 -top-6 h-40 w-40 text-[#ff4c00]/[0.06] sm:h-56 sm:w-56" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-black text-[#111827] sm:text-4xl md:text-5xl">
              Ready to move from applying to interviewing?
            </h2>
            <p className="mb-8 text-base text-[#4b5565] md:text-xl">
              Flashfire bridges the gap with smart automation.
            </p>
            <button
              type="button"
              onClick={handleGetStarted}
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff4c00] px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(255,76,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Features)
