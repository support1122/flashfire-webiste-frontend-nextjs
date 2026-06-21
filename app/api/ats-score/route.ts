import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  if (!resumeText?.trim()) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  const prompt = `You are an expert ATS resume analyzer. Do a thorough analysis of this resume.

Resume:
"""
${resumeText.slice(0, 4500)}
"""

FOUND KEYWORDS RULES:
- Extract ALL strong hard-skill keywords actually present: programming languages, frameworks, tools, platforms, databases, cloud services, methodologies, certifications
- Aim for 20-30 found keywords — be exhaustive, scan every section

MISSING KEYWORDS RULES:
- Infer the target role/industry from the resume content
- List ALL important hard-skill keywords commonly required for that role that are NOT present in the resume
- Focus on: specific tools, technologies, frameworks, platforms, certifications, methodologies
- DO NOT include soft skills like "communication", "teamwork", "leadership" in missing
- Aim for 15-25 missing hard-skill keywords — be thorough
- Examples: if it's a data role missing "dbt", "Airflow", "Looker", "Redshift" — list them all

Return ONLY valid JSON, no markdown:
{
  "overallScore": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<2 sentence honest assessment>",
  "categories": [
    { "label": "Contact Info", "score": <0-25>, "maxScore": 25, "tip": "<specific feedback>" },
    { "label": "Formatting", "score": <0-20>, "maxScore": 20, "tip": "<specific feedback>" },
    { "label": "Keywords", "score": <0-25>, "maxScore": 25, "tip": "<specific feedback>" },
    { "label": "Action Verbs", "score": <0-15>, "maxScore": 15, "tip": "<specific feedback>" },
    { "label": "Achievements", "score": <0-15>, "maxScore": 15, "tip": "<specific feedback>" }
  ],
  "foundKeywords": ["<20-30 hard-skill keywords actually in the resume>"],
  "missingKeywords": ["<15-25 hard-skill keywords NOT in resume but expected for this role — no soft skills>"],
  "suggestions": ["<5 specific actionable improvements mentioning exact skills or sections to fix>"]
}

Rules:
- overallScore = sum of all category scores
- grade: A=85+, B=70+, C=55+, D=40+, F=below 40`;

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
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";
    const clean = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
