import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { role, years, skill, niche, tone } = await req.json();
  if (!role?.trim()) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }

  const context = [
    `Job Title/Role: ${role}`,
    years ? `Years of Experience: ${years}+` : null,
    skill ? `Top Skills/Tools: ${skill}` : null,
    niche ? `Industry/Niche: ${niche}` : null,
    tone ? `Tone: ${tone}` : null,
  ].filter(Boolean).join("\n");

  const prompt = `You are an expert resume writer. Generate 5 resume headlines for this professional.

INPUT:
${context}

CRITICAL FORMAT RULES — follow exactly:
- Format: [Role] | [Specialization] | [Skill] | [Skill] | [Skill]
- Use pipe (|) as separator — this is MANDATORY
- Keep each headline SHORT and DENSE — pack in role + domain + tools/skills
- NO full sentences, NO verbs like "delivering", "helping", "focused on", "passionate about", "committed to"
- NO adjectives like "results-driven", "strategic", "dynamic", "innovative"
- headlines are LABELS not sentences
- Correct skill casing: SQL not Sql, Python not python, Power BI not Power Bi, AWS not Aws, React not react
- If skills are not provided, infer 3-5 relevant tools/skills for that role and domain
- Vary structure across the 5 options (see patterns below)

PATTERNS TO USE (vary these across 5 headlines):
Pattern A: [Role] | [Skill 1] | [Skill 2] | [Skill 3] | [Skill 4]
Pattern B: [Role] | [Domain & Specialization] | [Skill 1] | [Skill 2]
Pattern C: [Role] | [Domain 1] & [Domain 2] | [Skill 1] | [Skill 2] | [Skill 3]
Pattern D: [X]+ Years in [Role] | [Skill 1] | [Skill 2] | [Industry]
Pattern E: [Role] | [Skill 1], [Skill 2] & [Skill 3] | [Domain]

REAL EXAMPLES of correct format:
"Marketing Analyst | CRM & Campaign Analytics | SQL | Python | Tableau | Power BI"
"Business Intelligence Analyst | SQL, Power BI, Snowflake | KPI Reporting & ETL Optimization"
"Software Engineer | Distributed Systems & Cloud Security | Go | Kubernetes | Kafka"
"Data Analyst | SQL | Python | Tableau | Funnel Analysis & Customer Segmentation"
"Research Associate | Biologics Development & Protein Characterization | ELISA | Octet BLI"
"AI Engineer | LLMs & RAG | Python | FastAPI | AWS | ML Pipelines"
"3+ Years in Marketing Analytics | Google Ads | HubSpot | BigQuery | Attribution Modeling"

WRONG (never do this):
❌ "Strategic Data Analyst | Python & Sql Practitioner | Focused on Building Things That Are Reliable"
❌ "Data Analyst with 2+ Years of Industry Experience | Combining Strategic Thinking with Hands-On Execution"
❌ "Data Analyst | Passionate About Making a Positive Impact | Strong Communicator"

Return ONLY 5 headlines, numbered 1-5, one per line. No explanations.`;

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
        temperature: 0.5,
        max_tokens: 500,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const headlines = content
      .split("\n")
      .map((line: string) => line.replace(/^\d+[\.\)]\s*/, "").trim())
      .filter((line: string) => line.length > 5)
      .slice(0, 5);

    return NextResponse.json({ headlines });
  } catch {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
