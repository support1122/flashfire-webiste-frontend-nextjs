import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  if (!resumeText?.trim()) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }

  const prompt = `You are an expert resume parser. Extract structured information from the following resume.

Resume:
"""
${resumeText.slice(0, 4000)}
"""

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "contact": "<name, email, phone, location, linkedin as a single string>",
  "summary": "<professional summary if present, else empty string>",
  "skills": ["<skill1>", "<skill2>", "<skill3>", ...],
  "experience": "<all work experience formatted as: Company | Role | Dates\\n• bullet\\n• bullet\\n\\nCompany2 | Role2 | Dates\\n• bullet>",
  "education": "<all education formatted as: Institution | Degree | Dates>"
}`;

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
        max_tokens: 1200,
      }),
    });
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Parsing failed" }, { status: 500 });
  }
}
