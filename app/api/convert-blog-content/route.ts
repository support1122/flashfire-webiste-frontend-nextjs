import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { plainText, secretKey } = await req.json();

    if (secretKey !== process.env.BLOG_ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!plainText?.trim()) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const prompt = `You are an expert blog formatter. Convert the following plain text blog content into clean, well-structured HTML.

STRICT RULES:
- Use <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-3"> for main section headings (numbered like "1. How to..." or the blog title)
- Use <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-2"> for sub-headings (questions like "Who can work?", short sub-sections)
- Use <p style='margin-bottom:12px; line-height:1.7;'> for paragraphs
- Use <ul style='margin-left:20px; margin-bottom:12px; line-height:1.6;'> and <li> for bullet lists (including implicit lists — items listed one per line after a colon)
- Use <ol style='margin-left:20px; margin-bottom:12px; line-height:1.6;'> and <li> for numbered lists
- For tables: use <div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm"> with <th class="bg-blue-600 text-white font-semibold p-3 text-left"> for headers and <td class="border border-gray-200 p-3"> for cells
- For FAQs: use <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Frequently Asked Questions</h2> as the section header, then each question as <h3 class="text-lg font-semibold text-gray-800 mb-1"> and answer as <p style='margin-bottom:8px; line-height:1.7;'>
- For callout boxes (Quick Answer, Pro Tip, Note, Source): use <div style='background:#EFF6FF; border-left:4px solid #2563EB; padding:12px 16px; margin:16px 0; border-radius:4px;'><p style='margin:0; line-height:1.7;'><strong>Label:</strong> text</p></div>
- For STAR method lines (Situation, Task, Action, Result): use <p style='margin-bottom:8px; line-height:1.7;'><strong>Situation:</strong> text</p>
- For hyperlinks/sources: use <a href="URL" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">link text</a>
- Bold important terms with <strong>
- Do NOT include <html>, <head>, <body> tags
- Do NOT include any markdown, only pure HTML
- Preserve all source links and hyperlinks properly as anchor tags
- Every Markdown link written as [anchor text](URL) in the input MUST become an <a href="URL"> anchor tag on exactly that anchor text. Never drop, merge, reword or invent links or URLs.
- Keep FAQ question numbers (1. 2. 3.) in the heading text

Plain text content:
${plainText}

Return ONLY the HTML, nothing else.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: "OpenAI API error", detail: err }, { status: 500 });
    }

    const data = await response.json();
    const html = data.choices?.[0]?.message?.content?.trim();

    if (!html) {
      return NextResponse.json({ error: "No HTML returned from GPT" }, { status: 500 });
    }

    // Safety net: if the model dropped a link, wrap the anchor text ourselves.
    let finalHtml: string = html;
    const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
    for (const [, text, url] of plainText.matchAll(linkRe)) {
      if (finalHtml.includes(`href="${url}"`) || finalHtml.includes(`href='${url}'`)) continue;
      const idx = finalHtml.indexOf(text);
      if (idx === -1) continue;
      const a = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">${text}</a>`;
      finalHtml = finalHtml.slice(0, idx) + a + finalHtml.slice(idx + text.length);
    }

    return NextResponse.json({ html: finalHtml });
  } catch (err) {
    console.error("convert-blog-content error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
