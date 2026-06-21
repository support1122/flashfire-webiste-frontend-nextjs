"use client";

import { useState } from "react";
import { Target, Upload, Loader2, Copy, Check, RotateCcw, Sparkles } from "lucide-react";

export default function ATSScoreChecker() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResumeText(""); setResult(null); setError(""); };

  const gradeColor: Record<string, string> = {
    A: "text-green-500", B: "text-blue-500", C: "text-yellow-500", D: "text-orange-500", F: "text-red-500"
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <Target size={14} /> Free ATS Checker
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">ATS Score Checker</h1>
          <p className="text-base text-[#6c5c54]">Paste your resume below and get an instant ATS score with actionable feedback.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-black text-[#312925]">Paste your resume</p>
              {result && <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition"><RotateCcw size={15} /></button>}
            </div>
            <textarea
              className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
              rows={14}
              placeholder="Paste your full resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            <button
              onClick={handleCheck}
              disabled={!resumeText.trim() || loading}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Analysing...</> : <><Sparkles size={15} /> Check ATS Score</>}
            </button>
          </div>

          {result ? (
            <div className="flex flex-col gap-4">
              {/* Score */}
              <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] flex items-center gap-6">
                <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-[#f55d1d] shrink-0">
                  <span className="text-3xl font-black text-[#312925]">{result.overallScore}</span>
                  <span className="text-xs text-[#6c5c54]">/ 100</span>
                </div>
                <div>
                  <p className="text-sm text-[#6c5c54]">Overall ATS Score</p>
                  <p className={`text-4xl font-black ${gradeColor[result.grade] || "text-[#312925]"}`}>Grade {result.grade}</p>
                  <p className="text-sm text-[#6c5c54] mt-1">{result.summary}</p>
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                <p className="text-sm font-black text-[#312925] mb-3">Score Breakdown</p>
                <div className="flex flex-col gap-3">
                  {result.categories?.map((cat: any) => (
                    <div key={cat.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-[#312925]">{cat.label}</span>
                        <span className="text-[#6c5c54]">{cat.score}/{cat.maxScore}</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#f0ded4]">
                        <div className="h-2 rounded-full bg-[#f55d1d]" style={{ width: `${(cat.score / cat.maxScore) * 100}%` }} />
                      </div>
                      <p className="text-xs text-[#9c8880] mt-0.5">{cat.tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Found Keywords */}
              {result.foundKeywords?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <p className="text-sm font-black text-[#312925] mb-3">✅ Keywords Found ({result.foundKeywords.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {result.foundKeywords.map((kw: string) => (
                      <span key={kw} className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {result.missingKeywords?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <p className="text-sm font-black text-[#312925] mb-1">❌ Missing Keywords ({result.missingKeywords.length})</p>
                  <p className="text-xs text-[#9c8880] mb-3">Add these to your resume to improve your ATS score</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw: string) => (
                      <span key={kw} className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-medium text-red-600">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <p className="text-sm font-black text-[#312925] mb-3">💡 Improvement Tips</p>
                  <ul className="flex flex-col gap-2">
                    {result.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm text-[#312925]">
                        <span className="text-[#f55d1d] font-bold shrink-0">{i + 1}.</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <Target size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">{loading ? "Analysing your resume..." : "Your ATS score will appear here"}</p>
              <p className="text-sm text-[#9c8880]">{loading ? "AI is reviewing your resume" : "Paste your resume and click Check"}</p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div>
          <h2 className="text-2xl font-black text-[#0b0b0b] mb-6">How It Works</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Paste Your Resume", desc: "Copy your full resume text and paste it into the input field on the left." },
              { step: "2", title: "AI Analyzes It", desc: "Our AI checks your resume for keywords, formatting, structure, and ATS compatibility signals." },
              { step: "3", title: "Get Your Score", desc: "See your ATS score, a grade, category breakdown, found keywords, missing keywords, and actionable tips." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_4px_20px_rgba(245,93,29,0.06)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white font-black text-base mb-4">{item.step}</div>
                <h3 className="text-base font-black text-[#0b0b0b] mb-1">{item.title}</h3>
                <p className="text-sm text-[#6c5c54]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What ATS Actually Checks */}
        <div>
          <h2 className="text-2xl font-black text-[#0b0b0b] mb-2">What ATS Actually Checks</h2>
          <p className="text-sm text-[#6c5c54] mb-6">Most companies use ATS to filter resumes before a human ever sees them. Here is what it looks for:</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Keyword Match", desc: "ATS scans for exact and related keywords from the job description. Missing keywords = automatic rejection." },
              { title: "Clean Formatting", desc: "Tables, columns, text boxes, and images confuse ATS parsers. Plain single-column layout works best." },
              { title: "Standard Section Headings", desc: "Use headings like Experience, Education, Skills — not creative names like My Journey or What I Have Built." },
              { title: "Contact Info & Dates", desc: "ATS looks for phone, email, and employment dates in a readable format. Missing these lowers your parse score." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_4px_20px_rgba(245,93,29,0.06)]">
                <h3 className="text-sm font-black text-[#0b0b0b] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6c5c54]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-4">
          <h2 className="text-2xl font-black text-[#0b0b0b] mb-6">Quick Tips to Boost Your Score</h2>
          <div className="rounded-2xl border border-[#f0ded4] bg-white p-7 shadow-[0_4px_20px_rgba(245,93,29,0.06)]">
            <div className="flex flex-col divide-y divide-[#f0ded4]">
              {[
                { tip: "Use standard fonts", detail: "Arial, Calibri, or Times New Roman. Fancy fonts may not parse correctly." },
                { tip: "Avoid headers and footers", detail: "ATS often skips content inside headers and footers — put your contact info in the main body." },
                { tip: "Spell out abbreviations", detail: 'Write "Search Engine Optimization (SEO)" not just "SEO" — ATS may not recognize the short form.' },
                { tip: "Use bullet points, not paragraphs", detail: "Bullet points are easier for ATS to parse and for recruiters to scan." },
                { tip: "Save as a simple PDF or .docx", detail: "Avoid designed PDFs with columns and graphics. A plain Word doc or simple PDF parses the best." },
              ].map((item) => (
                <div key={item.tip} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-[#ff4c00] shrink-0 mt-1.5" />
                  <div>
                    <span className="text-sm font-black text-[#0b0b0b]">{item.tip} — </span>
                    <span className="text-sm text-[#6c5c54]">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
