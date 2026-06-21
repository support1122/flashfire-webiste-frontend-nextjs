"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Loader2, Upload, RotateCcw } from "lucide-react";

export default function ResumeParser() {
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState<string[]>([]); // base64 PNG per page
  const [loading, setLoading] = useState(false);
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

  const renderPDF = async (file: File) => {
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) throw new Error("PDF.js not loaded yet");

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const renderedPages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.8 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;
      renderedPages.push(canvas.toDataURL("image/png"));
    }

    return renderedPages;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPages([]);
    setError("");
    setLoading(true);
    try {
      // Small delay to ensure PDF.js worker is ready
      await new Promise((r) => setTimeout(r, 500));
      const rendered = await renderPDF(file);
      setPages(rendered);
    } catch {
      setError("Could not render PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFileName(""); setPages([]); setError("");
    if (inputRef.current) inputRef.current.value = "";
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
          <p className="text-base text-[#6c5c54]">Upload your PDF resume and see an instant preview on the right.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Left — Upload */}
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl flex flex-col gap-5 h-fit">
            <div className="flex items-center justify-between">
              <p className="text-base font-black text-[#312925]">Upload Resume</p>
              {fileName && (
                <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={15} />
                </button>
              )}
            </div>

            <div
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#ead8cf] bg-[#fffaf7] p-12 text-center cursor-pointer hover:border-[#f55d1d] hover:bg-[#fff2ec] transition"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={24} className="text-[#f55d1d] animate-spin" /> : <Upload size={24} className="text-[#f55d1d]" />}
              </div>
              {fileName ? (
                <>
                  <p className="text-sm font-bold text-[#312925]">{fileName}</p>
                  <p className="text-xs text-[#9c8880]">{loading ? "Rendering pages..." : `${pages.length} page${pages.length !== 1 ? "s" : ""} rendered`}</p>
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
          </div>

          {/* Right — PDF Preview */}
          {pages.length > 0 ? (
            <div
              className="overflow-y-auto rounded-2xl"
              style={{ maxHeight: "800px", background: "#525659", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {pages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Page ${i + 1}`}
                  style={{ width: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.4)", display: "block" }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <FileText size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">
                {loading ? "Rendering your PDF..." : "PDF preview will appear here"}
              </p>
              <p className="text-sm text-[#9c8880]">
                {loading ? "Converting pages to images" : "Upload a PDF to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
