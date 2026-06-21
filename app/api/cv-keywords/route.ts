import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText, jobDescription } = await req.json();
  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return NextResponse.json({ error: "Resume and job description required" }, { status: 400 });
  }

  const prompt = `You are an expert ATS keyword analyzer. Compare the resume against the job description and identify keyword matches and gaps.

Resume:
"""
${resumeText.slice(0, 3000)}
"""

Job Description:
"""
${jobDescription.slice(0, 2000)}
"""

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "matchRate": <number 0-100>,
  "matchLevel": "<Strong Match / Good Match / Partial Match / Low Match>",
  "summary": "<1-2 sentence assessment of how well this resume matches the job>",
  "matched": ["<keyword1>", "<keyword2>", ...],
  "missing": ["<keyword1>", "<keyword2>", ...],
  "suggestions": ["<tip1>", "<tip2>", "<tip3>"]
}

Rules:
- matchRate: realistic percentage of important job keywords found in resume
- matched: 10-20 meaningful keywords/phrases from the job description that ARE in the resume
- missing: 8-15 important keywords/phrases from the job description that are NOT in the resume, sorted by importance
- suggestions: 3-5 specific tips on how to improve the resume for this role`;

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
