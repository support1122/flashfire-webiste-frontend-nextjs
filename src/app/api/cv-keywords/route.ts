import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText, jobDesc, jobDescription } = await req.json();
  const jd = jobDesc || jobDescription || "";
  if (!resumeText?.trim()) {
    return NextResponse.json({ error: "Resume text required" }, { status: 400 });
  }

  const prompt = `You are an expert ATS keyword analyzer. Analyze the resume and identify key skills, keywords, and gaps.

Resume:
"""
${resumeText.slice(0, 3000)}
"""
${jd.trim() ? `\nJob Description:\n"""\n${jd.slice(0, 2000)}\n"""` : ""}

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "matchRate": <number 0-100>,
  "matchLevel": "<Strong Match / Good Match / Partial Match / Low Match>",
  "summary": "<1-2 sentence assessment>",
  "matched": ["<keyword1>", "<keyword2>", ...],
  "missing": ["<keyword1>", "<keyword2>", ...],
  "suggestions": ["<tip1>", "<tip2>", "<tip3>"]
}

Rules:
- If job description is provided: compare resume keywords against it
- If no job description: extract strong keywords found in resume as matched, and suggest commonly missing keywords for the detected role as missing
- matched: 10-20 meaningful keywords/skills found in the resume
- missing: 8-12 important keywords not in the resume, sorted by importance
- suggestions: 3-5 specific actionable tips`;

  try {
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
        max_tokens: 800,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
