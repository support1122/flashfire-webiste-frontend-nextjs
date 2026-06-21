"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Loader2, RotateCcw, Sparkles, Upload } from "lucide-react";

export default function ResumeParser() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState("");

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

  const handleReset = () => {
    setFileName(""); setResumeText(""); setResult(null); setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // Parse contact line into name + rest
  const parseName = (contact: string) => {
    if (!contact) return { name: "", rest: "" };
    const lines = contact.split(/[|\n,]/).map((s) => s.trim()).filter(Boolean);
    return { name: lines[0] || "", rest: lines.slice(1).join("  ·  ") };
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <FileText size={14} /> Free Resume Parser
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">Resume Parser</h1>
          <p className="text-base text-[#6c5c54]">Upload your resume PDF and instantly get a structured document preview.</p>
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

          {/* Right — Document Preview */}
          {result ? (
            <div
              className="overflow-y-auto rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
              style={{ maxHeight: "780px", background: "#e8e8e8", padding: "24px 20px" }}
            >
              {/* White paper page */}
              <div
                style={{
                  background: "#ffffff",
                  width: "100%",
                  minHeight: "1000px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                  padding: "52px 52px 60px 52px",
                  fontFamily: "'Times New Roman', Times, serif",
                  color: "#111111",
                  fontSize: "11px",
                  lineHeight: "1.55",
                  position: "relative",
                }}
              >
                {/* Name */}
                {result.contact && (() => {
                  const { name, rest } = parseName(result.contact);
                  return (
                    <div style={{ textAlign: "center", marginBottom: "14px", paddingBottom: "10px", borderBottom: "1.5px solid #111" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "0.5px", marginBottom: "2px" }}>{name}</div>
                      {result.title && <div style={{ fontSize: "11px", color: "#444", marginBottom: "3px" }}>{result.title}</div>}
                      {rest && <div style={{ fontSize: "10px", color: "#333", letterSpacing: "0.2px" }}>{rest}</div>}
                    </div>
                  );
                })()}

                {/* Summary */}
                {result.summary && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Summary</div>
                    <p style={{ margin: 0, textAlign: "justify" }}>{result.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {result.experience && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Work Experience</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {result.experience.split("\n\n").map((block: string, i: number) => {
                        const lines = block.split("\n");
                        const header = lines[0];
                        const bullets = lines.slice(1);
                        const parts = header.split("|").map((s: string) => s.trim());
                        return (
                          <div key={i} style={{ marginBottom: "9px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                              <span style={{ fontWeight: "bold", fontSize: "11px" }}>{parts[0]}</span>
                              <span style={{ color: "#444", fontSize: "10px" }}>{parts[2] || ""}</span>
                            </div>
                            <div style={{ fontStyle: "italic", fontSize: "10.5px", marginBottom: "3px" }}>{parts[1] || ""}</div>
                            {bullets.map((b: string, j: number) => (
                              <div key={j} style={{ paddingLeft: "12px", position: "relative", marginBottom: "1px" }}>
                                <span style={{ position: "absolute", left: 0 }}>•</span>
                                {b.replace(/^[•\-]\s*/, "")}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Education */}
                {result.education && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Education</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {result.education.split("\n").map((line: string, i: number) => {
                        const parts = line.split("|").map((s: string) => s.trim());
                        if (parts.length >= 2) {
                          return (
                            <div key={i} style={{ marginBottom: "5px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontWeight: "bold" }}>{parts[0]}</span>
                                <span style={{ color: "#444", fontSize: "10px" }}>{parts[2] || ""}</span>
                              </div>
                              <div style={{ fontStyle: "italic" }}>{parts[1]}</div>
                            </div>
                          );
                        }
                        return <div key={i}>{line}</div>;
                      })}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {result.projects && result.projects.trim() && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Projects</div>
                    <div>
                      {result.projects.split("\n\n").map((block: string, i: number) => {
                        const lines = block.split("\n");
                        const header = lines[0];
                        const bullets = lines.slice(1);
                        const parts = header.split("|").map((s: string) => s.trim());
                        return (
                          <div key={i} style={{ marginBottom: "9px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ fontWeight: "bold", fontSize: "11px" }}>{parts[0]}</span>
                              <span style={{ color: "#444", fontSize: "10px" }}>{parts[1] || ""}</span>
                            </div>
                            {bullets.map((b: string, j: number) => (
                              <div key={j} style={{ paddingLeft: "12px", position: "relative", marginBottom: "1px" }}>
                                <span style={{ position: "absolute", left: 0 }}>•</span>
                                {b.replace(/^[•\-]\s*/, "")}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {result.skills?.length > 0 && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Skills</div>
                    <p style={{ margin: 0 }}>
                      {Array.isArray(result.skills) ? result.skills.join(" • ") : result.skills}
                    </p>
                  </div>
                )}

                {/* Leadership / Volunteering */}
                {result.leadership && result.leadership.trim() && (
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{
                      fontSize: "10.5px", fontWeight: "bold", textTransform: "uppercase",
                      letterSpacing: "1.5px", borderBottom: "1px solid #111",
                      paddingBottom: "2px", marginBottom: "5px"
                    }}>Leadership &amp; Volunteering</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{result.leadership}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <FileText size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">
                {loading ? "Parsing your resume..." : "Resume preview will appear here"}
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
