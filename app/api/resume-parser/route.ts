import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  if (!resumeText?.trim()) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }

  const prompt = `You are an expert resume parser. Extract ALL structured information from the following resume text exactly as written — do not summarize or shorten.

Resume:
"""
${resumeText.slice(0, 4500)}
"""

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "contact": "<Full Name | email | phone | location | LinkedIn URL — pipe-separated>",
  "title": "<job title or role if present under name, else empty string>",
  "summary": "<full professional summary paragraph, verbatim>",
  "experience": "<all work experience — format each job as:\\nCompany | Role | Location | Dates\\n• bullet point 1\\n• bullet point 2\\n\\nNext Company | Role | Location | Dates\\n• bullet>",
  "projects": "<all projects if present — format as:\\nProject Name | Dates\\n• bullet\\n• bullet\\n\\nNext Project | Dates\\n• bullet>",
  "education": "<all education — format as:\\nInstitution | Degree | Dates>",
  "skills": ["<skill1>", "<skill2>", ...],
  "leadership": "<leadership/volunteering section if present, verbatim>"
}

Rules:
- Keep ALL bullet points verbatim — do not truncate
- If a section is missing, return empty string "" or empty array []
- skills: extract as individual items (Python, SQL, Tableau etc)`;

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
        temperature: 0.1,
        max_tokens: 2000,
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
