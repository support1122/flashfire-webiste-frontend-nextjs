import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobDesc, jobDescription } = body;
    const jd = jobDesc || jobDescription || "";

    if (!resumeText?.trim()) {
      return NextResponse.json({ error: "Resume text required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const prompt = `You are an expert ATS keyword analyzer. Analyze the resume and identify key skills, keywords, and gaps.

Resume:
"""
${resumeText.slice(0, 3000)}
"""
${jd.trim() ? `\nJob Description:\n"""\n${jd.slice(0, 2000)}\n"""` : ""}

CRITICAL RULES FOR MATCHING:
- Search for keywords case-insensitively (Power BI = power bi = POWER BI)
- If a keyword appears ANYWHERE in the resume text, it MUST go in "matched", NOT "missing"
- Do not put a keyword in "missing" if it exists in the resume in any form
- Read the entire resume carefully before deciding matched vs missing

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "matchRate": 75,
  "matchLevel": "Good Match",
  "summary": "Your resume shows strong alignment with key technical skills.",
  "matched": ["SQL", "Python", "Excel", "Power BI"],
  "missing": ["Tableau", "Agile", "Scrum"],
  "suggestions": ["Add quantified metrics to your bullet points", "Include Tableau in your skills section"]
}

Rules:
- matchRate: number 0-100 (no quotes)
- matchLevel: one of "Strong Match", "Good Match", "Partial Match", "Low Match"
- If job description is provided: compare resume keywords against it
- If no job description: extract strong keywords found in resume as matched, suggest commonly missing keywords for the detected role as missing
- matched: 10-20 meaningful keywords/skills ACTUALLY PRESENT in the resume text
- missing: 8-12 important keywords genuinely NOT found anywhere in the resume
- suggestions: 3-5 specific actionable tips about adding missing keywords, quantifying achievements, or strengthening the resume — keep them short and direct, relevant to what's actually missing
- Return ONLY the JSON object, nothing else`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 900,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("OpenAI error:", res.status, errText);
      return NextResponse.json({ error: `OpenAI error: ${res.status}` }, { status: 500 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";

    if (!content) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    // Strip markdown code fences if present
    const clean = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      console.error("JSON parse failed. Content was:", content);
      return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("cv-keywords route error:", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
