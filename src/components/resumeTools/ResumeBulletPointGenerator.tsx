"use client";

import { useState } from "react";
import { List, Copy, Check, RotateCcw, Sparkles, Loader2 } from "lucide-react";

const verbCategories = [
  "Achievement", "Leadership", "Growth", "Improvement",
  "Building", "Analysis", "Collaboration", "Reduction",
];

export default function ResumeBulletPointGenerator() {
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [metric, setMetric] = useState("");
  const [category, setCategory] = useState("Achievement");
  const [bullets, setBullets] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBullets = async () => {
    if (!role.trim() || !task.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resume-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, task, metric, category }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBullets(data.bullets || []);
      setGenerated(true);
    } catch {
      setError("Failed to generate bullet points. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(bullets.map((b) => `• ${b}`).join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => {
    setRole(""); setTask(""); setMetric(""); setCategory("Achievement");
    setBullets([]); setGenerated(false); setError("");
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <List size={14} /> AI Bullet Generator
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            Resume Bullet Point Generator
          </h1>
          <p className="text-base text-[#6c5c54]">
            Turn vague job duties into sharp, ATS-friendly bullet points. Enter your role, what you did, and the result — AI generates 5 polished versions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Input form */}
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-black text-[#312925]">Describe your achievement</p>
              {generated && (
                <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Job Title / Role <span className="text-[#f55d1d]">*</span></label>
                <input
                  type="text"
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Software Engineer, Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">What did you do? <span className="font-normal text-[#9c8880]">(task/responsibility)</span> <span className="text-[#f55d1d]">*</span></label>
                <textarea
                  className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  rows={3}
                  placeholder="e.g. redesigned the onboarding flow, managed a team of 5 engineers, built ETL pipelines using Apache Airflow and SQL"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Result / Metric <span className="font-normal text-[#9c8880]">(optional but powerful)</span></label>
                <input
                  type="text"
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. increased conversion by 25%, reduced processing time by 35%, saved $50K annually"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Verb style</label>
                <select
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {verbCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={fetchBullets}
                disabled={!role.trim() || !task.trim() || loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Generating...</> : <><Sparkles size={15} /> Generate Bullets</>}
              </button>
            </div>
          </div>

          {/* Output */}
          {bullets.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-[#312925]">Generated Bullet Points</p>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-1.5 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-xs font-medium text-[#312925] hover:bg-[#fff2ec] transition"
                >
                  {copied === -1 ? <><Check size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy All</>}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {bullets.map((bullet, i) => (
                  <div key={i} className="group relative flex items-start gap-3 rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] hover:border-[#f55d1d] transition">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff2ec] text-xs font-bold text-[#f55d1d]">{i + 1}</span>
                    <p className="flex-1 text-sm leading-relaxed text-[#312925]">{bullet}</p>
                    <button
                      onClick={() => handleCopy(bullet, i)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition"
                    >
                      {copied === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-[#9c8880]" />}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchBullets}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-lg border border-[#ead8cf] bg-white px-4 py-2 text-xs font-medium text-[#312925] hover:bg-[#fff2ec] transition disabled:opacity-40"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} className="text-[#f55d1d]" />}
                  Regenerate
                </button>
              </div>
              <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-4">
                <p className="text-xs text-[#6c5c54]">
                  <span className="font-bold text-[#312925]">Tip: </span>
                  Pick the bullet that best fits your experience. Personalise numbers and specifics — authenticity matters more than polish.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                {loading ? <Loader2 size={28} className="text-[#f55d1d] animate-spin" /> : <List size={28} className="text-[#f55d1d]" />}
              </div>
              <p className="text-base font-bold text-[#312925]">{loading ? "Generating your bullet points..." : "Your bullet points will appear here"}</p>
              <p className="text-sm text-[#9c8880]">{loading ? "AI is crafting 5 polished options" : "Fill in the form to generate 5 polished options"}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
