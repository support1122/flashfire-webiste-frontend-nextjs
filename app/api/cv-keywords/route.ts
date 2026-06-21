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

    const prompt = `You are a senior ATS resume expert. Do a COMPLETE, exhaustive keyword gap analysis. Leave nothing out.

Resume:
"""
${resumeText.slice(0, 4500)}
"""
${jd.trim() ? `\nJob Description:\n"""\n${jd.slice(0, 3500)}\n"""` : ""}

YOUR TASK:
1. Read the ENTIRE job description line by line. Extract EVERY skill, tool, technology, concept, methodology, and requirement mentioned.
2. For EACH one, search the ENTIRE resume (every section) to see if it exists — in any form, abbreviation, or synonym.
3. If found → matched. If NOT found anywhere → missing. Do NOT skip anything.

SYNONYM RULES (must follow):
- CI/CD in resume = "Continuous Integration" AND "Continuous Delivery" both matched
- "REST API" or "RESTful" = "Representational State Transfer (REST)" matched
- "Kubernetes" or "K8s" = matched for either
- "IaC" = "Infrastructure as Code" matched
- "Go" or "Golang" = matched for either
- Tool name matches full name: "Kafka" = "Apache Kafka", "Spark" = "Apache Spark"
- If resume has the concept even in different words, it counts

MISSING KEYWORDS RULES (critical):
- Focus on HARD SKILLS first: specific technologies, tools, frameworks, protocols, platforms, certifications
- Examples of hard skills to look for: OAuth, TLS, PKI, SAML, MFA, Zero Trust, TPM, OWASP, passkeys, device trust, attestation, static analysis, secrets management, SLOs, SLIs, CloudFormation, prompt engineering, Git, SQL, NoSQL
- Soft skills like "communication", "collaboration", "teamwork" — DO NOT include in missing, skip them entirely
- Only include a soft skill as missing if it is a core explicit requirement (e.g. "Agile methodology" is a process skill, include it)
- NO LIMITS — if 20 hard skills are missing, list all 20

Return ONLY valid JSON, no markdown:
{
  "matchRate": <realistic number 0-100 based on how many JD keywords are covered>,
  "matchLevel": "<Strong Match | Good Match | Partial Match | Low Match>",
  "summary": "<2 honest sentences about fit for this specific role>",
  "matched": ["<all keywords from JD found in resume — no limit>"],
  "missing": ["<all HARD SKILL keywords from JD NOT found in resume — no soft skills, no limit>"],
  "suggestions": ["<5 specific tips: exact missing hard-skill keywords to add, which section to add them in, how to reword existing bullets>"]
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
        temperature: 0.1,
        max_tokens: 2500,
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
