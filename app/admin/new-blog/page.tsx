"use client";

import { useState, useRef } from "react";

const CATEGORIES = [
  "Resume Writing",
  "Job Search",
  "Interview Tips",
  "Career Tips",
  "LinkedIn",
  "Salary",
  "Remote Work",
  "Cover Letter",
  "ATS Optimization",
  "Networking",
];

const AUTHORS = [
  { name: "Debashri Mandal", bio: "Career expert and resume strategist helping job seekers land their dream roles." },
  { name: "Riya Sharma", bio: "Job search coach and career writer with a passion for helping freshers break into top companies." },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Resume Writing": "bg-blue-100 text-blue-600",
  "Job Search": "bg-green-100 text-green-600",
  "Interview Tips": "bg-purple-100 text-purple-600",
  "Career Tips": "bg-orange-100 text-orange-600",
  "LinkedIn": "bg-sky-100 text-sky-600",
  "Salary": "bg-yellow-100 text-yellow-600",
  "Remote Work": "bg-teal-100 text-teal-600",
  "Cover Letter": "bg-pink-100 text-pink-600",
  "ATS Optimization": "bg-indigo-100 text-indigo-600",
  "Networking": "bg-red-100 text-red-600",
};

function convertToHTML(text: string): string {
  const lines = text.split("\n");
  const html: string[] = [];
  let i = 0;
  let inFaqSection = false;

  function formatInline(line: string): string {
    // Bold **text**
    line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return line;
  }

  function isPipeTable(line: string): boolean {
    return /^\|.+\|/.test(line.trim());
  }

  function isTabTable(line: string): boolean {
    return line.includes("\t") && line.trim().length > 0;
  }

  // Render a colon-item line like "British and Irish citizens: Have the right to work"
  // as a bold-label paragraph
  function isColonItem(line: string): boolean {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1 || colonIdx === line.length - 1) return false;
    const label = line.slice(0, colonIdx).trim();
    const wordCount = label.split(" ").length;
    return wordCount >= 1 && wordCount <= 7 && /^[A-Z]/.test(label);
  }

  // Find first non-empty line index (the blog intro title)
  const firstContentIndex = lines.findIndex(l => l.trim().length > 0);

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) { i++; continue; }

    // ── 0. First line = blog intro title → bold H2 ────────────────────
    if (i === firstContentIndex && !/^\d+\.\s/.test(line)) {
      html.push(`<h2 class="text-2xl font-bold text-gray-900 mt-4 mb-3">${formatInline(line)}</h2>`);
      i++; continue;
    }

    // ── 1. FAQ section header ──────────────────────────────────────────
    if (/^faqs?:?$/i.test(line)) {
      inFaqSection = true;
      html.push(`<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Frequently Asked Questions</h2>`);
      i++; continue;
    }

    // ── 2. FAQ items (numbered questions inside FAQ section) ───────────
    if (inFaqSection && /^\d+\.\s/.test(line)) {
      const question = line;
      html.push(`<div style='margin-bottom:16px;'>`);
      html.push(`<h3 class="text-lg font-semibold text-gray-800 mb-1">${formatInline(question)}</h3>`);
      i++;
      while (i < lines.length && lines[i].trim() && !/^\d+\.\s/.test(lines[i].trim()) && !/^faqs?:?$/i.test(lines[i].trim())) {
        html.push(`<p style='margin-bottom:8px; line-height:1.7;'>${formatInline(lines[i].trim())}</p>`);
        i++;
      }
      html.push(`</div>`);
      continue;
    }

    // ── 3. Pipe-separated table ────────────────────────────────────────
    if (isPipeTable(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && (isPipeTable(lines[i].trim()) || /^[\|\-\s:]+$/.test(lines[i].trim()))) {
        if (!/^[\|\-\s:]+$/.test(lines[i].trim())) tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length > 0) {
        html.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm">`);
        tableLines.forEach((row, idx) => {
          const cells = row.split("|").map(c => c.trim()).filter(c => c.length > 0);
          if (idx === 0) {
            html.push(`<tr>${cells.map(c => `<th class="bg-blue-600 text-white font-semibold p-3 text-left">${formatInline(c)}</th>`).join("")}</tr>`);
          } else {
            const bg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
            html.push(`<tr>${cells.map(c => `<td class="border border-gray-200 p-3 ${bg}">${formatInline(c)}</td>`).join("")}</tr>`);
          }
        });
        html.push(`</table></div>`);
      }
      continue;
    }

    // ── 4. Tab-separated table ─────────────────────────────────────────
    if (isTabTable(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && isTabTable(lines[i])) {
        tableLines.push(lines[i].trim()); i++;
      }
      if (tableLines.length > 0) {
        html.push(`<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm">`);
        tableLines.forEach((row, idx) => {
          const cells = row.split("\t").map(c => c.trim()).filter(c => c.length > 0);
          if (idx === 0) {
            html.push(`<tr>${cells.map(c => `<th class="bg-blue-600 text-white font-semibold p-3 text-left">${formatInline(c)}</th>`).join("")}</tr>`);
          } else {
            const bg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
            html.push(`<tr>${cells.map(c => `<td class="border border-gray-200 p-3 ${bg}">${formatInline(c)}</td>`).join("")}</tr>`);
          }
        });
        html.push(`</table></div>`);
      }
      continue;
    }

    // ── 5. Numbered section heading: "1. Title Here" (long = H2) ───────
    if (/^\d+\.\s+[A-Z]/.test(line) && line.length > 40 && !inFaqSection) {
      html.push(`<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-3">${formatInline(line)}</h2>`);
      i++; continue;
    }

    // ── 6. Numbered sub-heading: "1. Short Title" (short = H3) ─────────
    if (/^\d+\.\s+[A-Z]/.test(line) && line.length <= 40 && !inFaqSection) {
      html.push(`<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">${formatInline(line)}</h3>`);
      i++; continue;
    }

    // ── 7. Bullet list (-, •, *) ───────────────────────────────────────
    if (/^[-•*]\s/.test(line)) {
      html.push(`<ul style='margin-left:20px; margin-bottom:12px; line-height:1.6;'>`);
      while (i < lines.length && /^[-•*]\s/.test(lines[i].trim())) {
        html.push(`  <li>${formatInline(lines[i].trim().replace(/^[-•*]\s+/, ""))}</li>`);
        i++;
      }
      html.push(`</ul>`);
      continue;
    }

    // ── 8. Special callout labels: "Quick Answer:", "Pro Tip:", etc. ───
    if (/^(Quick Answer|Pro Tip|Source|Note|STAR Method):/.test(line)) {
      const colonIdx = line.indexOf(":");
      const label = line.slice(0, colonIdx);
      const rest = line.slice(colonIdx + 1).trim();
      html.push(`<div style='background:#EFF6FF; border-left:4px solid #2563EB; padding:12px 16px; margin:16px 0; border-radius:4px;'><p style='margin:0; line-height:1.7;'><strong>${label}:</strong> ${formatInline(rest)}</p></div>`);
      i++; continue;
    }

    // ── 9. STAR method lines: "Situation:", "Task:", "Action:", "Result:" ─
    if (/^(Situation|Task|Action|Result):\s/.test(line)) {
      const colonIdx = line.indexOf(":");
      const label = line.slice(0, colonIdx);
      const rest = line.slice(colonIdx + 1).trim();
      html.push(`<p style='margin-bottom:8px; line-height:1.7;'><strong>${label}:</strong> ${formatInline(rest)}</p>`);
      i++; continue;
    }

    // ── 10. Question subheadings: "Who can work in the UK?" ────────────
    if (line.endsWith("?") && line.length < 100 && !line.startsWith("http")) {
      html.push(`<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2">${formatInline(line)}</h3>`);
      i++; continue;
    }

    // ── 11. "For example" / "Instead of" / "Write:" example blocks ─────
    if (/^(For example|Instead of|Write:|Example:)/i.test(line)) {
      html.push(`<p style='margin-bottom:8px; line-height:1.7; font-style:italic; color:#6B7280;'>${formatInline(line)}</p>`);
      i++;
      // Collect the indented or short example lines that follow
      while (i < lines.length && lines[i].trim() && !/^\d+\./.test(lines[i].trim()) && lines[i].trim().length < 250 && !/^[A-Z][a-z]/.test(lines[i].trim().slice(20))) {
        html.push(`<p style='margin-left:20px; margin-bottom:8px; line-height:1.7; color:#374151; font-style:italic;'>${formatInline(lines[i].trim())}</p>`);
        i++;
      }
      continue;
    }

    // ── 12. Colon-label items: "British citizens: Have the right..." ───
    if (isColonItem(line)) {
      const colonIdx = line.indexOf(":");
      const label = line.slice(0, colonIdx).trim();
      const rest = line.slice(colonIdx + 1).trim();

      // Check if the next few lines are also colon-items — render as a list
      const nextLines = lines.slice(i + 1, i + 5).filter(l => l.trim());
      const nextAreAlsoColonItems = nextLines.length > 0 && nextLines.filter(l => isColonItem(l.trim())).length >= 1;

      if (nextAreAlsoColonItems) {
        // Render as <ul> with bold labels
        html.push(`<ul style='margin-left:20px; margin-bottom:12px; line-height:1.6;'>`);
        while (i < lines.length && lines[i].trim() && isColonItem(lines[i].trim())) {
          const ci = lines[i].trim().indexOf(":");
          const cl = lines[i].trim().slice(0, ci).trim();
          const cr = lines[i].trim().slice(ci + 1).trim();
          html.push(`  <li><strong>${formatInline(cl)}:</strong> ${formatInline(cr)}</li>`);
          i++;
        }
        html.push(`</ul>`);
      } else {
        html.push(`<p style='margin-bottom:12px; line-height:1.7;'><strong>${formatInline(label)}:</strong> ${formatInline(rest)}</p>`);
        i++;
      }
      continue;
    }

    // ── 13. Implicit list: previous line ended with ":" and this + next lines are short items ──
    // e.g. "UK employers may use:\nPhone interviews\nVideo interviews\n..."
    const prevLine = html.length > 0 ? html[html.length - 1] : "";
    const isAfterColonPara = prevLine.endsWith(":</p>") || prevLine.endsWith(": </p>");
    const nextFewLines = lines.slice(i + 1, i + 5).map(l => l.trim()).filter(l => l.length > 0);
    const nextAreLikeItems = nextFewLines.filter(l =>
      l.length < 60 && !l.endsWith(".") && !/^\d+\.\s/.test(l) && !/^[-•*]\s/.test(l)
    ).length >= 2;

    if (isAfterColonPara && line.length < 60 && !line.endsWith(".") && !/^\d+\.\s/.test(line) && (nextAreLikeItems || nextFewLines.filter(l => l.length < 60).length >= 1)) {
      // Remove the previous <p> and re-emit as a list intro
      html.pop();
      const introText = prevLine.replace(/<p[^>]*>/, "").replace(/<\/p>$/, "");
      html.push(`<p style='margin-bottom:8px; line-height:1.7;'>${introText}</p>`);
      html.push(`<ul style='margin-left:20px; margin-bottom:12px; line-height:1.6;'>`);
      while (
        i < lines.length &&
        lines[i].trim().length > 0 &&
        lines[i].trim().length < 80 &&
        !/^\d+\.\s+[A-Z]/.test(lines[i].trim()) &&
        !/^[-•*]\s/.test(lines[i].trim()) &&
        !/^faqs?:?$/i.test(lines[i].trim()) &&
        !lines[i].trim().endsWith(":") &&
        !isPipeTable(lines[i].trim()) &&
        !isTabTable(lines[i])
      ) {
        html.push(`  <li>${formatInline(lines[i].trim())}</li>`);
        i++;
      }
      html.push(`</ul>`);
      continue;
    }

    // ── 14. Default paragraph ──────────────────────────────────────────
    html.push(`<p style='margin-bottom:12px; line-height:1.7;'>${formatInline(line)}</p>`);
    i++;
  }

  return html.join("\n");
}

