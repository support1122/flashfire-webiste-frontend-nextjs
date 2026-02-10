"use client";

import { ListChecks, CalendarCheck, BarChart3, Send, MessageSquare, CalendarClock, CheckCircle } from "lucide-react"; 

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function JobApplicationStatusTrackerPage() {
  const ctaLabel = "Explore Job Tracker";

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* Hero */}
        {/* HERO */}
<section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center">
  <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
          Track every job application  
          <span className="block text-[#ff4c00]">
            without losing control
          </span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-700 max-w-md">
          Flashfire keeps your entire job search organized in one place —
          from applied and interviews to follow-ups and final decisions.
        </p>

        <div className="mt-6 space-y-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-[#ff4c00]" />
            <span>Centralized dashboard for all applications</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-[#ff4c00]" />
            <span>Smart reminders so nothing slips</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#ff4c00]" />
            <span>Clear insights into what’s converting</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
            className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-7 py-3 text-sm md:text-base font-semibold text-white shadow-[0_3px_0_#000] hover:bg-[#e24400] transition"
          >
            {ctaLabel}
          </button>
        </div>
      </div>

      {/* RIGHT – APPLICATION TRACKER PREVIEW */}
      <div className="relative">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">

          <p className="text-sm font-semibold text-slate-800 mb-4">
            Application Tracker
          </p>

          <div className="space-y-3">

            {/* Card 1 */}
            <div className="rounded-xl border border-[#ffd6c2] bg-[#fff7f2] p-4">
              <p className="text-sm font-semibold">
                Frontend Developer
              </p>
              <p className="text-xs text-slate-600">
                Stripe • Remote
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-600">Stage</span>
                <span className="font-semibold text-[#ff4c00]">
                  Interviewing
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-[#ffd6c2] bg-[#fff7f2] p-4">
              <p className="text-sm font-semibold">
                Software Engineer Intern
              </p>
              <p className="text-xs text-slate-600">
                Shopify • Canada
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-600">Stage</span>
                <span className="font-semibold text-[#ff4c00]">
                  Applied
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-[#ffd6c2] bg-[#fff7f2] p-4">
              <p className="text-sm font-semibold">
                UI Engineer
              </p>
              <p className="text-xs text-slate-600">
                Airbnb • United States
              </p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-600">Next action</span>
                <span className="font-semibold text-[#ff4c00]">
                  Follow-up
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Soft accent */}
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#ffe7d7] blur-2xl -z-10" />
      </div>

    </div>
  </div>
</section>

<section className="bg-white py-28">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
        Why manual application tracking
        <span className="block text-[#ff4c00]">
          fails in the real world
        </span>
      </h2>
      <p className="mt-4 text-slate-700 text-lg">
        Job searching breaks not because of effort —
        but because information fragments.
      </p>
    </div>

    {/* Friction Map */}
    <div className="space-y-10 max-w-4xl">

      {[
        {
          title: "Status fragmentation",
          desc: "Spreadsheets, notes, and memory fall out of sync within days.",
        },
        {
          title: "Communication chaos",
          desc: "Emails, calls, and interview links scatter across tools.",
        },
        {
          title: "Zero feedback loop",
          desc: "You never learn which roles, resumes, or companies work.",
        },
      ].map((item, i) => (
        <div
          key={item.title}
          className="relative pl-10"
        >
          {/* Break marker */}
          <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-[#ff4c00] bg-white flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-[#ff4c00]" />
          </div>

          <h3 className="text-lg font-semibold mb-1">
            {item.title}
          </h3>
          <p className="text-slate-700 text-sm md:text-base max-w-xl">
            {item.desc}
          </p>

          {/* Divider */}
          {i !== 2 && (
            <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-[#ffd6c2] to-transparent" />
          )}
        </div>
      ))}

    </div>
  </div>
</section>

<section className="bg-[#fff7f2] py-24">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
        How your applications
        <span className="block text-[#ff4c00]">
          move through Flashfire
        </span>
      </h2>
    </div>

    {/* Flow */}
    <div className="relative">

      {/* Connector line */}
      <div className="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-[#ffd6c2]" />

      <div className="grid md:grid-cols-4 gap-8 relative">

        {[
          {
            step: "1",
            title: "Applied",
            desc: "Add applications manually or automatically as soon as you apply.",
            icon: <Send className="h-6 w-6 text-[#ff4c00]" />,
          },
          {
            step: "2",
            title: "Interviewing",
            desc: "Track recruiter replies, screening calls, and interview rounds.",
            icon: <MessageSquare className="h-6 w-6 text-[#ff4c00]" />,
          },
          {
            step: "3",
            title: "Follow-ups",
            desc: "Get reminders to follow up at the right time automatically.",
            icon: <CalendarClock className="h-6 w-6 text-[#ff4c00]" />,
          },
          {
            step: "4",
            title: "Outcome",
            desc: "Log offers, rejections, or closures to complete the lifecycle.",
            icon: <CheckCircle className="h-6 w-6 text-[#ff4c00]" />,
          },
        ].map((item) => (
          <div
            key={item.step}
            className="relative bg-white border border-slate-200 rounded-2xl p-6"
          >
            {/* Step bubble */}
            <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold">
              {item.step}
            </div>

            <div className="mt-8">
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-700">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
</section>
<section className="bg-[#fff7f2] py-32">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Heading */}
    <div className="max-w-3xl mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
        How Flashfire
        <span className="block text-[#ff4c00]">
          manages every application
        </span>
      </h2>
      <p className="mt-4 text-slate-700 text-lg">
        Not steps. Not checklists.  
        A single system that evolves your applications end-to-end.
      </p>
    </div>

    {/* Canvas */}
    <div className="relative bg-white border border-[#ffd6c2] rounded-[32px] p-10">

      {/* Top labels */}
      <div className="flex justify-between mb-14 text-sm font-semibold text-slate-600">
        <span>Start</span>
        <span>Progress</span>
        <span>Closure</span>
      </div>

      {/* Flow path */}
      <div className="relative">

        {/* Base line */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#ffd6c2]" />

        <div className="grid grid-cols-4 gap-6 relative">

          {/* Node 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold mb-3">
              Apply
            </div>
            <p className="text-sm text-slate-700 max-w-[160px]">
              Applications enter the system automatically or manually.
            </p>
          </div>

          {/* Node 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-[#fff7f2] border-2 border-[#ff4c00] text-[#ff4c00] flex items-center justify-center font-bold mb-3">
              Track
            </div>
            <p className="text-sm text-slate-700 max-w-[160px]">
              Status, recruiters, interviews — all attached in one place.
            </p>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-[#fff7f2] border-2 border-[#ff4c00] text-[#ff4c00] flex items-center justify-center font-bold mb-3">
              Act
            </div>
            <p className="text-sm text-slate-700 max-w-[160px]">
              Flashfire prompts follow-ups and next actions automatically.
            </p>
          </div>

          {/* Node 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-[#ff4c00] text-white flex items-center justify-center font-bold mb-3">
              Close
            </div>
            <p className="text-sm text-slate-700 max-w-[160px]">
              Offers, rejections, or drop-offs — nothing disappears.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom insight */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 text-sm text-slate-700">
        <div>
          <span className="font-semibold">Single timeline</span><br />
          Every action lives in one continuous flow.
        </div>
        <div>
          <span className="font-semibold">Zero manual tracking</span><br />
          No spreadsheets, no memory gaps.
        </div>
        <div>
          <span className="font-semibold">Outcome intelligence</span><br />
          See what actually converts into interviews.
        </div>
      </div>

    </div>
  </div>
</section>

      </main>

    
    </div>
  );
}

