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

    const prompt = `You are a senior technical recruiter and ATS expert. Your job is to do a deep, thorough keyword analysis — like a professional resume optimizer would.

Resume:
"""
${resumeText.slice(0, 4000)}
"""
${jd.trim() ? `\nJob Description:\n"""\n${jd.slice(0, 3000)}\n"""` : ""}

SYNONYM & ABBREVIATION RULES (critical — do not violate):
- CI/CD = Continuous Integration = Continuous Delivery = Continuous Deployment → if resume has "CI/CD", mark ALL these as MATCHED
- REST API = RESTful API = Representational State Transfer → any form counts as matched
- K8s = Kubernetes, IaC = Infrastructure as Code, ML = Machine Learning, etc.
- If the resume mentions a tool/technology in ANY section (summary, experience, skills), it is MATCHED
- Only mark as MISSING if the keyword is completely absent from the entire resume in all forms

MATCHING RULES:
- Be exhaustive — extract 25-40 matched keywords, not just 10-15
- Match acronyms to full forms: if resume has "Kafka" and JD says "Apache Kafka", it's MATCHED
- Match partial: if resume has "vulnerability scanning" and JD says "vulnerability remediation", check carefully — these are different, only match if both concepts appear
- Go through EVERY bullet point, EVERY skills section line, EVERY sentence in the resume
- missing: only truly absent skills/concepts that appear in the JD — aim for 5-10, not more

Return ONLY valid JSON, no markdown, no explanation:
{
  "matchRate": <number 0-100>,
  "matchLevel": "<Strong Match | Good Match | Partial Match | Low Match>",
  "summary": "<2 sentence honest assessment of fit>",
  "matched": ["<every keyword/skill from JD that exists in resume, including abbreviation expansions>"],
  "missing": ["<keywords genuinely absent from entire resume>"],
  "suggestions": ["<3-5 specific tips: which exact missing keywords to add, where to add them, how to reword bullets>"]
}`;

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
