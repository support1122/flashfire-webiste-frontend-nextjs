"use client";

import { useState } from "react";
import { Type, Copy, Check, RotateCcw, Sparkles, RefreshCw, Loader2 } from "lucide-react";

export default function ResumeHeadlineGenerator() {
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [skill, setSkill] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("Professional");
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toneOptions = ["Professional", "Confident", "Creative", "Executive", "Entry-Level"];

  const fetchHeadlines = async () => {
    if (!role.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resume-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, years, skill, niche, tone }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setHeadlines(data.headlines || []);
      setGenerated(true);
    } catch {
      setError("Failed to generate headlines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => {
    setRole(""); setYears(""); setSkill(""); setNiche(""); setTone("Professional");
    setHeadlines([]); setGenerated(false); setError("");
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
              <Type size={14} /> AI Headline Generator
            </span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            Resume Headline Generator
          </h1>
          <p className="text-base text-[#6c5c54] max-w-2xl">
            Enter your role and hit <span className="font-bold text-[#0b0b0b]">Generate</span> — get 5 AI-crafted, recruiter-tested headlines instantly. Re-roll for fresh options.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Form */}
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-black text-[#312925]">Your details</p>
              {generated && (
                <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-4">

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Job Title / Role <span className="text-[#f55d1d]">*</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Software Engineer, Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchHeadlines()}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Years of Experience <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="number" min="0" max="40"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. 5"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Top Skills / Tools <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. React, Python, Figma, SQL"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Industry / Niche <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Fintech, SaaS, Healthcare, E-commerce"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((t) => (
                    <button key={t} onClick={() => setTone(t)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${tone === t ? "border-[#f55d1d] bg-[#fff2ec] text-[#f55d1d]" : "border-[#ead8cf] bg-white text-[#6c5c54] hover:border-[#f55d1d]"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                onClick={fetchHeadlines}
                disabled={!role.trim() || loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Generating...</> : <><Sparkles size={15} /> Generate Headlines</>}
              </button>
            </div>
          </div>

          {/* Results */}
          {headlines.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-[#312925]">5 Headline Options — click any to copy</p>
                <button
                  onClick={fetchHeadlines}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-xs font-medium text-[#312925] hover:bg-[#fff2ec] transition disabled:opacity-40"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />} Re-roll
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {headlines.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(h, i)}
                    className="group flex items-center gap-4 rounded-xl border border-[#f0ded4] bg-white p-5 text-left shadow-[0_18px_60px_rgba(245,93,29,0.08)] hover:border-[#f55d1d] transition"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff2ec] text-xs font-bold text-[#f55d1d]">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-sm font-medium text-[#312925] leading-snug">{h}</p>
                    {copied === i
                      ? <Check size={15} className="shrink-0 text-green-500" />
                      : <Copy size={15} className="shrink-0 text-[#9c8880] opacity-0 group-hover:opacity-100 transition" />
                    }
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-4">
                <p className="text-xs text-[#6c5c54]">
                  <span className="font-bold text-[#312925]">Pro tip: </span>
                  Use this as the first line under your name on your CV, and as your LinkedIn headline. Keep it under 120 characters.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <Type size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">{loading ? "Generating your headlines..." : "Your 5 headlines will appear here"}</p>
              <p className="text-sm text-[#9c8880]">{loading ? "AI is crafting options tailored to you" : "Enter your role and click Generate"}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
          <p className="text-base font-black text-[#312925] mb-1">What makes a great resume headline?</p>
          <p className="text-sm text-[#6c5c54] mb-5">
            The best headlines combine your role, a differentiator (years, skills, or industry), and a value signal. Here are patterns used by top professionals:
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { pattern: "[Role] | [Skill 1] | [Skill 2] | [Skill 3]", example: "Marketing Analyst | CRM & Campaign Analytics | SQL | Python | Power BI" },
              { pattern: "[Role] | [X]+ Years | [Specialization]", example: "Software Engineer | 4+ Years | Distributed Systems & Cloud Security" },
              { pattern: "[Role] | [Skill]-Focused | [Industry]", example: "Business Intelligence Analyst | SQL, Power BI, Snowflake | KPI Reporting" },
              { pattern: "[Role] | [Domain 1] & [Domain 2]", example: "Research Associate | Biologics Development & Protein Characterization" },
              { pattern: "[Title 1] | [Title 2] | [Title 3]", example: "AI Engineer | ML Engineer | Backend Engineer" },
              { pattern: "[Adjective] [Role] | [X]+ Years of [Skill] | [Industry]", example: "Strategic Data Analyst | 3+ Years of SQL & Python | Fintech" },
            ].map(({ pattern, example }) => (
              <div key={pattern} className="rounded-lg border border-[#f0ded4] bg-[#fff8f4] p-4">
                <p className="text-xs font-bold text-[#f55d1d] mb-1 font-mono">{pattern}</p>
                <p className="text-xs text-[#6c5c54]">e.g. {example}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
