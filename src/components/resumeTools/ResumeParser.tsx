"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Loader2, RotateCcw, Sparkles, Upload, Copy, Check } from "lucide-react";

export default function ResumeParser() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    };
    document.head.appendChild(script);
  }, []);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) throw new Error("PDF library not loaded");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
    return text;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setError("");
    setExtracting(true);
    try {
      const text = await extractTextFromPDF(file);
      setResumeText(text);
    } catch {
      setError("Could not read PDF. Please try again.");
    } finally {
      setExtracting(false);
    }
  };

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

  const handleReset = () => {
    setFileName(""); setResumeText(""); setResult(null); setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const sections = [
    { key: "contact", label: "Contact Information", icon: "👤" },
    { key: "summary", label: "Professional Summary", icon: "📝" },
    { key: "skills", label: "Skills", icon: "🛠️" },
    { key: "experience", label: "Work Experience", icon: "💼" },
    { key: "education", label: "Education", icon: "🎓" },
  ];

  return (
    <main className="min-h-screen bg-[#fff8f4]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

          {/* Header */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
              <FileText size={14} /> Free Resume Parser
            </span>
            <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">Resume Parser</h1>
            <p className="text-base text-[#6c5c54]">Upload your resume PDF and instantly extract structured information — contact details, skills, experience, and education.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Left — Upload */}
            <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-base font-black text-[#312925]">Upload Resume</p>
                {(fileName || result) && (
                  <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                    <RotateCcw size={15} />
                  </button>
                )}
              </div>

              {/* Drop zone */}
              <div
                onClick={() => inputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#ead8cf] bg-[#fffaf7] p-12 text-center cursor-pointer hover:border-[#f55d1d] hover:bg-[#fff2ec] transition"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2ec]">
                  {extracting ? <Loader2 size={24} className="text-[#f55d1d] animate-spin" /> : <Upload size={24} className="text-[#f55d1d]" />}
                </div>
                {fileName ? (
                  <>
                    <p className="text-sm font-bold text-[#312925]">{fileName}</p>
                    <p className="text-xs text-[#9c8880]">{extracting ? "Extracting text..." : "PDF loaded — click Parse below"}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-[#312925]">Click to upload your resume</p>
                    <p className="text-xs text-[#9c8880]">PDF files only</p>
                  </>
                )}
                <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                onClick={handleParse}
                disabled={!resumeText.trim() || loading || extracting}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Parsing...</> : <><Sparkles size={15} /> Parse Resume</>}
              </button>
            </div>

            {/* Right — Preview */}
            {result ? (
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[700px] pr-1">
                {sections.map(({ key, label, icon }) => result[key] && (
                  <div key={key} className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-black text-[#312925]">{icon} {label}</p>
                      <button
                        onClick={() => handleCopy(Array.isArray(result[key]) ? result[key].join(", ") : result[key], key)}
                        className="flex items-center gap-1 text-xs text-[#f55d1d] hover:opacity-80 transition"
                      >
                        {copiedSection === key ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                      </button>
                    </div>
                    {Array.isArray(result[key]) ? (
                      <div className="flex flex-wrap gap-2">
                        {result[key].map((item: string, i: number) => (
                          <span key={i} className="rounded-full bg-[#fff2ec] border border-[#f0ded4] px-3 py-1 text-xs font-medium text-[#f55d1d]">{item}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#312925] leading-relaxed whitespace-pre-wrap">{result[key]}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                  {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <FileText size={28} className="text-[#f55d1d]" />}
                </div>
                <p className="text-base font-bold text-[#312925]">
                  {loading ? "Parsing your resume..." : "Parsed data will appear here"}
                </p>
                <p className="text-sm text-[#9c8880]">
                  {loading ? "AI is extracting your information" : "Upload a PDF and click Parse Resume"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
