"use client";

import { useState } from "react";
import { FileText, Loader2, RotateCcw, Sparkles, Copy, Check } from "lucide-react";

export default function ResumeParser() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleParse = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resume-parser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch {
      setError("Parsing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  const handleReset = () => { setResumeText(""); setResult(null); setError(""); };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <FileText size={14} /> Free Resume Parser
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">Resume Parser</h1>
          <p className="text-base text-[#6c5c54]">Paste your resume and instantly extract structured information — contact details, skills, experience, and education.</p>
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
              onClick={handleParse}
              disabled={!resumeText.trim() || loading}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Parsing...</> : <><Sparkles size={15} /> Parse Resume</>}
            </button>
          </div>

          {result ? (
            <div className="flex flex-col gap-4">
              {[
                { key: "contact", label: "Contact Information" },
                { key: "summary", label: "Professional Summary" },
                { key: "skills", label: "Skills" },
                { key: "experience", label: "Work Experience" },
                { key: "education", label: "Education" },
              ].map(({ key, label }) => result[key] && (
                <div key={key} className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-black text-[#312925]">{label}</p>
                    <button onClick={() => handleCopy(Array.isArray(result[key]) ? result[key].join(", ") : result[key], key)} className="flex items-center gap-1 text-xs text-[#f55d1d] hover:opacity-80">
                      {copiedSection === key ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                  {Array.isArray(result[key]) ? (
                    <div className="flex flex-wrap gap-2">
                      {result[key].map((item: string) => (
                        <span key={item} className="rounded-full bg-[#fff2ec] border border-[#f0ded4] px-3 py-1 text-xs font-medium text-[#f55d1d]">{item}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#312925] leading-relaxed whitespace-pre-wrap">{result[key]}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <FileText size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">{loading ? "Parsing your resume..." : "Parsed data will appear here"}</p>
              <p className="text-sm text-[#9c8880]">{loading ? "AI is extracting information" : "Paste your resume and click Parse"}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