export default function NewBlogPage() {
  const [form, setForm] = useState({
    metaTitle: "",
    metaDescription: "",
    h1: "",
    slug: "",
    category: CATEGORIES[0],
    tags: "",
    authorName: AUTHORS[0].name,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: "",
    imageUrl: "",
    secretKey: "",
  });

  const [plainText, setPlainText] = useState("");
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [converting, setConverting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Plain-text paste drops hyperlinks. Read the clipboard HTML, and rewrite each linked
  // phrase in the plain text as [text](url) so the AI knows which words are anchors.
  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return;
    const doc = new DOMParser().parseFromString(html, "text/html");
    const links = Array.from(doc.querySelectorAll("a[href]"))
      .map((a) => ({ text: (a.textContent || "").replace(/\s+/g, " ").trim(), href: a.getAttribute("href") || "" }))
      .filter((l) => l.text && /^https?:\/\//i.test(l.href));
    if (!links.length) return;

    let text = e.clipboardData.getData("text/plain");
    let cursor = 0;
    for (const { text: t, href } of links) {
      const idx = text.indexOf(t, cursor);
      if (idx === -1) continue;
      const md = `[${t}](${href})`;
      text = text.slice(0, idx) + md + text.slice(idx + t.length);
      cursor = idx + md.length;
    }

    e.preventDefault();
    const el = e.currentTarget;
    const next = plainText.slice(0, el.selectionStart) + text + plainText.slice(el.selectionEnd);
    setPlainText(next);
    setGeneratedHTML("");
    setShowPreview(false);
  }

  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  }

  async function handleGenerateHTML() {
    if (!plainText.trim()) return;
    if (!form.secretKey) { setStatus({ type: "error", message: "Enter secret key first." }); return; }
    setConverting(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/convert-blog-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plainText, secretKey: form.secretKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Conversion failed");
      setGeneratedHTML(data.html);
      setShowPreview(true);
    } catch (err: unknown) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Conversion failed" });
    } finally {
      setConverting(false);
    }
  }

  async function uploadImage(): Promise<string> {
    if (!imageFile) return form.imageUrl;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("secretKey", form.secretKey);
      const res = await fetch("/api/upload-blog-image", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");
      return data.url;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.secretKey) return setStatus({ type: "error", message: "Secret key is required." });
    if (!form.metaTitle || !form.metaDescription || !form.h1 || !form.slug) return setStatus({ type: "error", message: "Meta Title, Meta Description, H1, and Slug are required." });
    if (!plainText.trim()) return setStatus({ type: "error", message: "Blog content is required." });
    if (!imageFile && !form.imageUrl) return setStatus({ type: "error", message: "Please upload an image or provide an image URL." });

    try {
      setPublishing(true);

      // Run image upload + GPT conversion in parallel
      const convertContent = async (): Promise<string> => {
        if (generatedHTML) return generatedHTML;
        const res = await fetch("/api/convert-blog-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plainText, secretKey: form.secretKey }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Content conversion failed");
        return data.html;
      };

      const [imageUrl, content] = await Promise.all([uploadImage(), convertContent()]);
      const author = AUTHORS.find((a) => a.name === form.authorName) || AUTHORS[0];
      const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

      const payload = {
        slug: form.slug.trim(),
        title: form.h1.trim(),
        metaTitle: form.metaTitle.trim(),
        excerpt: form.metaDescription.trim(),
        date: form.date,
        readTime: form.readTime || "8 min",
        category: form.category,
        tags: tagsArray.length ? tagsArray : [form.category],
        author,
        image: imageUrl,
        categoryColor: CATEGORY_COLORS[form.category] || "bg-gray-100 text-gray-600",
        content,
        secretKey: form.secretKey,
      };

      const res = await fetch("/api/publish-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed");

      setStatus({ type: "success", message: `Blog published! It will be live after GitHub deploys. URL: /blog/${form.slug}` });
      setForm((prev) => ({ ...prev, metaTitle: "", metaDescription: "", h1: "", slug: "", tags: "", readTime: "", imageUrl: "" }));
      setPlainText("");
      setGeneratedHTML("");
      setShowPreview(false);
      setImageFile(null);
      setImagePreview("");
    } catch (err: unknown) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setPublishing(false);
    }
  }

  const isLoading = uploading || publishing;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publish New Blog</h1>
          <p className="text-gray-500 mt-1">Paste plain text content — HTML is auto-generated. Click Publish to go live.</p>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          {/* Auth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Secret Key <span className="text-red-500">*</span></label>
            <input type="password" name="secretKey" value={form.secretKey} onChange={handleChange} placeholder="Enter the admin secret key"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <hr className="border-gray-100" />

          {/* SEO Fields */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">SEO Fields</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title <span className="text-red-500">*</span></label>
              <input type="text" name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="e.g. How to Get a Job in the UK: A Complete Guide"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 chars recommended</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description <span className="text-red-500">*</span></label>
              <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} rows={3}
                placeholder="e.g. Learn how to get a job in the UK, including where to find jobs, visa requirements, CV tips..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160 chars recommended</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">H1 (Blog Page Title) <span className="text-red-500">*</span></label>
              <input type="text" name="h1" value={form.h1} onChange={handleChange} placeholder="e.g. How to Get a Job in the UK"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
                <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="how-to-get-a-job-in-the-uk"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Blog Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Read Time</label>
                <input type="text" name="readTime" value={form.readTime} onChange={handleChange} placeholder="e.g. 10 min"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                <select name="authorName" value={form.authorName} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {AUTHORS.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date</label>
                <input type="text" name="date" value={form.date} onChange={handleChange} placeholder="e.g. Jan 15, 2025"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tags <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. Job Search, UK Jobs, Work Visa, CV Tips"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Image */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Thumbnail Image</h2>
            <div onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
              ) : (
                <div>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — uploads directly to Cloudflare R2</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or paste URL directly</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <input type="url" name="imageUrl" value={form.imageUrl}
              onChange={(e) => { handleChange(e); setImageFile(null); setImagePreview(""); }}
              placeholder="https://pub-xxxx.r2.dev/blog-images/my-image.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <hr className="border-gray-100" />

          {/* Content - Plain Text */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Blog Content</h2>
            <p className="text-xs text-gray-500">Paste from Google Doc — hyperlinks are kept automatically (shown as [text](url)). You can also type [anchor text](https://url) manually. HTML will be auto-generated — headings, bullet points, tables, FAQs all detected automatically.</p>

            <textarea
              value={plainText}
              onChange={(e) => { setPlainText(e.target.value); setGeneratedHTML(""); setShowPreview(false); }}
              onPaste={handlePaste}
              rows={20}
              placeholder={`Paste your plain text blog content here...\n\nExample:\n1. How to Get a Job in the UK\nGetting a job in the UK involves...\n\nWho can work in the UK?\nBritish and Irish citizens: Generally have the right to work.\n\nFAQs:\n1. How can I get a job in the UK?\nCheck your right to work, find suitable UK jobs...`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />

            <button
              type="button"
              onClick={handleGenerateHTML}
              disabled={!plainText.trim() || converting}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              {converting ? (
                <><span className="animate-spin text-lg">⟳</span> Formatting your content...</>
              ) : (
                "Generate HTML Preview"
              )}
            </button>

            {/* Preview */}
            {showPreview && generatedHTML && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-700">Preview</h3>
                  <button type="button" onClick={() => setShowPreview(false)} className="text-xs text-gray-400 hover:text-gray-600">Hide</button>
                </div>
                <div
                  className="border border-gray-200 rounded-xl p-6 bg-white prose prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 max-w-none text-gray-800 text-sm leading-relaxed overflow-y-auto max-h-[500px] [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: generatedHTML }}
                />
                <p className="text-xs text-gray-400 mt-2">This is exactly how the blog content will appear on the website.</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || (!generatedHTML && !plainText.trim())}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin text-lg">⟳</span>
                {uploading ? "Uploading image + formatting content..." : "Publishing to GitHub..."}
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
