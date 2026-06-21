"use client";

import { useState } from "react";
import { Search, Loader2, RotateCcw, Sparkles, Copy, Check } from "lucide-react";

export default function CVKeywordScanner() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleScan = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cv-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDesc }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch {
      setError("Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => { setResumeText(""); setJobDesc(""); setResult(null); setError(""); };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <Search size={14} /> Free Keyword Scanner
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">CV Keyword Scanner</h1>
          <p className="text-base text-[#6c5c54]">Scan your resume for missing keywords and find what recruiters are looking for.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-black text-[#312925]">Your details</p>
              {result && <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition"><RotateCcw size={15} /></button>}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Resume Text <span className="text-[#f55d1d]">*</span></label>
                <textarea
                  className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  rows={8}
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Job Description <span className="text-xs font-normal text-[#9c8880]">(optional — for better matching)</span></label>
                <textarea
                  className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  rows={5}
                  placeholder="Paste the job description here for targeted keyword matching..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={handleScan}
                disabled={!resumeText.trim() || loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Scanning...</> : <><Sparkles size={15} /> Scan Keywords</>}
              </button>
            </div>
          </div>

          {result ? (
            <div className="flex flex-col gap-4">
              {/* Match Score */}
              <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 border-[#f55d1d] shrink-0">
                  <span className="text-2xl font-black text-[#312925]">{result.matchRate}%</span>
                </div>
                <div>
                  <p className="text-sm font-black text-[#312925]">{result.matchLevel}</p>
                  <p className="text-sm text-[#6c5c54] mt-1">{result.summary}</p>
                </div>
              </div>

              {/* Found Keywords */}
              {result.matched?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <p className="text-sm font-black text-[#312925] mb-3">✅ Keywords Found ({result.matched.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {result.matched.map((kw: string) => (
                      <span key={kw} className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {result.missing?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-black text-[#312925]">❌ Missing Keywords ({result.missing.length})</p>
                    <button onClick={() => handleCopy(result.missing.join(", "), "missing")} className="flex items-center gap-1 text-xs text-[#f55d1d] hover:opacity-80">
                      {copied === "missing" ? <Check size={12} /> : <Copy size={12} />} Copy all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map((kw: string) => (
                      <span key={kw} className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-medium text-red-600">{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <p className="text-sm font-black text-[#312925] mb-3">💡 Improvement Tips</p>
                  <ul className="flex flex-col gap-2">
                    {result.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm text-[#312925]"><span className="text-[#f55d1d] font-bold shrink-0">{i + 1}.</span>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <Search size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">{loading ? "Scanning your resume..." : "Keyword results will appear here"}</p>
              <p className="text-sm text-[#9c8880]">{loading ? "AI is finding keyword gaps" : "Paste your resume and click Scan"}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
